import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const COOKIE = "pmc_presence";
const COOKIE_AGE = 86400;
const ACTIVE_SECONDS = 90;
const headers = { "Cache-Control": "no-store, max-age=0", "Vary": "Cookie, Origin" };

function signature(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}
function identity(cookie: string | undefined, secret: string) {
  const now = Math.floor(Date.now()/1000);
  if (cookie && cookie.length < 200) {
    const [id, issued, sig, extra] = cookie.split(".");
    if (!extra && /^[0-9a-f-]{36}$/.test(id ?? "") && /^\d{10}$/.test(issued ?? "") && /^[\w-]{43}$/.test(sig ?? "") && Number(issued) <= now && now-Number(issued) < COOKIE_AGE) {
      const expected = Buffer.from(signature(`${id}.${issued}`, secret));
      const actual = Buffer.from(sig);
      if (actual.length === expected.length && timingSafeEqual(actual, expected)) return { id, cookie: null };
    }
  }
  const id = randomUUID();
  const value = `${id}.${now}`;
  return { id, cookie: `${value}.${signature(value,secret)}` };
}

export async function POST(request: NextRequest) {
  try {
    const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
    if (request.headers.get("origin") !== origin || request.headers.get("sec-fetch-site") === "cross-site") {
      return NextResponse.json({ error: "origin" }, { status: 403, headers });
    }

    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const secret = process.env.PRESENCE_SIGNING_SECRET;
    const namespace = process.env.PRESENCE_NAMESPACE || "pmcademy:production";
    if (!url || !key || !secret || secret.length < 32 || !/^[a-zA-Z0-9:_-]{1,80}$/.test(namespace)) {
      return NextResponse.json({ available: false }, { status: 503, headers });
    }

    const endpoint = new URL(url);
    const local = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname);
    if (endpoint.protocol !== "https:" && !(local && endpoint.protocol === "http:")) {
      return NextResponse.json({ available: false }, { status: 503, headers });
    }

    const visitor = identity(request.cookies.get(COOKIE)?.value, secret);
    const database = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        fetch: (input, init) => fetch(input, {
          ...init,
          cache: "no-store",
          signal: AbortSignal.timeout(5000),
        }),
      },
    });
    const { data, error } = await database.rpc("pmc_presence_heartbeat", {
      p_namespace: namespace,
      p_visitor: visitor.id,
    });
    if (error || !Number.isSafeInteger(data) || Number(data) < 1) {
      return NextResponse.json({ available: false }, { status: 503, headers });
    }

    const response = NextResponse.json({ available: true, count: Number(data), activeSeconds: ACTIVE_SECONDS }, { headers });
    if (visitor.cookie) {
      response.cookies.set(COOKIE, visitor.cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_AGE,
      });
    }
    return response;
  } catch {
    return NextResponse.json({ available: false }, { status: 503, headers });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const COOKIE = "pmc_presence";
const COOKIE_AGE = 86400;
const ACTIVE_SECONDS = 90;
const headers = { "Cache-Control": "no-store, max-age=0", "Vary": "Cookie, Origin" };

// Redis provides a shared clock and one atomic operation across application instances.
// The set expires after the final heartbeat. No account ID, IP, or URL is stored.
const heartbeat = `
local clock = redis.call('TIME')
local now = tonumber(clock[1])
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', now - tonumber(ARGV[2]))
local last = redis.call('ZSCORE', KEYS[1], ARGV[1])
if not last or now - tonumber(last) >= 15 then
  redis.call('ZADD', KEYS[1], now, ARGV[1])
end
redis.call('EXPIRE', KEYS[1], tonumber(ARGV[2]) * 2)
return redis.call('ZCARD', KEYS[1])
`;

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
  // Browser heartbeats are same-origin. This endpoint is not a cross-origin API.
  if (request.headers.get("origin") !== request.nextUrl.origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "origin" }, { status: 403, headers });
  }
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.PRESENCE_SIGNING_SECRET;
  const prefix = process.env.PRESENCE_NAMESPACE || "pmcademy:production";
  if (!url || !token || !secret || secret.length < 32 || !/^[a-zA-Z0-9:_-]{1,80}$/.test(prefix)) {
    return NextResponse.json({ available: false }, { status: 503, headers });
  }
  try {
    const endpoint = new URL(url);
    if (endpoint.protocol !== "https:") throw new Error("Invalid Redis endpoint");
    const visitor = identity(request.cookies.get(COOKIE)?.value, secret);
    const result = await fetch(endpoint, {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(5000),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", heartbeat, 1, `${prefix}:presence:v1`, visitor.id, ACTIVE_SECONDS]),
    });
    if (!result.ok) throw new Error("Presence backend unavailable");
    const data: unknown = await result.json();
    if (!data || typeof data !== "object" || !("result" in data) || "error" in data || !Number.isSafeInteger(data.result) || Number(data.result) < 1) throw new Error("Invalid count");
    const response = NextResponse.json({ available: true, count: data.result, activeSeconds: ACTIVE_SECONDS }, { headers });
    if (visitor.cookie) response.cookies.set(COOKIE, visitor.cookie, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: COOKIE_AGE });
    return response;
  } catch {
    // Never return stale or fabricated social proof, or leak backend credentials/errors.
    return NextResponse.json({ available: false }, { status: 503, headers });
  }
}

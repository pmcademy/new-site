import type { WorkspaceState } from "./types";

/**
 * A shareable snapshot of a workspace, small enough to live in a URL.
 *
 * While the store is local to one browser (see store.ts), a public profile URL
 * cannot read another person's workspace from a server, because there is no
 * server. Rather than ship a share button that only works on the machine that
 * made it, "Share workspace" encodes a compact, read-only snapshot into the
 * link itself. It is honest about what it is: a picture of the workspace at
 * the moment it was shared, not a live view.
 *
 * When the store moves server side, delete the `s` parameter handling in
 * app/u/[username]/page.tsx and read the workspace by username instead. This
 * file can stay for offline sharing or go entirely.
 */

export type Snapshot = {
  v: 1;
  /** When the snapshot was taken. */
  t: string;
  u: string;
  n: string;
  b?: string;
  st: number;
  /** lessons, levels, percent */
  p: [number, number, number];
  /** current, longest */
  k: [number, number];
  /** case studies: [title, href] */
  c: [string, string][];
  /** projects: [title, slug, type, status] */
  j: [string, string, string, string][];
  /** published: [title, url, platform] */
  w: [string, string, string][];
  /** badges: [id, earnedAt] */
  g: [string, string][];
  /** referrals total */
  r: number;
  /** activity days that had work, as offsets back from t */
  d: number[];
};

export function toSnapshot(state: WorkspaceState): Snapshot {
  const today = state.streak.days.at(-1)?.day ?? "";
  const offsets: number[] = [];
  state.streak.days.forEach((d, i) => {
    if (d.count > 0) offsets.push(state.streak.days.length - 1 - i);
  });

  return {
    v: 1,
    t: today,
    u: state.profile.username,
    n: state.profile.displayName,
    b: state.profile.bio,
    st: state.environment.stage,
    p: [
      state.progress.lessonsCompleted,
      state.progress.levelsCompleted,
      state.progress.completionPercent,
    ],
    k: [state.streak.current, state.streak.longest],
    c: state.caseStudies.map((x) => [x.title, x.href]),
    j: state.projects.map((x) => [x.title, x.slug, x.type, x.status]),
    w: state.published.map((x) => [x.title, x.url, x.platform]),
    g: state.badges.map((x) => [x.id, x.earnedAt.slice(0, 10)]),
    r: state.referrals.total,
    d: offsets,
  };
}

/* -------------------------------------------------------------------------- */
/* base64url, in both directions, on both runtimes                             */
/* -------------------------------------------------------------------------- */

function toBase64(bytes: Uint8Array) {
  if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
}

function fromBase64(b64: string) {
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
  const s = atob(b64);
  return Uint8Array.from(s, (ch) => ch.charCodeAt(0));
}

export function encodeSnapshot(snap: Snapshot) {
  const bytes = new TextEncoder().encode(JSON.stringify(snap));
  return toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeSnapshot(param: string): Snapshot | null {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/");
    const json = new TextDecoder().decode(fromBase64(b64));
    const snap = JSON.parse(json) as Snapshot;
    return snap?.v === 1 ? snap : null;
  } catch {
    return null;
  }
}

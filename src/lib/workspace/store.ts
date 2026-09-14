"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  ActivityType,
  CaseStudyRead,
  LearningActivity,
  ProjectSubmission,
  PublishedWork,
  WorkspaceProfile,
  WorkspaceRecord,
} from "./types";

/**
 * ────────────────────────────────────────────────────────────────────────────
 * THE ADAPTER BOUNDARY.
 *
 * Everything above this file talks to `readRecord` / `writeRecord` and nothing
 * else. They are the only two functions in the workspace that touch storage.
 *
 * Today they use localStorage, which means the workspace is real, persistent
 * and testable with no backend at all. It also means it is per browser: it
 * does not follow the learner to another device, and a public profile URL can
 * only be served from a share snapshot (see snapshot.ts).
 *
 * To go server side, replace these two with fetches to your API and make
 * `useWorkspace` await them. Nothing else in the workspace changes:
 *
 *   async function readRecord(): Promise<WorkspaceRecord>
 *   async function writeRecord(next: WorkspaceRecord): Promise<void>
 *
 * The obvious host is the Upstash Redis instance already wired up for
 * /api/presence, keyed on the authenticated user id.
 * ────────────────────────────────────────────────────────────────────────────
 */

const KEY = "pmc-workspace";
const EVENT = "pmc-workspace-change";

/** A slug safe enough for a public URL, derived from whatever we know. */
export function toUsername(input: string) {
  const base = input
    .toLowerCase()
    .replace(/@.*$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
  return base || "learner";
}

export function emptyRecord(name = "Learner", email?: string): WorkspaceRecord {
  return {
    version: 1,
    profile: {
      username: toUsername(email || name),
      displayName: name,
      visibility: "private",
      hidden: [],
      timeOverride: null,
    },
    activity: [],
    caseStudies: [],
    projects: [],
    published: [],
    badges: [],
    referrals: [],
    manualUnlocks: [],
  };
}

/* ------------------------------------------------------------------ READ */
export function readRecord(): WorkspaceRecord {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyRecord();
    const parsed = JSON.parse(raw) as WorkspaceRecord;
    if (parsed.version !== 1) return emptyRecord();
    /* Defensive: a record written by an older build may be missing arrays. */
    return {
      ...emptyRecord(parsed.profile?.displayName),
      ...parsed,
      profile: { ...emptyRecord().profile, ...parsed.profile },
    };
  } catch {
    return emptyRecord();
  }
}

/* ----------------------------------------------------------------- WRITE */
export function writeRecord(next: WorkspaceRecord) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode, or the quota is full. The session still works. */
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

/* -------------------------------------------------------------------------- */
/* Mutations. Each one is small, idempotent where it matters, and emits once.  */
/* -------------------------------------------------------------------------- */

/** YYYY-MM-DD in the learner's own timezone, which is the only one that counts. */
export function localDay(d: Date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const id = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `a${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

export function recordActivity(input: {
  type: ActivityType;
  label: string;
  entityId?: string;
  minutes?: number;
  metadata?: Record<string, unknown>;
  /** When set, a second call with the same key is ignored. */
  dedupeKey?: string;
}) {
  const rec = readRecord();

  if (input.dedupeKey) {
    const seen = rec.activity.some(
      (a) => a.metadata?.dedupeKey === input.dedupeKey
    );
    if (seen) return rec;
  }

  const now = new Date();
  const entry: LearningActivity = {
    id: id(),
    type: input.type,
    entityId: input.entityId,
    label: input.label,
    occurredAt: now.toISOString(),
    day: localDay(now),
    minutes: input.minutes,
    metadata: input.dedupeKey
      ? { ...input.metadata, dedupeKey: input.dedupeKey }
      : input.metadata,
  };

  /* Keep the stream bounded. A year of heavy use is well under this. */
  const activity = [...rec.activity, entry].slice(-2000);
  const next = { ...rec, activity };
  writeRecord(next);
  return next;
}

export function upsertCaseStudy(read: CaseStudyRead) {
  const rec = readRecord();
  const existing = rec.caseStudies.find((c) => c.caseStudyId === read.caseStudyId);

  /* A second read of the same case study never creates a second book. */
  const caseStudies = existing
    ? rec.caseStudies.map((c) =>
        c.caseStudyId === read.caseStudyId
          ? {
              ...c,
              readPercent: Math.max(c.readPercent, read.readPercent),
              completedAt: c.completedAt ?? read.completedAt,
              title: read.title || c.title,
              href: read.href || c.href,
            }
          : c
      )
    : [...rec.caseStudies, read];

  writeRecord({ ...rec, caseStudies });

  const justCompleted = read.completedAt && !existing?.completedAt;
  if (justCompleted) {
    recordActivity({
      type: "case_study_read",
      label: read.title,
      entityId: read.caseStudyId,
      minutes: 8,
      dedupeKey: `case:${read.caseStudyId}`,
    });
  }
  return justCompleted === true;
}

export function saveProject(
  project: Omit<ProjectSubmission, "id" | "createdAt" | "updatedAt" | "visible"> & {
    id?: string;
    visible?: boolean;
  }
) {
  const rec = readRecord();
  const now = new Date().toISOString();
  const existing = project.id
    ? rec.projects.find((p) => p.id === project.id)
    : rec.projects.find((p) => p.slug === project.slug);

  const saved: ProjectSubmission = {
    id: existing?.id ?? id(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    visible: project.visible ?? existing?.visible ?? true,
    slug: project.slug,
    title: project.title,
    type: project.type,
    status: project.status,
    levelSlug: project.levelSlug,
    summary: project.summary,
    url: project.url,
  };

  const projects = existing
    ? rec.projects.map((p) => (p.id === saved.id ? saved : p))
    : [...rec.projects, saved];

  writeRecord({ ...rec, projects });

  if (saved.status === "submitted" && existing?.status !== "submitted") {
    recordActivity({
      type: "project_submitted",
      label: saved.title,
      entityId: saved.id,
      minutes: 40,
      dedupeKey: `project:${saved.id}`,
    });
  }
  return saved;
}

export function savePublished(work: Omit<PublishedWork, "id" | "createdAt" | "visible">) {
  const rec = readRecord();
  const entry: PublishedWork = {
    ...work,
    id: id(),
    createdAt: new Date().toISOString(),
    visible: true,
  };
  writeRecord({ ...rec, published: [...rec.published, entry] });
  recordActivity({
    type: "article_published",
    label: entry.title,
    entityId: entry.id,
    dedupeKey: `published:${entry.id}`,
  });
  return entry;
}

export function addReferral() {
  const rec = readRecord();
  const code = `${rec.profile.username}-${Math.random().toString(36).slice(2, 7)}`;
  const entry = { id: id(), code, createdAt: new Date().toISOString() };
  writeRecord({ ...rec, referrals: [...rec.referrals, entry] });
  return entry;
}

export function awardBadges(ids: string[], now = new Date().toISOString()) {
  if (!ids.length) return [];
  const rec = readRecord();
  const have = new Set(rec.badges.map((b) => b.badgeId));
  const fresh = ids.filter((b) => !have.has(b));
  if (!fresh.length) return [];
  writeRecord({
    ...rec,
    badges: [...rec.badges, ...fresh.map((badgeId) => ({ badgeId, earnedAt: now }))],
  });
  return fresh;
}

export function updateProfile(patch: Partial<WorkspaceProfile>) {
  const rec = readRecord();
  writeRecord({ ...rec, profile: { ...rec.profile, ...patch } });
}

export function toggleHidden(objectId: string) {
  const rec = readRecord();
  const hidden = rec.profile.hidden.includes(objectId)
    ? rec.profile.hidden.filter((h) => h !== objectId)
    : [...rec.profile.hidden, objectId];
  writeRecord({ ...rec, profile: { ...rec.profile, hidden } });
}

/* -------------------------------------------------------------------------- */
/* The hook                                                                    */
/* -------------------------------------------------------------------------- */

export function useWorkspaceRecord() {
  const [record, setRecord] = useState<WorkspaceRecord | null>(null);

  const sync = useCallback(() => setRecord(readRecord()), []);

  useEffect(() => {
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  /* null until the first client read, so nothing renders on the server that
     the client will immediately contradict. */
  return record;
}

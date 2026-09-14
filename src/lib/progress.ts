"use client";

import { useCallback, useEffect, useState } from "react";
import { getLesson, levels } from "./course";
import { levelLessons } from "./course/types";
import { recordActivity } from "./workspace/store";

/**
 * Account, progress and level gating.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THIS IS THE ADAPTER BOUNDARY.
 *
 * Everything below stores state in localStorage so the whole flow is testable
 * without a backend. To go live, replace only the four functions marked
 * ADAPTER with calls to your real provider. Nothing else in the app reads
 * storage directly, so no component needs to change.
 *
 * Recommended: NextAuth with Google, Apple and email magic-link providers,
 * plus a `progress` table keyed on user id. Both Apple and Google need a
 * developer account and a redirect URI before they will issue credentials.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Provider = "google" | "apple" | "email";

export type Account = {
  id: string;
  name: string;
  email: string;
  provider: Provider;
  /** The product world the learner chose before Level 1. */
  domain?: string;
};

export type Progress = {
  /** `${levelSlug}/${lessonSlug}` for every lesson marked done. */
  done: string[];
};

const ACCOUNT_KEY = "pmc-account";
const PROGRESS_KEY = "pmc-progress";

/* ---------------------------------------------------------------- ADAPTER 1 */
function readAccount(): Account | null {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------------- ADAPTER 2 */
function writeAccount(a: Account | null) {
  try {
    if (a) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(a));
    else localStorage.removeItem(ACCOUNT_KEY);
  } catch {
    /* private mode */
  }
}

/* ---------------------------------------------------------------- ADAPTER 3 */
function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return { done: Array.isArray(parsed?.done) ? parsed.done.filter((id: unknown): id is string => typeof id === "string") : [] };
  } catch {
    return { done: [] };
  }
}

/* ---------------------------------------------------------------- ADAPTER 4 */
function writeProgress(p: Progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    /* private mode */
  }
}

/* -------------------------------------------------------------------------- */

const emit = () => window.dispatchEvent(new Event("pmc-store"));

export function signIn(provider: Provider, email?: string): Account {
  const name =
    provider === "email" && email
      ? email.split("@")[0].replace(/[._-]/g, " ")
      : provider === "google"
        ? "Google account"
        : "Apple account";
  const account: Account = {
    id: `local-${Date.now()}`,
    name,
    email: email ?? `you@${provider}.com`,
    provider,
  };
  writeAccount(account);
  emit();
  return account;
}

export function signOut() {
  writeAccount(null);
  emit();
}

export function setDomain(domain: string) {
  const a = readAccount();
  if (!a) return;
  writeAccount({ ...a, domain });
  emit();
}

export function markDone(levelSlug: string, lessonSlug: string, done: boolean) {
  const key = `${levelSlug}/${lessonSlug}`;
  const p = readProgress();
  const already = p.done.includes(key);
  const next = done
    ? { done: Array.from(new Set([...p.done, key])) }
    : { done: p.done.filter((k) => k !== key) };
  writeProgress(next);

  /* Finishing a lesson is the single most common thing a learner does, so it
     is what most of the workspace is built from. Recorded once: unmarking and
     re-marking a lesson does not manufacture a second day of activity, which
     would otherwise be the easiest way to fake a streak. */
  if (done && !already) {
    const found = getLesson(levelSlug, lessonSlug);
    recordActivity({
      type: "lesson_completed",
      label: found?.lesson.title ?? lessonSlug,
      entityId: key,
      minutes: found?.lesson.minutes,
      dedupeKey: `lesson:${key}`,
    });

    const level = levels.find((l) => l.slug === levelSlug);
    if (level) {
      const all = levelLessons(level);
      const complete = all.every((x) => next.done.includes(`${levelSlug}/${x.slug}`));
      if (complete) {
        recordActivity({
          type: "level_completed",
          label: `Level ${level.n}, ${level.rank}`,
          entityId: levelSlug,
          dedupeKey: `level:${levelSlug}`,
        });
      }
    }
  }

  emit();
}

/* -------------------------------------------------------------------------- */
/* Gating. Level 1 is always open. Each later level opens when the one before  */
/* it is complete. This is the only place that rule lives.                     */
/* -------------------------------------------------------------------------- */

export function levelComplete(slug: string, done: string[]) {
  const level = levels.find((l) => l.slug === slug);
  if (!level) return false;
  const all = levelLessons(level);
  return all.length > 0 && all.every((x) => done.includes(`${slug}/${x.slug}`));
}

export function levelUnlocked(slug: string, done: string[]) {
  const i = levels.findIndex((l) => l.slug === slug);
  if (i < 0) return false;
  return levels.slice(0, i).every(level => levelComplete(level.slug, done));
}

export function levelPercent(slug: string, done: string[]) {
  const level = levels.find((l) => l.slug === slug);
  if (!level) return 0;
  const all = levelLessons(level);
  if (!all.length) return 0;
  const n = all.filter((x) => done.includes(`${slug}/${x.slug}`)).length;
  return Math.round((n / all.length) * 100);
}

/* -------------------------------------------------------------------------- */

export function useStore() {
  const [account, setAccount] = useState<Account | null>(null);
  const [progress, setProgress] = useState<Progress>({ done: [] });
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    setAccount(readAccount());
    setProgress(readProgress());
  }, []);

  useEffect(() => {
    sync();
    setReady(true);
    window.addEventListener("pmc-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pmc-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return { account, progress, ready };
}

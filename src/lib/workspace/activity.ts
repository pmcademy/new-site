import { MEANINGFUL, type LearningActivity, type TimeOfDay } from "./types";

/* -------------------------------------------------------------------------- */
/* Days                                                                        */
/* -------------------------------------------------------------------------- */

const DAY_MS = 86_400_000;

export function dayKey(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseDay(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Whole days between two local calendar days, ignoring clocks and DST. */
export function daysBetween(a: string, b: string) {
  return Math.round((parseDay(b).getTime() - parseDay(a).getTime()) / DAY_MS);
}

export function shiftDay(key: string, by: number) {
  const d = parseDay(key);
  d.setDate(d.getDate() + by);
  return dayKey(d);
}

/* -------------------------------------------------------------------------- */
/* Streaks                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A day counts only if the learner did something that took effort.
 *
 * Logging in does not count, and neither does earning a badge, since a badge
 * is a consequence of work rather than work itself. Counting either would let
 * the streak run on its own, which is the failure mode this rule exists to
 * prevent.
 */
export function meaningfulDays(activity: LearningActivity[]) {
  const days = new Map<string, number>();
  for (const a of activity) {
    if (!MEANINGFUL.includes(a.type)) continue;
    days.set(a.day, (days.get(a.day) ?? 0) + 1);
  }
  return days;
}

export function computeStreak(activity: LearningActivity[], today = dayKey(new Date())) {
  const days = meaningfulDays(activity);
  const activeToday = days.has(today);

  /* Yesterday still counts as alive: the streak breaks at the end of the next
     day, not at midnight, or a learner in a different timezone loses a streak
     they did not lose. */
  let cursor = activeToday ? today : shiftDay(today, -1);
  let current = 0;
  while (days.has(cursor)) {
    current += 1;
    cursor = shiftDay(cursor, -1);
  }

  /* Longest run anywhere in the history. */
  const sorted = [...days.keys()].sort();
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of sorted) {
    run = prev && daysBetween(prev, day) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = day;
  }

  return { current, longest: Math.max(longest, current), activeToday };
}

/** The last `span` days, oldest first, for the calendar object and panel. */
export function calendarDays(
  activity: LearningActivity[],
  span = 91,
  today = dayKey(new Date())
) {
  const days = meaningfulDays(activity);
  const out: { day: string; count: number }[] = [];
  for (let i = span - 1; i >= 0; i--) {
    const day = shiftDay(today, -i);
    out.push({ day, count: days.get(day) ?? 0 });
  }
  return out;
}

export function activityForDay(activity: LearningActivity[], day: string) {
  return activity
    .filter((a) => a.day === day)
    .sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
}

export function minutesLearned(activity: LearningActivity[]) {
  return activity.reduce((sum, a) => sum + (a.minutes ?? 0), 0);
}

/* -------------------------------------------------------------------------- */
/* Time of day                                                                 */
/* -------------------------------------------------------------------------- */

export function timeOfDay(now = new Date()): TimeOfDay {
  const h = now.getHours();
  if (h < 6) return "night";
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";
  return "night";
}

export const isDark = (t: TimeOfDay) => t === "night" || t === "evening";

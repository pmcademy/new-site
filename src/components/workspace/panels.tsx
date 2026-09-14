"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { activityForDay, parseDay } from "@/lib/workspace/activity";
import { badges as catalogue } from "@/lib/workspace/badges";
import { encodeSnapshot, toSnapshot } from "@/lib/workspace/snapshot";
import {
  saveProject,
  savePublished,
  toggleHidden,
  updateProfile,
} from "@/lib/workspace/store";
import type { ProjectType, WorkspaceState, WorkspaceVisibility } from "@/lib/workspace/types";

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                 */
/* -------------------------------------------------------------------------- */

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-[var(--r-lg)] border border-dashed border-line px-[var(--s-5)] py-[var(--s-6)] text-center text-[14.5px] text-ink-2">
      {children}
    </p>
  );
}

function Stat({ v, k }: { v: string | number; k: string }) {
  return (
    <div>
      <p className="text-[22px] font-semibold tracking-[-0.02em]">{v}</p>
      <p className="text-[12.5px] text-ink-3">{k}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The laptop. A mentor that knows what you actually did.                      */
/* -------------------------------------------------------------------------- */

const GREETING: Record<string, string> = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Still up",
};

/**
 * Nudges are computed from real state and ordered by how much they matter.
 * Only the first one is shown, because a wall of advice is not advice.
 */
function nudge(s: WorkspaceState) {
  const stale = s.projects.find(
    (p) =>
      p.status === "draft" &&
      Date.now() - new Date(p.updatedAt).getTime() > 5 * 86_400_000
  );

  if (s.streak.current > 0 && !s.streak.activeToday) {
    return `Your ${s.streak.current} day streak is still alive, but only until the end of today.`;
  }
  if (stale) {
    return `You have not touched ${stale.title} in a few days. It is still a draft.`;
  }
  if (s.caseStudies.length === 0) {
    return "You have not read a teardown yet. They are the fastest way to build product judgement, and the shelf is empty.";
  }
  if (s.progress.lessonsCompleted >= 3 && s.projects.length === 0) {
    return "You have finished lessons but submitted nothing. The projects are the part that gets read by other people.";
  }
  if (s.projects.length >= 2 && s.published.length === 0) {
    return "You have projects worth writing about. Publishing one somewhere public is how people find you.";
  }
  return null;
}

export function MentorPanel({ state }: { state: WorkspaceState }) {
  const last = state.activity[0];
  const n = nudge(state);

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      <div>
        <p className="text-[17px]">
          {GREETING[state.environment.timeOfDay]}
          {state.profile.displayName ? `, ${state.profile.displayName.split(" ")[0]}` : ""}.
        </p>
        {state.progress.currentLevelRank && (
          <p className="mt-[var(--s-2)] text-[14.5px] text-ink-2">
            You are working through Level {state.progress.currentLevelSlug},{" "}
            {state.progress.currentLevelRank}. {state.progress.completionPercent}% of the
            course is behind you.
          </p>
        )}
      </div>

      {last && (
        <div>
          <span className="eyebrow">Last thing you did</span>
          <p className="mt-[var(--s-2)] text-[15px]">{last.label}</p>
          <p className="text-[13px] text-ink-3">{fmt(last.occurredAt)}</p>
        </div>
      )}

      {state.progress.nextLesson ? (
        <div className="rounded-[var(--r-lg)] border border-line bg-surface-2 p-[var(--s-5)]">
          <span className="eyebrow">Next</span>
          <p className="mt-[var(--s-2)] text-[16px] font-medium">
            {state.progress.nextLesson.title}
          </p>
          <p className="mt-[var(--s-1)] text-[13.5px] text-ink-3">
            About {state.progress.nextLesson.minutes} minutes
          </p>
          <Link
            href={`/levels/${state.progress.nextLesson.levelSlug}/${state.progress.nextLesson.slug}`}
            className="btn btn-primary mt-[var(--s-4)]"
          >
            Continue
          </Link>
        </div>
      ) : (
        <Empty>
          Every lesson is done. What is left is the work: submit a project, write
          something, and put it on the shelf.
        </Empty>
      )}

      {n && (
        <div className="note note-amber">
          <span className="eyebrow">Worth knowing</span>
          <p>{n}</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The shelf                                                                   */
/* -------------------------------------------------------------------------- */

const MILESTONES = [1, 5, 10, 25, 50];

export function CasesPanel({ state }: { state: WorkspaceState }) {
  const n = state.caseStudies.length;
  const next = MILESTONES.find((m) => m > n);

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      <div className="flex flex-wrap gap-[var(--s-7)]">
        <Stat v={n} k={n === 1 ? "book on the shelf" : "books on the shelf"} />
        {next && <Stat v={next - n} k={`until ${next}`} />}
      </div>

      {n === 0 ? (
        <Empty>
          Read a case study to the end and a book with its title appears here.
          Opening the page is not enough, which is deliberate.
        </Empty>
      ) : (
        <ul className="flex list-none flex-col gap-[var(--s-2)] p-0">
          {state.caseStudies.map((c) => (
            <li key={c.caseStudyId}>
              <Link
                href={c.href}
                className="flex items-center justify-between gap-[var(--s-4)] rounded-[var(--r-lg)] border border-line px-[var(--s-4)] py-[var(--s-3)] transition-colors hover:border-line-2"
              >
                <span className="text-[14.5px]">{c.title}</span>
                <span className="shrink-0 text-[12.5px] text-ink-3">
                  {c.completedAt ? fmt(c.completedAt) : `${c.readPercent}%`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/case-studies" className="btn btn-outline self-start">
        Find another
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The calendar                                                                */
/* -------------------------------------------------------------------------- */

export function CalendarPanel({ state }: { state: WorkspaceState }) {
  const [selected, setSelected] = useState<string | null>(null);
  const day = selected ?? state.streak.days.at(-1)?.day ?? "";
  const entries = useMemo(
    () => activityForDay(state.activity, day),
    [state.activity, day]
  );

  const weeks: { day: string; count: number }[][] = [];
  state.streak.days.forEach((d, i) => {
    if (i % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(d);
  });

  const minutes = entries.reduce((a, e) => a + (e.minutes ?? 0), 0);

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      <div className="flex flex-wrap gap-[var(--s-7)]">
        <Stat v={state.streak.current} k="day streak" />
        <Stat v={state.streak.longest} k="longest" />
        <Stat
          v={state.streak.days.filter((d) => d.count > 0).length}
          k="active days, 13 weeks"
        />
      </div>

      <div>
        <span className="eyebrow">The last thirteen weeks</span>
        <div className="mt-[var(--s-3)] flex gap-[3px] overflow-x-auto pb-[var(--s-2)]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelected(d.day)}
                  aria-label={`${d.day}, ${d.count} ${
                    d.count === 1 ? "activity" : "activities"
                  }`}
                  aria-pressed={d.day === day}
                  className="ws-cal-cell"
                  data-level={Math.min(d.count, 3)}
                  data-selected={d.day === day || undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--r-lg)] border border-line p-[var(--s-5)]">
        <span className="eyebrow">
          {day
            ? parseDay(day).toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            : "Today"}
        </span>
        {entries.length ? (
          <>
            <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-2)] p-0">
              {entries.map((e) => (
                <li key={e.id} className="flex gap-[var(--s-3)] text-[14.5px]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  <span>
                    <b className="font-medium">{TYPE_LABEL[e.type]}</b> {e.label}
                  </span>
                </li>
              ))}
            </ul>
            {minutes > 0 && (
              <p className="mt-[var(--s-4)] text-[13px] text-ink-3">
                About {minutes} minutes of learning.
              </p>
            )}
          </>
        ) : (
          <p className="mt-[var(--s-3)] text-[14.5px] text-ink-2">
            Nothing recorded on this day.
          </p>
        )}
      </div>
    </div>
  );
}

const TYPE_LABEL: Record<string, string> = {
  lesson_completed: "Completed",
  case_study_read: "Read",
  project_submitted: "Submitted",
  article_published: "Published",
  badge_earned: "Earned",
  referral: "Referral",
  level_completed: "Finished level",
  peer_feedback: "Reviewed",
};

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "teardown", label: "Product teardown" },
  { value: "research", label: "User research" },
  { value: "prd", label: "PRD or spec" },
  { value: "experiment", label: "Experiment plan" },
  { value: "metrics", label: "Metrics framework" },
  { value: "prototype", label: "Prototype" },
  { value: "gtm", label: "Go to market plan" },
  { value: "ai-concept", label: "AI product concept" },
  { value: "memo", label: "Decision memo" },
];

export function ProjectsPanel({ state }: { state: WorkspaceState }) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ProjectType>("teardown");
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    saveProject({
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40),
      title: title.trim(),
      type,
      status: "submitted",
      summary: summary.trim() || undefined,
      url: url.trim() || undefined,
      levelSlug: state.progress.currentLevelSlug,
    });
    setTitle("");
    setUrl("");
    setSummary("");
    setAdding(false);
  }

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      {state.projects.length === 0 && !adding && (
        <Empty>
          No projects yet. Submit one and a folder appears on the floor beside
          the desk, with its own page you can send to someone.
        </Empty>
      )}

      {state.projects.length > 0 && (
        <ul className="flex list-none flex-col gap-[var(--s-2)] p-0">
          {state.projects.map((p) => (
            <li
              key={p.id}
              className="rounded-[var(--r-lg)] border border-line px-[var(--s-4)] py-[var(--s-3)]"
            >
              <div className="flex items-start justify-between gap-[var(--s-4)]">
                <div className="min-w-0">
                  <Link
                    href={`/u/${state.profile.username}/projects/${p.slug}`}
                    className="text-[15px] font-medium hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-[var(--s-1)] text-[12.5px] text-ink-3">
                    {PROJECT_TYPES.find((t) => t.value === p.type)?.label} ·{" "}
                    {p.status} · {fmt(p.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => toggleHidden(p.id)}
                  className="shrink-0 text-[12.5px] text-ink-3 underline underline-offset-4"
                >
                  {state.profile.hidden.includes(p.id) ? "Show publicly" : "Hide"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {adding ? (
        <form onSubmit={submit} className="flex flex-col gap-[var(--s-3)]">
          <label className="eyebrow" htmlFor="p-title">
            What did you make?
          </label>
          <input
            id="p-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Swiggy product teardown"
            className="ws-input"
            required
          />
          <label className="eyebrow" htmlFor="p-type">
            Kind
          </label>
          <select
            id="p-type"
            value={type}
            onChange={(e) => setType(e.target.value as ProjectType)}
            className="ws-input"
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <label className="eyebrow" htmlFor="p-sum">
            One line about it
          </label>
          <input
            id="p-sum"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Why the checkout loses people at the delivery step"
            className="ws-input"
          />
          <label className="eyebrow" htmlFor="p-url">
            Link, if it lives somewhere
          </label>
          <input
            id="p-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            className="ws-input"
            type="url"
          />
          <div className="flex gap-[var(--s-3)]">
            <button type="submit" className="btn btn-primary">
              Add to the workspace
            </button>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-quiet">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAdding(true)} className="btn btn-outline self-start">
          Submit a project
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Published work                                                              */
/* -------------------------------------------------------------------------- */

export function PublishedPanel({ state }: { state: WorkspaceState }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    let platform: "medium" | "substack" | "linkedin" | "reddit" | "other" = "other";
    const u = url.toLowerCase();
    if (u.includes("medium.com")) platform = "medium";
    else if (u.includes("substack.com")) platform = "substack";
    else if (u.includes("linkedin.com")) platform = "linkedin";
    else if (u.includes("reddit.com")) platform = "reddit";
    savePublished({ title: title.trim(), url: url.trim(), platform });
    setTitle("");
    setUrl("");
  }

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      {state.published.length === 0 ? (
        <Empty>
          Nothing pinned yet. Write up one of your projects on Medium,
          Substack, LinkedIn or your own site, then add the link here.
        </Empty>
      ) : (
        <ul className="flex list-none flex-col gap-[var(--s-2)] p-0">
          {state.published.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-[var(--s-4)] rounded-[var(--r-lg)] border border-line px-[var(--s-4)] py-[var(--s-3)]"
            >
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-[14.5px] hover:underline"
              >
                {p.title}
              </a>
              <span className="text-[12.5px] text-ink-3">{p.platform}</span>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="flex flex-col gap-[var(--s-3)]">
        <label className="eyebrow" htmlFor="w-title">
          Title
        </label>
        <input
          id="w-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ws-input"
          placeholder="What I learned pulling apart a checkout"
          required
        />
        <label className="eyebrow" htmlFor="w-url">
          Where it lives
        </label>
        <input
          id="w-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="ws-input"
          placeholder="https://"
          type="url"
          required
        />
        <button type="submit" className="btn btn-primary self-start">
          Pin it up
        </button>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Badges                                                                      */
/* -------------------------------------------------------------------------- */

export function BadgesPanel({ state }: { state: WorkspaceState }) {
  const earned = new Set(state.badges.map((b) => b.id));
  /* Three unearned badges, as a hint of what is close. Not the whole list:
     some of it should still be a surprise. */
  const upcoming = catalogue.filter((b) => !earned.has(b.id)).slice(0, 3);

  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      {state.badges.length === 0 ? (
        <Empty>Nothing earned yet. The first one arrives with your first finished lesson.</Empty>
      ) : (
        <ul className="grid list-none gap-[var(--s-3)] p-0 sm:grid-cols-2">
          {state.badges.map((b) => (
            <li
              key={b.id}
              className="rounded-[var(--r-lg)] border border-line p-[var(--s-4)]"
            >
              <div className="flex items-baseline justify-between gap-[var(--s-3)]">
                <p className="text-[15px] font-medium">{b.title}</p>
                <span className="ws-rarity" data-rarity={b.rarity}>
                  {b.rarity}
                </span>
              </div>
              <p className="mt-[var(--s-2)] text-[13.5px] text-ink-2">{b.description}</p>
              <p className="mt-[var(--s-2)] text-[12px] text-ink-3">{fmt(b.earnedAt)}</p>
            </li>
          ))}
        </ul>
      )}

      {upcoming.length > 0 && (
        <div>
          <span className="eyebrow">Within reach</span>
          <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-2)] p-0">
            {upcoming.map((b) => (
              <li key={b.id} className="text-[14px] text-ink-2">
                {b.title}. {b.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Streak                                                                      */
/* -------------------------------------------------------------------------- */

const LADDER = [
  [3, "A better desk lamp"],
  [7, "A plant on the floor"],
  [14, "The plant grows"],
  [30, "A framed achievement, and the plant again"],
  [100, "Something you have not seen yet"],
] as const;

export function StreakPanel({ state }: { state: WorkspaceState }) {
  return (
    <div className="flex flex-col gap-[var(--s-5)]">
      <div className="flex flex-wrap gap-[var(--s-7)]">
        <Stat v={state.streak.current} k="days running" />
        <Stat v={state.streak.longest} k="your best" />
        <Stat v={state.streak.activeToday ? "Yes" : "Not yet"} k="counted today" />
      </div>

      {!state.streak.activeToday && (
        <div className="note note-amber">
          <span className="eyebrow">Today is still open</span>
          <p>
            Finish a lesson, read a teardown, or submit something and today
            counts. Opening the site does not, which is why the number means
            something.
          </p>
        </div>
      )}

      <div>
        <span className="eyebrow">What the streak changes in the room</span>
        <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-2)] p-0">
          {LADDER.map(([days, what]) => (
            <li
              key={days}
              className="flex gap-[var(--s-4)] text-[14.5px]"
              data-done={state.streak.longest >= days || undefined}
            >
              <span className="w-12 shrink-0 tabular-nums text-ink-3">{days}d</span>
              <span className={state.streak.longest >= days ? "" : "text-ink-3"}>
                {what}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Share and visibility                                                        */
/* -------------------------------------------------------------------------- */

const VISIBILITY: { value: WorkspaceVisibility; label: string; note: string }[] = [
  { value: "private", label: "Private", note: "Only you. Nobody else can open the link." },
  {
    value: "community",
    label: "Community",
    note: "Other PMcademy learners who are signed in.",
  },
  {
    value: "public",
    label: "Public",
    note: "Anyone with the link, signed in or not. Use this one for a portfolio.",
  },
];

export function SharePanel({ state }: { state: WorkspaceState }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(state.profile.displayName);
  const [username, setUsername] = useState(state.profile.username);
  const [bio, setBio] = useState(state.profile.bio ?? "");

  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    const snap = encodeSnapshot(toSnapshot(state));
    return `${window.location.origin}/u/${state.profile.username}?s=${snap}`;
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked. The field is selectable. */
    }
  }

  return (
    <div className="flex flex-col gap-[var(--s-6)]">
      <div className="flex flex-col gap-[var(--s-3)]">
        <label className="eyebrow" htmlFor="s-name">
          Display name
        </label>
        <input
          id="s-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => updateProfile({ displayName: name })}
          className="ws-input"
        />
        <label className="eyebrow" htmlFor="s-user">
          Username
        </label>
        <div className="flex items-center gap-[var(--s-2)]">
          <span className="text-[14px] text-ink-3">/u/</span>
          <input
            id="s-user"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
            onBlur={() => updateProfile({ username: username.toLowerCase() || "learner" })}
            className="ws-input"
          />
        </div>
        <label className="eyebrow" htmlFor="s-bio">
          One line about you
        </label>
        <input
          id="s-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          onBlur={() => updateProfile({ bio })}
          className="ws-input"
          placeholder="Support lead learning to build product"
        />
      </div>

      <fieldset className="flex flex-col gap-[var(--s-2)] border-0 p-0">
        <legend className="eyebrow mb-[var(--s-2)]">Who can see this workspace</legend>
        {VISIBILITY.map((v) => (
          <label
            key={v.value}
            className="flex cursor-pointer gap-[var(--s-3)] rounded-[var(--r-lg)] border border-line p-[var(--s-4)]"
            data-checked={state.profile.visibility === v.value || undefined}
          >
            <input
              type="radio"
              name="visibility"
              checked={state.profile.visibility === v.value}
              onChange={() => updateProfile({ visibility: v.value })}
              className="mt-1"
            />
            <span>
              <b className="block text-[14.5px] font-medium">{v.label}</b>
              <span className="text-[13.5px] text-ink-2">{v.note}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div>
        <span className="eyebrow">Your link</span>
        <p className="mt-[var(--s-2)] text-[13.5px] text-ink-2">
          The link carries a snapshot of the workspace, so it opens correctly on
          someone else&rsquo;s device. It shows the workspace as it was when you
          copied it. Copy a fresh link after you have done more.
        </p>
        <div className="mt-[var(--s-3)] flex gap-[var(--s-2)]">
          <input readOnly value={url} className="ws-input flex-1" onFocus={(e) => e.currentTarget.select()} />
          <button onClick={copy} className="btn btn-primary shrink-0">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <Link
          href={`/u/${state.profile.username}`}
          className="mt-[var(--s-3)] inline-block text-[13.5px] text-blue underline underline-offset-4"
        >
          Preview the public view
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Panel from "./Panel";
import WorkspaceScene from "./WorkspaceScene";
import { BadgesPanel, CasesPanel, CalendarPanel, StreakPanel } from "./panels";
import { buildWorkspaceState, publicView } from "@/lib/workspace/buildWorkspaceState";
import { decodeSnapshot, type Snapshot } from "@/lib/workspace/snapshot";
import { badgeById } from "@/lib/workspace/badges";
import { shiftDay } from "@/lib/workspace/activity";
import { unlockedObjects, roomStage, STAGE_LABEL } from "@/lib/workspace/unlocks";
import { useWorkspaceRecord } from "@/lib/workspace/store";
import { useStore } from "@/lib/progress";
import type { PanelId } from "@/lib/workspace/scene";
import type { WorkspaceState } from "@/lib/workspace/types";

/**
 * Somebody else's workspace, or your own seen the way a stranger sees it.
 *
 * Two ways in:
 *
 *   1. A share link carrying a snapshot. Works on any device, and is the only
 *      way this can work while the store is local to one browser.
 *   2. Your own machine, viewing your own username. Live, and respects the
 *      visibility setting so you can check what you are actually publishing.
 *
 * Either way this view has no controls: no mark complete, no submit, no
 * settings. It is a portfolio, so it shows the work and nothing else.
 */
export default function PublicWorkspace({
  username,
  snapshotParam,
}: {
  username: string;
  snapshotParam?: string;
}) {
  const record = useWorkspaceRecord();
  const { progress } = useStore();
  const [panel, setPanel] = useState<PanelId | null>(null);

  const snapshot = useMemo(
    () => (snapshotParam ? decodeSnapshot(snapshotParam) : null),
    [snapshotParam]
  );

  const own = useMemo(() => {
    if (!record) return null;
    if (record.profile.username !== username) return null;
    return buildWorkspaceState(record, progress.done);
  }, [record, progress.done, username]);

  /* A snapshot wins, because it is what the person who shared the link meant
     to show, and it is the only thing that works off their machine. */
  const state = snapshot ? fromSnapshot(snapshot) : own ? publicView(own) : null;

  if (record === null && !snapshot) {
    return <div className="ws-skeleton" aria-label="Loading" />;
  }

  if (!state) {
    return (
      <div className="card card-p text-center">
        <h1 className="text-[20px]">No workspace here yet</h1>
        <p className="mx-auto mt-[var(--s-3)] max-w-[48ch] text-ink-2">
          Workspaces currently live in the browser they were built in, so this
          address only resolves from a share link or on the learner&rsquo;s own
          device.
        </p>
        <Link href="/workspace" className="btn btn-primary mt-[var(--s-5)]">
          Open your own workspace
        </Link>
      </div>
    );
  }

  const isOwn = !snapshot && own;
  const hiddenByOwner = isOwn && own.profile.visibility === "private";

  return (
    <div className="flex flex-col gap-[var(--s-6)]">
      {hiddenByOwner && (
        <div className="note note-amber">
          <span className="eyebrow">Only you can see this</span>
          <p>
            This workspace is set to private, so the link does nothing for
            anyone else. Change it under Share workspace.
          </p>
        </div>
      )}

      <header className="flex flex-wrap items-end justify-between gap-[var(--s-5)]">
        <div>
          <span className="eyebrow">{STAGE_LABEL[state.environment.stage]}</span>
          <h1 className="mt-[var(--s-2)] text-[clamp(1.7rem,3.4vw,2.3rem)]">
            {state.profile.displayName}
          </h1>
          {state.profile.bio && (
            <p className="mt-[var(--s-2)] max-w-[52ch] text-ink-2">{state.profile.bio}</p>
          )}
        </div>
        <dl className="flex flex-wrap gap-[var(--s-6)]">
          <Stat v={state.progress.lessonsCompleted} k="lessons" />
          <Stat v={state.progress.levelsCompleted} k="levels" />
          <Stat v={state.caseStudies.length} k="case studies" />
          <Stat v={state.projects.length} k="projects" />
          <Stat v={state.published.length} k="published" />
          <Stat v={state.streak.longest} k="best streak" />
        </dl>
      </header>

      <WorkspaceScene state={state} onOpen={setPanel} />

      {/* Below the room, the same evidence in plain text, for anyone who wants
          to read it rather than look at it. Also what search engines see. */}
      <div className="grid gap-[var(--s-6)] lg:grid-cols-2">
        <Section title="Projects">
          {state.projects.length ? (
            <ul className="ws-list">
              {state.projects.map((p) => (
                <li key={p.id}>
                  <Link href={`/u/${username}/projects/${p.slug}`}>{p.title}</Link>
                  <span>{p.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14.5px] text-ink-3">Nothing published yet.</p>
          )}
        </Section>

        <Section title="Published work">
          {state.published.length ? (
            <ul className="ws-list">
              {state.published.map((w) => (
                <li key={w.id}>
                  <a href={w.url} target="_blank" rel="noreferrer">
                    {w.title}
                  </a>
                  <span>{w.platform}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14.5px] text-ink-3">Nothing published yet.</p>
          )}
        </Section>

        <Section title="Case studies read">
          {state.caseStudies.length ? (
            <ul className="ws-list">
              {state.caseStudies.map((c) => (
                <li key={c.caseStudyId}>
                  <Link href={c.href}>{c.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14.5px] text-ink-3">None yet.</p>
          )}
        </Section>

        <Section title="Achievements">
          {state.badges.length ? (
            <ul className="ws-list">
              {state.badges.map((b) => (
                <li key={b.id}>
                  <span>{b.title}</span>
                  <span>{b.earnedAt.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14.5px] text-ink-3">None yet.</p>
          )}
        </Section>
      </div>

      <p className="text-[13px] text-ink-3">
        Built at PMcademy, where the course is free.{" "}
        <Link href="/levels" className="text-blue underline underline-offset-4">
          Start your own
        </Link>
        .
      </p>

      <Panel
        open={panel !== null}
        title={panel ? panel[0].toUpperCase() + panel.slice(1) : ""}
        onClose={() => setPanel(null)}
        wide={panel === "calendar" || panel === "badges"}
      >
        {panel === "cases" && <CasesPanel state={state} />}
        {panel === "calendar" && <CalendarPanel state={state} />}
        {panel === "badges" && <BadgesPanel state={state} />}
        {panel === "streak" && <StreakPanel state={state} />}
        {(panel === "mentor" || panel === "projects" || panel === "published" || panel === "share") && (
          <p className="text-[15px] text-ink-2">
            This is a public workspace, so the controls are not here. The work
            itself is listed below the room.
          </p>
        )}
      </Panel>
    </div>
  );
}

function Stat({ v, k }: { v: number | string; k: string }) {
  return (
    <div>
      <dd className="text-[20px] font-semibold tracking-[-0.02em]">{v}</dd>
      <dt className="text-[12.5px] text-ink-3">{k}</dt>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card card-p">
      <h2 className="text-[16px]">{title}</h2>
      <div className="mt-[var(--s-4)]">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Rebuild enough of a WorkspaceState from a share snapshot to draw the room. */
function fromSnapshot(s: Snapshot): WorkspaceState {
  const iso = (day: string) => `${day}T12:00:00.000Z`;

  const badges = s.g.map(([id, at]) => {
    const meta = badgeById(id);
    return {
      id,
      title: meta?.title ?? id,
      description: meta?.description ?? "",
      rarity: meta?.rarity ?? ("common" as const),
      earnedAt: iso(at),
    };
  });

  const days = Array.from({ length: 91 }, (_, i) => {
    const offset = 90 - i;
    return { day: shiftDay(s.t, -offset), count: s.d.includes(offset) ? 1 : 0 };
  });

  const facts = {
    lessonsCompleted: s.p[0],
    levelsCompleted: s.p[1],
    completedLevelSlugs: [],
    caseStudiesRead: s.c.length,
    projectsSubmitted: s.j.length,
    teardownsSubmitted: s.j.filter((j) => j[2] === "teardown").length,
    articlesPublished: s.w.length,
    referrals: s.r,
    currentStreak: s.k[0],
  };

  return {
    profile: {
      username: s.u,
      displayName: s.n,
      bio: s.b,
      visibility: "public",
      hidden: [],
      timeOverride: null,
    },
    progress: {
      lessonsCompleted: s.p[0],
      levelsCompleted: s.p[1],
      completionPercent: s.p[2],
    },
    streak: { current: s.k[0], longest: s.k[1], activeToday: s.d.includes(0), days },
    caseStudies: s.c.map(([title, href], i) => ({
      caseStudyId: `snap-${i}`,
      title,
      href,
      firstOpenedAt: iso(s.t),
      completedAt: iso(s.t),
      readPercent: 100,
    })),
    projects: s.j.map(([title, slug, type, status], i) => ({
      id: `snap-p${i}`,
      slug,
      title,
      type: type as WorkspaceState["projects"][number]["type"],
      status: status as WorkspaceState["projects"][number]["status"],
      createdAt: iso(s.t),
      updatedAt: iso(s.t),
      visible: true,
    })),
    published: s.w.map(([title, url, platform], i) => ({
      id: `snap-w${i}`,
      title,
      url,
      platform: platform as WorkspaceState["published"][number]["platform"],
      createdAt: iso(s.t),
      visible: true,
    })),
    badges,
    referrals: { total: s.r, converted: s.r },
    activity: [],
    environment: {
      stage: s.st ?? roomStage(facts),
      unlocked: unlockedObjects(facts, s.g.map(([id]) => id)),
      timeOfDay: "afternoon",
    },
    totals: { lessons: 0, minutesLearned: 0 },
  };
}

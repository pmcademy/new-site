"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Panel from "./Panel";
import WorkspaceIndex from "./WorkspaceIndex";
import WorkspaceScene, { EmptyRoomNote } from "./WorkspaceScene";
import {
  BadgesPanel,
  CalendarPanel,
  CasesPanel,
  MentorPanel,
  ProjectsPanel,
  PublishedPanel,
  SharePanel,
  StreakPanel,
} from "./panels";
import { useStore } from "@/lib/progress";
import { buildWorkspaceState } from "@/lib/workspace/buildWorkspaceState";
import { STAGE_LABEL } from "@/lib/workspace/unlocks";
import { awardBadges, useWorkspaceRecord, updateProfile } from "@/lib/workspace/store";
import type { PanelId } from "@/lib/workspace/scene";
import type { TimeOfDay } from "@/lib/workspace/types";

const PANEL_META: Record<PanelId, { title: string; subtitle?: string; wide?: boolean }> = {
  mentor: { title: "Where you are", subtitle: "Read from what you have actually done" },
  cases: { title: "Case study shelf" },
  calendar: { title: "Learning activity", wide: true },
  projects: { title: "Projects" },
  published: { title: "Published work" },
  badges: { title: "Achievements", wide: true },
  streak: { title: "Your streak" },
  share: { title: "Share your workspace" },
};

const TIMES: TimeOfDay[] = ["morning", "afternoon", "evening", "night"];

export default function Workspace() {
  const { account, ready } = useStore();
  const { progress } = useStore();
  const record = useWorkspaceRecord();
  const [panel, setPanel] = useState<PanelId | null>(null);

  const state = useMemo(
    () => (record ? buildWorkspaceState(record, progress.done) : null),
    [record, progress.done]
  );

  /* Awarding is a side effect of qualifying, and it happens once. The state
     builder already knows what is deserved, so this only writes down when. */
  useEffect(() => {
    if (!state) return;
    awardBadges(state.badges.map((b) => b.id));
  }, [state]);

  /* Take the display name from the account the first time we see one. */
  useEffect(() => {
    if (!record || !account) return;
    if (record.profile.displayName === "Learner" && account.name) {
      updateProfile({
        displayName: account.name,
        username:
          record.profile.username === "learner"
            ? account.email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase()
            : record.profile.username,
      });
    }
  }, [record, account]);

  if (!record || !state) {
    return <div className="ws-skeleton" aria-label="Loading your workspace" />;
  }

  if (ready && !account) {
    return (
      <div className="card card-p text-center">
        <h1 className="text-[22px]">Your workspace is behind sign in.</h1>
        <p className="mx-auto mt-[var(--s-3)] max-w-[46ch] text-ink-2">
          It has to be, or it could not remember anything. Nothing is charged
          and the course stays free.
        </p>
        <Link href="/signin?next=/workspace" className="btn btn-primary mt-[var(--s-5)]">
          Sign in
        </Link>
      </div>
    );
  }

  const meta = panel ? PANEL_META[panel] : null;
  const empty = state.environment.stage === 0;

  return (
    <div className="flex flex-col gap-[var(--s-6)]">
      {/* ------------------------------------------------------------ head */}
      <div className="flex flex-wrap items-end justify-between gap-[var(--s-4)]">
        <div>
          <span className="eyebrow">
            {STAGE_LABEL[state.environment.stage]}
          </span>
          <h1 className="mt-[var(--s-2)] text-[clamp(1.5rem,3vw,2rem)]">
            {state.profile.displayName === "Learner"
              ? "Your workspace"
              : `${state.profile.displayName.split(" ")[0]}'s workspace`}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-[var(--s-3)]">
          <dl className="flex gap-[var(--s-5)]">
            <div>
              <dd className="text-[18px] font-semibold">{state.progress.lessonsCompleted}</dd>
              <dt className="text-[12px] text-ink-3">lessons</dt>
            </div>
            <div>
              <dd className="text-[18px] font-semibold">{state.caseStudies.length}</dd>
              <dt className="text-[12px] text-ink-3">books</dt>
            </div>
            <div>
              <dd className="text-[18px] font-semibold">{state.projects.length}</dd>
              <dt className="text-[12px] text-ink-3">projects</dt>
            </div>
            <div>
              <dd className="text-[18px] font-semibold">{state.streak.current}</dd>
              <dt className="text-[12px] text-ink-3">day streak</dt>
            </div>
          </dl>
          <button onClick={() => setPanel("share")} className="btn btn-outline">
            Share workspace
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------- scene */}
      <div className="relative">
        <WorkspaceScene state={state} onOpen={setPanel} />
        {empty && <EmptyRoomNote />}

        {/* Time of day. Follows the clock until the learner says otherwise. */}
        <div className="ws-time">
          <span className="eyebrow">Light</span>
          {TIMES.map((t) => (
            <button
              key={t}
              onClick={() =>
                updateProfile({
                  timeOverride: state.profile.timeOverride === t ? null : t,
                })
              }
              aria-pressed={state.environment.timeOfDay === t}
              className="ws-time-btn"
              data-on={state.environment.timeOfDay === t || undefined}
            >
              {t}
            </button>
          ))}
          {state.profile.timeOverride && (
            <button
              onClick={() => updateProfile({ timeOverride: null })}
              className="ws-time-btn"
            >
              follow the clock
            </button>
          )}
        </div>
      </div>

      {/* -------------------------------------------- the same room, listed */}
      <WorkspaceIndex state={state} onOpen={setPanel} />

      {/* ---------------------------------------------------------- panels */}
      <Panel
        open={panel !== null}
        title={meta?.title ?? ""}
        subtitle={meta?.subtitle}
        wide={meta?.wide}
        onClose={() => setPanel(null)}
      >
        {panel === "mentor" && <MentorPanel state={state} />}
        {panel === "cases" && <CasesPanel state={state} />}
        {panel === "calendar" && <CalendarPanel state={state} />}
        {panel === "projects" && <ProjectsPanel state={state} />}
        {panel === "published" && <PublishedPanel state={state} />}
        {panel === "badges" && <BadgesPanel state={state} />}
        {panel === "streak" && <StreakPanel state={state} />}
        {panel === "share" && <SharePanel state={state} />}
      </Panel>
    </div>
  );
}

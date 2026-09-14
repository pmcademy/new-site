"use client";

import type { PanelId } from "@/lib/workspace/scene";
import type { WorkspaceState } from "@/lib/workspace/types";

/**
 * The room, as a list.
 *
 * Every hotspot in the scene is also here, in reading order, with the same
 * label and a count. This is not a fallback nobody tests: it is the fastest
 * way to use the workspace with a keyboard, it is what a screen reader gets,
 * and it is what appears when the room is scrolled off to one side on a phone.
 */
export default function WorkspaceIndex({
  state,
  onOpen,
}: {
  state: WorkspaceState;
  onOpen: (panel: PanelId) => void;
}) {
  const items: { panel: PanelId; label: string; value: string }[] = [
    {
      panel: "mentor",
      label: "Continue learning",
      value: state.progress.nextLesson?.title ?? "Everything is done",
    },
    {
      panel: "cases",
      label: "Case study shelf",
      value: `${state.caseStudies.length} ${
        state.caseStudies.length === 1 ? "book" : "books"
      }`,
    },
    {
      panel: "calendar",
      label: "Learning activity",
      value: `${state.streak.days.filter((d) => d.count > 0).length} active days`,
    },
    {
      panel: "projects",
      label: "Projects",
      value: `${state.projects.length} submitted`,
    },
    {
      panel: "published",
      label: "Published work",
      value: `${state.published.length} pinned`,
    },
    {
      panel: "badges",
      label: "Achievements",
      value: `${state.badges.length} earned`,
    },
    {
      panel: "streak",
      label: "Streak",
      value: `${state.streak.current} days`,
    },
  ];

  return (
    <nav aria-label="Everything in your workspace">
      <ul className="ws-index">
        {items.map((i) => (
          <li key={i.panel}>
            <button onClick={() => onOpen(i.panel)} className="ws-index-btn">
              <span className="text-[14.5px] font-medium">{i.label}</span>
              <span className="text-[13px] text-ink-3">{i.value}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

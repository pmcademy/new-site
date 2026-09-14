"use client";

import { useEffect, useRef, useState } from "react";

import Bookshelf from "./objects/Bookshelf";
import CalendarObject from "./objects/CalendarObject";
import Certificates from "./objects/Certificates";
import Corkboard from "./objects/Corkboard";
import WorkspaceObject from "./WorkspaceObject";
import { isDark } from "@/lib/workspace/activity";
import {
  ROOM_H,
  ROOM_W,
  artSrc,
  visibleObjects,
  type PanelId,
  type SceneObject,
} from "@/lib/workspace/scene";
import type { WorkspaceState } from "@/lib/workspace/types";
import { cn } from "@/lib/utils";

/**
 * The room.
 *
 * One fixed coordinate space scaled to fit, so the composition is identical at
 * every width and a position in the manifest means the same thing everywhere.
 * On a phone the room is wider than the viewport and scrolls sideways, which
 * is the one thing the brief was explicit about: do not shrink the desktop
 * room until nobody can hit anything.
 */
export default function WorkspaceScene({
  state,
  onOpen,
  interactive = true,
}: {
  state: WorkspaceState;
  onOpen: (panel: PanelId) => void;
  /** A public workspace is looked at, not operated. */
  interactive?: boolean;
}) {
  const dark = isDark(state.environment.timeOfDay);
  const objects = visibleObjects(state.environment.unlocked);
  const scroller = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(false);

  /* On a narrow screen, start the view on the desk rather than the far wall. */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    if (overflow > 24) {
      el.scrollLeft = overflow * 0.55;
      setHint(true);
      const t = setTimeout(() => setHint(false), 2600);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="ws-scroller"
        role="group"
        aria-label="Your workspace. Scroll sideways to see the whole room."
      >
        <div
          className="ws-stage"
          data-time={state.environment.timeOfDay}
          style={{ aspectRatio: `${ROOM_W} / ${ROOM_H}` }}
        >
          {/* the room itself */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artSrc("room", dark)}
            alt=""
            className="ws-room"
            width={ROOM_W}
            height={ROOM_H}
            fetchPriority="high"
          />

          {objects
            .slice()
            .sort((a, b) => a.z - b.z)
            .map((o) => (
              <WorkspaceObject
                key={o.id}
                object={o}
                dark={dark}
                interactive={interactive}
                onOpen={onOpen}
              >
                {o.dynamic ? renderDynamic(o, state, dark) : null}
              </WorkspaceObject>
            ))}

          {/* Ambient motion, one element, killed by prefers-reduced-motion. */}
          <div className="ws-dust" aria-hidden="true" />
        </div>
      </div>

      {hint && (
        <p className="ws-pan-hint" aria-hidden="true">
          Scroll sideways to see the room
        </p>
      )}
    </div>
  );
}

function renderDynamic(o: SceneObject, state: WorkspaceState, dark: boolean) {
  switch (o.dynamic) {
    case "bookshelf":
      return <Bookshelf caseStudies={state.caseStudies} dark={dark} />;
    case "corkboard":
      return <Corkboard published={state.published} dark={dark} />;
    case "certificates":
      return <Certificates badges={state.badges} dark={dark} />;
    case "calendar":
      return <CalendarObject days={state.streak.days} dark={dark} />;
    default:
      return null;
  }
}

/** The empty-room message, shown over the scene on a brand new workspace. */
export function EmptyRoomNote({ className }: { className?: string }) {
  return (
    <div className={cn("ws-empty", className)}>
      <p className="text-[15px] font-medium">This room is yours, and it is empty.</p>
      <p className="mt-[var(--s-2)] text-[14px] text-ink-2">
        Finish a lesson and paper appears on the desk. Read a case study and a
        book goes on the shelf. Nothing here is decoration: every object is
        something you did.
      </p>
    </div>
  );
}

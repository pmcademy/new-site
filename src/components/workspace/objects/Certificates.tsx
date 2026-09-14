"use client";

import type { WorkspaceState } from "@/lib/workspace/types";

/**
 * A framed certificate for every level finished, hung in a row above the desk.
 *
 * The frames for levels not yet earned are not drawn as grey ghosts. Showing a
 * learner six empty slots on day one is a progress bar wearing a costume, and
 * the room is supposed to fill up rather than start full and drain.
 */

const RANKS = [
  "Apprentice",
  "Practitioner",
  "Artisan",
  "Operator",
  "Architect",
  "Principal",
];

const W = 500;
const H = 76;

export default function Certificates({
  badges,
  dark,
}: {
  badges: WorkspaceState["badges"];
  dark: boolean;
}) {
  const earned = badges
    .map((b) => /^level-(\d)$/.exec(b.id))
    .filter(Boolean)
    .map((m) => Number(m![1]))
    .sort((a, b) => a - b);

  if (!earned.length) return <span className="sr-only">No level certificates yet</span>;

  const frame = dark ? "#4a3d2b" : "#a87b42";
  const paper = dark ? "#d9cfae" : "#fff7df";
  const ink = dark ? "#3a3222" : "#344659";
  const accent = dark ? "#5d7d8c" : "#5c7f95";

  const gap = 12;
  const cw = 54;
  const startX = (W - (earned.length * cw + (earned.length - 1) * gap)) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ws-art" aria-hidden="true">
      {earned.map((n, i) => {
        const x = startX + i * (cw + gap);
        return (
          <g key={n}>
            <rect x={x} y={4} width={cw} height={68} rx={3} fill={frame} />
            <rect x={x + 4} y={8} width={cw - 8} height={60} rx={2} fill={paper} />
            <path
              d={`M${x + cw / 2} 20 l12 7 v14 l-12 7 l-12 -7 v-14 Z`}
              fill="none"
              stroke={accent}
              strokeWidth={2}
            />
            <text
              x={x + cw / 2}
              y={44}
              textAnchor="middle"
              fontSize={9}
              fontFamily="var(--serif)"
              fill={ink}
            >
              {String(n).padStart(2, "0")}
            </text>
            <text
              x={x + cw / 2}
              y={60}
              textAnchor="middle"
              fontSize={6}
              fontFamily="var(--sans)"
              fill={ink}
              opacity={0.75}
            >
              {RANKS[n - 1]?.slice(0, 11)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

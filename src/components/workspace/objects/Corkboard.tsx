"use client";

import type { PublishedWork } from "@/lib/workspace/types";

/**
 * Published work, pinned up.
 *
 * Each card is a real article the learner put somewhere public. The board
 * starts empty on purpose: an empty corkboard above your desk is a better
 * prompt than a placeholder that pretends you have written something.
 */

const W = 262;
const H = 164;

const TILT = [-3, 2, -1.5, 3, -2.5, 1];

export default function Corkboard({
  published,
  dark,
}: {
  published: PublishedWork[];
  dark: boolean;
}) {
  const paper = dark ? "#d9cfae" : "#fff7df";
  const ink = dark ? "#3a3222" : "#5b6f7d";
  const pin = dark ? "#8c5647" : "#c77764";

  const items = published.slice(0, 6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ws-art" aria-hidden="true">
      {items.map((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 12 + col * 84;
        const y = 14 + row * 76;
        return (
          <g key={p.id} transform={`rotate(${TILT[i % TILT.length]} ${x + 36} ${y + 28})`}>
            <rect x={x} y={y} width={72} height={58} rx={2} fill={paper} />
            <rect x={x} y={y} width={72} height={58} rx={2} fill="#000" opacity={0.05} />
            <text
              x={x + 7}
              y={y + 18}
              fontSize={7}
              fontFamily="var(--sans)"
              fontWeight={600}
              fill={ink}
            >
              {p.title.slice(0, 15)}
            </text>
            <rect x={x + 7} y={y + 26} width={52} height={2.5} rx={1} fill={ink} opacity={0.35} />
            <rect x={x + 7} y={y + 33} width={44} height={2.5} rx={1} fill={ink} opacity={0.28} />
            <text x={x + 7} y={y + 50} fontSize={6} fontFamily="var(--sans)" fill={ink} opacity={0.7}>
              {p.platform.toUpperCase()}
            </text>
            <circle cx={x + 36} cy={y + 4} r={4} fill={pin} />
            <circle cx={x + 34.5} cy={y + 2.5} r={1.3} fill="#fff" opacity={0.6} />
          </g>
        );
      })}

      {items.length === 0 && (
        <text
          x={W / 2}
          y={H / 2}
          textAnchor="middle"
          fontSize={11}
          fontFamily="var(--sans)"
          fill={dark ? "#8a9aa2" : "#6b5a3c"}
          opacity={0.8}
        >
          Publish something and pin it here
        </text>
      )}
    </svg>
  );
}

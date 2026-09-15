"use client";

import type { CaseStudyRead } from "@/lib/workspace/types";

/**
 * One book per case study the learner actually finished.
 *
 * Drawn rather than loaded, because each spine carries a title. Books vary in
 * width, height and label position so the shelf looks collected rather than
 * generated, but the variation is derived from the title, so a given case
 * study always produces the same book. The shelf a learner saw yesterday is
 * the shelf they see today.
 */

const SPINES_DAY = ["#7d5f46", "#5c7f95", "#6d8a70", "#a8794f", "#8a7093", "#4f6a55", "#b0724f"];
const SPINES_NIGHT = ["#4a3a2c", "#3d5a6b", "#3c5148", "#63482f", "#544162", "#2b3b35", "#6a4530"];

/* Three boards, in the slot's own coordinates. */
const ROWS = [
  { y: 64, cap: 58 },
  { y: 138, cap: 58 },
  { y: 194, cap: 52 },
];

const W = 264;
const PAD = 8;

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function Bookshelf({
  caseStudies,
  dark,
}: {
  caseStudies: CaseStudyRead[];
  dark: boolean;
}) {
  const palette = dark ? SPINES_NIGHT : SPINES_DAY;
  const ink = dark ? "#dfd6bd" : "#fff7df";

  /* As the collection grows the spines get thinner rather than the shelf
     getting longer. Twelve books look like a shelf; forty still fit. */
  const n = caseStudies.length;
  const perRow = Math.ceil(n / ROWS.length) || 1;
  const width = Math.max(7, Math.min(17, (W - PAD * 2) / Math.max(perRow, 9) - 3));



  return (
    <svg viewBox={`0 0 ${W} 210`} className="ws-art" aria-hidden="true">
      {ROWS.map((row, r) => {
        const slice = caseStudies.slice(r * perRow, (r + 1) * perRow);

        let x = PAD;

        return (
          <g key={r}>
            {slice.map((c) => {
              const h = hash(c.caseStudyId || c.title);
              const height = Math.min(row.cap, 34 + (h % 3) * 7 + (c.title.length % 5));
              const fill = palette[h % palette.length];
              const lean = h % 11 === 0 && slice.length > 3;
              const bx = x;
              x += width + 3;

              const label = (c.title.split(":")[0] || c.title).slice(0, 16).toUpperCase();

              return (
                <g
                  key={c.caseStudyId}
                  transform={lean ? `rotate(6 ${bx} ${row.y})` : undefined}
                >
                  <rect
                    x={bx}
                    y={row.y - height}
                    width={width}
                    height={height}
                    rx={2}
                    fill={fill}
                  />
                  <rect
                    x={bx}
                    y={row.y - height + 5}
                    width={width}
                    height={2}
                    fill={ink}
                    opacity={0.5}
                  />
                  <rect
                    x={bx}
                    y={row.y - 8}
                    width={width}
                    height={2}
                    fill={ink}
                    opacity={0.35}
                  />
                  {width >= 10 && (
                    <text
                      x={bx + width / 2 + 3}
                      y={row.y - 12}
                      transform={`rotate(-90 ${bx + width / 2} ${row.y - 12})`}
                      fontSize={6}
                      fontFamily="var(--sans)"
                      fill={ink}
                      opacity={0.9}
                    >
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {n === 0 && (
        <text
          x={W / 2}
          y={120}
          textAnchor="middle"
          fontSize={11}
          fontFamily="var(--sans)"
          fill={dark ? "#8a9aa2" : "#5b6f7d"}
          opacity={0.75}
        >
          Read a case study
        </text>
      )}
    </svg>
  );
}

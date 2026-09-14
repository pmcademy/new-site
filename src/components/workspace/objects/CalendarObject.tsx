"use client";

import { parseDay } from "@/lib/workspace/activity";

/**
 * The wall calendar, showing the current month.
 *
 * A filled dot is a day the learner did something that counted. Today is
 * ringed whether or not it is filled, which is the whole point of hanging it
 * on the wall: you can see the gap before it becomes a broken streak.
 */

const W = 70;
const H = 92;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarObject({
  days,
  dark,
}: {
  days: { day: string; count: number }[];
  dark: boolean;
}) {
  const today = days.at(-1)?.day ?? "";
  const now = today ? parseDay(today) : new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const counts = new Map(days.map((d) => [d.day, d.count]));
  const first = new Date(year, month, 1);
  /* Monday first, which is how a working week reads. */
  const offset = (first.getDay() + 6) % 7;
  const total = new Date(year, month + 1, 0).getDate();

  const paper = dark ? "#d9cfae" : "#fff7df";
  const frame = dark ? "#4a3d2b" : "#a87b42";
  const ink = dark ? "#3a3222" : "#344659";
  const on = dark ? "#5d7d8c" : "#4f6a55";

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ws-art" aria-hidden="true">
      <rect x={1} y={4} width={W - 2} height={H - 6} rx={3} fill={frame} />
      <rect x={3} y={6} width={W - 6} height={H - 10} rx={2} fill={paper} />
      <rect x={3} y={6} width={W - 6} height={15} rx={2} fill={frame} opacity={0.85} />
      <text
        x={W / 2}
        y={17}
        textAnchor="middle"
        fontSize={7.5}
        fontFamily="var(--sans)"
        fontWeight={600}
        fill={paper}
      >
        {MONTHS[month].slice(0, 3).toUpperCase()} {String(year).slice(2)}
      </text>

      {Array.from({ length: total }, (_, i) => {
        const day = i + 1;
        const cell = offset + i;
        const cx = 9 + (cell % 7) * 8.6;
        const cy = 30 + Math.floor(cell / 7) * 9.4;
        const key = `${year}-${pad(month + 1)}-${pad(day)}`;
        const active = (counts.get(key) ?? 0) > 0;
        const isToday = key === today;

        return (
          <g key={day}>
            <circle
              cx={cx}
              cy={cy}
              r={active ? 2.7 : 1.5}
              fill={active ? on : ink}
              opacity={active ? 0.95 : 0.22}
            />
            {isToday && (
              <circle cx={cx} cy={cy} r={4.2} fill="none" stroke={on} strokeWidth={1} opacity={0.9} />
            )}
          </g>
        );
      })}

      {/* the nail */}
      <circle cx={W / 2} cy={3} r={2} fill={ink} opacity={0.5} />
    </svg>
  );
}

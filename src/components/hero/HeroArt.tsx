/**
 * HeroArt, a product manager's desk, drawn in line art.
 *
 * Deliberately not another abstract diagram. The job is legible from its
 * artefacts: a flow on the board, a 2x2 on the wall, a wireframe leaning
 * against the desk, a chart on the laptop, sticky notes, cold coffee.
 *
 * Hand-authored SVG. Every colour is a token, so it repaints in dark mode.
 */
export default function HeroArt({ className }: { className?: string }) {
  const S = "var(--navy)"; // primary stroke
  const L = 1.5; // primary stroke weight
  const T = 1.1; // detail stroke weight

  return (
    <svg
      viewBox="0 0 680 430"
      className={className}
      role="img"
      aria-label="Line drawing of a product manager's desk: a whiteboard with a user flow and a prioritisation matrix, a laptop showing a growth chart, a wireframe sketch leaning against the desk, sticky notes, a coffee cup and a phone."
    >
      <g
        fill="none"
        stroke={S}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* ================================================== BACK WALL BOARD */}
        <rect
          x="150"
          y="24"
          width="382"
          height="186"
          rx="8"
          fill="var(--surface)"
          strokeWidth={L}
        />
        {/* board tray */}
        <path d="M150 210 h382" strokeWidth={T} />
        <rect
          x="196"
          y="210"
          width="42"
          height="7"
          rx="3"
          fill="var(--surface-3)"
          strokeWidth={T}
        />

        {/* --- the user flow, top-left of the board --- */}
        <g strokeWidth={T}>
          <rect x="172" y="54" width="52" height="30" rx="4" fill="var(--surface-2)" />
          <rect x="248" y="54" width="52" height="30" rx="4" fill="var(--surface-2)" />
          <rect x="324" y="54" width="52" height="30" rx="4" fill="var(--blue-soft)" />
          {/* connectors */}
          <path d="M224 69 h16" />
          <path d="M236 65 l4 4 -4 4" />
          <path d="M300 69 h16" />
          <path d="M312 65 l4 4 -4 4" />
          {/* the branch that everyone forgets to draw */}
          <path d="M274 84 v26 h52" strokeDasharray="3 4" />
          <rect
            x="326"
            y="96"
            width="52"
            height="28"
            rx="4"
            fill="var(--surface)"
            strokeDasharray="3 4"
          />
          {/* tiny content lines inside the boxes */}
          <path d="M182 64 h22 M182 72 h14" opacity="0.55" />
          <path d="M258 64 h22 M258 72 h14" opacity="0.55" />
          <path d="M334 64 h22 M334 72 h14" opacity="0.55" />
        </g>

        {/* --- prioritisation 2x2, right of the board --- */}
        <g strokeWidth={T}>
          <rect x="410" y="52" width="94" height="94" rx="4" fill="var(--surface-2)" />
          <path d="M410 99 h94 M457 52 v94" opacity="0.6" />
          {/* the winning quadrant, marked */}
          <rect x="457" y="52" width="47" height="47" fill="var(--blue-soft)" stroke="none" />
          <path d="M457 99 h47 M457 52 v47" opacity="0.6" />
        </g>
        {/* scored items */}
        <g strokeWidth={T} fill="var(--blue)" stroke="none">
          <circle cx="470" cy="70" r="3.4" />
          <circle cx="487" cy="80" r="3.4" />
          <circle cx="478" cy="90" r="3.4" />
        </g>
        <g strokeWidth={T} fill="var(--ink-3)" stroke="none" opacity="0.55">
          <circle cx="428" cy="76" r="2.8" />
          <circle cx="440" cy="115" r="2.8" />
          <circle cx="425" cy="128" r="2.8" />
          <circle cx="482" cy="122" r="2.8" />
          <circle cx="494" cy="133" r="2.8" />
        </g>

        {/* --- sticky notes pinned on the board --- */}
        <g strokeWidth={T}>
          <path
            d="M176 128 h44 v36 l-10 10 h-34 z"
            fill="var(--amber-bg)"
          />
          <path d="M220 164 l-10 10 v-10 z" fill="var(--surface-3)" />
          <path d="M186 140 h24 M186 149 h16" opacity="0.5" />

          <path d="M234 132 h44 v46 h-44 z" fill="var(--free-bg)" />
          <path d="M244 144 h24 M244 153 h20 M244 162 h12" opacity="0.5" />

          <path d="M292 138 h40 v40 h-40 z" fill="var(--blue-soft)" />
          <path d="M301 150 h22 M301 159 h14" opacity="0.5" />
        </g>

        {/* ================================================== DESK */}
        <path d="M52 306 h576" strokeWidth={L} />
        <path
          d="M52 306 h576 v9 h-576 z"
          fill="var(--surface-3)"
          strokeWidth={L}
        />
        {/* desk legs, only hinted */}
        <path d="M96 315 v56 M584 315 v56" strokeWidth={T} opacity="0.5" />

        {/* ================================================== LAPTOP */}
        {/* screen */}
        <rect
          x="256"
          y="172"
          width="172"
          height="112"
          rx="7"
          fill="var(--surface)"
          strokeWidth={L}
        />
        <rect
          x="266"
          y="182"
          width="152"
          height="92"
          rx="3"
          fill="var(--surface-2)"
          strokeWidth={T}
        />
        {/* window chrome */}
        <g strokeWidth={T}>
          <path d="M266 195 h152" opacity="0.6" />
          <circle cx="274" cy="188.5" r="2" fill="var(--ink-3)" stroke="none" />
          <circle cx="282" cy="188.5" r="2" fill="var(--ink-3)" stroke="none" />
          <circle cx="290" cy="188.5" r="2" fill="var(--ink-3)" stroke="none" />
        </g>
        {/* the chart: a retention curve that flattens, which is the whole job */}
        <g strokeWidth={T}>
          <path d="M280 262 h124" opacity="0.45" />
          <path d="M280 262 v-52" opacity="0.45" />
          <path d="M280 206 h124" strokeDasharray="2 5" opacity="0.3" />
        </g>
        <path
          d="M281 258 C 300 234, 320 223, 344 218 C 366 214, 382 213, 403 212"
          stroke="var(--blue)"
          strokeWidth="2.2"
        />
        <g fill="var(--blue)" stroke="none">
          <circle cx="403" cy="212" r="3.6" />
        </g>
        {/* base */}
        <path
          d="M240 284 h204 l14 16 h-232 z"
          fill="var(--surface-2)"
          strokeWidth={L}
        />
        <path d="M318 292 h48" strokeWidth={T} opacity="0.6" />

        {/* ================================================== WIREFRAME SKETCH */}
        {/* leaning against the desk, left */}
        <g transform="rotate(-4 150 240)">
          <rect
            x="96"
            y="184"
            width="110"
            height="122"
            rx="5"
            fill="var(--surface)"
            strokeWidth={L}
          />
          <g strokeWidth={T}>
            {/* header + hero block */}
            <rect x="106" y="194" width="90" height="8" rx="2" fill="var(--surface-3)" />
            <rect x="106" y="210" width="90" height="34" rx="3" fill="var(--surface-2)" />
            <path d="M112 238 l14 -14 10 10 8 -8 12 12" opacity="0.45" />
            <circle cx="180" cy="220" r="4" fill="var(--ink-3)" stroke="none" opacity="0.4" />
            {/* two columns */}
            <rect x="106" y="252" width="42" height="26" rx="3" fill="var(--surface-2)" />
            <rect x="154" y="252" width="42" height="26" rx="3" fill="var(--surface-2)" />
            {/* the primary action */}
            <rect x="106" y="286" width="52" height="12" rx="4" fill="var(--blue-soft)" />
            <path d="M166 292 h30" opacity="0.5" />
          </g>
        </g>

        {/* sticky note leaning on the sketch */}
        <g transform="rotate(7 232 282)">
          <rect
            x="208"
            y="258"
            width="48"
            height="48"
            rx="2"
            fill="var(--amber-bg)"
            strokeWidth={T}
          />
          <path
            d="M218 272 h28 M218 281 h20 M218 290 h24"
            strokeWidth={T}
            opacity="0.5"
          />
        </g>

        {/* ================================================== COFFEE */}
        <g strokeWidth={L}>
          <path
            d="M462 250 h46 v40 a10 10 0 0 1 -10 10 h-26 a10 10 0 0 1 -10 -10 z"
            fill="var(--surface)"
          />
          <path
            d="M508 258 h9 a10 10 0 0 1 0 20 h-9"
            fill="var(--surface)"
          />
        </g>
        {/* the coffee itself, long cold */}
        <path
          d="M467 258 h36"
          stroke="var(--ink-3)"
          strokeWidth="3"
          opacity="0.35"
        />
        {/* steam, or the memory of it */}
        <g strokeWidth={T} opacity="0.4">
          <path d="M476 240 c 4 -6 -4 -10 0 -16" />
          <path d="M492 240 c 4 -6 -4 -10 0 -16" />
        </g>

        {/* ================================================== PHONE */}
        <rect
          x="534"
          y="214"
          width="56"
          height="92"
          rx="9"
          fill="var(--surface)"
          strokeWidth={L}
        />
        <rect
          x="541"
          y="228"
          width="42"
          height="66"
          rx="3"
          fill="var(--surface-2)"
          strokeWidth={T}
        />
        <path d="M553 221 h18" strokeWidth={T} opacity="0.6" />
        <g strokeWidth={T} opacity="0.55">
          <path d="M548 240 h28 M548 249 h20" />
          <rect x="548" y="258" width="28" height="14" rx="3" fill="var(--blue-soft)" />
          <path d="M548 282 h28" />
        </g>

        {/* ================================================== PLANT */}
        <g>
          <path
            d="M606 268 h42 l-5 34 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 z"
            fill="var(--surface-2)"
            strokeWidth={L}
          />
          <path d="M606 276 h42" strokeWidth={T} opacity="0.6" />
          <g strokeWidth={T}>
            <path d="M627 268 v-40" />
            <path d="M627 244 c -16 -2 -22 -14 -20 -24 c 12 0 20 10 20 22" fill="var(--free-bg)" />
            <path d="M627 252 c 16 -2 22 -14 20 -24 c -12 0 -20 10 -20 22" fill="var(--free-bg)" />
            <path d="M627 232 c -10 -4 -12 -14 -9 -20 c 8 2 11 10 9 18" fill="var(--free-bg)" />
          </g>
        </g>

        {/* ================================================== LOOSE PAPER, FRONT */}
        <g strokeWidth={T} opacity="0.8">
          <path
            d="M150 322 h96 v40 h-96 z"
            fill="var(--surface)"
            transform="rotate(-3 198 342)"
          />
          <g transform="rotate(-3 198 342)" opacity="0.45">
            <path d="M160 334 h58 M160 343 h72 M160 352 h44" />
          </g>
        </g>

        {/* pen */}
        <g strokeWidth={T}>
          <path
            d="M268 348 h62 l8 5 -8 5 h-62 a5 5 0 0 1 0 -10 z"
            fill="var(--blue-soft)"
            transform="rotate(-6 300 353)"
          />
        </g>

        {/* a very quiet ground line, so the scene sits on something */}
        <path
          d="M40 392 h600"
          strokeWidth={T}
          strokeDasharray="1 8"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

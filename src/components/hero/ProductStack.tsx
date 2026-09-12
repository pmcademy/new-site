/**
 * ProductStack — the hero diagram.
 *
 * An isometric stack of the four layers a product manager actually works
 * across, bottom to top:
 *
 *   1. Signal    scattered, uncorrelated — what users are actually doing
 *   2. Problem   the same field, resolved into clusters, one of them chosen
 *   3. Design    structure: a grid, and screens laid out on it
 *   4. Shipped   one product, standing up, in the world
 *
 * Hand-authored SVG on a true 2:1 isometric projection — no library, no
 * WebGL, no runtime cost. Every colour comes from a theme token, so it
 * repaints correctly in light and dark.
 */

const RX = 116; // half-width of a plate
const RY = 58; // half-depth (2:1 isometric)
const TH = 9; // plate thickness
const CX = 240;

/** Plate centres, top of the stack first. */
const PLATES = [96, 190, 284, 378];

/**
 * Position a point on a plate. `u` and `v` are the two isometric axes, each
 * running -1 → 1 across the plate.
 */
function iso(u: number, v: number, cy: number) {
  return {
    x: CX + ((u - v) * RX) / 2,
    y: cy + ((u + v) * RY) / 2,
  };
}

const diamond = (cy: number, rx = RX, ry = RY) =>
  `${CX},${cy - ry} ${CX + rx},${cy} ${CX},${cy + ry} ${CX - rx},${cy}`;

/** A deterministic scatter so the diagram is identical on every render. */
function scatter(count: number, seed: number, spread = 0.86) {
  let a = seed;
  const rand = () => {
    a = (a * 1664525 + 1013904223) % 4294967296;
    return a / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    u: (rand() * 2 - 1) * spread,
    v: (rand() * 2 - 1) * spread,
    r: 1.7 + rand() * 1.9,
  }));
}

function Plate({
  cy,
  children,
  fill = "var(--surface)",
  opacity = 1,
}: {
  cy: number;
  children?: React.ReactNode;
  fill?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {/* two side faces give the plate its thickness */}
      <polygon
        points={`${CX - RX},${cy} ${CX},${cy + RY} ${CX},${cy + RY + TH} ${CX - RX},${cy + TH}`}
        fill="var(--line)"
      />
      <polygon
        points={`${CX},${cy + RY} ${CX + RX},${cy} ${CX + RX},${cy + TH} ${CX},${cy + RY + TH}`}
        fill="var(--line-2)"
      />
      <polygon
        points={diamond(cy)}
        fill={fill}
        stroke="var(--navy)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {children}
    </g>
  );
}

export default function ProductStack({ className }: { className?: string }) {
  const [shipY, designY, problemY, signalY] = PLATES;

  const noise = scatter(30, 9271);
  const clusterSeeds: [number, number][] = [
    [-0.42, -0.34],
    [0.38, -0.46],
    [0.46, 0.42],
    [-0.5, 0.44],
  ];

  return (
    <svg
      viewBox="0 0 480 500"
      className={className}
      role="img"
      aria-label="An isometric diagram of the four layers a product manager works across: scattered user signal at the bottom, resolved into a chosen problem, then a design grid, then one shipped product at the top."
    >
      {/* thin frame, echoing the arch in the reference */}
      <circle
        cx={CX}
        cy={244}
        r={218}
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <circle
        cx={CX}
        cy={244}
        r={206}
        fill="none"
        stroke="var(--line-2)"
        strokeWidth="1"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />

      {/* the spine — one idea travelling up through every layer */}
      <line
        x1={CX}
        y1={signalY}
        x2={CX}
        y2={shipY - 74}
        stroke="var(--blue)"
        strokeWidth="1.2"
        strokeDasharray="3 5"
        opacity="0.5"
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1 — SIGNAL: uncorrelated noise                                     */}
      <Plate cy={signalY}>
        {noise.map((d, i) => {
          const p = iso(d.u, d.v, signalY);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={d.r}
              fill="var(--ink-3)"
              opacity={0.5 + (i % 4) * 0.12}
            />
          );
        })}
      </Plate>

      {/* ---------------------------------------------------------------- */}
      {/* 2 — PROBLEM: the same field, clustered. One cluster is chosen.     */}
      <Plate cy={problemY}>
        {clusterSeeds.map(([cu, cv], ci) =>
          scatter(7, 4400 + ci * 97, 0.3).map((d, i) => {
            const p = iso(cu + d.u * 0.34, cv + d.v * 0.34, problemY);
            return (
              <circle
                key={`${ci}-${i}`}
                cx={p.x}
                cy={p.y}
                r={2}
                fill={ci === 0 ? "var(--blue)" : "var(--ink-3)"}
                opacity={ci === 0 ? 0.95 : 0.45}
              />
            );
          })
        )}
        {/* the chosen one, ringed */}
        <ellipse
          cx={iso(-0.42, -0.34, problemY).x}
          cy={iso(-0.42, -0.34, problemY).y}
          rx={34}
          ry={17}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="1.3"
        />
      </Plate>

      {/* ---------------------------------------------------------------- */}
      {/* 3 — DESIGN: structure. A grid, and three screens laid on it.       */}
      <Plate cy={designY}>
        {[-0.6, -0.2, 0.2, 0.6].map((t) => {
          const a = iso(t, -0.94, designY);
          const b = iso(t, 0.94, designY);
          const c = iso(-0.94, t, designY);
          const d = iso(0.94, t, designY);
          return (
            <g key={t} stroke="var(--line-2)" strokeWidth="0.9">
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
            </g>
          );
        })}
        {/* three laid-out screens as small isometric tiles */}
        {[
          [-0.44, -0.4, 0.3],
          [0.34, -0.16, 0.24],
          [-0.06, 0.46, 0.26],
        ].map(([u, v, s], i) => {
          const a = iso(u - s, v - s, designY);
          const b = iso(u + s, v - s, designY);
          const c = iso(u + s, v + s, designY);
          const d = iso(u - s, v + s, designY);
          return (
            <polygon
              key={i}
              points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`}
              fill="var(--surface-2)"
              stroke="var(--navy)"
              strokeWidth="1.1"
              strokeLinejoin="round"
              opacity={0.95}
            />
          );
        })}
      </Plate>

      {/* ---------------------------------------------------------------- */}
      {/* 4 — SHIPPED: one product, standing up, in the world.               */}
      <Plate cy={shipY} fill="var(--surface)">
        {/* base shadow of the standing screen */}
        <polygon
          points={`${iso(-0.34, -0.34, shipY).x},${iso(-0.34, -0.34, shipY).y} ${iso(0.34, -0.34, shipY).x},${iso(0.34, -0.34, shipY).y} ${iso(0.34, 0.34, shipY).x},${iso(0.34, 0.34, shipY).y} ${iso(-0.34, 0.34, shipY).x},${iso(-0.34, 0.34, shipY).y}`}
          fill="var(--surface-2)"
          stroke="var(--line-2)"
          strokeWidth="1"
        />
      </Plate>

      {/* the standing screen itself — the shipped product */}
      <g>
        <polygon
          points={`${CX - 46},${shipY - 20} ${CX},${shipY - 46} ${CX},${shipY - 4} ${CX - 46},${shipY + 22}`}
          fill="var(--surface)"
          stroke="var(--navy)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon
          points={`${CX},${shipY - 46} ${CX + 46},${shipY - 20} ${CX + 46},${shipY + 22} ${CX},${shipY - 4}`}
          fill="var(--surface-2)"
          stroke="var(--navy)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* content lines on the left face */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={CX - 36 + i * 2}
            y1={shipY - 8 + i * 8}
            x2={CX - 10 + i * 2}
            y2={shipY - 22 + i * 8}
            stroke="var(--blue)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.85 - i * 0.22}
          />
        ))}
        {/* a live signal on the right face */}
        <circle cx={CX + 30} cy={shipY - 12} r="3.4" fill="var(--blue)" />
      </g>

      {/* the idea arriving at the top */}
      <g opacity="0.9">
        <line
          x1={CX}
          y1={shipY - 62}
          x2={CX}
          y2={shipY - 84}
          stroke="var(--blue)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d={`M${CX - 5},${shipY - 78} L${CX},${shipY - 86} L${CX + 5},${shipY - 78}`}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

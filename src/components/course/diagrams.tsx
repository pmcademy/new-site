import type { DiagramId } from "@/lib/course/types";

/**
 * The diagram library.
 *
 * Every lesson that teaches a concept shows it before it asks for anything.
 * These are the pictures. They are deliberately explanatory rather than
 * decorative: each one is labelled, and each one shows the mechanism the
 * lesson is about, not a vibe.
 *
 * All colours are theme tokens, so they repaint in dark mode.
 */

const S = "var(--navy)";
const M = "var(--ink-3)";
const A = "var(--blue)";

function Frame({
  children,
  viewBox = "0 0 640 280",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="w-full"
      fill="none"
      stroke={S}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const Label = ({
  x,
  y,
  children,
  size = 12,
  anchor = "middle",
  color = "var(--ink-2)",
  weight = 500,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  color?: string;
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={size}
    fontWeight={weight}
    fill={color}
    stroke="none"
    fontFamily="var(--sans)"
  >
    {children}
  </text>
);

const Arrow = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <>
    <path d={`M${x1} ${y} H${x2 - 6}`} stroke={M} />
    <path d={`M${x2 - 11} ${y - 4} l5 4 -5 4`} stroke={M} />
  </>
);

/* -------------------------------------------------------------------------- */

function UserFlow() {
  const boxes = [
    { x: 20, label: "Open app", sub: "entry" },
    { x: 180, label: "Enter email", sub: "input" },
    { x: 340, label: "Verify", sub: "wait" },
    { x: 500, label: "Home", sub: "done" },
  ];
  return (
    <Frame>
      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y={54}
            width={120}
            height={54}
            rx={6}
            fill={i === 3 ? "var(--blue-soft)" : "var(--surface-2)"}
          />
          <Label x={b.x + 60} y={80}>
            {b.label}
          </Label>
          <Label x={b.x + 60} y={96} size={10} color={M} weight={400}>
            {b.sub}
          </Label>
          {i < 3 && <Arrow x1={b.x + 120} x2={b.x + 160} y={81} />}
        </g>
      ))}

      {/* the states nobody draws */}
      <path d="M400 108 V150 H250" stroke={M} strokeDasharray="4 4" />
      <path d="M255 145 l-5 5 5 5" stroke={M} strokeDasharray="0" />
      <rect
        x="130"
        y="150"
        width="120"
        height="46"
        rx={6}
        fill="var(--amber-bg)"
        strokeDasharray="4 4"
        stroke="var(--amber)"
      />
      <Label x={190} y={172} color="var(--amber)">
        Code expired
      </Label>
      <Label x={190} y={187} size={10} color="var(--amber)" weight={400}>
        62% leave here
      </Label>

      <path d="M240 108 V214 H430" stroke={M} strokeDasharray="4 4" />
      <rect
        x="430"
        y="192"
        width="150"
        height="44"
        rx={6}
        fill="var(--surface-2)"
        strokeDasharray="4 4"
        stroke={M}
      />
      <Label x={505} y={219} color={M}>
        Email already used
      </Label>

      <Label x={20} y={266} anchor="start" size={11} color={M} weight={400}>
        Solid line: the happy path. Dashed: the states that actually lose people.
      </Label>
    </Frame>
  );
}

function Funnel() {
  const rows = [
    { w: 520, label: "Visited", n: "10,000", pct: "" },
    { w: 400, label: "Started signup", n: "4,100", pct: "41%" },
    { w: 250, label: "Verified email", n: "1,900", pct: "46%" },
    { w: 150, label: "Connected a bank", n: "780", pct: "41%" },
    { w: 96, label: "Came back day 7", n: "310", pct: "40%" },
  ];
  return (
    <Frame viewBox="0 0 640 300">
      {rows.map((r, i) => {
        const y = 20 + i * 54;
        const x = 60 + (520 - r.w) / 2;
        return (
          <g key={r.label}>
            <rect
              x={x}
              y={y}
              width={r.w}
              height={38}
              rx={4}
              fill={i === 4 ? "var(--blue-soft)" : "var(--surface-2)"}
            />
            <Label x={x + r.w / 2} y={y + 24} size={12}>
              {r.label}
            </Label>
            <Label x={44} y={y + 24} anchor="end" size={11} color={M} weight={400}>
              {r.n}
            </Label>
            {r.pct && (
              <Label
                x={596}
                y={y + 24}
                anchor="start"
                size={11}
                color={i === 2 ? "var(--free)" : M}
                weight={600}
              >
                {r.pct}
              </Label>
            )}
          </g>
        );
      })}
      <Label x={44} y={16} anchor="end" size={10} color={M} weight={400}>
        people
      </Label>
      <Label x={584} y={16} anchor="start" size={10} color={M} weight={400}>
        step rate
      </Label>
      <Label x={60} y={294} anchor="start" size={11} color={M} weight={400}>
        Each step keeps roughly 40%. Four steps turns 10,000 into 310.
      </Label>
    </Frame>
  );
}

function SignalToClaim() {
  const dots = Array.from({ length: 34 }, (_, i) => ({
    x: 30 + ((i * 47) % 150),
    y: 40 + ((i * 71) % 150),
  }));
  return (
    <Frame viewBox="0 0 640 250">
      {/* raw */}
      <rect x="16" y="24" width="180" height="180" rx={8} fill="var(--surface-2)" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3} fill={M} stroke="none" opacity={0.6} />
      ))}
      <Label x={106} y={224} size={11} color={M} weight={400}>
        200 reviews
      </Label>

      <Arrow x1={204} x2={244} y={114} />

      {/* clustered */}
      <rect x="244" y="24" width="180" height="180" rx={8} fill="var(--surface-2)" />
      {[
        { cx: 300, cy: 70, r: 26, n: 88, hot: true },
        { cx: 372, cy: 108, r: 18, n: 41 },
        { cx: 302, cy: 152, r: 15, n: 29 },
        { cx: 380, cy: 172, r: 11, n: 14 },
      ].map((c, i) => (
        <g key={i}>
          <circle
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.hot ? "var(--blue-soft)" : "var(--surface-3)"}
            stroke={c.hot ? A : M}
          />
          <Label x={c.cx} y={c.cy + 4} size={11} color={c.hot ? A : M} weight={600}>
            {c.n}
          </Label>
        </g>
      ))}
      <Label x={334} y={224} size={11} color={M} weight={400}>
        4 problems
      </Label>

      <Arrow x1={432} x2={472} y={114} />

      {/* the claim */}
      <rect x="472" y="60" width="152" height="108" rx={8} fill="var(--surface)" stroke={A} />
      <Label x={548} y={88} size={12} color={A} weight={600}>
        One claim
      </Label>
      <path d="M492 104 h112 M492 118 h112 M492 132 h72" stroke={M} opacity={0.5} />
      <Label x={548} y={224} size={11} color={M} weight={400}>
        1 defensible memo
      </Label>
    </Frame>
  );
}

function ThreeChairs() {
  const c = [
    { cx: 200, cy: 108, label: "Business", q: "Is it worth doing?" },
    { cx: 440, cy: 108, label: "Tech", q: "Can we build it?" },
    { cx: 320, cy: 196, label: "Design", q: "Is it usable?" },
  ];
  return (
    <Frame viewBox="0 0 640 300">
      {c.map((x) => (
        <g key={x.label}>
          <circle cx={x.cx} cy={x.cy} r={92} fill="var(--surface-2)" opacity={0.75} />
          <Label x={x.cx} y={x.cy - 8} size={13} weight={600}>
            {x.label}
          </Label>
          <Label x={x.cx} y={x.cy + 10} size={10.5} color={M} weight={400}>
            {x.q}
          </Label>
        </g>
      ))}
      <circle cx={320} cy={140} r={30} fill="var(--blue-soft)" stroke={A} />
      <Label x={320} y={137} size={11} color={A} weight={600}>
        PM
      </Label>
      <Label x={320} y={151} size={9} color={A} weight={400}>
        decides
      </Label>
      <Label x={320} y={288} size={11} color={M} weight={400}>
        You do not sit in a chair. You make sure all three questions get answered.
      </Label>
    </Frame>
  );
}

function Rice() {
  const rows = [
    { f: "Fix bank sync", r: 8200, i: 3, c: "90%", e: 2, s: "11,070", top: true },
    { f: "Dark mode", r: 4000, i: 1, c: "100%", e: 3, s: "1,333" },
    { f: "AI assistant", r: 9000, i: 3, c: "40%", e: 8, s: "1,350" },
    { f: "Export to CSV", r: 900, i: 2, c: "90%", e: 1, s: "1,620" },
  ];
  const cols = ["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"];
  const cx = [24, 250, 320, 410, 500, 590];
  return (
    <Frame viewBox="0 0 640 240">
      {cols.map((c, i) => (
        <Label
          key={c}
          x={cx[i]}
          y={28}
          size={10.5}
          color={M}
          weight={600}
          anchor={i === 0 ? "start" : "middle"}
        >
          {c.toUpperCase()}
        </Label>
      ))}
      <path d="M16 40 H624" stroke={M} opacity={0.5} />
      {rows.map((r, i) => {
        const y = 68 + i * 40;
        return (
          <g key={r.f}>
            {r.top && (
              <rect x="16" y={y - 24} width="608" height="34" rx={5} fill="var(--blue-soft)" />
            )}
            <Label x={cx[0]} y={y - 4} anchor="start" size={12}>
              {r.f}
            </Label>
            <Label x={cx[1]} y={y - 4} size={12} color={M} weight={400}>
              {r.r.toLocaleString()}
            </Label>
            <Label x={cx[2]} y={y - 4} size={12} color={M} weight={400}>
              {r.i}
            </Label>
            <Label
              x={cx[3]}
              y={y - 4}
              size={12}
              color={r.c === "40%" ? "var(--amber)" : M}
              weight={r.c === "40%" ? 600 : 400}
            >
              {r.c}
            </Label>
            <Label x={cx[4]} y={y - 4} size={12} color={M} weight={400}>
              {r.e}
            </Label>
            <Label x={cx[5]} y={y - 4} size={12} color={r.top ? A : M} weight={600}>
              {r.s}
            </Label>
          </g>
        );
      })}
      <path d="M16 226 H624" stroke={M} opacity={0.5} />
      <Label x={16} y={238} anchor="start" size={10.5} color={M} weight={400}>
        Confidence is the honest column. The AI assistant scores badly because nobody
        knows if it works.
      </Label>
    </Frame>
  );
}

function RetentionCurve() {
  return (
    <Frame viewBox="0 0 640 300">
      <path d="M60 30 V226 H600" stroke={M} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M60 ${226 - i * 48 - 48} H600`} stroke={M} opacity={0.18} />
      ))}
      {/* dies */}
      <path
        d="M60 42 C 130 150, 200 206, 320 220 C 420 226, 520 226, 596 226"
        stroke={M}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <Label x={470} y={214} size={11} color={M} weight={500} anchor="start">
        no product-market fit
      </Label>
      {/* flattens */}
      <path
        d="M60 42 C 128 120, 190 150, 300 156 C 420 160, 520 159, 596 158"
        stroke={A}
        strokeWidth="2.4"
      />
      <Label x={470} y={148} size={11} color={A} weight={600} anchor="start">
        flattens at 26%
      </Label>
      <circle cx={596} cy={158} r={4} fill={A} stroke="none" />
      <Label x={48} y={46} anchor="end" size={10.5} color={M} weight={400}>
        100%
      </Label>
      <Label x={48} y={230} anchor="end" size={10.5} color={M} weight={400}>
        0
      </Label>
      <Label x={330} y={252} size={11} color={M} weight={400}>
        weeks since signup
      </Label>
      <Label x={60} y={274} anchor="start" size={11} color={M} weight={400}>
        <tspan x="60">A curve that flattens means some group found lasting value.</tspan>
        <tspan x="60" dy="16">A curve that reaches zero means nobody did.</tspan>
      </Label>
    </Frame>
  );
}

function OpportunityTree() {
  return (
    <Frame viewBox="0 0 640 300">
      <rect x="230" y="16" width="180" height="42" rx={6} fill="var(--blue-soft)" stroke={A} />
      <Label x={320} y={34} size={12} color={A} weight={600}>
        Outcome
      </Label>
      <Label x={320} y={49} size={10} color={A} weight={400}>
        Signup completion 38% to 60%
      </Label>

      {[
        { x: 30, label: "Verification", n: "88 quotes", hot: true },
        { x: 250, label: "Bank connect fear", n: "41 quotes" },
        { x: 460, label: "Unclear value", n: "4 quotes", weak: true },
      ].map((o, i) => (
        <g key={o.label}>
          <path d={`M320 58 V78 H${o.x + 75} V96`} stroke={M} />
          <rect
            x={o.x}
            y={96}
            width={150}
            height={46}
            rx={6}
            fill={o.hot ? "var(--surface)" : "var(--surface-2)"}
            stroke={o.hot ? A : o.weak ? "var(--amber)" : M}
            strokeDasharray={o.weak ? "4 4" : undefined}
          />
          <Label x={o.x + 75} y={116} size={11.5}>
            {o.label}
          </Label>
          <Label
            x={o.x + 75}
            y={131}
            size={10}
            color={o.weak ? "var(--amber)" : M}
            weight={400}
          >
            {o.weak ? `${o.n}, hypothesis` : o.n}
          </Label>
        </g>
      ))}

      {[
        { x: 14, label: "Magic link" },
        { x: 122, label: "Longer expiry" },
      ].map((s) => (
        <g key={s.label}>
          <path d={`M105 142 V162 H${s.x + 45} V178`} stroke={M} />
          <rect x={s.x} y={178} width={90} height={34} rx={5} fill="var(--surface-2)" />
          <Label x={s.x + 45} y={199} size={10.5}>
            {s.label}
          </Label>
          <path d={`M${s.x + 45} 212 V232`} stroke={M} strokeDasharray="3 3" />
          <rect
            x={s.x + 8}
            y={232}
            width={74}
            height={28}
            rx={5}
            fill="var(--free-bg)"
            stroke="var(--free)"
            strokeDasharray="3 3"
          />
          <Label x={s.x + 45} y={250} size={10} color="var(--free)" weight={500}>
            experiment
          </Label>
        </g>
      ))}

      <Label x={16} y={288} anchor="start" size={11} color={M} weight={400}>
        Four levels, strictly. A node with no evidence under it is a hypothesis, and
        must be drawn as one.
      </Label>
    </Frame>
  );
}

function StatesMatrix() {
  const states = [
    { s: "Empty", d: "No data yet", tone: "n" },
    { s: "Loading", d: "Waiting on the server", tone: "n" },
    { s: "Partial", d: "Some of it arrived", tone: "a" },
    { s: "Error", d: "It failed and why", tone: "a" },
    { s: "Offline", d: "No connection", tone: "a" },
    { s: "Denied", d: "Not allowed to see it", tone: "a" },
    { s: "First run", d: "Never used before", tone: "n" },
    { s: "Success", d: "The happy path", tone: "g" },
  ];
  return (
    <Frame viewBox="0 0 640 250">
      {states.map((st, i) => {
        const x = 16 + (i % 4) * 154;
        const y = 30 + Math.floor(i / 4) * 96;
        const fill =
          st.tone === "g"
            ? "var(--free-bg)"
            : st.tone === "a"
              ? "var(--amber-bg)"
              : "var(--surface-2)";
        const stroke =
          st.tone === "g" ? "var(--free)" : st.tone === "a" ? "var(--amber)" : M;
        return (
          <g key={st.s}>
            <rect x={x} y={y} width={140} height={72} rx={6} fill={fill} stroke={stroke} />
            <Label x={x + 70} y={y + 32} size={12} weight={600}>
              {st.s}
            </Label>
            <Label x={x + 70} y={y + 50} size={10} color={M} weight={400}>
              {st.d}
            </Label>
          </g>
        );
      })}
      <Label x={16} y={18} anchor="start" size={10.5} color={M} weight={600}>
        EVERY SCREEN HAS EIGHT STATES. MOST SPECS DRAW ONE.
      </Label>
      <Label x={16} y={240} anchor="start" size={11} color={M} weight={400}>
        Green is the one everyone designs. Amber is where the support tickets come
        from.
      </Label>
    </Frame>
  );
}

function EvalLoop() {
  const nodes = [
    { x: 40, label: "Golden cases", sub: "20 hard ones" },
    { x: 200, label: "Run", sub: "prompt v3" },
    { x: 360, label: "Score", sub: "rubric 1-5" },
    { x: 520, label: "Change one thing", sub: "and only one" },
  ];
  return (
    <Frame viewBox="0 0 640 220">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={50}
            width={110}
            height={56}
            rx={6}
            fill={i === 2 ? "var(--blue-soft)" : "var(--surface-2)"}
          />
          <Label x={n.x + 55} y={76} size={11.5}>
            {n.label}
          </Label>
          <Label x={n.x + 55} y={92} size={10} color={M} weight={400}>
            {n.sub}
          </Label>
          {i < 3 && <Arrow x1={n.x + 110} x2={n.x + 150} y={78} />}
        </g>
      ))}
      <path d="M575 106 V150 H95 V106" stroke={M} strokeDasharray="4 4" />
      <path d="M91 116 l4 -6 4 6" stroke={M} />
      <Label x={335} y={166} size={11} color={M} weight={400}>
        The loop is the discipline. No prompt change merges without a score.
      </Label>
      <Label x={335} y={200} size={11} color="var(--amber)" weight={500}>
        Cases the model always passes teach you nothing. Keep the 50/50 ones.
      </Label>
    </Frame>
  );
}

function RagPipeline() {
  const steps = [
    { x: 16, label: "Question", sub: "from the user" },
    { x: 146, label: "Embed", sub: "to a vector" },
    { x: 276, label: "Search", sub: "top 5 chunks" },
    { x: 406, label: "Assemble", sub: "prompt + chunks" },
    { x: 536, label: "Answer", sub: "with citations" },
  ];
  return (
    <Frame viewBox="0 0 640 250">
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={44}
            width={88}
            height={56}
            rx={6}
            fill={i === 2 ? "var(--blue-soft)" : "var(--surface-2)"}
          />
          <Label x={s.x + 44} y={70} size={11}>
            {s.label}
          </Label>
          <Label x={s.x + 44} y={86} size={9.5} color={M} weight={400}>
            {s.sub}
          </Label>
          {i < 4 && <Arrow x1={s.x + 88} x2={s.x + 130} y={72} />}
        </g>
      ))}
      <rect x="252" y="132" width="136" height="42" rx={6} fill="var(--surface-3)" />
      <Label x={320} y={152} size={11}>
        Your documents
      </Label>
      <Label x={320} y={166} size={9.5} color={M} weight={400}>
        chunked, embedded once
      </Label>
      <path d="M320 132 V110" stroke={M} strokeDasharray="4 4" />
      <Label x={16} y={202} anchor="start" size={11} color="var(--amber)" weight={500}>
        <tspan x="16">The dangerous failure: search returns something plausible but wrong,</tspan>
        <tspan x="16" dy="16">and the model answers from it fluently.</tspan>
      </Label>
      <Label x={16} y={238} anchor="start" size={11} color={M} weight={400}>
        Quality is mostly the search step, not the model.
      </Label>
    </Frame>
  );
}

function CostCurve() {
  return (
    <Frame viewBox="0 0 640 260">
      <path d="M60 24 V208 H600" stroke={M} />
      <path
        d="M70 190 C 180 186, 260 170, 330 140 C 400 110, 470 70, 590 44"
        stroke={A}
        strokeWidth="2.4"
      />
      {[
        { cx: 120, cy: 188, l: "Small model", c: "₹0.4", q: "72%" },
        { cx: 330, cy: 140, l: "Routed", c: "₹1.9", q: "89%" },
        { cx: 560, cy: 52, l: "Largest", c: "₹9.1", q: "92%" },
      ].map((p, i) => (
        <g key={p.l}>
          <circle
            cx={p.cx}
            cy={p.cy}
            r={6}
            fill={i === 1 ? A : "var(--surface)"}
            stroke={i === 1 ? A : M}
          />
          <Label x={p.cx} y={p.cy - 16} size={11} weight={600} color={i === 1 ? A : "var(--ink-2)"}>
            {p.l}
          </Label>
          <Label x={p.cx} y={p.cy - 2} size={10} color={M} weight={400} anchor="middle">
            {""}
          </Label>
          <Label x={p.cx} y={p.cy + 22} size={10} color={M} weight={400}>
            {p.c} · {p.q}
          </Label>
        </g>
      ))}
      <Label x={44} y={30} anchor="end" size={10.5} color={M} weight={400}>
        quality
      </Label>
      <Label x={600} y={228} anchor="end" size={10.5} color={M} weight={400}>
        cost per call
      </Label>
      <Label x={60} y={252} anchor="start" size={11} color={M} weight={400}>
        The last three points of quality cost five times as much. Routing is where the
        money is.
      </Label>
    </Frame>
  );
}

function RoadmapOutcome() {
  return (
    <Frame viewBox="0 0 640 250">
      <rect x="16" y="24" width="290" height="196" rx={8} fill="var(--surface-2)" />
      <Label x={161} y={48} size={12} weight={600} color={M}>
        Feature roadmap
      </Label>
      {["Dark mode. Q1", "AI assistant. Q2", "Redesign. Q3"].map((t, i) => (
        <g key={t}>
          <rect x="40" y={68 + i * 44} width={242} height={32} rx={5} fill="var(--surface)" stroke={M} />
          <Label x={161} y={88 + i * 44} size={11} color={M} weight={400}>
            {t}
          </Label>
        </g>
      ))}
      <Label x={161} y={210} size={10.5} color="var(--amber)" weight={500}>
        Dies the moment priorities shift
      </Label>

      <rect x="334" y="24" width="290" height="196" rx={8} fill="var(--blue-soft)" stroke={A} />
      <Label x={479} y={48} size={12} weight={600} color={A}>
        Outcome roadmap
      </Label>
      {[
        ["Signup 38% → 60%", "high confidence"],
        ["Week-2 retention +8pts", "medium"],
        ["Support tickets −30%", "low, exploring"],
      ].map(([t, c], i) => (
        <g key={t}>
          <rect x="358" y={68 + i * 44} width={242} height={32} rx={5} fill="var(--surface)" stroke={A} />
          <Label x={470} y={88 + i * 44} size={11}>
            {t}
          </Label>
          <Label x={588} y={88 + i * 44} size={9} color={M} anchor="end" weight={400}>
            {c}
          </Label>
        </g>
      ))}
      <Label x={479} y={210} size={10.5} color={A} weight={500}>
        Survives a re-org
      </Label>
    </Frame>
  );
}

function AbTest() {
  return (
    <Frame viewBox="0 0 640 250">
      <path d="M60 24 V196 H600" stroke={M} />
      <path d="M60 110 H600" stroke={M} strokeDasharray="4 4" opacity={0.6} />
      <Label x={608} y={114} anchor="start" size={10} color={M} weight={400}>
        0
      </Label>
      {[
        { x: 150, mid: 78, lo: 40, hi: 116, l: "Day 3", verdict: "noise" },
        { x: 330, mid: 92, lo: 66, hi: 118, l: "Day 7", verdict: "still noise" },
        { x: 510, mid: 74, lo: 58, hi: 90, l: "Day 14", verdict: "real" },
      ].map((b) => {
        const real = b.hi < 110;
        const c = real ? "var(--free)" : "var(--amber)";
        return (
          <g key={b.l}>
            <path d={`M${b.x} ${b.lo} V${b.hi}`} stroke={c} strokeWidth="2.4" />
            <path d={`M${b.x - 10} ${b.lo} h20 M${b.x - 10} ${b.hi} h20`} stroke={c} strokeWidth="2" />
            <circle cx={b.x} cy={b.mid} r={5} fill={c} stroke="none" />
            <Label x={b.x} y={214} size={11.5}>
              {b.l}
            </Label>
            <Label x={b.x} y={230} size={10} color={c} weight={600}>
              {b.verdict}
            </Label>
          </g>
        );
      })}
      <Label x={44} y={30} anchor="end" size={10} color={M} weight={400}>
        lift
      </Label>
      <Label x={60} y={248} anchor="start" size={11} color={M} weight={400}>
        While the interval crosses zero, the honest answer is &ldquo;we do not know
        yet.&rdquo;
      </Label>
    </Frame>
  );
}

function PrdAnatomy() {
  const rows = [
    { t: "Problem", d: "Who hurts, how much, and the evidence", keep: true },
    { t: "Success metric", d: "One number, plus its counter-metric", keep: true },
    { t: "Scope", d: "What ships, and three explicit cuts", keep: true },
    { t: "Open questions", d: "What you honestly do not know yet", keep: true },
    { t: "Background", d: "Three paragraphs of history nobody reads", keep: false },
    { t: "Competitive landscape", d: "A table copied from a deck", keep: false },
    { t: "Appendix", d: "Everything you could not bear to delete", keep: false },
  ];
  return (
    <Frame viewBox="0 0 640 300">
      {rows.map((r, i) => {
        const y = 20 + i * 38;
        return (
          <g key={r.t}>
            <rect
              x="16"
              y={y}
              width="608"
              height="30"
              rx={5}
              fill={r.keep ? "var(--free-bg)" : "var(--surface-2)"}
              stroke={r.keep ? "var(--free)" : M}
              strokeDasharray={r.keep ? undefined : "4 4"}
            />
            <Label x={32} y={y + 20} anchor="start" size={12} weight={600}
              color={r.keep ? "var(--ink)" : M}>
              {r.t}
            </Label>
            <Label x={200} y={y + 20} anchor="start" size={11} color={M} weight={400}>
              {r.d}
            </Label>
            <Label
              x={608}
              y={y + 20}
              anchor="end"
              size={10.5}
              weight={600}
              color={r.keep ? "var(--free)" : "var(--amber)"}
            >
              {r.keep ? "KEEP" : "CUT"}
            </Label>
          </g>
        );
      })}
      <Label x={16} y={296} anchor="start" size={11} color={M} weight={400}>
        Four sections fit on one page. The other three are why nobody read your last
        one.
      </Label>
    </Frame>
  );
}

function Hierarchy() {
  return (
    <Frame viewBox="0 0 640 280">
      {/* bad */}
      <rect x="16" y="24" width="290" height="230" rx={8} fill="var(--surface-2)" />
      <Label x={161} y={46} size={11} weight={600} color="var(--amber)">
        NO HIERARCHY
      </Label>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="44" y={64 + i * 34} width={234} height={22} rx={4} fill="var(--surface-3)" />
      ))}
      <rect x="44" y="234" width={234} height={0} />
      <Label x={161} y={248} size={10.5} color={M} weight={400}>
        Everything the same weight. Eye has no path.
      </Label>

      {/* good */}
      <rect x="334" y="24" width="290" height="230" rx={8} fill="var(--surface)" stroke={A} />
      <Label x={479} y={46} size={11} weight={600} color={A}>
        WITH HIERARCHY
      </Label>
      <rect x="362" y="62" width={180} height={26} rx={4} fill="var(--ink)" opacity={0.85} />
      <rect x="362" y="98" width={234} height={12} rx={3} fill="var(--surface-3)" />
      <rect x="362" y="118" width={200} height={12} rx={3} fill="var(--surface-3)" />
      <rect x="362" y="148" width={96} height={30} rx={6} fill={A} />
      <rect x="362" y="196" width={110} height={10} rx={3} fill="var(--surface-3)" opacity={0.7} />
      <rect x="362" y="212" width={140} height={10} rx={3} fill="var(--surface-3)" opacity={0.7} />
      <Label x={479} y={248} size={10.5} color={M} weight={400}>
        One thing is biggest. One thing is the action.
      </Label>
    </Frame>
  );
}

function JobsToBeDone() {
  return (
    <Frame viewBox="0 0 640 240">
      <rect x="16" y="60" width="180" height="76" rx={8} fill="var(--surface-2)" />
      <Label x={106} y={92} size={12} weight={600}>
        When
      </Label>
      <Label x={106} y={110} size={10.5} color={M} weight={400}>
        my salary lands
      </Label>
      <Arrow x1={200} x2={236} y={98} />
      <rect x="236" y="60" width="180" height="76" rx={8} fill="var(--surface-2)" />
      <Label x={326} y={92} size={12} weight={600}>
        I want to
      </Label>
      <Label x={326} y={110} size={10.5} color={M} weight={400}>
        know what is spendable
      </Label>
      <Arrow x1={420} x2={456} y={98} />
      <rect x="456" y="60" width="168" height="76" rx={8} fill="var(--blue-soft)" stroke={A} />
      <Label x={540} y={92} size={12} weight={600} color={A}>
        So that
      </Label>
      <Label x={540} y={110} size={10.5} color={A} weight={400}>
        I stop checking daily
      </Label>
      <Label x={16} y={178} anchor="start" size={11} color={M} weight={400}>
        <tspan x="16">The job is the third box. Two apps with identical features get hired</tspan>
        <tspan x="16" dy="16">for different jobs, which means they are not really competitors.</tspan>
      </Label>
      <Label x={16} y={212} anchor="start" size={11} color="var(--amber)" weight={500}>
        <tspan x="16">&ldquo;Users aged 25-34 who like fintech&rdquo; is a demographic, not a job.</tspan>
        <tspan x="16" dy="16">It tells you nothing about what to build.</tspan>
      </Label>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

const REGISTRY: Record<DiagramId, () => React.ReactElement> = {
  "user-flow": UserFlow,
  funnel: Funnel,
  "signal-to-claim": SignalToClaim,
  "three-chairs": ThreeChairs,
  rice: Rice,
  "retention-curve": RetentionCurve,
  "opportunity-tree": OpportunityTree,
  "states-matrix": StatesMatrix,
  "eval-loop": EvalLoop,
  "rag-pipeline": RagPipeline,
  "cost-curve": CostCurve,
  "roadmap-outcome": RoadmapOutcome,
  "ab-test": AbTest,
  "prd-anatomy": PrdAnatomy,
  hierarchy: Hierarchy,
  "jobs-to-be-done": JobsToBeDone,
};

export default function Diagram({
  id,
  caption,
}: {
  id: DiagramId;
  caption?: string;
}) {
  const D = REGISTRY[id];
  if (!D) return null;
  return (
    <figure className="figure">
      <div className="card overflow-x-auto bg-surface p-[var(--s-5)]">
        <D />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

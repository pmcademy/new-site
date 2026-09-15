"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./ProductGarden.module.css";

type Theme = "light" | "dark" | "auto";
type Quote = { lines: readonly string[]; author: string };
export type ProductGardenProps = {
  theme?: Theme;
  className?: string;
  paused?: boolean;
  showHeading?: boolean;
  showTagline?: boolean;
  landscape?: boolean;
  leftQuote?: Quote;
  rightQuote?: Quote;
  style?: CSSProperties;
  pages?: readonly GardenPage[];
};

const LEFT_QUOTE: Quote = { lines: ["Make something", "people want."], author: "Paul Graham" };
const RIGHT_QUOTE: Quote = { lines: ["Design is not just what", "it looks like and feels like.", "Design is how it works."], author: "Steve Jobs" };
const noise = (n: number) => { const t = Math.sin(n * 127.1 + 311.7) * 43758.5453; return t - Math.floor(t); };
const timing = (i: number, duration = 5): CSSProperties => ({ "--duration": `${duration + noise(i) * 4}s`, "--delay": `${-noise(i + 5) * 18}s` } as CSSProperties);
const BUTTERFLIES = [
  { x: 220, y: 352, size: 1.03, color: "gold" },
  { x: 736, y: 119, size: 1.03, color: "coral" },
  { x: 1169, y: 365, size: .87, color: "coral" },
] as const;

function Flower({ x, y, size = 1, coral = false, turn = 0 }: { x: number; y: number; size?: number; coral?: boolean; turn?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${size})`} className={coral ? styles.coralFlower : styles.flower}>
    {Array.from({ length: 8 }, (_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 0C-14-12-16-36-5-37C5-45 16-16 0 0Z" />)}
    <circle r="8" fill="#ffca73" stroke="#947a48" strokeWidth="1" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * 4.5} cy={Math.sin(i * 2.4) * 4.5} r=".7" fill="#bf914d" stroke="none" />)}
  </g>;
}

function Plant({ x, y, height, angle = 0, index, gold = false }: { x: number; y: number; height: number; angle?: number; index: number; gold?: boolean }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${height / 220})`}>
    <g className={styles.sway} style={timing(index)}>
      <path d="M0 0Q-9-100 6-220" className={gold ? styles.goldStem : styles.stem} fill="none" strokeWidth="2.5" />
      {Array.from({ length: gold ? 10 : 7 }, (_, j) => {
        const yy = -20 - j * (gold ? 18 : 27);
        const sign = j % 2 ? 1 : -1;
        const width = gold ? 20 : 42 - j * 2;
        return <g key={j} transform={`translate(${j < 4 ? -3 : 0} ${yy}) scale(${sign} 1)`}>
          <path d={`M0 0Q${width * 1.5} -9 ${width} -56Q-3 -34 0 0Z`} className={gold ? styles.goldLeaf : styles[`leaf${(index + j) % 4}`]} />
          <path d={`M0 0Q${width * 1.5} -9 ${width} -56Q${width * .65} -29 0 0Z`} fill="#071c30" opacity=".12" />
          <path d={`M0 0Q${width * .65} -29 ${width} -56M${width * .4} -23l${width * .44} -3M${width * .64} -35l-7-14`} className={styles.vein} />
        </g>;
      })}
      <path d="M5-205Q-15-240 11-261Q27-232 5-205Z" className={gold ? styles.goldLeaf : styles.leaf2} />
      <path d="M5-205L11-251" className={styles.vein} />
    </g>
  </g>;
}

function BlossomBranch({ x, y, index, flip = false }: { x: number; y: number; index: number; flip?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}><g className={styles.sway} style={timing(index, 6)}>
    <path d="M0 0Q-22-100 29-204M-8-48L-42-92M-8-82L22-110M-3-118L-24-146M9-155L34-177" className={styles.stem} fill="none" strokeWidth="2" />
    {[[0, -35], [22, -112], [30, -202]].map(([xx, yy], j) => <Flower key={j} x={xx!} y={yy!} size={j % 3 === 0 ? .43 : .3} turn={j * 23} />)}
    {[-40, -90, -135].map((yy, j) => <path key={j} d={`M-7 ${yy}q-37-4-29-31q29 2 29 31`} className={styles.leaf2} />)}
  </g></g>;
}

function Pine({ x, y, size, shade }: { x: number; y: number; size: number; shade: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} className={styles[`pine${shade}`]}>
    <path d="M-2 0V-130H2V0Z" />
    <path d="M0-143L-12-114L-6-116L-21-89L-11-93L-30-57L-19-63L-38-26L-22-34L-45-5H45L22-34L38-26L19-63L30-57L11-93L21-89L6-116L12-114Z" />
    <path d="M0-140L0-6L30-6L16-25L23-21L11-49L20-43L8-76L14-73L4-106L8-105Z" fill="currentColor" opacity=".28" />
  </g>;
}

export type GardenPage = Quote & { title: string; diagram: "roadmap" | "bars" | "flow" | "loop" | "matrix" | "funnel" | "wireframe" | "tree" | "retention" | "priority" };
const DEFAULT_PAGES: readonly GardenPage[] = [
  {
    ...LEFT_QUOTE,
    title: "Build for real needs",
    lines: ["People ignore design", "that ignores people."],
    author: "Frank Chimero",
    diagram: "roadmap",
  },

  {
    ...RIGHT_QUOTE,
    title: "Make it feel obvious",
    lines: ["Design is how", "it works."],
    author: "Steve Jobs",
    diagram: "bars",
  },

  {
    title: "Start with the problem",
    lines: ["Fall in love with", "the problem."],
    author: "Uri Levine",
    diagram: "flow",
  },

  {
    title: "Learn from users",
    lines: ["Get out of", "the building."],
    author: "Steve Blank",
    diagram: "loop",
  },

  {
    title: "Make it understandable",
    lines: ["Good design is", "self-explanatory."],
    author: "Naoto Fukasawa",
    diagram: "wireframe",
  },

  {
    title: "Build what is missing",
    lines: ["Make something", "people want."],
    author: "Paul Graham",
    diagram: "tree",
  },

  {
    title: "Remove the unnecessary",
    lines: ["Less, but better."],
    author: "Dieter Rams",
    diagram: "funnel",
  },

  {
    title: "Solve creatively",
    lines: ["Constraints breed", "resourcefulness."],
    author: "Jason Fried",
    diagram: "matrix",
  },

  {
    title: "Care about quality",
    lines: ["Quality is not", "an act. It is a habit."],
    author: "Will Durant",
    diagram: "retention",
  },

  {
    title: "Keep improving",
    lines: ["Be stubborn on vision,", "flexible on details."],
    author: "Jeff Bezos",
    diagram: "priority",
  },
];

function Diagram({ kind }: { kind: GardenPage["diagram"] }) {
  const colors = ["#83b7cc", "#ffce83", "#f69e85", "#95bfa6"];
  const node = (x: number, y: number, w: number, h: number, i: number) => <rect x={x} y={y} width={w} height={h} rx="3" fill={colors[i % 4]} />;
  const label = { roadmap: "LISTEN · BUILD · LEARN", bars: "IMPROVE WITH EACH RELEASE", flow: "OBSERVE → UNDERSTAND → ACT", loop: "BUILD · MEASURE · LEARN", matrix: "IMPACT / EFFORT", funnel: "FOCUS THE OPPORTUNITY", wireframe: "TEST THE EXPERIENCE", tree: "FOLLOW THE EVIDENCE", retention: "GIVE PEOPLE A REASON TO RETURN", priority: "NOW · NEXT · LATER" }[kind];
  return <g transform="translate(19 145)" stroke="#426b80" strokeWidth="1" strokeLinejoin="round">
    {kind === "roadmap" && <><path d="M7 23H150" fill="none" />{colors.map((c, i) => <circle key={c} cx={7 + i * 47} cy="23" r="8" fill={c} />)}</>}
    {kind === "bars" && <><path d="M0 50H159" fill="none" />{[15, 24, 30, 37, 45, 53].map((h, i) => <rect key={i} x={8 + i * 24} y={50 - h} width="15" height={h} fill={colors[i % 4]} />)}</>}
    {kind === "flow" && <>{node(0, 13, 36, 25, 0)}{node(62, 13, 36, 25, 1)}{node(123, 13, 36, 25, 2)}<path d="M36 25h26m-5-4 5 4-5 4M98 25h25m-5-4 5 4-5 4" fill="none" /></>}
    {kind === "loop" && <><path d="M45 4Q113-17 128 32Q98 71 45 46Q15 26 45 4M118 18l10 14-16-3" fill="none" />{[[45, 4], [128, 32], [45, 46]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill={colors[i]} />)}</>}
    {kind === "matrix" && <><path d="M0 26H158M79-5V57" fill="none" />{[[30, 9, 0], [121, 8, 1], [108, 42, 2], [44, 45, 3]].map(([x, y, i]) => <circle key={i} cx={x} cy={y} r="9" fill={colors[i!]} />)}</>}
    {kind === "funnel" && <>{[0, 1, 2].map(i => <path key={i} d={`M${i * 23} ${i * 18}h${158 - i * 46}l-17 13H${i * 23 + 17}Z`} fill={colors[i]} />)}</>}
    {kind === "wireframe" && <>{node(1, -5, 155, 64, 0)}<path d="M1 6h155M57 6v52" fill="none" /><rect x="66" y="14" width="34" height="21" fill="#fff9ec" /><path d="M107 16h39m-39 8h28M66 44h80M10 15h35m-35 10h26m-26 10h32" fill="none" /></>}
    {kind === "tree" && <><path d="M78 7V22H20v16m58-16h60v16M78 22v17" fill="none" />{node(63, -9, 31, 18, 1)}{[5, 63, 123].map((x, i) => <g key={i}>{node(x, 37, 31, 18, i)}</g>)}</>}
    {kind === "retention" && <><path d="M0-3V54H159" fill="none" /><path d="M8 4L37 24L66 32L96 35L125 34L153 35" fill="none" stroke="#e5a064" strokeWidth="2" />{[8, 37, 66, 96, 125, 153].map((x, i) => <circle key={i} cx={x} cy={[4, 24, 32, 35, 34, 35][i]} r="3" fill="#ffce83" />)}</>}
    {kind === "priority" && <>{[0, 1, 2].map(i => <g key={i}>{node(i * 56, -4, 46, 63, i)}<path d={`M${i * 56 + 7} 8h32m-32 12h24m-24 12h32m-32 12h18`} fill="none" opacity=".6" /></g>)}</>}
    <text x="79" y="68" stroke="none" textAnchor="middle" className={styles.diagramLabel}>{label}</text>
  </g>;
}

function PageContent({ page, number, side, cosine = 1, lift = 0 }: { page: GardenPage; number: number; side: "left" | "right"; cosine?: number; lift?: number }) {
  const c = Math.abs(cosine);
  const transform = side === "left"
    ? `matrix(${.97 * c} .15 ${-.21 * c} .94 ${835 - 207 * c} ${484 - lift})`
    : `matrix(${.98 * c} -.13 ${.2 * c} .94 ${835 + 23 * c} ${504 - lift})`;
  return <g transform={transform} className={styles.pageContent} aria-hidden="true">
    <text x="98" y="6" textAnchor="middle" className={styles.bookEyebrow}>{page.title}</text>
    <path d="M30 22H166" stroke="#cab68a" />
    <text x="98" y="52" textAnchor="middle" className={styles.quote}>{page.lines.map((line, i) => <tspan key={i} x="98" dy={i ? 25 : 0}>{line}</tspan>)}</text>
    <text x="98" y="126" textAnchor="middle" className={styles.author}>{page.author}</text>
    <Diagram kind={page.diagram} />
    <text x="98" y="232" textAnchor="middle" className={styles.pageNumber}>{String(number).padStart(2, "0")}</text>
  </g>;
}

function Book({ left, right, id, pages }: { left: Quote; right: Quote; id: string; pages?: readonly GardenPage[] }) {
  const bookPages = useMemo(() => {
    const padded = pages?.length ? [...pages] : DEFAULT_PAGES.map((p, i) => i === 0 ? { ...p, ...left } : i === 1 ? { ...p, ...right } : p);
    if (padded.length % 2) padded.push({ ...DEFAULT_PAGES[9]! });
    return padded;
  }, [pages, left, right]);
  const sheetCount = bookPages.length / 2;
  const [currentSheet, setCurrentSheet] = useState(0);
  const [turn, setTurn] = useState<{ direction: number; progress: number; target: number } | null>(null);
  const frame = useRef(0);
  const locked = useRef(false);
  const drag = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const current = currentSheet % sheetCount;
  const getPage = (sheet: number, side: number) => bookPages[(sheet * 2 + side) % bookPages.length]!;
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useEffect(() => { cancelAnimationFrame(frame.current); locked.current = false; setTurn(null); setCurrentSheet(0); }, [bookPages]);
  const flip = (direction: number) => {
    if (locked.current) return;
    const target = (current + direction + sheetCount) % sheetCount;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCurrentSheet(target); return; }
    locked.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const raw = Math.min((now - start) / 900, 1);
      const progress = raw * raw * (3 - 2 * raw);
      if (raw >= 1) { setCurrentSheet(target); setTurn(null); locked.current = false; return; }
      setTurn({ direction, progress, target });
      frame.current = requestAnimationFrame(tick);
    };
    setTurn({ direction, progress: 0, target });
    frame.current = requestAnimationFrame(tick);
  };
  const leftSheet = turn?.direction === -1 ? turn.target : current;
  const rightSheet = turn?.direction === 1 ? turn.target : current;
  const theta = (turn?.progress ?? 0) * Math.PI;
  const cosine = Math.cos(theta) * (turn?.direction === -1 ? -1 : 1);
  const sine = Math.sin(theta);
  const front = (turn?.progress ?? 0) < .5;
  const faceSide = cosine >= 0 ? "right" : "left";
  const movingSheet = front ? current : (turn?.target ?? current);
  const movingPageSide = faceSide === "right" ? 1 : 0;
  const outerTop = 835 + (cosine < 0 ? 227 : 247) * cosine, outerBottom = 835 + (cosine < 0 ? 287 : 303) * cosine;
  const zone = (side: "left" | "right") => <g className={styles.turnZone} role="button" tabIndex={0} aria-label={side === "left" ? "Previous pages" : "Next pages"} aria-disabled={!!turn}
    onKeyDown={event => { if (["Enter", " ", "ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); flip(event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : side === "left" ? -1 : 1); } }}
    onPointerDown={event => { drag.current = event.clientX; suppressClick.current = false; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerUp={event => { if (drag.current !== null) { const delta = event.clientX - drag.current; if (Math.abs(delta) > 24) { suppressClick.current = true; flip(delta < 0 ? 1 : -1); } } drag.current = null; }}
    onPointerCancel={() => { drag.current = null; }}
    onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } flip(side === "left" ? -1 : 1); }}>
    <path d={side === "left" ? "M608 444Q747 444 835 490V755Q737 711 548 714Z" : "M835 490Q916 445 1082 448L1138 714Q933 715 835 755Z"} />
  </g>;
  return <g className={styles.interactiveBook} role="group" aria-label={`Product field guide, pages ${current * 2 + 1} and ${current * 2 + 2} of ${bookPages.length}`}>
    <ellipse cx="839" cy="787" rx="320" ry="29" fill="var(--book-shadow)" opacity=".42" />
    <path d="M583 476L505 744Q680 752 807 776Q834 795 859 778L1178 746L1097 477L840 535Z" fill="#07324c" stroke="var(--outline)" strokeWidth="3" />
    <path d="M589 460L519 734Q712 742 828 767Q955 744 1162 735L1090 462L836 517Z" fill="#fc946b" stroke="#153f53" strokeWidth="2" />
    <path d="M597 452L533 721Q715 726 833 764Q940 728 1150 725L1084 454L835 507Z" fill="#d0ad7b" stroke="#89775a" strokeWidth="1.4" />
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${543 + i * 2} ${710 - i * 4}Q709 ${716 - i * 4} 833 ${758 - i * 2}Q953 ${719 - i * 4} ${1140 - i * 2} ${715 - i * 4}`} fill="none" stroke={i % 2 ? "#f9dfb4" : "#ba936a"} strokeWidth="2" />)}
    <path d="M608 444Q747 444 835 490Q916 445 1082 448L1138 714Q933 715 835 755Q737 711 548 714Z" fill={`url(#${id}-paper)`} stroke="#b29b75" strokeWidth="1.5" />
    <path d="M622 461Q742 459 815 499L815 729Q712 695 568 698ZM855 501Q947 468 1068 469L1117 696Q964 692 855 730Z" fill="none" stroke="#dbcbaa" />
    <PageContent page={getPage(leftSheet, 0)} number={leftSheet * 2 + 1} side="left" />
    <PageContent page={getPage(rightSheet, 1)} number={rightSheet * 2 + 2} side="right" />
    <path d="M823 501Q822 643 835 754Q846 652 848 496" fill={`url(#${id}-crease)`} />
    {turn && <g className={styles.turningSheet} pointerEvents="none" aria-hidden="true">
      <path d={`M835 490Q${835 + cosine * 160} ${460 - sine * 75} ${outerTop} ${490 - 42 * Math.abs(cosine) - 70 * sine}L${outerBottom} ${755 - 41 * Math.abs(cosine) - 35 * sine}Q${835 + cosine * 160} ${734 - sine * 32} 835 755Z`} fill={`url(#${id}-paper)`} stroke="#b8a17a" strokeWidth="1.3" />
      <PageContent page={getPage(movingSheet, movingPageSide)} number={movingSheet * 2 + movingPageSide + 1} side={faceSide} cosine={cosine} lift={sine * 70} />
      <path d={`M835 490Q${835 + cosine * 160} ${460 - sine * 75} ${outerTop} ${490 - 42 * Math.abs(cosine) - 70 * sine}L${outerBottom} ${755 - 41 * Math.abs(cosine) - 35 * sine}Q${835 + cosine * 160} ${734 - sine * 32} 835 755Z`} fill="#604a2c" opacity={sine * .12} />
    </g>}
    <path d="M845 749L861 814L879 796L898 808L876 739Z" fill="#fc987b" stroke="#254655" strokeWidth="1.6" />
    <path d="M853 750L864 791L871 782" fill="#ffb291" opacity=".75" />
    <path d="M812 770Q832 754 853 769" fill="none" stroke="#132f44" strokeWidth="3" />
    {zone("left")}{zone("right")}

    <g role="status" aria-live="polite"><title>{getPage(current, 0).lines.join(" ")} {getPage(current, 0).author}. {getPage(current, 1).lines.join(" ")} {getPage(current, 1).author}.</title></g>
  </g>;
}

export default function ProductGarden({ theme = "auto", className = "", paused = false, showHeading = true, showTagline = true, landscape = true, leftQuote = LEFT_QUOTE, rightQuote = RIGHT_QUOTE, style, pages }: ProductGardenProps) {
  const id = `garden-${useId().replace(/:/g, "")}`;
  const host = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);
  const extra = mobile ? 160 : 0;
  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const flyers = useRef<(SVGGElement | null)[]>([]);
  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, last = 0, elapsed = 0, visible = true;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; };
    const animate = (now: number) => {
      if (last) elapsed += Math.min((now - last) / 1000, .05);
      last = now;
      flyers.current.forEach((node, i) => {
        if (!node) return;
        const b = BUTTERFLIES[i]!;
        const t = elapsed + i * 19.2;
        const px = 835 + 622 * Math.sin(t * (.038 + i * .0017) + i * 1.7) + 58 * Math.sin(t * .237 + i);
        const py = 425 + 259 * Math.sin(t * (.061 + i * .0013) + i * 2.1) + 42 * Math.sin(t * .31 + i);
        const dx = 622 * (.038 + i * .0017) * Math.cos(t * (.038 + i * .0017) + i * 1.7) + 58 * .237 * Math.cos(t * .237 + i);
        const tilt = Math.sin(t * .67 + i) * 19 + (dx < 0 ? -13 : 13);
        const ease = Math.min(elapsed / 5, 1);
        const blend = ease * ease * (3 - 2 * ease);
        node.setAttribute("transform", `translate(${b.x + (px - b.x) * blend} ${b.y + (py - b.y) * blend}) rotate(${tilt}) scale(${b.size})`);
      });
      frame = requestAnimationFrame(animate);
    };
    const sync = () => {
      stop();
      const active = !paused && visible && !document.hidden && !media.matches;
      root.dataset.animating = String(active);
      if (active) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? true; sync(); });
    observer.observe(root);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { stop(); observer.disconnect(); media.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [paused]);

  return <div ref={host} className={`${styles.root} ${className}`} data-garden-theme={theme} data-paused={paused || undefined} style={style}>
    <svg className={styles.scene} viewBox={mobile ? "381 0 910 1101" : "0 0 1672 941"} xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Learn Product Management</title>
      <desc id={`${id}-desc`}>An illustrated garden framing an open book, with flowers, butterflies, mountains and a lake. {leftQuote.lines.join(" ")} by {leftQuote.author}. {rightQuote.lines.join(" ")} by {rightQuote.author}.</desc>
      <defs>
        <clipPath id={`${id}-arch`}><path d={`M390 ${844 + extra}V482C390 223 590 30 835 30S1280 223 1280 482V${844 + extra}Z`} /></clipPath>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="var(--sky-top)" /><stop offset="1" stopColor="var(--sky-bottom)" /></linearGradient>
        <radialGradient id={`${id}-sun`}><stop stopColor="#ffe4a3" /><stop offset="1" stopColor="#ffca76" /></radialGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#ffe4a4" stopOpacity=".65" /><stop offset=".5" stopColor="#ffe5ad" stopOpacity=".16" /><stop offset="1" stopColor="#ffe5ad" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-lake`} x2="0" y2="1"><stop stopColor="var(--water-top)" /><stop offset="1" stopColor="var(--water-bottom)" /></linearGradient>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffcf1" /><stop offset=".75" stopColor="#fff7e4" /><stop offset="1" stopColor="#f8e8cb" /></linearGradient>
        <linearGradient id={`${id}-crease`}><stop stopColor="#bca176" stopOpacity="0" /><stop offset=".5" stopColor="#bca176" stopOpacity=".25" /><stop offset="1" stopColor="#bca176" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-panel`}><stop stopColor="var(--panel-a)" /><stop offset="1" stopColor="var(--panel-b)" /></linearGradient>
        <linearGradient id={`${id}-wing-gold`} x2=".8" y2="1"><stop stopColor="#ffdc8a" /><stop offset=".6" stopColor="#ffc663" /><stop offset="1" stopColor="#f5a058" /></linearGradient>
        <linearGradient id={`${id}-wing-coral`} x2=".8" y2="1"><stop stopColor="#ffd092" /><stop offset=".5" stopColor="#ffa281" /><stop offset="1" stopColor="#ee806d" /></linearGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
        <g id={`${id}-star`}><path d="M0-13C2-3 3-2 12 0C3 2 2 3 0 14C-2 3-3 2-12 0C-3-2-2-3 0-13Z" /></g>
        <g id={`${id}-cloud`}><path d="M0 73Q18 58 38 62C29 12 95-9 119 35C144 12 187 35 183 63Q210 54 225 76L258 83H-22Z" fill="var(--cloud)" /><path d="M21 74Q39 62 54 66Q48 26 83 27Q103 28 111 45Q79 24 70 70Q42 62 35 78Z" fill="var(--cloud-shade)" opacity=".35" /></g>
      </defs>
      <g className={styles.sidePanels}>
        {[false, true].map((right) => <g key={String(right)} transform={right ? "translate(1672 0) scale(-1 1)" : undefined}>
          <path d="M76 175L369 144V829H76Z" fill={`url(#${id}-panel)`} stroke="var(--outline)" strokeWidth="2" />
          <path d="M69 167L377 137V835H69Z" fill="none" stroke="var(--line)" strokeWidth="1.7" />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${80 + i * 32} ${174 - i * 3.2}l27-3V827h-27Z`} fill={i % 2 ? "var(--tile-dark)" : "var(--tile-light)"} opacity=".7" />)}
          {Array.from({ length: 5 }, (_, row) => Array.from({ length: 5 }, (_, col) => <g key={`${row}-${col}`} transform={`translate(${77 + col * 59} ${178 + row * 111 - col * 4})`}>
            <path d="M0 0Q53 8 66 82Q-8 97 0 0Z" fill={`var(--panel-leaf-${(row + col) % 3})`} stroke="var(--outline)" strokeWidth="1.6" />
            <path d="M0 0Q33 32 66 82" fill="none" stroke="var(--outline)" opacity=".38" />
          </g>))}
          <path d="M398 122L502 102L398 246Z" fill="#ffa08a" stroke="var(--line)" strokeWidth="2" />
          <path d="M409 136L471 123L409 211Z" fill="none" stroke="var(--outline)" strokeWidth="2" />
          <circle cx="418" cy="144" r="11" fill="#ffdc96" stroke="var(--outline)" strokeWidth="1.5" /><circle cx="415" cy="168" r="7" fill="#ffdc96" stroke="var(--outline)" strokeWidth="1.5" />
        </g>)}
      </g>
      <g clipPath={`url(#${id}-arch)`}>
        {landscape && <path d={`M390 20H1280V${844 + extra}H390Z`} fill={`url(#${id}-sky)`} />}
        <g className={styles.day}>
          <circle cx="1085" cy="197" r="70" fill={`url(#${id}-sun)`} opacity=".93" />
          <circle cx="1085" cy="197" r="70" fill="none" stroke="#fff6d5" strokeWidth="2" /><circle cx="1085" cy="197" r="61" fill="none" stroke="#fff0bd" />
          {[0, 1, 2].map(i => <g key={i} transform={`translate(${831 + i * 38} ${148 + i * 19})`}><g className={styles.bird} style={timing(i, 12)}><path d="M-15 0Q-7-9 0 0Q9-10 19-3" fill="none" stroke="#315a73" strokeWidth="1.5" strokeLinecap="round" /></g></g>)}
        </g>
        <g className={styles.night}>
          <circle cx="1085" cy="197" r="130" fill={`url(#${id}-halo)`} className={styles.halo} />
          <circle cx="1085" cy="197" r="70" fill="#ffe7ac" stroke="#fff4d1" strokeWidth="3" />
          {Array.from({ length: 13 }, (_, i) => { const a = i * 2.4, r = 20 + noise(i) * 39; return <ellipse key={i} cx={1085 + Math.cos(a) * r} cy={197 + Math.sin(a) * r} rx={5 + noise(i + 7) * 8} ry={7 + noise(i + 4) * 7} transform={`rotate(${i * 27} ${1085 + Math.cos(a) * r} ${197 + Math.sin(a) * r})`} fill="#f5ca8b" opacity=".38" />; })}
          {Array.from({ length: 75 }, (_, i) => <circle key={i} cx={410 + noise(i + 70) * 850} cy={43 + noise(i + 152) * 420} r={.5 + noise(i + 18)} fill="#f9edcf" className={styles.twinkle} style={timing(i, 2)} />)}
          {[[517, 188], [661, 131], [855, 80], [905, 121], [987, 109], [1175, 311], [680, 426], [876, 445], [462, 346]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><g className={styles.twinkle} style={timing(i, 3)}><use href={`#${id}-star`} fill="#ffe4a4" filter={`url(#${id}-glow)`} /><use href={`#${id}-star`} fill="#ffe9b2" /></g></g>)}
        </g>
        {[[474, 126, 1], [1018, 169, .92], [405, 259, .65], [1109, 319, .62]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><g className={styles.cloud} style={timing(i, 22)}><use href={`#${id}-cloud`} /></g></g>)}
        {landscape && <g transform={`translate(0 ${extra})`}>
          <path d="M373 434L451 333L490 374L514 354L548 393L582 372L636 424L668 409L738 462L810 418L888 464L979 413L1038 443L1098 394L1140 417L1263 332L1298 476V588H373Z" fill="var(--mountain-far)" />
          <path d="M451 333L422 408L451 386L471 399L461 372L490 374ZM514 354L501 392L518 382L549 416ZM810 418L771 451L806 440L848 455ZM1263 332L1206 413L1234 400L1249 410Z" fill="var(--snow)" opacity=".75" />
          <path d="M375 491L454 415L532 460L576 433L636 480L702 452L771 499L847 459L922 488L992 448L1084 492L1173 430L1289 485V587H375Z" fill="var(--mountain-mid)" />
          <path d="M389 520L449 472L512 498L565 477L659 526L723 498L787 529L909 511L961 477L1037 518L1110 482L1194 505L1287 462V572H389Z" fill="var(--mountain-near)" />
          {Array.from({ length: 46 }, (_, i) => <Pine key={i} x={386 + i * 20} y={550 + noise(i) * 10} size={.32 + noise(i + 40) * .53} shade={i % 3} />)}
          {Array.from({ length: 27 }, (_, i) => <path key={i} d={`M${375 + i * 35} 554q-12-27 8-31q5-24 25-9q26-12 30 18v26Z`} fill={i % 2 ? "var(--bush-light)" : "var(--bush-dark)"} />)}
          <path d="M389 546H1281V802H389Z" fill={`url(#${id}-lake)`} />
          {Array.from({ length: 105 }, (_, i) => { const x = 390 + noise(i + 30) * 880, y = 550 + noise(i + 100) * 249; return <path key={i} d={`M${x} ${y}h${8 + noise(i + 71) * 64}`} stroke={i % 4 === 0 ? "var(--reflection)" : "var(--ripple)"} strokeWidth={1 + noise(i + 92) * 2.5} opacity={.25 + noise(i + 32) * .5} />; })}
          <g className={styles.night}>{[457, 1199].map(x => <g key={x}><path d={`M${x - 7} 558v-13l7-7 7 7v13Z`} fill="#ffc260" /><path d={`M${x - 11} 547l11-12 11 12`} fill="none" stroke="#a06a3a" strokeWidth="3" /><path d={`M${x - 2} 549v9`} stroke="#735b45" strokeWidth="3" /><path d={`M${x - 9} 567h18m-14 8h11m-15 9h23m-19 12h12`} stroke="#ffe1a1" strokeWidth="2" opacity=".7" /></g>)}</g>
          <path d="M390 808Q591 746 721 780Q891 736 1026 784Q1160 753 1282 804V848H390Z" fill="var(--ground)" />
          {[[750, 800, 100, 23], [901, 814, 87, 29], [825, 777, 79, 17], [996, 795, 55, 22]].map(([x, y, rx, ry], i) => <g key={i}><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="var(--rock)" stroke="var(--outline)" /><path d={`M${x! - rx! * .7} ${y! - 4}q${rx! * .6}-${ry! * .7} ${rx! * 1.2}-2`} stroke="var(--rock-edge)" fill="none" strokeWidth="3" /></g>)}
        </g>}
      </g>
      <path d={`M378 ${842 + extra}V482C378 218 582 18 835 18S1292 218 1292 482V${842 + extra}M390 ${842 + extra}V482C390 223 590 30 835 30S1280 223 1280 482V${842 + extra}`} fill="none" stroke="var(--line)" strokeWidth="2" />
      <g className={styles.sidePanels}>
        {[false, true].map(right => <g key={String(right)} transform={right ? "translate(1672 0) scale(-1 1)" : undefined}>
          {Array.from({ length: 9 }, (_, i) => <Plant key={i} x={142 + noise(i + 20) * 168} y={827 + noise(i + 4) * 8} height={112 + noise(i + 31) * 150} angle={-18 + noise(i + 51) * 36} index={i + (right ? 24 : 0)} />)}
          <Plant x={124} y={799} height={228} angle={6} gold index={2} /><Plant x={262} y={820} height={188} angle={26} gold index={8} />
          <BlossomBranch x={298} y={615} index={7} />
          {[[138, 578, 1.02, 0], [202, 650, 1.16, 1], [292, 704, .78, 0], [106, 683, .4, 1]].map(([x, y, s, c], i) => <g key={i} transform={`translate(${x} ${y})`}><g className={styles.sway} style={timing(i + 9)}><path d="M0 64Q-10 24 0 0" className={styles.stem} fill="none" strokeWidth="2" /><Flower x={0} y={0} size={s} coral={!!c} turn={i * 19} /></g></g>)}
        </g>)}
      </g>
      <g transform={`translate(0 ${extra})`}>{[false, true].map(right => <g key={String(right)} transform={right ? "translate(1672 0) scale(-1 1)" : undefined}>
        <Plant x={438} y={533} height={132} angle={-3} index={14} /><Flower x={433} y={440} size={.4} />
        {Array.from({ length: 6 }, (_, i) => <Plant key={i} x={466 + i * 43} y={844} height={66 + noise(i + 64) * 76} angle={-24 + noise(i + 94) * 48} index={i + 18} />)}
        {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${402 + i * 30} 847q-16-24 1-34q4-17 22-10q18-18 27 4q24-5 29 40Z`} fill={i % 2 ? "var(--bush-dark)" : "var(--bush-light)"} stroke="var(--outline)" strokeWidth="1" />)}
        <Flower x={480} y={748} size={.48} />
      </g>)}</g>
      <g transform={mobile ? `translate(835 ${620 + extra * .65}) scale(1.12) translate(-835 -620)` : undefined}><Book left={leftQuote} right={rightQuote} id={id} pages={pages} /></g>
      <g aria-hidden="true" pointerEvents="none">
        {BUTTERFLIES.map((b, i) => <g key={i} ref={node => { flyers.current[i] = node; }} transform={`translate(${b.x} ${b.y}) scale(${b.size})`}>
          <g transform="rotate(-22)" className={styles.butterfly} style={{ "--flap": `${.19 + i * .017}s` } as CSSProperties}>
            {[-1, 1].map(sign => <g key={sign} transform={`scale(${sign} 1)`}><g className={styles.wing}>
              <path d="M0 0C4-15 3-43 13-47C27-49 36-16 7 3C25-9 46-7 43 2C40 17 16 30 3 8C18 27 11 37 5 29C-1 24-4 8 0 0Z" fill={`url(#${id}-wing-${b.color})`} stroke="#173b51" strokeWidth="1.5" />
              <path d="M2 3Q20-23 13-43M3 5L36 0M6-6L22-13M5 8L22 18" fill="none" stroke="#b77756" strokeWidth=".8" opacity=".8" />
              <path d="M13-40l3 6M21-29l2 5M37 1l-5 3" stroke="#fff1c3" strokeWidth="2" strokeLinecap="round" />
            </g></g>)}
            <path d="M0 15Q-4 1 0-14Q4-6 0 15Z" fill="#12364a" /><path d="M0-10Q-13-30-11-31M0-10Q10-31 13-27" fill="none" stroke="#c79f63" strokeWidth="1" /><circle cx="-11" cy="-31" r="1.5" fill="#efc272" /><circle cx="13" cy="-27" r="1.5" fill="#efc272" />
          </g>
        </g>)}
      </g>
      <path d={`M69 ${847 + extra}H1603M69 ${855 + extra}H1603`} stroke="var(--line)" strokeWidth="1.5" />
      <g className={styles.sidePanels}>{[70, 1333].map(x => <g key={x}><path d={`M${x} 869h269v50H${x}Z`} fill="#ffa18b" stroke="var(--line)" strokeWidth="1.6" />{Array.from({ length: 8 }, (_, i) => <path key={i} transform={`translate(${x + 26 + i * 30} 882)`} d="M0 19C-3 9-11 1-8-4Q-4-10 0-3Q5-11 8-5C12 0 4 12 0 19Z" fill="var(--heart)" stroke="var(--outline)" strokeWidth="1.3" />)}</g>)}</g>
      {showTagline && <text x="836" y={901 + extra} textAnchor="middle" className={styles.tagline}>A FIELD GUIDE FOR CURIOUS MINDS</text>}
    </svg>
    {showHeading && <h1 className={styles.heroHeading} aria-label="Learn Product Management"><span>Learn</span><span>Product</span><span>Management</span></h1>}
  </div>;
}

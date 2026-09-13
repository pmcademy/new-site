"use client";

import { useId, useState } from "react";
import type { LabKind } from "@/lib/course/enrichment/level-one";
import MotionFrame from "@/components/art/MotionFrame";

const titles: Record<LabKind, string> = {
  flow: "A delayed response changes the flow",
  funnel: "Change one step. Follow the effect.",
  economics: "What does one customer contribute?",
  retention: "The same cohort, two possible stories",
  extraction: "Follow a claim back to its source",
  rice: "How much confidence changes the choice?",
};
const quotes = [
  { id: "A", quote: "I retried because nothing changed.", action: "Retried the operation", theme: "Possible missing feedback" },
  { id: "B", quote: "The success email arrived after I closed the page.", action: "Closed the page before email", theme: "Possible delayed feedback" },
  { id: "C", quote: "I would like a darker theme.", action: "No action described", theme: "Appearance preference" },
];

export default function ConceptLab({ kind }: { kind: LabKind }) {
  const id = useId();
  const [value, setValue] = useState(kind === "economics" ? 12 : 50);
  const [alternate, setAlternate] = useState(false);
  const [source, setSource] = useState(0);
  const range = (label: string, min: number, max: number, suffix: string) => <label className="lab-control" htmlFor={`${id}-range`}>
    <span>{label} <strong>{value}{suffix}</strong></span>
    <input id={`${id}-range`} type="range" min={min} max={max} value={value} onChange={e => setValue(Number(e.target.value))}/>
  </label>;
  let content;
  if (kind === "funnel") {
    const counts = [1000, 800, 800 * value / 100, 800 * value / 100 * .8, 800 * value / 100 * .8 * .9];
    content = <>{range("Step 2 retention", 10, 90, "%")}
      <svg viewBox="0 0 600 235" role="img" aria-label={`Funnel: ${counts.map(n => Math.round(n)).join(', ')} users at successive steps.`}>
        {counts.map((n, i) => <g key={i}><rect className="lab-bar" x={20+i*118} y={184-n*.13} width="88" height={n*.13} rx="6" fill={i === 2 ? "var(--art-coral)" : "var(--art-blue)"}/><text x={64+i*118} y={172-n*.13}>{Math.round(n)}</text><text x={64+i*118} y="209">{i ? `Step ${i}` : "Start"}</text></g>)}
      </svg>
      <output className="lab-result">{Math.round(counts[4])} completed jobs · {(counts[4]/10).toFixed(1)}% overall</output>
      <p>1,000 × 80% × {value}% × 80% × 90% = {counts[4].toFixed(1)} expected completions. Baseline: 288. Rounded counts are illustrative; all other rates stay fixed.</p>
    </>;
  } else if (kind === "economics") {
    const contribution = 30 - value;
    content = <>{range("Variable cost per customer / month", 0, 36, " dollars")}
      <svg viewBox="0 0 600 165" role="img" aria-label={`Revenue 30 dollars, variable cost ${value} dollars, contribution ${contribution} dollars.`}>
        <text x="20" y="26" textAnchor="start">Monthly revenue: $30</text><rect x="20" y="43" width="450" height="44" rx="6" fill="var(--art-sage)"/>
        <rect className="lab-bar" x="20" y="43" width={value*15} height="44" rx="6" fill="var(--art-coral)"/>
        <path d="M470 36v60" stroke="var(--ink)" strokeDasharray="4 4"/>
        <text x="20" y="124" textAnchor="start">Coral: variable cost · Teal: positive contribution</text>
      </svg>
      <output className="lab-result">${contribution} contribution · {contribution > 0 ? `${(90/contribution).toFixed(1)} months simple payback` : "No finite payback at this contribution"}</output>
      <p>Payback = $90 acquisition cost ÷ monthly contribution, only when contribution is positive. Fixed costs, churn, taxes, and cash timing are excluded from this teaching model.</p>
    </>;
  } else if (kind === "rice") {
    const score = 100 * 2 * value/100 / 2;
    content = <>{range("Option A confidence", 10, 100, "%")}
      <svg viewBox="0 0 600 170" role="img" aria-label={`RICE score A ${score}, B 64.`}>
        <text x="20" y="42" textAnchor="start">A</text><rect className="lab-bar" x="60" y="20" width={score*4.8} height="36" rx="6" fill="var(--art-blue)"/>
        <text x="20" y="112" textAnchor="start">B</text><rect x="60" y="90" width={64*4.8} height="36" rx="6" fill="var(--art-ochre)"/>
        <path d="M60 141h480" stroke="var(--art-rim)"/><text x="60" y="163">0</text><text x="540" y="163">100</text>
      </svg>
      <output className="lab-result">A: {score} · B: 64 · {score === 64 ? "Equal scores" : `Option ${score > 64 ? "A" : "B"} ranks higher`}</output>
      <p>A = 100 reach × 2 impact × {value/100} confidence ÷ 2 person-months. B = 80 × 1 × 0.8 ÷ 1 = 64. A needs confidence above 64% to lead. Evidence must justify that change.</p>
    </>;
  } else if (kind === "retention") {
    const points = alternate ? [100,40,25,15,8] : [100,40,33,31,30];
    content = <><button type="button" className="lab-toggle" aria-pressed={alternate} onClick={()=>setAlternate(v=>!v)}>{alternate ? "Show a flattening curve" : "Show continued loss"}</button>
      <svg viewBox="0 0 600 245" role="img" aria-label={`Weekly interval retention: ${points.join(', ')} percent. Hypothetical cohort of 100.`}>
        {[0,50,100].map(n=><g key={n}><path d={`M55 ${200-n*1.5}H560`} stroke="var(--line-2)" strokeDasharray="4 4"/><text x="29" y={205-n*1.5}>{n}%</text></g>)}
        <polyline className="lab-curve" points={points.map((n,i)=>`${65+i*120},${200-n*1.5}`).join(' ')} fill="none" stroke="var(--art-ochre)" strokeWidth="4"/>
        {points.map((n,i)=><g key={i}><circle cx={65+i*120} cy={200-n*1.5} r="6" fill="var(--art-coral)"/><text x={65+i*120} y="232">{i ? `W${i}` : "Start"}</text></g>)}
      </svg>
      <output className="lab-result">Week 4: {points[4]} of 100 returners ({points[4]}%)</output>
      <p>{alternate ? "Continued loss raises a question about repeated value. It does not identify the cause." : "A flattening tail suggests a group may be finding repeated value. Four weeks cannot establish a lasting plateau."} Each week counts return in that interval, always divided by the original 100.</p>
    </>;
  } else if (kind === "flow") {
    content = <><button type="button" className="lab-toggle" aria-pressed={alternate} onClick={()=>setAlternate(v=>!v)}>{alternate ? "Show immediate confirmation" : "Explore a timeout"}</button>
      <MotionFrame label="flow animation"><svg viewBox="0 0 600 230" role="img" aria-label={alternate ? "Request to unknown outcome to status check. Confirm the result before retrying." : "Request to confirmed success to saved result."}>
        <path className="lab-flow" d="M110 95H490" stroke="var(--art-ochre)" strokeWidth="3" strokeDasharray="8 8"/>
        {["Request",alternate ? "Unknown" : "Confirmed",alternate ? "Check status" : "Saved"].map((label,i)=><g key={label}><circle cx={100+i*200} cy="95" r="42" fill={i===1?"var(--art-coral)":"var(--art-blue)"} stroke="var(--art-rim)"/><text x={100+i*200} y="170">{label}</text></g>)}
        <path d="m89 95 8 8 15-19M289 95l8 8 15-19M489 95l8 8 15-19" fill="none" stroke="var(--art-page)" strokeWidth="3"/>
      </svg></MotionFrame>
      <p>{alternate ? "The client timed out, but the server may still be working. Preserve the attempt ID, ask the server for status, and offer a safe next action after confirmation. A blind retry could duplicate the operation." : "The server confirms completion before the product shows a saved result. A button click alone is not confirmation."}</p>
    </>;
  } else {
    const row = quotes[source];
    content = <><div className="lab-source-tabs" role="group" aria-label="Choose a fictional source">{quotes.map((q,i)=><button key={q.id} type="button" className="lab-toggle" aria-pressed={source===i} onClick={()=>setSource(i)}>Ticket {q.id}</button>)}</div>
      <MotionFrame label="evidence animation"><svg viewBox="0 0 600 135" role="img" aria-label={`Ticket ${row.id} feeds an extraction, then a tentative theme. Each claim must retain its source ID.`}>
        <path className="lab-flow" d="M100 65H490" fill="none" stroke="var(--art-ochre)" strokeWidth="3" strokeDasharray="8 8"/>
        {[`Source ${row.id}`,"Extraction","Tentative theme"].map((label,i)=><g key={i}><rect x={10+i*200} y="36" width="180" height="58" rx="12" fill="var(--surface)" stroke="var(--art-rim)"/><text x={100+i*200} y="72">{label}</text></g>)}
      </svg></MotionFrame>
      <blockquote className="lab-quote">“{row.quote}” <cite>Fictional ticket {row.id}</cite></blockquote>
      <dl className="lab-extraction"><div><dt>Observed action</dt><dd>{row.action}</dd></div><div><dt>Interpretation, not a fact</dt><dd>{row.theme}</dd></div></dl>
      <p>Tickets A and B may share a feedback issue. Ticket C does not support that claim. Three selected tickets cannot establish how common the issue is across the product.</p>
    </>;
  }
  return <section className="concept-lab" aria-labelledby={`${id}-title`}>
    <span className="eyebrow">Try the concept</span><h3 id={`${id}-title`}>{titles[kind]}</h3>
    <p className="lab-disclaimer">Interactive teaching example · All numbers and tickets are fictional.</p>{content}
  </section>;
}

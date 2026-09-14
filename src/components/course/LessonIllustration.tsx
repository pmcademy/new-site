import { useId, type ReactNode } from "react";
import type { LessonVisual } from "@/lib/course/lesson-visuals";

const colours = ["var(--art-blue-light)", "var(--art-sage-light)", "var(--art-coral-light)", "var(--art-ochre-light)"];
function Text({ x, y, children, size = 14, anchor = "middle", color = "var(--ink)" }: { x: number; y: number; children: ReactNode; size?: number; anchor?: "start" | "middle" | "end"; color?: string }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} stroke="none" fontFamily="var(--sans)">{children}</text>;
}
function Mark({ kind, i, x, y }: { kind: LessonVisual["kind"]; i: number; x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="var(--art-outline)" strokeWidth="1.5" fill={colours[i % 4]} strokeLinejoin="round">
    {kind === "conversation" ? <><path d="M-23-18h46v27H-3l-12 10V9h-8Z"/><path d="M-14-8h27m-27 8h17" fill="none"/></> :
      kind === "schema" ? <><ellipse cy="-15" rx="23" ry="7"/><path d="M-23-15v29c0 10 46 10 46 0v-29"/><path d="M-23-4c0 10 46 10 46 0m-46 10c0 10 46 10 46 0" fill="none"/></> :
      kind === "document" ? <><path d="M-18-23h28l10 10v36h-38Z"/><path d="M10-23v11h10M-10-4h22m-22 9h22m-22 9H5" fill="none"/></> :
      kind === "branch" ? <><path d="M-15 22v-43M-15 9Q18 9 18-14" fill="none" strokeWidth="2"/><circle cx="-15" cy="-15" r="5"/><circle cx="-15" cy="17" r="5"/><circle cx="18" cy="-14" r="5"/></> :
      kind === "tree" ? <><path d="M0-10V4m-21 11V4h42v11" fill="none"/><path d="m0-25 11 8-11 8-11-8Z"/><rect x="-28" y="13" width="14" height="12" rx="2"/><rect x="14" y="13" width="14" height="12" rx="2"/></> :
      kind === "matrix" || kind === "cohort" ? <>{[0,1,2,3,4,5].map(k=><rect key={k} x={-25+k%3*18} y={-16+Math.floor(k/3)*20} width="14" height="16" rx="2" fill={k===i ? "var(--art-coral)" : colours[i%4]}/>)}</> :
      <><circle r="23"/><path d={i%4===0 ? "M0-15 4-4 15 0 4 4 0 15-4 4-15 0-4-4Z" : i%4===1 ? "m-11 0 7 8 15-18" : i%4===2 ? "M-12 10V-3m12 13v-22m12 22V2" : "m-9-13 19 13-19 13Z"} fill="none" strokeWidth="2"/></>}
  </g>;
}
export default function LessonIllustration({ visual }: { visual: LessonVisual }) {
  const id = useId().replace(/:/g, "");
  const {kind, nodes} = visual;
  const defs = <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="m1 1 5 3-5 3" stroke="var(--art-outline)" fill="none"/></marker>;
  const arrow = { stroke: "var(--art-rim)", fill: "none", markerEnd: `url(#${id}-arrow)` };
  const card = (i: number, x: number, y: number, w = 144) => <g key={i}>
    <path d={`M${x-w/2+3} ${y+3}h${w}v118h-${w}Z`} fill="var(--art-blue-mid)" opacity=".18"/>
    <rect x={x-w/2} y={y} width={w} height="118" rx="8" fill="var(--surface)" stroke="var(--line-2)"/>
    <path d={`M${x-w/2+8} ${y+1}h${w-16}`} stroke={colours[i%4]} strokeWidth="5"/>
    <Mark kind={kind} i={i} x={x} y={y+35}/><Text x={x} y={y+79} size={14}>{nodes[i].label}</Text>
  </g>;
  let scene: ReactNode;
  if (kind === "tree") {
    scene = <><path d="M320 103v35M110 153v-15h420v15m-210-15v15" {...arrow}/><rect x="224" y="30" width="192" height="74" rx="37" fill={colours[0]} stroke="var(--art-outline)"/><Text x={320} y={62} color="var(--art-label)">{nodes[0].label}</Text><Text x={320} y={83} size={12} color="var(--art-label)">{nodes[0].detail}</Text>{nodes.slice(1).map((n,i)=> <g key={i}>{card(i+1,110+i*(420/Math.max(1,nodes.length-2)),154,180)}<Text x={110+i*(420/Math.max(1,nodes.length-2))} y={252} size={12}>{n.detail}</Text></g>)}</>;
  } else if (kind === "schema") {
    scene = <>{nodes.map((n,i)=> <g key={i}><rect x={25+i*210} y="58" width="170" height="150" rx="8" fill="var(--surface)" stroke="var(--art-outline)"/><path d={`M${26+i*210} 59h168v42H${26+i*210}Z`} fill={colours[i]}/><Text x={110+i*210} y={85} size={17} color="var(--art-label)">{n.label}</Text><Text x={110+i*210} y={129} size={12}>{n.detail}</Text><path d={`M${43+i*210} 147h130m-130 20h94m-94 18h110`} stroke="var(--line-2)"/></g>)}<path d="M110 208v30h210v-27M110 238v24h420v-51" {...arrow}/><Text x={425} y={249} size={11}>shared key</Text></>;
  } else if (kind === "balance") {
    scene = <><path d="M320 79v149m-78 0h156M120 101l200-27 200 27m-400 0-38 71h76Zm400 0-38 71h76Z" stroke="var(--art-outline)" fill="none" strokeWidth="2"/><circle cx="320" cy="75" r="10" fill="var(--art-ochre)"/><path d="M80 173q40 40 80 0m320 0q40 40 80 0" fill="var(--art-blue-light)" stroke="var(--art-outline)"/>{nodes.slice(0,2).map((n,i)=><g key={i}><Text x={120+i*400} y={42} size={18}>{n.label}</Text><Text x={120+i*400} y={64} size={12}>{n.detail}</Text></g>)}<Text x={320} y={247} size={16}>{nodes[2].label}: {nodes[2].detail}</Text>{nodes[3] && <Text x={320} y={274} size={12}>{nodes[3].label}: {nodes[3].detail}</Text>}</>;
  } else if (kind === "cycle") {
    const positions = [[165,65],[475,65],[475,224],[165,224]];
    scene = <><path d="M260 66h115M475 101v81M380 224H270M165 189v-82" {...arrow}/><circle cx="320" cy="145" r="43" fill="var(--art-frame)" stroke="var(--line-2)"/><Mark kind="cycle" i={0} x={320} y={145}/>{nodes.map((n,i)=><g key={i}><rect x={positions[i][0]-100} y={positions[i][1]-35} width="200" height="70" rx="35" fill={colours[i]} stroke="var(--art-outline)"/><Text x={positions[i][0]} y={positions[i][1]-2} size={16} color="var(--art-label)">{n.label}</Text><Text x={positions[i][0]} y={positions[i][1]+19} size={12} color="var(--art-label)">{n.detail}</Text></g>)}</>;
  } else if (kind === "cohort") {
    scene = <>{["Start","Age 1","Age 2","Age 3"].map((v,i)=><Text key={v} x={230+i*92} y={39}>{v}</Text>)}{nodes.map((n,i)=><g key={i}><Text x={22} y={90+i*65} anchor="start">{n.label}</Text>{[0,1,2,3].map(j=><g key={j}><rect x={191+j*92} y={60+i*65} width="78" height="49" rx="5" fill={j<=3-i?colours[i]:"var(--surface-2)"} stroke="var(--line-2)" strokeDasharray={j<=3-i?undefined:"3 3"}/><Text x={230+j*92} y={89+i*65} size={11} color={j<=3-i?"var(--art-label)":"var(--ink)"}>{j<=3-i?"observed":"not yet"}</Text></g>)}</g>)}</>;
  } else if (kind === "type" || kind === "spacing") {
    scene = <>{nodes.map((n,i)=><g key={i}>{kind==="type"?<Text x={50} y={65+i*60} size={34-i*5} anchor="start">{n.label}</Text>:<><rect x="50" y={38+i*61} width={Number(n.label)*5} height="24" fill={colours[i]} stroke="var(--art-outline)"/><Text x={235} y={57+i*61}>{n.label} px</Text></>}<Text x={335} y={60+i*60} anchor="start">{n.detail}</Text></g>)}</>;
  } else if (kind === "bars") {
    scene = <>{nodes.map((n,i)=><g key={i}><Text x={26} y={45+i*54} anchor="start">{n.label}</Text><rect x="175" y={23+i*54} width="435" height="35" rx="4" fill="var(--surface)" stroke="var(--line-2)"/><rect x="176" y={24+i*54} width="9" height="33" fill={colours[i]}/><Text x={199} y={46+i*54} anchor="start">{n.detail}</Text></g>)}<Text x={320} y={275} size={11}>Budget categories, not a numerical scale</Text></>;
  } else if (kind === "matrix" || kind === "document") {
    scene = <><rect x="25" y="15" width="590" height="260" rx="9" fill="var(--surface)" stroke="var(--art-outline)"/>{nodes.map((n,i)=><g key={i}><rect x="40" y={30+i*59} width="155" height="44" rx="4" fill={colours[i]}/><Text x={117} y={57+i*59} color="var(--art-label)">{n.label}</Text><Text x={215} y={57+i*59} anchor="start">{n.detail}</Text>{i<nodes.length-1&&<path d={`M40 ${81+i*59}h560`} stroke="var(--line)"/>}</g>)}</>;
  } else if (kind === "branch") {
    scene = <><path d="M68 210h503M98 210Q130 70 220 70h111q70 0 110 140" {...arrow}/>{nodes.map((n,i)=>{const x=[98,240,420,558][i],y=[210,70,150,210][i];return <g key={i}><circle cx={x} cy={y} r="11" fill={colours[i]} stroke="var(--art-outline)"/><Text x={x} y={y-28}>{n.label}</Text><Text x={x} y={y+38} size={12}>{n.detail}</Text></g>})}</>;
  } else {
    const step=590/nodes.length;
    scene = <>{nodes.map((n,i)=>{const x=25+step*(i+.5);return <g key={i}>{card(i,x,72,step-24)}<Text x={x} y={211} size={12}>{n.detail}</Text>{i<nodes.length-1 && kind!=="comparison"&&<path d={`M${x+step/2-10} 128h20`} {...arrow}/>}</g>})}</>;
  }
  return <figure className={`lesson-illustration visual-${kind}`} aria-labelledby={`${id}-caption`}>
    <div className="lesson-art-heading"><span className="eyebrow">The visual field guide</span><p>{visual.title}</p></div>
    <svg className="lesson-visual-wide" viewBox="0 0 640 290" aria-hidden="true"><defs>{defs}</defs>{scene}</svg>
    <svg className="lesson-visual-mobile" viewBox={`0 0 360 ${kind === "cohort" ? 240 : nodes.length*112+12}`} aria-hidden="true">
      {kind === "schema" && <path d="M12 53H4v224h8M4 165h8" stroke="var(--art-outline)" fill="none"/>}
      {kind === "cohort" ? <>{["Start", "Age 1", "Age 2", "Age 3"].map((v,i)=><Text key={v} x={112+i*66} y={23} size={11}>{v}</Text>)}{nodes.map((n,i)=><g key={i}><Text x={10} y={67+i*66} size={11} anchor="start">{n.label}</Text>{[0,1,2,3].map(j=><g key={j}><rect x={82+j*66} y={41+i*66} width="59" height="44" rx="4" fill={j<=3-i?colours[i]:"var(--surface)"} stroke="var(--line-2)"/><Text x={112+j*66} y={67+i*66} size={10} color={j<=3-i?"var(--art-label)":"var(--ink)"}>{j<=3-i?"observed":"not yet"}</Text></g>)}</g>)}</> : <>
      {nodes.map((n,i)=><g key={i}><rect x="12" y={8+i*112} width="336" height="92" rx="10" fill="var(--surface)" stroke="var(--line-2)"/><Mark kind={kind} i={i} x={48} y={53+i*112}/><Text x={89} y={44+i*112} anchor="start" size={16}>{n.label}</Text><Text x={89} y={68+i*112} anchor="start" size={12}>{n.detail}</Text>{i<nodes.length-1 && !["comparison","balance","matrix","tree","bars","schema"].includes(kind)&&<path d={`M180 ${102+i*112}v8m-4-4 4 4 4-4`} stroke="var(--art-outline)" fill="none"/>}</g>)}
      </>}
    </svg>
    <ol className="sr-only">{nodes.map(n=><li key={n.label}>{n.label}: {n.detail}</li>)}</ol>
    <figcaption id={`${id}-caption`}>{visual.caption}</figcaption>
  </figure>;
}

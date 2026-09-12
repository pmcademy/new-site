import { useId } from "react";
import { cn } from "@/lib/utils";

export type FieldKind = "compass" | "library" | "community" | "seed" | "craft" | "telescope";

export default function FieldArt({ kind = "compass", className }: { kind?: FieldKind; className?: string }) {
  const id = useId();
  return <div className={cn("field-art", className)} aria-hidden="true">
    <svg viewBox="0 0 360 270" fill="none" stroke="var(--art-outline)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <defs><pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V7" opacity=".2" /></pattern></defs>
      <path d="M53 235V143a127 127 0 0 1 254 0v92Z" fill="var(--art-frame)" />
      <path d="M60 228V143a120 120 0 0 1 240 0v85Z" fill="var(--art-sky)" />
      <circle cx="229" cy="81" r="30" fill="var(--art-sun)" />
      <path d="M60 186l44-40 40 22 50-47 48 51 58-22v78H60Z" fill="var(--art-mountain)" />
      <path d="M60 202q79-35 130-5t110-5v36H60Z" fill="var(--art-water)" />
      <path d="M68 209h43m7 7h29m87-8h38m-91 14h40" stroke="var(--art-ripple)" />
      <path d="M83 92q9-17 22-6q9-29 27-11q13-12 26 16Z" fill="var(--art-cloud)" />
      {kind === "compass" && <g>
        <path d="M128 108l13 104 39-16 42 16 12-104Z" fill="var(--art-coral)" />
        <circle cx="180" cy="131" r="61" fill="var(--art-ochre)" />
        <circle cx="180" cy="131" r="51" fill="var(--art-page)" />
        <circle cx="180" cy="131" r="43" strokeDasharray="1 5" />
        <path d="M180 91l14 40-14 40-14-40Z" fill="var(--art-blue)" />
        <path d="M180 91l14 40h-14Z" fill="var(--art-deep)" /><circle cx="180" cy="131" r="5" fill="var(--art-coral)" />
      </g>}
      {kind === "library" && <g>
        <path d="M98 152l73 16 95-22v57l-92 25-76-19Z" fill="var(--art-deep)" />
        <path d="M103 159l70 16 87-21v41l-87 24-70-17Z" fill="var(--art-page)" />
        <path d="M104 170l69 15 85-22m-154 20 69 14 85-23" opacity=".4" />
        <path d="M96 105q40-13 78 15q44-36 90-24v66q-43-2-90 33q-37-28-78-22Z" fill="var(--art-page)" />
        <path d="M174 120v75m-65-75 47 11m-47 0 47 11m-47 0 34 9m47-23 52-17m-52 28 52-17m-52 28 35-12" />
        <path d="M217 176l13-6 3 30-9-7-10 12Z" fill="var(--art-coral)" />
      </g>}
      {kind === "community" && <g>
        <path d="M104 147q-11-29 11-44q28-15 38 9l-3 38m59-7q-1-43 23-47q24 2 23 44" fill="var(--art-blue)" />
        <circle cx="130" cy="101" r="15" fill="var(--art-coral-light)" /><circle cx="233" cy="98" r="15" fill="var(--art-ochre-light)" />
        <path d="M158 144q-5-46 24-46q26 0 21 45" fill="var(--art-sage)" /><circle cx="180" cy="91" r="16" fill="var(--art-page-shade)" />
        <ellipse cx="180" cy="157" rx="83" ry="24" fill="var(--art-page)" /><path d="M113 164v52m132-52v52m-65-34v39" strokeWidth="4" />
        <path d="M156 146l29-5 22 13-29 8Z" fill="var(--art-blue-light)" /><path d="M119 148h12v12h-12Zm105-1h12v12h-12Z" fill="var(--art-coral)" />
        <path d="M168 48h45v22h-17l-10 10V70h-18Z" fill="var(--art-cloud)" /><path d="M175 55h26m-26 7h18" />
      </g>}
      {kind === "seed" && <g>
        <path d="M144 163h73l-10 53h-52Z" fill="var(--art-coral)" /><path d="M142 155h77v14h-77Z" fill="var(--art-coral-light)" />
        <path d="M180 156V72" strokeWidth="2" /><path d="M180 137q-62-6-55-56q53 3 55 56Z" fill="var(--art-sage)" />
        <path d="M180 115q58-5 53-55q-48 3-53 55Z" fill="var(--art-sage-light)" /><path d="M132 90l48 47m0-22 47-46" />
        <path d="M114 66l5 10m-17 5 11 3m129-42-5 10" stroke="var(--art-ochre)" />
        <path d="M152 184h55" opacity=".5" />
      </g>}
      {kind === "craft" && <g>
        <path d="M103 111l84-32 79 37-81 37Z" fill="var(--art-page)" /><path d="M103 111v72l82 37v-67Z" fill="var(--art-blue)" /><path d="M185 153l81-37v72l-81 32Z" fill="var(--art-blue-light)" />
        <path d="M140 97l80 37v69m-77-74v71" /><path d="M163 92l82 34v29l-25-12v-9Z" fill="var(--art-ochre)" />
        <path d="M117 159l39 17v21l-39-17Z" fill="var(--art-page)" /><path d="M125 172l20 9" />
      </g>}
      {kind === "telescope" && <g>
        <path d="M178 143l-52 72m52-72 55 72m-55-72v78" strokeWidth="3" />
        <path d="M116 135l112-69 20 33-112 68Z" fill="var(--art-blue)" /><path d="M213 69l15-9 25 41-15 9Z" fill="var(--art-ochre)" />
        <path d="M112 132l11-6 23 37-11 7Z" fill="var(--art-coral)" /><path d="M126 138l90-55" opacity=".5" /><circle cx="178" cy="147" r="7" fill="var(--art-page)" />
      </g>}
      {[0,1].map(side => <g key={side} transform={`translate(${side ? 291 : 67} 236) scale(${side ? -1 : 1} 1)`}>
        <path d="M0 0Q-15-51 1-116" />
        {[0,1,2,3,4].map(i => <g key={i} transform={`translate(0 ${-i*20})`}>
          <path d="M0 0q-33-2-31-27Q-8-25 0 0Z" fill="var(--art-sage)" /><path d="M0-8q27-3 26-26Q6-30 0-8Z" fill="var(--art-sage-light)" />
          <path d="M0 0l-25-21m25 13 21-21" strokeWidth=".6" />
        </g>)}
      </g>)}
      <path d="M50 244h260m-247 6h234" stroke="var(--line-2)" />
      <path d="M53 235V143a127 127 0 0 1 254 0v92Z" fill={`url(#${id})`} opacity=".13" />
    </svg>
  </div>;
}

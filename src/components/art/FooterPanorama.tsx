import { useId } from "react";
import MotionFrame from "./MotionFrame";

function Frond({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}><g className="panorama-frond" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="1.3">
    <path d="M0 0Q-9-80 16-154" fill="none"/>
    {[0,1,2,3,4,5].map(i => <g key={i} transform={`translate(${i*1.8} ${-i*23})`}><path d="M0 0Q-38-7-34-34-8-32 0 0"/><path d="M0 0Q31-6 32-28 10-25 0 0" fill="var(--art-sage-light)"/><path d="m0 0-25-24M0 0l23-20" fill="none"/></g>)}
  </g></g>;
}
export default function FooterPanorama() {
  const id = useId().replace(/:/g, "");
  return <MotionFrame className="footer-panorama" label="footer animation">
    <svg viewBox="0 0 1200 460" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Build Great Products</title>
      <desc id={`${id}-desc`}>An illustrated product workshop: research notes, a compass, a growing product tree, prototypes, and a launch telescope frame the invitation to build.</desc>
      <defs>
        <pattern id={`${id}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0v8" stroke="var(--art-outline)" strokeOpacity=".14"/></pattern>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="var(--art-sky)"/><stop offset="1" stopColor="var(--art-sky-low)"/></linearGradient>
      </defs>
      <g stroke="var(--art-outline)" strokeWidth="1.4" strokeLinejoin="round">
        <path fill={`url(#${id}-sky)`} d="M260 382V246C260 17 940 17 940 246v136Z"/>
        <path fill="none" d="M250 382V246C250 3 950 3 950 246v136M270 380V246C270 30 930 30 930 246v134"/>
        <circle className="panorama-sun" cx="600" cy="120" r="41" fill="var(--art-sun)"/>
        <circle cx="600" cy="120" r="49" fill="none" stroke="var(--art-ochre)" strokeDasharray="2 8"/>
        <g className="panorama-clouds" fill="var(--art-cloud)"><path d="M333 152q13-20 27-8 8-31 36-21 17-15 34 8 21-3 31 21Z"/><path d="M755 143q15-22 35-11 6-26 30-18 22-10 34 16 21-4 32 13Z"/></g>
        <path fill="var(--art-mountain)" d="m260 352 82-54 86 48 58-18 112 37 115-42 57 24 80-50 90 58v27H260Z"/>
        <path fill="var(--art-water)" d="M260 364q170-17 340 0t340 0v24H260Z"/>
        <g fill="none" stroke="var(--art-ripple)" className="panorama-ripples"><path d="M344 375h140m-78 8h69m255-7h113m-86 8h45"/></g>
        <path fill="var(--art-frame)" d="M25 387h1150v11H25Z"/>
        <path fill={`url(#${id}-hatch)`} d="M25 387h1150v11H25Z"/>
        <g className="panorama-left">
          <path fill="var(--art-blue-mid)" d="M35 345h192v41H35Z"/><path d="M49 354h164m-164 8h164m-164 8h164" stroke="var(--art-page)"/>
          <path fill="var(--art-coral)" d="m52 316 167-12 3 31-167 12Z"/><path fill="var(--art-page)" d="m66 320 146-10 1 18-146 10Z"/>
          <g className="panorama-float"><path className="panorama-notes" fill="var(--art-page)" d="m60 199 135-16 14 114-135 16Z"/><path fill="var(--art-blue-light)" d="m74 214 106-12 5 37-106 12Z"/><path className="panorama-note-ink" fill="none" d="m83 240 18-13 23 3 20-16 28 6m-87 44 96-12m-94 22 65-8m-63 18 80-10"/><path fill="var(--art-ochre)" d="m158 176 19-2 4 35-19 2Z"/></g>
          <circle cx="221" cy="322" r="40" fill="var(--art-ochre-light)"/><circle cx="221" cy="322" r="33" fill="var(--art-deep)"/><g className="panorama-needle"><path fill="var(--art-coral)" d="m221 294 8 28-8 28-8-28Z"/><path fill="var(--art-page)" d="m221 294-8 28h8Z"/></g><circle cx="221" cy="322" r="3" fill="var(--art-page)"/>
          <Frond x={48} y={385}/><Frond x={290} y={389} flip/>
          <path fill="var(--art-coral)" d="M7 353h60l-8 33H16Z"/>
        </g>
        <g className="panorama-right">
          <path fill="var(--art-blue-mid)" d="m958 278 126-18 8 93-126 18Z"/><path fill="var(--art-page)" d="m968 286 106-15 6 72-106 15Z"/>
          <path fill="var(--art-blue-light)" d="m980 302 37-5 3 24-37 5Zm50-7 35-5 3 24-35 5Z"/><path d="m985 340 67-10m-26 39 3 15m-25 2h51" fill="none"/>
          <g className="panorama-float reverse panorama-telescope"><path fill="var(--art-ochre-light)" d="m1008 158 111 47-11 25-111-47Z"/><path fill="var(--art-blue-light)" d="m998 151 25 11-16 37-25-11Z"/><ellipse fill="var(--art-deep)" cx="999" cy="169" rx="9" ry="20" transform="rotate(24 999 169)"/><path d="m1067 206-39 70m39-70 22 52m-22-52-3 65" fill="none" strokeWidth="3"/></g>
          <Frond x={1160} y={386} flip/><Frond x={927} y={388}/>
          <path fill="var(--art-coral)" d="M1130 350h64l-12 36h-43Z"/>
        </g>
        <g className="panorama-stars" fill="var(--art-ochre)">{[[304,105],[905,94],[455,66],[743,60],[1074,108],[153,126]].map(([x,y],i)=><path key={i} d={`m${x} ${y-9} 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z`}/>)}</g>
        <g fill="var(--art-sage-light)"><path d="M566 390q-38-30-30-48 33 2 30 48m0 0q35-34 37-10-8 17-37 10"/><path d="M631 390q-5-40 17-48 15 22-17 48m0 0q35-10 29-27-28-2-29 27"/></g>
      </g>
      <g fill="var(--ink)" textAnchor="middle" fontFamily="var(--serif)">
        <text x="600" y="236" fontSize="78" letterSpacing="-3">Build Great</text>
        <text x="600" y="319" fontSize="94" letterSpacing="-3">Products</text>
      </g>
      <g stroke="var(--art-outline)" fill="none"><path d="M385 420h165m100 0h165"/><path fill="var(--art-ochre)" d="m600 412 8 8-8 8-8-8Z"/><path d="m576 417-4 3 4 3m48-6 4 3-4 3"/></g>
    </svg>
  </MotionFrame>;
}

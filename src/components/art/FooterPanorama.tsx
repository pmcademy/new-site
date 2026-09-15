"use client";

import { useId } from "react";
import MotionFrame from "./MotionFrame";
import styles from "./FooterPanorama.module.css";

function Frond({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}><g className="panorama-frond" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="1.3">
    <path d="M0 0Q-9-80 16-154" fill="none"/>
    {[0,1,2,3,4,5].map(i => <g key={i} transform={`translate(${i*1.8} ${-i*23})`}><path d="M0 0Q-38-7-34-34-8-32 0 0"/><path d="M0 0Q31-6 32-28 10-25 0 0" fill="var(--art-sage-light)"/><path d="m0 0-25-24M0 0l23-20" fill="none"/></g>)}
  </g></g>;
}

function Boat({ id }: { id: string }) {
  return <g className={styles.boatBob} fill="none" strokeLinejoin="round">
  <g opacity="0.9">
    <path d="M98 189C127 185 163 185 192 189C227 194 265 194 298 189C331 184 370 183 403 189" stroke="var(--art-ripple)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M124 201C150 198 177 198 204 201C230 204 259 204 286 201C315 198 343 198 373 201" stroke="var(--art-blue-light)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
  </g>

  <g>
    <path d="M245 48V129" stroke="var(--art-blue-mid)" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="245" cy="48" r="4.5" fill="var(--art-page)" stroke="var(--art-outline)" strokeWidth="2"/>

    <path d="M245 56C281 66 315 89 331 122H245V56Z" fill="var(--art-page)" stroke="var(--art-outline)" strokeWidth="3"/>
    <path d="M250 67C277 75 301 91 316 113" stroke="var(--art-blue-light)" strokeWidth="2" strokeLinecap="round"/>

    <path d="M245 56L273 63L245 70V56Z" fill="var(--art-ochre)" stroke="var(--art-ochre)" strokeWidth="1"/>

    <path d="M106 132H396L374 168C370 175 362 180 354 180H151C142 180 134 176 129 168L106 132Z" fill={`url(#${id}-hull)`} stroke="var(--art-outline)" strokeWidth="4"/>
    <path d="M126 145H381" stroke="var(--art-page)" strokeWidth="3" opacity="0.7"/>

    <rect x="205" y="115" width="66" height="26" rx="5" fill="var(--art-deep)" stroke="var(--art-outline)" strokeWidth="3"/>
    <rect x="214" y="122" width="18" height="11" rx="2" fill="var(--art-blue-light)"/>
    <rect x="243" y="122" width="18" height="11" rx="2" fill="var(--art-blue-light)"/>

    <g transform="translate(0 2)">
      <circle cx="177" cy="112" r="11" fill="var(--art-ochre)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M163 127C166 119 173 116 177 116C181 116 188 119 191 127V142H163V127Z" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M169 142L158 154" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M184 142L197 153" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M170 130L183 135" stroke="var(--art-outline)" strokeWidth="3" strokeLinecap="round"/>

      <circle cx="245" cy="99" r="12" fill="var(--art-page)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M229 115C233 106 240 102 245 102C250 102 258 106 261 115V144H229V115Z" fill="var(--art-blue-mid)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M236 144L229 158" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M253 144L260 158" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M232 121L219 132" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M258 121L271 131" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>

      <circle cx="323" cy="113" r="10.5" fill="var(--art-coral)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M309 127C313 119 319 117 323 117C327 117 333 119 337 127V141H309V127Z" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="3"/>
      <path d="M316 141L307 153" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M330 141L342 152" stroke="var(--art-outline)" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M316 131L328 135" stroke="var(--art-outline)" strokeWidth="3" strokeLinecap="round"/>
    </g>

    <g opacity="0.95">
      <path d="M138 126C140 116 149 111 157 111C157 119 151 128 138 126Z" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="2.5"/>
      <path d="M367 126C365 116 356 111 348 111C348 119 354 128 367 126Z" fill="var(--art-sage)" stroke="var(--art-outline)" strokeWidth="2.5"/>
    </g>
  </g>


  </g>;
}

export default function FooterPanorama() {
  const id = `footer-${useId().replace(/:/g, "")}`;
  return <MotionFrame className={`footer-panorama ${styles.root}`} label="footer animation">
    <svg viewBox="0 0 1200 460" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Build Great Products</title>
      <desc id={`${id}-desc`}>An illustrated product workshop with research notes, a compass, prototypes and a telescope. A sailboat carrying three people crosses the lake. The sun appears by day; the moon and stars appear at night.</desc>
      <defs>
        <pattern id={`${id}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0v8" stroke="var(--art-outline)" strokeOpacity=".14"/></pattern>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="var(--art-sky)"/><stop offset="1" stopColor="var(--art-sky-low)"/></linearGradient>
        <linearGradient id={`${id}-hull`} x1="107" y1="98" x2="396" y2="182" gradientUnits="userSpaceOnUse"><stop stopColor="var(--art-ochre-light)"/><stop offset="1" stopColor="var(--art-coral)"/></linearGradient>
        <radialGradient id={`${id}-moon-halo`}><stop stopColor="var(--art-ochre-light)" stopOpacity=".45"/><stop offset=".6" stopColor="var(--art-ochre-light)" stopOpacity=".12"/><stop offset="1" stopColor="var(--art-ochre-light)" stopOpacity="0"/></radialGradient>
        <clipPath id={`${id}-boat-lane`}><rect x="260" y="320" width="680" height="67"/></clipPath>
      </defs>
      <g stroke="var(--art-outline)" strokeWidth="1.4" strokeLinejoin="round">
        <path fill={`url(#${id}-sky)`} d="M260 382V246C260 17 940 17 940 246v136Z"/>
        <path fill="none" d="M250 382V246C250 3 950 3 950 246v136M270 380V246C270 30 930 30 930 246v134"/>
        <g className={styles.day}>
          <circle className="panorama-sun" cx="600" cy="120" r="41" fill="var(--art-sun)"/>
          <circle cx="600" cy="120" r="49" fill="none" stroke="var(--art-ochre)" strokeDasharray="2 8"/>
        </g>
        <g className={styles.night}>
          <circle className={styles.moonHalo} cx="600" cy="120" r="67" fill={`url(#${id}-moon-halo)`} stroke="none"/>
          <circle cx="600" cy="120" r="41" fill="var(--art-page)" stroke="var(--art-ochre-light)" strokeWidth="1.5"/>
          <g fill="var(--art-ochre-light)" stroke="none" opacity=".5">
            <ellipse cx="583" cy="101" rx="8" ry="10" transform="rotate(24 583 101)"/>
            <circle cx="610" cy="96" r="5"/><circle cx="617" cy="122" r="9"/>
            <ellipse cx="588" cy="137" rx="7" ry="5"/><circle cx="604" cy="146" r="4"/>
            <circle cx="573" cy="121" r="4"/>
          </g>
        </g>
        <g className="panorama-clouds" fill="var(--art-cloud)"><path d="M333 152q13-20 27-8 8-31 36-21 17-15 34 8 21-3 31 21Z"/><path d="M755 143q15-22 35-11 6-26 30-18 22-10 34 16 21-4 32 13Z"/></g>
        <path fill="var(--art-mountain)" d="m260 352 82-54 86 48 58-18 112 37 115-42 57 24 80-50 90 58v27H260Z"/>
        <path fill="var(--art-water)" d="M260 364q170-17 340 0t340 0v24H260Z"/>
        <g fill="none" stroke="var(--art-ripple)" className="panorama-ripples"><path d="M344 375h140m-78 8h69m255-7h113m-86 8h45"/></g>
        <g clipPath={`url(#${id}-boat-lane)`} pointerEvents="none" aria-hidden="true">
          <g className={styles.boatTravel}><g transform="translate(0 317) scale(.34)"><Boat id={id}/></g></g>
        </g>
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
        <g className={styles.night}><g className="panorama-stars" fill="var(--art-ochre)">{[[304,105],[905,94],[455,66],[743,60],[1074,108],[153,126]].map(([x,y],i)=><path key={i} d={`m${x} ${y!-9} 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z`}/>)}</g></g>
        <g fill="var(--art-sage-light)"><path d="M566 390q-38-30-30-48 33 2 30 48m0 0q35-34 37-10-8 17-37 10"/><path d="M631 390q-5-40 17-48 15 22-17 48m0 0q35-10 29-27-28-2-29 27"/></g>
      </g>
      <g fill="var(--ink)" textAnchor="middle" fontFamily="var(--serif)">
        <text x="600" y="236" fontSize="80" letterSpacing="-3">Build Great</text>
        <text x="600" y="319" fontSize="80" letterSpacing="-3">Products</text>
      </g>
      <g stroke="var(--art-outline)" fill="none"><path d="M385 420h165m100 0h165"/><path fill="var(--art-ochre)" d="m600 412 8 8-8 8-8-8Z"/><path d="m576 417-4 3 4 3m48-6 4 3-4 3"/></g>
    </svg>
  </MotionFrame>;
}

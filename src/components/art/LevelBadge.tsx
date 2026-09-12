import { useId } from "react";

const ranks = ["Apprentice", "Practitioner", "Artisan", "Operator", "Architect", "Principal"];
export default function LevelBadge({ n, className = "" }: { n: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const level = Math.max(1, Math.min(6, Number(n) || 1));
  const metal = level === 6 ? "var(--badge-gold)" : level === 5 ? "var(--badge-diamond)" : "var(--art-blue)";
  const core = level === 6 ? "var(--badge-gold-deep)" : "var(--art-deep)";
  return <svg className={`level-badge badge-${level} ${className}`} viewBox="0 0 180 200" role="img" aria-labelledby={`${uid}-title`}>
    <title id={`${uid}-title`}>{`${ranks[level - 1]} level ${n} badge design`}</title>
    <defs>
      <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--art-page)"/><stop offset=".26" stopColor={metal}/><stop offset=".48" stopColor="var(--badge-highlight)"/><stop offset=".66" stopColor={metal}/><stop offset="1" stopColor="var(--art-blue-mid)"/></linearGradient>
      <linearGradient id={`${uid}-shine`}><stop stopColor="var(--badge-highlight)" stopOpacity="0"/><stop offset=".5" stopColor="var(--badge-highlight)" stopOpacity=".8"/><stop offset="1" stopColor="var(--badge-highlight)" stopOpacity="0"/></linearGradient>
      <clipPath id={`${uid}-clip`}><path d="M90 12 153 44 153 119Q150 148 90 176 30 148 27 119V44Z"/></clipPath>
    </defs>
    <g fill="none" stroke="var(--art-outline)" strokeWidth="1.2" strokeLinejoin="round">
      <path fill={core} d="m53 135-15 54 24-9 16 16 14-56M126 135l17 54-25-9-16 16-14-56"/>
      <path stroke={metal} d="m54 155-9 24 18-7 10 11 8-25m45-3 10 24-17-7-12 11-7-25"/>
      <path fill={`url(#${uid}-metal)`} d="M90 12 153 44 153 119Q150 148 90 176 30 148 27 119V44Z"/>
      <path fill={core} d="m90 24 52 27v65q-2 23-52 47-50-24-52-47V51Z"/>
      <path stroke={metal} d="m90 32 44 23v59q0 18-44 40-44-22-44-40V55Z"/>
      {Array.from({length:12},(_,i)=><circle key={i} cx={90 + Math.cos(i*Math.PI/6)*62} cy={94+Math.sin(i*Math.PI/6)*62} r="1.5" fill={metal} stroke="none"/>)}
      <g stroke={metal}>
        <path d="M71 139Q48 115 56 77M109 139q23-24 15-62"/>
        {[0,1,2,3].map(i=><g key={i}><path fill={level === 6 ? "var(--badge-gold)" : "var(--art-sage)"} d={`M${58+i*2} ${90+i*12}q-18-4-12-16 14 0 12 16q12-15 16-5-5 10-16 5`}/><path fill={level === 6 ? "var(--badge-gold)" : "var(--art-sage)"} d={`M${122-i*2} ${90+i*12}q18-4 12-16-14 0-12 16q-12-15-16-5 5 10 16 5`}/></g>)}
      </g>
      {level===1 && <g><path fill="var(--art-page)" d="M67 83q12-7 23 1 11-8 23-1v39q-12-6-23 1-12-7-23-1Z"/><path d="M90 85v37M73 94h10m-10 7h10m-10 7h10m14-14h10m-10 7h10"/><path fill={metal} d="m94 82 9-31 7 7-12 27-8 4Z"/></g>}
      {level===2 && <g><circle cx="90" cy="94" r="25" fill="var(--art-frame)"/><circle cx="90" cy="94" r="20"/><path fill="var(--art-coral)" d="m90 64 9 30-9 31-9-31Z"/><path fill="var(--art-page)" d="m90 64-9 30h9Z"/><circle cx="90" cy="94" r="4" fill={metal}/><path d="M90 53v8m0 68v7m-42-42h10m64 0h10"/></g>}
      {level===3 && <g><path fill="var(--art-page)" d="m65 109 25-48 25 48-8 8-17-34-17 34Z"/><circle cx="90" cy="67" r="5" fill={metal}/><path stroke={metal} strokeWidth="4" d="m69 113 42-35"/><path fill="var(--art-coral)" d="m111 78 8-7-1 10-8 6Z"/><path d="M71 122h38m-32 5h26" stroke={metal}/></g>}
      {level===4 && <g><path fill={metal} d="m90 54 9 7 11-1 3 12 10 6-4 11 4 11-10 7-3 11-11-1-9 7-9-7-11 1-3-11-10-7 4-11-4-11 10-6 3-12 11 1Z"/><circle cx="90" cy="89" r="23" fill="var(--art-deep)"/><path fill="var(--art-page)" d="m78 90 8 8 17-23 6 5-22 28-15-13Z"/></g>}
      {level===5 && <g><path fill="var(--badge-diamond)" d="m65 76 12-15h26l12 15-25 48Z"/><path fill="var(--badge-highlight)" d="m77 61 13 15-25 0Zm26 0-13 15h25Z"/><path fill="var(--art-blue)" d="m65 76 25 48-11-48m36 0-25 48 11-48"/><path d="M65 76h50M77 61l2 15 11 48 11-48 2-15M79 76l11-15 11 15"/><path stroke="var(--badge-highlight)" d="m70 74 7-9"/></g>}
      {level===6 && <g><path fill={metal} d="m62 73 15 12 13-26 13 26 15-12-8 38H70Z"/><path fill="var(--art-page)" d="m77 85 13-26 0 36Z"/><path stroke="var(--art-deep)" d="M70 103h40m-37 6h34"/><path fill="var(--art-coral)" d="m90 87 6 7-6 7-6-7Z"/><circle cx="62" cy="72" r="4" fill={metal}/><circle cx="118" cy="72" r="4" fill={metal}/><circle cx="90" cy="57" r="4" fill={metal}/><path stroke={metal} d="M79 122h22m-16 5h10"/></g>}
      <path fill="var(--art-frame)" d="M67 139h46v18H67Z"/>
      <text x="90" y="152" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="var(--ink)" stroke="none">{n}</text>
    </g>
    <g clipPath={`url(#${uid}-clip)`}><path className="badge-shimmer" d="m-80 0h26l120 200H40Z" fill={`url(#${uid}-shine)`}/></g>
    <g fill="var(--badge-highlight)" className="badge-stars"><path d="m142 40 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/><path d="m36 105 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/></g>
  </svg>;
}

import { cn } from "@/lib/utils";

type P = { className?: string };

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Arrow({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" {...stroke} strokeWidth="1.7" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowLeft({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" {...stroke} strokeWidth="1.7" aria-hidden="true" className={cn("h-3.5 w-3.5", className)}>
      <path d="M14 8H3M7 4 3 8l4 4" />
    </svg>
  );
}

export function Check({ className }: P) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} strokeWidth="2.2" aria-hidden="true" className={cn("h-4 w-4 shrink-0", className)}>
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

export function Lock({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" className={cn("h-3.5 w-3.5", className)}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

export function Sun({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.4 12h2.2M19.4 12h2.2M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
    </svg>
  );
}

export function Moon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" />
    </svg>
  );
}

export function Sparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18.1l-1.8-5.5L4.7 10.8 10.2 9z" />
      <path d="M18.5 3.5v3M20 5h-3" />
    </svg>
  );
}

/* --- provider marks. Simplified, single-colour, so they sit on any button. */

export function GoogleMark({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path fill="#4285F4" d="M23 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.17a5.28 5.28 0 0 1-2.29 3.46v2.88h3.7C21.74 18.8 23 15.8 23 12.27Z" />
      <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1.03 7.6-2.79l-3.71-2.88c-1.03.69-2.35 1.1-3.89 1.1-2.99 0-5.52-2.02-6.43-4.73H1.73v2.97A11.5 11.5 0 0 0 12 23.5Z" />
      <path fill="#FBBC05" d="M5.57 14.2a6.9 6.9 0 0 1 0-4.4V6.83H1.73a11.5 11.5 0 0 0 0 10.34l3.84-2.97Z" />
      <path fill="#EA4335" d="M12 5.07c1.69 0 3.2.58 4.4 1.72l3.28-3.28C17.7 1.63 15.1.5 12 .5A11.5 11.5 0 0 0 1.73 6.83L5.57 9.8C6.48 7.09 9.01 5.07 12 5.07Z" />
    </svg>
  );
}

export function AppleMark({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.2c.9-1.2 1.2-2.4 1.2-2.5 0 0-2.3-.9-2.3-3.5ZM14.2 5.3c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  );
}

export function MailMark({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.7" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 5.5L20 7" />
    </svg>
  );
}

/**
 * The level badge. A hexagon holding the level numeral, outlined in brand navy
 * when earned or open, and in a hairline when still locked.
 */
export function BadgeHex({
  n,
  earned,
  className,
}: {
  n: string;
  earned?: boolean;
  className?: string;
}) {
  const s = earned ? "var(--navy)" : "var(--line-2)";
  const f = earned ? "var(--navy)" : "var(--ink-3)";
  return (
    <svg viewBox="0 0 52 58" fill="none" aria-hidden="true" className={cn("h-14 w-[3.25rem]", className)}>
      <path d="M26 1.4 50.4 15v28L26 56.6 1.6 43V15L26 1.4Z" stroke={s} strokeWidth="1.6" />
      <text x="26" y="34" textAnchor="middle" fontFamily="var(--serif)" fontSize="21" fill={f}>
        {n}
      </text>
    </svg>
  );
}

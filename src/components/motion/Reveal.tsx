"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The only motion on the site: a short fade-and-rise as things enter.
 *
 * CSS owns the hidden state (see globals.css) so there's no flash of unstyled
 * content, and the `.no-js` rule leaves everything visible if JS never runs.
 * One IntersectionObserver, no animation library.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Reveal descendants marked [data-reveal] one after another instead. */
  stagger?: boolean;
  as?: "div" | "section" | "ul" | "li" | "header" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"))
      : [el];
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        targets.forEach((t, i) => {
          t.style.transitionDelay = `${delay + i * 0.06}s`;
          t.classList.add("in");
        });
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(className)}
      {...(stagger ? {} : { "data-reveal": "" })}
    >
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import Screen from "./screens";
import type { CaseStep } from "@/lib/resources/types";
import { cn } from "@/lib/utils";

/**
 * A case study read one beat at a time.
 *
 * The screen is pinned while the writing scrolls past it, and it changes when
 * the next beat comes into view. Callouts land on the screen a moment after it
 * settles, so the eye follows the drawing rather than the text.
 *
 * On a phone there is nothing to pin, so each beat carries its own screen and
 * the whole thing reads top to bottom.
 */
export default function CaseReader({ steps }: { steps: CaseStep[] }) {
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(true);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const i = Number((visible.target as HTMLElement).dataset.i);
        setActive((prev) => (prev === i ? prev : i));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Pins wait for the screen to finish its own fade before they arrive. */
  useEffect(() => {
    setSettled(false);
    const t = setTimeout(() => setSettled(true), 260);
    return () => clearTimeout(t);
  }, [active]);

  const step = steps[active];

  return (
    <div className="relative">
      {/* the rail, one mark per beat */}
      {/* The rail carries the page background, so beats scroll under it
          rather than colliding with it. */}
      <div className="sticky top-[var(--nav-h)] z-20 mb-[var(--s-6)] hidden bg-paper pb-[var(--s-4)] pt-[var(--s-5)] lg:block">
        <ol className="flex list-none gap-[var(--s-2)] p-0">
          {steps.map((s, i) => (
            <li key={s.label} className="flex-1">
              <div
                className={cn(
                  "h-[3px] w-full rounded-full transition-colors duration-300",
                  i <= active ? "bg-blue" : "bg-line"
                )}
              />
              <span
                className={cn(
                  "mt-[var(--s-2)] block text-[11.5px] uppercase tracking-[0.06em] transition-colors duration-300",
                  i === active ? "text-ink" : "text-ink-3"
                )}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-[var(--s-8)] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        {/* --------------------------------------------------------- writing */}
        <div>
          {steps.map((s, i) => (
            <section
              key={s.label}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="border-t border-line py-[var(--sec-y)] first:border-t-0 first:pt-0"
            >
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")} {s.label}
              </span>
              <h2 className="mt-[var(--s-3)] text-[clamp(1.35rem,2.6vw,1.85rem)]">
                {s.title}
              </h2>

              <div className="lesson-body mt-[var(--s-5)]">
                {s.body.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>

              {/* on a phone the screen belongs inside the beat */}
              <div className="mt-[var(--s-6)] lg:hidden">
                <ScreenCard step={s} settled />
              </div>

              {s.principle && (
                <div className="note note-blue mt-[var(--s-6)]">
                  <span className="eyebrow">{s.principle.name}</span>
                  <p>{s.principle.def}</p>
                </div>
              )}

              {s.takeaway && (
                <div className="note note-green mt-[var(--s-4)]">
                  <span className="eyebrow">What to take from it</span>
                  <p>{s.takeaway}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ---------------------------------------------------------- screen */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+var(--s-8))]">
            <ScreenCard key={active} step={step} settled={settled} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCard({ step, settled }: { step: CaseStep; settled: boolean }) {
  const pins = step.pins ?? [];

  return (
    <figure
      className="card relative overflow-hidden"
      style={{ animation: "case-in 0.42s var(--ease) both" }}
    >
      {/* The drawing keeps its own column and the callouts keep theirs, so a
          note never lands on top of the thing it is pointing at. */}
      <div className="grid grid-cols-[1fr_150px] gap-[var(--s-3)] bg-surface-2 p-[var(--s-4)] sm:grid-cols-[1fr_180px]">
        <div className="relative">
          <Screen id={step.screen} className="h-auto w-full" />

          {pins.map((p, i) => (
            <span
              key={i}
              className={cn(
                "absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-[11px] font-semibold text-on-dark ring-4 ring-blue/20 transition-all duration-500",
                settled ? "scale-100 opacity-100" : "scale-75 opacity-0"
              )}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transitionDelay: `${i * 130}ms`,
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <ul className="relative flex list-none flex-col gap-[var(--s-3)] p-0">
          {pins.map((p, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-[var(--s-2)] transition-all duration-500",
                settled ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
              )}
              style={{ transitionDelay: `${i * 130 + 90}ms` }}
            >
              <span className="mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-blue text-[10px] font-semibold text-blue">
                {i + 1}
              </span>
              <span className="text-[12px] leading-snug text-ink-2">
                {p.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="border-t border-line px-[var(--s-4)] py-[var(--s-3)] text-[12.5px] text-ink-3">
        {step.label}. Drawn for this teardown, not a screenshot.
      </figcaption>
    </figure>
  );
}

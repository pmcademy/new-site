"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Check } from "@/components/ui/Icons";
import type { Outline } from "@/lib/course";
import { markDone, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * The lesson index, pinned to the left while you read.
 *
 * Two deliberate rules, both from the brief:
 *  - you can jump BACK to anything you have already reached from here
 *  - you cannot jump FORWARD from here. Next lives at the bottom of the page,
 *    after the build, which is the only place it belongs.
 */
/** The same index, folded away, for narrow screens. */
export function LessonIndexMobile({
  outline,
  currentSlug,
  sections,
}: {
  outline: Outline;
  currentSlug: string;
  sections: { id: string; label: string }[];
}) {
  const { progress } = useStore();
  const done = progress.done.includes(`${outline.slug}/${currentSlug}`);
  const flat = outline.chapters.flatMap((c) => c.lessons);
  const i = flat.findIndex((l) => l.slug === currentSlug);

  return (
    <details className="card mb-[var(--s-6)] lg:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-[var(--s-4)] px-[var(--s-5)] py-[var(--s-4)] text-[14px]">
        <span>
          Lesson {i + 1} of {flat.length}, level {outline.n}
        </span>
        <span className="text-[13px] text-blue">Index</span>
      </summary>
      <div className="border-t border-line px-[var(--s-5)] py-[var(--s-4)]">
        <ul className="flex list-none flex-col gap-[var(--s-2)] p-0">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[14px] text-ink-2">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => markDone(outline.slug, currentSlug, !done)}
          className="btn btn-outline mt-[var(--s-4)] w-full"
        >
          {done ? "Completed" : "Mark as complete"}
        </button>
      </div>
    </details>
  );
}

export default function LessonSidebar({
  outline,
  currentSlug,
  sections,
}: {
  outline: Outline;
  currentSlug: string;
  /** In-page anchors for the current lesson. */
  sections: { id: string; label: string }[];
}) {
  const { progress } = useStore();
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const flat = outline.chapters.flatMap((c) => c.lessons);
  const currentIndex = flat.findIndex((l) => l.slug === currentSlug);
  const isDone = (slug: string) =>
    progress.done.includes(`${outline.slug}/${slug}`);
  const done = isDone(currentSlug);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[calc(var(--nav-h)+var(--s-5))] max-h-[calc(100vh-var(--nav-h)-var(--s-7))] overflow-y-auto pb-[var(--s-6)] pr-[var(--s-3)]">
        <Link
          href={`/levels/${outline.slug}`}
          className="mb-[var(--s-5)] block text-[13px] text-ink-3 transition-colors hover:text-ink"
        >
          Level {outline.n}, {outline.rank}
        </Link>

        {/* where you are in this lesson */}
        <p className="eyebrow mb-[var(--s-3)]">On this page</p>
        <ul className="mb-[var(--s-6)] flex list-none flex-col gap-[var(--s-1)] border-l border-line p-0">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1 pl-[var(--s-4)] text-[13.5px] transition-colors",
                  active === s.id
                    ? "border-blue font-medium text-ink"
                    : "border-transparent text-ink-3 hover:text-ink-2"
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* mark this lesson done */}
        <button
          onClick={() => markDone(outline.slug, currentSlug, !done)}
          className={cn(
            "mb-[var(--s-6)] flex w-full items-center gap-[var(--s-3)] rounded-[10px] border px-[var(--s-4)] py-[var(--s-3)] text-left text-[13.5px] transition-colors",
            done
              ? "border-free/40 bg-free-bg text-free"
              : "border-line text-ink-2 hover:border-line-2"
          )}
          aria-pressed={done}
        >
          <span
            className={cn(
              "grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border",
              done
                ? "border-free bg-free text-on-dark"
                : "border-line-2 text-transparent"
            )}
          >
            <Check className="h-3 w-3" />
          </span>
          {done ? "Completed" : "Mark as complete"}
        </button>

        {/* the whole level, back-navigable only */}
        <p className="eyebrow mb-[var(--s-3)]">In this level</p>
        <nav className="flex flex-col gap-[var(--s-5)]">
          {outline.chapters.map((ch) => (
            <div key={ch.slug}>
              <p className="mb-[var(--s-2)] text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                {ch.n}. {ch.title}
              </p>
              <ul className="flex list-none flex-col gap-[var(--s-1)] p-0">
                {ch.lessons.map((l) => {
                  const idx = flat.findIndex((x) => x.slug === l.slug);
                  const isCurrent = l.slug === currentSlug;
                  const reached = idx <= currentIndex || isDone(l.slug);
                  const cls =
                    "flex items-start gap-[var(--s-2)] rounded-[7px] px-[var(--s-2)] py-1.5 text-[13.5px] leading-snug";

                  if (isCurrent) {
                    return (
                      <li key={l.slug}>
                        <span
                          className={cn(cls, "bg-blue-soft font-medium text-ink")}
                          aria-current="page"
                        >
                          {l.title}
                        </span>
                      </li>
                    );
                  }
                  if (!reached) {
                    /* Ahead of where you are. Not linked from here on purpose:
                       forward motion lives at the bottom of the page. The level
                       page is where you pick a lesson out of order. */
                    return (
                      <li key={l.slug}>
                        <span className={cn(cls, "text-ink-3/70")} title="Later in this level">
                          <span className="mt-[7px] block h-1 w-1 shrink-0 rounded-full bg-current" />
                          {l.title}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`/levels/${outline.slug}/${l.slug}`}
                        className={cn(
                          cls,
                          "text-ink-2 hover:bg-surface-2 hover:text-ink"
                        )}
                      >
                        {isDone(l.slug) && (
                          <Check className="mt-1 h-3 w-3 shrink-0 text-free" />
                        )}
                        {l.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

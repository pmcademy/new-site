"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Arrow, ArrowLeft, Check } from "@/components/ui/Icons";
import { markDone, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Ref = { slug: string; title: string } | null;

/**
 * The only place in a lesson where you can move forward.
 *
 * Back is here too, so both directions live at the end of the page, after the
 * build. Marking the lesson complete happens on the way out, which is the only
 * moment it means anything.
 */
export default function LessonNav({
  levelSlug,
  currentSlug,
  prev,
  next,
  lastInLevel,
}: {
  levelSlug: string;
  currentSlug: string;
  prev: Ref;
  next: Ref;
  /** When true, Next leads to the capstone rather than another lesson. */
  lastInLevel?: boolean;
}) {
  const router = useRouter();
  const { progress } = useStore();
  const done = progress.done.includes(`${levelSlug}/${currentSlug}`);

  function forward(href: string) {
    markDone(levelSlug, currentSlug, true);
    router.push(href);
  }

  const nextHref = next
    ? `/levels/${levelSlug}/${next.slug}`
    : `/levels/${levelSlug}#capstone`;

  return (
    <div className="mt-[var(--block-y)] border-t border-line pt-[var(--block-y)]">
      {!done && (
        <p className="mb-[var(--s-5)] text-[14px] text-ink-3">
          Moving on marks this lesson complete. Finish the build first, it is
          the part that counts.
        </p>
      )}

      <div className="grid gap-[var(--s-4)] sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/levels/${levelSlug}/${prev.slug}`}
            className="card card-p group flex flex-col gap-[var(--s-2)] transition-[border-color] hover:border-line-2"
          >
            <span className="inline-flex items-center gap-2 text-[12.5px] text-ink-3">
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
              Previous lesson
            </span>
            <span className="text-[15.5px] font-medium">{prev.title}</span>
          </Link>
        ) : (
          <Link
            href={`/levels/${levelSlug}`}
            className="card card-p group flex flex-col gap-[var(--s-2)] transition-[border-color] hover:border-line-2"
          >
            <span className="inline-flex items-center gap-2 text-[12.5px] text-ink-3">
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back
            </span>
            <span className="text-[15.5px] font-medium">Level overview</span>
          </Link>
        )}

        <button
          onClick={() => forward(nextHref)}
          className={cn(
            "card card-p group flex flex-col gap-[var(--s-2)] text-left transition-[border-color]",
            "border-navy hover:border-navy-h"
          )}
        >
          <span className="inline-flex items-center gap-2 text-[12.5px] text-blue">
            {done && <Check className="h-3 w-3 text-free" />}
            {lastInLevel || !next ? "Finish the level" : "Next lesson"}
            <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
          <span className="text-[15.5px] font-medium">
            {next ? next.title : "The capstone"}
          </span>
        </button>
      </div>
    </div>
  );
}

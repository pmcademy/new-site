"use client";

import Link from "next/link";

import { Arrow, Check, Lock } from "@/components/ui/Icons";
import type { Outline } from "@/lib/course";
import { levelPercent, levelUnlocked, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * The chapters of a level, with the gate applied.
 *
 * The gate is at the LEVEL, not the lesson: Level 2 stays shut until Level 1
 * is finished. Inside an open level everything is browsable from here, because
 * this page is the index. The one place forward motion is restricted is the
 * sidebar while you are reading, where the only way on is the bottom of the
 * page.
 */
export default function ChapterList({ outline }: { outline: Outline }) {
  const { progress, ready } = useStore();

  const unlocked = ready
    ? levelUnlocked(outline.slug, progress.done)
    : outline.slug === "01";
  const pct = ready ? levelPercent(outline.slug, progress.done) : 0;

  const flat = outline.chapters.flatMap((c) => c.lessons);
  const isDone = (slug: string) =>
    progress.done.includes(`${outline.slug}/${slug}`);
  const firstUndone = flat.findIndex((l) => !isDone(l.slug));
  const nextUp = firstUndone === -1 ? null : flat[firstUndone].slug;

  if (!unlocked) {
    return (
      <div className="card card-p flex flex-col items-start gap-[var(--s-4)]">
        <span className="tag">
          <Lock className="h-3 w-3" /> Locked
        </span>
        <h2 className="text-[clamp(1.2rem,2.2vw,1.5rem)]">
          Finish level {String(Number(outline.n) - 1).padStart(2, "0")} first.
        </h2>
        <p className="max-w-[58ch] text-[15px] text-ink-2">
          This level assumes the work in the one before it. Nothing here is
          hidden behind a payment, only behind the level below.
        </p>
        <Link
          href={`/levels/${String(Number(outline.n) - 1).padStart(2, "0")}`}
          className="btn btn-primary"
        >
          Go to level {String(Number(outline.n) - 1).padStart(2, "0")} <Arrow />
        </Link>
      </div>
    );
  }

  return (
    <div>
      {pct > 0 && (
        <div className="mb-[var(--block-y)] flex items-center gap-[var(--s-4)]">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-free transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[13px] tabular-nums text-ink-3">
            {pct}% complete
          </span>
        </div>
      )}

      <ol className="flex list-none flex-col gap-[var(--s-5)] p-0">
        {outline.chapters.map((ch) => (
          <li key={ch.slug} className="card overflow-hidden">
            <div className="border-b border-line bg-surface-2 px-[var(--card-p)] py-[var(--s-5)]">
              <div className="flex items-baseline gap-[var(--s-4)]">
                <span className="serif-num text-[1.5rem] leading-none text-ink-3">
                  {ch.n}
                </span>
                <div>
                  <h3 className="text-[17.5px]">{ch.title}</h3>
                  <p className="mt-[var(--s-2)] max-w-[62ch] text-[14px] text-ink-2">
                    {ch.summary}
                  </p>
                </div>
              </div>
            </div>

            <ul className="flex list-none flex-col p-0">
              {ch.lessons.map((l) => {
                const complete = isDone(l.slug);
                const isNext = l.slug === nextUp;

                const row =
                  "flex items-center gap-[var(--s-4)] border-b border-line px-[var(--card-p)] py-[var(--s-4)] last:border-b-0";

                const body = (
                  <>
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                        complete
                          ? "border-free bg-free text-on-dark"
                          : isNext
                            ? "border-blue text-blue"
                            : "border-line-2 text-ink-3"
                      )}
                    >
                      {complete ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] text-ink">
                        {l.title}
                      </span>
                      {isNext && (
                        <span className="mt-0.5 block text-[12.5px] text-blue">
                          Next up
                        </span>
                      )}
                    </span>
                    <span className="kind hidden sm:inline">{l.kind}</span>
                    <span className="w-[52px] shrink-0 text-right text-[13px] tabular-nums text-ink-3">
                      {l.minutes}m
                    </span>
                  </>
                );

                return (
                  <li key={l.slug}>
                    <Link
                      href={`/levels/${outline.slug}/${l.slug}`}
                      className={cn(row, "transition-colors hover:bg-surface-2")}
                    >
                      {body}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

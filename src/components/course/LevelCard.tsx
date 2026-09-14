"use client";

import Link from "next/link";
import FieldArt, { type FieldKind } from "@/components/art/FieldArt";

import { Arrow, Lock } from "@/components/ui/Icons";
import { levelHours, levelLessons, type Level } from "@/lib/course";
import { levelPercent, levelUnlocked, useStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function LevelCard({ level: l }: { level: Level }) {
  const { progress, ready } = useStore();
  const unlocked = ready ? levelUnlocked(l.slug, progress.done) : l.slug === "01";
  const pct = ready ? levelPercent(l.slug, progress.done) : 0;
  const lessons = levelLessons(l);

  const inner = (
    <>
      <FieldArt className="level-portrait" kind={({ "01": "seed", "02": "compass", "03": "library", "04": "craft", "05": "telescope", "06": "community" } as Record<string, FieldKind>)[l.slug] ?? "compass"} />
      <div className="flex flex-wrap items-start justify-between gap-[var(--s-4)]">
        <div>
          <span className="eyebrow block">Level {l.n}</span>
          <span className="mt-[var(--s-1)] block font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-[-0.02em] text-ink italic">
            {l.rank}
          </span>
        </div>
        {unlocked ? (
          pct > 0 ? (
            <span className="tag tag-blue shrink-0">{pct}% done</span>
          ) : (
            <span className="tag tag-free shrink-0">Open</span>
          )
        ) : (
          <span className="tag shrink-0">
            <Lock className="h-3 w-3" /> Locked
          </span>
        )}
      </div>

      <h3 className="mt-[var(--s-4)] text-[18px]">{l.title}</h3>
      <p className="mt-[var(--s-2)] text-[14.5px] text-ink-2 mb-4">{l.promise}</p>



      {pct > 0 && (
        <div className="mt-[var(--s-4)] h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-free transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-[var(--s-3)] border-t border-line pt-[var(--s-4)] text-[13px] text-ink-3">
        <span>
          {l.chapters.length} chapters · {lessons.length} lessons · ~
          {levelHours(l)}h
        </span>
        {unlocked ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-blue">
            Open
            <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        ) : (
          <span className="text-ink-3">Finish level {Number(l.n) - 1}</span>
        )}
      </div>
    </>
  );

  const base =
    "card card-p group flex flex-col gap-0 transition-[border-color,transform] duration-200";

  if (!unlocked) {
    return (
      <div className={cn(base, "opacity-60")} aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/levels/${l.slug}`}
     
      className={cn(base, "hover:-translate-y-0.5 hover:border-line-2")}
    >
      {inner}
    </Link>
  );
}

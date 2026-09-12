"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Check } from "@/components/ui/Icons";
import type { BuildStep, Solution } from "@/lib/course";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Scene. Where you are, with the fictional artefacts lying around.            */
/* -------------------------------------------------------------------------- */

export function Scene({
  image,
  alt,
  caption,
  notes,
}: {
  image: string;
  alt: string;
  caption?: string;
  notes?: { from: string; text: string }[];
}) {
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[16/7] bg-surface-2">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 900px) 100vw, 760px"
        />
      </div>
      {caption && (
        <p className="border-t border-line px-[var(--s-5)] py-[var(--s-3)] text-[13px] text-ink-3">
          {caption}
        </p>
      )}
      {notes && notes.length > 0 && (
        <ul className="flex list-none flex-col gap-0 border-t border-line p-0">
          {notes.map((n) => (
            <li
              key={n.from}
              className="border-b border-line px-[var(--s-5)] py-[var(--s-4)] last:border-b-0"
            >
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                {n.from}
              </p>
              <p className="mt-[var(--s-2)] text-[14.5px] text-ink-2">{n.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Build checklist. Progress saves per lesson.                                 */
/* -------------------------------------------------------------------------- */

export function BuildChecklist({ id, steps }: { id: string; steps: BuildStep[] }) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`pmc-build:${id}`);
      if (raw) {
        const saved = JSON.parse(raw) as boolean[];
        if (Array.isArray(saved) && saved.length === steps.length) setDone(saved);
      }
    } catch {
      /* private mode */
    }
  }, [id, steps.length]);

  function toggle(i: number) {
    const next = done.map((d, j) => (j === i ? !d : d));
    setDone(next);
    try {
      localStorage.setItem(`pmc-build:${id}`, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  const completed = done.filter(Boolean).length;

  return (
    <div>
      <div className="mb-[var(--s-4)] flex items-center gap-[var(--s-3)]">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-label="Build progress"
        >
          <div
            className="h-full rounded-full bg-free transition-[width] duration-300"
            style={{ width: `${(completed / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-[13px] tabular-nums text-ink-3">
          {completed}/{steps.length}
        </span>
      </div>

      <ol className="flex list-none flex-col gap-[var(--s-2)] p-0">
        {steps.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              aria-pressed={done[i]}
              className={cn(
                "flex w-full gap-[var(--s-3)] rounded-[10px] border p-[var(--s-4)] text-left transition-colors duration-150",
                done[i]
                  ? "border-free/40 bg-free-bg"
                  : "border-line bg-surface hover:border-line-2"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border transition-colors",
                  done[i]
                    ? "border-free bg-free text-on-dark"
                    : "border-line-2 text-transparent"
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-[15px]",
                    done[i] && "text-ink-2 line-through decoration-ink-3/50"
                  )}
                >
                  {s.do}
                </span>
                {s.hint && (
                  <span className="mt-[var(--s-2)] block text-[13.5px] text-ink-3">
                    {s.hint}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Solution. Hidden by default so it cannot be stumbled into.                  */
/* -------------------------------------------------------------------------- */

export function SolutionReveal({ solution }: { solution: Solution }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="card-quiet card-p flex flex-wrap items-center justify-between gap-[var(--s-4)]">
        <div>
          <p className="text-[15px] font-medium">Stuck, or want to compare?</p>
          <p className="mt-[var(--s-2)] max-w-[52ch] text-[14px] text-ink-2">
            There is a worked solution. Try the build first. Reading it before
            you have attempted anything is the fastest way to learn nothing.
          </p>
        </div>
        <button onClick={() => setOpen(true)} className="btn btn-outline">
          Show the solution
        </button>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-[var(--s-4)] border-b border-line bg-surface-2 px-[var(--s-5)] py-[var(--s-3)]">
        <span className="eyebrow">Worked solution</span>
        <button
          onClick={() => setOpen(false)}
          className="text-[13px] font-medium text-ink-3 transition-colors hover:text-ink"
        >
          Hide
        </button>
      </div>
      <div className="p-[var(--s-5)]">
        <p className="text-[15.5px]">{solution.summary}</p>
        <ol className="mt-[var(--s-5)] flex list-none flex-col gap-[var(--s-3)] p-0">
          {solution.walkthrough.map((w, i) => (
            <li key={i} className="flex gap-[var(--s-3)]">
              <span className="serif-num pt-0.5 text-[18px]">{i + 1}</span>
              <span className="text-[14.5px] text-ink-2">{w}</span>
            </li>
          ))}
        </ol>
        {solution.example && (
          <div className="note note-green mt-[var(--s-5)]">
            <span className="eyebrow">{solution.example.label}</span>
            <p className="text-[14.5px] italic text-ink">
              {solution.example.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Copyable prompt                                                            */
/* -------------------------------------------------------------------------- */

export function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, the text is selectable anyway */
    }
  }

  return (
    <div className="mt-[var(--s-4)] overflow-hidden rounded-[10px] border border-line">
      <div className="flex items-center justify-between gap-[var(--s-3)] border-b border-line bg-surface-2 px-[var(--s-4)] py-[var(--s-2)]">
        <span className="eyebrow">Prompt worth stealing</span>
        <button
          onClick={copy}
          className="text-[13px] font-medium text-blue transition-opacity hover:opacity-70"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mono whitespace-pre-wrap bg-surface px-[var(--s-4)] py-[var(--s-4)] text-[13px] leading-relaxed text-ink-2">
        {text}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Checkpoint                                                                  */
/* -------------------------------------------------------------------------- */

export function Checkpoint({ id, questions }: { id: string; questions: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ""));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`pmc-check:${id}`);
      if (raw) {
        const saved = JSON.parse(raw) as string[];
        if (Array.isArray(saved) && saved.length === questions.length)
          setAnswers(saved);
      }
    } catch {
      /* ignore */
    }
  }, [id, questions.length]);

  function write(i: number, v: string) {
    const next = answers.map((a, j) => (j === i ? v : a));
    setAnswers(next);
    try {
      localStorage.setItem(`pmc-check:${id}`, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  return (
    <ol className="flex list-none flex-col gap-[var(--s-2)] p-0">
      {questions.map((q, i) => (
        <li key={q} className="overflow-hidden rounded-[10px] border border-line bg-surface">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start gap-[var(--s-3)] p-[var(--s-4)] text-left"
            aria-expanded={open === i}
          >
            <span className="mt-0.5 text-[13px] tabular-nums text-ink-3">{i + 1}</span>
            <span className="flex-1 text-[15px]">{q}</span>
            <span
              className={cn(
                "mt-1 text-[12px] transition-colors",
                answers[i].trim() ? "text-free" : "text-ink-3"
              )}
            >
              {answers[i].trim() ? "answered" : "answer"}
            </span>
          </button>
          {open === i && (
            <div className="border-t border-line p-[var(--s-4)]">
              <textarea
                value={answers[i]}
                onChange={(e) => write(i, e.target.value)}
                rows={4}
                placeholder="Write your answer. Nobody marks this, but if you cannot write it, you skipped a step."
                className="w-full resize-y rounded-[8px] border border-line bg-paper p-[var(--s-3)] text-[14.5px] text-ink outline-none placeholder:text-ink-3 focus:border-blue"
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import ChapterList from "@/components/course/ChapterList";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { Arrow, BadgeHex, Check } from "@/components/ui/Icons";
import {
  getLevel,
  levelHours,
  levelLessons,
  levelOutline,
  levels,
} from "@/lib/course";

type Params = { params: Promise<{ level: string }> };

export function generateStaticParams() {
  return levels.map((l) => ({ level: l.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { level: slug } = await params;
  const level = getLevel(slug);
  if (!level) return {};
  return {
    title: `Level ${level.n}, ${level.rank}: ${level.title}`,
    description: level.promise,
  };
}

export default async function LevelPage({ params }: Params) {
  const { level: slug } = await params;
  const level = getLevel(slug);
  if (!level) notFound();

  const lessons = levelLessons(level);
  const outline = levelOutline(level);
  const first = lessons[0];

  return (
    <>
      {/* =============================================================== INTRO */}
      <section className="section-top">
        <div className="shell">
          <Reveal className="grid gap-[var(--block-y)] lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex items-center gap-[var(--s-4)]">
                <BadgeHex n={level.n} earned />
                <div>
                  <span className="eyebrow block">Level {level.n}</span>
                  <span className="mt-[var(--s-1)] block font-serif text-[2.4rem] leading-none tracking-[-0.02em]">
                    {level.rank}
                  </span>
                </div>
              </div>

              <h1 className="mt-[var(--s-6)] text-[clamp(1.8rem,3.6vw,2.6rem)] tracking-[-0.03em]">
                {level.title}
              </h1>
              <p className="mt-[var(--s-4)] max-w-[60ch] text-[clamp(1rem,1.4vw,1.15rem)] text-ink-2">
                {level.promise}
              </p>

              <p className="mt-[var(--s-5)] max-w-[64ch] text-[15px] text-ink-2">
                {level.arc}
              </p>

              <dl className="mt-[var(--s-6)] flex flex-wrap gap-x-[var(--s-7)] gap-y-[var(--s-4)]">
                <Stat v={String(level.chapters.length)} k="chapters" />
                <Stat v={String(lessons.length)} k="lessons" />
                <Stat v={String(lessons.length)} k="things you build" />
                <Stat v={`~${levelHours(level)}h`} k="of material" />
              </dl>

              <div className="mt-[var(--s-6)] flex flex-wrap gap-[var(--s-3)]">
                <Button
                  href={
                    level.slug === "01"
                      ? "/levels/start"
                      : `/levels/${level.slug}/${first.slug}`
                  }
                  size="lg"
                >
                  Start lesson {level.n}.1 <Arrow />
                </Button>
                <Button href="/levels" variant="outline" size="lg">
                  All levels
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[var(--s-5)]">
              {level.scene && (
                <figure className="card overflow-hidden">
                  <div className="relative aspect-[16/10] bg-surface-2">
                    <Image
                      src={level.scene.image}
                      alt={level.scene.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 460px"
                      priority
                    />
                  </div>
                  {level.scene.caption && (
                    <figcaption className="border-t border-line px-[var(--s-5)] py-[var(--s-3)] text-[13px] text-ink-3">
                      {level.scene.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              <div className="card card-p">
                <span className="eyebrow">Who this is for</span>
                <p className="mt-[var(--s-3)] text-[15px] text-ink-2">
                  {level.who}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ OUTCOMES */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">By the end</span>
            <h2>What you will be able to do.</h2>
          </Reveal>
          <Reveal stagger className="grid-cards grid-2">
            {level.outcomes.map((o) => (
              <div
                key={o}
                data-reveal
                className="card card-p flex gap-[var(--s-4)]"
              >
                <Check className="mt-1 shrink-0 text-free" />
                <p className="text-[15.5px]">{o}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================ CHAPTERS */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">The curriculum</span>
            <h2>
              {level.chapters.length} chapters, {lessons.length} lessons.
            </h2>
            <p>
              Lessons open in order. You can go back to anything you have
              already reached, and forward one step at a time.
            </p>
          </Reveal>
          <Reveal>
            <ChapterList outline={outline} />
          </Reveal>
        </div>
      </section>

      {/* ============================================================ CAPSTONE */}
      <section className="section rule" id="capstone">
        <div className="shell">
          <Reveal className="card card-p">
            <span className="tag tag-blue">Capstone</span>
            <h2 className="mt-[var(--s-4)] text-[clamp(1.4rem,2.6vw,1.9rem)]">
              {level.capstone.title}
            </h2>
            <p className="mt-[var(--s-4)] max-w-[64ch] text-ink-2">
              {level.capstone.body}
            </p>

            <div className="mt-[var(--s-6)] grid gap-[var(--block-y)] lg:grid-cols-[1fr_1fr]">
              <div>
                <span className="eyebrow">What you ship</span>
                <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-3)] p-0">
                  {level.capstone.ship.map((s) => (
                    <li
                      key={s}
                      className="flex gap-[var(--s-3)] text-[15px] text-ink-2"
                    >
                      <Check className="mt-1 shrink-0 text-free" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="note note-blue self-start">
                <span className="eyebrow">The badge</span>
                <p>
                  {Number(level.n) < levels.length
                    ? `Finishing every lesson unlocks Level ${String(
                        Number(level.n) + 1
                      ).padStart(2, "0")} straight away, free.`
                    : "This is the last level, so finishing it completes the ladder."}{" "}
                  The {level.badge} badge itself is reviewed by a practising
                  product manager and is part of the one time community fee.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({ v, k }: { v: string; k: string }) {
  return (
    <div>
      <dd className="text-[22px] font-semibold tracking-[-0.02em]">{v}</dd>
      <dt className="text-[12.5px] text-ink-3">{k}</dt>
    </div>
  );
}

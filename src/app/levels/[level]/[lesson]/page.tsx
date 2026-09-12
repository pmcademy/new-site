import LessonIllustration from "@/components/course/LessonIllustration";
import { lessonVisuals } from "@/lib/course/lesson-visuals";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Diagram from "@/components/course/diagrams";
import LessonNav from "@/components/course/LessonNav";
import LessonSidebar, {
  LessonIndexMobile,
} from "@/components/course/LessonSidebar";
import {
  BuildChecklist,
  Checkpoint,
  CopyPrompt,
  Scene,
  SolutionReveal,
} from "@/components/course/LessonParts";
import Reveal from "@/components/motion/Reveal";
import { Arrow, Check } from "@/components/ui/Icons";
import {
  allLessonParams,
  getLesson,
  levelOutline,
  lessonOrder,
} from "@/lib/course";

type Params = { params: Promise<{ level: string; lesson: string }> };

export function generateStaticParams() {
  return allLessonParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { level, lesson } = await params;
  const found = getLesson(level, lesson);
  if (!found) return {};
  return {
    title: `${found.lesson.title} · Level ${found.level.n}`,
    description: found.lesson.hook.slice(0, 155),
  };
}

export default async function LessonPage({ params }: Params) {
  const { level: levelSlug, lesson: lessonSlug } = await params;
  const found = getLesson(levelSlug, lessonSlug);
  if (!found) notFound();

  const { level, chapter, lesson } = found;
  const outline = levelOutline(level);
  const order = lessonOrder(level.slug);
  const i = order.findIndex((x) => x.lesson.slug === lesson.slug);
  const prev = i > 0 ? order[i - 1].lesson : null;
  const next = i < order.length - 1 ? order[i + 1].lesson : null;

  /* The in-page index. Built from what this lesson actually has, so the
     sidebar never points at a section that was not rendered. */
  const sections = [
    { id: "situation", label: "The situation" },
    { id: "concept", label: lesson.explain.title },
    ...(lesson.case ? [{ id: "case", label: `Case: ${lesson.case.brand}` }] : []),
    { id: "ai", label: "Doing it with AI" },
    { id: "build", label: "What you build" },
    ...(lesson.solution ? [{ id: "solution", label: "Worked solution" }] : []),
    { id: "check", label: "Checkpoint" },
  ];

  const id = `${level.slug}/${lesson.slug}`;
  const visual = lessonVisuals[id];

  return (
    <div className="shell pb-[var(--sec-y)] pt-[var(--block-y)]">
      <div className="grid gap-[var(--s-8)] lg:grid-cols-[248px_minmax(0,1fr)]">
        <LessonSidebar
          outline={outline}
          currentSlug={lesson.slug}
          sections={sections}
        />

        <article className="min-w-0 max-w-[760px]">
          {/* ------------------------------------------------------ heading */}
          <nav className="mb-[var(--s-5)] flex flex-wrap items-center gap-x-[var(--s-3)] gap-y-1 text-[13px] text-ink-3">
            <Link href="/levels" className="transition-colors hover:text-ink">
              Levels
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/levels/${level.slug}`}
              className="transition-colors hover:text-ink"
            >
              {level.n} {level.rank}
            </Link>
            <span aria-hidden="true">/</span>
            <span>
              {chapter.n}. {chapter.title}
            </span>
          </nav>

          <div className="mb-[var(--s-4)] flex flex-wrap items-center gap-[var(--s-3)]">
            <span className="kind">{lesson.kind}</span>
            <span className="text-[13px] text-ink-3">
              {lesson.minutes} minutes
            </span>
            <span className="text-[13px] text-ink-3">
              Lesson {i + 1} of {order.length}
            </span>
          </div>

          <h1 className="text-[clamp(1.7rem,3.4vw,2.4rem)] tracking-[-0.03em]">
            {lesson.title}
          </h1>

          <div className="mt-[var(--s-6)]">
            <LessonIndexMobile
              outline={outline}
              currentSlug={lesson.slug}
              sections={sections}
            />
          </div>

          {/* ---------------------------------------------------- situation */}
          <section id="situation" className="mt-[var(--s-6)] scroll-mt-[var(--s-9)]">
            <p className="lesson-hook">{lesson.hook}</p>
            {lesson.scene && (
              <div className="mt-[var(--s-6)]">
                <Scene {...lesson.scene} />
              </div>
            )}
          </section>

          {/* ------------------------------------------------------ concept */}
          {/* The concept always comes before the task. Show it, then ask. */}
          <section id="concept" className="lesson-sec scroll-mt-[var(--s-9)]">
            <h2>{lesson.explain.title}</h2>
            {visual && <LessonIllustration visual={visual} />}
            <div className="lesson-body">
              {lesson.explain.body.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>

            {lesson.explain.diagram && !visual && (
              <Diagram
                id={lesson.explain.diagram}
                caption={lesson.explain.caption}
              />
            )}

            {lesson.explain.points && lesson.explain.points.length > 0 && (
              <dl className="mt-[var(--s-6)] grid gap-[var(--s-4)] sm:grid-cols-2">
                {lesson.explain.points.map((p) => (
                  <div
                    key={p.term}
                    className="rounded-[10px] border border-line bg-surface p-[var(--s-4)]"
                  >
                    <dt className="text-[14.5px] font-semibold">{p.term}</dt>
                    <dd className="mt-[var(--s-2)] text-[14px] text-ink-2">
                      {p.def}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {/* --------------------------------------------------------- case */}
          {lesson.case && (
            <section id="case" className="lesson-sec scroll-mt-[var(--s-9)]">
              <h2>How {lesson.case.brand} handled it</h2>

              <Reveal className="card overflow-hidden">
                <div className="flex flex-wrap items-center gap-[var(--s-4)] border-b border-line bg-surface-2 px-[var(--card-p)] py-[var(--s-4)]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[8px] border border-line bg-surface">
                    {lesson.case.logo ? (
                      <Image
                        src={lesson.case.logo}
                        alt=""
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                      />
                    ) : (
                      <span className="text-[13px] font-semibold text-ink-3">
                        {lesson.case.brand.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </span>
                  <div>
                    <p className="text-[15.5px] font-semibold">
                      {lesson.case.brand}
                    </p>
                    {lesson.case.year && (
                      <p className="text-[13px] text-ink-3">
                        {lesson.case.year}
                      </p>
                    )}
                  </div>
                  <span className="ml-auto text-[12px] text-ink-3">
                    Public commentary. No affiliation.
                  </span>
                </div>

                <div className="flex flex-col gap-[var(--s-5)] p-[var(--card-p)]">
                  <CaseRow label="The situation" body={lesson.case.situation} />
                  <CaseRow label="What they did" body={lesson.case.what} />
                  <div className="note note-blue">
                    <span className="eyebrow">Why it matters to you</span>
                    <p>{lesson.case.lesson}</p>
                  </div>
                  {lesson.case.sources && lesson.case.sources.length > 0 && (
                    <ul className="flex list-none flex-wrap gap-[var(--s-4)] p-0">
                      {lesson.case.sources.map((s) => (
                        <li key={s.url}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13.5px] text-blue underline underline-offset-4"
                          >
                            {s.label}
                            <Arrow className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </section>
          )}

          {/* ----------------------------------------------------------- ai */}
          <section id="ai" className="lesson-sec scroll-mt-[var(--s-9)]">
            <h2>Doing it with AI, and where it breaks</h2>
            <div className="grid gap-[var(--s-4)] sm:grid-cols-2">
              <div className="note note-blue">
                <span className="eyebrow">The move</span>
                <p>{lesson.ai.move}</p>
              </div>
              <div className="note note-amber">
                <span className="eyebrow">The trap</span>
                <p>{lesson.ai.trap}</p>
              </div>
            </div>
            {lesson.ai.prompt && <CopyPrompt text={lesson.ai.prompt} />}
          </section>

          {/* -------------------------------------------------------- build */}
          <section id="build" className="lesson-sec scroll-mt-[var(--s-9)]">
            <h2>Build it</h2>
            <div className="note note-green mb-[var(--s-5)]">
              <span className="eyebrow">The artefact</span>
              <p>{lesson.build.artefact}</p>
            </div>

            {lesson.build.tools && lesson.build.tools.length > 0 && (
              <p className="mb-[var(--s-5)] flex flex-wrap gap-[var(--s-2)]">
                {lesson.build.tools.map((t) => (
                  <span key={t} className="kind">
                    {t}
                  </span>
                ))}
              </p>
            )}

            <BuildChecklist id={id} steps={lesson.build.steps} />
          </section>

          {/* ----------------------------------------------------- solution */}
          {lesson.solution && (
            <section id="solution" className="lesson-sec scroll-mt-[var(--s-9)]">
              <h2>The worked solution</h2>
              <SolutionReveal solution={lesson.solution} />
            </section>
          )}

          {/* -------------------------------------------------------- check */}
          <section id="check" className="lesson-sec scroll-mt-[var(--s-9)]">
            <h2>Checkpoint</h2>
            <p className="mb-[var(--s-5)] max-w-[62ch] text-[15px] text-ink-2">
              If you did the build, these take two minutes. If you cannot answer
              one of them, that is the part to go back to.
            </p>
            <Checkpoint id={id} questions={lesson.check} />

            {lesson.references && lesson.references.length > 0 && (
              <div className="mt-[var(--s-6)]">
                <span className="eyebrow">Go deeper</span>
                <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-2)] p-0">
                  {lesson.references.map((r) => (
                    <li key={r.url} className="flex gap-[var(--s-3)]">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-3" />
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[14.5px] text-blue underline underline-offset-4"
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ---------------------------------------------- back and next */}
          <LessonNav
            levelSlug={level.slug}
            currentSlug={lesson.slug}
            prev={prev ? { slug: prev.slug, title: prev.title } : null}
            next={next ? { slug: next.slug, title: next.title } : null}
            lastInLevel={!next}
          />
        </article>
      </div>
    </div>
  );
}

function CaseRow({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <span className="eyebrow">{label}</span>
      <p className="mt-[var(--s-2)] max-w-[64ch] text-[15px] text-ink-2">
        {body}
      </p>
    </div>
  );
}

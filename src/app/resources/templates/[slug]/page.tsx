import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CopyBlock from "@/components/resources/CopyBlock";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { Arrow, Check } from "@/components/ui/Icons";
import { getTemplate, templates } from "@/lib/resources";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  return { title: t.title, description: t.blurb };
}

export default async function TemplatePage({ params }: Params) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  return (
    <section className="section-top">
      <div className="shell">
        <Reveal>
          <nav className="mb-[var(--s-5)] flex items-center gap-[var(--s-3)] text-[13px] text-ink-3">
            <Link href="/resources" className="transition-colors hover:text-ink">
              Resources
            </Link>
            <span aria-hidden="true">/</span>
            <span>Templates</span>
          </nav>

          <div className="head">
            <span className="eyebrow text-blue">Template</span>
            <h1>{t.title}</h1>
            <p>{t.blurb}</p>
          </div>
        </Reveal>

        <div className="grid gap-[var(--s-8)] lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          {/* ------------------------------------------------------ sections */}
          <div>
            <Reveal className="note note-blue mb-[var(--block-y)]">
              <span className="eyebrow">When you reach for it</span>
              <p>{t.when}</p>
            </Reveal>

            <ol className="flex list-none flex-col gap-[var(--s-5)] p-0">
              {t.sections.map((s, i) => (
                <li key={s.heading} className="card overflow-hidden">
                  <div className="border-b border-line bg-surface-2 px-[var(--card-p)] py-[var(--s-4)]">
                    <div className="flex items-baseline gap-[var(--s-4)]">
                      <span className="serif-num text-[1.4rem] leading-none text-ink-3">
                        {i + 1}
                      </span>
                      <div>
                        <h2 className="text-[17px]">{s.heading}</h2>
                        <p className="mt-[var(--s-2)] text-[14px] text-ink-2">
                          {s.purpose}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[var(--s-5)] p-[var(--card-p)]">
                    <div>
                      <span className="eyebrow">What it asks</span>
                      <p className="mt-[var(--s-2)] text-[15px] text-ink">
                        {s.ask}
                      </p>
                    </div>

                    <div className="note note-green">
                      <span className="eyebrow">Filled in</span>
                      <p className="italic">{s.example}</p>
                    </div>

                    {s.trap && (
                      <div className="note note-amber">
                        <span className="eyebrow">How it goes wrong</span>
                        <p>{s.trap}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <Reveal className="mt-[var(--block-y)]">
              <h2 className="mb-[var(--s-5)] text-[clamp(1.2rem,2.2vw,1.5rem)]">
                Take the whole thing
              </h2>
              <CopyBlock label="Paste into your doc" text={t.markdown} tall />
            </Reveal>
          </div>

          {/* --------------------------------------------------------- aside */}
          <aside className="flex flex-col gap-[var(--s-5)] lg:sticky lg:top-[calc(var(--nav-h)+var(--s-6))] lg:self-start">
            <div className="card card-p">
              <span className="eyebrow">Rules for using it</span>
              <ul className="mt-[var(--s-4)] flex list-none flex-col gap-[var(--s-3)] p-0">
                {t.rules.map((r) => (
                  <li key={r} className="flex gap-[var(--s-3)] text-[14px] text-ink-2">
                    <Check className="mt-1 shrink-0 text-free" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {t.ai && (
              <div className="card card-p">
                <span className="eyebrow">Draft it with a model</span>
                <p className="mt-[var(--s-3)] text-[14px] text-ink-2">
                  Useful for the first pass. The judgement is still yours.
                </p>
                <div className="mt-[var(--s-4)]">
                  <CopyBlock label="Prompt" text={t.ai.prompt} />
                </div>
                <div className="note note-amber mt-[var(--s-4)]">
                  <span className="eyebrow">What to catch</span>
                  <p>{t.ai.trap}</p>
                </div>
              </div>
            )}

            {t.level && (
              <div className="card card-p">
                <span className="eyebrow">Taught in</span>
                <p className="mt-[var(--s-3)] text-[15px]">
                  Level {t.level}, where you build one of these against a real
                  brief.
                </p>
                <div className="mt-[var(--s-4)]">
                  <Button href={`/levels/${t.level}`} variant="outline">
                    Open the level <Arrow />
                  </Button>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* --------------------------------------------------------- others */}
        <Reveal className="mt-[var(--sec-y)] border-t border-line pt-[var(--block-y)]">
          <span className="eyebrow">More templates</span>
          <ul className="mt-[var(--s-5)] grid list-none gap-[var(--s-3)] p-0 md:grid-cols-3">
            {templates
              .filter((x) => x.slug !== t.slug)
              .slice(0, 3)
              .map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/resources/templates/${x.slug}`}
                    className="card card-p block h-full transition-[border-color] hover:border-line-2"
                  >
                    <h3 className="text-[16px]">{x.title}</h3>
                    <p className="mt-[var(--s-2)] text-[14px] text-ink-2">
                      {x.blurb}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CopyBlock from "@/components/resources/CopyBlock";
import Reveal from "@/components/motion/Reveal";
import { getPack, promptPacks } from "@/lib/resources";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return promptPacks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPack(slug);
  if (!p) return {};
  return { title: `${p.title} prompts`, description: p.blurb };
}

export default async function PromptPackPage({ params }: Params) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) notFound();

  return (
    <section className="section-top">
      <div className="shell">
        <Reveal>
          <nav className="mb-[var(--s-5)] flex items-center gap-[var(--s-3)] text-[13px] text-ink-3">
            <Link href="/resources" className="transition-colors hover:text-ink">
              Resources
            </Link>
            <span aria-hidden="true">/</span>
            <span>Prompt packs</span>
          </nav>

          <div className="head">
            <span className="eyebrow text-blue">{pack.stage}</span>
            <h1>{pack.title}</h1>
            <p>{pack.blurb}</p>
          </div>
        </Reveal>

        <div className="grid gap-[var(--s-8)] lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
          <div>
            <Reveal className="note note-blue mb-[var(--block-y)]">
              <span className="eyebrow">The stage</span>
              <p>{pack.context}</p>
            </Reveal>

            <ol className="flex list-none flex-col gap-[var(--s-6)] p-0">
              {pack.prompts.map((p, i) => (
                <li
                  key={p.title}
                  id={`p${i + 1}`}
                  className="scroll-mt-[var(--s-9)] border-t border-line pt-[var(--block-y)] first:border-t-0 first:pt-0"
                >
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-[var(--s-2)] text-[clamp(1.15rem,2.2vw,1.4rem)]">
                    {p.title}
                  </h2>
                  <p className="mt-[var(--s-3)] max-w-[62ch] text-[15px] text-ink-2">
                    {p.when}
                  </p>

                  <div className="mt-[var(--s-5)]">
                    <CopyBlock label="The prompt" text={p.text} tall />
                  </div>

                  <div className="note note-amber mt-[var(--s-4)]">
                    <span className="eyebrow">Where it lets you down</span>
                    <p>{p.trap}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------------------------------------------------------- rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+var(--s-6))] flex flex-col gap-[var(--s-5)]">
              <div>
                <p className="eyebrow mb-[var(--s-3)]">In this pack</p>
                <ul className="flex list-none flex-col gap-[var(--s-1)] border-l border-line p-0">
                  {pack.prompts.map((p, i) => (
                    <li key={p.title}>
                      <a
                        href={`#p${i + 1}`}
                        className="-ml-px block border-l-2 border-transparent py-1 pl-[var(--s-4)] text-[13.5px] text-ink-3 transition-colors hover:border-blue hover:text-ink"
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-[var(--s-3)]">Other stages</p>
                <ul className="flex list-none flex-col gap-[var(--s-2)] p-0">
                  {promptPacks
                    .filter((x) => x.slug !== pack.slug)
                    .map((x) => (
                      <li key={x.slug}>
                        <Link
                          href={`/resources/prompts/${x.slug}`}
                          className="text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                        >
                          {x.stage}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

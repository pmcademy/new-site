import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import CaseReader from "@/components/resources/CaseReader";
import ReadTracker from "@/components/workspace/ReadTracker";
import Reveal from "@/components/motion/Reveal";
import { Arrow, Check } from "@/components/ui/Icons";
import { cases, getCase } from "@/lib/resources";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.brand}, ${c.title}`, description: c.blurb };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  if (slug === "duolingo-streak") permanentRedirect("/case-studies/duolingo-streak");
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <>
      {/* =============================================================== TOP */}
      <section className="section-top">
        <div className="shell">
          <Reveal>
            <nav className="mb-[var(--s-5)] flex items-center gap-[var(--s-3)] text-[13px] text-ink-3">
              <Link href="/resources" className="transition-colors hover:text-ink">
                Resources
              </Link>
              <span aria-hidden="true">/</span>
              <span>Teardowns</span>
            </nav>

            <div className="flex flex-wrap items-center gap-[var(--s-4)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-line bg-surface">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt=""
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                ) : (
                  <span className="text-[13px] font-semibold text-ink-3">
                    {c.brand.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <div>
                <p className="text-[16px] font-semibold">{c.brand}</p>
                <p className="text-[13px] text-ink-3">
                  {c.sector} · {c.year} · {c.readIn} min
                </p>
              </div>
            </div>

            <h1 className="mt-[var(--s-6)] max-w-[20ch] text-[clamp(2rem,5vw,3.2rem)] tracking-[-0.035em]">
              {c.title}
            </h1>
            <p className="mt-[var(--s-4)] max-w-[58ch] text-[clamp(1rem,1.4vw,1.15rem)] text-ink-2">
              {c.blurb}
            </p>
          </Reveal>

          <Reveal className="mt-[var(--block-y)] grid gap-[var(--s-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <div className="lesson-body">
              {c.setup.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="note self-start">
              <span className="eyebrow">How to read this</span>
              <p>
                Scroll. The screen on the right changes as each beat arrives,
                and the callouts land on the part being discussed. Every beat
                names the principle underneath it, which is the bit that
                transfers to your product.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ READER */}
      <section className="section rule">
        <div className="shell">
          <CaseReader steps={c.steps} />
        </div>
      </section>

      {/* =========================================================== LESSONS */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Steal this, not that</span>
            <h2>What transfers to your product.</h2>
          </Reveal>

          <Reveal stagger className="flex list-none flex-col gap-[var(--s-4)] p-0">
            {c.lessons.map((l) => (
              <div
                key={l.do}
                data-reveal
                className="card card-p grid gap-[var(--s-5)] md:grid-cols-2"
              >
                <div className="flex gap-[var(--s-3)]">
                  <Check className="mt-1 shrink-0 text-free" />
                  <p className="text-[15px]">{l.do}</p>
                </div>
                <div className="flex gap-[var(--s-3)] border-t border-line pt-[var(--s-4)] md:border-l md:border-t-0 md:pl-[var(--s-5)] md:pt-0">
                  <span
                    aria-hidden="true"
                    className="mt-1 block h-4 w-4 shrink-0 rounded-full border-2 border-amber"
                  />
                  <p className="text-[15px] text-ink-2">{l.dont}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-[var(--block-y)]">
            <span className="eyebrow">Sources</span>
            <ul className="mt-[var(--s-3)] flex list-none flex-col gap-[var(--s-2)] p-0">
              {c.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] text-blue underline underline-offset-4"
                  >
                    {s.label}
                    <Arrow className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-[var(--s-5)] max-w-[62ch] text-[13px] text-ink-3">
              Public commentary, written without involvement from{" "}
              {c.brand}. The screens are drawings made for this teardown, not
              screenshots, and nothing internal is claimed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The book only appears once the teardown has actually been read. */}
      <section className="section-sm">
        <div className="shell">
          <ReadTracker
            id={c.slug}
            title={`${c.brand}: ${c.title}`}
            href={`/resources/product-case-study/${c.slug}`}
          />
        </div>
      </section>

      {/* ============================================================= OTHER */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Next teardown</span>
            <ul className="mt-[var(--s-5)] grid list-none gap-[var(--s-4)] p-0 md:grid-cols-2">
              {cases
                .filter((x) => x.slug !== c.slug)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/resources/product-case-study/${x.slug}`}
                      className="card card-p group block h-full transition-[border-color] hover:border-line-2"
                    >
                      <span className="eyebrow">{x.brand}</span>
                      <h3 className="mt-[var(--s-2)] text-[17px]">{x.title}</h3>
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
    </>
  );
}

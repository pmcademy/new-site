import FieldArt from "@/components/art/FieldArt";
import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Icons";
import {
  cases,
  promptPacks,
  resourceCounts,
  templates,
} from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Free PM templates, prompt packs for every stage of the job, and scroll-driven product teardowns. No email wall, no drip sequence.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* =============================================================== TOP */}
      <section className="section-top">
        <div className="shell">
          <div className="atelier-heading">
          <Reveal className="head">
            <span className="eyebrow">Resource library</span>
            <h1>Free, ungated, and actually usable.</h1>
            <p>
              {resourceCounts.templates} templates you fill in,{" "}
              {resourceCounts.prompts} prompts across{" "}
              {resourceCounts.packs} stages of the job, and{" "}
              {resourceCounts.cases} teardowns you read one screen at a time.
              No form, no email to download, free whether or not you ever pay
              for anything.
            </p>
          </Reveal>
            <FieldArt kind="library" />
          </div>

          <Reveal stagger className="grid-cards grid-3">
            <Jump
              href="#templates"
              eyebrow="Templates"
              title="Documents, filled in"
              body="Each one has a worked example written for a real company, and the trap that ruins that section."
              n={resourceCounts.templates}
            />
            <Jump
              href="#prompts"
              eyebrow="Prompt packs"
              title="One per stage of the job"
              body="Long, structured prompts worth keeping, each with the specific way the model lets you down."
              n={resourceCounts.prompts}
            />
            <Jump
              href="#cases"
              eyebrow="Teardowns"
              title="Case studies you scroll"
              body="One beat at a time, with the screen pinned beside the writing and the principle named."
              n={resourceCounts.cases}
            />
          </Reveal>
        </div>
      </section>

      {/* ========================================================= TEMPLATES */}
      <section className="section rule" id="templates">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Templates</span>
            <h2>Blank documents are the easy part.</h2>
            <p>
              Anyone can publish a PRD with four headings in it. What is missing
              from every template on the internet is what good looks like in
              each section, so every one of these carries a filled example and
              the mistake that section attracts.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-2">
            {templates.map((t) => (
              <Link
                key={t.slug}
                href={`/resources/templates/${t.slug}`}
                data-reveal
                className="card card-p group flex flex-col gap-[var(--s-3)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-2"
              >
                <div className="flex items-center justify-between gap-[var(--s-3)]">
                  <span className="eyebrow text-blue">Template</span>
                  {t.featured && <span className="tag tag-free">Most used</span>}
                </div>
                <h3 className="text-[18px]">{t.title}</h3>
                <p className="text-[14.5px] text-ink-2">{t.blurb}</p>
                <div className="mt-auto flex items-center justify-between gap-[var(--s-3)] border-t border-line pt-[var(--s-4)] text-[13px] text-ink-3">
                  <span>
                    {t.sections.length} sections · about {t.useIn} min to fill
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-blue">
                    Open
                    <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* =========================================================== PROMPTS */}
      <section className="section rule" id="prompts">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Prompt packs</span>
            <h2>Prompts for each stage of the job.</h2>
            <p>
              Not one line tricks. These are the long, structured prompts that
              are worth saving, and every one names the specific way the model
              fails at that task, because that is the part you have to catch.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-3">
            {promptPacks.map((p) => (
              <Link
                key={p.slug}
                href={`/resources/prompts/${p.slug}`}
                data-reveal
                className="card card-p group flex flex-col gap-[var(--s-3)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-2"
              >
                <span className="eyebrow text-blue">{p.stage}</span>
                <h3 className="text-[17px]">{p.title}</h3>
                <p className="text-[14.5px] text-ink-2">{p.blurb}</p>
                <div className="mt-auto flex items-center justify-between gap-[var(--s-3)] border-t border-line pt-[var(--s-4)] text-[13px] text-ink-3">
                  <span>{p.prompts.length} prompts</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-blue">
                    Open
                    <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================= CASES */}
      <section className="section rule" id="cases">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Teardowns</span>
            <h2>Case studies you read one screen at a time.</h2>
            <p>
              Public commentary on products you already use. The screen stays
              pinned while the writing moves, the callouts land on the part
              being discussed, and each beat names the principle underneath it.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-3">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/resources/product-case-study/${c.slug}`}
                data-reveal
                className="card group flex flex-col overflow-hidden transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-2"
              >
                <div className="flex items-center justify-between gap-[var(--s-3)] border-b border-line bg-surface-2 px-[var(--card-p)] py-[var(--s-4)]">
                  <span className="text-[15px] font-semibold">{c.brand}</span>
                  <span className="text-[12.5px] text-ink-3">{c.year}</span>
                </div>
                <div className="flex flex-1 flex-col gap-[var(--s-3)] p-[var(--card-p)]">
                  <h3 className="text-[17px]">{c.title}</h3>
                  <p className="text-[14.5px] text-ink-2">{c.blurb}</p>
                  <div className="mt-auto flex items-center justify-between gap-[var(--s-3)] border-t border-line pt-[var(--s-4)] text-[13px] text-ink-3">
                    <span>
                      {c.sector} · {c.readIn} min
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-blue">
                      Read
                      <Arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>

          <Reveal className="mt-[var(--block-y)] note">
            <span className="eyebrow">On the companies here</span>
            <p>
              These are public teardowns of public behaviour, written without
              any involvement from the companies named. The screens are
              drawings rather than screenshots, and nothing internal is
              claimed.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Jump({
  href,
  eyebrow,
  title,
  body,
  n,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  n: number;
}) {
  return (
    <a
      href={href}
      data-reveal
      className="card card-p group flex flex-col gap-[var(--s-3)] transition-[border-color] hover:border-line-2"
    >
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">{eyebrow}</span>
        <span className="serif-num text-[1.8rem] leading-none text-ink-3">
          {n}
        </span>
      </div>
      <h3 className="text-[17px]">{title}</h3>
      <p className="text-[14.5px] text-ink-2">{body}</p>
    </a>
  );
}

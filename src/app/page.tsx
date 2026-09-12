import Image from "next/image";
import Link from "next/link";

import HeroArt from "@/components/hero/HeroArt";
import Reveal from "@/components/motion/Reveal";
import LevelCard from "@/components/course/LevelCard";
import Diagram from "@/components/course/diagrams";
import Button from "@/components/ui/Button";
import { Arrow, Check, Sparkle } from "@/components/ui/Icons";
import {
  faq,
  levels,
  quotes,
  totalChapters,
  totalHours,
  totalLessons,
} from "@/lib/course";
import AtelierArt from "@/components/hero/AtelierArt";
import ProductAtelier from "@/components/hero/ProductAtelier";

export default function Home() {
  const first = levels[0].chapters[0].lessons[0];

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="pb-[var(--block-y)] pt-[var(--s-7)]">
        <div className=" flex flex-col items-center text-center">
          <Reveal className="w-full ">
            <ProductAtelier/>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col items-center">
            <h1 className="mt-[var(--s-6)] text-[clamp(1.9rem,4.2vw,3.1rem)] tracking-[-0.035em]">
             Learn Product Management
            </h1>
            <p className="mt-[var(--s-4)] text-[clamp(1rem,1.3vw,1.15rem)] text-ink-2">
              Six levels, free forever.
            </p>

            <div className="mt-[var(--s-6)] flex flex-wrap justify-center gap-[var(--s-3)]">
              <Button href="/level-0" size="lg">
                <Sparkle /> Start Level 0
              </Button>
              <Button href="/levels" variant="outline" size="lg">
                See the six levels
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============================================================== LEVEL 0 */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="card card-p grid items-center gap-[var(--s-6)] lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="tag tag-blue">
                <Sparkle className="h-3.5 w-3.5" /> Level 0, before anything else
              </span>
              <h2 className="mt-[var(--s-4)] text-[clamp(1.4rem,2.6vw,2rem)]">
                Have an idea? Ship it this weekend.
              </h2>
              <p className="mt-[var(--s-4)] max-w-[54ch] text-ink-2">
                Type your idea in one sentence. We turn it into a proper brief
                that makes Claude research the market first, then build you a
                single page site as an MVP. Then we walk you through putting it
                on a real domain.
              </p>
              <p className="mt-[var(--s-3)] text-[14px] text-ink-3">
                You will have something on the internet before Level 1 begins.
                That changes how the rest of the course feels.
              </p>
              <div className="mt-[var(--s-5)]">
                <Button href="/level-0">
                  Try it now <Arrow />
                </Button>
              </div>
            </div>
            <div className="card-quiet p-[var(--s-5)]">
              <p className="eyebrow">You type</p>
              <p className="mt-[var(--s-2)] text-[15px] italic text-ink-2">
                &ldquo;an app that helps freelancers chase unpaid invoices&rdquo;
              </p>
              <div className="my-[var(--s-4)] h-px bg-line" />
              <p className="eyebrow text-blue">We hand you back</p>
              <p className="mono mt-[var(--s-2)] text-[12.5px] leading-relaxed text-ink-2">
                Research the market for freelance invoice chasing. Find 3 real
                competitors, what they charge, and one gap. Then build a single
                page site that...
              </p>
            </div>
          </Reveal>
        </div>
      </section>

 
      {/* =============================================================== LEVELS */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">The path</span>
            <h2>Six levels, Apprentice to Principal.</h2>
            <p>
              Each level is a full course with chapters and lessons, and each one
              ends in a badge. Level 1 is open now. Finish it and Level 2 opens.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-2">
            {levels.map((l) => (
              <LevelCard key={l.slug} level={l} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================== EXAMPLE */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Inside a lesson</span>
            <h2>See the idea, then build with it.</h2>
            <p>
              Every lesson shows you what the concept actually is before it asks
              for anything. Then a real company that faced it, then the thing you
              make. Here is the diagram from lesson one.
            </p>
          </Reveal>

          <Reveal>
            <Diagram
              id="signal-to-claim"
              caption="From lesson 1.1. The move you will make in every discovery task for the rest of your career."
            />
          </Reveal>

          <Reveal className="mt-[var(--s-6)] grid-cards grid-3">
            <div data-reveal className="note note-blue">
              <span className="eyebrow">The AI move</span>
              <p>{first.ai.move}</p>
            </div>
            <div data-reveal className="note note-amber">
              <span className="eyebrow">Where it lets you down</span>
              <p>{first.ai.trap}</p>
            </div>
            <div data-reveal className="note note-green">
              <span className="eyebrow">What you build</span>
              <p>{first.build.artefact}</p>
            </div>
          </Reveal>

          <Reveal className="mt-[var(--s-6)]">
            <Link
              href="/levels/01/your-first-monday"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-blue"
            >
              Open lesson 1.1 <Arrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

  
      {/* ============================================================ COMMUNITY */}
      <section className="section rule" id="community">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Community</span>
            <h2>The course is free. Always.</h2>
            <p>
              Two options, and one of them costs nothing. You only pay if you
              want your work reviewed and a room full of people who can refer
              you.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-2">
            <div data-reveal className="card card-p flex flex-col gap-[var(--s-4)]">
              <span className="tag tag-free self-start">Free forever</span>
              <h3 className="text-[20px]">The whole course</h3>
              <p className="text-[32px] font-semibold tracking-[-0.03em]">
                $0{" "}
                <span className="text-sm font-normal tracking-normal text-ink-3">
                  no card
                </span>
              </p>
              <PriceList
                items={[
                  `All 6 levels, ${totalChapters} chapters, ${totalLessons} lessons`,
                  "Every dataset, template and prompt pack",
                  "Level 0, the idea to MVP flow",
                  "Progress saved to your account",
                ]}
              />
              <Button href="/levels" variant="outline" size="lg" className="mt-auto">
                Start learning <Arrow />
              </Button>
            </div>

            <div data-reveal className="card card-p flex flex-col gap-[var(--s-4)] border-navy">
              <span className="tag tag-blue self-start">Badge and community</span>
              <h3 className="text-[20px]">Everything, for life</h3>
              <p className="text-[32px] font-semibold tracking-[-0.03em]">
                $119{" "}
                <span className="text-sm font-normal tracking-normal text-ink-3">
                  once, not a subscription
                </span>
              </p>
              <PriceList
                items={[
                  "All six badges, capstones reviewed by a practising PM",
                  "The closed community of working product managers",
                  "Job referrals from members who are hiring",
                  "Feedback on your builds before you ship them",
                  "Live teardowns and office hours",
                ]}
              />
              <Button href="/community" size="lg" className="mt-auto">
                Join Now <Arrow />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================== FAQ */}
      <section className="section rule" id="faq">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Questions</span>
            <h2>Straight answers.</h2>
          </Reveal>
          <Reveal className="faq border-t border-line">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span className="pm" aria-hidden="true" />
                </summary>
                <div className="prose-w pb-[var(--s-5)] text-ink-2">{a}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================================================================== CTA */}
      <section className="section-sm">
        <div className="shell">
          <Reveal className="card card-p grid items-center gap-[var(--s-6)] lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Lesson one takes 55 minutes and ends with a memo you can show
                someone.
              </h2>
              <p className="mt-[var(--s-3)] text-ink-2">
                Sign in to save your progress. Nothing is charged.
              </p>
            </div>
            <div className="flex flex-wrap gap-[var(--s-3)]">
              <Button href="/levels/01/your-first-monday" size="lg">
                Start lesson one <Arrow />
              </Button>
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

function PriceList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-none flex-col gap-[var(--s-3)] p-0">
      {items.map((t) => (
        <li key={t} className="flex gap-[var(--s-3)] text-[14.5px] text-ink-2">
          <Check className="mt-1 text-free" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

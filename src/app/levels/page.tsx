import FieldArt from "@/components/art/FieldArt";
import type { Metadata } from "next";

import Reveal from "@/components/motion/Reveal";
import LevelCard from "@/components/course/LevelCard";
import Button from "@/components/ui/Button";
import { Arrow, Sparkle } from "@/components/ui/Icons";
import {
  levels,
  totalChapters,
  totalHours,
  totalLessons,
} from "@/lib/course";

export const metadata: Metadata = {
  title: "The six levels",
  description:
    "Apprentice to Principal. Six levels, every lesson ending in something you built. Free forever, and each level unlocks the next.",
};

export default function LevelsPage() {
  return (
    <>
      <section className="section-top">
        <div className="shell">
          <div className="atelier-heading">
          <Reveal className="head">
            <span className="eyebrow">The path</span>
            <h1>Six levels, Apprentice to Principal.</h1>
            <p>
              Each level is a full course, not a module. {totalChapters}{" "}
              chapters and {totalLessons} lessons in total, about {totalHours}{" "}
              hours of material, and every one of them ends in an artefact you
              keep. Level 1 is open. Finish it and Level 2 opens.
            </p>
          </Reveal>
            <FieldArt kind="compass" />
          </div>

          <Reveal className="card card-p flex flex-wrap items-center justify-between gap-[var(--s-5)]">
            <div>
              <span className="tag tag-blue">
                <Sparkle className="h-3.5 w-3.5" /> Test Yourself
              </span>
              <h2 className="mt-[var(--s-3)] text-[clamp(1.2rem,2.2vw,1.5rem)]">
                It takes an afternoon and puts something of yours online.
              </h2>
              <p className="mt-[var(--s-3)] max-w-[58ch] text-[15px] text-ink-2">
                Before the ladder, one idea of yours, researched and shipped as
                a single page site. Do it first and the rest of the course has
                something real to attach to.
              </p>
            </div>
            <Button href="/level-0" size="lg">
              Test Yourself<Arrow />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section rule">
        <div className="shell">
          <Reveal stagger className="grid-cards grid-2">
            {levels.map((l) => (
              <LevelCard key={l.slug} level={l} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">How the gate works</span>
            <h2>Sequential, on purpose.</h2>
          </Reveal>
          <Reveal stagger className="grid-cards grid-3">
            <div data-reveal className="note">
              <span className="eyebrow">Free, all of it</span>
              <p>
                Every level, every dataset, every template. No card. You sign in
                so your progress and your builds stay with your account.
              </p>
            </div>
            <div data-reveal className="note note-blue">
              <span className="eyebrow">One at a time</span>
              <p>
                Level 4 asks you to deploy a product, which assumes the spec you
                wrote in Level 3, which assumes the research in Level 2. Finish
                a level and the next one opens.
              </p>
            </div>
            <div data-reveal className="note note-green">
              <span className="eyebrow">Badges are optional</span>
              <p>
                You can complete all six levels without paying anything. The
                badge and the community are the only paid part, once, for life.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

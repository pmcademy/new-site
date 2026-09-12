import type { Metadata } from "next";

import DomainChooser from "@/components/course/DomainChooser";
import Reveal from "@/components/motion/Reveal";
import { levels } from "@/lib/course";

export const metadata: Metadata = {
  title: "Choose your product world",
  description:
    "Pick the company the whole of Level 1 happens inside. Same lessons, different building.",
};

export default function StartPage() {
  const first = levels[0].chapters[0].lessons[0];

  return (
    <section className="section-top">
      <div className="shell">
        <Reveal className="head">
          <span className="eyebrow">Before Level 1</span>
          <h1>Pick the company you are joining.</h1>
          <p>
            The course is not a set of topics, it is a job at a company. Choose
            the world and every scene, dataset and build in Level 1 happens
            inside it. The lessons are the same. The building is different.
          </p>
        </Reveal>

        <Reveal>
          <DomainChooser next={`/levels/01/${first.slug}`} />
        </Reveal>
      </div>
    </section>
  );
}

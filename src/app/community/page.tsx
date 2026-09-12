import type { Metadata } from "next";

import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { Arrow, BadgeHex, Check } from "@/components/ui/Icons";
import { levels, totalChapters, totalLessons } from "@/lib/course";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The course is free forever. One payment of $119, once, for life, gets your badges reviewed and puts you in a closed room of working product managers.",
};

const inside = [
  {
    title: "Your capstone read by a practising PM",
    body: "Every level ends in something built. Send it and get it back marked up by someone who does this for a living, with the parts that would not survive a real review circled.",
  },
  {
    title: "A closed room, not a broadcast channel",
    body: "Working product managers, people mid-switch, and a few founders. Small enough that asking a question gets an answer, not a like.",
  },
  {
    title: "Referrals from members who are hiring",
    body: "Roles get posted by the people who own them. A referral from inside is worth more than a hundred applications, and this is the shortest path to one.",
  },
  {
    title: "Feedback before you ship, not after",
    body: "Post the spec, the funnel, the pricing page. Get told what is wrong with it while it is still cheap to change.",
  },
  {
    title: "Live teardowns and office hours",
    body: "A real product pulled apart in public every month, and a session where you bring whatever is stuck.",
  },
  {
    title: "Six verified badges",
    body: "One per level, issued when the capstone passes. A link a hiring manager can check, attached to work they can read.",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* ============================================================= INTRO */}
      <section className="section-top">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Community</span>
            <h1>The course is free. Always.</h1>
            <p>
              All six levels, {totalChapters} chapters, {totalLessons} lessons,
              every dataset and every template. No card, no trial, no chapter
              held back. You pay only if you want your work reviewed and a room
              full of people who can refer you.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-2">
            {/* ------------------------------------------------------ free */}
            <div
              data-reveal
              className="card card-p flex flex-col gap-[var(--s-4)]"
            >
              <span className="tag tag-free self-start">Free forever</span>
              <h2 className="text-[20px]">The whole course</h2>
              <p className="text-[38px] font-semibold tracking-[-0.03em]">
                $0{" "}
                <span className="text-sm font-normal tracking-normal text-ink-3">
                  no card, ever
                </span>
              </p>
              <List
                items={[
                  `All 6 levels, ${totalChapters} chapters, ${totalLessons} lessons`,
                  "Level 0, from an idea to a live URL",
                  "Every dataset, template and prompt pack",
                  "Worked solutions for every lesson",
                  "Progress saved to your account",
                ]}
              />
              <Button
                href="/levels"
                variant="outline"
                size="lg"
                className="mt-auto"
              >
                Start learning <Arrow />
              </Button>
            </div>

            {/* ------------------------------------------------------- paid */}
            <div
              data-reveal
              className="card card-p flex flex-col gap-[var(--s-4)] border-navy"
            >
              <span className="tag tag-blue self-start">Badge and community</span>
              <h2 className="text-[20px]">Everything, for life</h2>
              <p className="text-[38px] font-semibold tracking-[-0.03em]">
                $119{" "}
                <span className="text-sm font-normal tracking-normal text-ink-3">
                  once, not a subscription
                </span>
              </p>
              <List
                items={[
                  "All six badges, capstones reviewed by a practising PM",
                  "The closed community of working product managers",
                  "Job referrals from members who are hiring",
                  "Feedback on your builds before you ship them",
                  "Live teardowns and monthly office hours",
                  "Everything in the free tier, obviously",
                ]}
              />
              <Button href="/signin?next=/community" size="lg" className="mt-auto">
                Join the community <Arrow />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ INSIDE */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">What the fee buys</span>
            <h2>Six things, and none of them are lessons.</h2>
            <p>
              The lessons are free and stay free. What you are paying for is the
              part a course cannot give you on its own: someone reading your
              work, and a room that knows who is hiring.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-3">
            {inside.map((x) => (
              <div key={x.title} data-reveal className="card card-p">
                <h3 className="text-[17px]">{x.title}</h3>
                <p className="mt-[var(--s-3)] text-[14.5px] text-ink-2">
                  {x.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* =========================================================== BADGES */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">The badges</span>
            <h2>One per level, and each one has work behind it.</h2>
            <p>
              A badge here is not a completion certificate. It is issued when
              the capstone for that level passes review, which means somebody
              read what you built and said it would hold up.
            </p>
          </Reveal>

          <Reveal stagger className="grid gap-[var(--s-4)] sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((l) => (
              <div
                key={l.slug}
                data-reveal
                className="card card-p flex items-center gap-[var(--s-4)]"
              >
                <BadgeHex n={l.n} earned />
                <div>
                  <span className="eyebrow block">Level {l.n}</span>
                  <span className="mt-[var(--s-1)] block font-serif text-[1.6rem] leading-none tracking-[-0.02em]">
                    {l.rank}
                  </span>
                  <span className="mt-[var(--s-2)] block text-[13px] text-ink-3">
                    {l.capstone.title}
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================== FAQ */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Before you ask</span>
            <h2>The awkward questions.</h2>
          </Reveal>
          <Reveal className="faq border-t border-line">
            {[
              [
                "Is it really one payment?",
                "Yes. $119 once, for life. No renewal, no per level fee, no upsell at the end of a level.",
              ],
              [
                "Can I finish the whole course without paying?",
                "Yes, and plenty of people should. Every lesson, dataset, template and worked solution is free. Nothing in the curriculum is behind the fee.",
              ],
              [
                "What if I pay and the community is quiet?",
                "Then it is not worth your money and you should say so. The room is deliberately small, which is the point, but a small room that nobody posts in is just a group chat.",
              ],
              [
                "Do I have to pay to get a badge for Level 1?",
                "Yes. The badge involves a person reading your capstone and marking it, which is the part that costs something. Finishing Level 1 unlocks Level 2 either way.",
              ],
            ].map(([q, a]) => (
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
    </>
  );
}

function List({ items }: { items: string[] }) {
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

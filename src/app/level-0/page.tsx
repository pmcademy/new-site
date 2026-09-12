import FieldArt from "@/components/art/FieldArt";
import type { Metadata } from "next";

import IdeaPolisher from "@/components/level0/IdeaPolisher";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { Arrow, Sparkle } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Level 0, idea to something on the internet",
  description:
    "Type an idea in one sentence. We turn it into a brief that makes the model research the market first, then build you a single page MVP. Then we help you put it on a real domain.",
};

const deploy = [
  {
    n: "1",
    title: "Get the file",
    body: "Ask for the whole thing as one index.html. If the model split it into three files, ask again. One file is the difference between shipping tonight and not shipping.",
  },
  {
    n: "2",
    title: "Put it somewhere free first",
    body: "Netlify Drop and Cloudflare Pages both take a folder dragged onto the page and hand you a live URL in under a minute. No account needed at Netlify Drop to see it working. Do this before you spend anything.",
    links: [
      { label: "Netlify Drop", url: "https://app.netlify.com/drop" },
      { label: "Cloudflare Pages", url: "https://pages.cloudflare.com/" },
      { label: "GitHub Pages", url: "https://pages.github.com/" },
    ],
  },
  {
    n: "3",
    title: "Buy the name",
    body: "Only once something real is at the free URL. A dot com is usually around ten to fifteen dollars a year, and the price to renew matters more than the price to buy. Check the renewal before you check out.",
    links: [
      { label: "Cloudflare Registrar", url: "https://www.cloudflare.com/products/registrar/" },
      { label: "Namecheap", url: "https://www.namecheap.com/" },
      { label: "Porkbun", url: "https://porkbun.com/" },
    ],
  },
  {
    n: "4",
    title: "Point the name at the site",
    body: "In your host, add the custom domain. It gives you a CNAME or two A records. Paste them into the registrar's DNS panel. It takes minutes, occasionally an hour. Nothing is broken while you wait.",
  },
  {
    n: "5",
    title: "Show it to five people who are not your friends",
    body: "Watch them use it without saying anything. Write down every place they paused. That list is your first backlog, and it is worth more than the site.",
  },
];

export default function LevelZeroPage() {
  return (
    <>
      {/* ================================================================ TOP */}
      <section className="section-top">
        <div className="shell">
          <div className="atelier-heading">
          <Reveal className="head">
            <span className="tag tag-blue">
              <Sparkle className="h-3.5 w-3.5" /> Level 0
            </span>
            <h1 className="mt-[var(--s-4)]">
              Put something of yours on the internet before Monday.
            </h1>
            <p>
              You do not need permission and you do not need to be able to code.
              You need an idea in one sentence, an afternoon, and a brief that
              makes the model do the research before it does the building.
            </p>
          </Reveal>
            <FieldArt kind="seed" />
          </div>

          <Reveal>
            <IdeaPolisher />
          </Reveal>
        </div>
      </section>

      {/* ============================================================== WHY */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Why research first</span>
            <h2>Anyone can get a model to build a page. That is not the skill.</h2>
            <p>
              Ask for a website and you get a website, instantly, and it is
              usually pretty. It is also built on nothing: no idea who it is
              for, what exists already, or what would count as working. That is
              exactly the mistake the rest of this course is about.
            </p>
          </Reveal>

          <Reveal stagger className="grid-cards grid-3">
            <div data-reveal className="note note-amber">
              <span className="eyebrow">What most people do</span>
              <p>
                Build me an app for tracking freelance invoices. Ten seconds
                later there is a page, and no reason to believe anyone wants it.
              </p>
            </div>
            <div data-reveal className="note note-blue">
              <span className="eyebrow">What the brief does</span>
              <p>
                Forces three real competitors with real prices, how people cope
                today with no product at all, and one gap with a source behind
                it. Then it stops and shows you.
              </p>
            </div>
            <div data-reveal className="note note-green">
              <span className="eyebrow">What you end up with</span>
              <p>
                A live URL, a defensible reason it exists, and three things you
                deliberately did not build. That last one is the product manager
                part.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================== DEPLOY */}
      <section className="section rule">
        <div className="shell">
          <Reveal className="head">
            <span className="eyebrow">Getting it live</span>
            <h2>From a file on your laptop to a real address.</h2>
            <p>
              Five steps. The first four take about twenty minutes in total. The
              fifth is the one that teaches you something.
            </p>
          </Reveal>

          <Reveal stagger className="flex list-none flex-col gap-[var(--s-4)] p-0">
            {deploy.map((d) => (
              <div
                key={d.n}
                data-reveal
                className="card card-p flex gap-[var(--s-5)]"
              >
                <span className="serif-num shrink-0 text-[2rem] leading-none text-ink-3">
                  {d.n}
                </span>
                <div>
                  <h3 className="text-[17px]">{d.title}</h3>
                  <p className="mt-[var(--s-3)] max-w-[64ch] text-[15px] text-ink-2">
                    {d.body}
                  </p>
                  {d.links && (
                    <ul className="mt-[var(--s-4)] flex list-none flex-wrap gap-[var(--s-4)] p-0">
                      {d.links.map((l) => (
                        <li key={l.url}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13.5px] text-blue underline underline-offset-4"
                          >
                            {l.label}
                            <Arrow className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-[var(--block-y)] note">
            <span className="eyebrow">If you would rather not buy a domain</span>
            <p>
              You do not have to. A free host URL is a real address and works
              for everything the course asks of you. Buy the name when the thing
              is worth a name.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== NEXT */}
      <section className="section-sm rule">
        <div className="shell">
          <Reveal className="card card-p flex flex-wrap items-center justify-between gap-[var(--s-5)]">
            <div>
              <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)]">
                Shipped it? Level 1 will feel completely different now.
              </h2>
              <p className="mt-[var(--s-3)] max-w-[58ch] text-ink-2">
                You have a product with your name on it, which means every
                lesson about users, metrics and priorities has something real to
                attach to.
              </p>
            </div>
            <Button href="/levels/start" size="lg">
              Start Level 1 <Arrow />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

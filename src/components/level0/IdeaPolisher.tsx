"use client";

import { useMemo, useState } from "react";

import { Sparkle } from "@/components/ui/Icons";

/**
 * Level 0, step one.
 *
 * The learner types an idea in plain language. We hand back a brief that makes
 * the model research the market BEFORE it writes a line of code, then build a
 * single page site. No network call: the value here is the structure of the
 * brief, and it works offline, instantly, and for free.
 */

function clean(input: string) {
  const s = input.trim().replace(/\s+/g, " ").replace(/[.]+$/, "");
  if (!s) return "";
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function buildPrompt(idea: string, audience: string, outcome: string) {
  const it = clean(idea) || "an app that helps freelancers chase unpaid invoices";
  const who = clean(audience) || "the people you think would use it";
  const win = clean(outcome) || "they get the thing done faster than they do today";

  return `You are acting as my product partner. Do not write any code until part 3.

THE IDEA
${it}

PART 1. Research before you build.
Search the web and tell me:
1. Three real products that already do some of this. For each: what they charge, who they are aimed at, and one thing people complain about in their reviews.
2. How ${who} solve this problem today without any product at all. Spreadsheets, WhatsApp, paper, nothing.
3. One gap you can defend with evidence, not a hunch. Quote the source.
Stop and show me this before continuing.

PART 2. Narrow it to one page.
Given the gap, propose the single smallest thing worth building this weekend.
- Name the one job it does. One sentence.
- Name the one person it is for: ${who}
- Name what has to be true for it to have worked: ${win}
- List three things you are deliberately NOT building.
Ask me to approve before you build.

PART 3. Build it.
Build a single page site. One HTML file, inline CSS and JavaScript, no build step, no external services.
- It must work with no sign up and no backend.
- A real interaction, not a screenshot. If it is a calculator, it calculates. If it is a tracker, it tracks in the browser.
- Legible on a phone.
- Plain colours, generous spacing, one accent. No stock photos.
Then give me a plain checklist of what to change if the first five people who use it are confused.`;
}

export default function IdeaPolisher() {
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [outcome, setOutcome] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => buildPrompt(idea, audience, outcome),
    [idea, audience, outcome]
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, the text is selectable */
    }
  }

  return (
    <div className="grid gap-[var(--s-6)] lg:grid-cols-2">
      {/* ------------------------------------------------------------- input */}
      <div className="card card-p flex flex-col gap-[var(--s-5)]">
        <div>
          <label htmlFor="idea" className="eyebrow">
            Your idea, one sentence
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={3}
            placeholder="An app that helps freelancers chase unpaid invoices"
            className="mt-[var(--s-3)] w-full resize-y rounded-[10px] border border-line bg-paper p-[var(--s-4)] text-[15.5px] text-ink outline-none placeholder:text-ink-3 focus:border-blue"
          />
        </div>

        <div>
          <label htmlFor="who" className="eyebrow">
            Who is it for
          </label>
          <input
            id="who"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Solo designers who invoice five clients a month"
            className="mt-[var(--s-3)] w-full rounded-[10px] border border-line bg-paper p-[var(--s-4)] text-[15.5px] text-ink outline-none placeholder:text-ink-3 focus:border-blue"
          />
        </div>

        <div>
          <label htmlFor="win" className="eyebrow">
            What counts as it having worked
          </label>
          <input
            id="win"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="They send a chase in under a minute instead of putting it off"
            className="mt-[var(--s-3)] w-full rounded-[10px] border border-line bg-paper p-[var(--s-4)] text-[15.5px] text-ink outline-none placeholder:text-ink-3 focus:border-blue"
          />
        </div>

        <button onClick={() => setReady(true)} className="btn btn-primary btn-lg">
          <Sparkle /> Turn it into a brief
        </button>
        <p className="text-[13px] text-ink-3">
          Nothing is sent anywhere. This runs in your browser, and the brief is
          yours to paste into Claude, ChatGPT or anything else.
        </p>
      </div>

      {/* ------------------------------------------------------------ output */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between gap-[var(--s-3)] border-b border-line bg-surface-2 px-[var(--s-5)] py-[var(--s-3)]">
          <span className="eyebrow">Your brief</span>
          {ready && (
            <button
              onClick={copy}
              className="text-[13px] font-medium text-blue transition-opacity hover:opacity-70"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {ready ? (
          <pre className="mono max-h-[560px] overflow-auto whitespace-pre-wrap p-[var(--s-5)] text-[12.5px] leading-relaxed text-ink-2">
            {prompt}
          </pre>
        ) : (
          <div className="flex flex-col gap-[var(--s-4)] p-[var(--s-6)]">
            <p className="text-[15px] text-ink-2">
              Type your idea on the left. What comes back is not a nicer version
              of your sentence, it is a three part brief.
            </p>
            <ol className="flex list-none flex-col gap-[var(--s-3)] p-0">
              {[
                "Research first. Real competitors, real prices, real complaints, and a gap with a source behind it.",
                "Narrow second. One job, one person, one definition of worked, and three things you are not building.",
                "Build last. One page, one file, a real interaction, works on a phone.",
              ].map((t, k) => (
                <li key={k} className="flex gap-[var(--s-3)]">
                  <span className="serif-num text-[18px] leading-none text-ink-3">
                    {k + 1}
                  </span>
                  <span className="text-[14px] text-ink-2">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

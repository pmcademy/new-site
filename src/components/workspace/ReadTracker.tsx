"use client";

import { useEffect, useRef, useState } from "react";

import { upsertCaseStudy } from "@/lib/workspace/store";

/**
 * Decides whether a case study was actually read.
 *
 * A page load is not a read. The rule is time on the page and how far down it
 * got, or an explicit "mark as read" for the person who skims fast and knows
 * they are done. Whichever comes first, the book appears once and never twice.
 *
 * Drop this at the bottom of any case study page:
 *
 *   <ReadTracker id="duolingo-streak" title="Duolingo: the streak" href="/case-studies/duolingo-streak" />
 */

const SECONDS = 45;
const DEPTH = 0.7;

export default function ReadTracker({
  id,
  title,
  href,
  seconds = SECONDS,
  depth = DEPTH,
}: {
  id: string;
  title: string;
  href: string;
  seconds?: number;
  depth?: number;
}) {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const awarded = useRef(false);

  const complete = (percent: number) => {
    if (awarded.current) return;
    awarded.current = true;
    upsertCaseStudy({
      caseStudyId: id,
      title,
      href,
      firstOpenedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      readPercent: Math.round(percent * 100),
    });
    setDone(true);
  };

  useEffect(() => {
    /* Record the open straight away, so a half read still shows progress. */
    upsertCaseStudy({
      caseStudyId: id,
      title,
      href,
      firstOpenedAt: new Date().toISOString(),
      readPercent: 0,
    });

    const started = Date.now();
    let deepest = 0;
    let elapsed = 0;

    /* Time only counts while the tab is actually in front of the reader. */
    const tick = setInterval(() => {
      if (document.visibilityState === "visible") elapsed += 1;
      if (elapsed >= seconds && deepest >= depth) complete(deepest);
    }, 1000);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, (h.scrollTop + h.clientHeight * 0.15) / max) : 1;
      deepest = Math.max(deepest, p);
      setProgress(deepest);
      if (elapsed >= seconds && deepest >= depth) complete(deepest);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearInterval(tick);
      window.removeEventListener("scroll", onScroll);
      if (!awarded.current && deepest > 0) {
        upsertCaseStudy({
          caseStudyId: id,
          title,
          href,
          firstOpenedAt: new Date(started).toISOString(),
          readPercent: Math.round(deepest * 100),
        });
      }
    };
  }, [id, title, href, seconds, depth]);

  return (
    <div className="ws-read">
      {done ? (
        <p className="text-[14.5px] text-free">
          Added to your shelf. It is in your workspace now.
        </p>
      ) : (
        <>
          <p className="text-[14.5px] text-ink-2">
            {progress >= depth
              ? "Nearly there. Stay a moment longer and this goes on your shelf."
              : "Read to the end and this becomes a book in your workspace."}
          </p>
          <button onClick={() => complete(1)} className="btn btn-outline">
            Mark as read
          </button>
        </>
      )}
    </div>
  );
}

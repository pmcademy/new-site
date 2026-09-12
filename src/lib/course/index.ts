import { l01 } from "./l01";
import { l02 } from "./l02";
import { l03 } from "./l03";
import { l04 } from "./l04";
import { l05 } from "./l05";
import { l06 } from "./l06";
import { levelLessons, type Level } from "./types";

export * from "./types";

/** Six levels. Free, sequential: finishing one unlocks the next. */
export const levels: Level[] = [l01, l02, l03, l04, l05, l06];

export const getLevel = (slug: string) => levels.find((l) => l.slug === slug);

export const getLesson = (levelSlug: string, lessonSlug: string) => {
  const level = getLevel(levelSlug);
  if (!level) return null;
  for (const chapter of level.chapters) {
    const lesson = chapter.lessons.find((x) => x.slug === lessonSlug);
    if (lesson) return { level, chapter, lesson };
  }
  return null;
};

/** Ordered flat list across a level, for prev/next and the sidebar. */
export const lessonOrder = (levelSlug: string) => {
  const level = getLevel(levelSlug);
  if (!level) return [];
  return level.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson }))
  );
};

/**
 * A slim version of a level, safe to hand to a client component.
 *
 * The sidebar and the chapter list only need titles and slugs. Passing the
 * whole Level across the server boundary would serialise every hook, case
 * study and solution in the level into the page payload, which is tens of
 * kilobytes per lesson for text nobody on that page can see.
 */
export type Outline = {
  slug: string;
  n: string;
  rank: string;
  chapters: {
    slug: string;
    n: string;
    title: string;
    summary: string;
    lessons: { slug: string; title: string; kind: string; minutes: number }[];
  }[];
};

export const levelOutline = (level: Level): Outline => ({
  slug: level.slug,
  n: level.n,
  rank: level.rank,
  chapters: level.chapters.map((c) => ({
    slug: c.slug,
    n: c.n,
    title: c.title,
    summary: c.summary,
    lessons: c.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      kind: l.kind,
      minutes: l.minutes,
    })),
  })),
});

export const allLessonParams = () =>
  levels.flatMap((l) =>
    levelLessons(l).map((x) => ({ level: l.slug, lesson: x.slug }))
  );

export const totalLessons = levels.reduce(
  (a, l) => a + levelLessons(l).length,
  0
);
export const totalChapters = levels.reduce((a, l) => a + l.chapters.length, 0);
export const totalHours = Math.round(
  levels.reduce(
    (a, l) => a + levelLessons(l).reduce((s, x) => s + x.minutes, 0),
    0
  ) / 60
);

/* -------------------------------------------------------------------------- */
/* Copy that depends on the course, so the numbers can never drift.           */
/* -------------------------------------------------------------------------- */

export type Quote = { q: string; n: string; r: string; i: number };

/**
 * PLACEHOLDER. Replace with real learner quotes and photos before launch.
 * The names read "Sample Name" deliberately. Do not ship invented endorsements.
 */
export const quotes: Quote[] = [
  {
    q: "I had read three PM books and still could not answer “what would you do first” in an interview. Level 1 fixed that in a week, because it makes you actually do it.",
    n: "Sample Name",
    r: "Support lead to APM",
    i: 0,
  },
  {
    q: "The AI parts are not a gimmick. Every exercise makes you find where the model got it wrong, and that is the thing I now get asked about in every interview.",
    n: "Sample Name",
    r: "Clinician to Health PM",
    i: 2,
  },
  {
    q: "I finished with a product on a real URL, an eval suite and a case study. I stopped sending a CV and started sending a link.",
    n: "Sample Name",
    r: "Analyst to Product Manager",
    i: 4,
  },
];

export const faq: [string, string][] = [
  [
    "Is the whole course really free?",
    `Yes. All six levels, ${totalChapters} chapters, ${totalLessons} lessons, every dataset and template. No card, no trial, no locked chapters. You pay only if you want your badge verified and access to the community.`,
  ],
  [
    "Why do I have to sign in if it is free?",
    "So your progress is saved, your builds stay attached to your account, and you can pick up on another device. Nothing is charged and nothing is emailed to you unless you ask.",
  ],
  [
    "Why is only Level 1 open?",
    "Because the levels build on each other. Level 4 asks you to deploy a product, which assumes the spec you wrote in Level 3, which assumes the research from Level 2. Finish a level and the next one opens.",
  ],
  [
    "What exactly does the 119 dollars buy?",
    "One payment, for life. Your capstones reviewed by a practising PM and a verified badge for each level you pass, plus the closed community: job referrals, feedback on your builds before you ship them, live teardowns and office hours.",
  ],
  [
    "Do I need to be able to code?",
    "No. Level 4 teaches you to build and deploy a working product with AI tooling, starting from nothing. You will read code and understand it. You will not be writing algorithms.",
  ],
  [
    "How long does it take?",
    `The lessons are about ${totalHours} hours. The builds are where the time goes, so most people take four to six months at a few hours a week. Nothing expires and there are no cohort dates.`,
  ],
];

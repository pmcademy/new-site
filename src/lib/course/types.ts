/**
 * The course model.
 *
 * Level → Chapter → Lesson.
 *
 * Six levels, named as a craft ladder: Apprentice, Practitioner, Artisan,
 * Operator, Architect, Principal. Finishing a level earns a badge and unlocks
 * the next one. Everything is free; the badge and the community are paid.
 *
 * A lesson is not an article. It runs in a fixed order, and the order is the
 * teaching:
 *
 *   scene     where you are, with a picture of it
 *   explain   what the concept IS, shown visually, before any task
 *   case      a real company, a real decision, what actually happened
 *   ai        do the work with a model, and the failure planted in it
 *   build     the artefact. Nothing is finished until this exists.
 *   solution  a worked answer, revealed only when the learner asks
 *   check     questions you cannot answer unless you did the build
 */

export type LessonKind =
  | "Concept"
  | "Case study"
  | "Build"
  | "Drill"
  | "Simulation"
  | "Teardown"
  | "Workshop";

/** Keys into the diagram registry in `components/course/diagrams`. */
export type DiagramId =
  | "user-flow"
  | "funnel"
  | "opportunity-tree"
  | "rice"
  | "retention-curve"
  | "jobs-to-be-done"
  | "signal-to-claim"
  | "states-matrix"
  | "eval-loop"
  | "rag-pipeline"
  | "cost-curve"
  | "roadmap-outcome"
  | "ab-test"
  | "three-chairs"
  | "prd-anatomy"
  | "hierarchy";

/** A visual explainer. This runs BEFORE the task, always. */
export type Explain = {
  title: string;
  /** Two or three short paragraphs. Plain language, no jargon before it is defined. */
  body: string[];
  diagram?: DiagramId;
  caption?: string;
  /** Named parts of the concept, so the diagram has a legend in words. */
  points?: { term: string; def: string }[];
};

/** A real company, analysed as public commentary. Logos are placeholders. */
export type CaseStudy = {
  brand: string;
  /** File in /public/img/brands. Placeholder until real assets land. */
  logo?: string;
  year?: string;
  situation: string;
  what: string;
  lesson: string;
  /** Real, checkable sources. */
  sources?: { label: string; url: string }[];
};

export type BuildStep = { do: string; hint?: string };

/** The worked answer. Hidden behind a disclosure so it cannot be stumbled into. */
export type Solution = {
  summary: string;
  /** How a competent PM would actually approach it, step by step. */
  walkthrough: string[];
  /** A short excerpt of the finished artefact, so the standard is visible. */
  example?: { label: string; body: string };
};

export type Lesson = {
  slug: string;
  title: string;
  kind: LessonKind;
  minutes: number;

  /** The situation. Present tense, with a constraint and a clock. */
  hook: string;

  /** The place. Rendered as an image with pinned notes. */
  scene?: {
    /** File in /public/img/scenes. Placeholders for now. */
    image: string;
    alt: string;
    caption?: string;
    /** Fictional artefacts lying around the scene. */
    notes?: { from: string; text: string }[];
  };

  explain: Explain;
  case?: CaseStudy;

  ai: {
    move: string;
    /** The specific way the model fails here. The learner has to catch it. */
    trap: string;
    prompt?: string;
  };

  build: {
    artefact: string;
    steps: BuildStep[];
    tools?: string[];
  };

  solution?: Solution;
  check: string[];

  /** Further reading. Real links only. */
  references?: { label: string; url: string }[];

  /** Where this came from in the original PMcademy course. */
  legacy?: string;
};

export type Chapter = {
  slug: string;
  n: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Level = {
  slug: string;
  n: string;
  /** Apprentice, Practitioner, Artisan, Operator, Architect, Principal. */
  rank: string;
  /** The badge earned by finishing. */
  badge: string;
  title: string;
  promise: string;
  /** The running scenario. Rendered with a scene image on the level page. */
  arc: string;
  scene?: { image: string; alt: string; caption?: string };
  who: string;
  outcomes: string[];
  chapters: Chapter[];
  capstone: { title: string; body: string; ship: string[] };
};

/* -------------------------------------------------------------------------- */
/* Derived. Nothing on the site counts by hand.                               */
/* -------------------------------------------------------------------------- */

export const levelLessons = (l: Level) => l.chapters.flatMap((c) => c.lessons);
export const levelMinutes = (l: Level) =>
  levelLessons(l).reduce((a, x) => a + x.minutes, 0);
export const levelHours = (l: Level) => Math.round(levelMinutes(l) / 60);

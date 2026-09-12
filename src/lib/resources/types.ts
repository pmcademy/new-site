/**
 * The resource library.
 *
 * Three kinds of thing, each with its own page and its own URL shape:
 *
 *   /resources/templates/[slug]              a document you fill in
 *   /resources/prompts/[slug]                a prompt pack for one PM stage
 *   /resources/product-case-study/[slug]     a scroll-driven teardown
 *
 * Everything is free and ungated. Nothing here asks for an email.
 */

/* -------------------------------------------------------------------------- */
/* Templates                                                                   */
/* -------------------------------------------------------------------------- */

export type TemplateSection = {
  /** The heading as it appears in the filled document. */
  heading: string;
  /** What goes here, in one or two sentences. */
  purpose: string;
  /** The prompt the writer answers. Shown as the placeholder line. */
  ask: string;
  /** A filled-in example, written for Sona so it reads as real work. */
  example: string;
  /** The most common way this section goes wrong. */
  trap?: string;
};

export type Template = {
  slug: string;
  title: string;
  /** One line, said plainly. */
  blurb: string;
  /** Who reaches for this and when. */
  when: string;
  /** Minutes to actually fill it in. */
  useIn: number;
  /** The level it belongs to, for cross-linking. */
  level?: string;
  sections: TemplateSection[];
  /** Rules for using it well. */
  rules: string[];
  /** A prompt that fills a first draft, plus the failure to watch for. */
  ai?: { prompt: string; trap: string };
  /** The plain text version, offered as a copyable block. */
  markdown: string;
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Prompt packs, one per stage of the job                                      */
/* -------------------------------------------------------------------------- */

export type Prompt = {
  title: string;
  /** The moment you reach for it. */
  when: string;
  /** The prompt itself. Written to be pasted with small edits. */
  text: string;
  /** The specific way the model fails at this task. */
  trap: string;
};

export type PromptPack = {
  slug: string;
  stage: string;
  title: string;
  blurb: string;
  /** The stage in one sentence, so the pack is not just a list. */
  context: string;
  prompts: Prompt[];
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Case studies. Scroll-driven, one frame at a time.                           */
/* -------------------------------------------------------------------------- */

/** Keys into the screen registry in components/resources/screens.tsx. */
export type ScreenId =
  | "streak-lost"
  | "streak-freeze"
  | "streak-repair"
  | "form-many"
  | "form-one"
  | "form-error"
  | "ar-browse"
  | "ar-place"
  | "ar-buy"
  | "checkout-long"
  | "checkout-short";

export type CaseStep = {
  /** Short label for the progress rail. */
  label: string;
  /** The heading of this beat. */
  title: string;
  /** Two or three short paragraphs. */
  body: string[];
  /** The screen drawn beside it. */
  screen: ScreenId;
  /** Callouts pinned onto the screen, positioned in percentages. */
  pins?: { x: number; y: number; text: string }[];
  /** The principle this beat demonstrates, named. */
  principle?: { name: string; def: string };
  /** What a PM should take from it. */
  takeaway?: string;
};

export type CaseStudy = {
  slug: string;
  brand: string;
  /** Placeholder slot in /public/img/brands. Optional. */
  logo?: string;
  title: string;
  blurb: string;
  /** Category shown on the card. */
  sector: string;
  year: string;
  /** Minutes to read. */
  readIn: number;
  /** The situation, before the teardown starts. */
  setup: string[];
  steps: CaseStep[];
  /** What to copy, and what not to. */
  lessons: { do: string; dont: string }[];
  sources: { label: string; url: string }[];
  featured?: boolean;
};

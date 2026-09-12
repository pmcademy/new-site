export type ResourceCategory =
  | "Templates"
  | "Frameworks"
  | "Teardowns"
  | "AI toolkit"
  | "Interview prep"
  | "Data";

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  blurb: string;
  format: "Notion" | "Figma" | "Sheet" | "PDF" | "Prompt pack" | "Web app";
  /** Minutes to actually use it, not to read about it. */
  useIn: number;
  featured?: boolean;
};

export const categories: ResourceCategory[] = [
  "Templates",
  "Frameworks",
  "Teardowns",
  "AI toolkit",
  "Interview prep",
  "Data",
];

/**
 * THE RESOURCE LIBRARY, free, no email gate.
 * Everything here is meant to be used at work tomorrow, not bookmarked.
 */
export const resources: Resource[] = [
  {
    slug: "prd-that-survives",
    title: "The PRD That Survives Friday",
    category: "Templates",
    blurb:
      "A one-page PRD with the four sections engineers actually read, and the three most teams pad it with, removed.",
    format: "Notion",
    useIn: 30,
    featured: true,
  },
  {
    slug: "signal-log",
    title: "Signal Log",
    category: "Templates",
    blurb:
      "A structured sheet for collecting raw product signal from reviews, tickets and calls without losing the quote.",
    format: "Sheet",
    useIn: 20,
    featured: true,
  },
  {
    slug: "eval-starter",
    title: "LLM Eval Starter Kit",
    category: "AI toolkit",
    blurb:
      "Twenty golden cases, a scoring rubric, and a spreadsheet that tells you whether your prompt change actually helped.",
    format: "Sheet",
    useIn: 60,
    featured: true,
  },
  {
    slug: "prompt-pack-discovery",
    title: "Discovery Prompt Pack",
    category: "AI toolkit",
    blurb:
      "Prompts for clustering user quotes, drafting interview guides, and pressure-testing your own problem statement.",
    format: "Prompt pack",
    useIn: 15,
  },
  {
    slug: "rice-honest",
    title: "RICE, Honestly",
    category: "Frameworks",
    blurb:
      "Prioritisation scoring with the confidence column that stops it becoming numerology.",
    format: "Sheet",
    useIn: 25,
  },
  {
    slug: "opportunity-tree",
    title: "Opportunity Solution Tree",
    category: "Frameworks",
    blurb:
      "A Figma board for mapping outcome → opportunity → solution → experiment, prefilled with a worked example.",
    format: "Figma",
    useIn: 45,
  },
  {
    slug: "north-star-worksheet",
    title: "North Star Metric Worksheet",
    category: "Frameworks",
    blurb:
      "Six questions that expose whether your north star is a real metric or a vanity number with good PR.",
    format: "Notion",
    useIn: 30,
  },
  {
    slug: "teardown-notion-ai",
    title: "Teardown: Notion AI",
    category: "Teardowns",
    blurb:
      "Where the model sits in the product, what they chose not to automate, and how the pricing follows the cost curve.",
    format: "PDF",
    useIn: 20,
  },
  {
    slug: "teardown-duolingo",
    title: "Teardown: Duolingo's Streak",
    category: "Teardowns",
    blurb:
      "The retention mechanic dissected, and the two places it quietly trades user trust for DAU.",
    format: "PDF",
    useIn: 18,
  },
  {
    slug: "pm-interview-bank",
    title: "PM Question Bank",
    category: "Interview prep",
    blurb:
      "180 real questions from product interviews, tagged by type, with the trap in each one named.",
    format: "Notion",
    useIn: 40,
  },
  {
    slug: "case-study-skeleton",
    title: "Case Study Skeleton",
    category: "Interview prep",
    blurb:
      "The structure that turns a project you shipped into a five-minute answer that lands.",
    format: "Notion",
    useIn: 35,
  },
  {
    slug: "metrics-cheatsheet",
    title: "Product Metrics Cheat Sheet",
    category: "Data",
    blurb:
      "Activation, retention, engagement and revenue metrics, what each one hides, and the counter-metric to pair it with.",
    format: "PDF",
    useIn: 15,
  },
  {
    slug: "sql-for-pms",
    title: "SQL for PMs, in One Page",
    category: "Data",
    blurb:
      "The eight queries that answer 90% of the questions you'll ask a data team, with the joins explained.",
    format: "PDF",
    useIn: 45,
  },
  {
    slug: "ab-test-calculator",
    title: "A/B Test Sanity Calculator",
    category: "Data",
    blurb:
      "Sample size, runtime and whether your 'win' is noise. Enter three numbers, get an honest answer.",
    format: "Web app",
    useIn: 5,
  },
];

export const featured = resources.filter((r) => r.featured);

export { cases, getCase, promptPacks, templates, getTemplate, getPack, resourceCounts, totalPrompts } from "./resources/index";

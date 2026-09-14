/**
 * The learner picks a product world before Level 1 begins, and every scene,
 * dataset and build in the course is set inside it.
 *
 * Sona is the default because the Level 1 datasets are written for it. The
 * others reframe the same lessons: the same 200 reviews, the same funnel, the
 * same argument with an engineer, in a different building.
 */
export type Domain = {
  slug: string;
  company: string;
  category: string;
  blurb: string;
  /** How the company is described in every lesson hook. */
  oneLiner: string;
  /** The artefacts you will be handed in Level 1. */
  artefacts: string[];
  scene: string;
  ready: boolean;
};

export const domains: Domain[] = [
  {
    slug: "fintech",
    company: "Sona",
    category: "Personal finance",
    blurb:
      "An app that reads your bank transactions and tells you what is actually spendable this month.",
    oneLiner: "an AI personal finance app, Series A, 40 people",
    artefacts: [
      "200 app store reviews",
      "4,000 support tickets",
      "A signup funnel that loses 6 in 10",
      "A bank connection that fails silently",
    ],
    scene: "/scenes/domain-fintech.webp",
    ready: true,
  },
  {
    slug: "commerce",
    company: "Aisle",
    category: "Ecommerce",
    blurb:
      "A furniture marketplace where the hard part is not browsing, it is believing the sofa fits.",
    oneLiner: "a furniture marketplace, Series A, 60 people",
    artefacts: [
      "200 product reviews and returns",
      "A checkout that loses people at delivery estimates",
      "A returns rate nobody can explain",
      "Photography that varies wildly by seller",
    ],
    scene: "/scenes/domain-commerce.webp",
    ready: true,
  },
  {
    slug: "health",
    company: "Ward",
    category: "Healthcare",
    blurb:
      "A handover tool for hospital staff, where the constraint is twelve minutes and a shared screen.",
    oneLiner: "a clinical handover tool, seed stage, 18 people",
    artefacts: [
      "200 shift feedback notes",
      "A compliance requirement nobody read",
      "Users who cannot install anything",
      "A ten second window to be useful",
    ],
    scene: "/scenes/domain-health.webp",
    ready: false,
  },
  {
    slug: "b2b",
    company: "Ledgerly",
    category: "B2B SaaS",
    blurb:
      "Invoicing for agencies, where the person who buys it is never the person who uses it.",
    oneLiner: "a B2B invoicing tool, Series B, 140 people",
    artefacts: [
      "200 sales call transcripts",
      "A buyer and a user who want different things",
      "A churn spike at renewal",
      "An onboarding that needs a human every time",
    ],
    scene: "/scenes/domain-b2b.webp",
    ready: false,
  },
];

export const defaultDomain = domains[0];
export const getDomain = (slug?: string) =>
  domains.find((d) => d.slug === slug) ?? defaultDomain;

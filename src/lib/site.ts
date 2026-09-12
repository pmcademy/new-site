export const site = {
  name: "PMcademy",
  domain: "pmcademy.com",
  url: "https://www.pmcademy.com",
  tagline: "Learn product management by doing the job",
  description:
    "Six free levels, Apprentice to Principal. Every lesson is a real case and something you build, with AI from lesson one. Pay only for the badge and the community.",
  dashboard: "https://dashboard.pmcademy.com/",
  /** TODO(launch): the Tally form for community / certificate interest. */
  tallyUrl: "https://tally.so/r/REPLACE_ME",
  social: {
    linkedin: "https://www.linkedin.com/company/pmcademy",
    instagram: "https://www.instagram.com/pmcademy/",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Levels", href: "/levels" },
  { label: "Level 0", href: "/level-0" },
  { label: "Resources", href: "/resources" },
  { label: "Community", href: "/community" },
];

/**
 * EXISTING PMCADEMY ROUTES, preserved.
 *
 * Every URL live on pmcademy.com today resolves here, so links, ads and search
 * results keep working through the revamp. Each renders a <LegacyPage> shell;
 * port the real content in by passing children. The route never changes.
 */
export const legacyRoutes: { href: string; label: string; note: string }[] = [
  {
    href: "/product-manager-foundations",
    label: "Product Manager Foundations",
    note: "Free certification. PM 101, business strategy, community access.",
  },
  {
    href: "/core-product-management",
    label: "Core Product Management",
    note: "Foundations plus 1:1 mentoring and job placement support.",
  },
  {
    href: "/tech-product-management",
    label: "AI + Tech Product Management",
    note: "Advanced programme integrating AI across the product lifecycle.",
  },
  {
    href: "/curriculum",
    label: "Curriculum",
    note: "Structured training modules across all levels.",
  },
  { href: "/pricing", label: "Pricing", note: "The badge and the community." },
  {
    href: "/case-studies",
    label: "Case Studies",
    note: "Product teardowns and alumni case studies.",
  },
  {
    href: "/roadmap",
    label: "AI + Tech PM Roadmap",
    note: "The skills map for an AI-era product manager.",
  },
  { href: "/about", label: "About Us", note: "Who runs PMcademy and why." },
  { href: "/contact", label: "Contact Us", note: "Get in touch." },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Course",
    items: [
      { label: "The six levels", href: "/levels" },
      { label: "Level 0, idea to MVP", href: "/level-0" },
      { label: "Start lesson one", href: "/levels/start" },
      { label: "Badge and community", href: "/community" },
    ],
  },
  {
    title: "Free",
    items: [
      { label: "Resource library", href: "/resources" },
      { label: "AI + Tech PM Roadmap", href: "/roadmap" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Curriculum", href: "/curriculum" },
    ],
  },
  {
    title: "Existing programmes",
    items: [
      { label: "Product Manager Foundations", href: "/product-manager-foundations" },
      { label: "Core Product Management", href: "/core-product-management" },
      { label: "AI + Tech Product Management", href: "/tech-product-management" },
    ],
  },
  {
    title: "PMcademy",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Dashboard", href: site.dashboard },
      { label: "LinkedIn", href: site.social.linkedin },
    ],
  },
];

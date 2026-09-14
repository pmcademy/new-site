import type { Badge } from "./types";

/**
 * Badges mark accomplishments, not attendance.
 *
 * Every one of these is earned by doing something a hiring manager would
 * recognise as work. There is deliberately no badge for logging in, for
 * visiting a page, or for being early.
 */
export const badges: Badge[] = [
  {
    id: "first-lesson",
    title: "First lesson",
    description: "You finished a lesson and shipped the artefact at the end of it.",
    rarity: "common",
    unlocks: "desk-papers",
  },
  {
    id: "first-case-study",
    title: "First case study",
    description: "You read a teardown properly, all the way to the end.",
    rarity: "common",
    unlocks: "shelf",
  },
  {
    id: "case-study-5",
    title: "Five case studies",
    description: "Five products taken apart. You are starting to see the patterns repeat.",
    rarity: "common",
  },
  {
    id: "case-study-10",
    title: "Ten case studies",
    description: "A real reading habit. The shelf needed a second row.",
    rarity: "uncommon",
    unlocks: "shelf-tier-2",
  },
  {
    id: "case-study-25",
    title: "Twenty five case studies",
    description: "You have read more product teardowns than most working PMs.",
    rarity: "rare",
    unlocks: "shelf-tier-3",
  },
  {
    id: "first-project",
    title: "First project",
    description: "You submitted something you made. This is the part that gets you hired.",
    rarity: "common",
    unlocks: "folders",
  },
  {
    id: "first-teardown",
    title: "First product teardown",
    description: "You pulled a real product apart and defended a point of view about it.",
    rarity: "uncommon",
  },
  {
    id: "first-article",
    title: "First published article",
    description: "You put your thinking somewhere public, with your name on it.",
    rarity: "uncommon",
    unlocks: "corkboard",
  },
  {
    id: "streak-3",
    title: "Three days running",
    description: "Three days of real work in a row.",
    rarity: "common",
    unlocks: "lamp",
  },
  {
    id: "streak-7",
    title: "Seven day streak",
    description: "A week without breaking the chain.",
    rarity: "uncommon",
    unlocks: "plant",
  },
  {
    id: "streak-14",
    title: "Fourteen day streak",
    description: "Two weeks. The plant has noticed.",
    rarity: "uncommon",
    unlocks: "plant-grown",
  },
  {
    id: "streak-30",
    title: "Thirty day streak",
    description: "A month of consistent work, which is rarer than any single achievement here.",
    rarity: "rare",
    unlocks: "framed-streak",
  },
  {
    id: "streak-100",
    title: "One hundred days",
    description: "Very few people get here.",
    rarity: "legendary",
    unlocks: "studio-upgrade",
  },
  {
    id: "level-1",
    title: "Apprentice",
    description: "Level 01 complete, capstone and all.",
    rarity: "uncommon",
    unlocks: "certificate-01",
  },
  {
    id: "level-2",
    title: "Practitioner",
    description: "Level 02 complete. You can run discovery without being told how.",
    rarity: "uncommon",
    unlocks: "certificate-02",
  },
  {
    id: "level-3",
    title: "Artisan",
    description: "Level 03 complete. You can make the thing, not just describe it.",
    rarity: "rare",
    unlocks: "certificate-03",
  },
  {
    id: "level-4",
    title: "Operator",
    description: "Level 04 complete. You shipped something to a real address.",
    rarity: "rare",
    unlocks: "certificate-04",
  },
  {
    id: "level-5",
    title: "Architect",
    description: "Level 05 complete. You can hold an AI feature to a standard.",
    rarity: "rare",
    unlocks: "certificate-05",
  },
  {
    id: "level-6",
    title: "Principal",
    description: "Level 06 complete. The whole ladder.",
    rarity: "legendary",
    unlocks: "certificate-06",
  },
  {
    id: "first-referral",
    title: "First referral",
    description: "Someone joined because you told them to.",
    rarity: "common",
    unlocks: "postcard",
  },
  {
    id: "portfolio-ready",
    title: "Portfolio ready",
    description:
      "Three projects, five case studies and a published article. Enough to send someone a link instead of a CV.",
    rarity: "rare",
    unlocks: "studio-light",
  },
];

export const badgeById = (id: string) => badges.find((b) => b.id === id);

/* -------------------------------------------------------------------------- */
/* The rules                                                                   */
/* -------------------------------------------------------------------------- */

export type AchievementFacts = {
  lessonsCompleted: number;
  levelsCompleted: number;
  completedLevelSlugs: string[];
  caseStudiesRead: number;
  projectsSubmitted: number;
  teardownsSubmitted: number;
  articlesPublished: number;
  referrals: number;
  currentStreak: number;
};

type Rule = { id: string; test: (f: AchievementFacts) => boolean };

export const achievementRules: Rule[] = [
  { id: "first-lesson", test: (f) => f.lessonsCompleted >= 1 },
  { id: "first-case-study", test: (f) => f.caseStudiesRead >= 1 },
  { id: "case-study-5", test: (f) => f.caseStudiesRead >= 5 },
  { id: "case-study-10", test: (f) => f.caseStudiesRead >= 10 },
  { id: "case-study-25", test: (f) => f.caseStudiesRead >= 25 },
  { id: "first-project", test: (f) => f.projectsSubmitted >= 1 },
  { id: "first-teardown", test: (f) => f.teardownsSubmitted >= 1 },
  { id: "first-article", test: (f) => f.articlesPublished >= 1 },
  { id: "streak-3", test: (f) => f.currentStreak >= 3 },
  { id: "streak-7", test: (f) => f.currentStreak >= 7 },
  { id: "streak-14", test: (f) => f.currentStreak >= 14 },
  { id: "streak-30", test: (f) => f.currentStreak >= 30 },
  { id: "streak-100", test: (f) => f.currentStreak >= 100 },
  { id: "level-1", test: (f) => f.completedLevelSlugs.includes("01") },
  { id: "level-2", test: (f) => f.completedLevelSlugs.includes("02") },
  { id: "level-3", test: (f) => f.completedLevelSlugs.includes("03") },
  { id: "level-4", test: (f) => f.completedLevelSlugs.includes("04") },
  { id: "level-5", test: (f) => f.completedLevelSlugs.includes("05") },
  { id: "level-6", test: (f) => f.completedLevelSlugs.includes("06") },
  { id: "first-referral", test: (f) => f.referrals >= 1 },
  {
    id: "portfolio-ready",
    test: (f) =>
      f.projectsSubmitted >= 3 && f.caseStudiesRead >= 5 && f.articlesPublished >= 1,
  },
];

/** Which badges the facts justify. Awarding is idempotent in the store. */
export function earnedBadgeIds(facts: AchievementFacts) {
  return achievementRules.filter((r) => r.test(facts)).map((r) => r.id);
}

import { badgeById } from "./badges";
import type { AchievementFacts } from "./badges";

/**
 * What is in the room.
 *
 * Almost nothing here is stored. The room is derived from what the learner has
 * done, so it can never disagree with the record, and importing or replaying
 * an activity history rebuilds the same room. Only genuinely manual unlocks
 * (a gift, a support fix, a seasonal item) are persisted.
 */

/** Objects that exist for everyone from the first minute. */
export const BASE_OBJECTS = [
  "desk",
  "chair",
  "laptop",
  "window",
  "notebook",
  "calendar",
  "shelf-empty",
  "rug",
];

export function unlockedObjects(
  facts: AchievementFacts,
  earnedBadges: string[],
  manual: string[] = []
) {
  const set = new Set<string>(BASE_OBJECTS);

  /* Badges that carry an object bring it with them. */
  for (const id of earnedBadges) {
    const unlock = badgeById(id)?.unlocks;
    if (unlock) set.add(unlock);
  }

  /* Counting unlocks, which grow rather than switch on. */
  if (facts.lessonsCompleted >= 1) set.add("desk-papers");
  if (facts.lessonsCompleted >= 5) set.add("sticky-notes");
  if (facts.lessonsCompleted >= 12) set.add("wall-flow");
  if (facts.caseStudiesRead >= 1) set.add("shelf");
  if (facts.caseStudiesRead >= 10) set.add("shelf-tier-2");
  if (facts.caseStudiesRead >= 25) set.add("shelf-tier-3");
  if (facts.projectsSubmitted >= 1) set.add("folders");
  if (facts.projectsSubmitted >= 3) set.add("folder-stack");
  if (facts.articlesPublished >= 1) set.add("corkboard");
  if (facts.referrals >= 1) set.add("postcard");
  if (facts.referrals >= 3) set.add("photo-strip");
  if (facts.referrals >= 5) set.add("community-pin");
  if (facts.levelsCompleted >= 1) set.add("badge-wall");
  if (facts.levelsCompleted >= 3) set.add("second-desk-lamp");

  /* The plant grows rather than multiplying. */
  if (facts.currentStreak >= 7) set.add("plant");
  if (facts.currentStreak >= 14) set.add("plant-grown");
  if (facts.currentStreak >= 30) set.add("plant-large");

  for (const m of manual) set.add(m);
  return [...set];
}

/**
 * Room stage, 0 to 4. Drives the overall furnishing, not individual objects.
 *
 * A new learner should walk into a room that is honestly bare. If everything
 * is there on day one, nothing that arrives later means anything.
 */
export function roomStage(f: AchievementFacts) {
  if (f.levelsCompleted >= 4 || f.projectsSubmitted >= 8) return 4;
  if (f.levelsCompleted >= 2 || f.projectsSubmitted >= 3) return 3;
  if (f.levelsCompleted >= 1) return 2;
  if (f.lessonsCompleted >= 1 || f.caseStudiesRead >= 1) return 1;
  return 0;
}

export const STAGE_LABEL = [
  "A desk, a chair and an empty shelf",
  "Getting started",
  "Taking shape",
  "A working practice",
  "A product studio",
];

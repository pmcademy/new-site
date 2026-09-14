/**
 * The learner workspace.
 *
 * A room that fills up as the learner actually does the work. Every object in
 * it is derived from a recorded activity, never decoration for its own sake.
 *
 * Read `docs/WORKSPACE.md` before changing any of this.
 */

/* -------------------------------------------------------------------------- */
/* Activity. The single stream everything else is derived from.                */
/* -------------------------------------------------------------------------- */

export type ActivityType =
  | "lesson_completed"
  | "case_study_read"
  | "project_submitted"
  | "article_published"
  | "badge_earned"
  | "referral"
  | "level_completed"
  | "peer_feedback";

/**
 * Activity types that count toward the learning streak.
 *
 * Logging in is deliberately not one of them. A streak has to mean the learner
 * did something, or it measures nothing and rewards opening a tab.
 */
export const MEANINGFUL: ActivityType[] = [
  "lesson_completed",
  "case_study_read",
  "project_submitted",
  "article_published",
  "peer_feedback",
];

export type LearningActivity = {
  id: string;
  type: ActivityType;
  /** Lesson key, case study slug, project id, and so on. */
  entityId?: string;
  /** Human readable, so the calendar can render without a second lookup. */
  label: string;
  /** ISO timestamp. */
  occurredAt: string;
  /** Local calendar day, YYYY-MM-DD, in the learner's own timezone. */
  day: string;
  minutes?: number;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/* Records                                                                     */
/* -------------------------------------------------------------------------- */

export type CaseStudyRead = {
  caseStudyId: string;
  title: string;
  /** Where the book links back to. */
  href: string;
  firstOpenedAt: string;
  completedAt?: string;
  readPercent: number;
};

export type ProjectType =
  | "teardown"
  | "research"
  | "prd"
  | "experiment"
  | "metrics"
  | "prototype"
  | "gtm"
  | "ai-concept"
  | "memo";

export type ProjectSubmission = {
  id: string;
  slug: string;
  title: string;
  type: ProjectType;
  status: "draft" | "submitted" | "reviewed";
  levelSlug?: string;
  summary?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  /** Hidden from the public profile when false. */
  visible: boolean;
};

export type PublishedWork = {
  id: string;
  title: string;
  url: string;
  platform: "medium" | "substack" | "linkedin" | "reddit" | "other";
  createdAt: string;
  visible: boolean;
};

export type UserBadge = {
  badgeId: string;
  earnedAt: string;
  sourceEntityId?: string;
};

export type Referral = {
  id: string;
  code: string;
  createdAt: string;
  convertedAt?: string;
};

/* -------------------------------------------------------------------------- */
/* Profile                                                                     */
/* -------------------------------------------------------------------------- */

export type WorkspaceVisibility = "private" | "community" | "public";

export type WorkspaceProfile = {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  visibility: WorkspaceVisibility;
  /** Object ids the learner has chosen to hide from the public view. */
  hidden: string[];
  /** null follows the clock, otherwise the learner has pinned a time of day. */
  timeOverride: TimeOfDay | null;
};

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

/* -------------------------------------------------------------------------- */
/* What is actually stored                                                     */
/* -------------------------------------------------------------------------- */

export type WorkspaceRecord = {
  version: 1;
  profile: WorkspaceProfile;
  activity: LearningActivity[];
  caseStudies: CaseStudyRead[];
  projects: ProjectSubmission[];
  published: PublishedWork[];
  badges: UserBadge[];
  referrals: Referral[];
  /** Only unlocks that cannot be derived from activity live here. */
  manualUnlocks: string[];
};

/* -------------------------------------------------------------------------- */
/* What the room renders from                                                  */
/* -------------------------------------------------------------------------- */

export type WorkspaceState = {
  profile: WorkspaceProfile;
  progress: {
    lessonsCompleted: number;
    levelsCompleted: number;
    currentLevelSlug?: string;
    currentLevelRank?: string;
    nextLesson?: { levelSlug: string; slug: string; title: string; minutes: number };
    completionPercent: number;
  };
  streak: {
    current: number;
    longest: number;
    activeToday: boolean;
    /** The last 91 days, oldest first, for the calendar. */
    days: { day: string; count: number }[];
  };
  caseStudies: CaseStudyRead[];
  projects: ProjectSubmission[];
  published: PublishedWork[];
  badges: { id: string; title: string; description: string; rarity: Rarity; earnedAt: string }[];
  referrals: { total: number; converted: number };
  activity: LearningActivity[];
  environment: {
    /** 0 to 4. Drives how furnished the room is. */
    stage: number;
    unlocked: string[];
    timeOfDay: TimeOfDay;
  };
  totals: {
    lessons: number;
    minutesLearned: number;
  };
};

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type Badge = {
  id: string;
  title: string;
  description: string;
  rarity: Rarity;
  /** The room object this badge lights up, if any. */
  unlocks?: string;
};

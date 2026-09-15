import { zonedDay } from "./validation";
import { levels, levelLessons, totalLessons } from "@/lib/course";

import { calendarDays, computeStreak, minutesLearned, timeOfDay } from "./activity";
import { badgeById, earnedBadgeIds, type AchievementFacts } from "./badges";
import { unlockedObjects, roomStage } from "./unlocks";
import type { WorkspaceRecord, WorkspaceState } from "./types";

/**
 * One function turns everything the learner has done into the state the room
 * renders from. The scene never queries a feature directly, and no component
 * recomputes a streak. If a number appears twice on screen it came from here
 * once.
 */
export function buildWorkspaceState(
  record: WorkspaceRecord,
  /** `${levelSlug}/${lessonSlug}` keys, straight from lib/progress. */
  done: string[]
): WorkspaceState {
  const valid = new Set(levels.flatMap(l=>levelLessons(l).map(x=>`${l.slug}/${x.slug}`)));
  const doneSet = new Set(done.filter(key=>valid.has(key)));
  const today = zonedDay(new Date(), record.profile.timezone);

  /* ------------------------------------------------------------- progress */
  const completedLevelSlugs = levels
    .filter((l) => {
      const all = levelLessons(l);
      return all.length > 0 && all.every((x) => doneSet.has(`${l.slug}/${x.slug}`));
    })
    .map((l) => l.slug);

  /* The first lesson the learner has not finished, walking the ladder in
     order. That is what the laptop offers as the next thing to do. */
  let nextLesson: WorkspaceState["progress"]["nextLesson"];
  let currentLevelSlug: string | undefined;
  for (const level of levels) {
    const pending = levelLessons(level).find(
      (x) => !doneSet.has(`${level.slug}/${x.slug}`)
    );
    if (pending) {
      currentLevelSlug = level.slug;
      nextLesson = {
        levelSlug: level.slug,
        slug: pending.slug,
        title: pending.title,
        minutes: pending.minutes,
      };
      break;
    }
  }

  const currentLevel = levels.find((l) => l.slug === currentLevelSlug);
  const lessonsCompleted = doneSet.size;

  /* --------------------------------------------------------------- streak */
  const streak = computeStreak(record.activity, today);

  /* --------------------------------------------------------------- badges */
  const facts: AchievementFacts = {
    lessonsCompleted,
    levelsCompleted: completedLevelSlugs.length,
    completedLevelSlugs,
    caseStudiesRead: record.caseStudies.filter((c) => c.completedAt).length,
    projectsSubmitted: record.projects.filter((p) => p.status !== "draft").length,
    teardownsSubmitted: record.projects.filter(
      (p) => p.type === "teardown" && p.status !== "draft"
    ).length,
    articlesPublished: record.published.length,
    referrals: record.referrals.filter(r=>r.convertedAt).length,
    currentStreak: streak.longest,
  };

  /* Everything the learner qualifies for, whether or not the store has caught
     up. The store is the record of when each was earned; this is the truth of
     what is deserved, so the room is never wrong after an import or a reset. */
  const qualified = new Set([...earnedBadgeIds(facts), ...record.badges.map(b=>b.badgeId)]);
  const earnedAt = new Map(record.badges.map((b) => [b.badgeId, b.earnedAt]));

  const badgeList = [...qualified]
    .map((id) => {
      const meta = badgeById(id);
      if (!meta) return null;
      return {
        id,
        title: meta.title,
        description: meta.description,
        rarity: meta.rarity,
        earnedAt: earnedAt.get(id) ?? new Date().toISOString(),
      };
    })
    .filter(Boolean) as WorkspaceState["badges"];

  badgeList.sort((a, b) => b.earnedAt.localeCompare(a.earnedAt));

  /* ----------------------------------------------------------- the room */
  const unlocked = unlockedObjects(facts, [...qualified], record.manualUnlocks);

  return {
    profile: record.profile,
    progress: {
      completedChapters: levels.flatMap(l=>l.chapters.filter(c=>c.lessons.length>0&&c.lessons.every(x=>doneSet.has(`${l.slug}/${x.slug}`))).map(c=>({id:`${l.slug}/${c.slug}`,title:c.title,levelSlug:l.slug}))),
      lessonsCompleted,
      levelsCompleted: completedLevelSlugs.length,
      currentLevelSlug,
      currentLevelRank: currentLevel?.rank,
      nextLesson,
      completionPercent: totalLessons
        ? Math.round((lessonsCompleted / totalLessons) * 100)
        : 0,
    },
    streak: { ...streak, days: calendarDays(record.activity, 91, today) },
    caseStudies: [...record.caseStudies]
      .filter((c) => c.completedAt)
      .sort((a, b) => (a.completedAt ?? "").localeCompare(b.completedAt ?? "")),
    projects: [...record.projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    published: [...record.published].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    badges: badgeList,
    referrals: {
      total: record.referrals.length,
      converted: record.referrals.filter((r) => r.convertedAt).length,
    },
    activity: [...record.activity].sort((a, b) =>
      b.occurredAt.localeCompare(a.occurredAt)
    ),
    environment: {
      stage: roomStage(facts),
      unlocked,
      timeOfDay: record.profile.timeOverride ?? timeOfDay(),
    },
    totals: {
      lessons: totalLessons,
      minutesLearned: minutesLearned(record.activity),
    },
  };
}

/**
 * The public view of a workspace: the same state with anything the learner
 * chose to hide stripped out, and the course controls dropped.
 */
export function publicView(state: WorkspaceState): WorkspaceState {
 const hidden = new Set(state.profile.hidden);
 const projects = state.projects.filter(p=>p.visible && p.status !== 'draft' && !hidden.has(p.id));
 const published = state.published.filter(p=>p.visible && !hidden.has(p.id));
 const caseStudies = state.caseStudies.filter(p=>!hidden.has(p.caseStudyId));
 const badges = state.badges.filter(p=>!hidden.has(p.id));
 const allowed = new Set([...projects.map(p=>p.id), ...published.map(p=>p.id), ...caseStudies.map(p=>p.caseStudyId)]);
 return {...state,profile:{...state.profile,hidden:[],timezone:undefined},progress:{...state.progress,nextLesson:undefined},projects,published,caseStudies,badges,
 activity:state.activity.filter(a=>a.entityId && allowed.has(a.entityId)).slice(0,25).map(a=>({...a,metadata:undefined})),referrals:{total:state.referrals.converted,converted:state.referrals.converted}};
}

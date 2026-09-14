/**
 * Where everything sits in the room.
 *
 * One coordinate space, 1200 by 675, matching the room art. Every object is
 * placed in it and the whole scene scales as one, so a position set here holds
 * at any width. Nothing in a component hardcodes a pixel.
 *
 * Objects come in two kinds:
 *
 *   image    a file in /public/workspace, one per lighting state. Swap the
 *            path for commissioned art and nothing else changes.
 *   dynamic  drawn from data, because it carries the learner's own content:
 *            book spines with titles, pinned articles, certificates.
 */

export type PanelId =
  | "mentor"
  | "cases"
  | "calendar"
  | "projects"
  | "published"
  | "badges"
  | "streak"
  | "share";

export type SceneObject = {
  id: string;
  /** Base file name in /public/workspace, without the state suffix. */
  art?: string;
  /** A dynamic object is rendered by the scene, not loaded from a file. */
  dynamic?: "bookshelf" | "corkboard" | "certificates" | "calendar";
  /** Position and size in the 1200 x 675 room space. */
  x: number;
  y: number;
  w: number;
  h?: number;
  /** Painter order. The room is 0. */
  z: number;
  /** The unlock this object waits for. Omitted means always present. */
  requires?: string;
  /** Clicking opens this panel. Objects with no panel are scenery. */
  panel?: PanelId;
  /** What a screen reader and the tooltip say. */
  label: string;
  /** One line of context under the label in the tooltip. */
  hint?: string;
};

export const ROOM_W = 1200;
export const ROOM_H = 675;

export const scene: SceneObject[] = [
  /* ------------------------------------------------------------- the wall */
  {
    id: "calendar",
    dynamic: "calendar",
    x: 396,
    y: 146,
    w: 70,
    h: 92,
    z: 2,
    panel: "calendar",
    label: "Learning calendar",
    hint: "Every day you did something that counted",
  },
  {
    id: "corkboard",
    dynamic: "corkboard",
    x: 482,
    y: 130,
    w: 262,
    h: 164,
    z: 2,
    panel: "published",
    label: "Corkboard",
    hint: "Work you published, pinned up",
  },
  {
    id: "shelf",
    dynamic: "bookshelf",
    x: 860,
    y: 140,
    w: 264,
    h: 195,
    z: 2,
    panel: "cases",
    label: "Case study shelf",
    hint: "One book for every teardown you finished",
  },
  {
    id: "badge-wall",
    dynamic: "certificates",
    x: 470,
    y: 316,
    w: 500,
    h: 76,
    z: 2,
    panel: "badges",
    label: "Level certificates",
    hint: "One per level you finished",
  },
  {
    id: "postcard",
    art: "postcard",
    x: 762,
    y: 196,
    w: 76,
    z: 2,
    requires: "postcard",
    panel: "share",
    label: "Referral postcard",
    hint: "Someone joined because of you",
  },
  {
    id: "framed-streak",
    art: "trophy",
    x: 776,
    y: 116,
    w: 62,
    z: 2,
    requires: "framed-streak",
    panel: "streak",
    label: "Thirty day streak, framed",
  },

  /* ------------------------------------------------------------- the desk */
  {
    id: "papers",
    art: "papers",
    x: 424,
    y: 344,
    w: 132,
    z: 4,
    requires: "desk-papers",
    panel: "calendar",
    label: "Finished work",
    hint: "What you have completed so far",
  },
  {
    id: "laptop",
    art: "laptop",
    x: 566,
    y: 258,
    w: 208,
    z: 5,
    panel: "mentor",
    label: "Laptop",
    hint: "Pick up where you left off",
  },
  {
    id: "notebook",
    art: "notebook",
    x: 782,
    y: 348,
    w: 100,
    z: 4,
    panel: "projects",
    label: "Notebook",
    hint: "Your projects",
  },
  {
    id: "mug",
    art: "mug",
    x: 526,
    y: 344,
    w: 54,
    z: 6,
    label: "Coffee",
  },
  {
    id: "stickies",
    art: "stickies",
    x: 940,
    y: 336,
    w: 76,
    z: 4,
    requires: "sticky-notes",
    label: "Sticky notes",
  },
  {
    id: "lamp",
    art: "lamp",
    x: 848,
    y: 264,
    w: 120,
    z: 3,
    requires: "lamp",
    label: "Desk lamp",
    hint: "Three days running",
  },

  /* ------------------------------------------------------------ the floor */
  {
    id: "plant",
    art: "plant1",
    x: 226,
    y: 468,
    w: 96,
    z: 6,
    requires: "plant",
    panel: "streak",
    label: "Your streak plant",
    hint: "It grows while the streak holds",
  },
  {
    id: "plant-grown",
    art: "plant2",
    x: 214,
    y: 418,
    w: 118,
    z: 6,
    requires: "plant-grown",
    panel: "streak",
    label: "Your streak plant",
    hint: "Fourteen days in",
  },
  {
    id: "plant-large",
    art: "plant3",
    x: 196,
    y: 340,
    w: 152,
    z: 6,
    requires: "plant-large",
    panel: "streak",
    label: "Your streak plant",
    hint: "Thirty days and still going",
  },
  {
    id: "folders",
    art: "folders",
    x: 986,
    y: 512,
    w: 148,
    z: 6,
    requires: "folders",
    panel: "projects",
    label: "Project folders",
    hint: "Everything you have submitted",
  },
];

/**
 * The plant is one object at three sizes, not three plants. Only the largest
 * unlocked size is drawn, which is why these are listed most advanced first.
 */
const EXCLUSIVE: string[][] = [["plant-large", "plant-grown", "plant"]];

export function visibleObjects(unlocked: string[]) {
  const has = new Set(unlocked);
  const suppressed = new Set<string>();

  for (const group of EXCLUSIVE) {
    const winner = group.find((id) => has.has(id));
    if (!winner) continue;
    for (const id of group) if (id !== winner) suppressed.add(id);
  }

  return scene.filter(
    (o) => (!o.requires || has.has(o.requires)) && !suppressed.has(o.id)
  );
}

export const artSrc = (base: string, dark: boolean) =>
  `/workspace/${base}-${dark ? "night" : "day"}.svg`;

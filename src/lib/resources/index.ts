import { cases } from "./cases";
import { promptPacks } from "./prompts";
import { templates } from "./templates";

export * from "./types";
export { cases, getCase } from "./cases";
export { promptPacks } from "./prompts";
export { templates } from "./templates";

export const getTemplate = (slug: string) =>
  templates.find((t) => t.slug === slug);
export const getPack = (slug: string) => promptPacks.find((p) => p.slug === slug);

export const totalPrompts = promptPacks.reduce(
  (a, p) => a + p.prompts.length,
  0
);

export const resourceCounts = {
  templates: templates.length,
  packs: promptPacks.length,
  prompts: totalPrompts,
  cases: cases.length,
};

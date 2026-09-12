# PMcademy

Next.js 16 (App Router) + TypeScript + Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # typechecks + prerenders 21 routes
```

---

## What this is

A learning platform built around one idea: **you don't study product
management, you do the job from lesson one.** Six phases, each a certification
the learner earns by shipping a capstone. Phase 01 is free behind a form; one
payment unlocks the rest, permanently.

Every one of the 49 missions has the same four parts, and that shape is the
whole pedagogy:

1. **The brief** — a real situation with a constraint and a clock.
2. **The AI move** — how you use a model to do the work, *and the specific place
   it fails*, which the learner has to catch.
3. **What you ship** — a portfolio artefact.
4. **What you learn** — the concept, named only after it was needed.

---

## Where to change things

| I want to… | Edit |
| --- | --- |
| **Change any colour** | `src/app/globals.css` → `@theme` and the two `:root` blocks. That is the only place hexes live. |
| Change fonts | `src/app/globals.css` — the Google Fonts `@import` on line 1 and `--sans` / `--serif`. |
| **Edit the curriculum** — any phase, mission, brief, capstone, outcome | `src/lib/curriculum.ts`. Everything on the site derives from this one file, including the counts in the FAQ and the six static phase pages. |
| Add or remove a phase | Add to `phases` in `src/lib/curriculum.ts`. The route, the card, the nav counts and the prev/next links all follow automatically. |
| Nav, footer, Tally URL, preserved-route list | `src/lib/site.ts` |
| Resources | `src/lib/resources.ts` |

---

## Design system

Flat palette, no gradients anywhere. Warm paper ground (`#FBFAF8`), brand navy
(`#0B2C86`) as a solid for primary actions, hairline borders, generous
whitespace. Dark mode is a warm charcoal, not navy-black.

Type is **Schibsted Grotesk** throughout — the closest open face to Styrene,
which is what gives Claude's site its warmth — with **Instrument Serif** used
for exactly one thing: the phase numerals, as chapter markers.

**Light is the default and the OS preference does not override it.** The switch
in the nav is the only thing that changes the theme, and the choice persists in
`localStorage`. An inline script in `layout.tsx` applies it before first paint,
so there's no flash.

**One cascade rule worth knowing:** all component CSS lives inside
`@layer components`. Without that, `.btn` beats `lg:hidden` and responsive
visibility silently stops working. If you add component classes, put them in
that layer.

Motion is one `IntersectionObserver` in `src/components/motion/Reveal.tsx` — a
short fade-and-rise on enter. No animation library. CSS holds the hidden state,
and the `.no-js` rule leaves everything visible if JS never runs.

---

## Routes

```
/                              home
/certifications                the six phases
/certifications/[slug]         01–06, prerendered
/resources                     free resource library
```

**Preserved routes.** Every URL live on pmcademy.com today still resolves, so
links, ads and search results keep working:

`/product-manager-foundations` · `/core-product-management` ·
`/tech-product-management` · `/curriculum` · `/pricing` · `/case-studies` ·
`/roadmap` · `/about` · `/contact`

Each renders `<LegacyPage>`. To port real content in, pass children:

```tsx
export default function Page() {
  return <LegacyPage href="/pricing">{/* real content */}</LegacyPage>;
}
```

The route never has to change.

---

## Before launch — wire these

1. **The Tally form.** `site.tallyUrl` in `src/lib/site.ts` is
   `https://tally.so/r/REPLACE_ME`. It gates free Phase 01 access and is linked
   from the homepage CTA and the Phase 01 capstone.
2. **Pricing and checkout.** There are no numbers anywhere on purpose. The
   "Unlock everything" button currently points at `/certifications`.
3. **Student photos.** `public/img/portrait-0..3.webp` and `avatar-0..5.webp`
   are placeholder frames. Drop real photos in at the same filenames and the
   layout doesn't change.
4. **Testimonials.** `quotes` in `src/lib/curriculum.ts` is sample copy and the
   names read "Sample Name" deliberately. Replace with real quotes and real
   names — don't ship invented ones.
5. **Resource assets.** Cards in `/resources` link to anchors, not files.
6. **Lesson pages.** Missions are listed but there's no
   `/certifications/[slug]/[mission]` yet — that's the next build.

---

## Suggested next phases

1. ~~Design system, curriculum, six certification pages, preserved routes~~ ✅
2. Individual mission pages + progress tracking
3. Auth, tied to the existing dashboard
4. Payment + entitlement gating on phases 02–06
5. The AI simulations (the seven role-play missions need a real chat surface)
6. Port the existing certification pages into their preserved routes

# Immersive learner workspace

Built against pmcademy/new-site main at `8b7f4bd41f20794ba68286ea5bac0a77be5c56ae` on 15 September 2026.

## Install

1. Extract this archive into the project root, preserving paths. It contains changed/new files only. No files need deleting and no new runtime dependencies are required.
2. Apply `supabase/migrations/202609150001_workspace.sql` in your existing Supabase project's SQL Editor. It depends on the existing `auth.users` and `public.lesson_progress` tables. Apply it before deploying the application. The migration is repeatable.
3. Keep your existing authentication configuration. Set these deployment environment variables:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_KEY
   SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
   NEXT_PUBLIC_SITE_URL=https://pmcademy.com
   ```

   Never prefix the service-role key with `NEXT_PUBLIC_`. Workspace database tables are private to the server. API routes validate the signed-in user and scope every operation to that account.
4. Run `npm ci` and `npm run build`, then deploy through your usual process.
5. Sign in, open `/workspace`, save a note, reload, and check a second device. Complete a lesson and revisit the room. Test sharing with a separate signed-out browser and a second account.

No migration has been applied to your live Supabase project and no GitHub branch or deployment was changed.

## Experience

The study is the dashboard: the laptop resumes learning, notebook holds private notes, books open completed case studies, folders hold projects, corkboard holds articles, the calendar shows meaningful activity, framed study milestones show achievements, plants grow with sustained learning, and the door opens the curriculum. Completed chapters create an archive on the desk. Empty accounts start with fewer objects.

Books can be paged through on the shelf and the full collection is available in its panel. Mobile users can pan the room or use the object index. Dialogs support Escape, focus restoration and mobile layouts. Pause controls and reduced-motion preferences disable decorative motion. Day/night lighting follows the learner's saved timezone with an explicit override.

The mentor panel gives guidance based on real progress and a prompt learners can take to an AI tool. It does not call an LLM or invent mentor replies.

## Persistence and sharing

- `/api/workspace` stores account-scoped projects, articles, notes, profile preferences and case-reading records in Supabase. Concurrent writes use a revision check and retry.
- Existing synced lesson progress remains authoritative. The migration records new lesson completions idempotently. Historical completions without stored timestamps count toward progress but do not create invented streak dates.
- Case studies count after 45 seconds of active visible reading and at least 70% scroll, or an explicit mark-read action. Reading detection is a learning convenience, not fraud-proof assessment.
- Study milestones are distinct from reviewed capstone credentials. Earned streak milestones remain earned after a streak ends.
- Profiles start private. Community profiles require sign-in; public profiles are accessible anonymously. Only public profiles receive indexable metadata. `/u/[username]` and project links are stable server-resolved URLs.
- Public projections exclude notes, draft projects, hidden objects, referral identities and private activity metadata. Shared URLs no longer embed a browser snapshot.
- Invite codes can be applied by accounts created within seven days, before their first lesson. A conversion is recorded only after that referred account completes a lesson. Self-referral and duplicate claims are rejected. This does not add email invitations or a monetary reward system.
- The old browser-only workspace data is not automatically imported because it was not reliably scoped to a signed-in account. Existing local data is left untouched. Re-add old project/article entries to the correct account; server-synced lessons are retained.

## 3D workspace

The active room is now rendered from `workspace-day.glb`, `workspace-night.glb` and `reward-kit.glb` in `public/models/workspace`. Three.js loads the correct lighting model and clones reward objects into the named attachment points. The supplied files are lightweight, at roughly 2,208 triangles for the room and 1,112 triangles for the reward kit. Mobile rendering caps device pixel ratio at 1.5 and keeps real-time shadows disabled.

The room is populated from the same server-authoritative workspace state used by the panels. Case studies create books, projects create folders, published work creates corkboard papers, meaningful learning days fill calendar cells, achievements create trophies and certificates, and a sustained streak grows the plant. The complete signed-out room is explicitly labelled as a preview and does not award or persist sample progress.

Mouse, trackpad and touch gestures rotate and zoom the camera within constrained angles. Signed-in and public workspaces have an accessible object-navigation row as an alternative to 3D picking. The signed-out preview allows camera exploration but locks object actions. A modal appears on entry and links to `/signin?next=/workspace`.

`public/workspace/study-interior.webp` remains only as the WebGL/model-loading fallback. The original Blender assembly source is in the separate model-authoring package supplied for this update, not in the runtime web bundle.

## Verification and limits

- Production build and scoped workspace ESLint checks passed.
- Five state/privacy/validation tests passed in `tests/workspace.test.ts` using a temporary `tsx` runner. To rerun: `npx --yes --package=tsx tsx --test tests/workspace.test.ts`.
- The migration was exercised twice against a local PostgreSQL-compatible PGlite database, including idempotent lesson events, referral conversion, self-referral rejection and anonymous-access denial.
- Browser visual/interaction tests could not run because a Chromium runtime was unavailable. Responsive and WebGL fallback rules are implemented but still need checking on your real browsers and representative mobile hardware.
- Live Supabase authentication, persistence and deployment need a smoke test against your configured project after the migration.
- Peer feedback, automatic weather, a live AI mentor and verified project reviews remain future integrations. Project submission here records a project in the workspace; it does not replace the existing capstone review flow.

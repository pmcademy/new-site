# PMcademy 3D workspace update

Apply this package after the previous Immersive Workspace and Workspace Preview deliveries. Copy the files into the project root while preserving paths, then run:

```bash
npm install
npm run build
```

## What changed

- The illustrated workspace scene is replaced by the supplied modular GLB room.
- Three.js and its TypeScript definitions are included in `package.json` and the lockfile.
- Signed-in rooms are populated from real PMcademy workspace state.
- Completed case studies create shelf books.
- Projects create desk folders.
- Published articles create corkboard papers.
- Meaningful activity creates calendar markers.
- Badges and completed levels create trophies, a badge and a certificate.
- Seven, fourteen and thirty-day personal bests grow the streak plant through three stages.
- Fully developed rooms receive the furniture reward.
- Day and night controls select the matching GLB without changing learner data.
- Learners can orbit and zoom within constrained camera limits. Object clicks open the existing workspace panels.
- The object navigation row remains available for keyboards and assistive technology.
- Signed-out visitors see every reward slot populated in a clearly labelled sample room. They may move the camera but cannot open any objects.
- A login modal opens automatically. Dismissing it leaves a persistent login prompt over the preview.
- Public learner rooms remain viewable and only expose data already allowed by the existing public projection.

## New model locations

```text
public/models/workspace/workspace-day.glb
public/models/workspace/workspace-night.glb
public/models/workspace/reward-kit.glb
```

The GLBs are self-contained and do not need external textures at runtime. Keep the original `learner-workspace` authoring package separately if you want to regenerate the `.blend` or edit attachment slots later.

## Deployment notes

No additional Supabase migration or environment variable is required for this update. The earlier immersive workspace migration must still be installed. The model files are served as ordinary static assets, so confirm that your CDN does not block `.glb` files and that they return `200` after deployment.

The existing raster room stays in the package as a fallback for browsers without WebGL or when a GLB cannot load. The renderer caps pixel density, disables shadows and disposes models, materials and textures when the scene unmounts.

## Verification

- Next.js production build passed for all 201 generated pages.
- Scoped ESLint passed for the changed workspace components.
- All three GLBs passed structural validation for headers, buffers, finite vertex positions, indices, unique names, required attachment slots and size.
- A production server smoke test returned the workspace page and served the day GLB at its exact expected size of 968,068 bytes.
- Visual browser automation was not available in the build environment. Check Chrome, Safari and a real mobile device before production release, especially orbit gestures, the login modal, day/night exposure and WebGL fallback.

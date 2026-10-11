# MORPH LAB

A local-first, browser-playable 3D avatar RPG. Create a fully clothed avatar from a local face reference and character choices, then explore three gothic worlds, collect shards and relics, complete quests, and save progression in browser storage.

## Run locally

```bash
pnpm install
pnpm build
pnpm preview --host 0.0.0.0 --port 4173
```

Open `http://localhost:4173` (or the live preview URL shared with you).

## Controls

- **Desktop:** WASD or arrow keys to move; drag on the world to look; use the UI to change worlds, outfits, quests, and settings.
- **Touch:** on-screen joystick to move; **DASH** for a burst; drag on the world to look.
- **Gamepad:** left stick moves, right stick looks, and the standard face/shoulder buttons provide dash, pause, and interaction actions.
- Upload a face reference from the Character Lab. It is cropped in-browser and held in memory only; it is not uploaded or included in the save.

## Implemented systems

- Character creation with local face crop, safe avatar name, body, hair, outfit, expression, and personality choices.
- Three explorable worlds with distinct geometry, lighting, weather, companion dialogue, shards, and relic collectibles.
- Local progression: XP, levels, gold, quest rewards, achievements, wardrobe state, visited worlds, and versioned save migration.
- Responsive desktop and Android-first touch UI with reduced-motion and low-power settings.
- Installable PWA with a service worker that caches the app shell and runtime assets for offline reopening after the first successful load.

## Validation

- `pnpm build` — production build succeeds.
- `pnpm exec tsc --noEmit` — TypeScript diagnostics pass.
- `pnpm test:profile` — profile/save tests pass.
- `pnpm smoke` — desktop, Android viewport, upload, save/reload, touch, wardrobe, world interactions, manifest icon, and service-worker files pass.

## Honest scope and privacy

This is a static, single-player browser game. Character progression and preferences are stored locally. The photo reference is cropped in the browser and kept in session memory only. The playable avatar uses procedural 3D geometry plus the local face texture; there is no cloud account, multiplayer transport, native APK wrapper, remote AI image-to-3D conversion, or paid AI dependency. PWA installation and offline shell caching are implemented, but browser support and first-load caching rules still apply.

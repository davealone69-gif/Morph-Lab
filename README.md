# MORPH LAB

**MORPH LAB** is a browser-based, single-player 3D exploration RPG built with Three.js and Rapier. It runs as a static web app and is designed to be installable as a Progressive Web App (PWA) on Android.

> **Honest feature boundary:** the avatar is procedurally built from in-app geometry and selected style options. An uploaded image is cropped locally and used as a flat face-reference texture; the app does **not** use AI to reconstruct a 3D face or generate a photorealistic avatar. There is no backend, account system, online multiplayer, or AI-based avatar reconstruction. A native Android WebView wrapper is included; it bundles the web game locally.

## Implemented in source

- Three gothic exploration arenas with distinct palettes, lighting, weather defaults, pickups, and companion names.
- Procedural, fully clothed avatar with selectable body type, hairstyle, outfit, expression, and personality.
- Local image selection and crop, applied as a face texture; no upload or server request is part of this feature.
- Keyboard movement, touch joystick, drag-to-look, dash, and third-person camera.
- Shards, relics, XP/levels, gold, quests, achievements, and browser-local profile persistence.
- Wardrobe and world selection, day/night phase, weather selection, companion speech through device speech synthesis, and synthesized sound effects.
- Reduced-motion and low-power options.
- PWA manifest, service worker, responsive layout, and bundled fonts.

## Not implemented / not claimed

- AI face reconstruction, photorealistic 3D avatar generation, or a generative AI service.
- Signed production APK/AAB or Play Store release. CI builds an unsigned-for-Play debug APK for installation and testing.
- Remote server, cloud saves, account/login, online multiplayer, or remote NPC AI.
- Guaranteed offline first launch. The service worker caches a small app shell after a successful online load; verify offline behavior on the target browser/device.
- Physical Android-device runtime verification from the repository alone.

## Build and test

Requires Node.js 22 and pnpm 10.18.0.

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
pnpm smoke
```

- `typecheck` runs TypeScript without emitting files.
- `test` runs the Vitest unit tests.
- `build` restores any pinned local assets, builds the Vite app, checks size budgets, and assembles the static share site.
- `smoke` serves the production output and uses Playwright/Chromium to exercise the current MORPH LAB navigation and core controls. Install Chromium first with `pnpm exec playwright install chromium`.

The GitHub Actions workflow runs typecheck, unit tests, production build, and browser smoke checks, uploads the web build and screenshots, and independently builds an installable Android debug APK artifact. Download `morph-lab-android-debug-apk` from the workflow run. This debug APK is for testing, not Play Store release. A green workflow does not substitute for testing on a real Android phone.

## Project structure

- `src/main.ts`: current MORPH LAB app, procedural scene, avatar, interactions, and game loop.
- `src/engine/profile.ts`: validated versioned local profile, quest definitions, and progression helpers.
- `src/game/`, `src/engine/`, `src/ui/ui.ts`: retained starter-game modules and tests. The legacy `src/ui/ui.ts` UI is not the current MORPH LAB interface.
- `src/styles/main.css`: responsive layout and visual styling.
- `public/manifest.webmanifest`, `public/sw.js`: PWA metadata and small offline shell cache.
- `tests/`: unit tests.

## Controls

- Keyboard: WASD/arrows to move; Escape pauses.
- Touch: left joystick to move, drag the 3D viewport to look, DASH button to dash.
- Use the top navigation or bottom mobile navigation to switch between Lab, Worlds, Wardrobe, Quests, and Settings.

## Dependencies and assets

Three.js is MIT licensed; Rapier is Apache-2.0. Fonts and their license are bundled in `public/fonts/`. The build does not require Manus project-storage credentials; the app's favicon is a checked-in SVG.

## Android APK

The Android project lives in `android/`. The APK packages the Vite output inside a native Android WebView, so the core game can launch without fetching the hosted site. The image-reference picker uses Android's document picker. Build instructions are in [android/README.md](android/README.md).

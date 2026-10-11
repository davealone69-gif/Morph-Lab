# MORPH LAB expansion plan

## Product
MORPH LAB is an English-only, Android-first, local-first Three.js avatar RPG. The player can bring a face reference into memory for a session, shape a fully clothed procedural avatar, equip style sets, explore three gothic worlds without combat, collect shards and relics, complete quests, gain levels, hear a local companion, and install the game as an offline-capable PWA.

## Expansion delivered
- Character creator: local face crop, safe avatar name, body type, hairstyle, outfit, expression, personality and mature-atmosphere setting.
- Wardrobe: four functional outfit loadouts including Crimson Jester, whose burgundy/black/brass palette was informed by the supplied outfit reference image without copying a real-person likeness.
- RPG progression: level/xp, gold, persistent shards, relic collectibles, quests, achievements, companion dialogue and deterministic local save migration.
- Worlds: Blood Moon Garden, Ashen Conservatory and Velvet Ruins. Each has its own palette, layout, pickup route, relics, companion name, weather default and dynamic lighting.
- Exploration: third-person movement, touch joystick, dash, drag-to-look, keyboard arrows/WASD, pickup collection, boundary collision, floating companion wisps and local WebAudio/SpeechSynthesis enhancements.
- Android/PWA: responsive portrait layout, bottom navigation, safe-area padding, manifest, custom favicon and a service worker with a small offline shell cache.
- Accessibility/device options: reduced motion, low-power rendering, local audio toggle, mature-atmosphere toggle, readable labels, semantic buttons and touch-first controls.

## Design
- **Movement:** dark romantic sci-fi / gothic arcade, expanded into a quiet exploration RPG.
- **Principles:** high-contrast glass panels, neon blood-moon accents, tactile thumb controls, immediate feedback, respectful local-only image handling.
- **Color philosophy:** ink-black space gives the avatar visual focus; pink represents transformation; violet represents the synthetic lab; mint signals local safety and completion.
- **Layout:** asymmetric desktop lab / world / dossier columns, collapsing into a thumb-friendly portrait stack with bottom navigation on Android.
- **Signature elements:** pink diamond shards, scanline/crosshair overlay, star/shard MORPH LAB mark and floating companion wisps.
- **Interaction:** the loop is create → equip → enter threshold → explore → collect → progress → save.
- **Animation:** gentle avatar hover, low-cost pickup rotation, companion drift, day/night lighting, weather particles and reduced-motion fallbacks.
- **Typography:** bundled Manus display/body fonts, uppercase micro-labels, tight display headlines.
- **Brand essence:** a private image-to-avatar world for people who want to play their own imagined characters; **mysterious, tactile, empowering**.
- **Voice:** concise and cinematic. “Make the impossible playable.” / “A shard remembers every hand.”
- **Wordmark:** MORPH LAB paired with a four-point star / shard mark.
- **Signature color:** neon blood-pink `#ff426c`.

## Privacy and honest boundaries
Face references are cropped in the browser and held in memory only; they are not written to the save file, uploaded, or sent to an API. Progression and preferences use versioned local browser storage with corrupt-data fallback. The current project remains a static single-player build: there is no live multiplayer transport, remote NPC model, native APK wrapper, account system, or paid AI dependency. These are intentionally not represented as implemented features.

## Structure
- `src/main.ts`: Three.js scene, avatar builder, worlds, weather, lighting, progression, UI screens and Android input.
- `src/engine/profile.ts`: versioned local profile schema, quest definitions, validation and level progression.
- `src/engine/*`: preserved starter input/render/save helpers for future modular extraction and tests.
- `src/styles/main.css`: responsive desktop/Android UI, wardrobe/quest/settings panels, PWA touch controls.
- `public/sw.js` and `public/manifest.webmanifest`: offline shell cache and Android install metadata.
- `game-sharing.json` and `assets/share/favicon.png`: game identity and sharing metadata.

## Delivery architecture
Static Vite output remains the serving arrangement. `dist/` is produced by the existing managed sharing build, with server/database disabled. Browser state is local; no backend is required for the implemented feature set. The game uses low-poly procedural geometry and bounded particle counts so the low-power setting can reduce pixel ratio, shadows and weather density on low-RAM Android devices.

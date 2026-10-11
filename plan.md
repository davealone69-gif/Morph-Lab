# MORPH LAB implementation plan

## Product
MORPH LAB is a single-language English Three.js browser game optimized for Android browsers and installable web-app use. The player supplies a local image reference, the game crops a face-safe region in-browser, and applies it to a procedural, fully clothed 3D avatar. The player can customize name, archetype, hair and outfit colors, then enter a gothic shard-collecting arena.

## Design
- **Movement:** dark romantic sci-fi / gothic arcade.
- **Principles:** high-contrast glass panels, neon blood-moon accents, immediate feedback, respectful local-first image handling.
- **Color philosophy:** ink-black space gives the avatar visual focus; pink represents transformation and energy; violet represents the synthetic lab; cream keeps controls legible.
- **Layout:** asymmetric desktop lab / arena / loadout columns, collapsing into a thumb-friendly portrait stack on Android.
- **Signature elements:** pink diamond shard pickups, crosshair scanline, and the MORPH LAB star mark.
- **Interaction:** upload → morph → play; the interface explains the local-only behavior next to the upload affordance.
- **Animation:** gentle avatar hover, rotating shards, soft camera follow, glow pulses, and restrained motion in the UI.
- **Typography:** bundled Manus display/body fonts, uppercase micro-labels, tight display headlines.
- **Brand essence:** a private image-to-avatar lab for people who want to play their own imagined characters; **mysterious, tactile, empowering**.
- **Voice:** concise and cinematic. Example: “Make the impossible playable.” / “Bring a face, a mood, or a whole myth.”
- **Wordmark:** MORPH LAB paired with a four-point star / shard mark.
- **Signature color:** neon blood-pink `#ff426c`.

## Structure
- `src/main.ts`: Three.js scene, procedural avatar builder, local image crop pipeline, keyboard/touch controls, shard arena and HUD updates.
- `src/styles/main.css`: responsive desktop and Android portrait layout, glass panels, controls and mobile joystick.
- `index.html` and `public/manifest.webmanifest`: mobile web metadata and installable app shell.
- `game-sharing.json` and `assets/share/favicon.png`: game identity and sharing metadata.

## Constraints
The image stays in the browser prototype; only a cropped upper-face reference is used in the avatar preview. The playable character is fully clothed and non-explicit while retaining a mature gothic atmosphere. No backend, login, online leaderboard, payment, or multiplayer service is added.

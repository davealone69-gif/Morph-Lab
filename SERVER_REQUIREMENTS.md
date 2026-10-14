# Server requirements and live health checks

| Service | Requirement | Verification | Start/recovery |
|---|---|---|---|
| Core browser game/avatar preview | Required; documented core is client-side | Load page and exercise avatar creation, controls and local image handling | No separate application backend established for core gameplay. |
| Static hosting | Required only for hosted distribution | Request published page and assets over HTTPS | Build and deploy the static site using configured hosting. |
| Optional AI/model API | Not established as required for core gameplay | Confirm active code calls a provider and perform a real request | Do not add a backend unless an implemented feature needs it. |

## Health states
HEALTHY only after a real check succeeds. Support DEGRADED, UNREACHABLE, AUTH REQUIRED, NOT CONFIGURED and UNVERIFIED. Display checked-at time, safe URL, error and recovery steps. Page availability does not prove every feature works.

## Startup
Use package scripts for local development. For hosted use, build/deploy the static output and verify the deployed origin and assets. No separate AI backend is established as mandatory here.

## Verification boundary
This is not a live hosting check. Published site, browser runtime and mobile behavior remain UNVERIFIED until tested.

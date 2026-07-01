# Agent Changelog

Concise history of meaningful agent-made changes.

## 2026-06-09

- Created `AGENTS.md` with project conventions for Astro, TypeScript, Tailwind CSS, localization, server environment handling, quality checks, and git safety.
- Updated `AGENTS.md` with the project goal: a concise recruiter-facing resume landing page optimized for fast profile evaluation.
- Replaced the default Astro starter `README.md` with a recruiter-facing project overview, high-level technical stack, structure, and local development commands.
- Added persistent agent memory guidance to `AGENTS.md`.
- Created `agent-logs/README.md`, `agent-logs/decisions.md`, and `agent-logs/changelog.md`.
- Updated `.gitignore` to keep raw session logs under `agent-logs/sessions/` untracked.
- Created `docs/experiences.json` by extracting structured work experience data from `docs/linkedin/linkedin_profile.txt`.
- Created `docs/experiences.ts` from `docs/experiences.json` with simple exported TypeScript types for future resume integration.

## 2026-06-11

- Added `src/components/layout/Section.astro` as a structural layout primitive for standard resume sections.
- Refactored `Snapshot`, `Impacts`, `Projects`, and `Skills` to use the shared section shell while preserving their section-specific card markup.
- Verified with `npm run astro -- check` and `npm run build`.
- Updated direct npm dependencies and dev dependencies to current compatible latest versions.
- Added `vite` as an explicit dev dependency on the Astro-compatible `7.3.x` line so Astro and `@tailwindcss/vite` resolve the same Vite peer.
- Added an npm `yaml` override to resolve the `@astrojs/check` transitive audit finding without downgrading `@astrojs/check`.
- Verified with `npm audit --audit-level=moderate`, `npm run astro -- check`, and `npm run build`.

## 2026-06-13

- Fixed localized header navigation labels by aligning English and French `navigation.navItems` data with `NavigationUIType`.
- Narrowed header navigation props to top-level nav bar keys so `Header.astro` can read localized labels without casts or debug logging.
- Verified with `npm run astro -- check` and `npm run build`.

## 2026-06-18

- Regenerated `package-lock.json` with `npm install` to repair npm lockfile metadata for Tailwind's bundled WASM optional dependencies after Railway reported `npm ci` failures around missing `@emnapi` entries.
- Bumped the package version from `0.0.3-alpha.1` to `0.0.3-alpha.2` for the follow-up Railway release.
- Verified the repaired lockfile with `npm --cache ./.npm-cache ci --ignore-scripts` using network access, then removed the temporary npm cache.
- Verified production output with `npm run build`.
- Regenerated `package-lock.json` with npm 10 after Railway's Node 22 build still rejected the npm 11-generated lockfile, then bumped the package version to `0.0.3-alpha.3`.
- Added `packageManager: npm@11.6.2` to make npm explicit for Railway/Railpack package manager detection, then bumped the package version to `0.0.3-alpha.4` for the test release.

## 2026-06-19

- Added explicit logging for Resend API-level contact form send failures in `src/pages/api/sendMessage.ts`, preserving the generic client-facing 500 response while recording safe diagnostic fields.
- Renamed the contact form success log to indicate the email was sent and included the Resend email id when available.
- Verified with `npm run astro -- check`; the command passed with existing unused-code hints.

## 2026-06-26

- Fixed native dialog fade transitions in `src/styles/global.css` by adding `@starting-style` and discrete `display`/`overlay` transitions for the dialog and backdrop.
- Verified with `npm run astro -- check` and `npm run build`; both passed with existing unused-code hints from `astro check`.

## 2026-06-29

- Simplified header navigation typing around `header.navigation.items` in `src/content/config/Types.ts` and corrected the matching config shape in `src/content/config/index.ts`.
- Updated `src/layouts/BaseLayout.astro` and `src/components/layout/Header/NavBar.astro` to use the new navigation config shape and render empty `items` arrays as simple links.
- Verified with `npm run astro -- check` and `npm run build`; `astro check` passed with existing unused-code hints.
- Fixed career details submenu navigation in `src/scripts/client/navigationManagement.ts` by replacing cancelled default anchor navigation plus `window.navigation.navigate()` with explicit hash history update and `scrollIntoView()` after opening the details section.
- Re-verified with `npm run astro -- check` and `npm run build`; browser click verification was blocked because the in-app browser was unavailable and Playwright browser binaries are not installed.
- Adjusted the career details submenu scroll timing to wait for the details `toggle` event and two animation frames before calling `scrollIntoView()`, so the target has an open, settled layout box.
- Re-verified with `npm run astro -- check` and `npm run build`; both passed with existing unused-code hints from `astro check`.
- Added initial hash and `hashchange` handling in `src/scripts/client/navigationManagement.ts` so direct URLs such as `/#certifications` open the containing details section before scrolling to the embedded target.
- Re-verified with `npm run astro -- check` and `npm run build`; both passed with existing unused-code hints from `astro check`.

## 2026-07-01

- Removed the unused `careerDetailsElement` setup reference and now-unused `CAREER_DETAILS` navigation ID from `src/scripts/client/navigationManagement.ts`; hash navigation already opens the closest containing `<details>` for the target.
- Verified with `npm run astro -- check`; it passed with existing unrelated unused-code hints.
- Added a scoped `closeDialog(id)` helper in `src/scripts/client/navigationManagement.ts` that safely finds an open `HTMLDialogElement` by id and closes it via `close()`.
- Re-verified with `npm run astro -- check`; it passed with existing unrelated unused-code hints.
- Wired all mobile navigation menu links into `src/scripts/client/navigationManagement.ts`, validating their DOM IDs during setup and closing the dialog indicated by each clicked link's `data-dialog-id` before scrolling.
- Re-verified with `npm run astro -- check`; it passed with existing unrelated unused-code hints.

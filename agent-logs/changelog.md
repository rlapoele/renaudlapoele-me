# Agent Changelog

Concise history of meaningful agent-made changes.

## 2026-07-06

- Aligned English and French resume metadata, Open Graph, JSON-LD job titles/descriptions, and hero titles around a consistent recruiter-facing front-end/product engineering positioning.
- Downgraded Astro to `6.4.8`, Vite to `7.3.6`, and `@astrojs/node` to `10.1.4`; kept explicit optional `@emnapi/core` and `@emnapi/runtime` dependencies so `npm ci` resolves Tailwind's WASM runtime peers cleanly.
- Moved `@emnapi/core` and `@emnapi/runtime` from optional dependencies to regular dependencies so npm writes complete lockfile package entries required by Railway `npm ci`.

## 2026-07-07

- Reworded the opening README introduction in first person so the project overview reads more personally while staying concise and professional.
- Adjusted the print resume HTML so PDF page margins are defined with `@page`, giving continued pages the same top margin as the first page.
- Updated the resume HTML-to-PDF utility to derive generated PDF filenames from the source HTML filename and suffix them with a readable production date.
- Added a French print resume HTML file using the same markup and CSS as the English version, adapted from the localized French resume content.
- Refactored the resume HTML-to-PDF utility to accept an HTML file or directory argument, defaulting to the current working directory when no argument is provided.
- Added localized `resumePdfFileUrl` hero content for English and French resume PDFs, removed the now-unused global hero download href config, and wired the Hero download button to the localized content URL.
- Hardened the Hero resume PDF download link with a new-tab fallback, safe `rel` attributes, and a PDF MIME hint so ignored-download cases do not replace the resume page.

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

## 2026-07-02

- Prepared release `v0.0.3-alpha.6` by bumping package metadata after merging responsive menu/navigation work toward the `releases` branch.

## 2026-07-03

- Added a lightweight custom `src/pages/404.astro` page reusing the existing layout, header/footer shell, typography, buttons, and localized resume links.
- Extended `src/layouts/BaseLayout.astro` with optional page metadata and hash-link prefixing so non-resume pages can keep header navigation pointed at the resume sections.
- Verified with `npm run astro -- check`, `npm run build`, and local preview HTTP checks for a missing route returning `404 Not Found`.
- Localized resume page titles and meta descriptions from `src/components/pages/ResumePage.astro`, adding the profile name to titles and locale-specific recruiter-facing summaries.
- Verified with `npm run astro -- check`, `npm run build`, and generated HTML metadata extraction for `/`, `/en`, and `/fr`.
- Removed stale commented metadata derivation code from `src/components/pages/ResumePage.astro` after moving page metadata into localized content.
- Added canonical and hreflang metadata for the bilingual resume routes: `/` as the English default and `x-default`, `/en` as explicit English, and `/fr` as French.
- Updated the language switcher to send French users back to `/` for the default English page.
- Verified with `npm run astro -- check`, `npm run build`, and generated HTML extraction for canonical, alternate, and language-switch links.
- Integrated localized Open Graph metadata in `src/layouts/BaseLayout.astro`, deriving `og:url` from the active canonical URL to keep `/`, `/en`, and `/fr` aligned with canonical and hreflang tags.
- Corrected seeded resume Open Graph locale data so English alternates to `fr_FR` and French uses `/fr` with `en_GB` as its alternate locale.
- Verified with `npm run astro -- check`, `npm run build`, and generated HTML extraction for canonical, hreflang, and Open Graph metadata.
- Tightened duplicate control for the English resume by canonicalizing `/en` to `/` and pointing `hreflang="en"` at `/`, leaving `/fr` as the French canonical URL.

## 2026-07-04

- Reviewed the `BaseLayout.astro` refactor that moved URL and hash-link helpers into `src/scripts/server/configUtils.ts`; behavior matches the previous inline helpers.
- Verified with `npm run astro -- check` and `npm run build`; both passed, with one unrelated Astro hint in the untracked `src/components/seo/JsonLd.astro`.
- Integrated `src/components/seo/JsonLd.astro` into `BaseLayout.astro`, deriving JSON-LD ProfilePage `@id` and `url` from the actual rendered route so `/`, `/en`, and `/fr` emit locale-consistent schema.
- Corrected the resume JSON-LD person image URLs to an existing hero image asset and verified generated schema output with `SITE_URL=https://renaudlapoele.me npm run build`.
- Added generated `robots.txt` and `sitemap.xml` routes, default `robots` and `theme-color` metadata in `BaseLayout.astro`, and explicit `noindex, nofollow` metadata for the 404 page.
- Verified with `npm run astro -- check`, `SITE_URL=https://renaudlapoele.me npm run build`, and generated HTML/text/XML metadata extraction.
- Upgraded direct npm dependencies to the latest available versions, including Astro 7, `@astrojs/node` 11, Vite 8, Tailwind 4.3.2, Resend 6.17.1, Playwright 1.61.1, and Node 26 type definitions.
- Verified the dependency update with `npm outdated --json`, `npm run astro -- check`, `SITE_URL=https://renaudlapoele.me npm run build`, and `npm audit --audit-level=moderate`.

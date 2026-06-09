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

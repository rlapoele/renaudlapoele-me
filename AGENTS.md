# AGENTS.md

Guidance for coding agents working in this repository.

## Project Overview

This is an Astro portfolio/resume landing page. Its goal is to showcase the owner's skills and experience in a concise, synthesized format so recruiters and potential employers can quickly evaluate the profile.

When making product, content, or design decisions, optimize for:

- Fast scanning by recruiters.
- Clear evidence of skills, impact, and experience.
- Concise wording over exhaustive detail.
- Strong information hierarchy across sections.
- Easy comparison with typical hiring criteria.

The site uses:

- Astro 6 with strict TypeScript.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Node adapter configured in `astro.config.mjs`.
- npm as the package manager, with `package-lock.json` committed.
- Localized content under `src/content/i18n`.
- Contact form API routes using server-side configuration and Resend.

## Runtime And Commands

- Use Node `>=22.12.0`.
- Install dependencies with `npm install`.
- Start development with `npm run dev`.
- Build production output with `npm run build`.
- Preview a built site with `npm run preview`.
- Use `npm run astro -- check` for Astro type checks when relevant.

Run commands from the repository root.

## Repository Structure

- `src/pages`: route entry points, including localized routes under `en` and `fr`.
- `src/pages/api`: server endpoints.
- `src/layouts`: page-level layout shells.
- `src/components/layout`: structural layout components such as header and footer.
- `src/components/ui`: reusable UI primitives and icons.
- `src/sections`: resume/page sections.
- `src/scripts/client`: browser-side scripts.
- `src/scripts/server`: server-only helpers.
- `src/scripts/shared`: helpers safe to share between client/server when applicable.
- `src/content/config`: site configuration types and values.
- `src/content/i18n`: localized resume and locale content.
- `src/styles/global.css`: Tailwind import, theme mapping, design tokens, and global styles.

Do not edit `dist`, `node_modules`, or generated Astro output.

## Imports

Prefer the configured path aliases from `tsconfig.json`:

- `@layouts/*`
- `@pages/*`
- `@sections/*`
- `@components/*`
- `@content/*`
- `@styles/*`
- `@utils/*`
- `@scripts/*`

Avoid long relative imports when an alias exists.

## Astro Component Conventions

- Type component props explicitly in the frontmatter.
- Destructure `Astro.props` after defining the props type.
- For optional `class` props, follow the existing pattern:
  - accept `class?: string`;
  - alias it as `class: className`;
  - combine it with base classes using `combineCssClasses`.
- Keep icons and low-level UI primitives in `src/components/ui`.
- Keep layout-only components in `src/components/layout`.

## Styling

- Use existing Tailwind utility classes and semantic tokens exposed in `src/styles/global.css`.
- Prefer semantic colors such as `text-ink-tertiary`, `text-accent-primary`, `bg-paint-card`, and `border-line-subtle` over raw color values.
- Preserve the light/dark token system based on CSS variables.
- Avoid adding one-off CSS unless a reusable utility or token is not sufficient.
- Keep print-specific behavior intentional; existing components use classes such as `print:hidden`.

## Content And Localization

- Public resume/site copy usually lives in `src/content/i18n`.
- When changing user-facing content, check whether both English and French versions need updates.
- Keep localized content shapes aligned with the shared types under `src/content/i18n/resume/Types.ts`.

## Server And Environment

The project defines environment variables in `astro.config.mjs`.

- Treat `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, and `CONTACT_FORM_SECRET` as secrets.
- Do not hard-code secret values in source files.
- `SITE_URL`, `LOG_LEVEL`, and `LOG_PRETTY` are public server config values.
- Be careful when changing `security.checkOrigin`; it is disabled because Railway terminates HTTPS before the Node server.

## Quality Bar

Before finishing code changes, run the most relevant available check:

- `npm run build` for full production verification.
- `npm run astro -- check` for Astro/TypeScript validation.

If a command cannot be run because dependencies are missing or the environment is restricted, state that clearly in the final response.

## Git And Safety

- Do not revert unrelated user changes.
- Do not amend commits unless explicitly asked.
- Do not use destructive git commands unless explicitly requested.
- Keep edits focused on the requested task.
- If unexpected unrelated changes appear while working, stop and ask how to proceed.

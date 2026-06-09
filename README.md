# renaudlapoele.me

This project is a bilingual resume landing page for Renaud Lapoele, Senior Front-End Engineer / Product Engineer.

Its purpose is to give recruiters and potential employers a clear, concise way to evaluate Renaud's profile: experience, skills, product mindset, UX sensitivity, and technical background without having to parse a long-form CV first.

## Why This Project Exists

The site is designed as a focused professional introduction. It highlights:

- 25+ years of experience in software engineering, front-end development, UX, and product-facing roles.
- Long-term enterprise experience at Cisco Systems.
- A profile positioned at the intersection of engineering, product, and user experience.
- Selected impact, skills, and work examples structured for fast recruiter scanning.
- Availability for permanent or contract opportunities, with a preference for remote or hybrid work.

## Technical Overview

The project is built with a modern, lightweight front-end stack:

- **Astro 6** for the site structure and page rendering.
- **TypeScript** with strict configuration.
- **Tailwind CSS v4** for styling, supported by custom design tokens.
- **Localized content** for English and French versions.
- **Astro API routes** for contact form handling.
- **Resend** for email delivery.
- **Railway-oriented server configuration** through the Astro Node adapter.

The codebase keeps content, layout, UI components, and client/server scripts separated so the site can evolve without mixing presentation, resume data, and infrastructure concerns.

## Project Structure

```text
src/
  components/   Reusable layout and UI components
  content/      Localized resume content and configuration
  layouts/      Page layout shells
  pages/        Routes, localized pages, and API endpoints
  scripts/      Client, server, and shared utilities
  sections/     Resume landing page sections
  styles/       Global styles, Tailwind setup, and design tokens
```

## Local Development

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm run build
npm run preview
npm run astro -- check
```

Node `>=22.12.0` is required.

## Content Direction

The site favors concise, scannable content over exhaustive detail. Design and copy decisions should help recruiters quickly understand what Renaud brings to a team: senior front-end execution, UX/product thinking, structured communication, and experience delivering usable systems in complex environments.

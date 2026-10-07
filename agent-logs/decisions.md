# Agent Decisions

Durable decisions and working conventions for this project.

## 2026-06-09

- `AGENTS.md` is tracked in git because it is stable project operating documentation.
- `agent-logs` uses a split model: curated memory files are tracked, raw session logs under `agent-logs/sessions/` are ignored.
- Agent logs should summarize work rather than preserve full transcripts.
- Sensitive material must never be written to tracked logs, including API keys, tokens, passwords, raw environment values, cookies, private keys, or auth headers.
- `AGENTS.md` should be updated when durable conventions change; it should not become a chronological diary.

## 2026-07-06

- During Astro/Vite/Tailwind upgrades, verify Railway compatibility with `npm ci` before release. npm can leave peer packages such as `@emnapi/core` and `@emnapi/runtime` listed in root lock metadata but omit their `node_modules/@emnapi/*` package entries when they are optional dependencies, causing Railway `npm ci` to fail as out of sync.
- If `@napi-rs/wasm-runtime` peer resolution introduces `@emnapi/core` or `@emnapi/runtime`, keep those packages as regular `dependencies`, not `optionalDependencies`, so `package-lock.json` includes complete `version`, `resolved`, and `integrity` entries.
- After major dependency upgrades, explicitly check `package-lock.json` for missing or empty-version WASM-related package entries, especially under `@emnapi`, `@napi-rs/wasm-runtime`, `@tailwindcss/oxide-wasm32-wasi`, `@astrojs/*wasm*`, `@rolldown/*wasm*`, and `@img/sharp-wasm32`.

## 2026-09-04

- The print resume PDF generator must wait for and verify every required Urbanist and Lora weight before calling `page.pdf()`. This prevents non-deterministic fallback to Arial and Georgia when Google Fonts load asynchronously.

## 2026-10-07

- The resume PDF converter produces two synchronized outputs from each localized HTML source: the existing polished two-column PDF and an `_ats` single-column variant.
- Both PDF variants must enable Playwright's tagged output and document outline. The ATS variant must preserve conventional section order in extracted text and keep decorative icons and proficiency bars out of the rendered document.

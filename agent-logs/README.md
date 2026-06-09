# Agent Logs

This directory stores curated memory for agent-assisted work on this project.

## Tracking Policy

Tracked files should contain durable, useful project memory:

- `decisions.md`: project decisions, conventions, and user preferences that should influence future work.
- `changelog.md`: concise summaries of meaningful changes made by agents.

Raw per-session notes belong in `agent-logs/sessions/`. That directory is intentionally ignored by git.

## Safety Rules

Never write secrets or sensitive values to tracked agent logs.

Do not include:

- API keys, tokens, passwords, cookies, private keys, or auth headers.
- Raw `.env` values or deployment secrets.
- Full terminal output that may contain sensitive values.
- Private personal data beyond the public resume/profile content intentionally used by this project.
- Full conversation transcripts unless explicitly requested and reviewed for sensitive content.

Prefer short summaries: request, plan, files changed, commands run, verification result, and open follow-ups.

When a lesson becomes a durable project rule, promote it to `AGENTS.md`.

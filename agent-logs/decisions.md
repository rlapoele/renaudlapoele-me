# Agent Decisions

Durable decisions and working conventions for this project.

## 2026-06-09

- `AGENTS.md` is tracked in git because it is stable project operating documentation.
- `agent-logs` uses a split model: curated memory files are tracked, raw session logs under `agent-logs/sessions/` are ignored.
- Agent logs should summarize work rather than preserve full transcripts.
- Sensitive material must never be written to tracked logs, including API keys, tokens, passwords, raw environment values, cookies, private keys, or auth headers.
- `AGENTS.md` should be updated when durable conventions change; it should not become a chronological diary.

# CLAUDE.md — frecoin-web (Claude Code-specific)

> Claude Code reads this file at session start. The portable harness
> contract lives in `AGENTS.md` and is imported below. Keep this file
> short — Claude Code-specific tips only. Everything else goes in
> AGENTS.md.

@AGENTS.md

---

## Claude Code session start

When a fresh Claude Code session opens this repo:

1. Invoke the `session-start` skill (under `.claude/skills/`). It
   reads HANDOFF.md (if present) + tasks/current.md + recent commits
   and reports back in ~60 seconds.
2. Ask the user what to work on — do not invent tasks.

If the skill is unavailable, do the manual equivalent: read
`HANDOFF.md` (if exists) or `README.md`, then `tasks/current.md`,
then `git log --oneline -10`.

---

## Verification

After any meaningful change, run the `verify` skill or:

```bash
bash scripts/verify.sh
```

Do not commit on red. Do not deploy without going through the
`deploy-check` skill and the `deployment-guardian` agent.

---

## Subagents available under `.claude/agents/`

- `orchestrator` — plan a multi-step change
- `implementer` — write the code per the plan
- `reviewer` — review a diff before commit
- `deployment-guardian` — gates anything deploy-shaped
- `docs-curator` — keeps README / HANDOFF / ADRs aligned

Default to the main agent. Spawn a subagent only when the task
matches one of the above and you have a self-contained brief for it.

---

## Skills available under `.claude/skills/`

- `session-start` — orient at session start
- `verify` — run the local verification pipeline
- `docs-sync` — find and fix doc/reality drift
- `deploy-check` — pre-deploy safety checklist

---

## Project owner working preferences

- Habla con el dueño del proyecto en **español (es-ES)** y tutéale.
  Tono directo, sin relleno. Avanza rápido, no sobre-ingenierices.

- Direct tone, no fluff. Move fast, don't over-engineer.
- Never run destructive commands without explicit approval in chat.
- Always show the diff or plan before applying non-trivial changes.

<!-- Reglas globales heredadas de ~/.claude/CLAUDE.md (Adspubli):
     email solo vía `gmail draft` (nunca send), nunca borrar correos,
     nunca commitear credenciales. El copy de la web es es-ES con
     tildes correctas. -->

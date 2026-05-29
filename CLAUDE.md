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

## Vocabulario de cierre y publicación (convención del dueño)

El dueño usa frases sencillas como "comandos". Cuando diga estas frases,
ejecuta lo indicado **sin pedir que detalle cada paso**:

| Frase del dueño | Qué ejecutar |
|---|---|
| **"commit"** | `git commit` de los cambios (queda local, en el Mac) |
| **"push" / "súbelo"** | commit (si falta) + `git push` a GitHub. NO toca la web |
| **"publica" / "súbelo a producción" / "ponlo en vivo"** | Deploy REAL a Hostinger: `npm run build` + subir `dist/` a `domains/frecoin.es/public_html/` por SSH (`~/.ssh/frecoin_hostinger`) + comprobar frecoin.es. Ver `HANDOFF.md` |
| **"cierra"** | Documentar el cierre: actualizar `HANDOFF.md` + `tasks/current.md` + entrada en `progress/` + commit `docs:` |
| **"cierra y publica"** | TODO en orden: commit → push → publica → cierre |

Reglas al ejecutar estas frases:
- El paso **build/compilar es interno**: el dueño no lo menciona, lo haces tú
  como parte de "publica".
- **Antes del deploy real** (paso "publica"), suelta UNA línea avisando qué
  va a salir en vivo y espera un "sí" rápido. Producción nunca a ciegas.
- Antes de sobrescribir `public_html`, haz copia de seguridad en el servidor.
- Esto es autorización permanente para encadenar los pasos cuando se use la
  frase; no exime del aviso de seguridad previo al deploy.

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

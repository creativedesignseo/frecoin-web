# Descubrir el mecanismo real de deploy a producción

**Date:** 2026-05-29 (started)
**Status:** completed
**Related:** HANDOFF.md, tasks/current.md, docs/decisions/ADR-001-deploy-architecture.md

## Objective

Determinar cómo llega de verdad un cambio a frecoin.es, porque el panel
"Despliegue desde GitHub" de Hostinger aparecía vacío y no estaba claro si
un `git push` publicaba la web. Surgió al ir a desplegar la tanda de
cambios de la home del 29-may.

## Qué se inspeccionó

- `.github/workflows/deploy-to-production-branch.yml` — el workflow compila
  en cada push a `main` y empuja `dist/` a la rama `production`. Su
  comentario *afirma* que Hostinger auto-despliega desde ahí (resultó ser
  aspiracional, no real).
- `origin/production` — existe y tiene historial de "deploy: build de
  <sha>"; la mitad GitHub funciona.
- Servidor Hostinger por SSH (solo lectura, clave `~/.ssh/frecoin_hostinger`):
  - `domains/frecoin.es/public_html/` **no es repo git** (archivos sueltos).
  - `index.html` mtime = `2026-05-21 19:11` → web congelada desde entonces.
  - `crontab -l` vacío → sin pull automático.
  - Panel "Despliegue desde GitHub" (OAuth) vacío.

## Conclusión

**No existe auto-deploy.** El deploy real es **manual**: `npm run build` +
subir `dist/` a `public_html` por SSH/rsync. El pipeline de GitHub Actions
está huérfano (construye la rama `production` pero nadie la consume).
Detalle completo en `HANDOFF.md`.

## Archivos cambiados (documentación)

- `HANDOFF.md` (nuevo) — verdad operativa + proceso de deploy real.
- `AGENTS.md` — hosting Netlify→Hostinger, sección de deploy corregida.
- `.claude/agents/deployment-guardian.md`, `.claude/skills/deploy-check/SKILL.md`
  — gatean ahora la subida manual por SSH, no `netlify deploy`.
- `tasks/current.md` — estado real (web congelada 21-may, rediseño sin publicar).
- `docs/decisions/ADR-001-deploy-architecture.md` (nuevo).

## Comandos relevantes

- `ssh -p <puerto> -i ~/.ssh/frecoin_hostinger <user>@<host>` (solo lectura):
  comprobar `public_html` (git/mtime) y `crontab -l`.

## Open risks

- Repo **público**: no documentar credenciales en archivos commiteados.
  Pendiente auditar el historial por secretos.
- Mientras el deploy siga manual, cada publicación depende de subir `dist/`
  a mano; riesgo de olvido/desincronización.

## Next step

Decidir si se publica el rediseño de `draft/diseno` (deploy manual) y si se
automatiza el deploy (ver ADR-001). Pendiente de autorización de escritura
en el servidor.

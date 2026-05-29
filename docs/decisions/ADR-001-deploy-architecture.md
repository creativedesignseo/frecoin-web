# ADR-001 — Arquitectura de deploy de frecoin.es

**Status:** Accepted (describe el estado actual, 2026-05-29) — con acción
recomendada pendiente.
**Related:** HANDOFF.md, progress/2026-05-29-descubrir-mecanismo-deploy.md

## Context

frecoin.es se sirve desde Hostinger (`domains/frecoin.es/public_html/`).
Existe un workflow de GitHub Actions
(`deploy-to-production-branch.yml`) que, en cada push a `main`, compila la
SPA (Vite) y empuja el `dist/` a la rama `production`. El comentario del
workflow asume que Hostinger Git Auto-Deploy baja esa rama a `public_html`.

Al inspeccionar el servidor (29-may-2026) se confirmó que **esa segunda
mitad NO está conectada**: `public_html` no es repo git, no hay cron, y el
panel "Despliegue desde GitHub" (OAuth) está vacío. La web se actualiza
**subiendo `dist/` a mano por SSH**. Estaba congelada desde el 21-may-2026.

## Decision

Documentar el estado real: **el deploy a producción es MANUAL** (`npm run
build` + subir `dist/` a `public_html` por SSH/rsync). `git push` a `main`
**no** publica la web; solo actualiza GitHub y la rama `production`
(huérfana).

## Alternatives (para automatizar — recomendado a futuro)

1. **Conectar el panel Hostinger "Despliegue desde GitHub" (OAuth)** a la
   rama `production` (que ya contiene el `dist/` compilado). Mínimo
   esfuerzo, cierra el círculo del workflow existente.
2. **Cron `git pull`** en Hostinger sobre un clon de `production` en
   `public_html`. Requiere convertir `public_html` en repo git.
3. **Deploy directo por SSH desde CI** (GitHub Actions con `rsync` sobre
   SSH usando un secret). Evita depender de features de Hostinger.

## Consequences

- Mientras siga manual: cada publicación requiere acción humana; riesgo de
  desincronización entre git y la web.
- El repo es **público**: las credenciales del servidor no se commitean;
  viven en el panel de Hostinger y en `~/.ssh/frecoin_hostinger`.
- Si se adopta una alternativa de automatización, **supersede este ADR**
  con un ADR-002 que describa la nueva vía.

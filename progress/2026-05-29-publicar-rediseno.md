# Publicar el rediseño en producción (deploy manual)

**Date:** 2026-05-29 (started)
**Status:** completed
**Related:** HANDOFF.md, docs/decisions/ADR-001-deploy-architecture.md

## Objective

Sacar en vivo a frecoin.es el rediseño de `draft/diseno` (congelado hasta
entonces en el build del 21-may) + los ajustes de la home del 29-may, vía el
proceso de deploy real (manual por SSH, ver ADR-001).

## Qué se hizo

1. `npm run build` → `dist/`.
2. Copia de seguridad de `public_html` en el servidor antes de sobrescribir.
3. `rsync` de `dist/` → `domains/frecoin.es/public_html/` por SSH.
4. Verificación: HTTP 200 + texto nuevo presente en el bundle servido.

Se hicieron **dos deploys** seguidos:
- 1º: rediseño completo + ajustes home (cobertura "toda Barcelona", icono
  WiFi vectorial, imagen eléctricas). Backup: `~/backup_public_html_20260529_141239`
  (= estado anterior, 21-may).
- 2º: cambio de copy "Zona de cobertura → Barcelona y Cataluña" en Contacto.
  Backup: `~/backup_public_html_20260529_154754`.

## Verificación

- `curl https://frecoin.es/` → HTTP 200.
- Bundle servido contiene "toda Barcelona" (1er deploy) y "Barcelona y
  Cataluña" (2º deploy). Confirmado en vivo.

## Open risks

- Repo público: los backups y credenciales NO se commitean (viven en el
  servidor / panel Hostinger / `~/.ssh/frecoin_hostinger`).
- Deploy sigue siendo manual (ver ADR-001 para automatizarlo).
- Pendiente: imagen de cámaras + logo en camisa (bloqueado por créditos).
- Inconsistencia menor de copy: "Zona de cobertura" dice "Barcelona y
  Cataluña" mientras Hero/About/Footer dicen "Sant Vicenç dels Horts y toda
  Barcelona". Intencional por ahora (pendiente decidir si se alinea).

## Next step

Cuando haya créditos: generar imagen de cámaras + logo en camisa, y
republicar. Valorar automatizar el deploy (ADR-001).

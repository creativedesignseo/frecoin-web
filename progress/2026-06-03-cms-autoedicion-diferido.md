# Evaluar panel de auto-edición de contenido (CMS) — DIFERIDO

**Date:** 2026-06-03 (started)
**Status:** abandoned (diferido a medio plazo, sin decisión de ejecución)
**Related:** tasks/current.md#diferido, HANDOFF.md (sin cambios en producción)

## Objective

El cliente (Luis Freire) pidió poder editar él mismo textos e imágenes de
frecoin.es, "como un backoffice de WordPress", sin depender del desarrollador.
Sesión de **evaluación** para ver si encaja con el stack actual y qué supondría.
No se implementó nada — se decidió aparcarlo.

## Findings (no code changed)

- Hoy el contenido está **horneado en el build**: ~35% en `src/data/services.ts`
  y ~65% escrito a mano en el JSX de las secciones de la home. La web es una SPA
  Vite estática que se compila y se sube por SSH.
- Para auto-edición "al instante" la web tendría que pasar a **leer el contenido
  en runtime** desde BD/API. Eso es un proyecto, no un quita-y-pon.
- Hostinger ofrece PHP + MySQL + phpMyAdmin (sin Node). Tres arquitecturas
  viables: (A) CMS propio PHP+MySQL [recomendado], (B) headless externo
  (Sanity/Storyblok), (C) WordPress headless.
- **Decisión del dueño:** la web funciona bien hoy; no se implementa ahora. Si
  los cambios de contenido son ocasionales, no compensa (Adspubli los hace a
  mano). Se retoma solo si va a haber edición frecuente y autónoma.

## Files inspected

- `src/data/services.ts` — estructura de los 6 servicios (interfaz `ServiceData`).
- `src/sections/*.tsx` — copy hardcodeado en Hero, About, WorkGallery, etc.
- `public/send-form.php`, `public/.htaccess` — patrón PHP nativo + rewrite SPA.
- `vite.config.ts`, `HANDOFF.md` — build y deploy manual por SSH.

## Files changed

- Ninguno de código/producción. Solo docs de cierre:
  - `progress/2026-06-03-cms-autoedicion-diferido.md` (esta entrada).
  - `tasks/current.md` (añadido ítem diferido).
- Plan detallado guardado **fuera del repo** en
  `~/.claude/plans/el-cliente-solicit-que-tingly-trinket.md` (arquitecturas A/B/C,
  alcance curado, esbozo de implementación y notas de seguridad).

## Commands run

- Solo lectura/exploración. Sin build, sin deploy, sin tocar producción.

## Verification

- N/A — no hubo cambio de código. Producción (frecoin.es) sigue intacta en el
  build del 02-jun (`906e71b`).

## Open risks

- Ninguno técnico (no se tocó nada). El plan vive fuera del repo; esta entrada
  es el puntero para encontrarlo en una futura sesión.

## Next step

Ninguno por ahora. Si el cliente confirma que quiere editar contenido de forma
frecuente, abrir el plan guardado, elegir arquitectura A/B/C (vía ADR) y
convertirlo en un plan de ejecución.

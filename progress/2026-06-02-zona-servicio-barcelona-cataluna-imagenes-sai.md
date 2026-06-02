# Zona de servicio "Barcelona y Cataluña" + imágenes SAI profesionales

**Date:** 2026-06-02 (started)
**Status:** completed (commiteado; pendiente de deploy manual)
**Related:** tasks/current.md#P0, HANDOFF.md, commits `4aca3ac` + `282f2b2`

## Objective

Tanda de cambios de copy/SEO pedida por Luis: reemplazar la zona de
cobertura "Sant Vicenç dels Horts" por "Barcelona y Cataluña" en toda la web,
añadir "certificación" a la card de Redes y sustituir las imágenes del
servicio SAI por equipos profesionales (las baterías genéricas "no son un
SAI").

## Files inspected

- `src/data/services.ts` — datos de los 6 servicios (copy, SEO, FAQ, imágenes).
- `index.html` — meta tags + JSON-LD LocalBusiness.
- `src/components/ServiceLayout.tsx`, `src/pages/Servicio.tsx` — render de
  páginas de servicio y meta dinámico.
- `src/sections/{Hero,About,FooterCTA}.tsx`, `src/pages/{SobreNosotros,Rediseno}.tsx`
  — copy de cobertura repartido por la web.

## Files changed

- `src/sections/Hero.tsx` — subtítulo → "Barcelona y Cataluña" (commit previo `4aca3ac`).
- `src/data/services.ts` — keywords/meta/FAQ → "Barcelona y Cataluña";
  heroParagraph Redes + "certificación"; SAI heroImage/benefitsImage → `.webp`.
- `index.html` — title/description/OG/Twitter/JSON-LD; `areaServed` →
  [City Barcelona, AdministrativeArea Cataluña]. `addressLocality` real KEPT.
- `src/components/ServiceLayout.tsx`, `src/pages/Servicio.tsx` — meta por
  defecto + areaServed.
- `src/sections/{About,FooterCTA}.tsx`, `src/pages/{SobreNosotros,Rediseno}.tsx`
  — copy de cobertura.
- `public/assets/services/sai/{hero,benefits}.webp` — nuevas imágenes; jpg
  antiguos eliminados.

## Decisión no obvia

- Direcciones **fiscales/legales** (Aviso Legal, Política Privacidad) y el
  `addressLocality` del JSON-LD se mantienen reales (C/ Balmes 33, Sant Vicenç
  dels Horts) por LSSI/SEO. Solo se cambió la **zona de servicio** (`areaServed`)
  y el copy de marketing. Confirmado con el dueño vía pregunta directa.

## Commands run

- `bash scripts/verify.sh` → verde (build OK).
- `git add` (8 fuentes + 2 webp) + `git rm` (2 jpg) → commit `282f2b2`.

## Verification

`bash scripts/verify.sh` → build pasó (1781 módulos, dist generado). lint sigue
con errores preexistentes desactivados en verify.

## Open risks

- Lote **NO publicado** en frecoin.es todavía. Producción = 29-may + `4aca3ac`.
- Stock de Unsplash para SAI es pobre; se descartó cambiar de nuevo la imagen
  SAI (las renders de producto actuales son más profesionales). Ver
  `reference_unsplash_api` en memoria local.

## Next step

Cuando Luis dé el OK: deploy manual del lote `282f2b2` (`npm run build` + subir
`dist/` por SSH a `public_html`, backup previo). Ver HANDOFF.md.

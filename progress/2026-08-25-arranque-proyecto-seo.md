# Arranque del proyecto SEO FRECOIN

**Date:** 2026-08-25
**Status:** arrancado (aprobación por llamada + primer pago reportado; sin cambios de código)
**Related:** HANDOFF.md, tasks/current.md, `frecoin-tracking/entregables/plan-maestro-SEO-FRECOIN.md`

## Objective

Luis llamó el 24-ago-2026 aceptando la propuesta SEO de 499€ enviada el 12-jun. Objetivo de la
sesión: verificar el presupuesto exacto cotizado, investigar si el precio era correcto de mercado,
construir un plan de ejecución completo, y preparar la comunicación de arranque con el cliente.

## Files inspected

- Correos de Gmail (`info@one.adspubli.com`): hilo completo con Luis desde abril hasta el 1-ago,
  incluida la propuesta SEO final (12-jun, 499€, 250€+249€) y su PDF adjunto (descargado y leído
  completo).
- Código real de `frecoin-web-produccion` (rama `draft/diseno` para el estado de analítica,
  `feat/backoffice-cms` para el backoffice) — verificado por los agentes de investigación antes de
  planificar, no asumido.

## Files changed

- `HANDOFF.md` — verificación 2026-08-25 (código+prod sin cambios) + estado del proyecto SEO
  arrancado + corrección del pendiente obsoleto "esperando respuesta de Luis".
- `tasks/current.md` — nueva sección "Proyecto SEO (arrancado)".
- Fuera de este repo, en `frecoin-tracking/entregables/` (repo de contexto privado):
  `plan-seo-tecnico-keyword-onpage.md`, `plan-google-business-profile.md`, `plan-gtm-ga4.md`,
  `plan-reputacion-online.md`, `plan-maestro-SEO-FRECOIN.md`.
- Fuera de este repo, en `frecoin-tracking/correos/`: `Email-Arranque-SEO-Luis.html` (borrador de
  correo de confirmación de pago + checklist, creado en Gmail, no confirmado como enviado).

## Commands run

- 4 agentes de investigación en paralelo (WebSearch) sobre precio de mercado real de: SEO técnico
  local, Ficha de Google Business, GTM+GA4, reputación online (Trustpilot) — mercado España/Europa,
  proyecto único (no mensualidad).
- 4 agentes de investigación en paralelo sobre metodología de ejecución de cada bloque, verificando
  contra el código real del repo (`git log`, lectura de archivos fuente) y producción en vivo
  (`curl` a frecoin.es).
- `npm install` + `bash scripts/verify.sh` → verde.
- `curl` a `/`, `/panel/`, `/admin/api/auth.php`, `/assets/work-gallery.json` en producción.
- `gmail draft` (2 iteraciones) para el correo de arranque; `gmail list`/`read` para verificar
  contexto e hilo de correos con Luis.
- `gh repo view` para confirmar que `frecoin-tracking` es privado antes de commitear datos
  bancarios (IBAN/Bizum de Adspubli) en `correos/`.

## Verification result

- **Código y producción: sin cambios, verificados en vivo.** `verify.sh` → `✓ all checks passed`.
  Bundles idénticos a la última verificación (`index-Dti3xGD2.js` público, `index-BlcpRtEO.js`
  panel). `node_modules` faltaba (recurrente en este entorno, no es regresión).
- **Precio cotizado (499€) confirmado por debajo de mercado**: sumando solo los suelos más bajos y
  de mayor confianza de cada componente investigado (auditoría SEO + directorios + GBP + GTM/GA4 +
  reputación) da ≈1.700€, más del triple de lo cotizado. Decisión tomada: honrar el precio ya dado
  a Luis (valor de la relación > margen de este proyecto), no renegociar.
- **Esfuerzo real del trabajo**: ≈79h combinadas de los 4 bloques (verificado contra código real,
  no genérico) — muy por encima de las "2-3 semanas" prometidas en el PDF original. Roadmap
  realista: ≈7 semanas a 2.5h/día.
- **Pago del cliente**: Jonatan reportó que Luis pagó 250€ hoy — **no verificado de forma
  independiente** (sin acceso a la cuenta bancaria/Bizum de Adspubli). Documentado en HANDOFF.md
  con esa salvedad explícita.

## Open risks

- El correo de arranque sigue en **borrador**, no confirmado como enviado.
- El checklist de datos/accesos a Luis (NAP, cuenta de Google, fotos, datos Trustpilot) sigue sin
  respuesta.
- `HANDOFF.md` tenía una edición sin commitear de la sesión anterior (2026-07-29) que quedó suelta
  varios días — se incorpora en el commit de esta sesión.
- `frecoin-tracking` (repo de contexto) tiene además cambios sin relación con esta sesión
  (`Logotipo/`, `_obsoleto-2026-06-08/`, `legal/`, `.gitignore` modificado, archivos borrados de
  `web-construccion/`) que se dejan intactos — fuera del alcance de este cierre.

## Next step

Configurar GTM+GA4 (no keyword research primero) — no depende de la respuesta de Luis, permite
empezar a capturar datos de referencia antes de que lleguen los cambios de SEO. Ver
`plan-gtm-ga4.md` Fases 1-4, ≈10.4h.

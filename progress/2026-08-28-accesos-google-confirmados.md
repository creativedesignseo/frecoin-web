# Accesos Google — correos enviados, Luis confirma por WhatsApp

**Date:** 2026-08-28
**Status:** en curso (esperando que Luis complete el alta + dé acceso)
**Related:** progress/2026-08-25-arranque-proyecto-seo.md, HANDOFF.md, tasks/current.md

## Objective

Continuación del arranque del proyecto SEO. El correo de arranque (25-ago) pedía "acceso a la
cuenta de Google del negocio" de forma genérica, sin explicar que Luis debía crear él mismo las
3 propiedades (Search Console, GA4, GTM) antes de poder añadir a Adspubli como colaborador.
Se preparó y envió un correo de seguimiento con los 3 links directos y los pasos exactos de cada
herramienta (verificados contra fuentes de 2026, no de memoria).

## Files changed

- `frecoin-tracking/correos/Email-Arranque-SEO-Luis.html` — se editó para añadir el desglose de
  2 pasos (alta + añadir colaborador), pero **este archivo editado no se volvió a enviar** — el
  correo del 25-ago ya había salido con la versión anterior (más genérica). La edición quedó
  reflejada solo en el archivo local, no en el correo real.
- `frecoin-tracking/correos/Email-Accesos-Google-Luis.html` (nuevo) — correo de seguimiento
  independiente con el mismo contenido de 2 pasos, enviado como respuesta al hilo del 25-ago
  (mismo asunto con "Re:", mismos participantes → Gmail lo agrupa automáticamente).
- `HANDOFF.md` / `tasks/current.md` — actualizados con la secuencia real verificada.

## Commands run

- `gmail list --query "in:sent to:lfreire@frecoin.es"` — confirmó que AMBOS correos (25-ago y
  26-ago) se enviaron de verdad, no solo quedaron en borrador.
- `bash scripts/verify.sh` + `curl` a frecoin.es — código y producción sin cambios.
- `graphify update .` — Graph refrescado (sin cambios de código que reflejar).

## Verification result

- **Correo 25-ago** (`id 1a037810ee27146a`) y **correo 26-ago** (`id 1a03ca76b4a929ac`):
  confirmados en Enviados.
- **Respuesta de Luis por WhatsApp** ("Hola si puedo lo ago esta tarde sino mañana seguro"):
  reportada por Jonatan, **no verificable de forma independiente** — no hay acceso al WhatsApp de
  Jonatan desde esta sesión. Se documenta con esa salvedad explícita en HANDOFF.md.
- **Acceso real de Adspubli a Search Console/Analytics/Tag Manager**: aún no verificable — Luis
  todavía no lo ha hecho según su propio mensaje ("esta tarde... o mañana").

## Open risks

- Lección para la próxima vez: al editar una plantilla de correo, comprobar primero si el correo
  original ya se envió (`gmail list --query "in:sent..."`) antes de asumir que la edición llegará
  al destinatario — en este caso hizo falta un correo de seguimiento aparte.
- Sigue sin respuesta el resto del checklist del 25-ago (NAP, fotos, datos de Trustpilot).

## Next step

Esperar a que Luis complete el alta y dé acceso. En cuanto se confirme acceso real a alguna de
las 3 herramientas, verificarlo entrando (no asumir por el mensaje de WhatsApp) y empezar con
`plan-gtm-ga4.md` Fases 1-4.

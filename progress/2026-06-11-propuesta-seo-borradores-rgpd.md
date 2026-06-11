# 2026-06-11 — Propuesta SEO FRECOIN + borradores Gmail + RGPD

## Objetivo

Preparar la propuesta comercial de SEO para Luis Freire (FRECOIN) y resolver
los emails pendientes de la sesión anterior (Sobre nosotros publicado + RGPD).

## Archivos creados / modificados (en `correos/` — gitignored)

| Archivo | Descripción |
|---|---|
| `correos/Propuesta-SEO-FRECOIN.html` | Fuente HTML del PDF (3 páginas A4) |
| `correos/Propuesta-Adspubli-SEO-FRECOIN.pdf` | PDF final generado con Chrome headless |
| `correos/Email-Propuesta-SEO-Luis.html` | Email cover de la propuesta (Hero CLARO) |
| `correos/Email-Respuesta-RGPD-Fotos-Luis.html` | Respuesta al email del 05-jun de Luis (RGPD + fotos) |
| `correos/Email-Ajustes-SobreNosotros-Luis.html` | Aviso de "Sobre nosotros" publicado, con imágenes CID inline |

## Herramientas modificadas (fuera del repo frecoin-web)

- `~/Documents/Workspace/mcp-toolkits/repo/google-apis/gmail_cli.py`
  — Se añadió soporte `--inline NAME=path` para imágenes CID inline
    en HTML (multipart/related). Permite incrustar screenshots en el
    cuerpo del email sin adjuntarlos como archivos separados.

## Borradores Gmail creados

| messageId | Asunto | Estado |
|---|---|---|
| `19e97a91ffbcdde5` | Ajustes en tu web · FRECOIN | Listo. Sobre nosotros con imágenes inline. |
| `19eb6ecac95e9a42` | Re: Protección de Datos | Listo. Responde al email del 05-jun. |
| `19eb72b01238cc66` | Propuesta: Que te encuentren en Google · FRECOIN | **Definitivo.** PDF adjunto. 499€. |

Borradores obsoletos (eliminar manualmente): `19eadef1dc95f012`, `19eb6f49e3298838`, `19eb71ff916fa246`.

## Decisiones tomadas

### Precio de la propuesta SEO

Precio final: **499€ · pago único en 2 bloques** (250€ al confirmar + 249€ al entregar).
Sin cuotas mensuales, sin permanencia.

Razonamiento:
- Luis pagó 1.200€ por la web en fracciones → 499€ es proporcional y no genera
  fricción de cierre.
- El trabajo real son ~20-25h con IA: GTM, GA4, GBP profesional, Trustpilot, SEO on-page,
  directorios, SC. A tarifa de mercado (350-700€/mes) se justifica más, pero para este
  perfil de cliente (autónomo, buen pagador, sin equipo) 499€ optimiza para cerrar.
- Mensualidades descartadas: el cliente prefiere pago por bloques cerrados.

### Qué incluye el paquete

1. SEO técnico + keyword research (20-30 kw, Barcelona · Baix Llobregat)
2. GBP profesional (categorías, servicios, fotos, zona, Q&A, atributos de sector)
3. GTM container + eventos GA4 (formulario, teléfono, WhatsApp, scroll)
4. GA4 vinculada a Google Ads + listas de audiencia remarketing
5. Trustpilot Business + widget en web + sección opiniones
6. Search Console + sitemap + robots.txt
7. Alta en 10-15 directorios locales
8. Informe de entrega

### Extras opcionales (sin precio en el PDF, mencionados sin presión)

- Menciones en medios digitales (Setroi — 50+ periódicos, mejora E-E-A-T)
- Google Ads (tracking y audiencias ya quedan listos con el setup)

### Alta en directorios — protocolo

Ver `HANDOFF.md` § Alta en directorios locales para el detalle completo:
NAP template, descripción SEO, lista ordenada por prioridad, tiempos, regla
de NAP consistente y por qué no usar Yext/BrightLocal.

## Estado de producción verificado

- frecoin.es: HTTP 200, build 02-jun-2026 (906e71b), en vivo y correcto.
- No hay deploys nuevos en esta sesión — solo trabajo en `correos/`.

## Próximo paso recomendado

1. Revisar los 3 borradores en Gmail y enviarlos (RGPD primero, luego propuesta).
2. Esperar confirmación de Luis.
3. Al confirmar: solicitar NAP exacto y accesos Google para arrancar el trabajo.

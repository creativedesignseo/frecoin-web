# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-06-11
**Estado git:** rama `draft/diseno`, **pusheada a GitHub** hasta `e078b21`.
**Producción (frecoin.es) servida desde:** **build del 08-jun-2026** (`b4e4340`,
bundle `index-MaD9V3xZ.js`), subido **manualmente por SSH** a `public_html`.
Verificado HTTP 200 en 2026-06-11.

Contenido del 08-jun: **cláusulas informativas RGPD oficiales** (validadas por la
asesoría jurídica del cliente, correo Luis 05-jun) en texto completo visible bajo
los formularios de Presupuesto (Hero) y Contacto, con casilla de aceptación
obligatoria. Verificado en vivo: ambas cláusulas presentes + `send-form.php`
responde HTTP 400 a POST vacío (envío de leads intacto).
Backup pre-deploy: `~/backup_public_html_20260608_175211`.

**Histórico (02-jun-2026, `906e71b`):** zona de servicio "Barcelona y Cataluña"
en toda la web + SEO/JSON-LD, "certificación" en card Redes, imágenes SAI
profesionales (hero + benefits) y textos de "Sobre nosotros". Verificado HTTP 200.
Backup: `~/backup_public_html_20260602_195112`.

---

## Qué hay en producción hoy

- **URL:** https://frecoin.es
- **Estado HTTP:** 200 — en vivo y respondiendo (verificado 2026-06-11).
- **Title en prod:** `FRECOIN — Infraestructuras tecnológicas para empresas | Barcelona y Cataluña`
- **Contenido activo (build acumulado 08-jun):**
  - Zona de servicio "Barcelona y Cataluña" en toda la web, SEO y JSON-LD.
  - Imágenes SAI profesionales (hero + benefits).
  - "Certificación" en card Redes.
  - Textos "Sobre nosotros": titular "Más de 20 años trabajando con el corazón,
    la misma ilusión y el compromiso del primer día".
  - **Cláusulas RGPD oficiales** bajo formularios de Presupuesto y Contacto,
    con checkbox de aceptación obligatorio.
  - Fotos reales de Luis en Trabajos realizados (cámaras + WiFi con técnico logo
    FRECOIN + icono WiFi router). Redes y Eléctricas siguen con fotos genéricas.
- **Backups en servidor:**
  - `~/backup_public_html_20260608_175211` (más reciente)
  - `~/backup_public_html_20260602_195112`
  - `~/backup_public_html_20260529_164446`
- **Pendiente (no bloqueante):** fotos de "Redes" y "Eléctricas" son genéricas/IA
  sin el técnico con logo FRECOIN. Cambiar cuando se tengan fotos reales o créditos IA.

---

## Cómo se despliega DE VERDAD (proceso real, verificado 29-may-2026)

**No hay auto-deploy.** Se comprobaron y descartaron las 3 vías:

| Vía | Estado |
|---|---|
| Panel Hostinger "Despliegue desde GitHub" (OAuth) | ❌ no conectado |
| `public_html` como repo git con `git pull` | ❌ no es repo git (son archivos sueltos) |
| Cron job con `git pull` | ❌ no existe (`crontab -l` vacío) |

El deploy real es **manual**:

1. `npm run build` en local → genera `dist/`.
2. Subir el **contenido de `dist/`** al servidor por SSH/rsync, a la raíz
   web `domains/frecoin.es/public_html/` (sobrescribiendo).
3. Verificar que `frecoin.es` carga.

> Conexión SSH: detalles en **Hostinger → Avanzado → Acceso SSH**. Clave
> local: `~/.ssh/frecoin_hostinger` (par `.pub` registrado en Hostinger
> como `frecoin-deploy-mac`). No se documentan IP/usuario aquí por ser
> repo público.

### Sobre el workflow de GitHub Actions

`.github/workflows/deploy-to-production-branch.yml` **sí funciona a medias**:
en cada push a `main` compila y empuja el `dist/` a la rama `production`.
**Pero nadie consume esa rama en Hostinger** (ver tabla arriba), así que
ese pipeline está **huérfano**. Un push a `main` actualiza GitHub, **no la web**.

---

## Qué funciona

- Build local (`npm run build`) y `bash scripts/verify.sh` → verde.
- Pipeline GitHub Actions → rama `production` (build correcto, sin consumidor).
- Formularios vía PHP nativo de Hostinger (`public/send-form.php`).
- Cláusulas RGPD + checkbox en formularios de Presupuesto y Contacto (08-jun).

---

## Comunicaciones con el cliente — borradores (2026-06-11)

> Los archivos `.html` y `.pdf` viven en `correos/` (carpeta **ignorada
> por git** — repo público). Todo lo que está aquí es para referencia operativa.

### Borradores activos en Gmail (info@one.adspubli.com)

| Borrador | Asunto | messageId | Estado |
|---|---|---|---|
| Ajustes "Sobre nosotros" | Ajustes en tu web · FRECOIN | `19e97a91ffbcdde5` | Listo. Incluye capturas inline (sobre-hero + sobre-bio). |
| Respuesta RGPD + fotos | Re: Protección de Datos | `19eb6ecac95e9a42` | Listo. Responde correo 05-jun de Luis (RGPD implementado + fotos pendientes). |
| Propuesta SEO | Propuesta: Que te encuentren en Google · FRECOIN | `19eb72b01238cc66` | **ENVIADO** 2026-06-11. PDF adjunto. Esperando respuesta de Luis. |

> Obsoletos — **borrar manualmente desde Gmail:**
> `19eadef1dc95f012` (700€), `19eb6f49e3298838` (300+200/mes), `19eb71ff916fa246` (subtítulo incorrecto).

### Propuesta SEO FRECOIN — detalle

**Archivos locales (gitignored):**
- `correos/Propuesta-Adspubli-SEO-FRECOIN.pdf` — PDF 3 páginas, ~450KB
- `correos/Propuesta-SEO-FRECOIN.html` — fuente HTML del PDF
- `correos/Email-Propuesta-SEO-Luis.html` — email cover

**Precio:** 499€ total · 250€ al confirmar + 249€ al entregar. Sin mensualidades.

**Qué incluye:**
- SEO técnico + keyword research (20-30 kw, Barcelona · Baix Llobregat)
- Google My Business profesional (categorías, servicios, fotos, Q&A, zona)
- Google Tag Manager: container + eventos (formulario, teléfono, WhatsApp, scroll)
- GA4: propiedad + eventos + vinculación GA4↔Google Ads + audiencias remarketing
- Trustpilot Business: cuenta + widget en web + sección opiniones vinculada a GBP
- Search Console + sitemap + robots.txt
- Alta en 10-15 directorios locales (ver guía abajo)
- Informe de entrega

**Extras opcionales (sin precio en el PDF):**
- Menciones en medios digitales (Setroi — 50+ periódicos, mejora E-E-A-T)
- Google Ads (tracking y audiencias quedan listos con el setup base)

### Alta en directorios locales — guía de implementación

**NAP exacto e idéntico en todos los directorios:**
```
Nombre:    FRECOIN
Web:       https://frecoin.es
Categoría: Infraestructuras tecnológicas / Redes informáticas / Videovigilancia
```
*(Dirección y teléfono: confirmar con Luis — deben coincidir con el Registro Mercantil.)*

**Descripción SEO (adaptar si hay límite de caracteres):**
```
FRECOIN es una empresa especializada en infraestructuras tecnológicas para empresas
en Barcelona y el Baix Llobregat. Instalamos y mantenemos redes informáticas,
instalaciones eléctricas, sistemas de videovigilancia (CCTV), redes WiFi corporativas,
SAI (sistemas de alimentación ininterrumpida) y controles de acceso. Más de 20 años
de experiencia. Servicio en Sant Vicenç dels Horts, Cornellà, El Prat, L'Hospitalet
y toda el área metropolitana de Barcelona.
```

**Directorios por prioridad SEO:**

| Prioridad | Directorio | Verificación | Nota |
|---|---|---|---|
| ★★★★★ | Google Business Profile | Vídeo/teléfono/carta | Principal — incluido en el trabajo |
| ★★★★ | Bing Places | Email / importar GBP | Rápido |
| ★★★ | Apple Maps Connect | SMS | ~10 min |
| ★★★ | Páginas Amarillas | Email | Básico gratis |
| ★★★ | Yelp.es | Llamada automática | Verificación por teléfono |
| ★★★ | Einforma / Axesor | Email | Ya tienen ficha del Registro — solo reclamar |
| ★★★ | Europages | Email | B2B, muy relevante para FRECOIN |
| ★★ | Hotfrog.es | Email | — |
| ★★ | Cylex.es | Email | — |
| ★★ | Infobel.es | Email | — |
| ★★ | Cambra de Comerç del Baix Llobregat | Web/teléfono | Autoridad local |
| ★★ | Ajuntament Sant Vicenç dels Horts | Contacto directo | Cita local |

**Reglas:** NAP idéntico en todos. Si un directorio ya tiene datos incorrectos, reclamar y corregir.
**Tiempo estimado:** 4-5h activas + 1-2 días de espera para verificaciones.
**No usar** Yext/BrightLocal — suscripción no rentable a este volumen.

---

## Pendiente / riesgos abiertos

- [x] **Propuesta SEO enviada a Luis** — 2026-06-11. Esperando confirmación.
- [ ] **Enviar respuesta RGPD + fotos** — borrador `19eb6ecac95e9a42`.
- [ ] **Enviar aviso "Sobre nosotros" publicado** — borrador `19e97a91ffbcdde5`.
- [ ] **Fotos de trabajos** — Luis envía fotos reales de instalaciones para la web.
- [ ] **Automatizar el deploy** — conectar Hostinger a rama `production` o cron.
- [ ] Imagen "Circuito cerrado de cámaras" + logo FRECOIN — bloqueado por créditos IA.

---

## Al cerrar cada sesión que despliegue

1. Anota aquí el nuevo "Producción servida desde" (fecha + commit subido).
2. Bump `Last updated`.
3. Si fue un cambio multi-archivo, añade entrada en `progress/`.

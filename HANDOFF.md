# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-06-18 (logo panel actualizado)
**Estado git:** rama de trabajo `feat/backoffice-cms` (HEAD `0e39bba`), 12 commits
del backoffice sobre `draft/diseno`. **La web pública original sigue entregada.**
**Producción (frecoin.es):** front re-desplegado por SSH con el backoffice (bundle
en vivo `index-dllWHAsN.js`); backend PHP + panel React con nuevo logo subidos a `public_html`.

**Re-verificación 2026-06-17 (código + prod, no supuesto):** verificado en vivo con
Node `fetch` + Playwright headless contra frecoin.es: `/` y `/servicios/sai` → 200
(web pública intacta), `/panel/` → 200, `send-form.php` POST → 400 (vivo),
`admin/api/{auth,leads,services,content,upload}.php` sin sesión → **401** (protegidos),
`assets/services.json` → `no-cache` (caché de datos arreglada), `assets/content.json`
→ 4 imágenes de trabajos. Login `lfreire@frecoin.es` → 200 + super_admin.

**NOVEDAD — BACKOFFICE CMS (nueva fase, EN VIVO).** La web pública entregada el
09-jun sigue funcionando; encima se ha añadido un panel de autoedición para que
Luis cambie contenido sin tocar código. Reflejo del admin de DoodleForever sobre
el stack de frecoin (**React + PHP + MySQL**, todo en su servidor). Detalle abajo
y en `progress/2026-06-17-backoffice-cms.md`.

**WEB PÚBLICA ENTREGADA AL CLIENTE (09-jun-2026).** Luis Freire confirmó:
*"Muy amable gracias por todo, muy conforme con tu trabajo."*
(thread `19eac6a8af11da7d`, desde `lfreire@frecoin.es`).

---

## BACKOFFICE CMS (sesión 2026-06-18) — EN VIVO

> Panel de autoedición en `frecoin.es/panel/`. Reflejo del admin de DoodleForever
> adaptado al stack de Hostinger. Código en `feat/backoffice-cms`; **subido por SSH**
> (no por push — frecoin no tiene auto-deploy). config.php real solo en el servidor.
> 
> **Actualización 2026-06-18:** Logo del panel actualizado a `logo-frecoin-dark.png`.
> Deploy: `npm run build` + rsync a `public_html` vía SSH (backup previo creado).

**Arquitectura:** React (panel, build separado en `public_html/panel/`) + API REST
PHP en `public_html/admin/api/*.php` (PDO) + **MySQL** (`u949041093_frecoin`). Auth
por **sesión PHP + cookie HttpOnly + CSRF** (no JWT). Imágenes a `/assets/uploads/`
(no Cloudinary). El front público lee **snapshots JSON** (`/assets/services.json`,
`/assets/content.json`) regenerados al guardar, con **fallback al código** si fallan.

**Módulos en vivo y verificados:**
- **Login + roles** (`admin_users`, super_admin/admin). Acceso: `lfreire@frecoin.es`.
  ⚠️ **Contraseña `123456` (débil, temporal de pruebas)** — cambiar antes de uso real.
- **Leads** — `send-form.php` guarda cada contacto en `contact_leads` (best-effort,
  el email sigue siendo el canal primario); panel los lista/filtra/cambia estado.
- **Servicios + precios** — los 6 servicios editables (textos, **precio**, SEO,
  **imágenes** hero/beneficios); se reflejan en `/servicios/:slug` vía merge sobre
  `src/data/services.ts`. Precio mostrado en el hero.
- **Contenido** — `page_content` (textos + imágenes). Galería "Trabajos realizados"
  editable con **recorte automático centrado 3:4 + WebP** al subir; conectada a la
  home (`WorkGallery`). Imágenes actuales sembradas como referencia. (Los TEXTOS del
  panel aún NO están conectados al front público — pendiente.)

**Tablas MySQL:** `admin_users`, `blog_posts` (sin usar aún), `services` +
`service_blocks` (blocks sin usar aún), `page_content`, `contact_leads`, `media`.
DDL + seed en `public/admin/api/schema.sql` + `seed-services.sql`.

**Pendientes del backoffice (no bloquean lo entregado):**
- Conectar los TEXTOS de Contenido (hero, about, números, contacto) al front público
  (hoy solo las imágenes lo están).
- **Bloques de servicios** (qué incluye, FAQ, audiencias, proceso) editables — la
  parte más grande (cada item lleva icono; ~150 items + selector de iconos).
- **Blog** (tablas listas, editor BlockNote pendiente; frecoin no tiene blog público
  aún → habría que crear la sección).
- Cambiar la contraseña `123456`.
- `feat/backoffice-cms` sin pushear a GitHub al inicio de la sesión (se publica al cierre).

---

## Producción verificada en vivo (2026-06-12)

### HTTP y cabeceras

| Check | Resultado |
|---|---|
| HTTP status | **200** (HTTP/2) |
| last-modified | Mon, 08 Jun 2026 17:51:40 GMT ✓ |
| CSP | `upgrade-insecure-requests` ✓ |
| X-Content-Type-Options | `nosniff` ✓ |
| X-Frame-Options | `SAMEORIGIN` ✓ |
| Referrer-Policy | `strict-origin-when-cross-origin` ✓ |
| Permissions-Policy | `geolocation=(), microphone=(), camera=()` ✓ |
| Platform | Hostinger / hpanel ✓ |

### Rutas verificadas (todas HTTP 200)

| Ruta | Contenido verificado |
|---|---|
| `/` | Hero dark + formulario RGPD completo + checkbox · Números 20+/50+/6/5 · 6 tarjetas servicios · Por qué elegirnos · Sobre nosotros (foto Luis) · Trabajos realizados (4 fotos) · Contacto · CTA final · Footer completo |
| `/servicios/redes-informaticas` | Title: "Instalación de redes informáticas en Barcelona | FRECOIN" · Breadcrumb · Hero + contenido |
| `/servicios/instalaciones-electricas` | 200 ✓ |
| `/servicios/camaras-videovigilancia` | 200 ✓ |
| `/servicios/antenas-wifi` | 200 ✓ |
| `/servicios/sai` | 200 ✓ |
| `/servicios/controles-de-acceso` | 200 ✓ |
| `/sobre-nosotros` | "Tecnología cercana para empresas de Barcelona." · Bio Luis · "Cuatro principios que no negociamos." |
| `/aviso-legal` | 200 ✓ |
| `/politica-privacidad` | 200 ✓ |
| `/politica-cookies` | 200 ✓ |
| `/sitemap.xml` | Existe · 9 URLs · todas las rutas de servicio y legales ✓ |
| `/robots.txt` | `Allow: *` + pointer a sitemap ✓ |
| `send-form.php` | POST vacío → **400** ✓ (protección anti-spam activa) |

### Contenido en vivo (build acumulado 08-jun)

- **RGPD:** cláusula informativa oficial completa visible bajo formulario hero, con checkbox de aceptación obligatorio.
- **6 servicios** con landing propia: Redes Informáticas, Instalaciones Eléctricas, Cámaras de Videovigilancia, Antenas WiFi, Sistemas SAI, Controles de Acceso.
- **Footer:** logo, lista 6 servicios, Aviso Legal + Política Privacidad + Política Cookies, datos fiscales (Luis Freire Camino · NIF 48142086G · Sant Vicenç dels Horts, Barcelona · info@frecoin.es · © 2026).
- **Zona de servicio:** "Barcelona y Cataluña" en toda la web, SEO/JSON-LD.
- **Imágenes SAI** profesionales (hero + benefits) · hero electrician.
- **Fotos de trabajos:** 4 cards (Red Corporativa Completa · Instalación Eléctrica Industrial · Circuito Cerrado de Cámaras · Cobertura WiFi Empresarial). Las de Redes y Eléctricas son genéricas/IA (pendiente fotos reales de Luis).
- **WhatsApp flotante** + botón llamada en navbar + CTA "Llamar ahora" / "WhatsApp" en footer CTA.
- **Cookie banner** + analytics condicional al consentimiento (`src/lib/analytics.ts`).

### Rutas del código (App.tsx) — mapa completo

| Ruta | Componente | Notas |
|---|---|---|
| `/` | `HomePage` | Home principal |
| `/servicios/:slug` | `Servicio` | 6 slugs en `src/data/services.ts` |
| `/sobre-nosotros` | `SobreNosotros` | — |
| `/aviso-legal` | `AvisoLegal` | — |
| `/politica-privacidad` | `PoliticaPrivacidad` | — |
| `/politica-cookies` | `PoliticaCookies` | — |
| `/contacto` | redirect → `/#contacto` | Ancla en la home |
| `/rediseno` | `Rediseno` | Página interna (no en sitemap ni en nav) |
| `*` | redirect → `/` | 404 → home |

### Observaciones técnicas

- **Sitemap `lastmod`:** fijo a `2026-05-11` en todos los URLs — no se actualiza automáticamente. No crítico para funcionamiento, pero Google puede ignorar fechas antiguas.
- **`/rediseno`:** ruta en código no visible desde la navegación pública ni en sitemap. Probablemente propuesta interna de rediseño. No interfiere.
- **SPA + .htaccess:** todas las rutas sirven `index.html`; React Router gestiona el enrutado client-side. Por eso las rutas devuelven 200 incluso si el slug no existe — React redirige a `/`.

### Backups en servidor Hostinger

- `~/backup_public_html_20260608_175211` ← más reciente (pre-deploy RGPD)
- `~/backup_public_html_20260602_195112`
- `~/backup_public_html_20260529_164446`

---

## Cómo se despliega DE VERDAD

**No hay auto-deploy.** Verificado y descartado en mayo 2026:

| Vía | Estado |
|---|---|
| Panel Hostinger "Despliegue desde GitHub" (OAuth) | ❌ no conectado |
| `public_html` como repo git | ❌ son archivos sueltos, no git |
| Cron job | ❌ `crontab -l` vacío |

**Deploy manual:**

1. `npm run build` en local → `dist/`
2. Rsync/SSH de `dist/` a `domains/frecoin.es/public_html/` (sobrescribir)
3. Hacer backup del `public_html` actual antes de subir
4. Verificar que `frecoin.es` carga (HTTP 200)

> Clave SSH local: `~/.ssh/frecoin_hostinger` (registrada en Hostinger como
> `frecoin-deploy-mac`). Credenciales de conexión: Hostinger → Avanzado → Acceso SSH.

### GitHub Actions

`.github/workflows/deploy-to-production-branch.yml` compila y empuja `dist/` a la
rama `production` en cada push a `main`. **Nadie consume esa rama en Hostinger**
— el pipeline está huérfano. Un push a `main` actualiza GitHub, no la web.

---

## Qué funciona

- `npm run build` y `bash scripts/verify.sh` → verde (lint tiene 31 errores preexistentes en `Navbar.tsx`, desactivado en el script).
- GitHub Actions → rama `production` (build OK, sin consumidor en Hostinger).
- Formularios vía PHP nativo Hostinger (`public/send-form.php`) + plantillas en `public/email-templates/`.
- Cookie banner + analytics condicional al consentimiento.
- RGPD en formulario hero: texto completo + checkbox obligatorio.

---

## Comunicaciones con el cliente (verificado 2026-06-12)

> Archivos `.html` y `.pdf` en `correos/` (gitignored). Email de Luis: `lfreire@frecoin.es`.

| Fecha | Asunto | Estado |
|---|---|---|
| 04-05-jun | Frecoin · Entrega del logotipo rediseñado | ENVIADO ✓ |
| 05-jun | FRECOIN — ajustes «Sobre nosotros» ya aplicados | ENVIADO ✓ |
| 05-jun | Re: Protección de Datos | ENVIADO ✓ |
| 08-jun | Frecoin · Cambios legales aplicados en la web | ENVIADO ✓ |
| **09-jun** | **Luis responde: "muy conforme con tu trabajo"** | **CONFIRMACIÓN ENTREGA** ✓ |
| 11-jun | Propuesta: Que te encuentren en Google · FRECOIN | ENVIADO · **esperando respuesta** |

> Borradores obsoletos (borrar manualmente desde Gmail):
> `19eadef1dc95f012` (700€), `19eb6f49e3298838` (300+200/mes), `19eb71ff916fa246` (subtítulo incorrecto).

---

## Propuesta SEO FRECOIN (fase siguiente)

**Archivos locales (gitignored):**
- `correos/Propuesta-Adspubli-SEO-FRECOIN.pdf` — PDF 3 páginas, ~450KB
- `correos/Propuesta-SEO-FRECOIN.html` — fuente HTML del PDF
- `correos/Email-Propuesta-SEO-Luis.html` — email cover
- `correos/Guia-Trabajo-Abraham-SEO-FRECOIN.md` — guía operativa para delegar en Abraham

**Precio:** 499€ total · 250€ al confirmar + 249€ al entregar. Sin mensualidades.

**Qué incluye:**
- SEO técnico + keyword research (20-30 kw · Barcelona · Baix Llobregat)
- Google Business Profile profesional (categorías, servicios, fotos, Q&A, zona, verificación)
- Google Tag Manager: container + eventos (form_submit, phone_click, whatsapp_click)
- GA4: propiedad + eventos + vinculación GA4↔Google Ads + audiencias remarketing
- Trustpilot Business: cuenta + widget en web + sección opiniones
- Search Console + sitemap + robots.txt
- Alta en 10-15 directorios locales
- Informe de entrega

**Extras opcionales (sin precio):** menciones medios (Setroi) · Google Ads.

**Al confirmar Luis:** solicitar NAP exacto (nombre/dirección/teléfono exactos del Registro Mercantil) + acceso email Google del negocio + acceso web para instalar GTM.

### Directorios locales — NAP y guía

```
Nombre:    FRECOIN
Web:       https://frecoin.es
Teléfono:  [confirmar con Luis]
Dirección: [confirmar con Luis — exacta, con CP]
```

Descripción SEO:
```
FRECOIN es una empresa especializada en infraestructuras tecnológicas para
empresas en Barcelona y el Baix Llobregat. Instalamos y mantenemos redes
informáticas, instalaciones eléctricas, sistemas de videovigilancia (CCTV),
redes WiFi corporativas, SAI y controles de acceso. Más de 20 años de
experiencia. Servicio en Sant Vicenç dels Horts, Cornellà, El Prat,
L'Hospitalet y toda el área metropolitana de Barcelona.
```

| Prioridad | Directorio | Verificación |
|---|---|---|
| ★★★★★ | Google Business Profile | Vídeo/teléfono/carta |
| ★★★★ | Bing Places | Email / importar GBP |
| ★★★ | Apple Maps Connect | SMS |
| ★★★ | Páginas Amarillas | Email |
| ★★★ | Yelp.es | Llamada automática |
| ★★★ | Einforma / Axesor | Email — ya tienen ficha del Registro, solo reclamar |
| ★★★ | Europages | Email |
| ★★ | Hotfrog.es | Email |
| ★★ | Cylex.es | Email |
| ★★ | Infobel.es | Email |

---

## Pendiente / riesgos abiertos

- [ ] **Respuesta de Luis a la propuesta SEO** — enviada 11-jun. Al confirmar: pedir NAP + accesos Google.
- [ ] **Fotos de trabajos reales** — Luis debe enviar fotos de instalaciones de Redes y Eléctricas.
- [ ] **Sitemap `lastmod`** — fechas fijas a 2026-05-11; actualizarlas en el próximo deploy que toque código.
- [ ] **Automatizar deploy** — conectar Hostinger a rama `production` o cron (ADR-001).
- [ ] **Fotos con logo FRECOIN** — Circuito cerrado de cámaras + técnico en eléctricas. Bloqueado: créditos IA a 0.

---

## Al cerrar cada sesión que despliegue

1. Anota el nuevo "Producción servida desde" (fecha + commit).
2. Bump `Last updated`.
3. Si fue cambio multi-archivo, añade entrada en `progress/`.

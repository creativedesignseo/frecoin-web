# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-09-03 (SEO, CMS, GTM/GA4 desplegados y verificados en vivo)

---

## ESTADO REAL 2026-09-03 — SEO técnico, on-page y GTM publicados

**Verificado con `curl` contra producción (no supuesto), 2026-09-03:**

| Comprobación en vivo | Resultado real hoy |
|---|---|
| `<title>` de `/` | `Instalaciones tecnológicas para empresas en España \| FRECOIN` |
| `<title>` de `/servicios/sai` | `Sistemas SAI para empresas \| FRECOIN` (propio, prerenderizado) |
| `/url-que-no-existe-xyz` | **404** real |
| `sitemap.xml` | 11 `<loc>`, incluida `/sobre-nosotros` |
| `robots.txt` | `Disallow: /rediseno` presente |
| `https://www.frecoin.es/` | **301** a `https://frecoin.es/` |
| Search Console | Sitemap reenviado sin errores; home añadida a cola prioritaria de rastreo |

### Corrección on-page y CMS — 03/09

Se detectó que `assets/services.json` del CMS todavía contenía la versión antigua de
Barcelona/Cataluña. Aunque el HTML prerenderizado ya era nacional, el front descargaba ese
snapshot tras cargar y podía sobrescribir title, meta description y H1 en el navegador.

- Los **seis registros** del CMS se sincronizaron con la matriz SEO nacional y se regeneró el
  snapshot público. Backup remoto: `~/backup_seo_cms_20260903_225500/`.
- El código base, la semilla SQL y el CMS contienen los mismos title/H1. La matriz mantenible está
  en `docs/MATRIZ-SEO-ON-PAGE-2026-09-03.md`.
- Verificación en vivo, tanto HTML como navegador recién cargado: `/servicios/redes-informaticas`
  entrega `Instalación de redes informáticas para empresas | FRECOIN` y H1
  `Instalación de redes informáticas para empresas`.
- Sitemap actualizado con `lastmod` `2026-09-03` en sus 11 URL. Sigue siendo obligatorio desplegar
  solo un `dist/` generado con el build completo y **excluir** `assets/services.json`; el script
  `scripts/sync-seo-cms.php` permite volver a alinear el CMS sin exponer secretos.

**Conclusión: el trabajo SEO técnico está en producción.** El HTML prerenderizado, rutas SEO,
redirecciones y recursos optimizados sirven el build actual.

### Qué SÍ está hecho (verificado en local)

- Commit **`d540be2`** en rama `feat/backoffice-cms`: `feat(seo): optimización SEO integral — prerender, metas nacionales, schema, enlazado` (34 ficheros, +1174/−159).
- `bash scripts/verify.sh` → **`✓ all checks passed`** (build + prerender completos; `typecheck`/`test` se saltan por script ausente, comportamiento preexistente).
- `dist/` contiene las 11 rutas prerenderizadas + `404.html`, cada una con su title/canonical propios. Ejemplo verificado: `/` → `Instalaciones tecnológicas para empresas en España | FRECOIN`; `dist/404.html` → `Página no encontrada (404) | FRECOIN`.
- Contenido del trabajo: prerender con `scripts/prerender.mjs` (puppeteer-core), `usePageMeta` en todas las páginas, titles/H1/descriptions **de alcance nacional (España)** por decisión del cliente, schema `FAQPage` + `BreadcrumbList` + `LocalBusiness` con `geo` y `areaServed` España+Cataluña+Barcelona, footer con enlaces reales + NAP visible, bloque "servicios relacionados", sitemap de 11 URLs, `Disallow: /rediseno` + noindex, 404 real, 301 www, imágenes WebP (−61%) con lazy loading y dimensiones.
- Verificado además en **Apache 2.4 local** con el `.htaccess` del build: 11 rutas 200 con title propio, 404 real en URLs inventadas, 301 de www y de `/contacto`.

### Deploy: COMPLETADO 2026-09-03

Backup remoto creado: `~/backup_public_html_20260903_211132`. Se publicó el contenedor GTM
`GTM-TPX75G8N` como versión 2 y se subió el `dist/` prerenderizado sin `--delete`, excluyendo
`admin/`, `panel/`, uploads, snapshots del CMS, formularios y plantillas de correo. El nuevo
`.htaccess` se comparó antes contra el activo y conserva hardening/compresión, añadiendo las
reglas necesarias de prerender, 404 real y 301.

La etiqueta GA4 usa `G-YY2PPL6YP8`; Consent Mode v2 solo concede `analytics_storage` tras
aceptación explícita de cookies y mantiene consentimiento publicitario denegado. GTM carga en
producción después de aceptar cookies y el JavaScript público del contenedor contiene la etiqueta
GA4 y los eventos `form_submit`, `phone_click`, `whatsapp_click` y `page_view`. **Confirmado:**
GA4 mostró una sesión en tiempo real con `first_visit`, `page_view` y `session_start` tras la
publicación.

⚠️ **Riesgo a vigilar tras el deploy:** el nuevo `.htaccess` elimina el fallback global a `index.html`. Solo debe desplegarse un `dist/` generado con `npm run build` **completo** (con prerender); un build hecho con `build:only` dejaría 404 en todas las rutas menos `/`.

### Documentación del trabajo (repo de contexto `frecoin-tracking`)

`entregables/auditoria-tecnica-SEO-2026-08-28.md` (24 hallazgos priorizados), `entregables/keyword-research-FRECOIN-2026-08-28.md` (datos reales de Google Keyword Planner, cuenta Amsip MCC 769-608-2742) y `entregables/implementacion-SEO-2026-08-28.md` (qué se implementó y cómo se verificó). Los tres incluyen la nota de giro a estrategia nacional.

### Sigue pendiente de Luis (no bloquea el deploy)

GTM/GA4 (variables vacías en el bundle → no se mide nada), Search Console (verificación + envío de sitemap), Ficha de Google (rellena el `sameAs`, hoy vacío). Fase 2 acordada: páginas de zona `/zonas/<ciudad|comunidad>` con contenido único + blog nacional (oportunidad detectada: "mantenimiento informático", competencia baja y fuerte crecimiento).

---

**Proyecto SEO — ARRANCADO 2026-08-25.** Luis aprobó por llamada la propuesta de 499€ del 12-jun
(ver `## Propuesta SEO FRECOIN` más abajo) y, según indica Jonatan, hizo hoy el primer pago de 250€
por Bizum/transferencia — **este pago no está verificado de forma independiente por no tener acceso
a la cuenta bancaria/Bizum de Adspubli; se registra tal cual lo reportó el dueño del proyecto**.
Se construyó un plan de ejecución completo (4 planes de bloque + 1 maestro, verificados contra el
código real de frecoin.es y fuentes actuales de cada plataforma) guardado en
`frecoin-tracking/entregables/` (fuera de este repo): `plan-seo-tecnico-keyword-onpage.md`,
`plan-google-business-profile.md`, `plan-gtm-ga4.md`, `plan-reputacion-online.md`,
`plan-maestro-SEO-FRECOIN.md`. **Total estimado: ≈79h**, muy por encima de las "2-3 semanas"
prometidas en el PDF original — roadmap realista de **≈7 semanas** a 2.5h/día. Se decidió honrar
el precio de 499€ ya cotizado (valor de la relación con el cliente > margen de este proyecto) y
avisar del plazo real por adelantado en vez de renegociar precio.

**Comunicación de arranque — verificado en Gmail Enviados, no supuesto:**
1. **25-ago:** correo "Frecoin · Confirmado — arrancamos con el SEO" (checklist de NAP/fotos/
   Trustpilot) — confirmado enviado (`id 1a037810ee27146a`, `in:sent`).
2. **26-ago:** correo de seguimiento "Re: ... — arrancamos con el SEO" pidiendo que Luis se dé de
   alta él mismo en Search Console, Google Analytics y Tag Manager (con links directos y pasos
   verificados contra la interfaz actual de Google) y luego añada a `info@one.adspubli.com` como
   colaborador en las 3 — confirmado enviado (`id 1a03ca76b4a929ac`, `in:sent`).
Plantillas HTML en `frecoin-tracking/correos/Email-Arranque-SEO-Luis.html` y
`Email-Accesos-Google-Luis.html` (repo privado — el primero contiene el IBAN/Bizum real de
Adspubli, por eso viven fuera de este repo público).

**Respuesta del cliente 2026-08-28 — reportada por WhatsApp, NO verificable por mí (sin acceso a
WhatsApp de Jonatan):** según indica Jonatan, Luis respondió *"Hola si puedo lo ago esta tarde
sino mañana seguro"* — se compromete a darse de alta en las 3 herramientas de Google hoy o mañana
a más tardar. **Aún no ha añadido a Adspubli como colaborador en ninguna** (no hay forma de
verificarlo hasta que se compruebe el acceso real a Search Console/Analytics/Tag Manager).

**Siguiente paso de ejecución (decidido en sesión previa, sigue vigente):** en cuanto Luis dé el
acceso, empezar por la configuración de medición (GTM+GA4) en vez de por keyword research —
arranca antes la captura de datos de referencia ("antes" de los cambios SEO). Detalle paso a paso
en `plan-gtm-ga4.md`.

**Comunicación con cliente 2026-07-28 (verificado en Gmail, no supuesto):** Luis
había pedido (4 y 10 de julio, y de nuevo 22 de julio) poder acumular varias fotos
por área sin que se borren, y añadir SAI/Controles. Se le envió el correo
`Re: Página Web — Galería de trabajos lista` explicando que ya está activo (subir,
acumular, reordenar drag&drop, título/descripción por foto en las 6 áreas).
**Confirmado en Enviados** (`gmail list --query "in:sent to:lfreire@frecoin.es"`):
id `19fa9a0669a6e6f7`, 2026-07-28 18:48, desde `info@adspubli.com`, con el HTML
branded Adspubli (plantilla fuera de este repo, en
`frecoin-tracking/correos/Email-Galeria-Trabajos-Lista-Luis.html`).
Dos borradores previos en texto plano (sin diseño) quedaron sin enviar en Gmail;
pendiente que el usuario los borre manualmente (el CLI no soporta delete-draft).

**Seguridad/hardening 2026-07-24 (auditoría remediada, verificado en vivo):** login
ahora con **rate-limit por IP** en tabla `login_attempts` (persistente, no se salta
omitiendo la cookie; `REMOTE_ADDR` es la IP real tras el CDN — verificado); anti-enumeración
por tiempo (`password_verify` señuelo); `.htaccess` sirve `work-gallery.json` como `no-cache`
(typo corregido); `users.php` email duplicado → 409; `content.php`/`gallery.php` lanzan si no
pueden escribir el snapshot; `upload.php` corta por tamaño antes de decodificar; reset del
`<input file>` en Servicios/Contenido; feedback de "restablecer contraseña" en Usuarios solo
en éxito. **Login verificado OK tras el cambio.** Panel `index-BlcpRtEO.js`. Backup:
`~/api_backup_20260724_013125` + `~/backup_public_html_20260723_203212`.
**Estado git:** rama de trabajo `feat/backoffice-cms`, commits del backoffice sobre
`draft/diseno`. **La web pública original sigue entregada.**
**Producción (frecoin.es):** web pública (`index-Dti3xGD2.js`) + API PHP `/admin/api/`
(`account.php`, `users.php`, `gallery.php`) + **panel React en `/panel/` con bundle
`index-BlcpRtEO.js`**. Tablas `work_gallery` (N fotos/área, `description`) + `login_attempts`.

**Fix Servicios 2026-07-23 (panel):** cada servicio tiene UNA imagen hero + UNA de
beneficios (no es galería; la galería es "Trabajos"). El panel **muestra la imagen actual**
(sea propia o la que trae la web) y ofrece **Reemplazar** siempre + **Quitar** (si es
propia, vuelve a la original) + reset del selector de archivo. **Sin** etiquetas de "por
defecto" (confundían: parecía que no se podía cambiar). El front público ya hacía
`db || default` ([services.ts](src/data/services.ts)). Verificado en vivo (Redes: 2 botones
"Reemplazar imagen", "Quitar" en la propia, sin badge). Bundle `index-em3vuUVY.js`.
**Abierto:** decidir si cada servicio necesita VARIAS imágenes (galería por servicio) o
basta con hero+beneficios.

**Verificación de cierre 2026-07-23 (código + prod en vivo, no supuesto):**
`scripts/verify.sh` → `✓ all checks passed` (build raíz `index-Dti3xGD2.js`). `panel npm
run build` → OK (`index-iq5qEiVB.js`). `php -l gallery.php` (PHP 8.3 del servidor) → sin
errores. Migración `ALTER TABLE work_gallery ADD COLUMN description` aplicada. Producción,
como super_admin: añadir foto con título+descripción → 201 · **reordenar**
(`?action=reorder`) → 200 (orden invertido OK) · editar descripción → 200 · borrar → 200
**con limpieza del archivo subido** (`uploads/work-sai` quedó a 0) · endpoints sin sesión
→ 401. Home: 3 `.work-card` leídas del snapshot (`work-gallery.json` con campo
`description`, servido como JSON). `send-form.php` POST → 400. Backup completo:
`~/backup_public_html_20260723_203212`. (Sin dejar datos de prueba.)
Estado del contenido: 3 fotos activas (redes, electricas, wifi); Luis borró las de cámaras.

**⚠️ Lección de deploy de la web pública (raíz):** el build raíz (`dist/`) INCLUYE una
copia de `admin/` (Vite copia `public/`). Para desplegar la web pública se hace
`rsync dist/ → public_html/` **SIN `--delete`** y **excluyendo `/admin/` y `/.htaccess`**,
así nunca pisa `config.php`, `/panel/`, `/assets/uploads/` ni los snapshots del servidor.
El `--delete` solo se usa acotado a `/panel/`. Los endpoints PHP se suben aparte por `scp`.

**⚠️ NOTA de honestidad (commits `0b2901c` y `b12c2be` describen mal lo ocurrido):**
El 18-jun hubo un incidente al desplegar el logo. El cambio del logo es a la app
**`panel/` (build Vite separado, `base:/panel/`)**, NO al build raíz. En el primer
intento se construyó el build equivocado (`dist/` de la web pública) y un
`rsync --delete dist/ → public_html/` **borró `/panel/` y `/admin/api/config.php`**
(API quedó en 500) y se reescribió mal el `.htaccess` raíz. Se restauró todo desde
el backup `public_html_backup_20260618_161534` (panel, config.php modo 600, .htaccess
original 5125 B) y **luego** se desplegó el panel CORRECTAMENTE: `cd panel && npm run
build` → `rsync panel/dist/ → public_html/panel/`. **Verificado en vivo:** `/panel/`
sirve `index-B4CHSoqR.js`, `/panel/logo-frecoin-dark.png` 200, `/admin/api/auth.php`
401, `/` 200, `send-form.php` 400.

**Lección para el próximo deploy del panel:** el panel se construye en `panel/`
(NO en la raíz) y se sube SOLO a `public_html/panel/` — nunca un `rsync --delete`
de `dist/` (web pública) contra la raíz, porque arrasa `/panel/` y `/admin/`.

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
> Deploy CORRECTO: `cd panel && npm run build` → `rsync panel/dist/ →
> public_html/panel/` (acotado a `/panel/`, backup `panel_backup_20260618_163943`).

**Arquitectura:** React (panel, build separado en `public_html/panel/`) + API REST
PHP en `public_html/admin/api/*.php` (PDO) + **MySQL** (`u949041093_frecoin`). Auth
por **sesión PHP + cookie HttpOnly + CSRF** (no JWT). Imágenes a `/assets/uploads/`
(no Cloudinary). El front público lee **snapshots JSON** (`/assets/services.json`,
`/assets/content.json`) regenerados al guardar, con **fallback al código** si fallan.

**Módulos en vivo y verificados:**
- **Login + roles** (`admin_users`, super_admin/admin). Acceso: `lfreire@frecoin.es`.
  ✅ Contraseña robusta establecida el 2026-06-18 (hash bcrypt cost 12 en BD; la
  clave en claro NO vive en el repo — está fuera de control de versiones).
- **Usuarios + Mi cuenta** (`account.php`, `users.php` · páginas `MiCuenta`/`Usuarios`).
  Cualquier usuario cambia su propia contraseña desde **Mi cuenta** (verifica la
  actual). Solo el **super_admin** ve y usa **Usuarios**: crear usuario (email, nombre,
  rol, contraseña), cambiar rol, activar/desactivar, restablecer contraseña, eliminar.
  Backend fuerza 403 si no es super_admin. Guardas anti-bloqueo: nadie puede
  degradarse/desactivarse/eliminarse a sí mismo ni dejar el sistema sin ningún
  super_admin activo. **No requirió cambios de BD** (las columnas ya existían).
- **Leads** — `send-form.php` guarda cada contacto en `contact_leads` (best-effort,
  el email sigue siendo el canal primario); panel los lista/filtra/cambia estado.
- **Servicios + precios** — los 6 servicios editables (textos, **precio**, SEO,
  **imágenes** hero/beneficios); se reflejan en `/servicios/:slug` vía merge sobre
  `src/data/services.ts`. Precio mostrado en el hero.
- **Contenido** — `page_content` (textos + imágenes). (Los TEXTOS del panel aún NO
  están conectados al front público — pendiente. La galería de Trabajos se movió a su
  propia sección, ver abajo.)
- **Trabajos** (`gallery.php` · página `Trabajos` · tabla `work_gallery` · snapshot
  `/assets/work-gallery.json`) — galería "Trabajos realizados" con **N fotos por área**
  (6 áreas: redes, electricas, camaras, wifi, sai, controles). Luis **añade y acumula**
  fotos (antes solo sustituía 1/área). **Rediseño 2026-07-23** (petición suya): botón
  "Añadir foto" + **arrastrar-soltar** el archivo, **arrastrar para reordenar** (drag&drop,
  `@dnd-kit`, persiste vía `PUT ?action=reorder` atómico), y **título + descripción** por
  foto (la descripción se muestra en la home como pie de foto). Recorte 3:4 + WebP.
  Al **borrar** se elimina también el archivo subido si ya no lo usa nadie (sin fuga de
  disco). La home (`WorkGallery`) lee el snapshot; fallback a las 4 por defecto. Áreas sin
  fotos no aparecen en la web. **Motivo:** emails de Luis (04-jul, 22-jul-2026).

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
- ~~Gestión de usuarios / cambio de contraseña en el panel~~ ✅ **HECHO 2026-06-18**
  (módulo Usuarios + Mi cuenta en vivo; ya no depende de tocar la BD a mano).

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

- [x] **Respuesta de Luis a la propuesta SEO** — ✅ aprobada por llamada 2026-08-25 (ver bloque
      "Proyecto SEO — ARRANCADO" arriba). Sigue pendiente: que responda el checklist de
      NAP/accesos/fotos enviado por email (borrador creado, no confirmado como enviado).
- [ ] **Fotos de trabajos reales** — Luis debe enviar fotos de instalaciones de Redes y Eléctricas.
- [ ] **Sitemap `lastmod`** — fechas fijas a 2026-05-11; actualizarlas en el próximo deploy que toque código.
- [ ] **Automatizar deploy** — conectar Hostinger a rama `production` o cron (ADR-001).
- [ ] **Fotos con logo FRECOIN** — Circuito cerrado de cámaras + técnico en eléctricas. Bloqueado: créditos IA a 0.

---

## Al cerrar cada sesión que despliegue

1. Anota el nuevo "Producción servida desde" (fecha + commit).
2. Bump `Last updated`.
3. Si fue cambio multi-archivo, añade entrada en `progress/`.

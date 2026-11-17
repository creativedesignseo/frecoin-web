# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-11-17 (cierre verificado: código y producción comprobados; desvinculación de accesos en curso)

---

## VERIFIED UPDATE — 2026-11-17 — realidad comprobada hoy (no supuesta)

**Código (`feat/backoffice-cms`):** `HEAD` = `e83fe64`. `bash scripts/verify.sh` → `✓ build passed` y `✓ all checks passed` (typecheck y test se saltan por script ausente, preexistente).

- **Sin commitear, 9 ficheros de código y configuración:** `index.html`, `public/admin/api/seed-services.sql`, `public/email-templates/confirmation-customer.html.php`, `scripts/sync-seo-cms.php`, `src/data/services.ts`, `src/lib/analytics.ts`, `src/sections/Hero.tsx`, `tasks/current.md`, `HANDOFF.md`. No se han commiteado porque hay que revisarlos antes.
- **Sin commitear, registros de sesión:** `progress/2026-09-07-*`, `progress/2026-09-08-*`, `progress/2026-10-12-*`, y dos `Email-*.html` sueltos.

**Producción (`https://frecoin.es`), comprobada con curl el 17/11/2026:**
- `/` → 200, `Instalaciones tecnológicas para empresas en España | FRECOIN`.
- `/servicios/sai` → 200, `Sistemas SAI para empresas | FRECOIN`.
- `/servicios/redes-informaticas` → 200, `Instalación de redes informáticas para empresas | FRECOIN`.
- `/sobre-nosotros` → 200, `Quiénes somos — FRECOIN | Instalaciones para empresas`.
- `/url-inexistente-xyz` → 404 real, con título propio de 404.
- `sitemap.xml` → 11 URLs. `robots.txt` → `Disallow: /rediseno`.
- `www.frecoin.es` → 301 a `https://frecoin.es/`.
- `last-modified` de la home: **08/09/2026 12:16:40 GMT**. **No hay ningún despliegue desde el 08/09.**
- **No verificado:** el despliegue del 12/10 de la plantilla `confirmation-customer.html.php`. Es PHP y no se ve desde fuera. Su registro (`progress/2026-10-12-*`) está sin commitear.

**Hosting (cambio importante):**
- El sitio `frecoin.es` (PHP/HTML) está alojado en la **cuenta Hostinger de Adspubli Marketing** (`info@one.adspubli.com`). El plan caduca el **23/12/2026**.
- Tienen acceso a esa cuenta como usuarios `lfreire@frecoin.es` (administrar servicios y facturación) e `infotaxiluxride@gmail.com` (otro proyecto: taxiluxride.com). **No tocar el de infotaxiluxride.**
- **No se puede desvincular sin antes pasar el sitio a Luis.** Si se retira el plan o el acceso de Luis antes de migrar, la web deja de funcionar.

**Accesos de Google (desvinculación iniciada el 17/11/2026):**
- GA4 (propiedad 552199720): **retirado nuestro acceso**. Luis conserva el suyo (Administrador).
- GTM (cuenta `frecoin`, contenedor GTM-TPX75G8N): **retirado nuestro acceso**. Luis conserva el suyo.
- Search Console (`sc-domain:frecoin.es`): **pendiente**. Nuestro rol es Usuario completo y no se puede retirar desde nuestra cuenta. Solo lo puede hacer Luis, como propietario.
- Ficha de Google: pendiente de revisar.
- Detalle y capturas: `entregables/desvinculacion-accesos-FRECOIN-2026-11-17.md` y `entregables/evidencias-desvinculacion-2026-11-17/` (repo `frecoin-tracking`).

**Pendiente:**
- Decidir con Jonatan y Luis cómo pasa el sitio a su cuenta: transferencia del plan o migración de archivos, base de datos, correo y DNS. Después, verificar formularios y correo.
- Revisar y commitear los 9 ficheros sin commitear.
- Revisar el saldo pendiente del SEO (249 €).

---

## VERIFIED UPDATE — 2026-10-12 — customer confirmation email

- Luis requested the customer auto-response wording in the email thread “Mensaje recibido al enviar formulario” (latest reminder: 2026-09-30).
- The targeted file `public/email-templates/confirmation-customer.html.php` was deployed individually; no other local working-tree changes were uploaded.
- A remote backup was created before upload: `domains/frecoin.es/public_html/email-templates/confirmation-customer.html.php.backup_20261012_135715`.
- Local build and `bash scripts/verify.sh` passed. The local and remote template SHA-256 matched: `9c4b03e88dd2085b220d281d65ba2f0bb953d8372b9af343752bfd1a0de83ac3`.
- Live HTTP verification at `https://frecoin.es/email-templates/confirmation-customer.html.php` confirmed the new wording, “Gracias por confiar en FRECOIN”, and absence of the old confirmation and Luis paragraph.
- This verifies the template is served in production; it does not replace the separate real form submission/email-receipt test.

---

## VERIFIED UPDATE — 2026-09-08, after deployment and CMS synchronization

This section supersedes the pre-deployment audit below. Do not report the old copy or deployment as pending.

### Website and CMS — completed

- The user explicitly authorized production deployment and the targeted CMS correction.
- The full prerendered build was deployed through Hostinger File Manager after SSH connection timeouts. Live public bundle: `assets/index-o6SriQtV.js`; stylesheet: `assets/index-CKg7giIL.css`.
- Full remote pre-deployment copy: `backup_public_html_20260908_predeploy/public_html/`, outside the web root, relative to the domain directory. Deployment archive was also kept outside the web root.
- The upload preserved `admin/`, `panel/`, uploads, CMS snapshots, `send-form.php`, and email templates. No database migrations or authentication changes were performed.
- Home now displays **Instalaciones eléctricas y cableado estructurado para empresas**. The approved motto, expanded service copy, and Google Maps CID in JSON-LD are deployed.
- Networks CMS synchronization is **complete**: a conditional `UPDATE` changed only `services.hero_paragraph` for `slug='redes-informaticas'`, matching the previous paragraph to avoid overwriting a concurrent edit. phpMyAdmin confirmed **1 affected row**.
- `assets/services.json` was then aligned with that row. A live HTTP download was parsed and compared with the pre-change snapshot: **6 services, exactly 1 changed field — Networks `hero_paragraph`**. All other data and image references were preserved.
- Final paragraph: “Diseñamos, instalamos y mantenemos redes informáticas para empresas, oficinas y naves industriales. Realizamos instalaciones de cableado estructurado Cat 6 y Cat 6A, UTP y FTP, con certificación de red y montaje de racks. Configuramos routers y switches, instalamos WiFi empresarial y ofrecemos mantenimiento de redes.”
- The final paragraph was visible on the live Networks page and remained after a full browser reload. No further copy deployment or CMS synchronization is pending for this request.
- A line-wrapped editor selection briefly produced malformed snapshot JSON during synchronization. It was immediately replaced with valid JSON; the final parsed comparison above passed. No other service values changed. Record this as a corrected intermediate error, not an unresolved defect.
- Final smoke checks: home **200**, Networks **200**, panel **200**, `GET /send-form.php` **405**, invented route **404**. The earlier same-day 11-route/canonical/sitemap/redirect checks are recorded below.

### Measurement — verified, with explicit QA limits

- GTM remains published at **version 2**, container `GTM-TPX75G8N`; no new GTM version was required.
- `src/lib/analytics.ts` fixes are deployed: separate one-time initialization from consent state; restore only supported consent version; enqueue `gtag` commands as Arguments objects. Basic consent mode remains active, with advertising storage and personalization denied.
- GA4 property `552199720` received **1 `form_submit`, 1 `phone_click`, and 1 `whatsapp_click`** in the direct Realtime API query on 08/09. These were deliberate QA interactions, not customer leads.
- The QA harness served the deployed build locally with `qa_test=true`, `qa_run=frecoin_delivery_20260908`; telephone/WhatsApp navigation was cancelled and the form endpoint simulated success. No actual call, WhatsApp message, email, or production lead record was generated by that test. This proves the front-end → published GTM → GA4 path, **not** production email delivery.
- All three contact events are now key events, `ONCE_PER_EVENT`, verified through the Admin API. Existing `purchase`, `close_convert_lead`, and `qualify_lead` entries were preserved; they do not prove business conversions.
- Enhanced measurement `formInteractionsEnabled` is **false**, confirmed by a final API read, to avoid duplicate/attempt-based automatic form events. The custom event is emitted after successful form response.
- A real production form/email receipt test remains separate and needs an agreed recipient/test window. Do not represent a mocked submission or a 405 GET response as an end-to-end email test.

### Google Business Profile — changes saved

- Six custom services and their descriptions saved: Networks/cabling, electrical installations, CCTV, enterprise WiFi, SAI/UPS, and access control. Google displayed review pending (up to one day).
- Official square isotype saved as logo. A real client network-rack photograph saved as cover; cover and the three pre-existing photos were pending in the last gallery check. Do not claim Google has approved them.
- First update **published**, verified in “Tus publicaciones” with “Publicada hace 29 segundos”; post ID `7867179217944467748`. Text: “Instalaciones eléctricas y cableado estructurado para empresas. FRECOIN instala y mantiene redes informáticas, WiFi empresarial, cámaras CCTV, sistemas SAI y controles de acceso. Consulta nuestros servicios y solicita presupuesto en https://frecoin.es/”. No copy was posted to other managed businesses.
- Public review-request link: `https://g.page/r/CR0VIVQNwHJyECE/review`. No review was fabricated or requested from third parties during this task.
- Service area is still Barcelona; hours, opening date, and existing categories were retained. Their factual accuracy is not established by our edit access. An opening date in 2025 does **not** inherently contradict the founder's 20+ years of experience.
- Category replacement was paused by the action approval check; it was cancelled and not bypassed. Confirm the intended security-system category and real service areas/hours/date before changing unverified business facts. No public street address or social profile was invented.

### Search Console and delivery boundaries

The same-day API inspection found these five discovered/non-indexed URLs (indexing is Google's decision):

1. `https://frecoin.es/servicios/camaras-videovigilancia`
2. `https://frecoin.es/sobre-nosotros`
3. `https://frecoin.es/aviso-legal`
4. `https://frecoin.es/politica-privacidad`
5. `https://frecoin.es/politica-cookies`

The home and the other five service routes were indexed. No new indexing request was submitted by the agent in this closeout.

**Later user update, 08-Sep:** the user reports manually submitting Cameras and About and says they are processing. Record both as request submitted, not confirmed indexed; no new independent inspection followed that message. The user excludes the three legal pages from manual submission and delivery blockers. No `noindex`, robots exclusion or sitemap change was requested or applied. No manual submission remains to execute from this list; only the result of the two reported requests remains to be checked.

The website/copy/CMS changes and contact-event configuration are complete. The entire SEO package must **not** be marked closed: Google reviews of profile changes, business-fact confirmation, a real production form/email test, and the agreed directory/reputation scope remain open. No client closeout email was sent. Internal delivery report: `frecoin-tracking/entregables/estado-entrega-verificado-2026-09-08.md` (outside this public repository).

Local source remains uncommitted on `feat/backoffice-cms`, HEAD `e83fe64`; no push was performed. The final full build passed before deployment (11 routes + 404; ~630.22 kB main chunk). Dedicated `test`/`typecheck` scripts do not exist; do not claim those npm scripts ran. See `progress/2026-09-08-deploy-cms-measurement-gbp.md`.

---

## HISTORICAL PRE-DEPLOY AUDIT — 2026-09-08 (superseded by the verified update above)

The following audit describes the state before today's authorized changes. Its deployment, measurement, services, logo/cover and publication pending items are no longer current; preserve it for traceability only.

### Resumen ejecutivo

- La base SEO técnica desplegada el **03/09** sigue funcionando en producción: prerender, 11 rutas,
  canonicals, sitemap, 404 real y redirección de `www` están operativos.
- Los cambios de portada y copy pedidos por Luis el **24/08**, la ampliación del texto de Redes y el
  enlace de Google Maps en `sameAs` están preparados **solo en el árbol de trabajo local**. Hay un
  deploy pendiente; producción todavía muestra el copy anterior.
- La ficha de Google Business Profile **sí existe, está verificada/reclamada y se administra** con
  `creativedesignseo@gmail.com`. No hace falta crearla ni reclamarla. Está incompleta.
- Search Console, GA4 y GTM se comprobaron directamente por API el **08/09**. No se deduce su estado
  desde el navegador.
- En la revisión del 07–08/09 no se hizo deploy, no se publicó una versión nueva de GTM, no se cambió
  GBP y no se envió ningún correo al cliente.

### Código local — comprobado el 08/09

| Comprobación | Resultado real |
|---|---|
| Rama | `feat/backoffice-cms`, HEAD `e83fe64`, **3 commits por delante** de `origin/feat/backoffice-cms` |
| Árbol de trabajo | **No limpio**: 6 ficheros modificados (incluido este HANDOFF) y 1 registro de progreso nuevo sin seguimiento |
| Verificación | `bash scripts/verify.sh` → **`✓ all checks passed`**; build + prerender de 11 rutas + 404 |
| Cobertura automatizada | No existen scripts `typecheck` ni `test`; `verify.sh` los omite. No reportar esto como pruebas ejecutadas. |
| Avisos del build | Chunk principal de 629,70 kB y datos de Browserslist con 9 meses de antigüedad |

Cambios locales no publicados:

- `src/sections/Hero.tsx`: H1 `Instalaciones eléctricas / y cableado estructurado / para empresas`,
  listado técnico ampliado y mensaje de más de 20 años; se conserva el lema solicitado por Luis.
- `src/data/services.ts`: párrafo de Redes ampliado con Cat 6/Cat 6A, UTP/FTP, racks, routers,
  switches, WiFi y mantenimiento; meta description de Eléctricas alineada con la matriz SEO.
- `public/admin/api/seed-services.sql` y `scripts/sync-seo-cms.php`: copy de Redes alineado y script
  preparado para sincronización idempotente del CMS.
- `index.html`: JSON-LD `sameAs` preparado con la ficha real de Google Maps,
  `https://www.google.com/maps?cid=8246865031147361565`.

### Producción HTTP — comprobada el 08/09

| Comprobación en vivo | Resultado real |
|---|---|
| `/` | **200**; title `Instalaciones tecnológicas para empresas en España \| FRECOIN`; todavía usa el H1 anterior `Infraestructuras tecnológicas para empresas en toda España` |
| 6 rutas de servicios | **200**, cada una con title y canonical propios |
| `/sobre-nosotros` + 3 legales | **200**, title y canonical propios |
| URL inventada | **404** real |
| `sitemap.xml` | 11 `<loc>` |
| `robots.txt` | `Disallow: /rediseno` y referencia al sitemap |
| `https://www.frecoin.es/` | **301** a `https://frecoin.es/` |
| `/panel/` | **200** |
| `GET /send-form.php` | **405** JSON |

Diferencias verificadas entre local y producción:

| Elemento | Producción | Local pendiente |
|---|---|---|
| H1 de portada | `Infraestructuras tecnológicas para empresas en toda España` | `Instalaciones eléctricas y cableado estructurado para empresas` |
| Copy de Redes | Versión breve: redes estables, cableado, routers/switches, WiFi y soporte | Versión detallada pedida por el cliente |
| `assets/services.json` de Redes | Sigue sirviendo la versión breve | Seed y script de sincronización ya preparados |
| JSON-LD `sameAs` | No contiene el CID de Google Maps | Contiene el CID real de la ficha |

Por tanto, la frase anterior «no hay deploy pendiente» era incorrecta para el estado actual. El
deploy del 03/09 está completado, pero **hay un nuevo deploy pendiente** para estos cambios locales.

### Google Search Console — API, 08/09

- Propiedad: `sc-domain:frecoin.es`; permiso de la cuenta: `siteFullUser`.
- Sitemap: enviado `2026-09-03T21:16:37Z`, última descarga `2026-09-07T06:36:18Z`, no pendiente,
  **0 errores y 0 advertencias**.
- Rendimiento agregado de los últimos 90 días: **5 clics, 127 impresiones, CTR 3,94 % y posición
  media 40,61**.

Inspección individual por API:

| Estado | URLs |
|---|---|
| **Indexadas / PASS** | `/`, Redes, Eléctricas, WiFi, SAI y Controles de acceso |
| **Descubiertas, actualmente sin indexar / NEUTRAL** | Cámaras, `/sobre-nosotros` y las 3 páginas legales |

Redes ya está indexada: el estado «solicitud enviada; pendiente» del 04/09 quedó superado. No
reenviar Cámaras ni las otras URLs repetidamente; monitorizar.

### GA4 y GTM — APIs, 08/09

**GA4:** propiedad `frecoin.es` (`552199720`). En los últimos 30 días constan 63 `page_view`, 11
`session_start`, 10 `user_engagement`, 2 `first_visit`, 2 `scroll`, 1 `click`, 1 `form_start` y
1 `whatsapp_click`. En los últimos 7 días: Direct 4 sesiones, Referral 4 y Organic Search 3.

Los únicos eventos clave configurados son `purchase`, `close_convert_lead` y `qualify_lead`.
`whatsapp_click` **no** es evento clave; `phone_click` y `form_submit` todavía no aparecen en los
datos consultados. No reportar conversiones de lead como verificadas.

**GTM:** cuenta `frecoin`, contenedor `frecoin.es` (`GTM-TPX75G8N`), versión publicada **2**. El
workspace consultado contiene 5 tags —configuración GA4, `form_submit`, `phone_click`,
`whatsapp_click` y `virtual_page_view`— y 4 triggers de evento personalizado correspondientes.

Consent Mode v2 permanece en modo básico: GTM/GA4 solo carga después de aceptar analítica;
`ad_storage`, `ad_user_data` y `ad_personalization` siguen denegados.

### Google Business Profile — navegador autenticado, solo lectura, 08/09

| Campo | Estado real |
|---|---|
| Perfil | `FRECOIN`, administrado por `creativedesignseo@gmail.com` |
| Categoría principal | `Proveedor de servicios de telecomunicaciones` |
| Categorías adicionales | `Electricista`, `Servicio de seguridad para computadoras`, `Contratista de telecomunicaciones` |
| Teléfono / web | `614 13 42 92` / `https://frecoin.es/` |
| Modelo visible | Sin dirección pública; negocio de área de servicio |
| Área configurada | Solo `Barcelona, España` |
| Horario | L–V 07:00–18:00; S 07:00–14:00; D cerrado |
| Fecha de apertura | `1 de mayo de 2025` |
| Servicios | **Vacíos**; solo aparecen sugerencias sin marcar (`Instalación`, `Reparaciones generales`) |
| Fotos | Sin logo ni portada; 3 fotos subidas, las 3 con estado **PENDIENTE** |
| Reseñas / publicaciones | Sin reseñas visibles y sin publicaciones; Google invita a obtener las primeras opiniones y agregar una actualización |
| Chat / perfiles sociales | Vacíos |

La descripción sí enumera redes, eléctricas, CCTV, WiFi, SAI y controles de acceso, menciona más de
20 años y Barcelona/Baix Llobregat. Antes de editar hay que confirmar con Luis: fecha de apertura
(no cuadra a primera vista con «más de 20 años»), cobertura real —GBP dice solo Barcelona y la web
declara toda España—, horarios, dirección oculta vs. atención presencial y categorías/servicios.

### Deploy de referencia: completado el 03/09

Backup remoto: `~/backup_public_html_20260903_211132`. Se publicó GTM versión 2 y se subió el
`dist/` prerenderizado sin `--delete`, excluyendo `admin/`, `panel/`, uploads, snapshots del CMS,
formularios y plantillas de correo. El CMS se sincronizó con la matriz SEO nacional; backup remoto
de esa operación: `~/backup_seo_cms_20260903_225500/`.

⚠️ El `.htaccess` activo exige un `dist/` generado con `npm run build` **completo**. Un build con
`build:only` dejaría 404 en todas las rutas salvo `/`. En el próximo deploy se debe excluir de nuevo
`assets/services.json` y ejecutar la sincronización controlada del CMS para no pisar contenido.
Todo deploy requiere la aprobación explícita exigida por `AGENTS.md`.

### Pendientes reales para cerrar el paquete SEO de 499 €

1. Revisar/confirmar el diff local y, con aprobación explícita, publicar los cambios del 24/08,
   sincronizar el CMS y repetir verificación HTTP y visual en producción.
2. Probar de forma controlada `form_submit`, `phone_click` y `whatsapp_click`; decidir después cuáles
   deben ser eventos clave y configurarlos en GA4. No usar `purchase` como conversión de este sitio.
3. Completar GBP tras las confirmaciones de Luis: servicios, cobertura, fecha de apertura, horarios,
   categorías, logo, portada, fotos aprobadas, perfiles sociales y primera publicación.
4. Monitorizar por API las 5 URLs descubiertas/no indexadas sin reenviar solicitudes de forma
   repetida.
5. Dar de alta y seguir directorios locales solo cuando el NAP y la cobertura estén confirmados.
6. Ejecutar reputación/Trustpilot o acordar una alternativa real; no usar testimonios ficticios.
7. Emitir el informe global y walkthrough solo después de verificar de nuevo producción, medición y
   GBP, o documentar expresamente cualquier entrega parcial acordada con Luis.

Documentación detallada en el repo privado `frecoin-tracking`: auditoría técnica, keyword research,
implementación SEO, registro de indexación y planes de ejecución. No se ha enviado un correo de
cierre al cliente.

---

## Contexto histórico (puede contener estados ya superados)

Las secciones siguientes preservan trazabilidad previa. Para operar, informar o desplegar,
**prevalece siempre el estado verificado del 08/09 documentado arriba**.

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
sino mañana seguro"* — se comprometía a darse de alta en las 3 herramientas de Google. **Estado
histórico superado:** el 08/09 se confirmó acceso real por API a Search Console, GA4 y GTM.

**Siguiente paso de ejecución decidido entonces (ya ejecutado):** al recibir el acceso se priorizó
la configuración de medición (GTM+GA4) frente al keyword research para iniciar la captura de datos
de referencia. Detalle en `plan-gtm-ga4.md`; el estado actual está en la cabecera de este HANDOFF.

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

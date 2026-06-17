# PLAN — Backoffice CMS para frecoin.es

> Reflejo del panel de administración de **DoodleForever** implementado sobre el
> stack real de frecoin: **React (frontend) + PHP REST (backend) + MySQL** en
> Hostinger. Documento ejecutable: di exactamente qué se construye, en qué orden
> y por qué.
>
> **Estado:** propuesta / pendiente de arranque · **Fecha:** 2026-06-17
> **Autor:** Adspubli (Claude) · **Origen de referencia:** `doodleforever-2`
> (admin React + Netlify Functions + MongoDB).
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). Este documento **no
> contiene credenciales**. Las credenciales (BD, hash de contraseña) viven solo
> en el servidor, en `admin/api/config.php` **gitignored**.

---

## 0. Principio rector

**El frontend es un reflejo 1:1 de DoodleForever. El backend NO puede serlo, y
no es capricho.**

- DoodleForever corre sobre **Node + MongoDB en Netlify Functions** (serverless).
- El Hostinger de frecoin es **hosting compartido**: ejecuta **PHP**, no Node
  persistente ni MongoDB.
- Por tanto: **el panel React se clona casi tal cual** (componentes, editor de
  bloques, subida de imágenes, formularios, guards), y **el backend se reescribe
  en PHP** hablando con **MySQL** (la base de datos del propio cliente). La
  experiencia para Luis es idéntica; cambia el motor por debajo, que él nunca ve.
- La única vía para un reflejo idéntico también en backend (Node+Mongo) sería un
  **VPS**. Descartado: el cliente no lo quiere y no aporta valor visible.

**Lo que se descarta del pasado:** el prototipo PHP `public/admin/` (sube 4 fotos
a un `work-manifest.json`) queda **obsoleto**. No se construye encima de él; se
reaprovecha solo su lógica probada de auth (bcrypt + sesión + CSRF + rate-limit) y
de upload (`finfo` MIME real + `move_uploaded_file` + `flock`).

---

## 1. Arquitectura objetivo

```
                 frecoin.es (Hostinger, Apache, un solo docroot)
 ┌───────────────────────────────────────────────────────────────────┐
 │  public_html/                                                       │
 │  ├── index.html + assets/        ← SPA PÚBLICA (Vite) — SE QUEDA    │
 │  │     · lee /assets/*.json (snapshots) con fallback hardcodeado    │
 │  ├── panel/                       ← PANEL ADMIN React (Vite aparte) │
 │  │     · build separado, reflejo de DoodleForever, recoloreado     │
 │  ├── admin/api/                   ← API REST PHP (PDO → MySQL)      │
 │  │     · auth.php blog.php services.php content.php leads.php       │
 │  │       users.php upload.php  + db.php config.php(gitignored)      │
 │  ├── assets/                      ← uploads/ + snapshots JSON       │
 │  └── send-form.php                ← público, + 1 INSERT a leads     │
 └───────────────────────────────────────────────────────────────────┘
                                  │ PDO
                          ┌───────▼────────┐
                          │  MySQL (hPanel) │  admin_users, blog_posts,
                          │  del cliente    │  services(+blocks),
                          └─────────────────┘  page_content, contact_leads, media
```

- **Same-origin total:** panel, API y sitio público viven en el mismo dominio →
  cookie de sesión sin CORS, sin tokens en localStorage.
- **El visitante público no ejecuta PHP ni toca MySQL:** lee JSON estáticos
  (snapshots) regenerados cuando el admin guarda. Resiliente y rápido.

---

## 2. Decisiones de arquitectura (las tres que importan)

### 2.1 Autenticación → **sesión PHP + cookie HttpOnly + CSRF** (NO JWT)

DoodleForever usa JWT (`jose`) porque las Netlify Functions son stateless. En
frecoin **no aplica**: panel y API son same-origin.

- Cookie de sesión `Secure` + `HttpOnly` + `SameSite=Strict` → **más seguro que
  el JWT-en-localStorage de DoodleForever** (que cualquier script inyectado lee).
- Revalidación por petición: `auth.php?whoami` relee `role`+`active` de
  `admin_users` en cada llamada → desactivar un usuario es **instantáneo** (igual
  garantía que el `requireAdminRole` de DoodleForever, sin esperar a que expire un
  token de 24 h).
- Se reutiliza la lógica ya probada del prototipo (`password_verify`,
  `session.cookie_*`, CSRF con `hash_equals`, rate-limit 5 intentos/5 min).
- **Multiusuario desde el principio** (`admin_users` con roles), no la contraseña
  única actual: Luis necesita `super_admin` + cuentas de personal.

**Adaptación al frontend copiado:** el `adminFetch` de DoodleForever añade
`credentials:'include'`, **quita** el header `Authorization: Bearer`, y manda
`X-CSRF-Token` en POST/PUT/DELETE. La lógica de redirección al 401 no cambia.

### 2.2 Imágenes → **subida al servidor de Hostinger** (`/assets/uploads/`), NO Cloudinary

- La restricción dura es "todo en el servidor del cliente". Cloudinary añade una
  dependencia externa y credenciales en un repo público. Fuera.
- El React ya comprime en el navegador (`compressImage`: redimensiona ≤1600px y
  re-encoda a WebP q0.85) → una foto de 15 MB del móvil llega como ~300 KB, bajo el
  límite de 5 MB del servidor. Lo único que Cloudinary aportaba (auto WebP/quality)
  ya lo cubre el cliente.
- `upload.php` devuelve `{url, publicId:url}` → `adminApi.uploadImage`,
  `ImageUploader` y `BlogEditor` funcionan **sin cambios**.
- Cada subida se registra en la tabla `media` (librería reutilizable + limpieza de
  huérfanos).
- ⚠️ base64-en-JSON infla ~33%: subir `post_max_size`/`upload_max_filesize` en un
  `.user.ini` local (p.ej. 12 MB).

### 2.3 Sitio público → **snapshots JSON regenerados al guardar** (NO lectura PHP en vivo)

- El front público es una SPA estática. Ya prueba el patrón en `WorkGallery.tsx`
  (lee `/assets/work-manifest.json` con fallback hardcodeado). Se **generaliza**.
- Cada guardado en el admin regenera un JSON pequeño en `/assets/`: `blog.json`,
  `services.json`, `content.json`. Los componentes públicos los leen al montar, con
  el array hardcodeado actual **como fallback**.
- **Resiliencia:** si MySQL/PHP cae, el sitio sigue renderizando desde el fallback
  de build. Un sitio público con lectura PHP en vivo mostraría secciones vacías ante
  cualquier fallo de BD.
- **Matiz SEO (el caveat real):** los snapshots se leen en cliente → Googlebot ve
  primero el fallback de build. Para el **blog** (frescura menos crítica, más
  volumen) el fetch en runtime vale. Para las **6 páginas de servicio** (las páginas
  SEO que dan dinero) hay que **materializar** el contenido editado de vuelta al
  build estático (admin guarda → snapshot → un paso de deploy lo hornea en el
  bundle) **o** prerenderizar esas 6 rutas. → **Decisión abierta D2.**
  - Blog = snapshot JSON en runtime.
  - Textos/imágenes de secciones = snapshot JSON en runtime.
  - 6 landings de servicio = editables en BD pero materializadas al build estático.

---

## 3. Qué se reutiliza del frontend de DoodleForever

| Pieza (DoodleForever) | Acción | Cambio |
|---|---|---|
| `src/store/auth/AuthContext.tsx` | **copiar** | `login()` guarda solo el objeto user (la sesión es la cookie); claves `df_admin_*` → `fr_admin_*` |
| `src/components/admin/ProtectedRoute.tsx` | **copiar** | sin cambios; 401 → limpiar + redirigir a `/panel/login` |
| `src/lib/adminApi.ts` | **copiar + adaptar** | base `/.netlify/functions` → `/admin/api`; endpoints `.php`; `credentials:'include'` + `X-CSRF-Token`; sin `Bearer` |
| `src/components/admin/BlogEditor.tsx` (BlockNote) | **copiar tal cual** | solo el folder de `uploadFile` (`doodleforever/blog`→`blog`). ⚠️ verificar `blocksToHTMLLossy` sync/async en la versión de BlockNote que se instale |
| `src/components/admin/ImageUploader.tsx` + `src/lib/imageUtils.ts` | **copiar tal cual** | folder por defecto; la compresión WebP cliente es lo que mantiene <5 MB |
| `src/pages/admin/AdminBlogPage.tsx` (lista) | **copiar tal cual** | apuntar a `blog.php`; ya es un CMS list genérico (tarjetas, click-imagen→editar, toggle borrador/publicado, borrar, ver en web) |
| `src/pages/admin/AdminBlogFormPage.tsx` | **copiar (patrón)** | RHF + zodResolver + Tabs + `editorStateRef{blocks,html}`. El **mismo esqueleto** se clona para `ServiceFormPage` (zod de servicios + `useFieldArray` para los bloques repetidos) |
| `AdminLayout.tsx` + `AdminSidebar.tsx` | **copiar estructura** | nav: Inicio, Blog, Servicios, Contenido, Leads, (+ Usuarios para super_admin). Quitar Cachorros/Pedidos |
| `AdminLoginPage.tsx` | **copiar** | email+password → `login()` → redirect; sin token |
| `FabMenu.tsx`, `AdminUsersPage.tsx` | **copiar** | retematizar; users mantiene el guard `super_admin` |

**Recolor:** el admin de DoodleForever usa tokens coral. Retematizar al look ya
establecido del panel frecoin: acento **`#1ED49C`** sobre chrome oscuro **`#0f1c1a`**
(continuidad visual con el panel que reemplaza), **no** el verde público.

**Se descarta por completo (dominio perros / tienda):** `AdminPuppiesPage`,
`AdminPuppyFormPage`, `AdminOrdersPage`, `AdminOrderDetailPage`, badges de
pedido/cachorro, y toda la lógica Stripe/checkout. El dashboard se reconstruye con
stats de frecoin: leads por estado, posts publicados vs borrador, servicios activos.

---

## 4. Esquema MySQL

> MySQL 8, InnoDB, `utf8mb4`. `bcrypt` cost **12** (coincide con el hash del
> prototipo frecoin, no el cost 10 de DoodleForever).

```sql
-- Cuentas del back-office (login + revalidación por petición). Borrado lógico (active=0).
CREATE TABLE admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin') NOT NULL DEFAULT 'admin',
  name VARCHAR(120) NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  last_login DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Artículos del blog (editor de bloques BlockNote). content_blocks = JSON fuente,
-- content_html = render para el público, content = legacy texto plano.
CREATE TABLE blog_posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  excerpt VARCHAR(500) NOT NULL DEFAULT '',
  content MEDIUMTEXT NULL,
  content_blocks JSON NULL,
  content_html MEDIUMTEXT NULL,
  tag VARCHAR(80) NOT NULL DEFAULT '',
  cover_image VARCHAR(512) NOT NULL DEFAULT '',
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  author VARCHAR(120) NOT NULL DEFAULT 'FRECOIN',
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_slug (slug),
  KEY ix_blog_status_pub (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Las 6 (extensibles) landings de servicio, hoy hardcodeadas en src/data/services.ts.
CREATE TABLE services (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(160) NOT NULL,
  meta_title VARCHAR(255) NOT NULL DEFAULT '',
  meta_description VARCHAR(320) NOT NULL DEFAULT '',
  keywords VARCHAR(500) NOT NULL DEFAULT '',
  hero_h1 VARCHAR(255) NOT NULL DEFAULT '',
  hero_paragraph TEXT NULL,
  hero_image VARCHAR(512) NOT NULL DEFAULT '',
  price DECIMAL(10,2) NULL,
  price_unit VARCHAR(40) NOT NULL DEFAULT '',
  price_note VARCHAR(160) NOT NULL DEFAULT '',
  cta_text VARCHAR(160) NOT NULL DEFAULT '',
  active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_slug (slug),
  KEY ix_services_active_sort (active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bloques repetidos de cada servicio (includes/audiencias/beneficios/proceso/FAQ).
-- Mantiene `services` plano y deja a Luis añadir/quitar viñetas sin tocar el esquema.
CREATE TABLE service_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_id BIGINT UNSIGNED NOT NULL,
  block_type ENUM('include','audience','benefit','process_step','faq') NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT '',
  body TEXT NULL,
  icon VARCHAR(80) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY ix_service_blocks (service_id, block_type, sort_order),
  CONSTRAINT fk_service_blocks_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clave/valor para los textos+imágenes editables hoy hardcodeados en el JSX de las
-- secciones (Hero, Sobre nosotros, Números, Contacto, WhyChooseUs, FooterCTA, legales,
-- las 4 fotos de Trabajos). Reemplaza work-manifest.json por una tabla general.
CREATE TABLE page_content (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  section VARCHAR(80) NOT NULL,
  content_key VARCHAR(120) NOT NULL,
  value_type ENUM('text','textarea','html','image','number') NOT NULL DEFAULT 'text',
  value LONGTEXT NULL,
  label VARCHAR(160) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_page_content (section, content_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Persiste cada envío del formulario (hoy send-form.php solo manda email = leads perdidos).
CREATE TABLE contact_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  email VARCHAR(255) NOT NULL DEFAULT '',
  service VARCHAR(120) NOT NULL DEFAULT '',
  message TEXT NULL,
  source VARCHAR(40) NOT NULL DEFAULT 'contacto',
  status ENUM('new','read','handled','spam') NOT NULL DEFAULT 'new',
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_leads_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Registro de archivos subidos a /assets/uploads/ (librería + limpieza de huérfanos).
CREATE TABLE media (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  url VARCHAR(512) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime VARCHAR(60) NOT NULL,
  bytes INT UNSIGNED NOT NULL DEFAULT 0,
  width INT UNSIGNED NULL,
  height INT UNSIGNED NULL,
  folder VARCHAR(120) NOT NULL DEFAULT 'general',
  uploaded_by BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_media_url (url),
  KEY ix_media_folder (folder),
  CONSTRAINT fk_media_user FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 5. API PHP (`/admin/api/*.php`)

> Todas usan: PDO (`db.php`), bootstrap común (CORS solo `https://frecoin.es`,
> JSON in/out, sesión endurecida, helper CSRF, rate-limit, `requireRole()`).
> **Evitar los footguns de DoodleForever:** whitelist de campos en cada `$set`
> (no volcar `$body` entero como `admin-orders`), y comprobación explícita de
> método HTTP.

| Endpoint | Métodos | Rol | Función | Reemplaza a (DoodleForever) |
|---|---|---|---|---|
| `auth.php` | POST/DELETE/GET | público(login)/self(whoami) | login (valida, `password_verify`, abre sesión, CSRF, `last_login`); bootstrap del 1er super_admin si la tabla está vacía; logout; **whoami relee role+active de BD** | `admin-auth.ts` + mitad revalidación de `requireAdminRole.ts` |
| `blog.php` | GET/POST/PUT/DELETE | admin | CRUD `blog_posts` (admin ve borradores); slug + colisión; `published_at` al publicar; **regenera `/assets/blog.json`** al escribir publicado | `admin-blog.ts` |
| `services.php` | GET/POST/PUT/DELETE | admin | CRUD `services` + `service_blocks` en una transacción; regenera `/assets/services.json` | net-new (DoodleForever no tenía admin de servicios); sigue la forma de `admin-puppies.ts` |
| `content.php` | GET/PUT | admin | lee/`upsert` de `page_content` por sección; regenera `/assets/content.json`. Sin POST/DELETE: las claves son catálogo fijo sembrado | net-new (DoodleForever no tenía CMS de textos) |
| `leads.php` | GET/PUT | admin | lista `contact_leads` (filtro `?status=`); PUT `?id=` solo cambia `status` (whitelist) | `admin-orders.ts` (patrón leer+estado) sobre `contacts` |
| `users.php` | GET/POST/PUT/DELETE | **super_admin** | CRUD `admin_users`; 409 email duplicado; bcrypt cost 12; DELETE = borrado lógico; nunca devuelve `password_hash`; 403 (no 401) si no es super_admin | `admin-users.ts` |
| `upload.php` | POST | admin | recibe `{imageBase64, folder}` (lo que ya manda `ImageUploader`); valida MIME real con `finfo`, máx 5 MB, escribe en `/assets/uploads/...`, inserta en `media`, devuelve `{url, publicId:url}` | `admin-upload.ts` (Cloudinary → disco local) |
| `public/send-form.php` | POST | público | **se modifica, no se crea**: mantiene el email 100% intacto y añade **un** INSERT a `contact_leads` (best-effort: si la BD falla, el email y el `{ok:true}` no se ven afectados) | mitad persistencia de `create-contact.ts` |

---

## 6. Plan por fases

| Fase | Título | Entregables |
|---|---|---|
| **0** | Cimientos: BD + config + auth | Crear BD MySQL en hPanel; ejecutar todo el DDL; script de seed (migrar `services.ts` + `work-manifest.json` + copys de secciones a filas; sembrar catálogo de `page_content`). `admin/api/config.php` gitignored (creds + super_admin bootstrap). `db.php` (PDO singleton utf8mb4) + bootstrap común (CORS, sesión, CSRF, rate-limit, `requireRole()`). `auth.php` end-to-end. **Sin UI.** Verificar con `curl`. |
| **1** | Leads (riesgo mínimo, valor inmediato) | El INSERT best-effort en `send-form.php` (el email sigue siendo primario). `leads.php` (GET lista/filtro, PUT estado). **Frena la pérdida de leads antes que nada** y se prueba contra el formulario en vivo. |
| **2** | Shell admin + auth UI (React) | **Build React separado a `public_html/panel/`** (su propio `index.html`+assets, para no tocar el bundle/routing de la SPA pública). Retirar el viejo `/admin/` PHP de fotos (su única función pasa a `content.php`). Copiar tríada de auth + `AdminLayout`/`Sidebar`/`Login`/`ProtectedRoute`/`FabMenu`, cambiar `adminApi` a `/admin/api` + cookie/CSRF, recolorear, quitar páginas de perros/pedidos. Dashboard con stats de leads/posts/servicios. Página de Leads. |
| **3** | Blog con editor de bloques | `blog.php` CRUD + `upload.php` (disco). Copiar `BlogEditor`, `ImageUploader`, `imageUtils`, `AdminBlogPage`, `AdminBlogFormPage` con swap de API. `blog.php` regenera `/assets/blog.json` al publicar. Componentes públicos de Blog leen el snapshot con fallback. Verificar el ciclo completo crear→subir imagen→publicar→aparece en la web. |
| **4** | Servicios + precios | `services.php` (services + service_blocks transaccional) + `ServiceFormPage` clonado (`useFieldArray` para bloques repetidos) + lista. Regenera `/assets/services.json`. `Servicio.tsx`/`Services.tsx` leen snapshot con `services.ts` como fallback. **SEO:** paso de materializar las 6 rutas de servicio de vuelta al build (ver §2.3 / D2). |
| **5** | Textos + imágenes de páginas | `content.php` (GET sección / PUT upsert) + página "Contenido" que renderiza filas de `page_content` como campos texto/textarea/imagen. Regenera `/assets/content.json`. `Hero`/`About`/`Numbers`/`Contacto`/`WhyChooseUs`/`FooterCTA` + legales leen valores sobreescribibles con su copy actual como fallback. Absorber `work-manifest.json`. |
| **6** | Endurecimiento + deploy + handoff | `users.php` (CRUD super_admin) + UI. Pase end-to-end: rate-limit, CSRF en toda escritura, MIME/tamaño en upload, idempotencia de snapshots. `.htaccess` solo si hace falta (dejar intactas reglas SPA/HTTPS/cache). Documentar el rsync manual para que `/admin/api/` + `/panel/` se incluyan en lo que sube a Hostinger. Formar a Luis; HANDOFF + ADR. |

---

## 7. Riesgos

- **Deploy manual (ADR-001):** `/admin/api/` y `/panel/` deben incluirse
  explícitamente en el `rsync`, o no llegan a producción. El pipeline de GitHub
  Actions (rama `production`) está **huérfano**, no publica. Fácil subir un build
  sin backend.
- **`config.php` gitignored en repo PÚBLICO:** creds de BD + contraseña bootstrap
  solo en el servidor. Un commit por error filtra la BD de producción. Aplicar
  `git check-ignore` en el ritual de deploy.
- **Colisión Apache dir real vs ruta SPA:** `/admin/` ya existe como dir PHP real.
  Montar el panel React en `/admin/*` dentro de la SPA pelearía con Apache.
  Mitigado con el build separado en `/panel/`. No olvidar retirar el viejo
  `/admin/` PHP cuando `content.php` absorba el cambio de fotos.
- **Frescura de snapshots / SEO de las 6 páginas de servicio:** fetch en cliente →
  Googlebot ve el fallback de build. Si no se materializan al build, las ediciones
  de servicio se indexan lento. Malo para las páginas SEO. → D2.
- **Límites de hosting compartido:** base64-en-JSON infla ~33%; `post_max_size`/
  `upload_max_filesize` por defecto pueden rechazar. Necesita `.user.ini`. Sin
  control sobre límites de conexión MySQL ni cron.
- **`content_html` de BlockNote = superficie de XSS almacenado** si se inyecta con
  `dangerouslySetInnerHTML`. Solo escriben admins, pero **sanitizar** igualmente
  (server-side al guardar o al render). → D5.
- **`blocksToHTMLLossy` es async en BlockNote nuevo** pero DoodleForever lo trata
  síncrono. Portar verbatim sobre una versión nueva puede producir HTML vacío.
  **Fijar/verificar la versión.**
- **Snapshot acoplado a la escritura:** si el INSERT en MySQL va bien pero la
  regeneración del JSON falla (disco/flock), BD y web divergen. Endpoint de
  regenerar-bajo-demanda + orden transaccional (escribir BD, luego regenerar,
  reportar fallos de regen).
- **Sin CI para PHP:** `scripts/verify.sh` solo cubre el build Node. Añadir un smoke
  test PHP o el backend viaja sin verificar.

---

## 8. Decisiones abiertas (confirmar antes de arrancar)

- **D1 — Punto de montaje del panel:** `/panel/` build separado (**recomendado**,
  aísla el bundle público) vs grupo de rutas `/admin/*` dentro de la SPA. Cambia el
  routing y el artefacto de deploy.
- **D2 — Estrategia SEO de servicios:** (a) **materializar** los servicios de BD de
  vuelta al build en deploy (**recomendado**, mantiene el SEO actual, añade un paso
  de build) · (b) prerenderizar las 6 rutas · (c) aceptar fetch en runtime + render
  JS de Google.
- **D3 — Retirar el viejo `public/admin/` PHP** de inmediato (cuando `content.php`
  absorba el cambio de fotos) vs mantenerlo durante la migración. Afecta la ventana
  del riesgo de colisión Apache.
- **D4 — Multiusuario:** ¿Luis quiere varias cuentas (super_admin + personal) o de
  momento una sola? (Usar la tabla igual, con una fila.)
- **D5 — Sanitización de `content_html`:** server-side al guardar vs al render
  público. Elegir antes de publicar el primer post.
- **D6 — Backups de la nueva BD MySQL:** auto-backup de hPanel vs `mysqldump`
  programado. Decisión operativa antes de go-live.

---

## 9. Paso 0 operativo — consolidar el repositorio

⚠️ **Antes de escribir una línea de código nuevo.** Hoy hay **dos clones locales**
del mismo repo en estados distintos:

- `Clients/frecoin-web` → tiene un commit local **sin pushear** (`164ce1f`, el
  prototipo PHP de fotos) que **no está en origin**.
- `Clients/frecoin-tracking/frecoin-web-produccion` → clon canónico (harness:
  HANDOFF, tasks, progress, docs/decisions), re-verificado, **sin** ese commit.

**Acción:** elegir **un** clon canónico (recomendado: `frecoin-web-produccion`),
crear una rama de feature (p.ej. `feat/backoffice-cms`), y decidir si el prototipo
`164ce1f` se descarta (lo reemplazamos de todas formas) o se conserva como
referencia histórica. No empezar el desarrollo con la divergencia abierta o se
perderá trabajo.

---

## Referencias

- Sistema de referencia: `doodleforever-2` (admin React + Netlify Functions +
  MongoDB). Inventario completo de endpoints/esquema/frontend en el origen.
- `docs/decisions/ADR-001-deploy-architecture.md` — deploy manual por rsync.
- `progress/2026-06-03-cms-autoedicion-diferido.md` — el CMS de autoedición ya se
  contempló y difirió; este plan lo retoma con arquitectura concreta.

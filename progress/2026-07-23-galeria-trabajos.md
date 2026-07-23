# Galería "Trabajos realizados" — multi-foto por área (acumular)

**Date:** 2026-07-23
**Status:** completed (desplegado y verificado en vivo)
**Related:** HANDOFF.md, tasks/current.md, public/admin/api/gallery.php,
panel/src/pages/Trabajos.tsx, src/sections/WorkGallery.tsx

## Objective

Luis (cliente) pidió por email (04-jul y recordatorio 22-jul) poder **ir acumulando
más fotos** de sus trabajos, **organizadas por área**. El panel solo permitía
**sustituir** una foto por área (4 huecos fijos en `page_content.section='work'` con el
botón "Cambiar imagen") → una foto nueva pisaba la anterior.

## Revisión previa (realidad verificada, no supuesta)

- Panel: los 4 huecos fijos y el botón "Cambiar imagen" están en `Contenido.tsx`.
- Servidor: **no existía `content.json`** ni carpeta `uploads/work/` → Luis nunca llegó
  a subir fotos de trabajos; la home mostraba las 4 por defecto del código. **Nada que
  perder.** Solo había `uploads/services/` (4 imágenes de servicios, otra sección).
- Los snapshots públicos que faltan devuelven `index.html` (SPA fallback del `.htaccess`);
  `services.json` sí existe y se sirve como JSON.

## Files changed

- `public/admin/api/gallery.php` (nuevo) — GET/POST/PUT/DELETE de fotos; valida área
  (6 slugs); regenera `/assets/work-gallery.json` (agrupado por área). `require_role()`.
- `public/admin/api/schema.sql` — DDL de `work_gallery` + seed de las 4 por defecto.
- `panel/src/lib/api.ts` — tipos `WorkArea`, `GalleryItem`; `api.gallery.{list,add,update,remove}`.
- `panel/src/pages/Trabajos.tsx` (nuevo) — por área: subir (recorte 3:4 + WebP → upload →
  add), borrar, título opcional. 6 áreas.
- `panel/src/App.tsx` — ruta `/trabajos`.
- `panel/src/components/Layout.tsx` — item de nav "Trabajos" (icono Images).
- `panel/src/pages/Contenido.tsx` — se oculta la sección `work` (movida a Trabajos).
- `src/sections/WorkGallery.tsx` (público) — lee `/assets/work-gallery.json` (todas las
  fotos por área, en orden), fallback a las 4 por defecto si el snapshot está vacío.

## Commands run

- `panel npm run build` → OK (`index-DIiFnGMX.js`); `scripts/verify.sh` → OK (`index-BzfjJSdE.js`).
  (Los `node_modules` de panel y raíz estaban vacíos; `npm install` en ambos.)
- `php -l gallery.php` contra el PHP 8.3 del servidor → sin errores.
- Backup completo: `~/backup_public_html_20260723_175321` (9.2M).
- Deploy: `scp gallery.php → admin/api/` · `rsync --delete panel/dist/ → /panel/` ·
  `rsync --exclude '/admin/' --exclude '/.htaccess' dist/ → public_html/` (SIN `--delete`).
- Migración BD por SSH reusando `db()`: `CREATE TABLE work_gallery` + seed de 4 filas
  (SEEDED, TOTAL=4). Snapshot inicial `work-gallery.json` generado (617 B, 4 áreas).

## Verification result (prod en vivo)

- `/assets/work-gallery.json` → `application/json`, 4 áreas, 4 fotos.
- Home: 4 `.work-card` renderizadas desde el snapshot (URLs `/assets/work-*.webp`, títulos
  con tildes correctas) — verificado en navegador headless.
- `/`, `/servicios/sai` → 200 · panel sirve `index-DIiFnGMX.js`.
- `/admin/api/{auth,gallery}.php` sin sesión → 401 · login super_admin → `GET gallery.php`
  = 4 items · POST área inválida → 400 · `send-form.php` POST → 400.

## Open risks

- **Deploy de la web pública (raíz)**: `dist/` incluye copia de `admin/` (Vite copia
  `public/`). Desplegar SIEMPRE `rsync dist/ → public_html/` **sin `--delete`** y
  **excluyendo `/admin/` y `/.htaccess`**. El `--delete` solo acotado a `/panel/`.
  PHP de la API se sube por `scp`. Documentado en HANDOFF.
- `scp` usa `-P` (puerto), no `-p` (preserve).
- Backups servidor a limpiar cuando ya no hagan falta: `~/backup_public_html_20260723_175321`,
  `~/panel_backup_20260618_211701`, `~/api_backup_20260618_211701`.

## Bugfix (mismo día) — 500 al añadir foto

Síntoma: al pulsar "Añadir foto" el panel mostraba "Error del servidor", pero la foto
SÍ se guardaba (fila + archivo + snapshot). Log del servidor
(`~/.logs/error_log_frecoin_es`):
`gallery.php: gallery_item(): Argument #1 ($r) must be of type array, null given`.

Causa: en el POST se leía `db()->lastInsertId()` **después** de
`regenerate_gallery_snapshot()` (que hace un `SELECT`); el SELECT intermedio invalida
`lastInsertId()` → devuelve 0 → `fetch_gallery(0)` = null → `gallery_item(null)` → 500.
El INSERT ya había cometido, por eso la foto aparecía pese al error.

Fix: capturar `$newId = db()->lastInsertId()` **justo tras el INSERT**, antes del
snapshot; y devolver `null` si `fetch_gallery` no encuentra la fila (defensivo).
`users.php` NO tiene el bug (llama a `lastInsertId()` sin query intermedia).
Redeploy solo de `gallery.php` (scp). Verificado en vivo: `POST gallery.php` → 201 con
item; DELETE de prueba → 200; limpieza sin dejar basura.

## Next step

Responder a Luis (borrador ya creado en Gmail) que ya puede añadir fotos por área desde
**Trabajos**. Pendientes de backoffice sin tocar (textos de Contenido al front, bloques de
servicios, blog). Decidir merge de `feat/backoffice-cms`.

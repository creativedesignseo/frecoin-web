# Backoffice CMS — autoedición de frecoin (React + PHP + MySQL)

**Fecha:** 2026-06-17
**Estado:** en vivo (parcial) — rama `feat/backoffice-cms`, HEAD `df5ea8c`
**Verificación:** Node `fetch` + Playwright headless contra frecoin.es (no supuesto)

## Objetivo

Dar a Luis un panel para editar el contenido de su web sin tocar código, reflejo
del admin de DoodleForever pero sobre el stack de frecoin (Hostinger): React para
el panel, **PHP + MySQL** para el backend (todo en su servidor, no MongoDB/Netlify).
Sin romper la web pública entregada el 09-jun.

## Arquitectura (decisiones)

- **Panel React** build separado en `public_html/panel/` (no toca el bundle público).
- **API REST PHP** en `public_html/admin/api/*.php` (PDO → MySQL `u949041093_frecoin`).
- **Auth**: sesión PHP + cookie HttpOnly + CSRF (no JWT — same-origin). Revalida
  rol+activo contra BD en cada petición.
- **Imágenes**: subida al servidor (`/assets/uploads/`), no Cloudinary. Compresión
  WebP en el navegador; recorte centrado al ratio del hueco (`cropToRatioWebp`).
- **Front público**: lee snapshots JSON (`services.json`, `content.json`) regenerados
  al guardar, con **fallback al código** (`services.ts`, imágenes hardcodeadas) si fallan.

## Archivos cambiados

Backend (`public/admin/api/`): `schema.sql`, `seed-services.sql`, `db.php`,
`lib/bootstrap.php`, `auth.php`, `leads.php`, `services.php`, `content.php`,
`upload.php`, `config.example.php`, `.htaccess`.
Panel (`panel/`): proyecto Vite nuevo — `src/{App,main}.tsx`, `lib/{api,imageUtils}.ts`,
`store/AuthContext.tsx`, `components/{Layout,ProtectedRoute}.tsx`,
`pages/{Login,Dashboard,Leads,Servicios,Contenido}.tsx`, `public/.htaccess`.
Front público: `src/data/services.ts` (price + applyOverride), `src/pages/Servicio.tsx`
(merge snapshot), `src/components/ServiceLayout.tsx` (precio), `src/sections/WorkGallery.tsx`
(imágenes desde snapshot), `public/.htaccess` (snapshots no-cache).
`public/send-form.php`: + INSERT best-effort a `contact_leads`.

## Comandos / deploy

- BD: `schema.sql` + `seed-services.sql` ejecutados en phpMyAdmin / `mysql --force`.
- `config.php` creado SOLO en el servidor (gitignored; credenciales + hash bcrypt).
- Deploy por SSH/rsync a `public_html` (backup antes de cada subida):
  `admin/api/` y `panel/` aditivos; front re-desplegado sin `--delete` (excluye `panel/`).
- Builds verdes: panel (`npm run build` en `panel/`) y front (raíz).

## Verificación (en vivo)

- Rutas públicas `/`, `/servicios/sai` → 200; `/panel/` → 200; `send-form.php` → 400.
- Endpoints admin sin sesión → 401. Login `lfreire@frecoin.es` → 200 + super_admin;
  whoami revalida; mala contraseña → 401.
- Servicios: editar precio SAI → "desde 390 € + IVA" visible en `/servicios/sai`.
- Trabajos: foto horizontal 1600×600 → recortada a 450×600 (3:4) WebP, subida,
  visible en la home; revertida tras la prueba.
- `services.json` → `no-cache`; bundle versionado → `immutable` 1 año.

## Riesgos abiertos

- Contraseña `123456` (débil, temporal). Cambiar antes de uso real.
- Repo PÚBLICO: `config.php` gitignored (verificado con `git check-ignore`). Nunca commitear.
- Deploy manual: `admin/api/` y `panel/` deben incluirse a mano en cada subida SSH.
- TEXTOS de Contenido aún no conectados al front público (solo imágenes).
- `feat/backoffice-cms` diverge de `draft/diseno`; decidir merge.

## Siguiente paso

Conectar los textos de Contenido al front, o los bloques de servicios (FAQ/incluye),
o el Blog. Y cambiar la contraseña. (La sesión continúa en otro proyecto: DoodleForever.)

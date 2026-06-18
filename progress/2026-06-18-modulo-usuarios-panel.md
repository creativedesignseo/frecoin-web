# Módulo de usuarios del panel + cambio de contraseña propia

**Date:** 2026-06-18
**Status:** completed (desplegado y verificado en vivo)
**Related:** HANDOFF.md, tasks/current.md, public/admin/api/{account,users}.php,
panel/src/pages/{MiCuenta,Usuarios}.tsx

## Objective

Dos peticiones del dueño:
1. Que **cualquier usuario** del panel pueda **cambiar su propia contraseña**.
2. Que **solo el super_admin** pueda **añadir usuarios y asignar roles**.

Contexto previo: hubo un lockout (la contraseña robusta del 18-jun se perdió y el
panel no tenía forma de recuperarla). Se resolvió reseteando el hash por phpMyAdmin
(bcrypt cost 12, 60 chars) y luego se construyó este módulo para que no vuelva a
depender de tocar la BD a mano.

## Files inspected

- API: `lib/bootstrap.php` (helpers: `require_role`, `require_csrf`, `current_user`,
  `json_out/error`), `auth.php`, `db.php`, `services.php` (patrón de endpoint con
  whitelist + CSRF), `.htaccess` (sirve todos los `*.php` de la raíz de api).
- Panel: `lib/api.ts`, `store/AuthContext.tsx`, `App.tsx`, `components/Layout.tsx`
  (la nav ya tenía la entrada "Usuarios" como `soon + superOnly`),
  `components/ProtectedRoute.tsx`, `pages/{Login,Leads,Dashboard}.tsx` (estilo UI).
- Esquema: `admin_users` (id, email, password_hash, role, name, active, last_login,
  created_at, updated_at). **No requirió migración** — todas las columnas ya existen.

## Files changed

- `public/admin/api/account.php` (nuevo) — `PUT` cambiar mi contraseña (verifica la
  actual; cualquier usuario autenticado; bcrypt cost 12; mín. 8).
- `public/admin/api/users.php` (nuevo) — `GET/POST/PUT/DELETE` gestión de usuarios.
  `require_role('super_admin')`. Guardas anti-bloqueo (no auto-degradarse/desactivarse/
  eliminarse; siempre ≥1 super_admin activo). Nunca devuelve `password_hash`.
- `panel/src/lib/api.ts` — tipos `AdminRole`, `AdminUserFull`; `api.account.changePassword`,
  `api.users.{list,create,update,remove}`.
- `panel/src/pages/MiCuenta.tsx` (nuevo) — formulario cambiar contraseña (todos).
- `panel/src/pages/Usuarios.tsx` (nuevo) — alta + tabla de usuarios (solo super_admin;
  generador de contraseñas; guard de ruta hacia `/` si no es super_admin).
- `panel/src/App.tsx` — rutas `/usuarios` y `/mi-cuenta`.
- `panel/src/components/Layout.tsx` — activada "Usuarios" (quitado `soon`); añadida
  "Mi cuenta" (visible para todos).

## Commands run

- `cd panel && npm run build` → OK (bundle `index-Bgd_vbqu.js`).
- `php -l` de `account.php` y `users.php` **contra el PHP 8.3 del servidor** (por stdin,
  sin escribir en disco) → "No syntax errors".
- Backup en el home del servidor: `panel_backup_20260618_211701`, `api_backup_20260618_211701`.
- Deploy: `scp account.php users.php → public_html/admin/api/` (additivo, sin `--delete`,
  no toca `config.php`) + `rsync -az --delete panel/dist/ → public_html/panel/` (acotado
  SOLO a `/panel/`).
- `bash scripts/verify.sh` → `✓ all checks passed` (web pública intacta, `index-dllWHAsN.js`).

## Verification result (prod en vivo, no supuesto)

- `/`, `/servicios/sai` → 200 · `/panel/` sirve `index-Bgd_vbqu.js` · `.htaccess` del
  panel presente.
- `/admin/api/{auth,users,account}.php` sin sesión → **401** (protegidos).
- Login super_admin → 200 + `GET users.php` devuelve la lista (lfreire, super_admin).
- `account.php` con clave actual errónea → **403** (no cambia nada).
- `users.php` crear con clave corta → **400** (no crea usuario).
- Sin crear usuarios de prueba ni cambiar contraseñas reales.

## Open risks

- **Deploy sigue siendo manual por SSH** (sin auto-deploy, ADR-001). El panel se
  construye en `panel/` y se sube SOLO a `public_html/panel/`; los PHP de la API van
  a `public_html/admin/api/` (additivo, nunca `--delete` contra esa carpeta: tiene
  `config.php`, solo en servidor).
- `scp` usa `-P` (mayúscula) para el puerto; `-p` es "preserve" (causó un fallo de
  conexión en el primer intento). Anotado.
- Backups en el home del servidor a limpiar cuando ya no hagan falta:
  `panel_backup_20260618_211701`, `api_backup_20260618_211701`.

## Next step

Ninguno bloqueante. Pendientes de backoffice sin tocar (textos de Contenido al front,
bloques de servicios, blog). Decidir merge de `feat/backoffice-cms`.

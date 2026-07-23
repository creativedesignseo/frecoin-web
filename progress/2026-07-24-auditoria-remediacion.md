# Remediación de la auditoría del backoffice

**Date:** 2026-07-24
**Status:** completed (desplegado y verificado en vivo)
**Related:** progress/2026-07-23-galeria-trabajos.md (auditoría original), HANDOFF.md, tasks/current.md

## Objective

Aplicar los 13 hallazgos reales de la auditoría adversarial (workflow de 29 agentes,
2026-07-23) que quedaban pendientes tras el rediseño de la galería. El más serio: el
rate-limit de login vivía en `$_SESSION`, así que se saltaba omitiendo la cookie.

## Files changed

- `public/admin/api/auth.php` — **rate-limit por IP** en tabla `login_attempts`
  (persistente): comprueba `blocked_until` antes de validar credenciales; `register_failure`
  incrementa por IP y bloquea a los `max_attempts`; el login OK borra la fila. Añadido
  `password_verify` contra un **hash señuelo** cuando el email no existe (anti-enumeración
  por tiempo). `REMOTE_ADDR` es la IP real del cliente tras el CDN (verificado con un
  `_ipcheck.php` temporal).
- `public/admin/api/schema.sql` — tabla `login_attempts` (PK `ip`).
- `public/admin/api/content.php` — snapshot que **lanza** en fallo de escritura (antes lo
  silenciaba) + `mkdir` + excluye la sección obsoleta `section='work'`.
- `public/admin/api/users.php` — email duplicado → **409** (captura `errorInfo[1]==1062`),
  no 500; guarda de null en PUT.
- `public/admin/api/upload.php` — rechaza por longitud del base64 **antes** de decodificar.
- `public/.htaccess` — typo `work-manifest`→`work-gallery` (regla no-cache de snapshots).
- `panel/src/pages/Contenido.tsx` — reset del `<input file>` (re-seleccionar mismo archivo).
- `panel/src/pages/Usuarios.tsx` — `runAction` devuelve bool; "restablecer contraseña" solo
  cierra/limpia si tuvo éxito; no carga `users.php` si no es super_admin.

## Commands run

- `php -l` de auth/content/users/upload contra el PHP 8.3 del servidor → sin errores.
- `panel npm run build` → OK (`index-BlcpRtEO.js`).
- Backup: `~/api_backup_20260724_013125`; migración `CREATE TABLE login_attempts` → TABLE_OK.
- Deploy: `scp` de los 4 PHP → `admin/api/`; `sed` en sitio del `.htaccess`; `rsync` panel → `/panel/`.
- `graphify update .` (Graph al día).

## Verification result (prod en vivo)

- **Login correcto → 200** (la reescritura de auth.php NO rompió el login) · errónea/inexistente → 401.
- `login_attempts`: `attempts=2` tras 2 fallos desde mi IP; login OK → 0 filas (limpia).
- `.htaccess`: `work-gallery.json` → `cache-control: no-cache, must-revalidate`.
- `users.php` crear email existente → **409** "Ya existe un usuario con ese email".
- Panel `index-BlcpRtEO.js` sirviéndose.

## Open risks

- El comando `ssh $VAR` con opciones en una variable falla (parseo de `-i`); usar flags
  explícitos o `-e "ssh ..."` en rsync. (Recurrente; anotado.)
- Residual menor: filas físicas `section='work'` siguen en `page_content` (ya no se escriben
  al snapshot); `gallery.add` calcula `sort_order` con MAX+1 no atómico (el reorder sí lo es).
- Backups a limpiar cuando ya no hagan falta: `api_backup_20260724_013125`,
  `backup_public_html_20260723_203212`, `htaccess_backup_*`.

## Next step

Ninguno bloqueante. Pendientes de backoffice sin tocar (textos de Contenido al front,
bloques de servicios, blog). Decidir merge de `feat/backoffice-cms`.

# Logo del panel + incidente de deploy + recuperación

**Date:** 2026-06-18
**Status:** completed (verificado en vivo)
**Related:** HANDOFF.md, tasks/current.md, panel/src/pages/Login.tsx

## Objective

Cambiar el logo de la pantalla de login del panel (`/panel/`) por la imagen de
marca `logo-frecoin-dark.png` (antes era un icono `LockKeyhole` + texto), y
desplegarlo a producción.

## Qué se cambió (código)

- `panel/src/pages/Login.tsx` — sustituido el icono + título por `<img>` con
  `${import.meta.env.BASE_URL}logo-frecoin-dark.png`. Eliminado import no usado.
- `panel/public/logo-frecoin-dark.png` — nuevo asset (131 KB).
- `panel/src/vite-env.d.ts`, `src/hooks/useContent.ts` — untracked previos, incluidos.

## Incidente (qué salió mal)

1. **Build equivocado.** El panel es una app Vite SEPARADA en `panel/`
   (`base: '/panel/'`). En el primer intento se ejecutó `npm run build` en la
   RAÍZ (web pública → `dist/`), no en `panel/`. El cambio del logo nunca entró.
2. **rsync destructivo.** `rsync -avz --delete dist/ → public_html/` borró
   `/panel/` (no está en `dist/`) y `/admin/api/config.php` (credenciales DB,
   solo en servidor). Resultado: panel servía la home pública y la API daba **500**.
3. **"Restauración" fallida.** `cp -r public_html_backup_... public_html` anidó el
   backup DENTRO de `public_html` (porque el dir ya existía) en vez de restaurar.
4. **`.htaccess` mal reescrito** en la raíz, enmascarando el fallo con un falso 200.

## Recuperación

Backup intacto: `domains/frecoin.es/public_html_backup_20260618_161534` (snapshot
pre-incidente). Restauración quirúrgica vía SSH:

- `rm -rf public_html/panel && cp -rp BACKUP/panel public_html/panel`
- `cp -p BACKUP/admin/api/config.php public_html/admin/api/config.php` (modo 600)
- `cp -p BACKUP/.htaccess public_html/.htaccess` (original, 5125 B)
- `rm -rf public_html/public_html_backup_20260618_161534` (basura anidada)

## Deploy correcto del logo

- `cd panel && npm run build` → `panel/dist/` (bundle `index-B4CHSoqR.js`,
  incluye `.htaccess` propio de `/panel/` + `logo-frecoin-dark.png`).
- Backup previo: `cp -rp public_html/panel panel_backup_20260618_163943`.
- `rsync -avz --delete panel/dist/ → public_html/panel/` (acotado SOLO a `/panel/`).

## Comandos de verificación (resultado)

- `scripts/verify.sh` → `✓ all checks passed` (build raíz OK).
- curl prod: `/panel/` sirve `index-B4CHSoqR.js` (200) · logo 200 ·
  `/admin/api/auth.php` 401 · `/` + `/servicios/sai` 200 · `send-form.php` 400.

## Open risks

- **Deploy del panel es propenso a error**: build en `panel/` (no raíz) y subir
  SOLO a `public_html/panel/`. NUNCA `rsync --delete` de `dist/` contra la raíz.
  Documentado en HANDOFF § "Lección para el próximo deploy del panel".
- Backups en servidor (limpiar cuando ya no hagan falta):
  `public_html_backup_20260618_161534`, `panel_backup_20260618_163943`.
- Sigue sin auto-deploy (ADR-001): cada publicación del panel es manual por SSH.

## Next step

Ninguno bloqueante. Pendientes de backoffice sin tocar (textos de Contenido al
front, bloques de servicios, blog). Decidir merge de `feat/backoffice-cms`.

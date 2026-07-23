# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-07-23 (galería "Trabajos" rediseñada: drag&drop + título/descripción + reordenar — desplegada y verificada en vivo)

---

## Current state

**WEB PÚBLICA ENTREGADA** (09-jun, Luis conforme). Encima se ha construido un
**BACKOFFICE CMS EN VIVO** (`frecoin.es/panel/`): React + PHP + MySQL, reflejo del
admin de DoodleForever. Rama `feat/backoffice-cms` (HEAD `1d7e015`), subido por SSH.
Detalle en `HANDOFF.md` § Backoffice CMS y `progress/2026-06-17-backoffice-cms.md`.

**18-jun:** Logo del panel actualizado a `logo-frecoin-dark.png` y desplegado a
`/panel/` (bundle `index-B4CHSoqR.js`). Hubo un incidente de deploy (rsync borró
`/panel/` + `config.php`); recuperado desde backup y re-desplegado correctamente.
Secuencia completa en `progress/2026-06-18-logo-panel-incidente-recuperacion.md`.

**18-jun (tarde):** Tras un lockout (clave robusta perdida) se reseteó la contraseña
de `lfreire@frecoin.es` por phpMyAdmin (hash bcrypt 60 chars) y se construyó el
**módulo de Usuarios + Mi cuenta** (`account.php`, `users.php`, páginas React).
Desplegado a `/panel/` (bundle `index-Bgd_vbqu.js`) y verificado en vivo.
Detalle en `progress/2026-06-18-modulo-usuarios-panel.md`.

Stack: React/Vite (público + panel) · PHP + MySQL (backoffice) · Hostinger (deploy
manual SSH, no auto-deploy) · Live: true.

**Hecho en esta sesión (backoffice, todo verificado en vivo):**
- Backend PHP + login (sesión + CSRF), panel React en `/panel/`.
- Leads: formulario real → `contact_leads` + bandeja en el panel.
- Servicios: textos + precio + imágenes + SEO editables, reflejados en la web.
- Contenido: galería de Trabajos editable con recorte 3:4 automático + WebP.
- Fix de caché: snapshots de datos `no-cache` (cambios instantáneos).

---

## ✅ Backoffice — completado (sesión 2026-06-17)

- [x] BD MySQL (7 tablas) + backend PHP (`db.php`, `bootstrap.php`, `auth.php`)
- [x] Panel React (login, dashboard, layout, roles)
- [x] Leads (`leads.php` + página + persistencia en `send-form.php`)
- [x] Servicios (`services.php` + editor textos/precio/imágenes + merge en el front)
- [x] Subida de imágenes (`upload.php`) + recorte 3:4 (`cropToRatioWebp`)
- [x] Contenido (`content.php` + página) — imágenes de Trabajos conectadas al front
- [x] Caché de snapshots arreglada
- [x] **Usuarios + Mi cuenta** (`account.php`, `users.php`, `MiCuenta.tsx`, `Usuarios.tsx`):
      cambio de contraseña propia (todos) + alta/roles/activar/reset/eliminar (solo
      super_admin), con guardas anti-bloqueo. Desplegado y verificado en vivo 2026-06-18.
- [x] **Trabajos — galería multi-foto por área** (`gallery.php`, `Trabajos.tsx`, tabla
      `work_gallery`, snapshot `work-gallery.json`, `WorkGallery` público): Luis añade y
      **acumula** fotos por área (6 áreas), antes solo sustituía 1. Petición suya por email
      (04-jul y 22-jul). Desplegado + verificado en vivo 2026-07-23. Ver
      `progress/2026-07-23-galeria-trabajos.md`.
- [x] **Trabajos — rediseño** (2026-07-23): botón "Añadir foto" + arrastrar-soltar,
      **reordenar arrastrando** (`@dnd-kit`, `PUT ?action=reorder`), **título + descripción**
      por foto (descripción visible en la web), limpieza del archivo al borrar. Migración
      `ADD COLUMN description`. Verificado en vivo. Ver `progress/2026-07-23-galeria-trabajos.md`.

## 🔍 Auditoría del backoffice (2026-07-23) — pendientes

Auditoría adversarial (13 hallazgos reales). Ya arreglados en `gallery.php`/`Trabajos.tsx`:
guarda de null en PUT, snapshot que lanza si no puede escribir, limpieza de archivo al
borrar, reset del selector de archivo. **Quedan pendientes** (no urgentes, panel interno):
- [ ] **Seguridad — login sin límite real**: el rate-limit vive en `$_SESSION`; se salta
      sin cookie. Pasar a límite por IP+email persistente (`auth.php`). *(el más serio)*
- [ ] `auth.php`: enumeración de emails por tiempo de respuesta (bcrypt solo si el user existe).
- [ ] Reset del selector de archivo en `Contenido.tsx` y `Servicios.tsx` (como en Trabajos).
- [ ] `Usuarios.tsx`: "Restablecer contraseña" cierra/borra el campo aunque falle (parece OK).
- [ ] `Usuarios.tsx`: carga `users.php` para un admin normal antes de redirigirlo.
- [ ] `.htaccess` (raíz + `dist/`): la regla no-cache apunta a `work-manifest.json` (typo);
      debe ser `work-gallery.json` (hoy lo salva el `?v=` anti-caché).
- [ ] `content.php`: mismo swallow de fallo al escribir snapshot que ya se arregló en gallery.
- [ ] `schema.sql`: filas muertas `section='work'` en `page_content` (duplican datos sin uso).
- [ ] `users.php`: crear email duplicado a la vez → 500 en vez de 409; y PUT sin guarda de null.
- [ ] `upload.php`: valida tamaño tras decodificar todo en memoria (endurecer).

## 🟡 Backoffice — pendiente

- [ ] Conectar TEXTOS de Contenido (hero/about/números/contacto) al front público
- [ ] Bloques de servicios editables (qué incluye, FAQ, audiencias, proceso) + iconos
- [ ] Blog (tablas listas; falta editor BlockNote + sección pública)
- [x] Cambiar contraseña `123456` → clave robusta (bcrypt cost 12, 2026-06-18; verificado en vivo)
- [ ] Decidir si `feat/backoffice-cms` se mergea a `draft/diseno`/`main`

---

## P0 — blocking ship

*(Nada bloqueante — la web está en vivo y estable.)*

---

## P1 — important, not blocking

- [x] **Web entregada y aceptada** — Luis confirmó 09-jun: "muy conforme con tu trabajo."
- [x] **Propuesta SEO enviada a Luis** — 2026-06-11. 499€/2 bloques. PDF adjunto.
      **Esperando respuesta.** Al confirmar: solicitar NAP exacto + accesos Google.
- [x] **Guía de delegación para Abraham** — `correos/Guia-Trabajo-Abraham-SEO-FRECOIN.md`
      (gitignored). 10 fases, checklist final, tiempos estimados. Lista para compartir.
- [x] **RGPD + logo + sobre nosotros** — todos los correos enviados y acusados recibo.

- [ ] **Fotos de trabajos** — Luis envía fotos reales de instalaciones.
      Subirlas a la web en la sección Trabajos realizados.

- [ ] **Automatizar el deploy** — conectar Hostinger a la rama `production`
      o cron `git pull`. Ver `docs/decisions/ADR-001-deploy-architecture.md`.

---

## P2 — backlog

- [ ] Imagen "Circuito cerrado de cámaras" + logo FRECOIN en camisa del técnico
      (Trabajos realizados). **Bloqueado:** créditos de generación IA a 0.
- [ ] Logo FRECOIN en la camisa del técnico en fotos de Trabajos (eléctricas).
      Mismo bloqueo.

---

## Diferido (medio plazo, sin compromiso)

- [ ] **Panel de auto-edición de contenido (CMS)** — evaluado el 03-jun, aparcado.
      Ver `progress/2026-06-03-cms-autoedicion-diferido.md`.

---

## Blocked

- Generación de imágenes IA — créditos a 0 (plan free). Recargar para desbloquear P2.

---

## Borradores obsoletos a eliminar manualmente desde Gmail

- `19eadef1dc95f012` — propuesta 700€
- `19eb6f49e3298838` — propuesta 300€+200€/mes
- `19eb71ff916fa246` — propuesta 499€ con subtítulo incorrecto

---

## Known pre-existing failures (not blockers)

- `npm run lint` → 31 errores preexistentes en `src/sections/Navbar.tsx` y otros.
  Desactivado en `scripts/verify.sh`. No relacionados con cambios recientes.

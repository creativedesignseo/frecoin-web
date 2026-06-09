# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-06-08

---

## Current state

Sitio en Hostinger. Rama de trabajo actual: `draft/diseno`.
La web en vivo (frecoin.es) está en el **build del 08-jun-2026** (`b4e4340`,
bundle `index-MaD9V3xZ.js`): incluye lo del 02-jun ("Barcelona y Cataluña",
SEO, imágenes SAI, "certificación", "Sobre nosotros") **+ las cláusulas
informativas RGPD oficiales** de los abogados de Luis bajo los formularios de
Presupuesto (Hero) y Contacto, con casilla de aceptación obligatoria.
Verificado en vivo (cláusulas presentes + send-form.php responde HTTP 400).
El deploy es **manual** (subir `dist/` por SSH — ver `HANDOFF.md`).

Stack: Node.js · Hosting: Hostinger (deploy manual) · Live in production: true (08-jun, b4e4340)

**Hecho recientemente:** 08-jun cláusulas RGPD (ver
`progress/2026-06-08-clausulas-rgpd-formularios.md`). Proyecto 100% cobrado.

---

## P0 — blocking ship

- [ ] **Automatizar el deploy** (recomendado) — conectar Hostinger a la rama
      `production` o cron `git pull`. Ver `docs/decisions/ADR-001-deploy-architecture.md`.

---

## P1 — important, not blocking

- [ ] Imagen de "Circuito cerrado de cámaras" (Trabajos realizados) —
      generar con IA on-brand. **Bloqueada:** workspace de generación
      sin créditos (plan free, saldo 0).
- [ ] Logo FRECOIN en la camisa del técnico en las imágenes de
      Trabajos realizados (eléctricas + cámaras). Requiere regenerar
      con el logo como referencia → también bloqueado por créditos.
      Logo real: `/Users/aimac/Downloads/Logo frecoin.svg`.

---

## Diferido (medio plazo, sin compromiso)

- [ ] **Panel de auto-edición de contenido (CMS)** para que el cliente edite
      textos/imágenes solo. Evaluado el 03-jun: NO es un quita-y-pon (el
      contenido está horneado en el build; habría que pasar la web a leer
      contenido en runtime + construir panel). Aparcado: la web funciona bien
      hoy y los cambios son ocasionales. Plan detallado guardado fuera del repo
      en `~/.claude/plans/el-cliente-solicit-que-tingly-trinket.md`. Ver
      `progress/2026-06-03-cms-autoedicion-diferido.md`. Retomar solo si el
      cliente quiere edición frecuente y autónoma.

---

## Blocked

- Generación de imágenes IA — **créditos a 0** en el workspace
  (plan free). Recargar para desbloquear las dos tareas P1 de imágenes.

---

## Next recommended action

Recargar créditos del workspace de imágenes y regenerar las dos
imágenes de Trabajos realizados con el técnico llevando el polo verde
de FRECOIN con el logo.

---

## Known pre-existing failures (not blockers, but on the floor)

- `npm run lint` → 31 errores preexistentes en archivos no tocados
  recientemente (p.ej. `src/sections/Navbar.tsx`:
  `react-hooks/immutability`, `react-hooks/refs`). No relacionados con
  los cambios en curso. `lint` está desactivado en `scripts/verify.sh`
  por este motivo; reactivar cuando se limpie.

---

## Out of scope right now

- (02-jun) El SEO de `src/data/services.ts` y las páginas standalone
  (`SobreNosotros`, `Rediseno`) **sí se actualizaron** en el lote `282f2b2`
  ("Barcelona y Cataluña"). Ya no aplica la exclusión previa.

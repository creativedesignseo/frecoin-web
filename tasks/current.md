# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-05-29

---

## Current state

Sitio en Hostinger. Rama de trabajo actual: `draft/diseno`.
La web en vivo (frecoin.es) está **congelada en el build del 21-may-2026**;
el rediseño de `draft/diseno` **NO está publicado**. El deploy es **manual**
(subir `dist/` por SSH — ver `HANDOFF.md`). En curso una tanda de cambios de
la home pedidos por Luis: copy de cobertura, icono WiFi y dos imágenes de
"Trabajos realizados".

Stack: Node.js · Hosting: Hostinger (deploy manual) · Live in production: true (estado 21-may)

---

## P0 — blocking ship

- [ ] **Publicar el rediseño de `draft/diseno`** — deploy MANUAL: `npm run
      build` + subir `dist/` a `public_html` por SSH. Requiere autorización
      de escritura en el servidor. Ver `HANDOFF.md`.
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

- Tocar SEO meta / keywords en `src/data/services.ts` (ya mencionan
  "Barcelona"; fuera del alcance de la tanda de la home).
- Páginas standalone (`SobreNosotros`, `Contact`, `Rediseno`) — la
  revisión actual del cliente es solo sobre la home.

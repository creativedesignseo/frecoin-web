# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-05-29

---

## Current state

Sitio en producción en Netlify. Rama de trabajo actual: `draft/diseno`.
En curso una tanda de "ligeros cambios" pedidos por el cliente (Luis)
sobre la home: copy de cobertura, icono WiFi y dos imágenes de
"Trabajos realizados".

Stack: Node.js · Hosting: Netlify · Live in production: true

---

## P0 — blocking ship

- [ ] *(sin P0 ahora mismo)*

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

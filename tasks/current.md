# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-06-11

---

## Current state

Sitio en Hostinger. Rama de trabajo actual: `draft/diseno`.
La web en vivo (frecoin.es) está en el **build del 08-jun-2026** (`b4e4340`):
incluye lo del 02-jun ("Barcelona y Cataluña", SEO, imágenes SAI, "certificación",
"Sobre nosotros") **+ las cláusulas RGPD oficiales** bajo formularios de Presupuesto
y Contacto, con checkbox de aceptación obligatorio. HTTP 200 verificado 2026-06-11.
El deploy es **manual** (subir `dist/` por SSH — ver `HANDOFF.md`).

Stack: Node.js · Hosting: Hostinger (deploy manual) · Live in production: true (08-jun, b4e4340)

**Hecho recientemente:**
- 08-jun: cláusulas RGPD en formularios (ver `progress/2026-06-08-clausulas-rgpd-formularios.md`). Proyecto web 100% cobrado.
- 11-jun: propuesta SEO FRECOIN preparada (499€/2 bloques). 3 borradores Gmail listos.

---

## P0 — blocking ship

*(Nada bloqueante — la web está en vivo y estable.)*

---

## P1 — important, not blocking

- [ ] **Enviar propuesta SEO a Luis** — borrador `19eb72b01238cc66` listo en Gmail.
      499€ / 2 pagos (250€ + 249€). PDF `Propuesta-Adspubli-SEO-FRECOIN.pdf` adjunto.
      Detalles completos en `HANDOFF.md` § Propuesta SEO FRECOIN.

- [ ] **Enviar respuesta RGPD + fotos** — borrador `19eb6ecac95e9a42`.
      Responde correo 05-jun de Luis. Enviar antes o junto con la propuesta.

- [ ] **Enviar aviso "Sobre nosotros" publicado** — borrador `19e97a91ffbcdde5`.
      Incluye capturas inline de la sección actualizada.

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

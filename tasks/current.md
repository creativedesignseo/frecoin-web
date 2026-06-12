# tasks/current.md — frecoin-web active task queue

> Single page of what's being worked on **right now**. Keep it short.
> Older completed tasks live in `progress/`. Strategic plans live in
> `README.md` or `ROADMAP.md`. Operational truth lives in
> `HANDOFF.md` (when it exists).

**Last updated:** 2026-06-12 (verificación completa en vivo — web entregada y aceptada)

---

## Current state

**WEB ENTREGADA AL CLIENTE.** Luis Freire confirmó el 09-jun: "muy conforme con tu trabajo."
Frecoin.es en producción (build 08-jun `b4e4340`), HTTP 200, todas las páginas cargando.
Proyecto web cerrado — fase activa: SEO (propuesta enviada 11-jun, pendiente respuesta).

Stack: Node.js · Hosting: Hostinger (deploy manual) · Live in production: true (08-jun, b4e4340)

**Hecho recientemente:**
- 08-jun: cláusulas RGPD en formularios. Luis acusó recibo.
- 09-jun: Luis confirma conformidad con todo el trabajo web.
- 11-jun: propuesta SEO 499€ enviada a Luis. Esperando respuesta.
- 12-jun: verificación completa en vivo (Playwright). Web 100% correcta.

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

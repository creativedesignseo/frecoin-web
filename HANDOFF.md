# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-05-29
**Estado git:** rama `draft/diseno`. 3 commits locales **sin pushear**
(home 29-may + harness + esta documentación). Nada desplegado.
**Producción (frecoin.es) servida desde:** build subido **manualmente el 21-may-2026** (estado anterior al rediseño en `draft/diseno`).

---

## Qué hay en producción hoy

- **URL:** https://frecoin.es
- **Estado:** la web en vivo está **congelada en el build del 21-may-2026**
  (mtime de `index.html` en el servidor: `2026-05-21 19:11`).
- **El rediseño de la rama `draft/diseno` NO está publicado.** Toda la
  tanda pre-entrega (nuevo diseño, fotos reales de Luis, formularios PHP,
  emails HTML, ajustes de la home del 29-may) sigue **solo en git**, no en
  el servidor.

---

## Cómo se despliega DE VERDAD (proceso real, verificado 29-may-2026)

**No hay auto-deploy.** Se comprobaron y descartaron las 3 vías:

| Vía | Estado |
|---|---|
| Panel Hostinger "Despliegue desde GitHub" (OAuth) | ❌ no conectado |
| `public_html` como repo git con `git pull` | ❌ no es repo git (son archivos sueltos) |
| Cron job con `git pull` | ❌ no existe (`crontab -l` vacío) |

El deploy real es **manual**:

1. `npm run build` en local → genera `dist/`.
2. Subir el **contenido de `dist/`** al servidor por SSH/rsync, a la raíz
   web `domains/frecoin.es/public_html/` (sobrescribiendo).
3. Verificar que `frecoin.es` carga.

> Conexión SSH: detalles en **Hostinger → Avanzado → Acceso SSH**. Clave
> local: `~/.ssh/frecoin_hostinger` (par `.pub` registrado en Hostinger
> como `frecoin-deploy-mac`). No se documentan IP/usuario aquí por ser
> repo público.

### Sobre el workflow de GitHub Actions

`.github/workflows/deploy-to-production-branch.yml` **sí funciona a medias**:
en cada push a `main` compila y empuja el `dist/` a la rama `production`.
**Pero nadie consume esa rama en Hostinger** (ver tabla arriba), así que
ese pipeline está **huérfano**. Un push a `main` actualiza GitHub, **no la
web**.

---

## Qué funciona

- Build local (`npm run build`) y `bash scripts/verify.sh` → verde.
- Pipeline GitHub Actions → rama `production` (build correcto, pero sin
  consumidor en el hosting).
- Formularios vía PHP nativo de Hostinger (`public/send-form.php`).

---

## Pendiente / riesgos abiertos

- [ ] **Publicar el rediseño** de `draft/diseno` (deploy manual de `dist/`).
- [ ] **Automatizar el deploy de verdad** (recomendado): conectar el panel
      "Despliegue desde GitHub" de Hostinger a la rama `production`, o un
      cron `git pull`. Mientras tanto, cada publicación es manual. Ver ADR
      cuando se decida.
- [ ] Imagen de "Circuito cerrado de cámaras" + logo FRECOIN en camisa de
      las fotos de Trabajos realizados — bloqueado por créditos de
      generación de imágenes. Ver `tasks/current.md`.
- [ ] **Seguridad (repo público):** auditar que no haya credenciales en el
      historial (`public/send-form.php`, `.env`, plantillas de email).

---

## Al cerrar cada sesión que despliegue

1. Anota aquí el nuevo "Producción servida desde" (fecha + commit subido).
2. Bump `Last updated`.
3. Si fue un cambio multi-archivo, añade entrada en `progress/`.

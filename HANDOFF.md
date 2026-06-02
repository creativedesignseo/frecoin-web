# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-06-02
**Estado git:** rama `draft/diseno`, **pusheada a GitHub** hasta `92ec66e`.
**Producción (frecoin.es) servida desde:** **build del 02-jun-2026** (`92ec66e`),
subido **manualmente por SSH** a `public_html`. Incluye: zona de servicio
"Barcelona y Cataluña" en toda la web + SEO/JSON-LD, "certificación" en card
Redes, imágenes SAI profesionales (hero + benefits) y textos de "Sobre
nosotros" a "Cataluña" / "Barcelona y Cataluña". Verificado HTTP 200.
Backup pre-deploy: `~/backup_public_html_20260602_174437`.

---

## Qué hay en producción hoy

- **URL:** https://frecoin.es
- **Estado:** **en vivo el rediseño completo** (build del 29-may-2026:
  nuevo diseño, fotos reales de Luis, formularios PHP, emails HTML, cobertura
  "toda Barcelona", "Zona de cobertura: Barcelona y Cataluña", e imágenes de
  Trabajos realizados: eléctricas + **cámaras y cobertura WiFi con técnico de
  logo frecoin** + icono WiFi router inline) + lote 02-jun (`92ec66e`):
  "Barcelona y Cataluña" en toda la web/SEO/JSON-LD, imágenes SAI
  profesionales (hero + benefits), "certificación" en card Redes y textos de
  "Sobre nosotros". Verificado HTTP 200.
- **Pendiente (consistencia, no bloqueante):** las fotos de "Redes" y
  "Eléctricas" son genéricas/IA sin el técnico de logo frecoin (cámaras y WiFi
  sí lo llevan). Cambiar cuando haya más fotos reales.
- **Revertir si hiciera falta:** restaurar el backup más reciente en el
  servidor (`~/backup_public_html_20260529_164446`, y anteriores) →
  `domains/frecoin.es/public_html/` por SSH.

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

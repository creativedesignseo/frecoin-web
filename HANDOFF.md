# HANDOFF.md — frecoin-web (verdad operativa)

> Fuente de verdad nº1 del proyecto (ver `AGENTS.md` § Sources of truth).
> Léeme al empezar cualquier sesión. Describe **qué hay en producción
> hoy y cómo se despliega DE VERDAD**, no cómo "debería" ser.
>
> ⚠️ Repo **PÚBLICO** (`creativedesignseo/frecoin-web`). **Nunca**
> escribas aquí IP, usuario, puerto, contraseñas ni claves del servidor.
> Las credenciales viven en el panel de Hostinger y en la clave local
> `~/.ssh/frecoin_hostinger` (no commiteada).

**Last updated:** 2026-06-12 (verificación completa en vivo — Playwright)
**Estado git:** rama `draft/diseno`, **pusheada a GitHub** hasta `2498c2d`.
**Producción (frecoin.es) servida desde:** **build del 08-jun-2026** (`b4e4340`),
subido **manualmente por SSH** a `public_html`.
**Verificado en vivo el 2026-06-12:** HTTP 200, todas las secciones y rutas cargando.

**WEB ENTREGADA AL CLIENTE — PROYECTO CERRADO.**
Luis Freire respondió el 09-jun-2026: *"Muy amable gracias por todo, muy conforme
con tu trabajo."* (thread `19eac6a8af11da7d`, remitente `lfreire@frecoin.es`).

Contenido del 08-jun: **cláusulas informativas RGPD oficiales** (validadas por la
asesoría jurídica del cliente, correo Luis 05-jun) en texto completo visible bajo
los formularios de Presupuesto (Hero) y Contacto, con casilla de aceptación
obligatoria. Verificado en vivo 2026-06-12: cláusula completa + checkbox visible.
Backup pre-deploy: `~/backup_public_html_20260608_175211`.

**Histórico (02-jun-2026, `906e71b`):** zona de servicio "Barcelona y Cataluña"
en toda la web + SEO/JSON-LD, "certificación" en card Redes, imágenes SAI
profesionales (hero + benefits) y textos de "Sobre nosotros". Verificado HTTP 200.
Backup: `~/backup_public_html_20260602_195112`.

---

## Qué hay en producción hoy (verificado en vivo 2026-06-12)

- **URL:** https://frecoin.es
- **Estado HTTP:** 200 — en vivo y respondiendo.
- **Title en prod:** `FRECOIN — Infraestructuras tecnológicas para empresas | Barcelona y Cataluña`
- **Páginas verificadas en vivo:**
  - `/` — Home completa: hero dark, formulario RGPD, números (20+/50+/6/5), 6 servicios, por qué elegirnos, sobre nosotros (foto Luis), trabajos realizados (4 fotos), contacto, CTA final, footer con datos fiscales y legales.
  - `/servicios/redes-informaticas` — Title propio: "Instalación de redes informáticas en Barcelona | FRECOIN". Breadcrumb + hero + contenido OK.
  - `/sobre-nosotros` — Hero "Tecnología cercana para empresas de Barcelona.", bio Luis Freire, "Cuatro principios que no negociamos."
- **Contenido activo (build acumulado 08-jun):**
  - Zona de servicio "Barcelona y Cataluña" en toda la web, SEO y JSON-LD.
  - Imágenes SAI profesionales (hero + benefits).
  - "Certificación" en card Redes.
  - **Cláusulas RGPD oficiales** bajo formulario hero, texto completo visible + checkbox obligatorio.
  - 6 servicios con página propia cada uno: Redes Informáticas, Instalaciones Eléctricas, Cámaras de Videovigilancia, Antenas WiFi, Sistemas SAI, Controles de Acceso.
  - Fotos reales de Luis en Trabajos realizados (cámaras + WiFi). Redes y Eléctricas siguen con fotos genéricas.
  - Footer: logo, lista servicios, Aviso Legal + Política Privacidad + Política Cookies, datos fiscales (NIF 48142086G, Sant Vicenç dels Horts Barcelona, info@frecoin.es).
  - WhatsApp flotante + botón llamada en navbar.
- **Backups en servidor:**
  - `~/backup_public_html_20260608_175211` (más reciente)
  - `~/backup_public_html_20260602_195112`
  - `~/backup_public_html_20260529_164446`
- **Pendiente (no bloqueante):** fotos de "Redes" y "Eléctricas" son genéricas/IA
  sin el técnico con logo FRECOIN. Cambiar cuando se tengan fotos reales o créditos IA.

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
ese pipeline está **huérfano**. Un push a `main` actualiza GitHub, **no la web**.

---

## Qué funciona

- Build local (`npm run build`) y `bash scripts/verify.sh` → verde.
- Pipeline GitHub Actions → rama `production` (build correcto, sin consumidor).
- Formularios vía PHP nativo de Hostinger (`public/send-form.php`).
- Cláusulas RGPD + checkbox en formularios de Presupuesto y Contacto (08-jun).

---

## Comunicaciones con el cliente (historial verificado 2026-06-12)

> Los archivos `.html` y `.pdf` viven en `correos/` (carpeta **ignorada
> por git** — repo público). Todo lo que está aquí es para referencia operativa.

### Historial de correos FRECOIN (info@one.adspubli.com) — verificado 2026-06-12

| Fecha | Asunto | messageId / Estado |
|---|---|---|
| 09-jun | **Luis responde: "muy conforme con tu trabajo"** | `19eac6a8af11da7d` — CONFIRMACIÓN ENTREGA WEB |
| 08-jun | Frecoin · Cambios legales aplicados en la web | `19eaaf7632aa1f43` — ENVIADO |
| 05-jun | Re: Protección de Datos (respuesta a Luis) | `19eb6ecac95e9a42` — ENVIADO |
| 05-jun | FRECOIN — ajustes «Sobre nosotros» ya aplicados | `19e97aa110887084` — ENVIADO |
| 05-jun | Frecoin · Entrega del logotipo rediseñado | `19e97b30a756736f` — ENVIADO |
| 11-jun | **Propuesta SEO · Que te encuentren en Google** | `19eb73fc6501f59c` — **ENVIADO, esperando respuesta** |

> Correo de Luis: `lfreire@frecoin.es`

> Borradores obsoletos — **borrar manualmente desde Gmail:**
> `19eadef1dc95f012` (700€), `19eb6f49e3298838` (300+200/mes), `19eb71ff916fa246` (subtítulo incorrecto).

### Propuesta SEO FRECOIN — detalle

**Archivos locales (gitignored):**
- `correos/Propuesta-Adspubli-SEO-FRECOIN.pdf` — PDF 3 páginas, ~450KB
- `correos/Propuesta-SEO-FRECOIN.html` — fuente HTML del PDF
- `correos/Email-Propuesta-SEO-Luis.html` — email cover

**Precio:** 499€ total · 250€ al confirmar + 249€ al entregar. Sin mensualidades.

**Qué incluye:**
- SEO técnico + keyword research (20-30 kw, Barcelona · Baix Llobregat)
- Google My Business profesional (categorías, servicios, fotos, Q&A, zona)
- Google Tag Manager: container + eventos (formulario, teléfono, WhatsApp, scroll)
- GA4: propiedad + eventos + vinculación GA4↔Google Ads + audiencias remarketing
- Trustpilot Business: cuenta + widget en web + sección opiniones vinculada a GBP
- Search Console + sitemap + robots.txt
- Alta en 10-15 directorios locales (ver guía abajo)
- Informe de entrega

**Extras opcionales (sin precio en el PDF):**
- Menciones en medios digitales (Setroi — 50+ periódicos, mejora E-E-A-T)
- Google Ads (tracking y audiencias quedan listos con el setup base)

### Alta en directorios locales — guía de implementación

**NAP exacto e idéntico en todos los directorios:**
```
Nombre:    FRECOIN
Web:       https://frecoin.es
Categoría: Infraestructuras tecnológicas / Redes informáticas / Videovigilancia
```
*(Dirección y teléfono: confirmar con Luis — deben coincidir con el Registro Mercantil.)*

**Descripción SEO (adaptar si hay límite de caracteres):**
```
FRECOIN es una empresa especializada en infraestructuras tecnológicas para empresas
en Barcelona y el Baix Llobregat. Instalamos y mantenemos redes informáticas,
instalaciones eléctricas, sistemas de videovigilancia (CCTV), redes WiFi corporativas,
SAI (sistemas de alimentación ininterrumpida) y controles de acceso. Más de 20 años
de experiencia. Servicio en Sant Vicenç dels Horts, Cornellà, El Prat, L'Hospitalet
y toda el área metropolitana de Barcelona.
```

**Directorios por prioridad SEO:**

| Prioridad | Directorio | Verificación | Nota |
|---|---|---|---|
| ★★★★★ | Google Business Profile | Vídeo/teléfono/carta | Principal — incluido en el trabajo |
| ★★★★ | Bing Places | Email / importar GBP | Rápido |
| ★★★ | Apple Maps Connect | SMS | ~10 min |
| ★★★ | Páginas Amarillas | Email | Básico gratis |
| ★★★ | Yelp.es | Llamada automática | Verificación por teléfono |
| ★★★ | Einforma / Axesor | Email | Ya tienen ficha del Registro — solo reclamar |
| ★★★ | Europages | Email | B2B, muy relevante para FRECOIN |
| ★★ | Hotfrog.es | Email | — |
| ★★ | Cylex.es | Email | — |
| ★★ | Infobel.es | Email | — |
| ★★ | Cambra de Comerç del Baix Llobregat | Web/teléfono | Autoridad local |
| ★★ | Ajuntament Sant Vicenç dels Horts | Contacto directo | Cita local |

**Reglas:** NAP idéntico en todos. Si un directorio ya tiene datos incorrectos, reclamar y corregir.
**Tiempo estimado:** 4-5h activas + 1-2 días de espera para verificaciones.
**No usar** Yext/BrightLocal — suscripción no rentable a este volumen.

---

## Pendiente / riesgos abiertos

- [x] **Web entregada y aceptada** — Luis confirmó conformidad el 09-jun-2026.
- [x] **RGPD aplicado** — correo enviado el 08-jun, Luis acusó recibo.
- [x] **Propuesta SEO enviada a Luis** — 2026-06-11. Esperando confirmación.
- [x] **Correo "Sobre nosotros" y logo** — enviados el 05-jun.
- [ ] **Respuesta propuesta SEO** — pendiente de Luis. Al confirmar: solicitar NAP exacto + accesos Google.
- [ ] **Fotos de trabajos** — Luis envía fotos reales para "Redes" y "Eléctricas" (hoy genéricas/IA).
- [ ] **Automatizar el deploy** — conectar Hostinger a rama `production` o cron.
- [ ] Imagen "Circuito cerrado de cámaras" + logo FRECOIN — bloqueado por créditos IA.

---

## Al cerrar cada sesión que despliegue

1. Anota aquí el nuevo "Producción servida desde" (fecha + commit subido).
2. Bump `Last updated`.
3. Si fue un cambio multi-archivo, añade entrada en `progress/`.

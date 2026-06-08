# 2026-06-08 — Cláusulas RGPD oficiales bajo formularios

## Objetivo
Sustituir el texto de privacidad provisional bajo los formularios por las
cláusulas informativas oficiales validadas por la asesoría jurídica del cliente
(correo de Luis "Protección de Datos", 05-jun-2026), con casilla de aceptación
obligatoria que bloquee el envío si no se marca.

## Contexto / decisión
- Texto fuente: `../legal/Clausulas informativas para poner bajo formularios web.docx`
  (dos variantes: Contacto y Presupuesto). Email de ejercicio de derechos:
  info@frecoin.es.
- Presentación: primero se probó un acordeón `<details>`, pero por preferencia
  del cliente se dejó el **texto completo visible** (la persona debe leerlo),
  11px, con la casilla obligatoria debajo. Patrón habitual en webs ES.

## Archivos cambiados
- `src/sections/Hero.tsx` — formulario de Presupuesto: cláusula variante
  Presupuesto + checkbox `required`.
- `src/sections/Contacto.tsx` — sección de Contacto del home: cláusula variante
  Contacto + checkbox `required`.
- (No se tocó `send-form.php` ni las plantillas de email.)

## Comandos / verificación
- `npm run build` — OK (bundle `index-MaD9V3xZ.js`).
- Verificado en local (preview) y **en producción**: ambas cláusulas presentes,
  `send-form.php` responde HTTP 400 a POST vacío (envío de leads intacto).
- Deploy: backup remoto `~/backup_public_html_20260608_175211` + `rsync` de
  `dist/` → `domains/frecoin.es/public_html/` por SSH.

## Commits (rama draft/diseno)
- `bb0e445` feat: cláusulas RGPD oficiales (texto)
- `b259e06` feat: acordeón details/summary (revertido por preferencia)
- `b4e4340` refactor: texto RGPD inline visible (estado final en producción)

## Riesgos abiertos / siguiente paso
- Limpiar un commit erróneo creado por error en la rama `main` (no afecta a
  producción; `main` es maqueta y Hostinger no la consume). Pendiente de OK.
- Forms de `pages/Contact.tsx` y `pages/Rediseno.tsx` son maquetas que no envían
  (onSubmit stub) — fuera del alcance de hoy; revisar si esas rutas se usan.

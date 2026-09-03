# Matriz SEO on-page — FRECOIN

**Fecha:** 3 de septiembre de 2026  
**Fuente:** investigación con Google Keyword Planner documentada en `../entregables/keyword-research-FRECOIN-2026-08-28.md` (repositorio de seguimiento).  
**Cobertura:** España, con sede física en Barcelona. Cada URL ataca una intención principal distinta para evitar canibalización.

## Regla editorial

Cada landing incorpora la keyword principal en el `title`, el H1 y el primer bloque de contenido. Las secundarias se distribuyen en H2, tarjetas de servicio, FAQ, texto explicativo, alt de imagen y enlaces contextuales. No se usa la antigua meta `keywords`: Google no la utiliza como señal de ranking.

| URL | Keyword principal | Volumen mensual España | Competencia | Title | H1 |
| --- | --- | ---: | --- | --- | --- |
| `/servicios/redes-informaticas` | instalación de redes informáticas | 100–1K | Baja | Instalación de redes informáticas para empresas \| FRECOIN | Instalación de redes informáticas para empresas |
| `/servicios/instalaciones-electricas` | instalaciones eléctricas | 1K–10K | Baja | Instalaciones eléctricas para empresas \| FRECOIN | Instalaciones eléctricas para empresas |
| `/servicios/camaras-videovigilancia` | instalación de cámaras de seguridad | 100–1K | Alta | Instalación de cámaras de seguridad para empresas \| FRECOIN | Instalación de cámaras de seguridad para empresas |
| `/servicios/antenas-wifi` | WiFi empresarial | 10–100 | Media | Instalación de WiFi empresarial \| FRECOIN | WiFi empresarial para oficinas, naves y locales |
| `/servicios/sai` | sistema SAI / SAI para empresas | 100–1K | Alta | Sistemas SAI para empresas \| FRECOIN | Sistemas SAI para empresas: no pierdas dinero por un corte de luz |
| `/servicios/controles-de-acceso` | control de accesos | 1K–10K | Media | Control de accesos para empresas \| FRECOIN | Control de accesos para empresas: adiós a las llaves perdidas |

## Arquitectura para búsqueda e IA

1. HTML prerenderizado por URL: title, description, canonical, H1, texto, enlaces y datos estructurados se entregan sin depender de JavaScript.
2. Un H1 único; H2 que desglosan alcance, público, beneficios, proceso y preguntas frecuentes; H3 para cada solución concreta.
3. JSON-LD `Service`, `FAQPage` y `BreadcrumbList` en cada servicio; `LocalBusiness` con NAP, geo y área de servicio en el sitio.
4. Enlaces internos entre soluciones técnicamente complementarias: redes↔WiFi, eléctricas↔SAI, cámaras↔accesos.
5. Sitemap con 11 URL canónicas indexables; robots permite rastreo y excluye el prototipo `/rediseno`; 301 `www`→dominio principal y 404 real.

## Control de CMS

El CMS publica `/assets/services.json` y puede sustituir title, descripción y H1 del código en el navegador. Por ello sus seis registros deben mantenerse idénticos a esta matriz. La actualización de 03/09 corrige los valores heredados de Barcelona/Cataluña que estaban revirtiendo la estrategia nacional tras cargar la página.

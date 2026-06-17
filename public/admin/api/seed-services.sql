-- FRECOIN — migración inicial de los 6 servicios desde src/data/services.ts.
-- v1: campos de texto clave + precio (price queda NULL; Luis lo rellena en el panel).
-- Los bloques ricos (includes/audience/FAQ/iconos) siguen en el código por ahora.
-- Idempotente: ejecutar con `mysql --force` (el ALTER falla si la columna ya
-- existe, pero --force continúa; INSERT IGNORE no pisa lo ya editado).

-- La tabla services se creó sin estas columnas; añadirlas (MySQL 8 no tiene
-- IF NOT EXISTS para columnas; con `mysql --force` los ALTER repetidos se ignoran).
ALTER TABLE services ADD COLUMN tagline VARCHAR(160) NOT NULL DEFAULT '' AFTER name;
ALTER TABLE services ADD COLUMN hero_image_alt VARCHAR(255) NOT NULL DEFAULT '' AFTER hero_image;
ALTER TABLE services ADD COLUMN benefits_image VARCHAR(512) NOT NULL DEFAULT '' AFTER hero_image_alt;
ALTER TABLE services ADD COLUMN benefits_image_alt VARCHAR(255) NOT NULL DEFAULT '' AFTER benefits_image;

INSERT IGNORE INTO services
  (slug, name, tagline, meta_title, meta_description, hero_h1, hero_paragraph, sort_order, active)
VALUES
  ('redes-informaticas', 'Redes Informáticas', 'Conectividad empresarial',
   'Instalación de redes informáticas en Barcelona | FRECOIN',
   'Diseño, instalación y mantenimiento de redes informáticas para empresas en Barcelona y Cataluña. Más de 20 años de experiencia.',
   'Redes informáticas para empresas que no pueden permitirse caer.',
   'Diseñamos, instalamos y mantenemos redes corporativas estables, rápidas y seguras. Cableado estructurado, certificación, configuración de routers y switches, Wi-Fi empresarial y soporte continuo.',
   1, 1),

  ('instalaciones-electricas', 'Instalaciones Eléctricas', 'Normativa y seguridad',
   'Instalaciones eléctricas para empresas en Barcelona | FRECOIN',
   'Ejecución de instalaciones eléctricas seguras y certificadas en Barcelona y Cataluña. Cableado, cuadros eléctricos, protecciones y mantenimiento. +20 años.',
   'Instalaciones eléctricas seguras, certificadas y bien hechas.',
   'Diseño y ejecución de instalaciones eléctricas para empresas, oficinas y naves industriales. Cableado, cuadros, protecciones y certificación según normativa vigente.',
   2, 1),

  ('camaras-videovigilancia', 'Cámaras de Videovigilancia', 'Vigilancia activa',
   'Instalación de cámaras de seguridad en Barcelona | FRECOIN',
   'Sistemas de videovigilancia CCTV e IP para empresas, naves industriales y comunidades en Barcelona y Cataluña. Visión nocturna, acceso remoto, normativa RGPD.',
   'Sistemas de videovigilancia profesionales y siempre operativos.',
   'Diseño e instalación de circuitos cerrados de cámaras IP y CCTV para empresas, naves, comercios y comunidades. Visión nocturna, acceso remoto, grabación segura y cumplimiento normativo.',
   3, 1),

  ('antenas-wifi', 'Antenas WiFi', 'Cobertura empresarial',
   'Instalación de antenas WiFi empresarial en Barcelona | FRECOIN',
   'Cobertura WiFi profesional para empresas, naves y locales en Barcelona y Cataluña. Antenas exteriores, puntos de acceso, redes mesh y soporte continuo.',
   'WiFi sin cortes en cada rincón de tu empresa.',
   'Diseñamos e instalamos cobertura WiFi profesional para oficinas, naves, locales y exteriores. Puntos de acceso gestionables, redes mesh y conectividad estable para todos tus dispositivos.',
   4, 1),

  ('sai', 'Sistemas SAI', 'Continuidad operativa',
   'Sistemas SAI para empresas en Barcelona | FRECOIN',
   'Instalación de Sistemas de Alimentación Ininterrumpida (SAI/UPS) para servidores, equipos críticos y comercios. Evita pérdidas por cortes eléctricos. Barcelona y Cataluña.',
   'No pierdas dinero por un corte de luz.',
   'Instalamos Sistemas de Alimentación Ininterrumpida (SAI/UPS) que mantienen tus servidores, ordenadores y equipos críticos funcionando durante cortes y picos eléctricos. Cero pérdidas de datos, cero interrupciones.',
   5, 1),

  ('controles-de-acceso', 'Controles de Acceso', 'Trazabilidad y seguridad',
   'Sistemas de control de acceso en Barcelona | FRECOIN',
   'Instalación de sistemas de control de acceso para empresas: tarjetas RFID, huella, código y app. Barcelona y Cataluña. Sin llaves físicas, todo trazado.',
   'Adiós a las llaves perdidas. Hola a un control real.',
   'Sistemas de control de acceso por tarjeta, huella, código o app móvil. Quién entra, cuándo y a qué zonas, todo registrado y configurable desde un único panel.',
   6, 1);

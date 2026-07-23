-- ============================================================================
-- FRECOIN Backoffice CMS — MySQL schema
-- MySQL 8 · InnoDB · utf8mb4
--
-- Ejecutar UNA vez en la base de datos del cliente (hPanel → Bases de datos →
-- phpMyAdmin → pestaña SQL). Idempotente: usa CREATE TABLE IF NOT EXISTS.
-- bcrypt cost 12 (coincide con el panel PHP existente de frecoin).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Cuentas del back-office. Login + revalidación por petición. Borrado lógico.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin') NOT NULL DEFAULT 'admin',
  name VARCHAR(120) NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  last_login DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Blog (editor de bloques BlockNote). content_blocks = JSON fuente,
-- content_html = render para el público, content = legacy texto plano.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  excerpt VARCHAR(500) NOT NULL DEFAULT '',
  content MEDIUMTEXT NULL,
  content_blocks JSON NULL,
  content_html MEDIUMTEXT NULL,
  tag VARCHAR(80) NOT NULL DEFAULT '',
  cover_image VARCHAR(512) NOT NULL DEFAULT '',
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  author VARCHAR(120) NOT NULL DEFAULT 'FRECOIN',
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_slug (slug),
  KEY ix_blog_status_pub (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Servicios (las 6 landings hoy hardcodeadas en src/data/services.ts).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(160) NOT NULL,
  tagline VARCHAR(160) NOT NULL DEFAULT '',
  meta_title VARCHAR(255) NOT NULL DEFAULT '',
  meta_description VARCHAR(320) NOT NULL DEFAULT '',
  keywords VARCHAR(500) NOT NULL DEFAULT '',
  hero_h1 VARCHAR(255) NOT NULL DEFAULT '',
  hero_paragraph TEXT NULL,
  hero_image VARCHAR(512) NOT NULL DEFAULT '',
  hero_image_alt VARCHAR(255) NOT NULL DEFAULT '',
  benefits_image VARCHAR(512) NOT NULL DEFAULT '',
  benefits_image_alt VARCHAR(255) NOT NULL DEFAULT '',
  price DECIMAL(10,2) NULL,
  price_unit VARCHAR(40) NOT NULL DEFAULT '',
  price_note VARCHAR(160) NOT NULL DEFAULT '',
  cta_text VARCHAR(160) NOT NULL DEFAULT '',
  active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_slug (slug),
  KEY ix_services_active_sort (active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Bloques repetidos de cada servicio (includes/audiencias/beneficios/proceso/FAQ).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_id BIGINT UNSIGNED NOT NULL,
  block_type ENUM('include','audience','benefit','process_step','faq') NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT '',
  body TEXT NULL,
  icon VARCHAR(80) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY ix_service_blocks (service_id, block_type, sort_order),
  CONSTRAINT fk_service_blocks_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Clave/valor para textos+imágenes editables hoy hardcodeados en el JSX.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_content (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  section VARCHAR(80) NOT NULL,
  content_key VARCHAR(120) NOT NULL,
  value_type ENUM('text','textarea','html','image','number') NOT NULL DEFAULT 'text',
  value LONGTEXT NULL,
  label VARCHAR(160) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_page_content (section, content_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Leads del formulario (hoy send-form.php solo manda email = leads perdidos).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  email VARCHAR(255) NOT NULL DEFAULT '',
  service VARCHAR(120) NOT NULL DEFAULT '',
  message TEXT NULL,
  source VARCHAR(40) NOT NULL DEFAULT 'contacto',
  status ENUM('new','read','handled','spam') NOT NULL DEFAULT 'new',
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_leads_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Registro de archivos subidos a /assets/uploads/ (librería + limpieza).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  url VARCHAR(512) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime VARCHAR(60) NOT NULL,
  bytes INT UNSIGNED NOT NULL DEFAULT 0,
  width INT UNSIGNED NULL,
  height INT UNSIGNED NULL,
  folder VARCHAR(120) NOT NULL DEFAULT 'general',
  uploaded_by BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_media_url (url),
  KEY ix_media_folder (folder),
  CONSTRAINT fk_media_user FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Galería "Trabajos realizados": N fotos por área (redes, electricas, camaras,
-- wifi, sai, controles). Reemplaza los 4 huecos fijos de page_content.section='work'.
CREATE TABLE IF NOT EXISTS work_gallery (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  area VARCHAR(40) NOT NULL,
  image_url VARCHAR(512) NOT NULL,
  title VARCHAR(160) NULL,
  description VARCHAR(500) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_work_gallery_area (area, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed: las 4 fotos por defecto que ya muestra la home (una por área).
INSERT INTO work_gallery (area, image_url, title, sort_order) VALUES
  ('redes',      '/assets/work-redes-corporativas.webp', 'Red corporativa completa',        1),
  ('electricas', '/assets/work-electricas-cuadro.webp',  'Instalación eléctrica industrial', 1),
  ('camaras',    '/assets/work-camaras-cctv.webp',       'Circuito cerrado de cámaras',      1),
  ('wifi',       '/assets/work-wifi-cobertura.webp',     'Cobertura WiFi empresarial',       1);

-- Rate limiting de login por IP (persistente; no depende de la cookie de sesión,
-- que se podía omitir para saltarse el bloqueo).
CREATE TABLE IF NOT EXISTS login_attempts (
  ip VARCHAR(45) NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  blocked_until DATETIME NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SEED — catálogo de page_content (claves fijas; Luis edita el valor, no el esquema).
-- Los valores van vacíos: el front usa su copy hardcodeado como fallback hasta
-- que se rellenen desde el panel. INSERT IGNORE = no pisa lo ya editado.
-- ============================================================================
-- value sembrado con el contenido ACTUAL del sitio (imágenes) para que el panel
-- muestre la referencia existente; los textos quedan vacíos (el front usa su copy).
INSERT IGNORE INTO page_content (section, content_key, value_type, value, label, sort_order) VALUES
  ('hero',     'h1',          'text',     '', 'Hero — Título principal',        1),
  ('hero',     'subtitle',    'textarea', '', 'Hero — Subtítulo',               2),
  ('hero',     'phone',       'text',     '', 'Hero — Teléfono',                3),
  ('numbers',  'years',       'number',   '', 'Números — Años de experiencia',  1),
  ('numbers',  'projects',    'number',   '', 'Números — Proyectos',            2),
  ('numbers',  'services',    'number',   '', 'Números — Servicios',            3),
  ('numbers',  'rating',      'number',   '', 'Números — Valoración',           4),
  ('about',    'bio',         'textarea', '', 'Sobre nosotros — Biografía',     1),
  ('about',    'avatar',      'image',    '/assets/luis-avatar-v2.webp', 'Sobre nosotros — Foto de Luis',  2),
  ('contacto', 'email',       'text',     '', 'Contacto — Email',               1),
  ('contacto', 'phone',       'text',     '', 'Contacto — Teléfono',            2),
  ('contacto', 'address',     'text',     '', 'Contacto — Dirección',           3),
  ('work',     'img_redes',      'image',  '/assets/work-redes-corporativas.webp', 'Trabajos — Red corporativa',    1),
  ('work',     'img_electricas', 'image',  '/assets/work-electricas-cuadro.webp',  'Trabajos — Instalación eléctrica', 2),
  ('work',     'img_camaras',    'image',  '/assets/work-camaras-cctv.webp',       'Trabajos — Cámaras / CCTV',     3),
  ('work',     'img_wifi',       'image',  '/assets/work-wifi-cobertura.webp',     'Trabajos — Cobertura WiFi',     4);

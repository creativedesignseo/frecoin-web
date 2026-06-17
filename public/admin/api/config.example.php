<?php
// FRECOIN Backoffice CMS — configuración del servidor.
//
// INSTALACIÓN:
// 1. Copiar este archivo a config.php EN EL SERVIDOR (mismo directorio).
// 2. Rellenar las credenciales de la base de datos MySQL del cliente
//    (hPanel → Bases de datos → MySQL → datos de conexión).
// 3. Generar el hash de la contraseña del primer super_admin con:
//      php -r "echo password_hash('TU_CLAVE', PASSWORD_BCRYPT, ['cost' => 12]).PHP_EOL;"
//    (o desde phpMyAdmin insertando el hash a mano en admin_users).
// 4. NUNCA commitear config.php — está en .gitignore. Repo PÚBLICO.

return [
    // --- Base de datos MySQL (Hostinger) ---
    'db' => [
        'host'    => 'localhost',
        'name'    => 'REEMPLAZAR_nombre_db',     // p.ej. u949041093_frecoin
        'user'    => 'REEMPLAZAR_usuario_db',    // p.ej. u949041093_admin
        'pass'    => 'REEMPLAZAR_password_db',
        'charset' => 'utf8mb4',
    ],

    // --- Bootstrap del primer super_admin (solo si la tabla admin_users está vacía) ---
    // Tras el primer login se vuelve inerte. Email normalizado a minúsculas.
    'bootstrap' => [
        'email'         => 'admin@frecoin.es',
        'password_hash' => '$2y$12$REEMPLAZAR_POR_HASH_BCRYPT_COST_12',
        'name'          => 'Administrador',
    ],

    // --- Seguridad ---
    'allowed_origin' => 'https://frecoin.es', // CORS estricto (same-origin)
    'session_name'   => 'frecoin_admin',
    'rate_limit'     => ['max_attempts' => 5, 'block_seconds' => 300],

    // --- Uploads ---
    'uploads_dir'  => __DIR__ . '/../../assets/uploads',   // disco (público)
    'uploads_url'  => '/assets/uploads',                   // URL pública
    'max_bytes'    => 5 * 1024 * 1024,                     // 5 MB
    'allowed_mime' => ['image/webp', 'image/jpeg', 'image/png'],

    // --- Snapshots públicos (regenerados al guardar) ---
    'snapshots_dir' => __DIR__ . '/../../assets',          // blog.json, services.json, content.json
];

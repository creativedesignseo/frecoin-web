<?php
// FRECOIN Backoffice CMS — conexión PDO a MySQL (singleton).
// No accesible directamente (lo protege .htaccess). Incluido desde bootstrap.php.

declare(strict_types=1);

/**
 * Devuelve la conexión PDO compartida. Lanza si config.php falta o la conexión
 * falla — el bootstrap traduce eso a un 503/500 JSON.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config_file = __DIR__ . '/config.php';
    if (!is_file($config_file)) {
        throw new RuntimeException('config.php missing');
    }
    $config = require $config_file;
    $db = $config['db'] ?? null;
    if (!is_array($db)) {
        throw new RuntimeException('db config missing');
    }

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $db['host'] ?? 'localhost',
        $db['name'] ?? '',
        $db['charset'] ?? 'utf8mb4'
    );

    $pdo = new PDO($dsn, $db['user'] ?? '', $db['pass'] ?? '', [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    return $pdo;
}

/** Carga y cachea el array de configuración completo. */
function config(): array
{
    static $config = null;
    if ($config === null) {
        $config_file = __DIR__ . '/config.php';
        if (!is_file($config_file)) {
            throw new RuntimeException('config.php missing');
        }
        $config = require $config_file;
    }
    return $config;
}

<?php
// FRECOIN Backoffice CMS — bootstrap común de la API.
// Cada endpoint hace: require __DIR__ . '/lib/bootstrap.php'; boot();
// No accesible directamente (lo protege .htaccess).

declare(strict_types=1);

require_once __DIR__ . '/../db.php';

/**
 * Inicializa el endpoint: cabeceras JSON + seguridad, CORS same-origin,
 * sesión endurecida y manejo de preflight OPTIONS.
 */
function boot(): void
{
    $cfg = config();

    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');

    $allowed = $cfg['allowed_origin'] ?? '';
    $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($allowed !== '' && $origin === $allowed) {
        header('Access-Control-Allow-Origin: ' . $allowed);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
        header('Vary: Origin');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    start_secure_session();
}

/** Sesión PHP endurecida (Secure + HttpOnly + SameSite=Strict). */
function start_secure_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $cfg = config();
    session_name($cfg['session_name'] ?? 'frecoin_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

// --------------------------------------------------------------------------
// Respuestas JSON
// --------------------------------------------------------------------------
function json_out($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function json_error(string $message, int $status = 400): void
{
    json_out(['error' => $message], $status);
}

/** Cuerpo JSON de la petición como array (o [] si vacío/ inválido). */
function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/** Exige uno de los métodos HTTP dados; 405 en caso contrario. */
function require_method(array $methods): string
{
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (!in_array($m, $methods, true)) {
        json_error('Method not allowed', 405);
    }
    return $m;
}

// --------------------------------------------------------------------------
// CSRF
// --------------------------------------------------------------------------
function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/** Verifica X-CSRF-Token en escrituras; 419 si falla. */
function require_csrf(): void
{
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $have = $_SESSION['csrf_token'] ?? '';
    if ($have === '' || !is_string($sent) || !hash_equals($have, $sent)) {
        json_error('CSRF token inválido. Recarga e inténtalo de nuevo.', 419);
    }
}

// --------------------------------------------------------------------------
// Autorización — revalida SIEMPRE contra la BD (no confía solo en la sesión)
// --------------------------------------------------------------------------
/**
 * Usuario autenticado actual releyendo role+active de la BD, o null.
 * Devolver el rol desde BD hace que desactivar a un usuario sea instantáneo.
 */
function current_user(): ?array
{
    $id = $_SESSION['admin_id'] ?? null;
    if (!$id) {
        return null;
    }
    $stmt = db()->prepare('SELECT id, email, role, name, active FROM admin_users WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    if (!$user || (int) $user['active'] !== 1) {
        return null;
    }
    return $user;
}

/**
 * Exige sesión válida (y rol concreto si se pasa). 401 sin sesión,
 * 403 si el rol no alcanza. Devuelve el usuario.
 */
function require_role(?string $needed = null): array
{
    $user = current_user();
    if (!$user) {
        json_error('No autenticado', 401);
    }
    if ($needed === 'super_admin' && $user['role'] !== 'super_admin') {
        json_error('Solo el super administrador puede hacer esto', 403);
    }
    return $user;
}

// --------------------------------------------------------------------------
// Utilidades
// --------------------------------------------------------------------------
function slugify(string $str): string
{
    $str = strtolower(trim($str));
    $str = preg_replace('/[^a-z0-9]+/', '-', $str) ?? '';
    return trim($str, '-');
}

<?php
// FRECOIN Backoffice CMS — cuenta propia (self-service).
//   PUT /admin/api/account.php { current_password, new_password } → cambiar MI contraseña
//
// Disponible para CUALQUIER usuario autenticado (admin o super_admin): cada uno
// puede cambiar su propia contraseña verificando primero la actual.

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

$me = require_role();              // cualquier sesión válida (401 si no hay)
require_method(['PUT']);
require_csrf();

$body    = read_json_body();
$current = $body['current_password'] ?? null;
$next    = $body['new_password'] ?? null;

if (!is_string($current) || $current === '' || !is_string($next) || $next === '') {
    json_error('La contraseña actual y la nueva son obligatorias', 400);
}
if (strlen($next) < 8) {
    json_error('La nueva contraseña debe tener al menos 8 caracteres', 400);
}
if ($next === $current) {
    json_error('La nueva contraseña debe ser distinta de la actual', 400);
}

try {
    $stmt = db()->prepare('SELECT password_hash FROM admin_users WHERE id = ? LIMIT 1');
    $stmt->execute([(int) $me['id']]);
    $row = $stmt->fetch();
    if (!$row || !password_verify($current, $row['password_hash'])) {
        json_error('La contraseña actual no es correcta', 403);
    }

    $hash = password_hash($next, PASSWORD_BCRYPT, ['cost' => 12]);
    db()->prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?')
        ->execute([$hash, (int) $me['id']]);

    json_out(['ok' => true]);
} catch (Throwable $e) {
    error_log('account.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

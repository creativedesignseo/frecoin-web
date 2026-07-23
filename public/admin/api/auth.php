<?php
// FRECOIN Backoffice CMS — autenticación.
//   POST   /admin/api/auth.php  { email, password }  → login
//   GET    /admin/api/auth.php                        → whoami (revalida en BD)
//   DELETE /admin/api/auth.php                         → logout
//
// Sesión PHP + cookie HttpOnly + CSRF (no JWT: panel y API son same-origin).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

$method = require_method(['GET', 'POST', 'DELETE']);

// ---- LOGOUT ----------------------------------------------------------------
if ($method === 'DELETE') {
    $_SESSION = [];
    session_destroy();
    json_out(['ok' => true]);
}

// ---- WHOAMI ----------------------------------------------------------------
if ($method === 'GET') {
    $user = current_user();
    if (!$user) {
        json_error('No autenticado', 401);
    }
    json_out([
        'user' => [
            'id'    => (int) $user['id'],
            'email' => $user['email'],
            'role'  => $user['role'],
            'name'  => $user['name'],
        ],
        'csrf' => csrf_token(),
    ]);
}

// ---- LOGIN -----------------------------------------------------------------
$cfg   = config();
$limit = $cfg['rate_limit'] ?? ['max_attempts' => 5, 'block_seconds' => 300];
$maxAttempts  = (int) ($limit['max_attempts'] ?? 5);
$blockSeconds = (int) ($limit['block_seconds'] ?? 300);
$now   = time();
$ip    = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
// Hash bcrypt señuelo (no es de ninguna cuenta): se verifica cuando el email no
// existe para igualar el tiempo de respuesta y evitar enumeración de usuarios.
$dummyHash = '$2b$12$BjzazjywLYww3NLxRRFElOdtf4xNocPX8xL1kQB9ObNVi0UvDLILe';

// Rate limiting PERSISTENTE por IP en BD: no depende de la cookie de sesión (que se
// podía omitir para saltarse el bloqueo). REMOTE_ADDR es la IP real del cliente (verificado).
if ($ip !== '') {
    $bstmt = db()->prepare('SELECT blocked_until FROM login_attempts WHERE ip = ? LIMIT 1');
    $bstmt->execute([$ip]);
    $brow = $bstmt->fetch();
    if ($brow && $brow['blocked_until'] !== null && strtotime((string) $brow['blocked_until']) > $now) {
        $wait = (int) ceil((strtotime((string) $brow['blocked_until']) - $now) / 60);
        json_error("Demasiados intentos. Espera {$wait} minuto(s).", 429);
    }
}

$body     = read_json_body();
$rawEmail = $body['email'] ?? null;
$password = $body['password'] ?? null;

if (!is_string($rawEmail) || trim($rawEmail) === '' || !is_string($password) || $password === '') {
    json_error('Email y contraseña son obligatorios', 400);
}
$email = strtolower(trim($rawEmail));

$register_failure = function () use ($ip, $now, $maxAttempts, $blockSeconds) {
    if ($ip === '') return;
    db()->prepare('INSERT INTO login_attempts (ip, attempts) VALUES (?, 1)
                   ON DUPLICATE KEY UPDATE attempts = attempts + 1')->execute([$ip]);
    $s = db()->prepare('SELECT attempts FROM login_attempts WHERE ip = ?');
    $s->execute([$ip]);
    $att = (int) ($s->fetch()['attempts'] ?? 0);
    if ($att >= $maxAttempts) {
        db()->prepare('UPDATE login_attempts SET attempts = 0, blocked_until = ? WHERE ip = ?')
            ->execute([date('Y-m-d H:i:s', $now + $blockSeconds), $ip]);
    }
};

$establish = function (array $user) use ($ip) {
    // Fija la sesión a este usuario y rota el id de sesión (anti fixation).
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $user['id'];
    if ($ip !== '') db()->prepare('DELETE FROM login_attempts WHERE ip = ?')->execute([$ip]);
    db()->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')->execute([(int) $user['id']]);
    json_out([
        'user' => [
            'id'    => (int) $user['id'],
            'email' => $user['email'],
            'role'  => $user['role'],
            'name'  => $user['name'],
        ],
        'csrf' => csrf_token(),
    ]);
};

// 1) Usuario existente y activo.
$stmt = db()->prepare('SELECT id, email, password_hash, role, name FROM admin_users WHERE email = ? AND active = 1 LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
    if (password_verify($password, $user['password_hash'])) {
        $establish($user);
    }
    $register_failure();
    json_error('Email o contraseña incorrectos', 401);
}

// 2) Bootstrap del primer super_admin (solo si la tabla está vacía).
$count = (int) db()->query('SELECT COUNT(*) AS c FROM admin_users')->fetch()['c'];
$boot  = $cfg['bootstrap'] ?? [];
$bootEmail = strtolower(trim($boot['email'] ?? ''));
$bootHash  = $boot['password_hash'] ?? '';

if ($count === 0 && $bootEmail !== '' && $email === $bootEmail && $bootHash !== '' && password_verify($password, $bootHash)) {
    $ins = db()->prepare(
        'INSERT INTO admin_users (email, password_hash, role, name, active) VALUES (?, ?, "super_admin", ?, 1)'
    );
    $ins->execute([$bootEmail, $bootHash, $boot['name'] ?? 'Administrador']);
    $newId = (int) db()->lastInsertId();
    $establish([
        'id'    => $newId,
        'email' => $bootEmail,
        'role'  => 'super_admin',
        'name'  => $boot['name'] ?? 'Administrador',
    ]);
}

// Email inexistente: verify contra el hash señuelo para igualar el tiempo antes del 401.
password_verify($password, $dummyHash);
$register_failure();
json_error('Email o contraseña incorrectos', 401);

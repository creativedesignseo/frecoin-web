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
$now   = time();

// Rate limiting por sesión (mismo patrón que el panel PHP previo).
if (!empty($_SESSION['login_block_until']) && $now < $_SESSION['login_block_until']) {
    $wait = (int) ceil(($_SESSION['login_block_until'] - $now) / 60);
    json_error("Demasiados intentos. Espera {$wait} minuto(s).", 429);
}

$body     = read_json_body();
$rawEmail = $body['email'] ?? null;
$password = $body['password'] ?? null;

if (!is_string($rawEmail) || trim($rawEmail) === '' || !is_string($password) || $password === '') {
    json_error('Email y contraseña son obligatorios', 400);
}
$email = strtolower(trim($rawEmail));

$register_failure = function () use ($now, $limit) {
    $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
    if ($_SESSION['login_attempts'] >= ($limit['max_attempts'] ?? 5)) {
        $_SESSION['login_block_until'] = $now + ($limit['block_seconds'] ?? 300);
        $_SESSION['login_attempts']    = 0;
    }
};

$establish = function (array $user) use ($now) {
    // Fija la sesión a este usuario y rota el id de sesión (anti fixation).
    session_regenerate_id(true);
    $_SESSION['admin_id']       = (int) $user['id'];
    $_SESSION['login_attempts'] = 0;
    unset($_SESSION['login_block_until']);
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

$register_failure();
json_error('Email o contraseña incorrectos', 401);

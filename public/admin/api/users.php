<?php
// FRECOIN Backoffice CMS — gestión de usuarios del panel (SOLO super_admin).
//   GET    /admin/api/users.php            → lista de usuarios
//   POST   /admin/api/users.php            → crear { email, name, role, password }
//   PUT    /admin/api/users.php?id=NN      → actualizar { name?, role?, active?, new_password? }
//   DELETE /admin/api/users.php?id=NN      → eliminar usuario
//
// Solo el super_admin gestiona usuarios y roles. Guardas anti-lockout: nadie
// puede degradarse/desactivarse a sí mismo ni dejar el sistema sin ningún
// super_admin activo. Nunca se devuelve el password_hash.

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

$me     = require_role('super_admin');                 // 403 si no es super_admin
$method = require_method(['GET', 'POST', 'PUT', 'DELETE']);
$id     = isset($_GET['id']) ? (int) $_GET['id'] : 0;

const ROLES = ['admin', 'super_admin'];

/** Nº de super_admins activos, excluyendo opcionalmente un id. */
function active_super_admins(int $exceptId = 0): int
{
    $stmt = db()->prepare(
        'SELECT COUNT(*) AS c FROM admin_users WHERE role = "super_admin" AND active = 1 AND id <> ?'
    );
    $stmt->execute([$exceptId]);
    return (int) $stmt->fetch()['c'];
}

/** Forma pública de un usuario (sin password_hash). */
function user_public(array $u): array
{
    return [
        'id'         => (int) $u['id'],
        'email'      => $u['email'],
        'name'       => $u['name'],
        'role'       => $u['role'],
        'active'     => (int) $u['active'],
        'last_login' => $u['last_login'],
        'created_at' => $u['created_at'],
    ];
}

function fetch_user(int $id): ?array
{
    $s = db()->prepare(
        'SELECT id, email, name, role, active, last_login, created_at FROM admin_users WHERE id = ? LIMIT 1'
    );
    $s->execute([$id]);
    $u = $s->fetch();
    return $u ?: null;
}

try {
    // ---- LISTA -------------------------------------------------------------
    if ($method === 'GET') {
        $rows = db()->query(
            'SELECT id, email, name, role, active, last_login, created_at
             FROM admin_users ORDER BY created_at ASC, id ASC'
        )->fetchAll();
        json_out(['users' => array_map('user_public', $rows)]);
    }

    // ---- CREAR -------------------------------------------------------------
    if ($method === 'POST') {
        require_csrf();
        $body  = read_json_body();
        $email = strtolower(trim((string) ($body['email'] ?? '')));
        $name  = trim((string) ($body['name'] ?? ''));
        $role  = (string) ($body['role'] ?? 'admin');
        $pass  = (string) ($body['password'] ?? '');

        if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) json_error('Email no válido', 400);
        if (!in_array($role, ROLES, true)) json_error('Rol no válido', 400);
        if (strlen($pass) < 8) json_error('La contraseña debe tener al menos 8 caracteres', 400);

        $chk = db()->prepare('SELECT id FROM admin_users WHERE email = ? LIMIT 1');
        $chk->execute([$email]);
        if ($chk->fetch()) json_error('Ya existe un usuario con ese email', 409);

        $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
        try {
            db()->prepare('INSERT INTO admin_users (email, password_hash, role, name, active) VALUES (?, ?, ?, ?, 1)')
                ->execute([$email, $hash, $role, $name !== '' ? $name : null]);
        } catch (PDOException $e) {
            // Carrera con la clave única de email: devolver 409 en vez de un 500 opaco.
            if ((int) ($e->errorInfo[1] ?? 0) === 1062) json_error('Ya existe un usuario con ese email', 409);
            throw $e;
        }

        $created = fetch_user((int) db()->lastInsertId());
        json_out(['ok' => true, 'user' => $created ? user_public($created) : null], 201);
    }

    // ---- ACTUALIZAR --------------------------------------------------------
    if ($method === 'PUT') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        $target = fetch_user($id);
        if (!$target) json_error('Usuario no encontrado', 404);
        $isSelf = ((int) $target['id'] === (int) $me['id']);

        $body = read_json_body();
        $sets = [];
        $vals = [];

        if (array_key_exists('name', $body)) {
            $name = trim((string) $body['name']);
            $sets[] = 'name = ?';
            $vals[] = $name !== '' ? $name : null;
        }

        if (array_key_exists('role', $body)) {
            $role = (string) $body['role'];
            if (!in_array($role, ROLES, true)) json_error('Rol no válido', 400);
            if ($isSelf && $role !== 'super_admin') {
                json_error('No puedes cambiar tu propio rol', 400);
            }
            if ($target['role'] === 'super_admin' && $role !== 'super_admin' && active_super_admins($id) === 0) {
                json_error('Debe quedar al menos un super administrador activo', 400);
            }
            $sets[] = 'role = ?';
            $vals[] = $role;
        }

        if (array_key_exists('active', $body)) {
            $active = $body['active'] ? 1 : 0;
            if ($isSelf && $active === 0) {
                json_error('No puedes desactivar tu propia cuenta', 400);
            }
            if ($active === 0 && $target['role'] === 'super_admin' && active_super_admins($id) === 0) {
                json_error('Debe quedar al menos un super administrador activo', 400);
            }
            $sets[] = 'active = ?';
            $vals[] = $active;
        }

        if (array_key_exists('new_password', $body) && $body['new_password'] !== null && $body['new_password'] !== '') {
            $np = (string) $body['new_password'];
            if (strlen($np) < 8) json_error('La contraseña debe tener al menos 8 caracteres', 400);
            $sets[] = 'password_hash = ?';
            $vals[] = password_hash($np, PASSWORD_BCRYPT, ['cost' => 12]);
        }

        if (!$sets) json_error('Nada que actualizar', 400);
        $vals[] = $id;
        db()->prepare('UPDATE admin_users SET ' . implode(', ', $sets) . ' WHERE id = ?')->execute($vals);

        $updated = fetch_user($id);
        json_out(['ok' => true, 'user' => $updated ? user_public($updated) : null]);
    }

    // ---- ELIMINAR ----------------------------------------------------------
    if ($method === 'DELETE') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        if ($id === (int) $me['id']) json_error('No puedes eliminar tu propia cuenta', 400);

        $target = fetch_user($id);
        if (!$target) json_error('Usuario no encontrado', 404);
        if ($target['role'] === 'super_admin' && active_super_admins($id) === 0) {
            json_error('Debe quedar al menos un super administrador activo', 400);
        }

        db()->prepare('DELETE FROM admin_users WHERE id = ?')->execute([$id]);
        json_out(['ok' => true]);
    }
} catch (Throwable $e) {
    error_log('users.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

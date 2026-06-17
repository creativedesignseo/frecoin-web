<?php
// FRECOIN Backoffice CMS — leads (mensajes de contacto).
//   GET    /admin/api/leads.php              → lista (opcional ?status=new|read|handled|spam)
//   GET    /admin/api/leads.php?id=NN        → un lead
//   PUT    /admin/api/leads.php?id=NN { status } → cambia solo el estado (whitelist)
//
// No hay POST (los leads los crea el formulario público send-form.php) ni DELETE
// (se conserva el histórico; marcar 'spam' en su lugar).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role(); // cualquier admin/super_admin activo
$method = require_method(['GET', 'PUT']);
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

$VALID_STATUS = ['new', 'read', 'handled', 'spam'];

try {
    if ($method === 'GET') {
        if ($id > 0) {
            $stmt = db()->prepare('SELECT * FROM contact_leads WHERE id = ? LIMIT 1');
            $stmt->execute([$id]);
            $lead = $stmt->fetch();
            if (!$lead) json_error('No encontrado', 404);
            json_out($lead);
        }

        $status = $_GET['status'] ?? '';
        if (in_array($status, $VALID_STATUS, true)) {
            $stmt = db()->prepare('SELECT * FROM contact_leads WHERE status = ? ORDER BY created_at DESC');
            $stmt->execute([$status]);
        } else {
            $stmt = db()->query('SELECT * FROM contact_leads ORDER BY created_at DESC');
        }
        $leads = $stmt->fetchAll();

        // Conteos por estado para los filtros del panel.
        $counts = ['new' => 0, 'read' => 0, 'handled' => 0, 'spam' => 0, 'total' => 0];
        foreach (db()->query('SELECT status, COUNT(*) c FROM contact_leads GROUP BY status') as $row) {
            $counts[$row['status']] = (int) $row['c'];
            $counts['total'] += (int) $row['c'];
        }
        json_out(['leads' => $leads, 'counts' => $counts]);
    }

    if ($method === 'PUT') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        $body = read_json_body();
        $status = $body['status'] ?? '';
        if (!in_array($status, $VALID_STATUS, true)) {
            json_error('Estado no válido', 400);
        }
        $stmt = db()->prepare('UPDATE contact_leads SET status = ? WHERE id = ?');
        $stmt->execute([$status, $id]);
        if ($stmt->rowCount() === 0) {
            // Puede que el estado ya fuera ese; confirmar que el lead existe.
            $chk = db()->prepare('SELECT id FROM contact_leads WHERE id = ? LIMIT 1');
            $chk->execute([$id]);
            if (!$chk->fetch()) json_error('No encontrado', 404);
        }
        json_out(['ok' => true, 'id' => $id, 'status' => $status]);
    }
} catch (Throwable $e) {
    error_log('leads.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

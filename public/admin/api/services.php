<?php
// FRECOIN Backoffice CMS — servicios + precios.
//   GET    /admin/api/services.php           → lista (ordenada por sort_order)
//   GET    /admin/api/services.php?id=NN      → un servicio
//   PUT    /admin/api/services.php?id=NN { ... } → actualiza campos editables (whitelist)
//
// v1: campos de texto clave + precio. Los bloques ricos (includes/FAQ/iconos)
// siguen en el código del front. Al guardar se regenera /assets/services.json
// (snapshot que el front público leerá; con fallback a services.ts).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role();
$method = require_method(['GET', 'PUT']);
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

// Campos que el panel puede editar (whitelist estricta — no se vuelca el body entero).
const EDITABLE = [
    'name', 'tagline', 'meta_title', 'meta_description',
    'hero_h1', 'hero_paragraph', 'hero_image', 'hero_image_alt',
    'benefits_image', 'benefits_image_alt',
    'price', 'price_unit', 'price_note',
    'active', 'sort_order',
];

function regenerate_snapshot(): void
{
    $cfg = config();
    $rows = db()->query(
        'SELECT slug, name, tagline, meta_title, meta_description, hero_h1, hero_paragraph,
                hero_image, hero_image_alt, benefits_image, benefits_image_alt,
                price, price_unit, price_note, active
         FROM services WHERE active = 1 ORDER BY sort_order ASC, id ASC'
    )->fetchAll();
    $dir = $cfg['snapshots_dir'] ?? (__DIR__ . '/../../assets');
    $path = rtrim($dir, '/') . '/services.json';
    $json = json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    $fp = fopen($path, 'c');
    if ($fp && flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $json !== false ? $json : '[]');
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}

try {
    if ($method === 'GET') {
        if ($id > 0) {
            $stmt = db()->prepare('SELECT * FROM services WHERE id = ? LIMIT 1');
            $stmt->execute([$id]);
            $svc = $stmt->fetch();
            if (!$svc) json_error('No encontrado', 404);
            json_out($svc);
        }
        $rows = db()->query('SELECT * FROM services ORDER BY sort_order ASC, id ASC')->fetchAll();
        json_out(['services' => $rows]);
    }

    if ($method === 'PUT') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        $body = read_json_body();

        $sets = [];
        $vals = [];
        foreach (EDITABLE as $field) {
            if (!array_key_exists($field, $body)) continue;
            $val = $body[$field];
            if ($field === 'price') {
                // Permitir null (sin precio) o decimal >= 0.
                if ($val === null || $val === '') { $val = null; }
                elseif (!is_numeric($val) || (float) $val < 0) { json_error('Precio no válido', 400); }
                else { $val = (float) $val; }
            } elseif ($field === 'active') {
                $val = $val ? 1 : 0;
            } elseif ($field === 'sort_order') {
                $val = (int) $val;
            } else {
                $val = trim((string) $val);
            }
            $sets[] = "$field = ?";
            $vals[] = $val;
        }
        if (!$sets) json_error('Nada que actualizar', 400);

        $vals[] = $id;
        $stmt = db()->prepare('UPDATE services SET ' . implode(', ', $sets) . ' WHERE id = ?');
        $stmt->execute($vals);

        $chk = db()->prepare('SELECT * FROM services WHERE id = ? LIMIT 1');
        $chk->execute([$id]);
        $svc = $chk->fetch();
        if (!$svc) json_error('No encontrado', 404);

        regenerate_snapshot(); // mantener el snapshot público al día
        json_out(['ok' => true, 'service' => $svc]);
    }
} catch (Throwable $e) {
    error_log('services.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

<?php
// FRECOIN Backoffice CMS — galería "Trabajos realizados" (multi-foto por área).
//   GET    /admin/api/gallery.php            → todos los items (para el panel)
//   POST   /admin/api/gallery.php            → añadir { area, image_url, title }
//   PUT    /admin/api/gallery.php?id=NN      → actualizar { title?, active?, sort_order? }
//   DELETE /admin/api/gallery.php?id=NN      → eliminar item
//
// A diferencia de la sección "work" de page_content (1 foto fija por área), aquí
// cada área ACUMULA N fotos. Al escribir se regenera /assets/work-gallery.json
// (snapshot público agrupado por área: { redes: [{url,title}], ... }).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role();
$method = require_method(['GET', 'POST', 'PUT', 'DELETE']);
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

// Áreas válidas (coinciden con los servicios de FRECOIN).
const AREAS = ['redes', 'electricas', 'camaras', 'wifi', 'sai', 'controles'];

function regenerate_gallery_snapshot(): void
{
    $cfg  = config();
    $rows = db()->query(
        'SELECT area, image_url, title FROM work_gallery
         WHERE active = 1 ORDER BY area ASC, sort_order ASC, id ASC'
    )->fetchAll();
    $grouped = [];
    foreach ($rows as $r) {
        $grouped[$r['area']][] = ['url' => $r['image_url'], 'title' => $r['title']];
    }
    $dir  = $cfg['snapshots_dir'] ?? (__DIR__ . '/../../assets');
    $path = rtrim($dir, '/') . '/work-gallery.json';
    $json = json_encode($grouped, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    $fp = fopen($path, 'c');
    if ($fp && flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $json !== false ? $json : '{}');
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}

function gallery_item(array $r): array
{
    return [
        'id'         => (int) $r['id'],
        'area'       => $r['area'],
        'image_url'  => $r['image_url'],
        'title'      => $r['title'],
        'active'     => (int) $r['active'],
        'sort_order' => (int) $r['sort_order'],
    ];
}

function fetch_gallery(int $id): ?array
{
    $s = db()->prepare('SELECT id, area, image_url, title, active, sort_order FROM work_gallery WHERE id = ? LIMIT 1');
    $s->execute([$id]);
    $r = $s->fetch();
    return $r ?: null;
}

try {
    if ($method === 'GET') {
        $rows = db()->query(
            'SELECT id, area, image_url, title, active, sort_order FROM work_gallery
             ORDER BY area ASC, sort_order ASC, id ASC'
        )->fetchAll();
        json_out(['items' => array_map('gallery_item', $rows)]);
    }

    if ($method === 'POST') {
        require_csrf();
        $body  = read_json_body();
        $area  = (string) ($body['area'] ?? '');
        $url   = trim((string) ($body['image_url'] ?? ''));
        $title = trim((string) ($body['title'] ?? ''));

        if (!in_array($area, AREAS, true)) json_error('Área no válida', 400);
        if ($url === '') json_error('Falta la imagen', 400);

        $s = db()->prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM work_gallery WHERE area = ?');
        $s->execute([$area]);
        $next = (int) $s->fetch()['n'];

        db()->prepare('INSERT INTO work_gallery (area, image_url, title, sort_order, active) VALUES (?, ?, ?, ?, 1)')
            ->execute([$area, $url, $title !== '' ? $title : null, $next]);
        // Capturar el id ANTES de cualquier otra consulta: regenerate_gallery_snapshot()
        // hace un SELECT que invalida lastInsertId() (devolvería 0).
        $newId = (int) db()->lastInsertId();

        regenerate_gallery_snapshot();

        $created = fetch_gallery($newId);
        json_out(['ok' => true, 'item' => $created ? gallery_item($created) : null], 201);
    }

    if ($method === 'PUT') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        if (!fetch_gallery($id)) json_error('No encontrado', 404);

        $body = read_json_body();
        $sets = [];
        $vals = [];
        if (array_key_exists('title', $body)) {
            $t = trim((string) $body['title']);
            $sets[] = 'title = ?';
            $vals[] = $t !== '' ? $t : null;
        }
        if (array_key_exists('active', $body)) {
            $sets[] = 'active = ?';
            $vals[] = $body['active'] ? 1 : 0;
        }
        if (array_key_exists('sort_order', $body)) {
            $sets[] = 'sort_order = ?';
            $vals[] = (int) $body['sort_order'];
        }
        if (!$sets) json_error('Nada que actualizar', 400);

        $vals[] = $id;
        db()->prepare('UPDATE work_gallery SET ' . implode(', ', $sets) . ' WHERE id = ?')->execute($vals);

        regenerate_gallery_snapshot();
        json_out(['ok' => true, 'item' => gallery_item(fetch_gallery($id))]);
    }

    if ($method === 'DELETE') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);
        db()->prepare('DELETE FROM work_gallery WHERE id = ?')->execute([$id]);
        regenerate_gallery_snapshot();
        json_out(['ok' => true]);
    }
} catch (Throwable $e) {
    error_log('gallery.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

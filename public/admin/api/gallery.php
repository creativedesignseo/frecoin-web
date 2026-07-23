<?php
// FRECOIN Backoffice CMS — galería "Trabajos realizados" (multi-foto por área).
//   GET    /admin/api/gallery.php                 → todos los items (para el panel)
//   POST   /admin/api/gallery.php                 → añadir { area, image_url, title, description }
//   PUT    /admin/api/gallery.php?id=NN           → actualizar { title?, description?, active?, sort_order? }
//   PUT    /admin/api/gallery.php?action=reorder  → reordenar un área { area, ids:[...] } (atómico)
//   DELETE /admin/api/gallery.php?id=NN           → eliminar item (y su archivo si es local y ya no se usa)
//
// Cada área ACUMULA N fotos. Al escribir se regenera /assets/work-gallery.json
// (agrupado por área: { redes: [{url,title,description}], ... }).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role();
$method = require_method(['GET', 'POST', 'PUT', 'DELETE']);
$id     = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$action = (string) ($_GET['action'] ?? '');

const AREAS = ['redes', 'electricas', 'camaras', 'wifi', 'sai', 'controles'];

/** Regenera el snapshot público. Lanza si no puede persistir (no silencia fallos). */
function regenerate_gallery_snapshot(): void
{
    $cfg  = config();
    $rows = db()->query(
        'SELECT area, image_url, title, description FROM work_gallery
         WHERE active = 1 ORDER BY area ASC, sort_order ASC, id ASC'
    )->fetchAll();
    $grouped = [];
    foreach ($rows as $r) {
        $grouped[$r['area']][] = [
            'url'         => $r['image_url'],
            'title'       => $r['title'],
            'description' => $r['description'],
        ];
    }
    $dir  = $cfg['snapshots_dir'] ?? (__DIR__ . '/../../assets');
    if (!is_dir($dir) && !@mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new RuntimeException('snapshots_dir no disponible: ' . $dir);
    }
    $path = rtrim($dir, '/') . '/work-gallery.json';
    $json = json_encode($grouped, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($json === false) {
        throw new RuntimeException('json_encode falló: ' . json_last_error_msg());
    }
    $fp = fopen($path, 'c');
    if (!$fp || !flock($fp, LOCK_EX)) {
        if ($fp) fclose($fp);
        throw new RuntimeException('no se pudo abrir el snapshot para escritura: ' . $path);
    }
    ftruncate($fp, 0);
    rewind($fp);
    $ok = fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    if ($ok === false) {
        throw new RuntimeException('no se pudo escribir el snapshot: ' . $path);
    }
}

function gallery_item(array $r): array
{
    return [
        'id'          => (int) $r['id'],
        'area'        => $r['area'],
        'image_url'   => $r['image_url'],
        'title'       => $r['title'],
        'description' => $r['description'] ?? null,
        'active'      => (int) $r['active'],
        'sort_order'  => (int) $r['sort_order'],
    ];
}

function fetch_gallery(int $id): ?array
{
    $s = db()->prepare('SELECT id, area, image_url, title, description, active, sort_order FROM work_gallery WHERE id = ? LIMIT 1');
    $s->execute([$id]);
    $r = $s->fetch();
    return $r ?: null;
}

try {
    // ---- LISTA -------------------------------------------------------------
    if ($method === 'GET') {
        $rows = db()->query(
            'SELECT id, area, image_url, title, description, active, sort_order FROM work_gallery
             ORDER BY area ASC, sort_order ASC, id ASC'
        )->fetchAll();
        json_out(['items' => array_map('gallery_item', $rows)]);
    }

    // ---- AÑADIR ------------------------------------------------------------
    if ($method === 'POST') {
        require_csrf();
        $body  = read_json_body();
        $area  = (string) ($body['area'] ?? '');
        $url   = trim((string) ($body['image_url'] ?? ''));
        $title = trim((string) ($body['title'] ?? ''));
        $desc  = trim((string) ($body['description'] ?? ''));

        if (!in_array($area, AREAS, true)) json_error('Área no válida', 400);
        if ($url === '') json_error('Falta la imagen', 400);

        $s = db()->prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM work_gallery WHERE area = ?');
        $s->execute([$area]);
        $next = (int) $s->fetch()['n'];

        db()->prepare('INSERT INTO work_gallery (area, image_url, title, description, sort_order, active) VALUES (?, ?, ?, ?, ?, 1)')
            ->execute([$area, $url, $title !== '' ? $title : null, $desc !== '' ? $desc : null, $next]);
        // Capturar el id ANTES de cualquier otra consulta (el snapshot hace un SELECT).
        $newId = (int) db()->lastInsertId();

        regenerate_gallery_snapshot();

        $created = fetch_gallery($newId);
        json_out(['ok' => true, 'item' => $created ? gallery_item($created) : null], 201);
    }

    // ---- ACTUALIZAR / REORDENAR -------------------------------------------
    if ($method === 'PUT') {
        require_csrf();

        // Reordenar un área completa de forma atómica.
        if ($action === 'reorder') {
            $body = read_json_body();
            $area = (string) ($body['area'] ?? '');
            $ids  = $body['ids'] ?? null;
            if (!in_array($area, AREAS, true)) json_error('Área no válida', 400);
            if (!is_array($ids)) json_error('ids requerido', 400);

            $pdo = db();
            $pdo->beginTransaction();
            try {
                $upd = $pdo->prepare('UPDATE work_gallery SET sort_order = ? WHERE id = ? AND area = ?');
                $i = 1;
                foreach ($ids as $gid) {
                    $upd->execute([$i, (int) $gid, $area]);
                    $i++;
                }
                $pdo->commit();
            } catch (Throwable $e) {
                $pdo->rollBack();
                throw $e;
            }
            regenerate_gallery_snapshot();
            json_out(['ok' => true]);
        }

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
        if (array_key_exists('description', $body)) {
            $d = trim((string) $body['description']);
            $sets[] = 'description = ?';
            $vals[] = $d !== '' ? $d : null;
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
        $updated = fetch_gallery($id);
        json_out(['ok' => true, 'item' => $updated ? gallery_item($updated) : null]);
    }

    // ---- ELIMINAR ----------------------------------------------------------
    if ($method === 'DELETE') {
        require_csrf();
        if ($id <= 0) json_error('id requerido', 400);

        $target = fetch_gallery($id);
        db()->prepare('DELETE FROM work_gallery WHERE id = ?')->execute([$id]);

        // Limpieza: si la imagen es local (subida) y ya no la referencia ninguna fila,
        // borrar el archivo del disco y su fila en media (evita fugas de espacio).
        if ($target && is_string($target['image_url']) && strpos($target['image_url'], '/assets/uploads/') === 0) {
            $still = db()->prepare('SELECT COUNT(*) AS c FROM work_gallery WHERE image_url = ?');
            $still->execute([$target['image_url']]);
            if ((int) $still->fetch()['c'] === 0) {
                $docroot = realpath(__DIR__ . '/../../');
                $path = $docroot ? $docroot . $target['image_url'] : '';
                if ($path !== '' && is_file($path)) @unlink($path);
                db()->prepare('DELETE FROM media WHERE url = ?')->execute([$target['image_url']]);
            }
        }

        regenerate_gallery_snapshot();
        json_out(['ok' => true]);
    }
} catch (Throwable $e) {
    error_log('gallery.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

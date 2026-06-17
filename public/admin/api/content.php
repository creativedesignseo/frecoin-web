<?php
// FRECOIN Backoffice CMS — contenidos editables de páginas (textos + imágenes).
//   GET /admin/api/content.php            → todas las filas (para el panel)
//   GET /admin/api/content.php?section=work → filas de una sección
//   PUT /admin/api/content.php { items: [{ section, content_key, value }] } → upsert
//
// El catálogo de claves es fijo (sembrado en schema.sql); aquí solo se editan
// valores. Al guardar se regenera /assets/content.json (snapshot público
// agrupado por sección: { work: { img_redes: "url", ... }, hero: {...} }).

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role();
$method = require_method(['GET', 'PUT']);

function regenerate_content_snapshot(): void
{
    $cfg = config();
    $rows = db()->query('SELECT section, content_key, value FROM page_content')->fetchAll();
    $grouped = [];
    foreach ($rows as $r) {
        $grouped[$r['section']][$r['content_key']] = $r['value'];
    }
    $dir = $cfg['snapshots_dir'] ?? (__DIR__ . '/../../assets');
    $path = rtrim($dir, '/') . '/content.json';
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

try {
    if ($method === 'GET') {
        $section = $_GET['section'] ?? '';
        if ($section !== '') {
            $stmt = db()->prepare('SELECT section, content_key, value_type, value, label, sort_order FROM page_content WHERE section = ? ORDER BY sort_order ASC, id ASC');
            $stmt->execute([$section]);
        } else {
            $stmt = db()->query('SELECT section, content_key, value_type, value, label, sort_order FROM page_content ORDER BY section ASC, sort_order ASC, id ASC');
        }
        json_out(['items' => $stmt->fetchAll()]);
    }

    if ($method === 'PUT') {
        require_csrf();
        $body = read_json_body();
        $items = $body['items'] ?? null;
        if (!is_array($items) || !$items) json_error('Nada que actualizar', 400);

        $upd = db()->prepare('UPDATE page_content SET value = ? WHERE section = ? AND content_key = ?');
        $pdo = db();
        $pdo->beginTransaction();
        try {
            foreach ($items as $it) {
                $section = trim((string) ($it['section'] ?? ''));
                $key = trim((string) ($it['content_key'] ?? ''));
                $value = (string) ($it['value'] ?? '');
                if ($section === '' || $key === '') continue;
                $upd->execute([$value, $section, $key]);
            }
            $pdo->commit();
        } catch (Throwable $e) {
            $pdo->rollBack();
            throw $e;
        }

        regenerate_content_snapshot();
        json_out(['ok' => true]);
    }
} catch (Throwable $e) {
    error_log('content.php: ' . $e->getMessage());
    json_error('Error del servidor', 500);
}

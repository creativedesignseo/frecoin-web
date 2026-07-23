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
    // Excluir la sección 'work' (obsoleta: la galería de Trabajos vive en work_gallery /
    // work-gallery.json; estas filas ya no las consume nadie).
    $rows = db()->query("SELECT section, content_key, value FROM page_content WHERE section <> 'work'")->fetchAll();
    $grouped = [];
    foreach ($rows as $r) {
        $grouped[$r['section']][$r['content_key']] = $r['value'];
    }
    $dir = $cfg['snapshots_dir'] ?? (__DIR__ . '/../../assets');
    if (!is_dir($dir) && !@mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new RuntimeException('snapshots_dir no disponible: ' . $dir);
    }
    $path = rtrim($dir, '/') . '/content.json';
    $json = json_encode($grouped, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($json === false) {
        throw new RuntimeException('json_encode falló: ' . json_last_error_msg());
    }
    // No silenciar fallos de escritura: si no se persiste, que el PUT devuelva 500
    // (antes respondía ok:true aunque el snapshot no se escribiera).
    $fp = fopen($path, 'c');
    if (!$fp || !flock($fp, LOCK_EX)) {
        if ($fp) fclose($fp);
        throw new RuntimeException('no se pudo abrir content.json para escritura: ' . $path);
    }
    ftruncate($fp, 0);
    rewind($fp);
    $ok = fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    if ($ok === false) {
        throw new RuntimeException('no se pudo escribir content.json: ' . $path);
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

<?php
// FRECOIN Backoffice CMS — subida de imágenes al servidor (no Cloudinary).
//   POST /admin/api/upload.php { imageBase64, folder } → { url, publicId }
//
// Recibe un data URL base64 (el panel comprime a WebP en el navegador antes de
// enviar). Valida el MIME real del binario, tamaño y guarda en /assets/uploads/.

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
boot();

require_role();
require_method(['POST']);
require_csrf();

try {
    $cfg = config();
    $body = read_json_body();
    $dataUrl = $body['imageBase64'] ?? '';
    $folder = strtolower(preg_replace('/[^a-z0-9_-]/i', '', (string) ($body['folder'] ?? 'general')) ?: 'general');

    if (!is_string($dataUrl) || !preg_match('#^data:(image/[a-z0-9.+-]+);base64,#i', $dataUrl, $m)) {
        json_error('Imagen no válida', 400);
    }

    $max = $cfg['max_bytes'] ?? (5 * 1024 * 1024);
    // Rechazar por longitud del base64 ANTES de decodificar: evita materializar en
    // memoria payloads enormes solo para descartarlos después.
    $b64 = substr($dataUrl, strlen($m[0]));
    if (strlen($b64) > (int) ($max * 4 / 3) + 1024) {
        json_error('La imagen supera el tamaño máximo (5 MB)', 400);
    }

    $bin = base64_decode($b64, true);
    if ($bin === false) json_error('Codificación de imagen inválida', 400);
    if (strlen($bin) > $max) json_error('La imagen supera el tamaño máximo (5 MB)', 400);

    // MIME real del binario (ignora lo que diga el data URL).
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->buffer($bin);
    $allowed = $cfg['allowed_mime'] ?? ['image/webp', 'image/jpeg', 'image/png'];
    if (!in_array($mime, $allowed, true)) {
        json_error('Tipo de archivo no permitido. Solo JPG, PNG o WebP.', 400);
    }
    $ext = ['image/webp' => 'webp', 'image/jpeg' => 'jpg', 'image/png' => 'png'][$mime];

    $dir = rtrim($cfg['uploads_dir'] ?? (__DIR__ . '/../../assets/uploads'), '/') . '/' . $folder;
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        json_error('No se pudo preparar la carpeta de subidas', 500);
    }

    // Nombre único sin depender de la hora (random hex).
    $filename = $folder . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
    $dest = $dir . '/' . $filename;
    if (file_put_contents($dest, $bin) === false) {
        json_error('No se pudo guardar la imagen', 500);
    }

    $url = rtrim($cfg['uploads_url'] ?? '/assets/uploads', '/') . '/' . $folder . '/' . $filename;

    // Registrar en media (best-effort: un fallo no impide devolver la URL).
    try {
        $user = current_user();
        $stmt = db()->prepare(
            'INSERT INTO media (url, filename, mime, bytes, folder, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$url, $filename, $mime, strlen($bin), $folder, $user['id'] ?? null]);
    } catch (Throwable $e) {
        error_log('upload.php media insert: ' . $e->getMessage());
    }

    json_out(['url' => $url, 'publicId' => $url]);
} catch (Throwable $e) {
    error_log('upload.php: ' . $e->getMessage());
    json_error('Error del servidor al subir la imagen', 500);
}

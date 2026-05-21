<?php
/**
 * Endpoint de formularios FRECOIN — usa mail() nativo de Hostinger.
 * Recibe POST con JSON {nombre, telefono, servicio?, mensaje, source}
 * Envía email a info@frecoin.es con BCC a info@adspubli.com (constancia interna).
 * Cuando info@frecoin.es esté activo, los correos llegan al cliente.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://frecoin.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Leer JSON body
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Sanitizar campos
$nombre   = trim((string) ($data['nombre']   ?? ''));
$telefono = trim((string) ($data['telefono'] ?? ''));
$servicio = trim((string) ($data['servicio'] ?? ''));
$mensaje  = trim((string) ($data['mensaje']  ?? ''));
$source   = trim((string) ($data['source']   ?? 'web'));

// Validación básica
if ($nombre === '' || $telefono === '' || $mensaje === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos obligatorios (nombre, telefono, mensaje)']);
    exit;
}

if (strlen($nombre) > 100 || strlen($telefono) > 30 || strlen($mensaje) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos demasiado largos']);
    exit;
}

// Anti-spam básico (honeypot silencioso)
if (preg_match('/(\[url=|\[link=|viagra|bitcoin|crypto|seo services)/i', $mensaje)) {
    // Devolvemos OK pero NO enviamos — el bot piensa que funcionó
    echo json_encode(['ok' => true]);
    exit;
}

// Construir email
$to      = 'info@frecoin.es';
$bcc     = 'info@adspubli.com'; // copia interna mientras info@ no esté operativo
$subject = '[FRECOIN Web] Nuevo formulario — ' . substr($nombre, 0, 50);

$body  = "Has recibido un nuevo formulario desde frecoin.es\n";
$body .= "Origen: $source\n";
$body .= "Fecha: " . date('d/m/Y H:i') . "\n";
$body .= str_repeat('-', 50) . "\n\n";
$body .= "Nombre:    $nombre\n";
$body .= "Teléfono:  $telefono\n";
if ($servicio !== '') {
    $body .= "Servicio:  $servicio\n";
}
$body .= "\nMensaje:\n$mensaje\n\n";
$body .= str_repeat('-', 50) . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'desconocida') . "\n";
$body .= "User-Agent: " . substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? 'desconocido'), 0, 200) . "\n";

$headers   = [];
$headers[] = 'From: FRECOIN Web <info@frecoin.es>';
$headers[] = 'Reply-To: ' . preg_replace('/[^a-zA-Z0-9\s]/', '', $nombre) . ' <info@frecoin.es>';
$headers[] = 'Bcc: ' . $bcc;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    error_log('FRECOIN form: mail() devolvió false');
    echo json_encode(['error' => 'No se pudo enviar el correo. Intenta por WhatsApp.']);
}

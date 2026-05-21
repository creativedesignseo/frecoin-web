<?php
/**
 * Endpoint de formularios FRECOIN — usa mail() nativo de Hostinger.
 *
 * Envía DOS emails HTML:
 *  1. Notificación interna → info@frecoin.es (+ BCC info@adspubli.com)
 *  2. Auto-respuesta al cliente → si proporcionó email
 *
 * Plantillas HTML en /email-templates/
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://frecoin.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Body
$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Sanitizar
$nombre   = trim((string) ($data['nombre']   ?? ''));
$telefono = trim((string) ($data['telefono'] ?? ''));
$email    = trim((string) ($data['email']    ?? ''));
$servicio = trim((string) ($data['servicio'] ?? ''));
$mensaje  = trim((string) ($data['mensaje']  ?? ''));
$source   = trim((string) ($data['source']   ?? 'web'));

// Validación
if ($nombre === '' || $telefono === '' || $mensaje === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}
if (strlen($nombre) > 100 || strlen($telefono) > 30 || strlen($mensaje) > 5000 || strlen($email) > 150) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos demasiado largos']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = ''; // email inválido → ignoramos, no rompemos
}

// Anti-spam básico (honeypot silencioso)
if (preg_match('/(\[url=|\[link=|viagra|bitcoin|crypto|seo services)/i', $mensaje)) {
    echo json_encode(['ok' => true]);
    exit;
}

$ip        = (string) ($_SERVER['REMOTE_ADDR'] ?? 'desconocida');
$userAgent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? 'desconocido'), 0, 200);

/* ============================================================
 *  EMAIL 1 — Notificación interna a FRECOIN
 * ============================================================ */
ob_start();
include __DIR__ . '/email-templates/notification-internal.html.php';
$htmlInternal = ob_get_clean();

$to1      = 'info@frecoin.es';
$bcc1     = 'info@adspubli.com';
$subject1 = '🔔 Nuevo lead: ' . $nombre . ($servicio !== '' ? " — $servicio" : '');

$replyTo1 = $email !== ''
    ? '"' . preg_replace('/[^a-zA-Z0-9\s]/', '', $nombre) . "\" <$email>"
    : 'FRECOIN Web <info@frecoin.es>';

$headers1   = [];
$headers1[] = 'From: FRECOIN Web <info@frecoin.es>';
$headers1[] = "Reply-To: $replyTo1";
$headers1[] = "Bcc: $bcc1";
$headers1[] = 'MIME-Version: 1.0';
$headers1[] = 'Content-Type: text/html; charset=UTF-8';
$headers1[] = 'Content-Transfer-Encoding: 8bit';
$headers1[] = 'X-Mailer: PHP/' . phpversion();

$sent1 = mail($to1, $subject1, $htmlInternal, implode("\r\n", $headers1));

/* ============================================================
 *  EMAIL 2 — Auto-respuesta al cliente (solo si tenemos email)
 * ============================================================ */
$sent2 = true;
if ($email !== '') {
    ob_start();
    include __DIR__ . '/email-templates/confirmation-customer.html.php';
    $htmlCustomer = ob_get_clean();

    $to2      = $email;
    $subject2 = 'Hemos recibido tu mensaje — FRECOIN';

    $headers2   = [];
    $headers2[] = 'From: FRECOIN <info@frecoin.es>';
    $headers2[] = 'Reply-To: FRECOIN <info@frecoin.es>';
    $headers2[] = 'MIME-Version: 1.0';
    $headers2[] = 'Content-Type: text/html; charset=UTF-8';
    $headers2[] = 'Content-Transfer-Encoding: 8bit';
    $headers2[] = 'X-Mailer: PHP/' . phpversion();
    $headers2[] = 'X-Auto-Response-Suppress: All'; // evita auto-replies automáticas

    $sent2 = mail($to2, $subject2, $htmlCustomer, implode("\r\n", $headers2));
}

// Respuesta
if ($sent1) {
    echo json_encode(['ok' => true, 'confirmation_sent' => $email !== '' && $sent2]);
} else {
    http_response_code(500);
    error_log('FRECOIN form: mail() interno devolvió false');
    echo json_encode(['error' => 'No se pudo enviar el correo. Llámanos por WhatsApp.']);
}

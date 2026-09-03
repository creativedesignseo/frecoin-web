<?php
/**
 * Sincroniza los campos SEO editables del CMS con la matriz on-page aprobada.
 *
 * Se ejecuta únicamente por CLI en Hostinger, desde el directorio public_html:
 *   php /ruta/temporal/sync-seo-cms.php /ruta/a/public_html
 *
 * No contiene secretos: usa el config.php ya existente en el servidor y
 * regenera assets/services.json desde la base de datos, igual que la API CMS.
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "CLI only\n");
    exit(1);
}

$root = rtrim($argv[1] ?? '', '/');
if ($root === '' || !is_dir($root . '/admin/api')) {
    fwrite(STDERR, "Uso: php sync-seo-cms.php /ruta/a/public_html\n");
    exit(1);
}

require $root . '/admin/api/db.php';

$updates = [
    'redes-informaticas' => [
        'meta_title' => 'Instalación de redes informáticas para empresas | FRECOIN',
        'meta_description' => 'Diseño, instalación y mantenimiento de redes informáticas y cableado estructurado para empresas en toda España. +20 años de experiencia.',
        'hero_h1' => 'Instalación de redes informáticas para empresas',
    ],
    'instalaciones-electricas' => [
        'meta_title' => 'Instalaciones eléctricas para empresas | FRECOIN',
        'meta_description' => 'Diseño y ejecución de instalaciones eléctricas para empresas en toda España: cableado, cuadros, protecciones, certificación y mantenimiento.',
        'hero_h1' => 'Instalaciones eléctricas para empresas',
    ],
    'camaras-videovigilancia' => [
        'meta_title' => 'Instalación de cámaras de seguridad para empresas | FRECOIN',
        'meta_description' => 'Instalación de cámaras de seguridad CCTV e IP para empresas, naves y comercios en toda España. Visión nocturna, acceso remoto y cumplimiento RGPD.',
        'hero_h1' => 'Instalación de cámaras de seguridad para empresas',
    ],
    'antenas-wifi' => [
        'meta_title' => 'Instalación de WiFi empresarial | FRECOIN',
        'meta_description' => 'Cobertura WiFi profesional para empresas, naves y locales en toda España. Antenas exteriores, puntos de acceso, redes mesh y soporte continuo.',
        'hero_h1' => 'WiFi empresarial para oficinas, naves y locales',
    ],
    'sai' => [
        'meta_title' => 'Sistemas SAI para empresas | FRECOIN',
        'meta_description' => 'Instalación de sistemas SAI/UPS para servidores y equipos críticos de empresa en toda España. Evita pérdidas de datos y paradas por cortes de luz.',
        'hero_h1' => 'Sistemas SAI para empresas: no pierdas dinero por un corte de luz.',
    ],
    'controles-de-acceso' => [
        'meta_title' => 'Control de accesos para empresas | FRECOIN',
        'meta_description' => 'Instalación de sistemas de control de acceso para empresas en toda España: tarjetas RFID, huella, código y app. Sin llaves físicas, todo trazado.',
        'hero_h1' => 'Control de accesos para empresas: adiós a las llaves perdidas.',
    ],
];

$pdo = db();
$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        'UPDATE services
         SET meta_title = :meta_title,
             meta_description = :meta_description,
             hero_h1 = :hero_h1
         WHERE slug = :slug'
    );
    foreach ($updates as $slug => $values) {
        $stmt->execute($values + ['slug' => $slug]);
        if ($stmt->rowCount() !== 1) {
            throw new RuntimeException("Servicio no actualizado: {$slug}");
        }
    }

    $rows = $pdo->query(
        'SELECT slug, name, tagline, meta_title, meta_description, hero_h1, hero_paragraph,
                hero_image, hero_image_alt, benefits_image, benefits_image_alt,
                price, price_unit, price_note, active
         FROM services WHERE active = 1 ORDER BY sort_order ASC, id ASC'
    )->fetchAll();
    $json = json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
    $snapshot = $root . '/assets/services.json';
    $temp = $snapshot . '.tmp';
    if (file_put_contents($temp, $json . PHP_EOL, LOCK_EX) === false || !rename($temp, $snapshot)) {
        throw new RuntimeException('No se pudo regenerar assets/services.json');
    }

    $pdo->commit();
    echo 'CMS_SEO_SYNCED ' . count($updates) . " services\n";
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    @unlink($root . '/assets/services.json.tmp');
    fwrite(STDERR, $e->getMessage() . "\n");
    exit(1);
}

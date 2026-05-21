<?php
/**
 * Plantilla HTML — Notificación interna minimalista a FRECOIN
 * Estilo: Stripe / Linear / Notion. Verde solo en el logo.
 *
 * Variables requeridas en scope:
 *   $nombre, $telefono, $email, $servicio, $mensaje, $source, $ip, $userAgent
 */
$telLink = 'tel:' . preg_replace('/[^+0-9]/', '', $telefono);
$waLink  = 'https://wa.me/' . preg_replace('/[^0-9]/', '', $telefono);
$fecha   = date('d/m/Y H:i');
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo lead — FRECOIN</title>
</head>
<body style="margin:0; padding:0; background-color:#FFFFFF; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#0A0A0A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF; padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Logo header -->
          <tr>
            <td style="padding:0 0 40px; text-align:left;">
              <img src="https://frecoin.es/assets/logo-frecoin-dark.png" alt="FRECOIN" width="120" style="display:block; max-width:120px; height:auto;" />
            </td>
          </tr>

          <!-- Eyebrow + título -->
          <tr>
            <td style="padding:0;">
              <p style="margin:0 0 12px; color:#6B7280; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">
                Nuevo lead desde frecoin.es
              </p>
              <h1 style="margin:0 0 8px; color:#0A0A0A; font-size:32px; font-weight:700; line-height:1.15; letter-spacing:-0.02em;">
                <?= htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') ?>
              </h1>
              <?php if ($servicio !== ''): ?>
              <p style="margin:0 0 32px; color:#374151; font-size:16px;">
                Interés: <strong style="color:#0A0A0A; font-weight:600;"><?= htmlspecialchars($servicio, ENT_QUOTES, 'UTF-8') ?></strong>
              </p>
              <?php else: ?>
              <p style="margin:0 0 32px;">&nbsp;</p>
              <?php endif; ?>
            </td>
          </tr>

          <!-- CTAs principales -->
          <tr>
            <td style="padding:0 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0A0A0A; border-radius:6px;">
                    <a href="<?= htmlspecialchars($telLink, ENT_QUOTES, 'UTF-8') ?>" style="display:inline-block; padding:12px 22px; color:#FFFFFF; font-size:14px; font-weight:500; text-decoration:none; letter-spacing:-0.01em;">
                      Llamar ahora
                    </a>
                  </td>
                  <td style="width:8px;">&nbsp;</td>
                  <td style="background-color:#FFFFFF; border:1px solid #D1D5DB; border-radius:6px;">
                    <a href="<?= htmlspecialchars($waLink, ENT_QUOTES, 'UTF-8') ?>" style="display:inline-block; padding:11px 21px; color:#0A0A0A; font-size:14px; font-weight:500; text-decoration:none; letter-spacing:-0.01em;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="padding:8px 0; border-top:1px solid #E5E7EB;">&nbsp;</td>
          </tr>

          <!-- Datos del lead -->
          <tr>
            <td style="padding:8px 0 32px;">
              <p style="margin:0 0 16px; color:#6B7280; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">
                Datos de contacto
              </p>

              <!-- Teléfono -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 2px; color:#6B7280; font-size:13px;">Teléfono</p>
                    <p style="margin:0; color:#0A0A0A; font-size:16px; font-weight:500;">
                      <a href="<?= htmlspecialchars($telLink, ENT_QUOTES, 'UTF-8') ?>" style="color:#0A0A0A; text-decoration:none; border-bottom:1px solid #D1D5DB;"><?= htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8') ?></a>
                    </p>
                  </td>
                </tr>
                <?php if ($email !== ''): ?>
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 2px; color:#6B7280; font-size:13px;">Email</p>
                    <p style="margin:0; color:#0A0A0A; font-size:15px;">
                      <a href="mailto:<?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>" style="color:#0A0A0A; text-decoration:none; border-bottom:1px solid #D1D5DB;"><?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?></a>
                    </p>
                  </td>
                </tr>
                <?php endif; ?>
              </table>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="padding:8px 0; border-top:1px solid #E5E7EB;">&nbsp;</td>
          </tr>

          <!-- Mensaje -->
          <tr>
            <td style="padding:8px 0 40px;">
              <p style="margin:0 0 12px; color:#6B7280; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">
                Mensaje
              </p>
              <p style="margin:0; color:#374151; font-size:15px; line-height:1.7; white-space:pre-wrap;"><?= nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8')) ?></p>
            </td>
          </tr>

          <!-- Footer minimal -->
          <tr>
            <td style="padding:24px 0 0; border-top:1px solid #E5E7EB;">
              <p style="margin:0; color:#9CA3AF; font-size:12px; line-height:1.6;">
                Recibido el <?= $fecha ?> &nbsp;·&nbsp; Origen: <?= htmlspecialchars($source, ENT_QUOTES, 'UTF-8') ?> &nbsp;·&nbsp; IP: <?= htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') ?>
              </p>
              <p style="margin:12px 0 0; color:#9CA3AF; font-size:11px; line-height:1.5;">
                Notificación automática desde <a href="https://frecoin.es" style="color:#6B7280; text-decoration:none; border-bottom:1px solid #D1D5DB;">frecoin.es</a>. Responde directamente a este email para contactar al cliente.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

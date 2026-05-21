<?php
/**
 * Plantilla HTML — Notificación interna a FRECOIN
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
<body style="margin:0; padding:0; background-color:#F5F5F5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F5F5; padding:30px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

          <!-- Header verde -->
          <tr>
            <td style="background-color:#22C55E; padding:32px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 8px; color:rgba(255,255,255,0.85); font-size:12px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase;">
                      🔔 Nuevo lead desde frecoin.es
                    </p>
                    <h1 style="margin:0; color:#FFFFFF; font-size:24px; font-weight:800; line-height:1.2; letter-spacing:-0.02em;">
                      <?= htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') ?>
                    </h1>
                    <?php if ($servicio !== ''): ?>
                    <p style="margin:8px 0 0; color:rgba(255,255,255,0.95); font-size:14px; font-weight:500;">
                      Interés: <strong><?= htmlspecialchars($servicio, ENT_QUOTES, 'UTF-8') ?></strong>
                    </p>
                    <?php endif; ?>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTAs principales -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-block;">
                      <tr>
                        <td style="background-color:#22C55E; border-radius:8px; padding:0;">
                          <a href="<?= htmlspecialchars($telLink, ENT_QUOTES, 'UTF-8') ?>" style="display:inline-block; padding:14px 24px; color:#FFFFFF; font-size:14px; font-weight:600; text-decoration:none;">
                            📞 LLAMAR AHORA
                          </a>
                        </td>
                        <td style="width:10px;">&nbsp;</td>
                        <td style="background-color:#FFFFFF; border:1.5px solid #22C55E; border-radius:8px; padding:0;">
                          <a href="<?= htmlspecialchars($waLink, ENT_QUOTES, 'UTF-8') ?>" style="display:inline-block; padding:12.5px 22px; color:#22C55E; font-size:14px; font-weight:600; text-decoration:none;">
                            💬 WHATSAPP
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Datos del lead -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E5E5; border-radius:8px; overflow:hidden;">
                <tr>
                  <td style="padding:16px 18px; background-color:#FAFAFA; border-bottom:1px solid #E5E5E5;">
                    <p style="margin:0 0 4px; color:#737373; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;">Teléfono</p>
                    <p style="margin:0; color:#1A1A1A; font-size:16px; font-weight:600;">
                      <a href="<?= htmlspecialchars($telLink, ENT_QUOTES, 'UTF-8') ?>" style="color:#1A1A1A; text-decoration:none;"><?= htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8') ?></a>
                    </p>
                  </td>
                </tr>
                <?php if ($email !== ''): ?>
                <tr>
                  <td style="padding:16px 18px; background-color:#FFFFFF; border-bottom:1px solid #E5E5E5;">
                    <p style="margin:0 0 4px; color:#737373; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;">Email</p>
                    <p style="margin:0; color:#1A1A1A; font-size:15px;">
                      <a href="mailto:<?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>" style="color:#22C55E; text-decoration:none;"><?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?></a>
                    </p>
                  </td>
                </tr>
                <?php endif; ?>
                <tr>
                  <td style="padding:16px 18px; background-color:#FAFAFA;">
                    <p style="margin:0 0 6px; color:#737373; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;">Mensaje</p>
                    <p style="margin:0; color:#1A1A1A; font-size:14px; line-height:1.6; white-space:pre-wrap;"><?= nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8')) ?></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer metadata -->
          <tr>
            <td style="padding:20px 32px 28px;">
              <p style="margin:0; color:#A3A3A3; font-size:11px; line-height:1.6;">
                <strong style="color:#737373;">📅 Recibido:</strong> <?= $fecha ?> &nbsp;·&nbsp;
                <strong style="color:#737373;">📍 Origen:</strong> <?= htmlspecialchars($source, ENT_QUOTES, 'UTF-8') ?>
                <br />
                <strong style="color:#737373;">🌐 IP:</strong> <?= htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') ?>
              </p>
            </td>
          </tr>

          <!-- Branding footer -->
          <tr>
            <td style="background-color:#FAFAFA; padding:20px 32px; border-top:1px solid #E5E5E5; text-align:center;">
              <p style="margin:0; color:#737373; font-size:12px; line-height:1.5;">
                Notificación automática desde <a href="https://frecoin.es" style="color:#22C55E; text-decoration:none; font-weight:600;">frecoin.es</a><br />
                <span style="color:#A3A3A3; font-size:11px;">Responde directamente a este mensaje para contactar al cliente.</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

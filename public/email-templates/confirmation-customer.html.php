<?php
/**
 * Plantilla HTML — Auto-respuesta de confirmación al cliente
 * Variables requeridas en scope:
 *   $nombre, $telefono, $servicio, $mensaje
 */
$primerNombre = preg_split('/\s+/', trim($nombre))[0] ?? 'Hola';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hemos recibido tu mensaje — FRECOIN</title>
</head>
<body style="margin:0; padding:0; background-color:#F5F5F5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F5F5; padding:30px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

          <!-- Header con logo -->
          <tr>
            <td style="background-color:#1A1A1A; padding:32px; text-align:center;">
              <img src="https://frecoin.es/assets/logo-frecoin-light.png" alt="FRECOIN" width="160" style="display:inline-block; max-width:160px; height:auto;" />
            </td>
          </tr>

          <!-- Cuerpo principal -->
          <tr>
            <td style="padding:40px 32px 24px;">
              <p style="margin:0 0 16px; color:#22C55E; font-size:12px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase;">
                ✓ Mensaje recibido
              </p>
              <h1 style="margin:0 0 20px; color:#1A1A1A; font-size:28px; font-weight:800; line-height:1.2; letter-spacing:-0.02em;">
                Gracias, <?= htmlspecialchars($primerNombre, ENT_QUOTES, 'UTF-8') ?>.
              </h1>
              <p style="margin:0 0 16px; color:#525252; font-size:16px; line-height:1.7;">
                Hemos recibido tu consulta correctamente. <strong style="color:#1A1A1A;">Te contactaremos en menos de 24 horas</strong> para darte una respuesta personalizada.
              </p>
              <p style="margin:0 0 24px; color:#525252; font-size:16px; line-height:1.7;">
                Soy <strong style="color:#1A1A1A;">Luis Freire</strong>, fundador de FRECOIN. Si llamas, descuelgo yo. Si hay una incidencia, voy yo. Aquí no hay intermediarios.
              </p>
            </td>
          </tr>

          <!-- ¿Necesitas hablar ya? -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0FDF4; border-left:4px solid #22C55E; border-radius:8px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 12px; color:#1A1A1A; font-size:14px; font-weight:700;">
                      ¿Necesitas hablar ya mismo?
                    </p>
                    <p style="margin:0 0 16px; color:#525252; font-size:14px; line-height:1.6;">
                      Si tu consulta es urgente, puedes contactarme directamente:
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#22C55E; border-radius:8px;">
                          <a href="https://wa.me/34614134292" style="display:inline-block; padding:12px 22px; color:#FFFFFF; font-size:14px; font-weight:600; text-decoration:none;">
                            💬 WhatsApp
                          </a>
                        </td>
                        <td style="width:10px;">&nbsp;</td>
                        <td style="background-color:#FFFFFF; border:1.5px solid #22C55E; border-radius:8px;">
                          <a href="tel:+34614134292" style="display:inline-block; padding:10.5px 20px; color:#22C55E; font-size:14px; font-weight:600; text-decoration:none;">
                            📞 614 134 292
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Resumen de tu consulta -->
          <tr>
            <td style="padding:0 32px 24px;">
              <p style="margin:0 0 12px; color:#737373; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;">
                Resumen de tu mensaje
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E5E5; border-radius:8px;">
                <?php if ($servicio !== ''): ?>
                <tr>
                  <td style="padding:12px 18px; border-bottom:1px solid #E5E5E5;">
                    <span style="color:#737373; font-size:13px;">Servicio:</span>&nbsp;
                    <strong style="color:#1A1A1A; font-size:14px;"><?= htmlspecialchars($servicio, ENT_QUOTES, 'UTF-8') ?></strong>
                  </td>
                </tr>
                <?php endif; ?>
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0; color:#525252; font-size:14px; line-height:1.6; white-space:pre-wrap;"><?= nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8')) ?></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer con info FRECOIN -->
          <tr>
            <td style="background-color:#FAFAFA; padding:28px 32px; border-top:1px solid #E5E5E5; text-align:center;">
              <p style="margin:0 0 12px; color:#1A1A1A; font-size:13px; font-weight:700;">
                FRECOIN — Infraestructuras tecnológicas para empresas
              </p>
              <p style="margin:0 0 4px; color:#737373; font-size:12px; line-height:1.6;">
                Redes informáticas · Eléctricas · Cámaras · WiFi · SAI · Controles de acceso
              </p>
              <p style="margin:0 0 16px; color:#A3A3A3; font-size:11px; line-height:1.6;">
                Sant Vicenç dels Horts &nbsp;·&nbsp; +20 años de experiencia &nbsp;·&nbsp; <a href="https://frecoin.es" style="color:#22C55E; text-decoration:none; font-weight:600;">frecoin.es</a>
              </p>
              <p style="margin:0; color:#A3A3A3; font-size:10px; line-height:1.5;">
                Este es un mensaje automático. Si no enviaste esta consulta, puedes ignorarlo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

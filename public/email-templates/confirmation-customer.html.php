<?php
/**
 * Plantilla HTML — Auto-respuesta minimalista al cliente
 * Estilo: Stripe / Linear / Notion — blanco, negro, tipografía protagonista.
 * Verde sólo en el logo del header.
 *
 * Variables requeridas en scope:
 *   $nombre, $telefono, $email, $servicio, $mensaje
 */
$primerNombre = preg_split('/\s+/', trim($nombre))[0] ?? 'Hola';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hemos recibido tu mensaje — FRECOIN</title>
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
                Mensaje recibido
              </p>
              <h1 style="margin:0 0 24px; color:#0A0A0A; font-size:32px; font-weight:700; line-height:1.15; letter-spacing:-0.02em;">
                Gracias, <?= htmlspecialchars($primerNombre, ENT_QUOTES, 'UTF-8') ?>.
              </h1>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:0 0 32px;">
              <p style="margin:0 0 20px; color:#374151; font-size:16px; line-height:1.65;">
                Hemos recibido tu consulta. Te contactaremos en menos de 24 horas para darte una respuesta personalizada.
              </p>
              <p style="margin:0; color:#374151; font-size:16px; line-height:1.65;">
                Soy <strong style="color:#0A0A0A; font-weight:600;">Luis Freire</strong>, fundador de FRECOIN. Si llamas, descuelgo yo. Si hay una incidencia, voy yo. Aquí no hay intermediarios.
              </p>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="padding:8px 0; border-top:1px solid #E5E7EB;">&nbsp;</td>
          </tr>

          <!-- Contacto urgente -->
          <tr>
            <td style="padding:8px 0 32px;">
              <p style="margin:0 0 8px; color:#6B7280; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">
                Contacto urgente
              </p>
              <p style="margin:0 0 20px; color:#374151; font-size:15px; line-height:1.6;">
                Si tu consulta no puede esperar:
              </p>

              <!-- Botones negros minimalistas -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0A0A0A; border-radius:6px;">
                    <a href="https://wa.me/34614134292" style="display:inline-block; padding:12px 22px; color:#FFFFFF; font-size:14px; font-weight:500; text-decoration:none; letter-spacing:-0.01em;">
                      WhatsApp
                    </a>
                  </td>
                  <td style="width:8px;">&nbsp;</td>
                  <td style="background-color:#FFFFFF; border:1px solid #D1D5DB; border-radius:6px;">
                    <a href="tel:+34614134292" style="display:inline-block; padding:11px 21px; color:#0A0A0A; font-size:14px; font-weight:500; text-decoration:none; letter-spacing:-0.01em;">
                      614 134 292
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

          <!-- Resumen del mensaje -->
          <tr>
            <td style="padding:8px 0 40px;">
              <p style="margin:0 0 16px; color:#6B7280; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">
                Tu consulta
              </p>
              <?php if ($servicio !== ''): ?>
              <p style="margin:0 0 12px; color:#374151; font-size:14px; line-height:1.6;">
                <span style="color:#6B7280;">Servicio:</span>&nbsp;<strong style="color:#0A0A0A; font-weight:600;"><?= htmlspecialchars($servicio, ENT_QUOTES, 'UTF-8') ?></strong>
              </p>
              <?php endif; ?>
              <p style="margin:0; color:#374151; font-size:15px; line-height:1.7; white-space:pre-wrap;"><?= nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8')) ?></p>
            </td>
          </tr>

          <!-- Footer minimal -->
          <tr>
            <td style="padding:32px 0 0; border-top:1px solid #E5E7EB; text-align:left;">
              <p style="margin:0 0 4px; color:#0A0A0A; font-size:13px; font-weight:600;">
                FRECOIN
              </p>
              <p style="margin:0 0 4px; color:#6B7280; font-size:13px; line-height:1.6;">
                Infraestructuras tecnológicas para empresas
              </p>
              <p style="margin:0 0 20px; color:#6B7280; font-size:13px; line-height:1.6;">
                Sant Vicenç dels Horts &nbsp;·&nbsp; <a href="https://frecoin.es" style="color:#0A0A0A; text-decoration:none; border-bottom:1px solid #D1D5DB;">frecoin.es</a>
              </p>
              <p style="margin:0; color:#9CA3AF; font-size:11px; line-height:1.5;">
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

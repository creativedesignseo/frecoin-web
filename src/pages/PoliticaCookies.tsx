import LegalLayout from '@/components/LegalLayout';

/**
 * Política de Cookies — cumplimiento RGPD, LSSI-CE y Directiva ePrivacy.
 * Plantilla genérica con datos de FRECOIN.
 * Pendiente de revisión con el cliente cuando se integren herramientas
 * analíticas o de terceros adicionales.
 */
export default function PoliticaCookies() {
  return (
    <LegalLayout
      title="Política de Cookies"
      subtitle="Información sobre el uso de cookies en frecoin.es conforme a la normativa europea y española."
      lastUpdated="10 de mayo de 2026"
    >
      <div className="info-box">
        <p>
          Esta Política de Cookies forma parte del Aviso Legal y la Política de Privacidad de <a href="https://frecoin.es">frecoin.es</a>. Su finalidad es informar de manera clara y precisa sobre las cookies que utiliza este sitio web, conforme al artículo 22.2 de la <strong>Ley 34/2002 (LSSI-CE)</strong>, el <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y las directrices de la AEPD.
        </p>
      </div>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web instalan en el dispositivo (ordenador, tablet o móvil) del Usuario al visitarlos. Permiten al sitio recordar información sobre la visita, como el idioma preferido o la sesión, facilitando la navegación y haciéndola más útil.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>

      <h3>2.1. Según la entidad que las gestiona</h3>
      <ul>
        <li><strong>Cookies propias:</strong> son aquellas enviadas al equipo del Usuario desde un dominio gestionado por el propio titular del sitio web.</li>
        <li><strong>Cookies de terceros:</strong> son aquellas enviadas al equipo del Usuario desde un dominio gestionado por otra entidad que trata los datos obtenidos a través de las cookies.</li>
      </ul>

      <h3>2.2. Según su finalidad</h3>
      <ul>
        <li><strong>Cookies técnicas (necesarias):</strong> permiten al Usuario navegar por el sitio web y utilizar sus funcionalidades básicas. <em>No requieren consentimiento.</em></li>
        <li><strong>Cookies de preferencias:</strong> permiten recordar opciones del Usuario para personalizar la experiencia (idioma, región, etc.).</li>
        <li><strong>Cookies analíticas o de medición:</strong> permiten al titular el seguimiento y análisis estadístico del comportamiento de los usuarios para mejorar el sitio.</li>
        <li><strong>Cookies de marketing o publicidad:</strong> almacenan información del comportamiento del Usuario para mostrar publicidad relevante. <em>Actualmente no se utilizan.</em></li>
      </ul>

      <h3>2.3. Según su duración</h3>
      <ul>
        <li><strong>Cookies de sesión:</strong> se eliminan automáticamente al cerrar el navegador.</li>
        <li><strong>Cookies persistentes:</strong> se almacenan durante un período definido por el responsable.</li>
      </ul>

      <h2>3. Cookies utilizadas en este sitio</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>frecoin_cookie_consent</code></td>
            <td>Técnica · propia</td>
            <td>Almacenar la decisión del Usuario sobre el banner de cookies.</td>
            <td>12 meses</td>
          </tr>
          <tr>
            <td colSpan={4} style={{ fontStyle: 'italic', textAlign: 'center', color: '#666' }}>
              Cuando se incorporen herramientas adicionales (Google Analytics, Meta Pixel, etc.) se actualizará esta tabla con el detalle correspondiente.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>4. ¿Cómo gestionar las cookies?</h2>
      <p>
        El Usuario puede configurar, aceptar, rechazar o eliminar las cookies en cualquier momento desde el banner de cookies de este sitio web o desde las opciones de su navegador. A continuación facilitamos enlaces a las instrucciones de los navegadores más utilizados:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/proteccion-mejorada-contra-rastreo-en-firefox-deskt" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noopener noreferrer">Opera</a></li>
      </ul>

      <h2>5. Consecuencias de desactivar las cookies</h2>
      <p>
        El Usuario puede rechazar el uso de cookies. Sin embargo, debe tener en cuenta que algunas funcionalidades del sitio web podrían no estar disponibles o funcionar con normalidad si se rechazan las cookies técnicas necesarias.
      </p>

      <h2>6. Modificaciones</h2>
      <p>
        El titular podrá modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptarla a las instrucciones dictadas por la Agencia Española de Protección de Datos. Por ello, se aconseja a los Usuarios que la visiten periódicamente.
      </p>

      <div className="info-box">
        <p>
          Para cualquier consulta sobre esta Política de Cookies o el tratamiento de datos a través de cookies, puede contactar en <a href="mailto:info@frecoin.es">info@frecoin.es</a>. Consulte también nuestra <a href="/politica-privacidad">Política de Privacidad</a> y nuestro <a href="/aviso-legal">Aviso Legal</a>.
        </p>
      </div>
    </LegalLayout>
  );
}

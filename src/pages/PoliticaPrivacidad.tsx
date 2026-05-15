import LegalLayout from '@/components/LegalLayout';

/**
 * Política de Privacidad — cumplimiento RGPD (Reglamento UE 2016/679)
 * y LOPDGDD (Ley Orgánica 3/2018).
 * Plantilla genérica con datos de FRECOIN.
 * Pendiente de revisión por el cliente con su asesor legal.
 */
export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      subtitle="Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD."
      lastUpdated="10 de mayo de 2026"
    >
      <div className="info-box">
        <p>
          Esta Política de Privacidad describe cómo se recogen, usan y protegen los datos personales que el Usuario facilite a través del sitio web <a href="https://frecoin.es">frecoin.es</a>, en cumplimiento del <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la <strong>Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)</strong>.
        </p>
      </div>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Identidad:</strong> Luis Freire Camino (FRECOIN)</li>
        <li><strong>NIF:</strong> 48142086G</li>
        <li><strong>Dirección postal:</strong> C/ Balmes 33, 2º 4ª, 08620 Sant Vicenç dels Horts, Barcelona, España</li>
        <li><strong>Correo electrónico:</strong> <a href="mailto:info@frecoin.es">info@frecoin.es</a></li>
        <li><strong>Teléfono:</strong> <a href="tel:+34614134292">+34 614 134 292</a></li>
      </ul>

      <h2>2. Datos personales que recogemos</h2>
      <p>Recogemos únicamente los datos estrictamente necesarios para prestar nuestros servicios y atender las solicitudes del Usuario. En concreto:</p>

      <h3>2.1. Datos del formulario de contacto / presupuesto</h3>
      <ul>
        <li>Nombre completo</li>
        <li>Teléfono de contacto</li>
        <li>Servicio de interés</li>
        <li>Mensaje o descripción del proyecto</li>
        <li>Dirección de correo electrónico (si la facilita voluntariamente)</li>
      </ul>

      <h3>2.2. Datos de navegación</h3>
      <ul>
        <li>Dirección IP (anonimizada)</li>
        <li>Tipo y versión de navegador</li>
        <li>Sistema operativo</li>
        <li>Páginas visitadas y tiempo de permanencia</li>
        <li>Origen de la visita (referer)</li>
      </ul>
      <p>Estos datos se obtienen mediante cookies. Para más información, consulte nuestra <a href="/politica-cookies">Política de Cookies</a>.</p>

      <h2>3. Finalidades y base jurídica del tratamiento</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base jurídica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Atender solicitudes de presupuesto, dudas o información comercial</td>
            <td>Consentimiento del interesado (art. 6.1.a RGPD)</td>
          </tr>
          <tr>
            <td>Prestar los servicios técnicos contratados</td>
            <td>Ejecución de contrato (art. 6.1.b RGPD)</td>
          </tr>
          <tr>
            <td>Cumplir obligaciones fiscales y contables</td>
            <td>Obligación legal (art. 6.1.c RGPD)</td>
          </tr>
          <tr>
            <td>Análisis estadístico anónimo del uso del sitio web</td>
            <td>Interés legítimo (art. 6.1.f RGPD)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Plazo de conservación</h2>
      <p>Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recabados:</p>
      <ul>
        <li><strong>Solicitudes de información sin contratación posterior:</strong> hasta 12 meses desde la última comunicación.</li>
        <li><strong>Datos de clientes con servicios contratados:</strong> mientras dure la relación contractual y, posteriormente, durante los plazos legales establecidos para el cumplimiento de obligaciones fiscales y contables (mínimo 6 años conforme al artículo 30 del Código de Comercio).</li>
        <li><strong>Datos de navegación (cookies):</strong> según la duración indicada en la <a href="/politica-cookies">Política de Cookies</a>.</li>
      </ul>

      <h2>5. Destinatarios de los datos</h2>
      <p>Los datos personales <strong>no serán cedidos a terceros</strong>, salvo:</p>
      <ul>
        <li>Cuando exista obligación legal (Administración Tributaria, fuerzas y cuerpos de seguridad, jueces y tribunales).</li>
        <li>A proveedores que prestan servicios al titular (asesoría fiscal, hosting, herramientas analíticas), siempre con la firma del correspondiente contrato de encargo de tratamiento conforme al artículo 28 del RGPD.</li>
      </ul>
      <p>No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo (EEE).</p>

      <h2>6. Derechos del Usuario</h2>
      <p>Conforme al RGPD y la LOPDGDD, el Usuario puede ejercer en cualquier momento los siguientes derechos:</p>
      <ul>
        <li><strong>Derecho de acceso:</strong> conocer qué datos personales se tratan.</li>
        <li><strong>Derecho de rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Derecho de supresión ("derecho al olvido"):</strong> solicitar la eliminación de los datos.</li>
        <li><strong>Derecho de oposición:</strong> oponerse al tratamiento de los datos.</li>
        <li><strong>Derecho a la limitación del tratamiento:</strong> solicitar la suspensión del tratamiento en determinados supuestos.</li>
        <li><strong>Derecho a la portabilidad:</strong> recibir los datos en un formato estructurado y de uso común.</li>
        <li><strong>Derecho a no ser objeto de decisiones automatizadas.</strong></li>
        <li><strong>Derecho a retirar el consentimiento</strong> en cualquier momento.</li>
      </ul>
      <p>
        Para ejercer estos derechos, el Usuario puede dirigir una solicitud por escrito a <a href="mailto:info@frecoin.es">info@frecoin.es</a>, indicando "Protección de datos" en el asunto y aportando copia de un documento identificativo (DNI, NIE o pasaporte).
      </p>
      <p>
        Asimismo, el Usuario tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> si considera que el tratamiento de sus datos personales no se ajusta a la normativa: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>7. Medidas de seguridad</h2>
      <p>
        El titular adopta las medidas técnicas y organizativas adecuadas conforme al artículo 32 del RGPD para garantizar un nivel de seguridad apropiado al riesgo del tratamiento, incluyendo entre otras: cifrado en tránsito (HTTPS), control de accesos, copias de seguridad periódicas y limitación del acceso a los datos al personal estrictamente necesario.
      </p>

      <h2>8. Modificaciones</h2>
      <p>
        Esta Política de Privacidad podrá ser modificada en cualquier momento para adaptarla a cambios legislativos o a las prácticas del titular. Cualquier modificación será publicada con la fecha actualizada en esta misma página.
      </p>

      <div className="info-box">
        <p>
          Si tiene cualquier duda sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales, puede contactar en <a href="mailto:info@frecoin.es">info@frecoin.es</a>.
        </p>
      </div>
    </LegalLayout>
  );
}

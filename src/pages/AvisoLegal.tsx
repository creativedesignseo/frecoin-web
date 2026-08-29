import LegalLayout from '@/components/LegalLayout';

/**
 * Aviso Legal — cumplimiento LSSI-CE (Ley 34/2002).
 * Plantilla genérica con datos de FRECOIN.
 * Pendiente de revisión por el cliente con su asesor legal.
 */
export default function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso Legal"
      subtitle="Información legal del titular del sitio web conforme a la LSSI-CE."
      lastUpdated="10 de mayo de 2026"
      metaTitle="Aviso legal | FRECOIN"
      metaDescription="Datos identificativos del titular de frecoin.es y condiciones de uso del sitio web, conforme a la LSSI-CE (Ley 34/2002)."
      path="/aviso-legal"
    >
      <div className="info-box">
        <p>
          En cumplimiento con el artículo 10 de la <strong>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)</strong>, se informa a los usuarios de los siguientes datos identificativos del titular de este sitio web.
        </p>
      </div>

      <h2>1. Datos identificativos del titular</h2>
      <ul>
        <li><strong>Titular:</strong> Luis Freire Camino</li>
        <li><strong>Nombre comercial:</strong> FRECOIN</li>
        <li><strong>NIF:</strong> 48142086G</li>
        <li><strong>Domicilio fiscal:</strong> C/ Balmes 33, 2º 4ª, 08620 Sant Vicenç dels Horts, Barcelona, España</li>
        <li><strong>Correo electrónico de contacto:</strong> <a href="mailto:info@frecoin.es">info@frecoin.es</a></li>
        <li><strong>Teléfono:</strong> <a href="tel:+34614134292">+34 614 134 292</a></li>
        <li><strong>Sitio web:</strong> <a href="https://frecoin.es">https://frecoin.es</a></li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente Aviso Legal regula el uso del sitio web <a href="https://frecoin.es">frecoin.es</a> (en adelante, "el Sitio Web"), del que es titular Luis Freire Camino, con NIF 48142086G, en calidad de profesional autónomo dedicado a la prestación de servicios de instalaciones tecnológicas (redes informáticas, instalaciones eléctricas, sistemas de videovigilancia, redes WiFi, sistemas SAI y controles de acceso).
      </p>
      <p>
        La navegación por el Sitio Web atribuye la condición de Usuario e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal en la versión publicada en el momento del acceso.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El Usuario se compromete a utilizar el Sitio Web, sus contenidos y servicios de conformidad con la Ley, este Aviso Legal, las buenas costumbres y el orden público. Asimismo, se obliga a no utilizar el Sitio Web con fines o efectos ilícitos, contrarios a lo establecido en el presente Aviso Legal, lesivos de derechos e intereses de terceros, o que puedan dañar, inutilizar, sobrecargar o deteriorar el Sitio Web o impedir su normal utilización.
      </p>
      <p>El Usuario se obliga a no:</p>
      <ul>
        <li>Realizar actividades publicitarias o de explotación comercial no autorizadas a través del Sitio Web.</li>
        <li>Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico susceptible de provocar daños en el Sitio Web o en los sistemas de terceros.</li>
        <li>Intentar acceder, utilizar o manipular los datos del titular, terceros proveedores u otros usuarios.</li>
        <li>Reproducir, copiar, distribuir, comunicar públicamente, transformar o modificar los contenidos sin autorización del titular.</li>
      </ul>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio Web (textos, fotografías, gráficos, imágenes, iconos, código fuente, diseño, software y demás elementos) son titularidad de Luis Freire Camino o, en su caso, dispone de los derechos necesarios para su uso, y están protegidos por las normas nacionales e internacionales sobre propiedad intelectual e industrial.
      </p>
      <p>
        Queda expresamente prohibida la reproducción, distribución y comunicación pública, total o parcial, de los contenidos sin autorización expresa del titular. La marca <strong>FRECOIN</strong> y sus signos distintivos son propiedad de Luis Freire Camino y no podrán ser utilizados sin su consentimiento previo y por escrito.
      </p>

      <h2>5. Exclusión de garantías y responsabilidad</h2>
      <p>
        El titular no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web. Cuando ello sea razonablemente posible, advertirá previamente las interrupciones en el funcionamiento del mismo. El titular tampoco garantiza la utilidad del Sitio Web para la realización de ninguna actividad en concreto.
      </p>
      <p>
        El titular excluye, con toda la extensión permitida por el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o continuidad del Sitio Web, a la defraudación de la utilidad esperada, a la falta de veracidad o a la presencia de virus o programas maliciosos en los contenidos.
      </p>

      <h2>6. Enlaces a terceros</h2>
      <p>
        En el caso de que el Sitio Web contenga enlaces a otros sitios web, el titular no ejerce ningún control sobre dichos sitios y contenidos. En ningún caso asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad o validez constitucional de cualquier material o información contenida en ninguno de dichos hipervínculos.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        El titular se reserva el derecho a efectuar, sin previo aviso, las modificaciones que considere oportunas en el Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través del mismo, como la forma en la que estos aparezcan presentados o localizados.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        La relación entre el titular y el Usuario se regirá por la normativa española vigente. Para cualquier controversia que pudiera surgir, las partes, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a los Juzgados y Tribunales del domicilio del Usuario, salvo que la legislación aplicable disponga lo contrario.
      </p>

      <div className="info-box">
        <p>
          Para cualquier consulta relacionada con este Aviso Legal, puede contactar a través del correo <a href="mailto:info@frecoin.es">info@frecoin.es</a>.
        </p>
      </div>
    </LegalLayout>
  );
}

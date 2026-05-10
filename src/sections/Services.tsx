import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, Wifi, Plug, Camera, Antenna, BatteryCharging, Lock } from 'lucide-react';

const services = [
  {
    icon: Wifi,
    title: 'REDES INFORMÁTICAS',
    description: 'Montaje de redes informáticas eficientes y seguras, asegurando conectividad rápida y fiable para su empresa.',
    image: '/assets/service-installation.jpg',
    featured: true,
  },
  {
    icon: Plug,
    title: 'INSTALACIONES ELÉCTRICAS',
    description: 'Ejecución de instalaciones eléctricas seguras y eficientes, desde el cableado hasta los cuadros y sistemas de protección.',
    image: '/assets/service-repairs.jpg',
    featured: false,
  },
  {
    icon: Camera,
    title: 'CÁMARAS DE VIDEOVIGILANCIA',
    description: 'Montaje de sistemas de cámaras de seguridad para control y vigilancia eficaz de instalaciones.',
    image: '/assets/service-safety.jpg',
    featured: false,
  },
  {
    icon: Antenna,
    title: 'ANTENAS WIFI',
    description: 'Montaje de antenas WiFi para asegurar cobertura y conexión inalámbrica eficiente en toda su instalación.',
    image: '/assets/service-energy.jpg',
    featured: false,
  },
  {
    icon: BatteryCharging,
    title: 'SAI',
    description: 'Montaje de sistemas SAI para asegurar continuidad eléctrica y protección de equipos críticos.',
    image: '/assets/work-industrial.jpg',
    featured: false,
  },
  {
    icon: Lock,
    title: 'CONTROLES DE ACCESO',
    description: 'Instalación de sistemas de control de acceso para la seguridad y gestión de entradas en instalaciones.',
    image: '/assets/work-office.jpg',
    featured: false,
  },
];

export default function Services() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="servicios" className="relative py-[100px] lg:py-[120px] bg-gripz-cream overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
            NUESTROS SERVICIOS
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            SOLUCIONES INTEGRALES EN <span className="text-gripz-primary">INFRAESTRUCTURAS TECNOLÓGICAS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`section-card group relative bg-white border rounded-xl p-6 lg:p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-md cursor-pointer overflow-hidden ${service.featured ? 'border-gripz-primary/40 ring-1 ring-gripz-primary/20' : 'border-gripz-gray-200'}`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 bg-gripz-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Destacado
                </div>
              )}
              <service.icon size={36} className="text-gripz-primary mb-5" strokeWidth={2.2} />
              <h3 className="font-montserrat font-bold text-[17px] lg:text-[18px] text-gripz-black leading-tight mb-3">
                {service.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-gripz-gray-600 mb-4">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-gripz-black group-hover:text-gripz-primary transition-colors">
                Saber más <ArrowRight size={14} />
              </div>
              {/* Watermark del icono propio del servicio (sustituye la imagen del template) */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-500 pointer-events-none">
                <service.icon size={150} className="text-gripz-primary" strokeWidth={1.2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

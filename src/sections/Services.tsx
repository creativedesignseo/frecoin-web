import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics';

/**
 * Sección Servicios de la home.
 * Cada tarjeta enlaza a su landing dedicada en /servicios/[slug],
 * preparada para SEO y campañas de Google Ads / Meta Ads.
 */
export default function Services() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="servicios" className="relative py-[60px] sm:py-[80px] lg:py-[120px] bg-gripz-cream overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
              NUESTROS SERVICIOS
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            SOLUCIONES INTEGRALES EN INFRAESTRUCTURAS TECNOLÓGICAS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                to={`/servicios/${service.slug}`}
                key={service.slug}
                onClick={() => trackEvent('service_card_click', { service: service.slug, location: 'home' })}
                className={`section-card group relative bg-white border rounded-xl p-6 lg:p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-md overflow-hidden block ${
                  service.featured ? 'border-gripz-primary/40 ring-1 ring-gripz-primary/20' : 'border-gripz-gray-200'
                }`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-gripz-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Destacado
                  </div>
                )}
                <Icon size={36} className="text-gripz-primary mb-5" strokeWidth={2.2} />
                <h3 className="font-montserrat font-bold text-[17px] lg:text-[18px] text-gripz-black leading-tight mb-3 uppercase">
                  {service.name}
                </h3>
                <p className="text-[14px] leading-[1.65] text-gripz-gray-600 mb-4">
                  {service.heroParagraph}
                </p>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-gripz-black group-hover:text-gripz-primary transition-colors">
                  Saber más <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
                {/* Watermark del icono en la esquina */}
                <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-500 pointer-events-none">
                  <Icon size={150} className="text-gripz-primary" strokeWidth={1.2} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

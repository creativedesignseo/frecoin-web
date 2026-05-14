import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import FooterCTA from '@/sections/FooterCTA';
import { trackEvent } from '@/lib/analytics';
import type { ServiceData } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  service: ServiceData;
}

/**
 * Layout reutilizable para cada landing de servicio.
 * Optimizado para conversión y SEO local:
 *  - Hero con propuesta de valor clara + 2 CTAs visibles
 *  - "¿Qué incluye?" en grid escaneable
 *  - "¿Para quién?" segmentación clara
 *  - "¿Por qué nosotros?" con prueba social
 *  - Proceso de 4 pasos (genera confianza pre-compra)
 *  - FAQ con acordeón (responde objeciones)
 *  - CTA final destacado
 */
export default function ServiceLayout({ service }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = service.metaTitle;
  }, [service]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-fade', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      });
      gsap.fromTo('.section-fade', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
        scrollTrigger: { trigger: '.includes-section', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCTAClick = (location: string) => {
    trackEvent('service_cta_click', { service: service.slug, location });
  };

  const HeroIcon = service.icon;

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      <Navbar />

      {/* HERO ================================================================ */}
      <section className="relative bg-gripz-cream pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
        <div className="container-gripz relative z-[1]">
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" className="hero-fade flex items-center gap-2 text-[13px] text-gripz-gray-600 mb-6">
            <Link to="/" className="hover:text-gripz-primary transition-colors">Inicio</Link>
            <ChevronRight size={14} className="text-gripz-gray-400" />
            <Link to="/#servicios" className="hover:text-gripz-primary transition-colors">Servicios</Link>
            <ChevronRight size={14} className="text-gripz-gray-400" />
            <span className="text-gripz-black font-medium">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
            {/* Left: copy */}
            <div>
              {/* Eyebrow — estilo Apple: solo texto, sin fondo ni iconos */}
              <p className="hero-fade text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-6">
                {service.featured ? 'Servicio estrella' : service.tagline}
              </p>

              <h1 className="hero-fade font-montserrat font-extrabold text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-gripz-black mb-5">
                {service.heroH1}
              </h1>

              <p className="hero-fade text-[16px] lg:text-[17px] leading-[1.65] text-gripz-gray-600 max-w-xl mb-8">
                {service.heroParagraph}
              </p>

              <div className="hero-fade flex items-center gap-4 flex-wrap">
                <Link
                  to="/#contacto"
                  onClick={() => handleCTAClick('hero_presupuesto')}
                  className="btn-primary flex items-center gap-2"
                >
                  Solicitar presupuesto <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/34614134292?text=Hola,%20me%20interesa%20el%20servicio%20de%20%22"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { handleCTAClick('hero_whatsapp'); trackEvent('whatsapp_click', { location: 'service_hero', service: service.slug }); }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gripz-black hover:text-gripz-primary transition-colors"
                >
                  <Phone size={16} className="text-gripz-primary" />
                  +34 614 134 292
                </a>
              </div>
            </div>

            {/* Right: imagen */}
            <div className="hero-fade relative">
              <img
                src={service.heroImage}
                alt={service.heroImageAlt}
                className="w-full h-[340px] lg:h-[440px] object-cover rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]"
              />
              {/* Círculo decorativo retirado — no aportaba valor y cargaba el verde. */}
            </div>
          </div>
        </div>
      </section>

      {/* ¿QUÉ INCLUYE? ====================================================== */}
      {service.includes.length > 0 && (
        <section className="includes-section relative py-[80px] lg:py-[120px] bg-white">
          <div className="container-gripz">
            <div className="text-center mb-12 lg:mb-16">
              <div className="section-fade section-tag justify-center mb-4">
                <HeroIcon size={14} className="text-gripz-primary" strokeWidth={2.4} />
                ¿QUÉ INCLUYE?
              </div>
              <h2 className="section-fade font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-gripz-black">
                {service.includesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {service.includes.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="section-fade group bg-white border border-gripz-gray-200 rounded-xl p-6 lg:p-7 hover:border-gripz-primary/40 hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-full bg-gripz-primary/10 flex items-center justify-center mb-4 group-hover:bg-gripz-primary/20 transition-colors">
                      <Icon size={20} className="text-gripz-primary" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-montserrat font-bold text-[17px] text-gripz-black leading-tight mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-gripz-gray-600">{feat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ¿A QUIÉN VA DIRIGIDO? ============================================== */}
      {service.audience.length > 0 && (
        <section className="relative py-[80px] lg:py-[120px] bg-gripz-cream">
          <div className="container-gripz">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-gripz-black">
                {service.audienceTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {service.audience.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="bg-white rounded-xl p-6 lg:p-7 text-center hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-full bg-gripz-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={26} className="text-gripz-primary" strokeWidth={2} />
                    </div>
                    <h3 className="font-montserrat font-bold text-[15px] text-gripz-black mb-2">{a.name}</h3>
                    <p className="text-[13px] leading-[1.6] text-gripz-gray-600">{a.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BENEFICIOS ========================================================= */}
      {service.benefits.length > 0 && (
        <section className="relative py-[80px] lg:py-[120px] bg-white overflow-hidden">
          <div className="container-gripz">
            <div className="grid lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-center">
              <div className="relative">
                <img
                  src={service.benefitsImage}
                  alt={service.benefitsImageAlt}
                  className="w-full h-[380px] lg:h-[480px] object-cover rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]"
                />
              </div>

              <div>
                <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-gripz-black mb-8">
                  {service.benefitsTitle}
                </h2>
                <div className="flex flex-col gap-5">
                  {service.benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gripz-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={18} className="text-gripz-primary" strokeWidth={2.2} />
                        </div>
                        <div>
                          <h3 className="font-inter font-bold text-[15px] text-gripz-black mb-1">{b.title}</h3>
                          <p className="text-[14px] leading-[1.6] text-gripz-gray-600">{b.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROCESO DE TRABAJO ================================================= */}
      {service.process.length > 0 && (
        <section className="relative py-[80px] lg:py-[120px] bg-gripz-dark text-white overflow-hidden">
          {/* Patrón técnico sutil */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300C853' stroke-width='0.4' stroke-opacity='0.3'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container-gripz relative z-[1]">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] mb-3">
                {service.processTitle}
              </h2>
              <p className="text-[15px] text-gripz-gray-400 max-w-xl mx-auto">
                Un proceso sencillo y transparente. Sin sorpresas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {service.process.map((step) => (
                <div key={step.step} className="relative">
                  <div className="w-12 h-12 rounded-full bg-gripz-primary text-white font-montserrat font-extrabold text-[20px] flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-montserrat font-bold text-[18px] mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[14px] leading-[1.6] text-gripz-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ ================================================================ */}
      {service.faq.length > 0 && (
        <section className="relative py-[80px] lg:py-[120px] bg-white">
          <div className="container-gripz">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 lg:mb-14">
                <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-gripz-black mb-3">
                  {service.faqTitle}
                </h2>
                <p className="text-[15px] text-gripz-gray-600">
                  Las dudas más comunes que nos plantean los clientes.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {service.faq.map((item, i) => {
                  const isOpen = openFAQ === i;
                  return (
                    <div
                      key={i}
                      className={`border rounded-xl transition-all ${
                        isOpen ? 'border-gripz-primary/40 bg-gripz-cream' : 'border-gripz-gray-200 bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-4 px-5 lg:px-6 py-4 lg:py-5 text-left"
                      >
                        <span className="font-montserrat font-bold text-[15px] lg:text-[16px] text-gripz-black leading-tight">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-gripz-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                          <p className="text-[14px] lg:text-[15px] leading-[1.65] text-gripz-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL ========================================================== */}
      <section className="relative py-[80px] lg:py-[100px] bg-gripz-cream">
        <div className="container-gripz">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] text-gripz-black mb-4">
              {service.ctaTitle}
            </h2>
            <p className="text-[16px] leading-[1.65] text-gripz-gray-600 mb-8 max-w-xl mx-auto">
              {service.ctaSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#contacto"
                onClick={() => handleCTAClick('cta_final_presupuesto')}
                className="btn-primary flex items-center gap-2"
              >
                Solicitar presupuesto <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/34614134292"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleCTAClick('cta_final_whatsapp'); trackEvent('whatsapp_click', { location: 'service_cta_final', service: service.slug }); }}
                className="inline-flex items-center gap-2 border border-gripz-black text-gripz-black px-6 py-3.5 rounded text-sm font-semibold hover:bg-gripz-black hover:text-white transition-colors"
              >
                WhatsApp directo
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />

      {/* Schema.org Service (JSON-LD) ====================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'serviceType': service.name,
            'name': service.name,
            'description': service.metaDescription,
            'provider': {
              '@type': 'LocalBusiness',
              '@id': 'https://frecoin.es/#business',
              'name': 'FRECOIN',
            },
            'areaServed': [
              { '@type': 'City', 'name': 'Sant Vicenç dels Horts' },
              { '@type': 'City', 'name': 'Barcelona' },
            ],
            'url': `https://frecoin.es/servicios/${service.slug}`,
          }),
        }}
      />
    </div>
  );
}

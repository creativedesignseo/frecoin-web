import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Send, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' });
      gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' });
      gsap.fromTo('.hero-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1, delay: 0.1, ease: 'power2.out' });
      gsap.fromTo('.hero-form', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen w-full bg-white overflow-hidden pt-20">
      {/* Main Content */}
      <div className="container-gripz relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 items-center">
          {/* Left Column - Text */}
          <div className="relative z-10 max-w-xl">
            {/* Guarantee Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-gripz-primary/8 rounded-full px-4 py-1.5 mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[12px] font-semibold text-gripz-primary tracking-wide">+20 AÑOS DE EXPERIENCIA</span>
            </div>

            {/* Title */}
            <h1 className="hero-title font-montserrat font-extrabold text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] text-gripz-black mb-5">
              Infraestructuras<br />
              <span className="text-gripz-primary">tecnológicas</span><br />
              para empresas.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-[16px] leading-[1.65] text-gripz-gray-600 max-w-md mb-8">
              <strong className="text-gripz-black">"Tu satisfacción es mi prioridad laboral"</strong><br />
              Soluciones integrales en redes informáticas, instalaciones eléctricas, cámaras de seguridad, WiFi, SAI y controles de acceso en Sant Vicenç dels Horts y área metropolitana sur de Barcelona.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex items-center gap-4 flex-wrap">
              <a href="https://wa.me/34614134292" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="#contacto" className="flex items-center gap-2 text-sm font-semibold text-gripz-black hover:text-gripz-primary transition-colors">
                <Phone size={16} className="text-gripz-primary" />
                +34 614 134 292
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hero-image absolute right-0 top-20 w-full lg:w-[45%] h-[calc(100%-80px)]">
        <img
          src="/assets/hero-electrician.jpg"
          alt="Instalaciones tecnológicas Frecoin"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 w-[60px] h-[60px] bg-gripz-primary hidden lg:block" />
      </div>

      {/* Consultation Form */}
      <div className="hero-form relative z-10 container-gripz -mt-12 lg:-mt-16">
        <div
          className="rounded-t-xl p-6 lg:p-8"
          style={{
            backgroundColor: '#1A1A1A',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322C55E' stroke-width='0.5' stroke-opacity='0.12'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M0 40h40M40 0v40M40 40l20-20M40 40l20 20M40 40l-20 20M40 40l-20-20'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='80' cy='0' r='2'/%3E%3Ccircle cx='0' cy='80' r='2'/%3E%3Ccircle cx='80' cy='80' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <h3 className="text-white font-montserrat font-bold text-lg mb-5">SOLICITA TU PRESUPUESTO</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              trackEvent('form_submit', { form_id: 'presupuesto_hero', location: 'hero' });
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Nombre completo*" className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors" />
              <input type="tel" placeholder="Teléfono*" className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors" />
              <select className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors appearance-none" defaultValue="">
                <option value="" disabled>Selecciona un servicio*</option>
                <option value="redes" className="text-gripz-black">Redes Informáticas</option>
                <option value="electricas" className="text-gripz-black">Instalaciones Eléctricas</option>
                <option value="camaras" className="text-gripz-black">Cámaras de Videovigilancia</option>
                <option value="wifi" className="text-gripz-black">Antenas WiFi</option>
                <option value="sai" className="text-gripz-black">SAI</option>
                <option value="acceso" className="text-gripz-black">Controles de Acceso</option>
              </select>
            </div>
            <div className="flex gap-4">
              <textarea placeholder="¿Qué necesitas?*" rows={2} className="flex-1 bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors resize-none" />
              <button type="submit" className="w-14 h-14 rounded-full bg-gripz-primary flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)] flex-shrink-0">
                <Send size={20} className="text-white" />
              </button>
            </div>
            {/* Cláusula informativa RGPD/LSSI — obligatoria en cualquier formulario que recoja datos */}
            <label className="flex items-start gap-2 text-[11px] text-white/60 leading-[1.5] cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-gripz-primary flex-shrink-0" />
              <span>
                He leído y acepto la{' '}
                <Link to="/politica-privacidad" className="text-gripz-primary hover:underline">
                  Política de Privacidad
                </Link>. Tus datos serán tratados por Luis Freire Camino (FRECOIN) con la única finalidad de responder a tu consulta.
              </span>
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}

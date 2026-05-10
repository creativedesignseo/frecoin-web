import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

const legalLinks = [
  { label: 'Aviso Legal', to: '/aviso-legal' },
  { label: 'Política de Privacidad', to: '/politica-privacidad' },
  { label: 'Política de Cookies', to: '/politica-cookies' },
];

gsap.registerPlugin(ScrollTrigger);

export default function FooterCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-cta-title', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.footer-cta', start: 'top 80%', once: true },
      });
      gsap.fromTo('.footer-col', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
        scrollTrigger: { trigger: '.footer-content', start: 'top 90%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gripz-dark overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322C55E' stroke-width='0.3' stroke-opacity='0.2'%3E%3Cpath d='M0 40h40M40 0v40M40 40l20-20M40 40l20 20M40 40l-20 20M40 40l-20-20'/%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='80' cy='0' r='2'/%3E%3Ccircle cx='0' cy='80' r='2'/%3E%3Ccircle cx='80' cy='80' r='2'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="container-gripz relative z-[1] py-[100px] lg:py-[120px]">
        <div className="footer-cta text-center mb-16">
          <div className="section-tag justify-center mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
            CONTACTO
          </div>
          <h2 className="footer-cta-title font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-white mb-4">
            INSTALACIONES TECNOLÓGICAS A TU ALCANCE
          </h2>
          <p className="text-[15px] leading-[1.65] text-gripz-gray-400 max-w-xl mx-auto mb-8">
            Redes informáticas, instalaciones eléctricas, cámaras de seguridad, WiFi, SAI y controles de acceso. Servicio profesional en Sant Vicenç dels Horts y alrededores.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+34614134292" className="btn-primary shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center gap-2">
              <Phone size={16} /> LLAMAR AHORA
            </a>
            <a href="https://wa.me/34614134292" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white text-white px-6 py-3.5 rounded text-sm font-semibold hover:bg-white hover:text-gripz-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WHATSAPP
            </a>
          </div>
        </div>

        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 border-t border-white/10">
          <div className="footer-col">
            <img src="/assets/logo-frecoin-light.png" alt="frecoin comunicaciones" className="h-[40px] w-auto object-contain mb-4" />
            <p className="text-[14px] leading-[1.7] text-gripz-gray-400">
              Soluciones integrales en infraestructuras tecnológicas para empresas. Más de 20 años de experiencia en Sant Vicenç dels Horts y alrededores.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mb-4">SERVICIOS</h4>
            <ul className="flex flex-col gap-2.5">
              {['Redes Informáticas', 'Instalaciones Eléctricas', 'Cámaras de Seguridad', 'Antenas WiFi', 'SAI', 'Controles de Acceso'].map((link) => (
                <li key={link}><span className="text-[14px] text-gripz-gray-400 hover:text-gripz-primary transition-colors cursor-pointer">{link}</span></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mb-4">LEGAL</h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[14px] text-gripz-gray-400 hover:text-gripz-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mb-4">DATOS</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-[14px] text-gripz-gray-400">Luis Freire Camino</li>
              <li className="text-[14px] text-gripz-gray-400">NIF: 48142086G</li>
              <li className="text-[14px] text-gripz-gray-400">Sant Vicenç dels Horts, Barcelona</li>
              <li className="text-[14px] text-gripz-gray-400">lfreire@frecoin.es</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 mt-16 border-t border-white/10">
          <p className="text-[13px] text-gripz-gray-400 tracking-[0.02em]">
            &copy; 2026 FRECOIN. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}

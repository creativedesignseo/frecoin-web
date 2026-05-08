import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Redes informaticas de alta velocidad',
  'Instalaciones certificadas y seguras',
  'Servicio personalizado en Barcelona',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-img', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo('.about-badge', { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.5, delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo('.about-text > *', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre-nosotros" className="relative py-[100px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="grid lg:grid-cols-[45%_55%] gap-10 lg:gap-20 items-center">
          <div className="relative">
            <div className="about-img rounded-2xl overflow-hidden">
              <img src="/assets/about-electrician-1.jpg" alt="Instalaciones Frecoin" className="w-full h-[400px] object-cover" />
            </div>
            <div className="about-img rounded-2xl overflow-hidden mt-4 ml-10 w-[85%]">
              <img src="/assets/about-electrician-2.jpg" alt="Trabajos Frecoin" className="w-full h-[300px] object-cover" />
            </div>
            <div className="about-badge absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[120px] h-[120px]">
              <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin-slow_20s_linear_infinite]">
                <defs><path id="circlePath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
                <circle cx="60" cy="60" r="55" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="6 4" />
                <text fill="#22C55E" fontSize="11" fontWeight="600" letterSpacing="3"><textPath href="#circlePath">+20 ANOS DE EXPERIENCIA • +20 ANOS DE EXPERIENCIA •</textPath></text>
                <g transform="translate(48, 48)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></g>
              </svg>
            </div>
          </div>

          <div className="about-text">
            <div className="section-tag mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              SOBRE NOSOTROS
            </div>
            <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black mb-5">
              FRECOIN: <span className="text-gripz-primary">TECNOLOGIA</span> Y <span className="text-gripz-primary">CONFIANZA</span> DESDE 2004
            </h2>
            <p className="text-[15px] leading-[1.7] text-gripz-gray-600 mb-6">
              En FRECOIN llevamos mas de 20 anos ofreciendo soluciones integrales en infraestructuras tecnologicas para empresas. Nos especializamos en instalaciones de redes informaticas, sistemas electricos y SAI, garantizando infraestructuras seguras, eficientes y fiables.
            </p>
            <p className="text-[15px] leading-[1.7] text-gripz-gray-600 mb-6">
              Nuestra mision: asegurar la continuidad operativa de nuestros clientes con un servicio de alta calidad, adaptado a sus necesidades reales. Trabajamos en <strong>Sant Vicenc dels Horts</strong> y toda el area metropolitana sur de Barcelona.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gripz-primary/10 flex items-center justify-center">
                    <Check size={12} className="text-gripz-primary" />
                  </div>
                  <span className="text-[15px] font-medium text-gripz-black">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <a href="#contacto" className="btn-primary text-[13px] py-3 px-6">
                CONTACTAR <ArrowRight size={14} />
              </a>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gripz-gray-200 overflow-hidden">
                  <img src="/assets/about-electrician-1.jpg" alt="Luis Freire" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gripz-black">Luis Freire Camino</p>
                  <p className="text-[12px] text-gripz-gray-400">Fundador y director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Redes informáticas de alta velocidad',
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
    <section ref={sectionRef} id="sobre-nosotros" className="relative py-[60px] sm:py-[80px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="grid xl:grid-cols-[45%_55%] gap-10 xl:gap-20 items-center">
          <div className="relative">
            <div className="about-img rounded-2xl overflow-hidden">
              <img src="/assets/about-network-1.jpg" alt="Instalación de red informática profesional Frecoin" className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover" />
            </div>
            <div className="about-img rounded-2xl overflow-hidden mt-4 ml-6 sm:ml-10 w-[85%]">
              <img src="/assets/about-network-2.jpg" alt="Infraestructura tecnológica empresarial Frecoin" className="w-full h-[200px] sm:h-[260px] lg:h-[300px] object-cover" />
            </div>
            <div className="about-badge absolute top-1/2 right-2 sm:right-0 sm:translate-x-1/4 -translate-y-1/2 w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full animate-[spin-slow_20s_linear_infinite]">
                <defs><path id="circlePath" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
                <text fill="#22C55E" fontSize="9" fontWeight="700">
                  <textPath href="#circlePath" textLength="263.89" lengthAdjust="spacing">+20 AÑOS DE EXPERIENCIA  •  +20 AÑOS DE EXPERIENCIA  •</textPath>
                </text>
              </svg>
              <img src="/assets/icono-frecoin.svg" alt="FRECOIN" className="relative w-[34px] h-auto" />
            </div>
          </div>

          <div className="about-text">
            <div className="section-tag mb-4">
              SOBRE NOSOTROS
            </div>
            <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black mb-5">
              FRECOIN: TECNOLOGÍA Y CONFIANZA PARA TU EMPRESA
            </h2>
            <p className="text-[16px] leading-[1.7] text-gripz-gray-600 mb-6">
              FRECOIN está liderada por <strong>Luis Freire Camino</strong>, técnico con más de 20 años de experiencia en infraestructuras tecnológicas. Ofrecemos soluciones integrales en instalaciones de redes informáticas, sistemas eléctricos y SAI, garantizando infraestructuras seguras, eficientes y fiables.
            </p>
            <p className="text-[16px] leading-[1.7] text-gripz-gray-600 mb-6">
              Nuestra misión: asegurar la continuidad operativa de nuestros clientes con un servicio de alta calidad, adaptado a sus necesidades reales. Trabajamos en <strong>Sant Vicenç dels Horts</strong> y toda Barcelona.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={18} className="text-gripz-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-[16px] font-medium text-gripz-black">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <a href="#contacto" className="btn-primary text-[13px] py-3 px-6">
                CONTACTAR <ArrowRight size={14} />
              </a>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gripz-gray-200 overflow-hidden">
                  <img src="/assets/luis-avatar-v2.webp" alt="Luis Freire Camino" className="w-full h-full object-cover object-center" />
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

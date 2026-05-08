import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

const reasons = [
  {
    title: 'Experiencia y profesionalidad',
    description: 'Enfoque tecnico solido en cada instalacion, con mas de 20 anos de trayectoria en el sector.',
  },
  {
    title: 'Soluciones a medida',
    description: 'Adaptadas a las necesidades reales de cada cliente, sin soluciones genericas.',
  },
  {
    title: 'Fiabilidad y continuidad',
    description: 'Garantizando el correcto funcionamiento de sus sistemas las 24 horas del dia.',
  },
  {
    title: 'Atencion cercana y rapida',
    description: 'Respuesta eficaz ante cualquier incidencia. Su satisfaccion es nuestra prioridad.',
  },
  {
    title: 'Cumplimiento de normativa',
    description: 'Instalaciones seguras, duraderas y conformes con toda la legislacion vigente.',
  },
];

export default function WhyChooseUs() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative py-[100px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
            POR QUE ELEGIRNOS
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            DIFERENCIATE CON <span className="text-gripz-primary">FRECOIN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <div key={i} className="section-card flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gripz-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={20} className="text-gripz-primary" />
              </div>
              <div>
                <h3 className="font-inter font-bold text-[16px] text-gripz-black mb-1">{reason.title}</h3>
                <p className="text-[14px] leading-[1.6] text-gripz-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

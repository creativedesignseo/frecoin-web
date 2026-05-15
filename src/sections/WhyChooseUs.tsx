import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

const reasons = [
  {
    title: 'Experiencia y profesionalidad',
    description: 'Enfoque técnico sólido en cada instalación, con más de 20 años de trayectoria en el sector.',
  },
  {
    title: 'Soluciones a medida',
    description: 'Adaptadas a las necesidades reales de cada cliente, sin soluciones genéricas.',
  },
  {
    title: 'Fiabilidad y continuidad',
    description: 'Garantizando el correcto funcionamiento de sus sistemas las 24 horas del día.',
  },
  {
    title: 'Atención cercana y rápida',
    description: 'Respuesta eficaz ante cualquier incidencia. Su satisfacción es nuestra prioridad.',
  },
  {
    title: 'Cumplimiento de normativa',
    description: 'Instalaciones seguras, duraderas y conformes con toda la legislación vigente.',
  },
];

export default function WhyChooseUs() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative py-[60px] sm:py-[80px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
              POR QUÉ ELEGIRNOS
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            DIFERÉNCIATE CON FRECOIN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <div key={i} className="section-card flex items-start gap-3">
              <CheckCircle size={22} className="text-gripz-primary flex-shrink-0 mt-0.5" strokeWidth={2.2} />
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

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle2, Briefcase, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// NOTA: cifras pendientes de validación con Luis Freire.
// "+50 proyectos" es estimado conservador del plan; cuando confirme cifra real, ajustar.
const stats = [
  {
    icon: Award,
    value: 20,
    suffix: '+',
    label: 'Años de experiencia',
    sublabel: 'Desde 2004',
  },
  {
    icon: Briefcase,
    value: 50,
    suffix: '+',
    label: 'Proyectos realizados',
    sublabel: 'Empresas y particulares',
  },
  {
    icon: CheckCircle2,
    value: 6,
    suffix: '',
    label: 'Servicios técnicos',
    sublabel: 'Soluciones integrales',
  },
  {
    icon: Building2,
    value: 5,
    suffix: '',
    label: 'Sectores cubiertos',
    sublabel: 'Industrial, comercial, residencial',
  },
];

function CountUp({ end, suffix, trigger }: { end: number; suffix: string; trigger: HTMLElement | null }) {
  const [value, setValue] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!trigger || animatedRef.current) return;
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        animatedRef.current = true;
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => setValue(Math.round(obj.v)),
        });
      },
    });
    return () => { st.kill(); };
  }, [end, trigger]);

  return <>{value}{suffix}</>;
}

export default function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTrigger(sectionRef.current);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[60px] lg:py-[80px] bg-gripz-dark overflow-hidden border-y border-white/5"
    >
      {/* Sutil patrón técnico de fondo */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300C853' stroke-width='0.4' stroke-opacity='0.25'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-gripz relative z-[1]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:gap-5"
            >
              <stat.icon size={32} className="text-gripz-primary flex-shrink-0 mb-3 lg:mb-0 lg:mt-1" strokeWidth={2} />
              <div>
                <p className="font-montserrat font-extrabold text-[36px] lg:text-[44px] leading-none text-white mb-1 tracking-[-0.02em]">
                  <CountUp end={stat.value} suffix={stat.suffix} trigger={trigger} />
                </p>
                <p className="font-inter font-semibold text-[14px] text-white leading-tight">
                  {stat.label}
                </p>
                <p className="text-[12px] text-gripz-gray-400 mt-0.5">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from '@/hooks/useScrollReveal';

const logos = [
  'CORSCALE DATA CENTERS',
  'altafiber',
  'CORSCALE DATA CENTERS',
  'Aligned\nAdaptive Data Centers',
  'TS',
  'Las Vegas',
];

export default function ClientLogos() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative py-[60px] bg-gripz-cream overflow-hidden border-t border-b border-gripz-gray-200">

      <div className="container-gripz relative z-[1] overflow-hidden">
        <div className="flex items-center gap-0">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="section-card flex-shrink-0 px-10 lg:px-16 py-4 border-r border-gripz-gray-200 last:border-r-0"
            >
              <span className="text-[14px] lg:text-[16px] font-semibold text-gripz-gray-800 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-default select-none">
                {name.split('\n')[0]}
                {name.includes('\n') && (
                  <>
                    <br />
                    <span className="text-[10px] font-normal">{name.split('\n')[1]}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

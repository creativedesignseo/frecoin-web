import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import FooterCTA from '@/sections/FooterCTA';

gsap.registerPlugin(ScrollTrigger);

/**
 * Página dedicada "Sobre nosotros" — Historia FRECOIN + bio del fundador (Luis Freire).
 * El contenido es provisional hasta que Luis nos pase su versión definitiva.
 */
export default function SobreNosotros() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-in').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* HERO ============================================================== */}
      <header className="pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 bg-gripz-cream border-b border-gripz-gray-200">
        <div className="container-gripz">
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" className="flex items-center gap-2 text-[13px] text-gripz-gray-600 mb-6 sm:mb-8">
            <Link to="/" className="hover:text-gripz-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} className="text-gripz-gray-400" />
            <span className="text-gripz-black font-medium">Sobre nosotros</span>
          </nav>

          <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-4 sm:mb-5">
            Conócenos
          </p>
          <h1 className="font-montserrat font-extrabold text-[32px] sm:text-[44px] lg:text-[64px] leading-[1.05] sm:leading-[1] tracking-[-0.03em] text-gripz-black mb-5 sm:mb-6 max-w-3xl">
            Tecnología cercana<br className="hidden sm:block" /> <span className="sm:hidden">para empresas del sur de Barcelona.</span><span className="hidden sm:inline">para empresas del sur<br />de Barcelona.</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] leading-[1.65] text-gripz-gray-600 max-w-2xl">
            Más de 20 años cuidando la infraestructura tecnológica de las pymes de Sant Vicenç dels Horts y el área metropolitana. Sin oficina física, sin call centers, sin intermediarios. Te atiende quien hace el trabajo.
          </p>
        </div>
      </header>

      {/* QUIÉN ESTÁ DETRÁS ================================================== */}
      <section className="py-[60px] sm:py-[80px] lg:py-[120px] bg-white">
        <div className="container-gripz">
          <div className="grid lg:grid-cols-[42%_58%] gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center max-w-6xl mx-auto">
            <div className="fade-in relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/assets/luis-fundador.webp"
                  alt="Luis Freire Camino — fundador de FRECOIN"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[500px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <p className="text-[11px] sm:text-[12px] text-gripz-gray-400 uppercase tracking-wider mb-0.5">Fundador y director técnico</p>
                <p className="text-[14px] sm:text-[16px] font-semibold text-gripz-black">Luis Freire Camino</p>
              </div>
            </div>

            <div className="fade-in">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-5">
                Quién está detrás
              </p>
              <h2 className="font-montserrat font-extrabold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.02em] text-gripz-black mb-6">
                Más de 20 años haciendo lo mismo que el primer día.
              </h2>
              <blockquote className="border-l-4 border-gripz-primary pl-5 mb-6">
                <p className="text-[18px] leading-[1.6] text-gripz-black font-medium italic">
                  "Tu satisfacción es mi prioridad laboral."
                </p>
              </blockquote>
              <div className="space-y-5 text-[15px] leading-[1.75] text-gripz-gray-600">
                <p>
                  Me llamo <strong className="text-gripz-black">Luis Freire Camino</strong> y fundé FRECOIN en 2004 con una idea muy simple: que las pequeñas y medianas empresas del sur de Barcelona pudieran acceder a servicios técnicos de calidad sin tener que recurrir a grandes consultoras anónimas con call centers infinitos.
                </p>
                <p>
                  Llevo más de dos décadas montando redes informáticas, instalaciones eléctricas, sistemas de videovigilancia, antenas WiFi, SAI y controles de acceso. He visto evolucionar la tecnología — del cable Ethernet a la fibra óptica, de las cámaras analógicas a la videovigilancia IP de alta resolución — pero lo que no ha cambiado es mi forma de trabajar.
                </p>
                <p>
                  <strong className="text-gripz-black">Cara a cara con el cliente.</strong> Si llamas, descuelgo yo. Si hay una incidencia, voy yo. Si te explico un presupuesto, te lo explico hasta que tenga sentido para ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA HISTORIA — Timeline ======================================== */}
      <section className="py-[60px] sm:py-[80px] lg:py-[120px] bg-gripz-cream border-y border-gripz-gray-200">
        <div className="container-gripz">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14 lg:mb-20">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-4">
                Nuestra historia
              </p>
              <h2 className="font-montserrat font-extrabold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.02em] text-gripz-black max-w-3xl mx-auto">
                Del primer rack al área metropolitana entera.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  year: '2004',
                  title: 'Los primeros clientes',
                  text: 'Arrancamos en Sant Vicenç dels Horts ofreciendo instalaciones eléctricas y de red a pequeños comercios y oficinas locales. El boca a boca hace el resto.',
                },
                {
                  year: '2010',
                  title: 'Especialización en redes',
                  text: 'Pequeñas y medianas empresas industriales del Baix Llobregat empiezan a confiarnos sus infraestructuras críticas: cableado estructurado, racks, switches.',
                },
                {
                  year: '2015',
                  title: 'Videovigilancia y seguridad',
                  text: 'Ampliamos a sistemas de cámaras IP, controles de acceso y SAI. Talleres, naves industriales, despachos y comunidades de vecinos se suman a la cartera.',
                },
                {
                  year: '2026',
                  title: 'Hoy: cobertura metropolitana',
                  text: 'Damos servicio a empresas en Sant Vicenç dels Horts, Sant Boi, Cornellà, Sant Joan Despí, Esplugues y toda el área metropolitana sur de Barcelona.',
                },
              ].map((item, i) => (
                <div key={i} className="fade-in bg-white rounded-2xl p-7 lg:p-8 border border-gripz-gray-200">
                  <p className="font-montserrat font-extrabold text-[44px] leading-none text-gripz-primary mb-3">
                    {item.year}
                  </p>
                  <h3 className="font-montserrat font-bold text-[20px] text-gripz-black mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-gripz-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALORES ============================================================ */}
      <section className="py-[60px] sm:py-[80px] lg:py-[120px] bg-white">
        <div className="container-gripz">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14 lg:mb-20">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-4">
                Cómo trabajamos
              </p>
              <h2 className="font-montserrat font-extrabold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.02em] text-gripz-black max-w-3xl mx-auto">
                Cuatro principios que no negociamos.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  title: 'Cercanía',
                  text: 'Te atiende quien hace el trabajo. Sin call centers, sin escalados, sin esperar a que "alguien te llame".',
                },
                {
                  title: 'Honestidad',
                  text: 'Solo te recomendamos lo que tu empresa realmente necesita. Si una solución más barata te sirve, te la proponemos.',
                },
                {
                  title: 'Continuidad',
                  text: 'Cuando algo se cae a las 8 de la mañana de un lunes, ahí estamos. Tus sistemas no entienden de horarios y nosotros tampoco.',
                },
                {
                  title: 'Calidad técnica',
                  text: 'Más de 20 años de experiencia respaldan cada instalación. Materiales certificados, normativa al día, trabajo limpio.',
                },
              ].map((v, i) => (
                <div key={i} className="fade-in border-l-2 border-gripz-primary pl-6">
                  <h3 className="font-montserrat font-bold text-[22px] text-gripz-black mb-3">
                    {v.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-gripz-gray-600">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIO ===================================================== */}
      <section className="py-[80px] lg:py-[100px] bg-gripz-black text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322C55E' stroke-width='0.5'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M0 40h40M40 0v40M40 40l20-20M40 40l20 20M40 40l-20 20M40 40l-20-20'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-gripz relative z-[1]">
          <div className="fade-in max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] mb-5">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="text-[16px] leading-[1.65] text-white/70 mb-8 max-w-xl mx-auto">
              Cuéntanos qué necesita tu empresa y te preparamos un presupuesto sin compromiso. Respuesta en menos de 24h.
            </p>
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 bg-gripz-primary text-white font-semibold px-7 py-4 rounded-lg hover:scale-[1.02] transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)]"
            >
              CONTACTAR <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}

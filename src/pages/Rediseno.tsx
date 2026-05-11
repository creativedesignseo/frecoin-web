import { useState, useEffect } from 'react';

/**
 * Rediseño FRECOIN — dirección editorial / Apple-like.
 *
 * Principios de diseño:
 *  · Blanco protagonista, una sola sección oscura para contraste
 *  · Tipografía sistema SF Pro / system-ui, gigante en hero (80px+)
 *  · Verde forest #1F5B3A como acento muy contenido (indicadores, dividers, números, hover)
 *  · CTAs NEGROS sólidos o links "Saber más →" — nunca colores brillantes
 *  · Espacio en blanco generoso. Una idea por sección.
 *  · Sin cápsulas/badges con colores fuertes
 *  · Hover states sutiles: subrayados, flechas que se mueven
 *
 * Componente único autocontenido. Sin librerías externas (iconos SVG inline).
 */
export default function Rediseno() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', servicio: '', mensaje: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ nombre: '', empresa: '', telefono: '', servicio: '', mensaje: '' });
  };

  // ============================================================================
  // SVG icons (delgados, estilo Apple)
  // ============================================================================
  const stroke = (path: React.ReactNode, size = 20) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      {path}
    </svg>
  );

  const Icon = {
    ArrowRight: (size = 16) => stroke(<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>, size),
    Plus: (size = 16) => stroke(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>, size),
    Phone: (size = 18) => stroke(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />, size),
    Mail: (size = 18) => stroke(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>, size),
    MapPin: (size = 18) => stroke(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, size),
    Menu: () => stroke(<><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>, 22),
    Close: () => stroke(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>, 22),
    Network: (size = 28) => stroke(<><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M12 7.5v4M12 11.5l-5.5 5.5M12 11.5l5.5 5.5" /></>, size),
    Plug: (size = 28) => stroke(<><path d="M12 22v-5M9 8V3M15 8V3M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8h12z" /></>, size),
    Camera: (size = 28) => stroke(<><rect x="2" y="6" width="20" height="14" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="M9 6 10.5 3h3L15 6" /></>, size),
    Wifi: (size = 28) => stroke(<><path d="M2 9a16 16 0 0 1 20 0" /><path d="M5 13a11 11 0 0 1 14 0" /><path d="M8.5 17a6 6 0 0 1 7 0" /><circle cx="12" cy="20" r="0.5" fill="currentColor" /></>, size),
    Battery: (size = 28) => stroke(<><rect x="2" y="8" width="18" height="10" rx="2" /><line x1="22" y1="11" x2="22" y2="15" /><path d="M11 9 8 13h4l-3 4" /></>, size),
    Lock: (size = 28) => stroke(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>, size),
    Dot: () => <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#1F5B3A', display: 'inline-block' }} />,
    Logo: () => (
      <span style={{ fontFamily: 'system-ui, -apple-system, "SF Pro Display", "Segoe UI", sans-serif', fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', color: '#1D1D1F' }}>
        Frecoin<span style={{ color: '#1F5B3A' }}>.</span>
      </span>
    ),
  };

  // ============================================================================
  // DATOS
  // ============================================================================
  const featuredServices = [
    {
      kicker: 'Servicio principal',
      title: 'Redes informáticas',
      tagline: 'Conectividad que no se cae.',
      desc: 'Diseño, instalación y mantenimiento de redes corporativas. Cableado estructurado, Wi-Fi empresarial y seguridad perimetral.',
      image: '/assets/services/rediseno/feature-redes.jpg',
      icon: Icon.Network,
    },
    {
      kicker: 'Servicio',
      title: 'Instalaciones eléctricas',
      tagline: 'Bien hechas. Certificadas.',
      desc: 'Cableado, cuadros, protecciones y boletines oficiales. Conformidad con el REBT y normativa vigente.',
      image: '/assets/services/rediseno/feature-electrico.jpg',
      icon: Icon.Plug,
    },
    {
      kicker: 'Servicio',
      title: 'Videovigilancia',
      tagline: 'Ver todo, desde cualquier lugar.',
      desc: 'Sistemas IP profesionales con visión nocturna, acceso remoto desde tu móvil y cumplimiento RGPD.',
      image: '/assets/services/rediseno/feature-camaras.jpg',
      icon: Icon.Camera,
    },
  ];

  const otherServices = [
    { icon: Icon.Wifi, title: 'WiFi empresarial', desc: 'Cobertura sin cortes en oficinas, naves y exteriores.' },
    { icon: Icon.Battery, title: 'Sistemas SAI', desc: 'Continuidad eléctrica para servidores y equipos críticos.' },
    { icon: Icon.Lock, title: 'Controles de acceso', desc: 'Tarjeta, huella o móvil. Quién entra, cuándo y a qué zona.' },
  ];

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#trabajo', label: 'Cómo trabajamos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  // Tipografía base (la aplicamos en el <div> raíz)
  const fontStack = '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", system-ui, sans-serif';

  return (
    <div style={{ fontFamily: fontStack, color: '#1D1D1F', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }} className="bg-white">

      {/* ====================================================================
          HEADER — fixed, casi invisible
          ==================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center" aria-label="FRECOIN">
            <Icon.Logo />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[#1D1D1F]/85 hover:text-[#1D1D1F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+34614134292" className="text-[13px] font-medium text-[#1D1D1F]/85 hover:text-[#1D1D1F] transition-colors">
              +34 614 134 292
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white bg-[#1D1D1F] hover:bg-black px-4 py-1.5 rounded-full transition-colors"
            >
              Solicitar presupuesto
            </a>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-[#1D1D1F]" aria-label="Menú">
            {navOpen ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden border-t border-black/5 bg-white">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setNavOpen(false)} className="py-3 text-[15px] font-medium text-[#1D1D1F]">
                  {link.label}
                </a>
              ))}
              <a href="#contacto" onClick={() => setNavOpen(false)} className="mt-3 inline-flex items-center justify-center gap-1.5 text-[14px] font-medium text-white bg-[#1D1D1F] px-5 py-3 rounded-full">
                Solicitar presupuesto
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          HERO — pantalla casi completa, título gigante
          ==================================================================== */}
      <section className="relative pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">

          {/* Kicker */}
          <div className="flex items-center gap-2.5 mb-8">
            <Icon.Dot />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1F5B3A]">
              Frecoin · desde 2004
            </span>
          </div>

          {/* H1 enorme */}
          <h1
            className="font-semibold text-[#1D1D1F] max-w-[920px]"
            style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
            }}
          >
            Infraestructura tecnológica<br />
            <span style={{ color: '#86868B' }}>que no te deja</span> colgado.
          </h1>

          <p className="mt-8 text-[19px] lg:text-[22px] leading-[1.5] text-[#515154] max-w-2xl font-normal">
            Llevamos más de veinte años montando las redes, las instalaciones eléctricas, las cámaras y los sistemas que hacen que tu empresa funcione. Sin sorpresas, sin atajos.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white text-[15px] font-medium px-7 py-3.5 rounded-full transition-all"
            >
              Solicitar presupuesto
              <span className="transition-transform group-hover:translate-x-0.5">{Icon.ArrowRight(15)}</span>
            </a>
            <a
              href="#servicios"
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1F5B3A] hover:text-[#0F3D24] transition-colors"
            >
              Ver nuestros servicios
              <span className="transition-transform group-hover:translate-x-1">{Icon.ArrowRight(14)}</span>
            </a>
          </div>

          {/* Foto editorial grande */}
          <div className="mt-20 lg:mt-28 -mx-6 lg:mx-0 lg:rounded-2xl overflow-hidden">
            <img
              src="/assets/services/rediseno/hero-tech.jpg"
              alt="Espacio de trabajo técnico profesional"
              className="w-full h-[420px] lg:h-[560px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* ====================================================================
          CIFRAS — números enormes, estilo editorial
          ==================================================================== */}
      <section className="py-24 lg:py-36 border-t border-[#F1F1F4]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1F5B3A] mb-6">
            Por números
          </p>
          <h2
            className="font-semibold text-[#1D1D1F] max-w-[800px]"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Veinte años hechos de instalaciones que funcionan, no de promesas que no.
          </h2>

          <div className="mt-16 lg:mt-20 grid sm:grid-cols-3 gap-12 lg:gap-16">
            {[
              { num: '20+', label: 'años en activo' },
              { num: '50+', label: 'proyectos completados' },
              { num: '6', label: 'especialidades técnicas' },
            ].map((stat, i) => (
              <div key={i}>
                <p
                  className="font-semibold text-[#1D1D1F]"
                  style={{ fontSize: 'clamp(56px, 7vw, 88px)', lineHeight: 1, letterSpacing: '-0.04em' }}
                >
                  {stat.num}
                </p>
                <p className="mt-3 text-[15px] text-[#86868B] font-normal">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SERVICIOS DESTACADOS — 3 features grandes con foto
          ==================================================================== */}
      <section id="servicios" className="bg-[#FAFAFA] py-24 lg:py-36 border-y border-[#F1F1F4]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1F5B3A] mb-6">
            Servicios
          </p>
          <h2
            className="font-semibold text-[#1D1D1F] max-w-[800px]"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Seis especialidades.<br /><span style={{ color: '#86868B' }}>Un único equipo.</span>
          </h2>

          <div className="mt-16 lg:mt-20 flex flex-col gap-6 lg:gap-8">
            {featuredServices.map((service, i) => {
              const SvcIcon = service.icon;
              const reverse = i % 2 === 1;
              return (
                <article
                  key={service.title}
                  className={`bg-white rounded-2xl overflow-hidden grid lg:grid-cols-[1.1fr_1fr] ${reverse ? 'lg:grid-flow-dense' : ''}`}
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div className={`p-8 lg:p-14 flex flex-col justify-center ${reverse ? 'lg:col-start-2' : ''}`}>
                    <div className="text-[#1F5B3A] mb-6">
                      <SvcIcon />
                    </div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#86868B] mb-3">
                      {service.kicker}
                    </p>
                    <h3
                      className="font-semibold text-[#1D1D1F]"
                      style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="mt-3 text-[#515154]"
                      style={{ fontSize: 'clamp(20px, 2.2vw, 24px)', lineHeight: 1.3, letterSpacing: '-0.01em' }}
                    >
                      {service.tagline}
                    </p>
                    <p className="mt-5 text-[16px] leading-[1.6] text-[#515154] max-w-md">
                      {service.desc}
                    </p>
                    <a
                      href="#contacto"
                      className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1F5B3A] hover:text-[#0F3D24] transition-colors w-fit"
                    >
                      Saber más
                      <span className="transition-transform group-hover:translate-x-1">{Icon.ArrowRight(14)}</span>
                    </a>
                  </div>
                  <div className={`relative min-h-[260px] lg:min-h-[440px] ${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </article>
              );
            })}

            {/* Otros servicios — grid simple */}
            <div className="grid sm:grid-cols-3 gap-6 mt-4">
              {otherServices.map((s) => {
                const SIcon = s.icon;
                return (
                  <article key={s.title} className="bg-white rounded-2xl p-8 lg:p-10" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="text-[#1F5B3A] mb-6">
                      <SIcon />
                    </div>
                    <h3 className="text-[22px] font-semibold text-[#1D1D1F]" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.55] text-[#515154]">{s.desc}</p>
                    <a href="#contacto" className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1F5B3A] hover:text-[#0F3D24] transition-colors">
                      Saber más
                      <span className="transition-transform group-hover:translate-x-1">{Icon.ArrowRight(13)}</span>
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          MANIFIESTO — sección oscura única, frase grande
          ==================================================================== */}
      <section id="nosotros" className="bg-[#1D1D1F] text-white py-32 lg:py-48">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5E9E7E] mb-8">
            Nuestra forma de trabajar
          </p>
          <p
            className="font-semibold text-white max-w-[920px]"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="text-white/50">Veinte años después,</span> seguimos firmando cada instalación. La empresa no se ha hecho grande para olvidarse de los detalles — al revés. Más experiencia significa menos atajos.
          </p>

          <div className="mt-20 lg:mt-24 grid sm:grid-cols-3 gap-10">
            {[
              { title: 'Visita sin compromiso', desc: 'Te visitamos, escuchamos y entendemos antes de proponer nada.' },
              { title: 'Presupuesto cerrado', desc: 'Precio claro, plazos definidos, sin sorpresas durante la obra.' },
              { title: 'Soporte después', desc: 'No desaparecemos al cobrar. Seguimos a tu lado cuando lo necesites.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[13px] font-medium text-[#5E9E7E] mb-3">0{i + 1}</span>
                <h3 className="text-[20px] font-semibold mb-2" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-[15px] leading-[1.6] text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CÓMO TRABAJAMOS — proceso editorial 4 pasos
          ==================================================================== */}
      <section id="trabajo" className="py-24 lg:py-36 bg-white">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1F5B3A] mb-6">
            Cómo trabajamos
          </p>
          <h2
            className="font-semibold text-[#1D1D1F] max-w-[760px]"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Cuatro pasos. Sin misterios.
          </h2>

          <div className="mt-16 lg:mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {[
              { n: '01', t: 'Diagnóstico', d: 'Visitamos tu local y entendemos qué necesitas, sin compromiso.' },
              { n: '02', t: 'Propuesta', d: 'Documento con esquema, materiales, plazos y precio cerrado.' },
              { n: '03', t: 'Instalación', d: 'Trabajo limpio y ordenado, minimizando interrupciones a tu actividad.' },
              { n: '04', t: 'Acompañamiento', d: 'Documentación, garantía y soporte continuo después de la entrega.' },
            ].map((step) => (
              <div key={step.n} className="border-t border-[#1D1D1F] pt-6">
                <p className="text-[13px] font-semibold text-[#1F5B3A] mb-4">{step.n}</p>
                <h3 className="text-[22px] font-semibold text-[#1D1D1F] mb-2" style={{ letterSpacing: '-0.01em' }}>{step.t}</h3>
                <p className="text-[15px] leading-[1.55] text-[#515154]">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CTA SUAVE — sin franja agresiva, solo título grande
          ==================================================================== */}
      <section className="bg-[#FAFAFA] py-32 lg:py-44 border-y border-[#F1F1F4]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8 text-center">
          <h2
            className="font-semibold text-[#1D1D1F] max-w-[820px] mx-auto"
            style={{ fontSize: 'clamp(36px, 6.5vw, 76px)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
          >
            Hablemos de tu proyecto.
          </h2>
          <p className="mt-6 text-[19px] lg:text-[22px] leading-[1.5] text-[#515154] max-w-xl mx-auto">
            Te visitamos sin compromiso y te entregamos un presupuesto cerrado en pocos días.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white text-[15px] font-medium px-7 py-3.5 rounded-full transition-all"
            >
              Solicitar presupuesto
              <span className="transition-transform group-hover:translate-x-0.5">{Icon.ArrowRight(15)}</span>
            </a>
            <a href="tel:+34614134292" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1D1D1F]">
              {Icon.Phone(16)} +34 614 134 292
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONTACTO — minimalista, datos + formulario
          ==================================================================== */}
      <section id="contacto" className="py-24 lg:py-36 bg-white">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">

            {/* Izquierda: info */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1F5B3A] mb-6">
                Contacto
              </p>
              <h2
                className="font-semibold text-[#1D1D1F]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
              >
                Estamos a un mensaje de distancia.
              </h2>
              <p className="mt-5 text-[17px] leading-[1.55] text-[#515154] max-w-md">
                Respondemos en menos de 24 horas laborables. Sin formularios infinitos, sin esperas.
              </p>

              <div className="mt-12 space-y-7">
                <a href="tel:+34614134292" className="group flex items-start gap-4">
                  <span className="text-[#1F5B3A] mt-0.5">{Icon.Phone()}</span>
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B]">Teléfono / WhatsApp</span>
                    <span className="block mt-1 text-[17px] font-medium text-[#1D1D1F] group-hover:text-[#1F5B3A] transition-colors">+34 614 134 292</span>
                  </span>
                </a>
                <a href="mailto:lfreire@frecoin.es" className="group flex items-start gap-4">
                  <span className="text-[#1F5B3A] mt-0.5">{Icon.Mail()}</span>
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B]">Email</span>
                    <span className="block mt-1 text-[17px] font-medium text-[#1D1D1F] group-hover:text-[#1F5B3A] transition-colors">lfreire@frecoin.es</span>
                  </span>
                </a>
                <div className="flex items-start gap-4">
                  <span className="text-[#1F5B3A] mt-0.5">{Icon.MapPin()}</span>
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B]">Zona de servicio</span>
                    <span className="block mt-1 text-[17px] font-medium text-[#1D1D1F]">Sant Vicenç dels Horts</span>
                    <span className="block text-[14px] text-[#515154]">y área metropolitana sur de Barcelona</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Derecha: form */}
            <div>
              {submitted ? (
                <div className="bg-[#FAFAFA] rounded-2xl p-12 lg:p-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#1F5B3A] text-white flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-[28px] font-semibold text-[#1D1D1F]" style={{ letterSpacing: '-0.02em' }}>Mensaje enviado.</h3>
                  <p className="mt-2 text-[16px] text-[#515154]">Te respondemos en menos de 24 horas laborables.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7">
                  {[
                    { id: 'nombre', label: 'Nombre', type: 'text', col: 'sm:col-span-1', required: true },
                    { id: 'empresa', label: 'Empresa', type: 'text', col: 'sm:col-span-1', required: false },
                    { id: 'telefono', label: 'Teléfono', type: 'tel', col: 'sm:col-span-1', required: true },
                  ].map(field => (
                    <div key={field.id} className={field.col}>
                      <label htmlFor={field.id} className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-2">
                        {field.label} {field.required && <span className="text-[#1F5B3A]">*</span>}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1D1D1F]/15 focus:border-[#1D1D1F] text-[17px] text-[#1D1D1F] py-2 outline-none transition-colors"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-1">
                    <label htmlFor="servicio" className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-2">
                      Servicio <span className="text-[#1F5B3A]">*</span>
                    </label>
                    <select
                      id="servicio"
                      required
                      value={form.servicio}
                      onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1D1D1F]/15 focus:border-[#1D1D1F] text-[17px] text-[#1D1D1F] py-2 outline-none transition-colors"
                    >
                      <option value="" disabled>Selecciona...</option>
                      {[...featuredServices.map(s => s.title), ...otherServices.map(s => s.title), 'Otra consulta'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-2">
                      Mensaje <span className="text-[#1F5B3A]">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      required
                      rows={3}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Cuéntanos qué necesitas."
                      className="w-full bg-transparent border-b border-[#1D1D1F]/15 focus:border-[#1D1D1F] text-[17px] text-[#1D1D1F] placeholder:text-[#86868B]/60 py-2 outline-none transition-colors resize-none"
                    />
                  </div>

                  <label className="sm:col-span-2 flex items-start gap-3 text-[12px] text-[#86868B] leading-[1.5]">
                    <input type="checkbox" required className="mt-0.5 flex-shrink-0 accent-[#1F5B3A]" />
                    <span>
                      Acepto la <a href="#" className="text-[#1D1D1F] underline underline-offset-2">Política de Privacidad</a>. Tus datos serán tratados por Luis Freire Camino (FRECOIN) con la única finalidad de responder a tu consulta.
                    </span>
                  </label>

                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" className="group inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white text-[15px] font-medium px-7 py-3.5 rounded-full transition-all">
                      Enviar mensaje
                      <span className="transition-transform group-hover:translate-x-0.5">{Icon.ArrowRight(15)}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER — gris claro Apple, minimal
          ==================================================================== */}
      <footer className="bg-[#F5F5F7] pt-16 pb-10 border-t border-[#E5E5EA]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            <div className="lg:col-span-2">
              <Icon.Logo />
              <p className="mt-4 text-[13px] leading-[1.6] text-[#86868B] max-w-xs">
                Infraestructuras tecnológicas para empresas en Sant Vicenç dels Horts y el área metropolitana sur de Barcelona.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-4">Servicios</h4>
              <ul className="space-y-2.5">
                {[...featuredServices.map(s => s.title), ...otherServices.map(s => s.title)].map(t => (
                  <li key={t}>
                    <a href="#servicios" className="text-[13px] text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-4">Empresa</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><a href="#nosotros" className="text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">Nosotros</a></li>
                <li><a href="#trabajo" className="text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">Cómo trabajamos</a></li>
                <li><a href="#contacto" className="text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">Contacto</a></li>
                <li><a href="#" className="text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">Aviso legal</a></li>
                <li><a href="#" className="text-[#1D1D1F]/85 hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">Política de privacidad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#86868B] mb-4">Contacto</h4>
              <ul className="space-y-2.5 text-[13px] text-[#1D1D1F]/85">
                <li><a href="tel:+34614134292" className="hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">+34 614 134 292</a></li>
                <li><a href="mailto:lfreire@frecoin.es" className="hover:text-[#1D1D1F] hover:underline underline-offset-2 transition-colors">lfreire@frecoin.es</a></li>
                <li className="text-[#86868B]">Sant Vicenç dels Horts<br />Barcelona</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-[#E5E5EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#86868B]">
            <p>© 2026 FRECOIN · Luis Freire Camino · NIF 48142086G. Todos los derechos reservados.</p>
            <p>Diseño y desarrollo <span className="text-[#1D1D1F]">Adspubli</span></p>
          </div>

        </div>
      </footer>

    </div>
  );
}

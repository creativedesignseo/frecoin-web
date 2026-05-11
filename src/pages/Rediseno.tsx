import { useState } from 'react';

/**
 * Rediseño FRECOIN — componente único autocontenido para validar dirección visual.
 *
 * Paleta:
 *  - Verde #16A34A → SOLO logo, iconos de servicios, bullets, badges
 *  - Azul #0052FF  → TODOS los CTAs
 *  - Blanco #FFFFFF → fondo principal
 *  - Gris claro #F8FAFC → secciones alternas
 *  - Verde oscuro #052E16 → footer
 *
 * Tipografía: sistema sans-serif. 700 títulos, 500 subtítulos, 400 cuerpo.
 *
 * NOTA: este componente es independiente del resto de la web. Está montado
 * en /rediseno para poder evaluarlo lado a lado con la versión actual.
 */
export default function Rediseno() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ nombre: '', empresa: '', telefono: '', servicio: '', mensaje: '' });
  };

  // ============================================================================
  // ICONOS SVG inline (autocontenido, sin librerías externas)
  // ============================================================================
  const Icon = {
    Network: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M14 17.5h-4" />
      </svg>
    ),
    Plug: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
      </svg>
    ),
    Camera: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    Wifi: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    Battery: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <path d="m11 7-3 5h4l-3 5" />
      </svg>
    ),
    Lock: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    Check: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    ArrowRight: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    Phone: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    Mail: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    MapPin: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    Award: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    Globe: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    Shield: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Menu: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    X: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    Logo: () => (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <rect x="2" y="2" width="28" height="28" rx="6" fill="#16A34A" />
        <path d="M11 9h10v2.5h-7v3.5h6v2.5h-6v6h-3z" fill="white" />
      </svg>
    ),
  };

  // ============================================================================
  // DATOS
  // ============================================================================
  const services = [
    { icon: Icon.Network, title: 'Redes Informáticas', desc: 'Cableado estructurado, switches, firewalls y Wi-Fi corporativo. Conectividad rápida y segura para tu empresa.' },
    { icon: Icon.Plug, title: 'Instalaciones Eléctricas', desc: 'Diseño, ejecución y certificación de instalaciones eléctricas seguras, conforme al REBT y normativa vigente.' },
    { icon: Icon.Camera, title: 'Cámaras de Seguridad', desc: 'Sistemas IP/CCTV profesionales con visión nocturna, acceso remoto y cumplimiento RGPD.' },
    { icon: Icon.Wifi, title: 'WiFi Empresarial', desc: 'Cobertura sin cortes en oficinas, naves y exteriores. APs gestionables y redes separadas para empleados e invitados.' },
    { icon: Icon.Battery, title: 'Sistemas SAI', desc: 'Sistemas de Alimentación Ininterrumpida que mantienen servidores y equipos críticos durante cortes y picos eléctricos.' },
    { icon: Icon.Lock, title: 'Controles de Acceso', desc: 'Tarjetas RFID, huella o móvil. Gestiona quién entra, cuándo y a qué zonas, con registro completo.' },
  ];

  const reasons = [
    { icon: Icon.Award, title: '+20 años de experiencia', desc: 'Trayectoria sólida desde 2004 en instalaciones técnicas profesionales. Sabemos qué funciona.' },
    { icon: Icon.Globe, title: 'Barcelona y área metropolitana', desc: 'Servicio en Sant Vicenç dels Horts y toda la zona sur de Barcelona. Atención rápida sobre el terreno.' },
    { icon: Icon.Shield, title: 'Servicio integral', desc: 'Un único proveedor para todas tus infraestructuras: red, electricidad, seguridad y mantenimiento.' },
  ];

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  // Clases reutilizables
  const ctaPrimary = 'inline-flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#003ECC] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200';
  const ctaOutline = 'inline-flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-slate-900 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors';

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased font-sans" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>

      {/* ====================================================================
          1. HEADER / NAV
          ==================================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <Icon.Logo />
            <span className="text-lg font-bold tracking-tight">FRECOIN</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+34614134292" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              +34 614 134 292
            </a>
            <a href="#contacto" className={ctaPrimary + ' !py-2 !px-4 !text-sm'}>
              Solicitar presupuesto
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-700 p-1" aria-label="Menú">
            {mobileOpen ? <Icon.X /> : <Icon.Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-slate-700">
                  {link.label}
                </a>
              ))}
              <a href="#contacto" onClick={() => setMobileOpen(false)} className={ctaPrimary + ' mt-3 w-full'}>
                Solicitar presupuesto
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO
          ==================================================================== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 ring-1 ring-green-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                +20 años desde 2004
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900">
                Infraestructura tecnológica que <span className="text-[#0052FF]">no te deja colgado.</span>
              </h1>

              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                Redes informáticas, instalaciones eléctricas, videovigilancia, Wi-Fi empresarial y SAI para empresas en Sant Vicenç dels Horts y el área metropolitana sur de Barcelona.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contacto" className={ctaPrimary}>
                  Solicitar presupuesto
                  <Icon.ArrowRight />
                </a>
                <a href="#servicios" className={ctaOutline}>
                  Ver servicios
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                {['Presupuesto sin compromiso', 'Atención 24h para clientes', 'Cumplimiento normativa REBT'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <Icon.Check />
                    </span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard mockup geométrico */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-green-100 rounded-full opacity-40 blur-2xl" />

              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-slate-700">FRECOIN · operación activa</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">24/7</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {services.slice(0, 4).map((s, i) => {
                    const SvcIcon = s.icon;
                    return (
                      <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-3">
                          <SvcIcon />
                        </div>
                        <p className="text-[12px] font-semibold text-slate-900 leading-tight">{s.title}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-[10px] text-slate-500">Operativo</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">20+</p>
                    <p className="text-[11px] text-slate-500 font-medium">Años</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">50+</p>
                    <p className="text-[11px] text-slate-500 font-medium">Proyectos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">6</p>
                    <p className="text-[11px] text-slate-500 font-medium">Servicios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. SERVICIOS
          ==================================================================== */}
      <section id="servicios" className="bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">Nuestros servicios</p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Soluciones integrales en infraestructuras tecnológicas
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Un único proveedor profesional para todas las infraestructuras críticas de tu empresa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const SvcIcon = service.icon;
              return (
                <article key={i} className="group bg-white border border-slate-200 rounded-xl p-7 hover:border-slate-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-5">
                    <SvcIcon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{service.title}</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-5">{service.desc}</p>
                  <a href="#contacto" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0052FF] hover:gap-2.5 transition-all">
                    Más información <Icon.ArrowRight />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. POR QUÉ FRECOIN
          ==================================================================== */}
      <section id="nosotros" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">¿Por qué FRECOIN?</p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Una empresa técnica seria con vocación de servicio
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {reasons.map((reason, i) => {
              const RIcon = reason.icon;
              return (
                <div key={i} className="flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-5">
                    <RIcon />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{reason.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. CTA CENTRAL
          ==================================================================== */}
      <section id="proyectos" className="bg-[#0F1E40]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                ¿Listo para una infraestructura profesional que no te deje colgado?
              </h2>
              <p className="mt-4 text-blue-100 text-lg leading-relaxed max-w-2xl">
                Te visitamos sin compromiso, evaluamos tus necesidades reales y te entregamos un presupuesto cerrado con todo incluido.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#contacto" className="inline-flex items-center gap-2 bg-white text-[#0F1E40] font-semibold px-6 py-3.5 rounded-lg hover:bg-blue-50 transition-colors">
                Solicitar presupuesto
                <Icon.ArrowRight />
              </a>
              <a href="tel:+34614134292" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/10 transition-colors">
                <Icon.Phone />
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CONTACTO
          ==================================================================== */}
      <section id="contacto" className="bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
            {/* Left: Info */}
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">Contacto</p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Hablemos de tu proyecto
              </h2>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                Respondemos en menos de 24h laborables. Te damos un presupuesto cerrado sin sorpresas ni costes ocultos.
              </p>

              <div className="mt-10 space-y-5">
                <a href="tel:+34614134292" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Icon.Phone />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teléfono / WhatsApp</p>
                    <p className="text-lg font-semibold text-slate-900 group-hover:text-[#0052FF] transition-colors">+34 614 134 292</p>
                  </div>
                </a>

                <a href="mailto:lfreire@frecoin.es" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Icon.Mail />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-lg font-semibold text-slate-900 group-hover:text-[#0052FF] transition-colors break-all">lfreire@frecoin.es</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Icon.MapPin />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zona de servicio</p>
                    <p className="text-lg font-semibold text-slate-900">Sant Vicenç dels Horts</p>
                    <p className="text-sm text-slate-600">y área metropolitana sur de Barcelona</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 lg:p-10 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-600">Te respondemos en menos de 24 horas laborables.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Solicita tu presupuesto</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1.5">Nombre completo *</label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052FF] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-slate-700 mb-1.5">Empresa</label>
                      <input
                        id="empresa"
                        type="text"
                        value={form.empresa}
                        onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052FF] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono *</label>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052FF] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-slate-700 mb-1.5">Servicio de interés *</label>
                    <select
                      id="servicio"
                      required
                      value={form.servicio}
                      onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:border-[#0052FF] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      {services.map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                      <option value="otros">Otro / consulta general</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 mb-1.5">Mensaje *</label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Cuéntanos qué necesitas..."
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052FF] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 accent-[#0052FF] flex-shrink-0" />
                    <span>
                      He leído y acepto la <a href="#" className="text-[#0052FF] font-semibold hover:underline">Política de Privacidad</a>. Mis datos serán tratados por Luis Freire Camino (FRECOIN) con la única finalidad de responder a esta consulta.
                    </span>
                  </label>

                  <button type="submit" className={ctaPrimary + ' w-full !py-3.5'}>
                    Enviar mensaje
                    <Icon.ArrowRight />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. FOOTER
          ==================================================================== */}
      <footer className="bg-[#052E16] text-slate-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Icon.Logo />
                <span className="text-lg font-bold text-white tracking-tight">FRECOIN</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Soluciones integrales en infraestructuras tecnológicas para empresas. Más de 20 años de experiencia en Sant Vicenç dels Horts y alrededores.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Servicios</h4>
              <ul className="space-y-3 text-sm">
                {services.map(s => (
                  <li key={s.title}>
                    <a href="#servicios" className="hover:text-white transition-colors">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Empresa</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Icon.Phone />
                  <a href="tel:+34614134292" className="hover:text-white transition-colors">+34 614 134 292</a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon.Mail />
                  <a href="mailto:lfreire@frecoin.es" className="hover:text-white transition-colors break-all">lfreire@frecoin.es</a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon.MapPin />
                  <span>Sant Vicenç dels Horts, Barcelona</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              © 2026 FRECOIN · Luis Freire Camino · NIF 48142086G. Todos los derechos reservados.
            </p>
            <p className="text-xs text-slate-500">
              Diseñado y desarrollado por <span className="text-white font-medium">Adspubli</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

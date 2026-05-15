import { useState, useEffect } from 'react';

/**
 * Rediseño FRECOIN v3 — Inspirado en Telefónica Tech.
 *
 * SISTEMA DE DISEÑO (tokens):
 *
 *  COLOR:
 *   ink-100 #FFFFFF — blanco puro
 *   ink-95  #F5F6F7 — fondo alterno
 *   ink-90  #E8EAEE — divisores
 *   ink-50  #58617A — gris texto secundario (Telefónica)
 *   ink-20  #2C3340 — texto cuerpo enfático
 *   ink-10  #0F1419 — casi negro
 *   ink-0   #07090D — hero dark profundo
 *   brand   #1A6B40 — verde FRECOIN corporativo (no chillón)
 *   brand-soft #E6F2EC — verde muy claro fondo
 *
 *  TIPOGRAFÍA (pesos ligeros como Telefónica Tech):
 *   H1: 64-80px / weight 300 / tracking -0.025em
 *   H2: 40-56px / weight 400 / tracking -0.02em
 *   H3: 22-28px / weight 500 / tracking -0.01em
 *   Body: 16-18px / weight 400 / line-height 1.6
 *   Eyebrow: 12px / uppercase / tracking 0.14em / weight 600
 *
 *  COMPONENTES uniformes:
 *   Button.primary    → bg-brand, white text, rounded-full, px-6 py-3
 *   Button.secondary  → border-current, rounded-full, px-6 py-3
 *   Eyebrow           → uppercase 12px brand letter-spacing
 *   Card              → padding lg, radius 16px, hover lift
 *   LinkArrow         → "Saber más →" con flecha que se mueve
 *
 *  ESPACIADO:
 *   Sección desktop: py-24 lg:py-32
 *   Sección hero: py-32 lg:py-40
 *   Container max: 1240px
 */

export default function Rediseno() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', servicio: '', mensaje: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
  // ICONOS (delgados, weight ligero)
  // ============================================================================
  const s = (path: React.ReactNode, size = 20) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }} aria-hidden="true">
      {path}
    </svg>
  );

  const IconArrow = (size = 14) => s(<><path d="M5 12h14M13 6l6 6-6 6" /></>, size);
  const IconPhone = (size = 16) => s(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />, size);
  const IconMail = (size = 16) => s(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>, size);
  const IconPin = (size = 16) => s(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, size);
  const IconClock = (size = 14) => s(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, size);
  const IconCheck = (size = 16) => s(<polyline points="20 6 9 17 4 12" />, size);
  const IconMenu = () => s(<><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>, 22);
  const IconClose = () => s(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>, 22);
  const IconNetwork = (size = 28) => s(<><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v3M12 10l-5.5 6.5M12 10l5.5 6.5" /></>, size);
  const IconPlug = (size = 28) => s(<><path d="M12 22v-5M9 8V3M15 8V3M5 8h14v5a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4V8z" /></>, size);
  const IconCamera = (size = 28) => s(<><rect x="2" y="6" width="20" height="14" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="M9 6 10.5 3h3L15 6" /></>, size);
  const IconWifi = (size = 28) => s(<><path d="M2 9a16 16 0 0 1 20 0M5 13a11 11 0 0 1 14 0M8.5 17a6 6 0 0 1 7 0" /><circle cx="12" cy="20" r="0.5" fill="currentColor" /></>, size);
  const IconBattery = (size = 28) => s(<><rect x="2" y="8" width="18" height="10" rx="2" /><line x1="22" y1="11" x2="22" y2="15" /><path d="M11 9 8 13h4l-3 4" /></>, size);
  const IconLock = (size = 28) => s(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>, size);

  // ============================================================================
  // COMPONENTES REUTILIZABLES (design system)
  // ============================================================================

  type BtnProps = { children: React.ReactNode; href: string; variant?: 'primary' | 'secondary' | 'ghost' | 'whiteFill' | 'whiteOutline'; className?: string; onClick?: (e: React.MouseEvent) => void };

  const Button = ({ children, href, variant = 'primary', className = '', onClick }: BtnProps) => {
    const base = 'group inline-flex items-center justify-center gap-2 text-[14px] font-medium rounded-full px-6 py-3 transition-all duration-200';
    const variants = {
      primary: 'bg-[#1A6B40] hover:bg-[#0F4D2E] text-white',
      secondary: 'border border-[#2C3340] text-[#0F1419] hover:bg-[#0F1419] hover:text-white',
      ghost: '!px-0 !py-0 text-[#1A6B40] hover:text-[#0F4D2E]',
      whiteFill: 'bg-white hover:bg-[#F5F6F7] text-[#0F1419]',
      whiteOutline: 'border border-white/30 text-white hover:bg-white/10',
    };
    return (
      <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
        <span className="transition-transform group-hover:translate-x-0.5">{IconArrow(14)}</span>
      </a>
    );
  };

  type EyebrowProps = { children: React.ReactNode; color?: 'brand' | 'gray' | 'white' };
  const Eyebrow = ({ children, color = 'brand' }: EyebrowProps) => {
    const c = color === 'brand' ? 'text-[#1A6B40]' : color === 'white' ? 'text-white/60' : 'text-[#58617A]';
    return <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${c}`}>{children}</p>;
  };

  // ============================================================================
  // DATOS
  // ============================================================================

  const services = [
    { icon: IconNetwork, title: 'Redes informáticas', desc: 'Diseño, instalación y mantenimiento de redes corporativas con cableado estructurado y Wi-Fi empresarial.', featured: true },
    { icon: IconPlug, title: 'Instalaciones eléctricas', desc: 'Cableado, cuadros, protecciones y boletines oficiales conforme al REBT.' },
    { icon: IconCamera, title: 'Videovigilancia', desc: 'Sistemas IP profesionales con visión nocturna, acceso remoto y cumplimiento RGPD.' },
    { icon: IconWifi, title: 'WiFi empresarial', desc: 'Cobertura sin cortes en oficinas, naves y exteriores con APs gestionables.' },
    { icon: IconBattery, title: 'Sistemas SAI', desc: 'Continuidad eléctrica para servidores y equipos críticos. Sin pérdidas por cortes.' },
    { icon: IconLock, title: 'Controles de acceso', desc: 'Tarjeta, huella o móvil. Quién entra, cuándo, y a qué zona.' },
  ];

  const sectors = ['PYMEs', 'Naves industriales', 'Comunidades de vecinos', 'Comercios', 'Hostelería', 'Oficinas', 'Logística', 'Sanidad'];

  const stats = [
    { value: '20+', label: 'años de actividad' },
    { value: '50+', label: 'proyectos completados' },
    { value: '6', label: 'especialidades técnicas' },
    { value: '24h', label: 'soporte clientes' },
  ];

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#sectores', label: 'Sectores' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const FONT = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

  return (
    <div style={{ fontFamily: FONT, color: '#0F1419', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }} className="bg-white">

      {/* Inter desde Google Fonts (sólo para esta página preview) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ====================================================================
          TOP BAR — fino, info corporativa
          ==================================================================== */}
      <div className="hidden lg:block bg-[#07090D] text-white/70 text-[12px]">
        <div className="max-w-[1240px] mx-auto px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              {IconClock()} Soporte 24h para clientes
            </span>
            <span>Sant Vicenç dels Horts · Barcelona</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+34614134292" className="hover:text-white inline-flex items-center gap-1.5">
              {IconPhone(13)} +34 614 134 292
            </a>
            <a href="mailto:info@frecoin.es" className="hover:text-white">info@frecoin.es</a>
          </div>
        </div>
      </div>

      {/* ====================================================================
          HEADER — minimal, transparente sobre hero
          ==================================================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-[#E8EAEE]' : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-0.5">
            <span style={{ fontFamily: FONT }} className="text-[22px] font-medium text-[#0F1419] tracking-tight">Frecoin</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B40] mb-1" />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-[14px] font-normal text-[#2C3340] hover:text-[#1A6B40] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button href="#contacto" variant="secondary" className="!py-2 !px-5 !text-[13px]">
              Contacto
            </Button>
            <Button href="#contacto" variant="primary" className="!py-2 !px-5 !text-[13px]">
              Solicitar presupuesto
            </Button>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden text-[#0F1419]" aria-label="Menú">
            {navOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden border-t border-[#E8EAEE] bg-white">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setNavOpen(false)} className="py-3 text-[15px] font-medium text-[#0F1419]">
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button href="#contacto" variant="primary" onClick={() => setNavOpen(false)} className="!w-full">
                  Solicitar presupuesto
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          HERO — dark, foto fondo, mensaje claro
          ==================================================================== */}
      <section className="relative bg-[#07090D] text-white overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="/assets/services/rediseno/hero-dark.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090D] via-[#07090D]/85 to-[#07090D]/40" />
        </div>

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8 py-28 lg:py-40">
          <div className="max-w-3xl">
            <Eyebrow color="white">Infraestructuras tecnológicas · Desde 2004</Eyebrow>

            <h1
              className="mt-8 text-white"
              style={{
                fontSize: 'clamp(40px, 6.5vw, 80px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                fontWeight: 300,
              }}
            >
              Hacemos que la <span style={{ color: '#5E9E7E', fontWeight: 400 }}>tecnología</span> de tu empresa <span style={{ fontWeight: 400 }}>funcione.</span>
            </h1>

            <p className="mt-8 text-[18px] lg:text-[20px] leading-[1.55] text-white/75 max-w-2xl font-normal">
              Diseño, instalación y mantenimiento de redes, sistemas eléctricos, videovigilancia y comunicaciones para empresas y comunidades del área metropolitana sur de Barcelona.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="#contacto" variant="whiteFill">Solicitar presupuesto</Button>
              <Button href="#servicios" variant="whiteOutline">Conoce nuestros servicios</Button>
            </div>

            {/* Mini stats abajo */}
            <div className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 pt-10 border-t border-white/15">
              {stats.map(stat => (
                <div key={stat.label}>
                  <p className="text-white" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[13px] text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTORES — chips uniformes, estilo "Empresas que confían"
          ==================================================================== */}
      <section id="sectores" className="py-20 lg:py-24 border-b border-[#E8EAEE] bg-white">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-xl">
              <Eyebrow>Sectores que atendemos</Eyebrow>
              <h2 className="mt-4 text-[#0F1419]" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 400 }}>
                Empresas y comunidades de toda escala.
              </h2>
            </div>
            <p className="text-[16px] text-[#58617A] max-w-md leading-relaxed">
              Trabajamos con clientes diversos, desde pequeños comercios hasta naves industriales con requisitos técnicos exigentes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {sectors.map(sector => (
              <span
                key={sector}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-[14px] font-normal text-[#2C3340] bg-[#F5F6F7] hover:bg-[#E6F2EC] hover:text-[#1A6B40] transition-colors border border-[#E8EAEE]"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SERVICIOS — grid 3x2 uniforme, estilo Telefónica products
          ==================================================================== */}
      <section id="servicios" className="bg-[#F5F6F7] py-24 lg:py-32 border-b border-[#E8EAEE]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Servicios</Eyebrow>
            <h2 className="mt-4 text-[#0F1419]" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Seis especialidades, un único equipo técnico.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-[#58617A]">
              Cubrimos toda la infraestructura técnica de tu empresa con criterio y método. Sin subcontratas que no controlamos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group bg-white rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(15,20,25,0.12)] border border-[#E8EAEE] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[#1A6B40]">{Icon()}</div>
                    {service.featured && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A6B40] bg-[#E6F2EC] px-2.5 py-1 rounded-full">
                        Destacado
                      </span>
                    )}
                  </div>
                  <h3 className="text-[#0F1419]" style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#58617A] flex-1">
                    {service.desc}
                  </p>
                  <a href="#contacto" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1A6B40] hover:text-[#0F4D2E] transition-colors group/link">
                    Más información
                    <span className="transition-transform group-hover/link:translate-x-1">{IconArrow(13)}</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRODUCTO DESTACADO — fondo verde corporativo (equivalente azul Telefónica)
          ==================================================================== */}
      <section className="relative overflow-hidden bg-[#0F4D2E] text-white">
        {/* Pattern sutil */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px), radial-gradient(circle at 30% 80%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <Eyebrow color="white">Nuestro servicio principal</Eyebrow>
              <h2 className="mt-5 text-white" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 300 }}>
                Redes informáticas hechas para no caerse.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.6] text-white/80 max-w-xl">
                Diseñamos infraestructura corporativa estable y segura: cableado estructurado certificado, configuración de routers y switches, Wi-Fi empresarial y seguridad perimetral. Documentación profesional incluida.
              </p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {['Cableado Cat 6/6A certificado', 'Configuración de firewall y VLANs', 'Wi-Fi empresarial gestionable', 'Monitorización y soporte continuo'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/90">
                    <span className="text-[#7BCFA0] mt-0.5">{IconCheck(15)}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="#contacto" variant="whiteFill">Solicitar presupuesto</Button>
                <Button href="#servicios" variant="whiteOutline">Ver todos los servicios</Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src="/assets/services/rediseno/feature-redes.jpg" alt="Servidor con cableado de red" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          NOSOTROS / NUESTRO COMPROMISO — texto editorial sobre blanco
          ==================================================================== */}
      <section id="nosotros" className="bg-white py-24 lg:py-32 border-b border-[#E8EAEE]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div>
              <Eyebrow>Nuestro compromiso</Eyebrow>
              <h2 className="mt-4 text-[#0F1419]" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
                Veinte años haciendo bien lo que hacemos.
              </h2>
            </div>

            <div>
              <p className="text-[18px] lg:text-[20px] leading-[1.55] text-[#2C3340] mb-8">
                FRECOIN nació en 2004 con un compromiso simple: instalaciones técnicas serias, sin prisas, sin atajos. Más de dos décadas después, seguimos firmando cada trabajo personalmente.
              </p>
              <p className="text-[16px] leading-[1.65] text-[#58617A]">
                Cada presupuesto incluye una visita previa, esquema técnico detallado y precio cerrado. No vendemos paquetes genéricos: estudiamos el caso y proponemos lo que necesitas, ni más ni menos. Tras la entrega seguimos disponibles para soporte, mantenimiento y ampliaciones.
              </p>

              <div className="mt-12 grid sm:grid-cols-3 gap-8">
                {[
                  { n: '01', t: 'Visita sin compromiso', d: 'Te visitamos, escuchamos y entendemos antes de proponer nada.' },
                  { n: '02', t: 'Presupuesto cerrado', d: 'Precio claro, plazos definidos, sin sorpresas durante la obra.' },
                  { n: '03', t: 'Soporte después', d: 'No desaparecemos al cobrar. Seguimos a tu lado.' },
                ].map(item => (
                  <div key={item.n}>
                    <p className="text-[13px] font-semibold text-[#1A6B40] mb-2">{item.n}</p>
                    <h4 className="text-[16px] font-medium text-[#0F1419] mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.t}</h4>
                    <p className="text-[14px] leading-[1.55] text-[#58617A]">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TESTIMONIO / CITA — sobria, estilo editorial
          ==================================================================== */}
      <section className="bg-[#F5F6F7] py-24 lg:py-32 border-b border-[#E8EAEE]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <Eyebrow>Nuestro principio</Eyebrow>
          <blockquote className="mt-6 text-[#0F1419]" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.25, letterSpacing: '-0.02em', fontWeight: 300 }}>
            <span className="text-[#1A6B40]">"</span>Tu satisfacción es mi prioridad laboral.<span className="text-[#1A6B40]">"</span>
          </blockquote>
          <p className="mt-8 text-[14px] text-[#58617A]">
            <span className="text-[#0F1419] font-medium">Luis Freire Camino</span> · Fundador y técnico, FRECOIN
          </p>
        </div>
      </section>

      {/* ====================================================================
          CTA central — sobria, no franja agresiva
          ==================================================================== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="bg-[#0F1419] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-[1.3fr_1fr]">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <Eyebrow color="white">Hablemos</Eyebrow>
                <h2 className="mt-5 text-white" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 300 }}>
                  ¿Listo para una infraestructura<br />que <span style={{ color: '#5E9E7E', fontWeight: 400 }}>no te deje colgado?</span>
                </h2>
                <p className="mt-6 text-[17px] leading-[1.6] text-white/70 max-w-md">
                  Te visitamos sin compromiso y te entregamos un presupuesto cerrado en pocos días.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="#contacto" variant="whiteFill">Solicitar presupuesto</Button>
                  <a href="tel:+34614134292" className="inline-flex items-center gap-2 text-[14px] font-medium text-white px-6 py-3">
                    {IconPhone(15)} +34 614 134 292
                  </a>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img src="/assets/services/rediseno/cta-feature.jpg" alt="Profesional FRECOIN trabajando" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONTACTO — formulario uniforme
          ==================================================================== */}
      <section id="contacto" className="bg-[#F5F6F7] py-24 lg:py-32 border-y border-[#E8EAEE]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">

            <div>
              <Eyebrow>Contacto</Eyebrow>
              <h2 className="mt-4 text-[#0F1419]" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
                Estamos a un mensaje de distancia.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.6] text-[#58617A] max-w-md">
                Respondemos en menos de 24 horas laborables. Sin formularios infinitos, sin esperas innecesarias.
              </p>

              <div className="mt-12 space-y-7">
                {[
                  { icon: IconPhone, label: 'Teléfono / WhatsApp', value: '+34 614 134 292', href: 'tel:+34614134292' },
                  { icon: IconMail, label: 'Email', value: 'info@frecoin.es', href: 'mailto:info@frecoin.es' },
                  { icon: IconPin, label: 'Zona de servicio', value: 'Sant Vicenç dels Horts', sub: 'y área metropolitana sur de Barcelona' },
                ].map((item, i) => {
                  const Ico = item.icon;
                  const content = (
                    <>
                      <span className="text-[#1A6B40] flex-shrink-0 mt-0.5">{Ico(18)}</span>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#58617A]">{item.label}</p>
                        <p className="mt-1 text-[17px] font-medium text-[#0F1419]">{item.value}</p>
                        {item.sub && <p className="text-[13px] text-[#58617A] mt-0.5">{item.sub}</p>}
                      </div>
                    </>
                  );
                  return item.href ? (
                    <a key={i} href={item.href} className="flex items-start gap-4 hover:opacity-80 transition-opacity">{content}</a>
                  ) : (
                    <div key={i} className="flex items-start gap-4">{content}</div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#E8EAEE]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-[#E6F2EC] text-[#1A6B40] flex items-center justify-center mb-6">
                    {IconCheck(22)}
                  </div>
                  <h3 className="text-[28px] font-normal text-[#0F1419]" style={{ letterSpacing: '-0.02em' }}>Mensaje enviado.</h3>
                  <p className="mt-2 text-[15px] text-[#58617A]">Te respondemos en menos de 24 horas laborables.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-[20px] font-medium text-[#0F1419]" style={{ letterSpacing: '-0.01em' }}>Solicita tu presupuesto</h3>
                  <p className="text-[14px] text-[#58617A] -mt-3">Te respondemos en menos de 24 h.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: 'nombre', label: 'Nombre completo', type: 'text', required: true },
                      { id: 'empresa', label: 'Empresa', type: 'text', required: false },
                    ].map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-[12px] font-medium text-[#58617A] mb-1.5">
                          {f.label} {f.required && '*'}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          required={f.required}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                          className="w-full bg-[#F5F6F7] border border-transparent focus:bg-white focus:border-[#1A6B40] rounded-xl px-4 py-3 text-[15px] text-[#0F1419] outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-[12px] font-medium text-[#58617A] mb-1.5">Teléfono *</label>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full bg-[#F5F6F7] border border-transparent focus:bg-white focus:border-[#1A6B40] rounded-xl px-4 py-3 text-[15px] text-[#0F1419] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-[12px] font-medium text-[#58617A] mb-1.5">Servicio de interés *</label>
                    <select
                      id="servicio"
                      required
                      value={form.servicio}
                      onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                      className="w-full bg-[#F5F6F7] border border-transparent focus:bg-white focus:border-[#1A6B40] rounded-xl px-4 py-3 text-[15px] text-[#0F1419] outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      {services.map(s2 => <option key={s2.title} value={s2.title}>{s2.title}</option>)}
                      <option value="otro">Otra consulta</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-[12px] font-medium text-[#58617A] mb-1.5">Mensaje *</label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Cuéntanos qué necesitas."
                      className="w-full bg-[#F5F6F7] border border-transparent focus:bg-white focus:border-[#1A6B40] rounded-xl px-4 py-3 text-[15px] text-[#0F1419] placeholder:text-[#58617A]/60 outline-none transition-all resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 text-[12px] text-[#58617A] leading-[1.5] cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 flex-shrink-0 accent-[#1A6B40]" />
                    <span>
                      Acepto la <a href="#" className="text-[#1A6B40] underline underline-offset-2 font-medium">Política de Privacidad</a>. Mis datos serán tratados por Luis Freire Camino (FRECOIN) con la única finalidad de responder a esta consulta.
                    </span>
                  </label>

                  <Button href="#" variant="primary" className="!w-full" onClick={(e) => { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent); }}>
                    Enviar mensaje
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER — dark con verde corporativo (mismo del producto destacado)
          ==================================================================== */}
      <footer className="bg-[#07090D] text-white/70 pt-20 pb-10">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12">
            <div>
              <a href="#" className="flex items-baseline gap-0.5 mb-5">
                <span style={{ fontFamily: FONT }} className="text-[22px] font-medium text-white tracking-tight">Frecoin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E9E7E] mb-1" />
              </a>
              <p className="text-[14px] leading-[1.6] text-white/55 max-w-xs">
                Infraestructuras tecnológicas para empresas en Sant Vicenç dels Horts y el área metropolitana sur de Barcelona desde 2004.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white mb-5">Servicios</h4>
              <ul className="space-y-3 text-[14px]">
                {services.map(s2 => <li key={s2.title}><a href="#servicios" className="hover:text-white transition-colors">{s2.title}</a></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white mb-5">Empresa</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#sectores" className="hover:text-white transition-colors">Sectores</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aviso legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white mb-5">Contacto</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="tel:+34614134292" className="hover:text-white transition-colors">+34 614 134 292</a></li>
                <li><a href="mailto:info@frecoin.es" className="hover:text-white transition-colors">info@frecoin.es</a></li>
                <li className="text-white/55">Sant Vicenç dels Horts<br />Barcelona, España</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/50">
            <p>© 2026 FRECOIN · Luis Freire Camino · NIF 48142086G. Todos los derechos reservados.</p>
            <p>Diseño y desarrollo <span className="text-white">Adspubli</span></p>
          </div>
        </div>
      </footer>

    </div>
  );
}

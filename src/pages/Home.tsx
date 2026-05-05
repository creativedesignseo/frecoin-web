import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  Users,
  Zap,
  CheckCircle,
  Network,
  Shield,
  ChevronDown,
  ArrowRight,
  Target,
  Eye,
  Star,
  Plus,
  X,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

/* ─── Section Tag ─── */
function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-6 h-[2px] bg-primary inline-block" />
      <span className="text-primary uppercase text-xs font-sans font-medium tracking-widest">
        {text}
      </span>
    </div>
  )
}

/* ─── Animated Counter ─── */
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView && !started) setStarted(true)
  }, [isInView, started])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    let raf: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, end, duration])

  return { count, ref }
}

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { count, ref } = useCountUp(end)
  return (
    <div ref={ref} className="font-heading text-display text-primary tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(8,26,58,0.88) 0%, rgba(8,26,58,0.70) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-primary uppercase text-xs font-sans font-medium tracking-widest mb-6"
        >
          Frecoin Comunicaciones &mdash; Instalaciones Técnicas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-display-xl text-white mb-6"
        >
          Tu Satisfacción es Nuestra{' '}
          <span className="italic text-primary">Prioridad</span> Laboral
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/80 text-base font-sans leading-relaxed max-w-xl mx-auto mb-8"
        >
          Soluciones integrales en infraestructuras tecnológicas para empresas.
          Redes, electricidad, seguridad, SAI y control de acceso en Sant Vicenç dels Horts, Barcelona.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/34614134292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contactar por WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white font-sans font-medium border border-white/30 rounded-full px-5 py-2.5 transition-all hover:bg-white/10"
          >
            <ArrowRight size={18} />
            Solicitar Presupuesto
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} className="text-white animate-bounce-subtle" />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 2: TRUSTED PARTNER BANNER
   ═══════════════════════════════════════════ */
function TrustedPartnerSection() {
  return (
    <section className="bg-beige py-16 lg:py-20">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="lg:w-1/2"
          >
            <SectionTag text="Tu Empresa de Confianza" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Tu socio de confianza en instalaciones técnicas
            </h2>
            <p className="text-text-gray text-base leading-relaxed max-w-md mb-6">
              Más de 20 años instalando redes informáticas, sistemas eléctricos, cámaras de seguridad
              y controles de acceso para empresas y particulares en España. Cada proyecto es un compromiso
              con la calidad y la satisfacción del cliente.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-sans font-medium group"
            >
              Conoce más sobre nosotros
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right column: overlapping images */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:w-1/2 relative h-72 w-full max-w-md"
          >
            <motion.img
              variants={staggerItem}
              src="/trusted-partner-1.jpg"
              alt="Instalación de red empresarial"
              className="absolute top-0 left-0 w-72 h-52 object-cover rounded-xl shadow-lg"
              style={{ transform: 'rotate(-3deg)' }}
            />
            <motion.img
              variants={staggerItem}
              src="/trusted-partner-2.jpg"
              alt="Sistema de cámaras de seguridad"
              className="absolute top-8 right-0 w-72 h-52 object-cover rounded-xl shadow-lg"
              style={{ transform: 'rotate(3deg)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 3: WHY CHOOSE FRECOIN
   ═══════════════════════════════════════════ */
const featureCards = [
  {
    icon: Users,
    title: 'Experiencia y Profesionalidad',
    description:
      'Más de 20 años con un enfoque técnico sólido en cada instalación. Conocemos cada detalle del sector para garantizarte el mejor resultado.',
  },
  {
    icon: Target,
    title: 'Soluciones a Medida',
    description:
      'Adaptamos cada proyecto a las necesidades reales de cada cliente, sin soluciones genéricas. Escuchamos, analizamos y ejecutamos con precisión.',
  },
  {
    icon: Zap,
    title: 'Fiabilidad y Continuidad',
    description:
      'Garantizamos el correcto funcionamiento de tus sistemas a largo plazo, con materiales de primera calidad y una instalación impecable.',
  },
  {
    icon: CheckCircle,
    title: 'Atención Cercana y Rápida',
    description:
      'Respuesta eficaz ante cualquier incidencia. Somos un equipo cercano que se implica de verdad con cada cliente y cada proyecto.',
  },
  {
    icon: Shield,
    title: 'Cumplimiento de Normativa',
    description:
      'Todas nuestras instalaciones cumplen con la normativa eléctrica y técnica vigente en España, garantizando seguridad y durabilidad.',
  },
]

function WhyChooseSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <SectionTag text="Por Qué Elegirnos" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark max-w-3xl">
            Soluciones técnicas con{' '}
            <span className="italic text-primary">garantía</span>, rapidez y profesionalidad
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mt-4">
            Combinamos experiencia, tecnología actualizada y atención personalizada para
            ofrecerte el mejor resultado en cada instalación.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12"
        >
          {featureCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] transition-all duration-400 ease-smooth hover:-translate-y-1 hover:shadow-lg group"
            >
              <card.icon size={32} className="text-primary mb-5" strokeWidth={2.5} />
              <h3 className="font-sans text-xl font-medium text-text-dark mb-3">
                {card.title}
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 4: STATS BAR
   ═══════════════════════════════════════════ */
function StatsSection() {
  return (
    <section className="bg-dark-green py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeLeft}
            className="lg:w-[55%] relative"
          >
            <img
              src="/about-solar-farm.jpg"
              alt="Equipo técnico Frecoin"
              className="w-full aspect-[4/3] object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 bg-primary text-white font-sans font-semibold rounded-lg px-4 py-2 text-sm">
              20+ Años
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeRight}
            className="lg:w-[45%]"
          >
            <SectionTag text="Nuestra Trayectoria" />
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
              Más de 20 años{' '}
              <span className="italic text-primary">conectando</span> empresas y particulares
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Llevamos más de dos décadas completando proyectos de instalación en España, aportando
              conectividad, seguridad y eficiencia operativa. En FRECOIN, cada proyecto
              es único y lo tratamos con la máxima dedicación.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center border border-white text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-white hover:text-dark-green"
            >
              Sobre Nosotros
            </Link>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="mt-12 bg-darker-green rounded-xl px-6 md:px-10 py-8 shadow-xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0"
        >
          <div className="flex-1 text-center md:px-6">
            <Counter end={500} suffix="+" />
            <p className="text-white/60 text-sm font-sans mt-1">Instalaciones Completadas</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border-dark" />
          <div className="flex-1 text-center md:px-6">
            <Counter end={20} suffix="+" />
            <p className="text-white/60 text-sm font-sans mt-1">Años de Experiencia</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border-dark" />
          <div className="flex-1 text-center md:px-6">
            <Counter end={200} suffix="+" />
            <p className="text-white/60 text-sm font-sans mt-1">Clientes Satisfechos</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 5: MISSION & VISION
   ═══════════════════════════════════════════ */
function MissionVisionSection() {
  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionTag text="Nuestro Propósito" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            Comprometidos con la{' '}
            <span className="italic text-primary">Conectividad</span> y la Seguridad
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Mission Card */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl p-10 border border-[#e5e7eb] relative overflow-hidden"
          >
            <span className="absolute top-2 right-4 font-heading text-[120px] font-bold text-primary/10 leading-none select-none">
              01
            </span>
            <div className="relative z-10">
              <Target size={32} className="text-primary mb-4" />
              <h3 className="font-heading text-3xl text-text-dark mb-4">Nuestra Misión</h3>
              <p className="text-text-gray text-base leading-relaxed">
                En FRECOIN llevamos más de 20 años ofreciendo soluciones integrales en infraestructuras
                tecnológicas para empresas. Aseguramos la continuidad operativa de nuestros clientes
                con un servicio de alta calidad, adaptado a sus necesidades reales.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl p-10 border border-[#e5e7eb] relative overflow-hidden"
          >
            <span className="absolute top-2 right-4 font-heading text-[120px] font-bold text-primary/10 leading-none select-none">
              02
            </span>
            <div className="relative z-10">
              <Eye size={32} className="text-primary mb-4" />
              <h3 className="font-heading text-3xl text-text-dark mb-4">Nuestra Visión</h3>
              <p className="text-text-gray text-base leading-relaxed">
                Nos especializamos en instalaciones de redes informáticas, sistemas eléctricos y SAI,
                garantizando infraestructuras seguras, eficientes y fiables para empresas y
                particulares en Sant Vicenç dels Horts y el área metropolitana de Barcelona.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 6: BRANDS / PARTNERS MARQUEE
   ═══════════════════════════════════════════ */
const partnerLogos = [
  { name: 'Cisco', src: '/partner-aora-roots.svg' },
  { name: 'TP-Link', src: '/partner-orbit-inc.svg' },
  { name: 'Legrand', src: '/partner-house-pixel.svg' },
  { name: 'Hikvision', src: '/partner-practista.svg' },
  { name: 'Dahua', src: '/partner-garden-inc.svg' },
  { name: 'Ubiquiti', src: '/partner-solar-tech.svg' },
]

function PartnersMarqueeSection() {
  const allPartners = [...partnerLogos, ...partnerLogos]

  return (
    <section className="bg-darker-green py-16">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20 mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-heading text-3xl lg:text-4xl text-white">
            Marcas con las que{' '}
            <span className="italic text-primary">trabajamos</span>
          </h2>
          <p className="text-white/60 text-base mt-3 max-w-xl mx-auto">
            Instalamos y configuramos equipos de los principales fabricantes del sector
            para garantizar la máxima calidad y fiabilidad.
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {allPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 mx-12 h-10 flex items-center gap-3"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-6 w-auto opacity-50 brightness-0 invert"
              />
              <span className="text-white/50 font-heading text-lg font-medium tracking-wide">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 7: OUR SERVICES
   ═══════════════════════════════════════════ */
const services = [
  {
    num: '01',
    title: 'Redes Informáticas',
    image: '/service-1.jpg',
    description:
      'Montaje de redes informáticas eficientes y seguras, asegurando conectividad rápida y fiable para tu empresa.',
    highlight: true,
  },
  {
    num: '02',
    title: 'Instalaciones Eléctricas',
    image: '/service-2.jpg',
    description:
      'Ejecución de instalaciones eléctricas seguras y eficientes, desde el cableado hasta los cuadros y sistemas de protección.',
    highlight: false,
  },
  {
    num: '03',
    title: 'Cámaras de Videovigilancia',
    image: '/service-3.jpg',
    description:
      'Montaje de sistemas de cámaras de seguridad para control y vigilancia eficaz de tus instalaciones.',
    highlight: false,
  },
  {
    num: '04',
    title: 'Antenas WiFi',
    image: '/service-4.jpg',
    description:
      'Montaje de antenas WiFi para asegurar cobertura y conexión inalámbrica eficiente en cualquier espacio.',
    highlight: false,
  },
  {
    num: '05',
    title: 'SAI — Alimentación Ininterrumpida',
    image: '/service-5.jpg',
    description:
      'Montaje de sistemas SAI para asegurar continuidad eléctrica y protección de equipos ante cortes de suministro.',
    highlight: false,
  },
  {
    num: '06',
    title: 'Controles de Acceso',
    image: '/service-6.jpg',
    description:
      'Instalación de sistemas de control de acceso para la seguridad y gestión de entradas en instalaciones.',
    highlight: false,
  },
]

function ServicesSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <SectionTag text="Nuestros Servicios" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark max-w-3xl">
            Instalaciones técnicas{' '}
            <span className="italic text-primary">profesionales</span> para tu empresa y hogar
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mt-4">
            Desde el diseño hasta la puesta en marcha, ofrecemos soluciones completas
            adaptadas a las necesidades de cada cliente.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center mt-6 border border-primary text-primary font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-primary hover:text-white"
          >
            Ver Todos los Servicios
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.num}
              variants={staggerItem}
              className={`bg-white rounded-xl overflow-hidden group transition-all duration-400 ease-smooth hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] ${service.highlight ? 'border-2 border-primary shadow-[0_4px_16px_rgba(0,82,255,0.12)]' : 'border border-[#e5e7eb]'}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 font-heading text-5xl text-primary/15 font-bold">
                  {service.num}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-sans text-xl font-medium text-text-dark mb-2">
                  {service.title}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-primary font-sans font-medium text-sm group/link"
                >
                  Más información
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 8: PROJECTS SHOWCASE
   ═══════════════════════════════════════════ */
const projects = [
  {
    title: 'Nave Industrial en Polígono',
    category: 'Industrial',
    image: '/project-1.jpg',
    stats: ['Redes + Cámaras', '1.200 m²'],
  },
  {
    title: 'Oficinas Corporativas',
    category: 'Empresarial',
    image: '/project-2.jpg',
    stats: ['WiFi Mesh', 'Control Acceso'],
  },
  {
    title: 'Comunidad de Vecinos',
    category: 'Residencial',
    image: '/project-3.jpg',
    stats: ['Videovigilancia', '12 viviendas'],
  },
  {
    title: 'Local Comercial',
    category: 'Comercial',
    image: '/project-4.jpg',
    stats: ['Red informática', 'TPV integrado'],
  },
  {
    title: 'Hogar Inteligente',
    category: 'Domótica',
    image: '/project-5.jpg',
    stats: ['Automatización', 'Seguridad 24h'],
  },
  {
    title: 'Centro Logístico',
    category: 'Industrial',
    image: '/project-6.jpg',
    stats: ['Cableado estructurado', '5.000 m²'],
  },
]

function ProjectsSection() {
  return (
    <section className="bg-dark-green py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <SectionTag text="Nuestros Proyectos" />
          <h2 className="font-heading text-4xl lg:text-5xl text-white max-w-3xl">
            Instalaciones reales para{' '}
            <span className="italic text-primary">empresas y particulares</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mt-4">
            Cada proyecto es un compromiso de calidad. Aquí tienes una muestra
            de nuestros trabajos más destacados.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center mt-6 border border-white text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-white hover:text-dark-green"
          >
            Ver Todos los Proyectos
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,58,0.85)] via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-full px-3 py-1">
                {project.category}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-sans text-xl font-medium text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-xs text-white/80 bg-white/15 rounded-full px-2.5 py-1 font-sans"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 9: IMPACT SECTION
   ═══════════════════════════════════════════ */
function ImpactSection() {
  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Big words */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:w-1/2"
          >
            <motion.h2
              variants={fadeLeft}
              className="font-heading text-display text-dark-green"
            >
              Conectividad
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-heading text-display text-dark-green"
            >
              Seguridad
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-heading text-display text-primary italic"
            >
              Confianza
            </motion.h2>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeRight}
            className="lg:w-1/2"
          >
            <SectionTag text="Nuestro Impacto" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Infraestructura tecnológica que{' '}
              <span className="italic text-primary">transforma</span> tu negocio
            </h2>
            <p className="text-text-gray text-base leading-relaxed mb-6">
              Más de 20 años trabajando para que la tecnología sea un activo, no un problema.
              Nuestro trabajo no es solo tender cables — es construir la infraestructura
              sobre la que funciona tu empresa día a día.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <Network size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Más de 500 proyectos de red completados con éxito
                </span>
              </motion.div>
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <Shield size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Protección activa para más de 200 empresas y comunidades
                </span>
              </motion.div>
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <Users size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Clientes satisfechos en toda España con garantía de calidad
                </span>
              </motion.div>
            </motion.div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-sans font-medium mt-6 group"
            >
              Conoce nuestra trayectoria
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 10: TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Gerente, Empresa Logística · Madrid',
    avatar: '/testimonial-avatar-1.jpg',
    quote:
      'Frecoin instaló toda la red informática de nuestra nueva nave en tiempo récord. Trabajo impecable, muy profesionales y la red funciona a la perfección desde el primer día. 100% recomendables.',
  },
  {
    name: 'Ana R.',
    role: 'Propietaria, Local Comercial · Barcelona',
    avatar: '/testimonial-avatar-2.jpg',
    quote:
      'Nos instalaron un sistema de cámaras y control de acceso que transformó la seguridad de nuestro negocio. Rápidos, limpios y con un precio muy competitivo. Quedé encantada con el resultado.',
  },
  {
    name: 'Roberto F.',
    role: 'Administrador de Fincas · Valencia',
    avatar: '/testimonial-avatar-3.jpg',
    quote:
      'Llevaba tiempo buscando una empresa seria para instalar videovigilancia en nuestra comunidad. Con Frecoin encontramos profesionalidad y un servicio post-venta excelente. Sin duda volvería a contratarles.',
  },
]

function TestimonialsSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center"
        >
          <SectionTag text="Testimonios" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            Lo que dicen{' '}
            <span className="italic text-primary">nuestros clientes</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb]"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary mb-4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-star fill-star" />
                ))}
              </div>
              <p className="text-text-dark text-base leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-sans font-medium text-text-dark text-sm">{t.name}</p>
                  <p className="font-sans text-text-gray text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 11: FAQ ACCORDION
   ═══════════════════════════════════════════ */
const faqItems = [
  {
    question: '¿Qué tipo de clientes son sus habituales?',
    answer:
      'Trabajamos con todo tipo de clientes: pequeñas y medianas empresas, comunidades de vecinos, locales comerciales, naves industriales, oficinas y particulares. Adaptamos cada solución a las necesidades específicas de cada proyecto.',
  },
  {
    question: '¿Cuánto tiempo tarda una instalación de red?',
    answer:
      'Depende del alcance del proyecto. Una instalación de red para una oficina pequeña puede realizarse en 1-2 días. Proyectos más grandes en naves o edificios corporativos pueden requerir entre 1 y 2 semanas. Siempre acordamos el plazo antes de comenzar.',
  },
  {
    question: '¿Ofrecéis garantía en las instalaciones?',
    answer:
      'Sí. Todos nuestros trabajos incluyen 2 años de garantía en materiales y mano de obra. Además, ofrecemos contratos de mantenimiento preventivo para que su instalación esté siempre en perfecto estado.',
  },
  {
    question: '¿Podéis trabajar fuera de horario para no interrumpir mi negocio?',
    answer:
      'Por supuesto. Nos adaptamos a las necesidades de cada cliente. Realizamos instalaciones en horario nocturno, fines de semana o por fases para minimizar el impacto en la actividad de su empresa.',
  },
  {
    question: '¿Trabajáis en toda España?',
    answer:
      'Tenemos capacidad de desplazamiento a nivel nacional. Contáctanos indicando la ubicación de tu proyecto y te informaremos sin compromiso sobre disponibilidad y plazos.',
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeLeft}
            className="lg:w-[40%]"
          >
            <SectionTag text="FAQ" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Preguntas{' '}
              <span className="italic text-primary">Frecuentes</span>
            </h2>
            <p className="text-text-gray text-base leading-relaxed mb-6">
              Respondemos a las dudas más habituales sobre nuestros servicios de instalación.
              Si tienes alguna pregunta más, no dudes en contactarnos.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,82,255,0.3)]"
            >
              Contáctanos
            </Link>
          </motion.div>

          {/* Right column: Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:w-[60%]"
          >
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="border-b border-[#e5e7eb]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="font-sans font-medium text-text-dark text-base pr-4">
                    {item.question}
                  </span>
                  <span className="text-primary shrink-0">
                    {openIndex === i ? <X size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? 'auto' : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-text-gray text-base leading-relaxed pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 12: CTA BANNER
   ═══════════════════════════════════════════ */
function CTABannerSection() {
  return (
    <section
      className="relative py-20"
      style={{
        background:
          'radial-gradient(circle at center, rgba(0,82,255,0.08) 0%, transparent 70%), #081A3A',
      }}
    >
      <div className="px-5 md:px-8 lg:px-16 xl:px-20 max-w-2xl mx-auto text-center">
        {/* Team avatars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex justify-center mb-6"
        >
          <div className="flex -space-x-3">
            {[
              '/testimonial-avatar-1.jpg',
              '/testimonial-avatar-2.jpg',
              '/testimonial-avatar-3.jpg',
              '/testimonial-avatar-1.jpg',
            ].map((src, i) => (
              <motion.img
                key={i}
                variants={staggerItem}
                src={src}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-darker-green"
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
            ¿Listo para mejorar tu{' '}
            <span className="italic text-primary">infraestructura tecnológica?</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Solicita un presupuesto gratuito sin compromiso. Analizamos tu situación
            y te proponemos la solución más eficiente y adaptada a tu presupuesto.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-8 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,82,255,0.3)]"
          >
            Solicitar Presupuesto Gratis
          </Link>
          <p className="text-white/40 text-xs font-sans uppercase tracking-wider mt-4">
            Sin compromiso &bull; Respuesta en 24h
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 13: BLOG PREVIEW
   ═══════════════════════════════════════════ */
const blogPosts = [
  {
    title: 'WiFi 6 para empresas: qué necesitas saber',
    category: 'Tecnología',
    date: '28 Abr 2026',
    excerpt:
      'Descubre cómo el estándar WiFi 6 mejora la velocidad y cobertura en entornos empresariales con muchos dispositivos conectados simultáneamente.',
    image: '/blog-1.jpg',
  },
  {
    title: 'Cámaras IP vs. analógicas: ¿cuál elegir para tu negocio?',
    category: 'Guía',
    date: '20 Abr 2026',
    excerpt:
      'Comparativa completa entre sistemas de videovigilancia analógicos e IP para ayudarte a tomar la mejor decisión de seguridad para tu empresa.',
    image: '/blog-2.jpg',
  },
  {
    title: 'Control de acceso biométrico: seguridad sin llaves',
    category: 'Seguridad',
    date: '12 Abr 2026',
    excerpt:
      'Exploramos las ventajas del control de acceso por huella o reconocimiento facial frente a sistemas tradicionales de tarjeta y código PIN.',
    image: '/blog-3.jpg',
  },
]

function BlogPreviewSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <SectionTag text="Noticias y Recursos" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
              Actualidad en{' '}
              <span className="italic text-primary">tecnología</span> e instalaciones
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-sans font-medium group shrink-0"
          >
            Ver todos los artículos
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={staggerItem}
              className="bg-white rounded-xl overflow-hidden border border-[#e5e7eb] group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary text-white text-xs font-sans font-semibold rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="text-text-gray text-xs font-sans">{post.date}</span>
                </div>
                <h3 className="font-sans text-lg font-medium text-text-dark group-hover:text-primary transition-colors duration-300 mb-2">
                  {post.title}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedPartnerSection />
      <WhyChooseSection />
      <StatsSection />
      <MissionVisionSection />
      <PartnersMarqueeSection />
      <ServicesSection />
      <ProjectsSection />
      <ImpactSection />
      <TestimonialsSection />
      <FAQSection />
      <CTABannerSection />
      <BlogPreviewSection />
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  Leaf,
  Users,
  Zap,
  PlayCircle,
  ChevronDown,
  ArrowRight,
  Target,
  Eye,
  Home as HomeIcon,
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

/* ─── Section Tag Component ─── */
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
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
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
          background: 'linear-gradient(135deg, rgba(8,26,58,0.82) 0%, rgba(8,26,58,0.65) 100%)',
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
          Auron &mdash; Solar &amp; Renewable Energy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-display-xl text-white mb-6"
        >
          Powering a{' '}
          <span className="italic text-primary">Sustainable</span> Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/80 text-base font-sans leading-relaxed max-w-xl mx-auto mb-8"
        >
          We provide innovative solar and renewable energy solutions that reduce your
          carbon footprint while cutting energy costs for homes and businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
          >
            Get Started
          </Link>
          <button className="inline-flex items-center gap-2 text-white font-sans font-medium border border-white/30 rounded-full px-5 py-2.5 transition-all hover:bg-white/10">
            <PlayCircle size={18} />
            Watch Our Story
          </button>
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
            <SectionTag text="Your Trusted Partner" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Your trusted partner in renewable energy solutions
            </h2>
            <p className="text-text-gray text-base leading-relaxed max-w-md mb-6">
              For over a decade, we&apos;ve been at the forefront of the clean energy
              revolution, helping thousands of homeowners and businesses transition to
              sustainable power.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-sans font-medium group"
            >
              Learn More About Us
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
              alt="Residential solar installation"
              className="absolute top-0 left-0 w-72 h-52 object-cover rounded-xl shadow-lg"
              style={{ transform: 'rotate(-3deg)' }}
            />
            <motion.img
              variants={staggerItem}
              src="/trusted-partner-2.jpg"
              alt="Commercial solar installation"
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
   SECTION 3: WHY CHOOSE AURON
   ═══════════════════════════════════════════ */
const featureCards = [
  {
    icon: Leaf,
    title: 'Eco-Friendly & Sustainable',
    description:
      'Our solutions are designed with the environment in mind, using recyclable materials and processes that minimize ecological impact while maximizing energy output.',
  },
  {
    icon: Users,
    title: 'Expert Team & Quality Services',
    description:
      'Our certified technicians bring over 10 years of hands-on experience in solar installation, maintenance, and energy consulting, ensuring every project meets the highest standards.',
  },
  {
    icon: Zap,
    title: 'Smart & Efficient Energy',
    description:
      'We leverage cutting-edge smart technology to optimize your energy consumption, providing real-time monitoring and AI-driven insights that maximize efficiency and savings.',
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
          <SectionTag text="Why Choose Us" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark max-w-3xl">
            Empowering a{' '}
            <span className="italic text-primary">Sustainable</span> Future with
            Cutting-Edge Renewable Energy Solutions
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mt-4">
            We combine expertise, innovation, and a commitment to sustainability to
            deliver energy solutions that make a real difference.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
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
              alt="Solar farm"
              className="w-full aspect-[4/3] object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 bg-primary text-white font-sans font-semibold rounded-lg px-4 py-2 text-sm">
              10+ Years
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
            <SectionTag text="Leading the Revolution" />
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
              Leading the{' '}
              <span className="italic text-primary">Clean Energy</span> Revolution
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              We&apos;ve helped thousands of clients make the switch to renewable energy,
              reducing carbon emissions and creating a more sustainable future for
              generations to come.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center border border-white text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-white hover:text-dark-green"
            >
              About Us
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
            <Counter end={50} suffix="k+" />
            <p className="text-white/60 text-sm font-sans mt-1">Tons of CO2 Saved</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border-dark" />
          <div className="flex-1 text-center md:px-6">
            <Counter end={500} suffix="+" />
            <p className="text-white/60 text-sm font-sans mt-1">Successful Installations</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-border-dark" />
          <div className="flex-1 text-center md:px-6">
            <Counter end={10} suffix="+" />
            <p className="text-white/60 text-sm font-sans mt-1">Years of Excellence</p>
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
          <SectionTag text="Our Purpose" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            Driven by Purpose,{' '}
            <span className="italic text-primary">Powered</span> by Innovation
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
              <h3 className="font-heading text-3xl text-text-dark mb-4">Our Mission</h3>
              <p className="text-text-gray text-base leading-relaxed">
                To accelerate the world&apos;s transition to sustainable energy by making
                solar power accessible, affordable, and efficient for every home and
                business. We believe clean energy is not just an alternative — it&apos;s
                the future.
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
              <h3 className="font-heading text-3xl text-text-dark mb-4">Our Vision</h3>
              <p className="text-text-gray text-base leading-relaxed">
                A world where 100% of energy comes from renewable sources. We envision
                communities powered by the sun, independent from fossil fuels, with
                every rooftop contributing to a cleaner, greener planet.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 6: PARTNERS LOGO MARQUEE
   ═══════════════════════════════════════════ */
const partnerLogos = [
  { name: 'Aora Roots', src: '/partner-aora-roots.svg' },
  { name: 'Orbit Inc', src: '/partner-orbit-inc.svg' },
  { name: 'House Pixel', src: '/partner-house-pixel.svg' },
  { name: 'Practista', src: '/partner-practista.svg' },
  { name: 'The Garden Inc', src: '/partner-garden-inc.svg' },
  { name: 'SolarTech', src: '/partner-solar-tech.svg' },
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
            Trusted by <span className="italic text-primary">Industry Leaders</span>
          </h2>
          <p className="text-white/60 text-base mt-3 max-w-xl mx-auto">
            We&apos;ve partnered with leading organizations to deliver exceptional
            renewable energy solutions.
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {allPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 mx-12 h-10 flex items-center"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-8 w-auto opacity-60 brightness-0 invert hover:opacity-100 transition-opacity duration-300"
              />
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
    title: 'Solar Panel Installation',
    image: '/service-1.jpg',
    description:
      'Expert installation of high-efficiency solar panels for residential and commercial properties.',
  },
  {
    num: '02',
    title: 'Energy Storage Solutions',
    image: '/service-2.jpg',
    description:
      'Cutting-edge battery systems that store excess energy for use when you need it most.',
  },
  {
    num: '03',
    title: 'Consultation & Maintenance',
    image: '/service-3.jpg',
    description:
      'Comprehensive energy audits and ongoing maintenance to keep your system running at peak.',
  },
  {
    num: '04',
    title: 'EV Charging Stations',
    image: '/service-4.jpg',
    description:
      'Professional installation of EV charging stations for homes and businesses.',
  },
  {
    num: '05',
    title: 'Hybrid Solar Systems',
    image: '/service-5.jpg',
    description:
      'Combined solar and wind solutions for maximum energy independence.',
  },
  {
    num: '06',
    title: 'Energy Efficiency Audits',
    image: '/service-6.jpg',
    description:
      'Detailed assessments to identify opportunities for reducing energy consumption.',
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
          <SectionTag text="Our Services" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark max-w-3xl">
            Powering the Future with{' '}
            <span className="italic text-primary">Renewable Energy</span> Solutions
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mt-4">
            From installation to maintenance, we offer comprehensive solar and renewable
            energy services tailored to your needs.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center mt-6 border border-primary text-primary font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-primary hover:text-white"
          >
            View All Services
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
              className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden group transition-all duration-400 ease-smooth hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
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
                  Learn More
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
    title: 'Riverside Warehouse Complex',
    category: 'Commercial',
    image: '/project-1.jpg',
    stats: ['145kW system', '$42,000 savings/year'],
  },
  {
    title: 'Oakwood Family Residence',
    category: 'Residential',
    image: '/project-2.jpg',
    stats: ['8.5kW + Powerwall', '$3,200 savings/year'],
  },
  {
    title: 'Metro Center Parking',
    category: 'Commercial',
    image: '/project-3.jpg',
    stats: ['Solar carport', '89kW'],
  },
  {
    title: 'Highland Retreat Cabin',
    category: 'Off-grid',
    image: '/project-4.jpg',
    stats: ['5.2kW', 'Battery backup'],
  },
  {
    title: 'Willowbrook Community Solar',
    category: 'Community',
    image: '/project-5.jpg',
    stats: ['320kW', 'Shared garden'],
  },
  {
    title: 'Desert Plains Solar Farm',
    category: 'Utility',
    image: '/project-6.jpg',
    stats: ['2.4MW', 'Industrial array'],
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
          <SectionTag text="Our Projects" />
          <h2 className="font-heading text-4xl lg:text-5xl text-white max-w-3xl">
            Transforming Homes &amp; Businesses with{' '}
            <span className="italic text-primary">Solar Energy</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mt-4">
            Explore our portfolio of successful installations that have helped clients
            save money and reduce their environmental impact.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center mt-6 border border-white text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-white hover:text-dark-green"
          >
            View All Projects
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,58,0.85)] via-transparent to-transparent" />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-full px-3 py-1">
                {project.category}
              </span>
              {/* Content */}
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
              Footprint
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-heading text-display text-dark-green"
            >
              Independence
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-heading text-display text-primary italic"
            >
              Communities
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
            <SectionTag text="Our Impact" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Making a Difference for the{' '}
              <span className="italic text-primary">Planet</span>
            </h2>
            <p className="text-text-gray text-base leading-relaxed mb-6">
              Every solar panel we install contributes to a larger mission — reducing
              carbon emissions, promoting energy independence, and building sustainable
              communities. Our work goes beyond business; it&apos;s about creating a legacy
              of environmental stewardship.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <Leaf size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Reduced carbon footprint by 50,000+ tons
                </span>
              </motion.div>
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <HomeIcon size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Enabled energy independence for 500+ clients
                </span>
              </motion.div>
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <Users size={20} className="text-primary shrink-0" />
                <span className="text-text-dark text-sm font-sans">
                  Strengthened 50+ local communities
                </span>
              </motion.div>
            </motion.div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-sans font-medium mt-6 group"
            >
              Learn About Our Impact
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
    name: 'Marcus T.',
    role: 'Homeowner, Austin TX',
    avatar: '/testimonial-avatar-1.jpg',
    quote:
      "Auron transformed our home into an energy-efficient powerhouse. Our electricity bill dropped by 85% in the first month, and the installation team was professional, punctual, and incredibly thorough. Best investment we've ever made.",
  },
  {
    name: 'Sarah K.',
    role: 'Business Owner, Denver CO',
    avatar: '/testimonial-avatar-2.jpg',
    quote:
      "We were skeptical about the ROI for our small business, but Auron proved us wrong. The commercial solar system they designed has cut our operational costs by 60%, and our customers love that we're now a green business.",
  },
  {
    name: 'David L.',
    role: 'Property Manager, Portland OR',
    avatar: '/testimonial-avatar-3.jpg',
    quote:
      "Managing 12 properties, energy costs were our biggest headache. Auron designed a scalable solution that works across all our buildings. Their maintenance team is responsive, and the monitoring dashboard is incredibly intuitive.",
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
          <SectionTag text="Testimonials" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            Real Experiences,{' '}
            <span className="italic text-primary">Real Impact</span>
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
    question: 'How much can I save with solar panels?',
    answer:
      'On average, homeowners save between 50–90% on their electricity bills after installing solar panels. The exact savings depend on your energy usage, local electricity rates, system size, and available sunlight. Most systems pay for themselves within 5–8 years.',
  },
  {
    question: 'How long does the installation process take?',
    answer:
      'A typical residential installation takes 1–3 days, while commercial projects may take 1–2 weeks. The entire process — from initial consultation to system activation — usually spans 4–8 weeks, including permitting and utility approval.',
  },
  {
    question: 'What maintenance do solar panels require?',
    answer:
      'Solar panels require minimal maintenance. We recommend an annual cleaning and inspection to ensure optimal performance. Our monitoring system alerts us to any issues automatically, and our maintenance team handles all repairs under warranty.',
  },
  {
    question: 'Do solar panels work on cloudy days?',
    answer:
      'Yes, solar panels continue to generate electricity on cloudy days, typically at 10–25% of their rated capacity. Modern panels are increasingly efficient in low-light conditions, and battery storage systems ensure you have power even during extended cloudy periods.',
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer multiple financing options including cash purchase, solar loans with competitive rates, leases, and power purchase agreements (PPAs). Our team will help you find the option that best fits your budget and energy goals.',
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
              Frequently Asked <span className="italic text-primary">Questions</span>
            </h2>
            <p className="text-text-gray text-base leading-relaxed mb-6">
              Have questions about solar energy? We&apos;ve compiled answers to the most
              common inquiries to help you make an informed decision.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
            >
              Contact Us
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
          'radial-gradient(circle at center, rgba(16,185,129,0.08) 0%, transparent 70%), #081A3A',
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
            Ready to Switch to <span className="italic text-primary">Solar?</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Join thousands of satisfied customers who have made the switch to clean,
            renewable energy. Get your free consultation and personalized quote today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-8 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
          >
            Get a Free Quote
          </Link>
          <p className="text-white/40 text-xs font-sans uppercase tracking-wider mt-4">
            No commitment required &bull; Free site assessment
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
    title: 'The Future of Solar Technology in 2025',
    category: 'Technology',
    date: 'Dec 15, 2024',
    excerpt:
      'Discover the breakthrough innovations shaping the next generation of solar panels, from perovskite cells to bifacial technology.',
    image: '/blog-1.jpg',
  },
  {
    title: 'How to Maximize Your Solar Investment',
    category: 'Guide',
    date: 'Dec 10, 2024',
    excerpt:
      'Learn expert strategies to get the most out of your solar panel system, from optimal placement to smart energy storage solutions.',
    image: '/blog-2.jpg',
  },
  {
    title: 'Wind vs. Solar: Choosing the Right Renewable Energy',
    category: 'Insights',
    date: 'Dec 5, 2024',
    excerpt:
      'A comprehensive comparison of wind and solar energy to help you determine which renewable solution fits your property and budget.',
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
            <SectionTag text="Latest News" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
              Stay Updated on{' '}
              <span className="italic text-primary">Renewable Energy</span> Trends
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-sans font-medium group shrink-0"
          >
            View All Posts
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
   HOME PAGE - All Sections
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

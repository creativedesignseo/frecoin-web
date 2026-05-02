import { motion } from 'framer-motion'
import { Network, Zap, Camera, Wifi, Battery, Shield, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Network,
    title: 'Redes Informáticas',
    desc: 'Diseño, instalación y mantenimiento de redes cableadas e inalámbricas seguras y eficientes.',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
  },
  {
    icon: Zap,
    title: 'Instalaciones Eléctricas',
    desc: 'Instalaciones eléctricas en baja tensión para empresas, oficinas e industrias.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Camera,
    title: 'Cámaras de Videovigilancia',
    desc: 'Sistemas de CCTV IP para la protección de personas, bienes e instalaciones.',
    color: 'text-brand-teal',
    bg: 'bg-brand-teal/10',
  },
  {
    icon: Wifi,
    title: 'Antenas WiFi',
    desc: 'Cobertura WiFi profesional de alta densidad para espacios corporativos y entornos exigentes.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Battery,
    title: 'SAI',
    desc: 'Sistemas de alimentación ininterrumpida para garantizar la continuidad de tu negocio.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    icon: Shield,
    title: 'Controles de Acceso',
    desc: 'Soluciones de control de accesos para una gestión segura y eficiente de entradas.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-navy-800 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(26,107,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">SERVICIOS</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Soluciones tecnológicas
            <br />
            para cada necesidad
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Cubrimos todas las infraestructuras que tu empresa necesita, con profesionales especializados y garantía de calidad.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="glass rounded-2xl p-7 group hover:border-brand-blue/30 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-5`}>
                <s.icon className={`${s.color} w-6 h-6`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{s.desc}</p>
              <span className="flex items-center gap-1.5 text-brand-blue text-sm font-medium group-hover:gap-3 transition-all duration-200">
                Ver más <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

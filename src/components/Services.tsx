import { motion } from 'framer-motion'
import { Network, Zap, Camera, Wifi, Battery, Shield, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Network,
    title: 'Redes Informáticas',
    desc: 'Diseño, instalación y mantenimiento de redes cableadas e inalámbricas seguras y eficientes.',
  },
  {
    icon: Zap,
    title: 'Instalaciones Eléctricas',
    desc: 'Instalaciones eléctricas en baja tensión para empresas, oficinas e industrias.',
  },
  {
    icon: Camera,
    title: 'Cámaras de Videovigilancia',
    desc: 'Sistemas de CCTV IP para la protección de personas, bienes e instalaciones.',
  },
  {
    icon: Wifi,
    title: 'Antenas WiFi',
    desc: 'Cobertura WiFi profesional de alta densidad para espacios corporativos y entornos exigentes.',
  },
  {
    icon: Battery,
    title: 'SAI',
    desc: 'Sistemas de alimentación ininterrumpida para garantizar la continuidad de tu negocio.',
  },
  {
    icon: Shield,
    title: 'Controles de Acceso',
    desc: 'Soluciones de control de accesos para una gestión segura y eficiente de entradas.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-brand-teal text-xs font-bold uppercase tracking-[0.2em] mb-3">
            SERVICIOS
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-900 leading-tight">
            Soluciones tecnológicas
            <br />
            para cada necesidad
          </h2>
        </motion.div>

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
              className="card-light rounded-2xl p-7 group cursor-pointer"
            >
              <s.icon className="text-brand-blue w-9 h-9 mb-5" strokeWidth={1.6} />
              <h3 className="text-navy-900 font-bold text-lg mb-2.5">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                Ver más <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import NetworkCanvas from './NetworkCanvas'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-blue/[0.06] via-brand-teal/[0.04] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[560px]">
          {/* Left column – text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-[64px] font-extrabold text-navy-900 leading-[1.05] tracking-tight mb-6"
            >
              Infraestructura
              <br />
              tecnológica que{' '}
              <span className="text-gradient">conecta</span>
              <br />
              tu negocio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-500 text-base lg:text-lg leading-relaxed mb-10 max-w-xl"
            >
              Soluciones integrales en redes, electricidad, seguridad y
              conectividad para empresas que exigen rendimiento, continuidad y
              confianza.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#contacto" className="btn-primary text-base px-7 py-3.5">
                Solicita asesoramiento
                <ArrowRight size={18} />
              </a>
              <a
                href="#servicios"
                className="text-navy-900 font-semibold text-sm flex items-center gap-2 group"
              >
                Conoce nuestros servicios
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </div>

          {/* Right column – animated network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.04] to-brand-teal/[0.04]" />
            <NetworkCanvas />
            {/* Decorative globe overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] rounded-full border border-brand-blue/10" />
              <div className="absolute w-[60%] h-[60%] rounded-full border border-brand-blue/15" />
              <div className="absolute w-[40%] h-[40%] rounded-full border border-brand-teal/15" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

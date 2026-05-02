import { motion } from 'framer-motion'
import NetworkCanvas from './NetworkCanvas'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-teal/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-brand-blue/10 rounded-full blur-2xl" />
      </div>

      {/* Network canvas */}
      <NetworkCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse" />
            <span className="text-brand-teal text-sm font-medium">Infraestructuras Tecnológicas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Soluciones integrales en redes, electricidad, seguridad y conectividad
            para empresas que exigen rendimiento, continuidad y confianza.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contacto" className="btn-primary text-base px-8 py-4">
              Solicita asesoramiento
              <ArrowRight size={18} />
            </a>
            <a href="#servicios" className="btn-outline text-base px-8 py-4">
              Conoce nuestros servicios
            </a>
          </motion.div>

          {/* Animated counters row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
          >
            {[
              { value: '+150', label: 'Proyectos realizados' },
              { value: '+80', label: 'Clientes activos' },
              { value: '24/7', label: 'Soporte técnico' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-white/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  )
}

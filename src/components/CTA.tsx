import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contacto" className="py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 lg:p-16"
        >
          <div className="w-16 h-16 bg-brand-blue/15 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <MessageSquare className="text-brand-blue w-8 h-8" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            ¿Tienes un proyecto
            <br />
            <span className="text-gradient">en mente?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
            Hablemos de cómo podemos ayudarte a construir una infraestructura sólida, segura y preparada para el futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@frecoin.es"
              className="btn-primary text-base px-10 py-4"
            >
              Solicita asesoramiento <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/34936020365"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-base px-10 py-4"
            >
              WhatsApp directo
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-sm">
            <span>📍 Sant Vicenç dels Horts, Barcelona</span>
            <span className="hidden sm:block">·</span>
            <span>✉️ info@frecoin.es</span>
            <span className="hidden sm:block">·</span>
            <span>📞 +34 936 02 03 65</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

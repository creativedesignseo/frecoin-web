import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-12 lg:p-14 text-center shadow-sm"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-900 mb-3 leading-tight">
            ¿Tienes un proyecto
            <br />
            <span className="text-gradient">en mente?</span>
          </h2>
          <p className="text-gray-500 text-base mb-8 max-w-md mx-auto">
            Hablemos de cómo podemos ayudarte a construir una infraestructura sólida, segura y preparada para el futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:info@frecoin.es"
              className="btn-primary text-base px-8 py-3.5"
            >
              Solicita asesoramiento
              <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/34936020365"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark-outline text-base px-8 py-3.5"
            >
              WhatsApp directo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

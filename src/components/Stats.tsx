import { motion } from 'framer-motion'
import { BarChart3, Users, Clock } from 'lucide-react'

const stats = [
  { icon: BarChart3, value: '+150', label: 'Proyectos realizados con éxito' },
  { icon: Users, value: '+80', label: 'Clientes que confían en nuestro trabajo' },
  { icon: Clock, value: 'Soporte 24/7', label: 'Atención técnica siempre que la necesites' },
]

export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-navy-900 rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl shadow-navy-900/15"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-5 px-8 py-7">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <s.icon className="text-brand-light w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                <p className="text-white/55 text-xs mt-1 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

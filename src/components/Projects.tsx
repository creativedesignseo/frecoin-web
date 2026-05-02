import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Edificio Corporativo – Barcelona',
    category: 'Redes y electricidad',
    tags: ['Redes', 'Eléctrica'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    title: 'Nave Industrial – Girona',
    category: 'Instalación eléctrica y SAI',
    tags: ['SAI', 'Eléctrica'],
    image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=600&q=80',
  },
  {
    title: 'Centro Comercial – Tarragona',
    category: 'Videovigilancia y control de accesos',
    tags: ['CCTV', 'Accesos'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="py-28 bg-navy-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">
            PROYECTOS DESTACADOS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white max-w-lg">
              Tecnología que transforma sectores
            </h2>
            <a href="#contacto" className="btn-outline self-start lg:self-auto">
              Ver todos los proyectos <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-brand-teal/30 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="bg-brand-blue/80 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-base">{p.title}</h3>
                  <p className="text-white/50 text-sm mt-1">{p.category}</p>
                </div>
                <ArrowRight className="text-white/30 group-hover:text-brand-teal transition-colors duration-200 flex-shrink-0" size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Edificio Corporativo – Barcelona',
    category: 'Redes y electricidad',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    title: 'Nave Industrial – Girona',
    category: 'Instalación eléctrica y SAI',
    image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80',
  },
  {
    title: 'Centro Comercial – Tarragona',
    category: 'Videovigilancia y control de accesos',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-brand-teal text-xs font-bold uppercase tracking-[0.2em] mb-3">
            PROYECTOS DESTACADOS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-900 max-w-xl leading-tight">
              Tecnología que transforma sectores
            </h2>
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
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-xl hover:shadow-navy-900/10 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-navy-900 font-bold text-base">{p.title}</h3>
                <p className="text-gray-500 text-sm mt-1.5">{p.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

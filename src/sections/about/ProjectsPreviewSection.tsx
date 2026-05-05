import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Riverside Warehouse Complex',
    category: 'Commercial',
    image: '/project-1.jpg',
    stats: ['145kW', '$42,000 savings/year'],
  },
  {
    title: 'Oakwood Family Residence',
    category: 'Residential',
    image: '/project-2.jpg',
    stats: ['8.5kW', '$3,200 savings/year'],
  },
  {
    title: 'Metro Center Parking',
    category: 'Commercial',
    image: '/project-3.jpg',
    stats: ['Solar carport', '89kW'],
  },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

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

export default function ProjectsPreviewSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <SectionTag text="Featured Projects" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark max-w-2xl">
              See Our Work in{' '}
              <span className="italic text-primary">Action</span>
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-primary font-sans font-medium group shrink-0"
            >
              View All Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
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

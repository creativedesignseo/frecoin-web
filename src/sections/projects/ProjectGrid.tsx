import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Category = 'All' | 'Residential' | 'Commercial' | 'Community' | 'Utility'

interface Project {
  id: number
  title: string
  category: Category
  image: string
  stats: string[]
}

const categories: Category[] = ['All', 'Residential', 'Commercial', 'Community', 'Utility']

const projects: Project[] = [
  {
    id: 1,
    title: 'Riverside Warehouse Complex',
    category: 'Commercial',
    image: '/project-1.jpg',
    stats: ['145kW system', '$42,000 savings/year'],
  },
  {
    id: 2,
    title: 'Oakwood Family Residence',
    category: 'Residential',
    image: '/project-2.jpg',
    stats: ['8.5kW + Powerwall', '$3,200 savings/year'],
  },
  {
    id: 3,
    title: 'Metro Center Parking',
    category: 'Commercial',
    image: '/project-3.jpg',
    stats: ['Solar carport', '89kW'],
  },
  {
    id: 4,
    title: 'Highland Retreat Cabin',
    category: 'Residential',
    image: '/project-4.jpg',
    stats: ['Off-grid', '5.2kW + battery backup'],
  },
  {
    id: 5,
    title: 'Willowbrook Community Solar',
    category: 'Community',
    image: '/project-5.jpg',
    stats: ['320kW shared garden'],
  },
  {
    id: 6,
    title: 'Desert Plains Solar Farm',
    category: 'Utility',
    image: '/project-6.jpg',
    stats: ['2.4MW industrial array'],
  },
]

/* ─── Project Card ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        y: { duration: 0.7, ease: easeSmooth, delay: index * 0.08 },
        opacity: { duration: 0.5, ease: easeSmooth, delay: index * 0.08 },
        layout: { duration: 0.4, ease: easeSmooth },
      }}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,58,0.85)] via-[rgba(8,26,58,0.3)] to-transparent transition-opacity duration-500 group-hover:from-[rgba(8,26,58,0.92)] group-hover:via-[rgba(8,26,58,0.4)]" />
      </div>

      {/* Category Badge */}
      <span className="absolute top-4 left-4 bg-[#10b981] text-white text-xs font-medium uppercase tracking-wider font-sans rounded-full px-3 py-1">
        {project.category}
      </span>

      {/* View Details — appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="inline-flex items-center gap-1.5 text-white font-sans text-sm font-medium">
          View Details
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-heading text-white text-xl md:text-2xl leading-tight">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2.5">
          {project.stats.map((stat) => (
            <span
              key={stat}
              className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs font-sans font-medium rounded-full px-2.5 py-1"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Grid Section ─── */
export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section ref={sectionRef} className="bg-[#F6F8FB] py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: easeSmooth }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`font-sans text-base rounded-full px-5 py-2 transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? 'bg-[#10b981] text-white font-medium'
                  : 'text-[#6b7280] hover:text-[#2A3441]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

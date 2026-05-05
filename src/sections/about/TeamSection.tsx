import { motion } from 'framer-motion'

const teamMembers = [
  { name: 'James Mitchell', role: 'Founder & CEO', image: '/team-1.jpg' },
  { name: 'Emily Chen', role: 'Operations Director', image: '/team-2.jpg' },
  { name: 'Michael Torres', role: 'Lead Engineer', image: '/team-3.jpg' },
  { name: 'Sarah Williams', role: 'Sustainability Analyst', image: '/team-4.jpg' },
  { name: 'Robert Kim', role: 'Senior Technician', image: '/team-5.jpg' },
  { name: 'Lisa Anderson', role: 'Client Relations Manager', image: '/team-6.jpg' },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function TeamSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-primary inline-block" />
            <span className="text-primary uppercase text-xs font-sans font-medium tracking-widest">
              Our Team
            </span>
            <span className="w-6 h-[2px] bg-primary inline-block" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            The Experts Behind Your{' '}
            <span className="italic text-primary">Sustainable</span> Future
          </h2>
          <p className="text-text-gray text-base leading-relaxed mt-4">
            Meet the dedicated professionals who make Auron's mission possible.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,58,0.9)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Name & Role */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-smooth">
                <h3 className="font-sans text-lg font-medium text-white">{member.name}</h3>
                <p className="text-white/70 text-sm font-sans">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

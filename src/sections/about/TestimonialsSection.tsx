import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Homeowner',
    avatar: '/testimonial-avatar-1.jpg',
    quote:
      "Auron transformed our home into an energy-efficient powerhouse. Our electricity bill dropped by 85% in the first month, and the installation team was professional, punctual, and incredibly thorough. Best investment we've ever made.",
  },
  {
    name: 'Sarah K.',
    role: 'Business Owner',
    avatar: '/testimonial-avatar-2.jpg',
    quote:
      "We were skeptical about the ROI for our small business, but Auron proved us wrong. The commercial solar system they designed has cut our operational costs by 60%, and our customers love that we're now a green business.",
  },
  {
    name: 'David L.',
    role: 'Property Manager',
    avatar: '/testimonial-avatar-3.jpg',
    quote:
      "Managing 12 properties, energy costs were our biggest headache. Auron designed a scalable solution that works across all our buildings. Their maintenance team is responsive, and the monitoring dashboard is incredibly intuitive.",
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

export default function TestimonialsSection() {
  return (
    <section className="bg-dark-green py-20 lg:py-24">
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
              Testimonials
            </span>
            <span className="w-6 h-[2px] bg-primary inline-block" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl text-white">
            What Our <span className="italic text-primary">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="bg-darker-green rounded-xl p-8 border border-border-dark"
            >
              {/* Quote Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary mb-4">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-star fill-star" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 text-base leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Avatar */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-sans font-medium text-white text-sm">{t.name}</p>
                  <p className="font-sans text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

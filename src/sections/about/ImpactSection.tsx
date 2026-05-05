import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const impactItems = [
  'Planted 10,000+ trees through our Green Initiative',
  'Sponsored 25 community solar education workshops',
  'Partnered with 15 local environmental nonprofits',
  'Achieved carbon-neutral operations in 2023',
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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

export default function ImpactSection() {
  return (
    <section className="bg-darker-green py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:w-1/2"
          >
            <SectionTag text="Our Impact" />
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
              Creating a{' '}
              <span className="italic text-primary">Greener</span> World, One Panel at a Time
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Our commitment to sustainability goes beyond installations. We actively participate in community education programs, partner with environmental organizations, and advocate for renewable energy policy at the local and state level.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              {impactItems.map((item) => (
                <motion.li key={item} variants={staggerItem} className="flex items-center gap-3">
                  <Check size={20} className="text-primary shrink-0" strokeWidth={2.5} />
                  <span className="text-white/80 text-base font-sans">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Column: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:w-1/2 relative"
          >
            <img
              src="/project-5.jpg"
              alt="Community solar garden"
              className="rounded-xl w-full aspect-[4/3] object-cover"
            />
            {/* Overlapping secondary image */}
            <img
              src="/project-2.jpg"
              alt="Residential solar installation"
              className="rounded-xl w-32 sm:w-48 aspect-[4/3] object-cover border-4 border-darker-green absolute -bottom-6 -left-4 sm:-left-6 shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

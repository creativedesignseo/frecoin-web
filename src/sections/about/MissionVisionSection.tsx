import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

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
    <div className="flex items-center justify-center gap-2 mb-4">
      <span className="w-6 h-[2px] bg-primary inline-block" />
      <span className="text-primary uppercase text-xs font-sans font-medium tracking-widest">
        {text}
      </span>
      <span className="w-6 h-[2px] bg-primary inline-block" />
    </div>
  )
}

export default function MissionVisionSection() {
  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionTag text="Our Purpose" />
          <h2 className="font-heading text-4xl lg:text-5xl text-text-dark">
            Driven by Purpose,{' '}
            <span className="italic text-primary">Powered</span> by Innovation
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Mission Card */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl p-10 border border-[#e5e7eb] relative overflow-hidden"
          >
            <span className="absolute top-2 right-4 font-heading text-[120px] font-bold text-primary/10 leading-none select-none">
              01
            </span>
            <div className="relative z-10">
              <Target size={32} className="text-primary mb-4" />
              <h3 className="font-heading text-3xl text-text-dark mb-4">Our Mission</h3>
              <p className="text-text-gray text-base leading-relaxed">
                To accelerate the world's transition to sustainable energy by making
                solar power accessible, affordable, and efficient for every home and
                business. We believe clean energy is not just an alternative — it's
                the future.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl p-10 border border-[#e5e7eb] relative overflow-hidden"
          >
            <span className="absolute top-2 right-4 font-heading text-[120px] font-bold text-primary/10 leading-none select-none">
              02
            </span>
            <div className="relative z-10">
              <Eye size={32} className="text-primary mb-4" />
              <h3 className="font-heading text-3xl text-text-dark mb-4">Our Vision</h3>
              <p className="text-text-gray text-base leading-relaxed">
                A world where 100% of energy comes from renewable sources. We envision
                communities powered by the sun, independent from fossil fuels, with
                every rooftop contributing to a cleaner, greener planet.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

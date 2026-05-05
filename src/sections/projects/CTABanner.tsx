import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'

const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#081A3A] py-20">
      <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: easeSmooth }}
          className="font-heading text-[2.5rem] leading-tight text-white"
        >
          Have a Project in{' '}
          <span className="italic text-[#10b981]">Mind?</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: easeSmooth }}
          className="text-white/70 text-base font-sans mt-4"
        >
          Whether it's a residential rooftop or a large-scale commercial installation, we have the expertise to bring your vision to life. Let's discuss your project.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: easeSmooth }}
          className="mt-8"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#10b981] text-white font-sans font-medium text-base rounded-full px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)] group"
          >
            Start Your Project
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

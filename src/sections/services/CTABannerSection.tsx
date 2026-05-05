import { Link } from 'react-router'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function CTABannerSection() {
  return (
    <section
      className="relative py-20 lg:py-24"
      style={{
        background:
          'radial-gradient(circle at center, rgba(16,185,129,0.08) 0%, transparent 70%), #081A3A',
      }}
    >
      <div className="px-5 md:px-8 lg:px-16 xl:px-20 max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
            Ready to Make the <span className="italic text-[#10b981]">Switch?</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Contact our team today for a free consultation and personalized energy assessment. We&apos;ll help you find the perfect renewable energy solution for your needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-8 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
          >
            Get a Free Quote
          </Link>
          <p className="text-white/50 text-base font-sans mt-4">
            Call Us: (555) 123-4567
          </p>
        </motion.div>
      </div>
    </section>
  )
}

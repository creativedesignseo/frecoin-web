import { motion } from 'framer-motion'
import { Link } from 'react-router'

const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Hero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/project-6.jpg"
          alt="Solar farm background"
          className="w-full h-full object-cover opacity-25"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081A3A]/70 to-[#081A3A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 md:px-8">
        {/* Tag */}
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeSmooth }}
          className="inline-block text-[#10b981] text-xs font-medium uppercase tracking-widest font-sans"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#10b981]" />
            Portfolio
          </span>
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: easeSmooth }}
          className="font-heading text-display text-white mt-4"
        >
          Our{' '}
          <span className="italic text-[#10b981]">Projects</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: easeSmooth }}
          className="text-white/70 text-base font-sans max-w-lg mx-auto mt-4"
        >
          Explore our portfolio of successful solar installations that are powering a sustainable future
        </motion.p>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5, ease: easeSmooth }}
          className="mt-6"
        >
          <ol className="flex items-center justify-center gap-2 text-sm font-sans text-white/40">
            <li>
              <Link to="/" className="hover:text-white/70 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-white/70">Projects</li>
          </ol>
        </motion.nav>
      </div>
    </section>
  )
}

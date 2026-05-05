import { motion } from 'framer-motion'
import { Link } from 'react-router'

export default function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/service-1.jpg"
        alt="Solar panel installation"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081A3A]/70 to-[#081A3A]" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto pt-[72px]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#10b981] uppercase text-xs font-sans font-medium tracking-widest mb-4"
        >
          What We Offer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-heading text-display text-white mb-4"
        >
          Our <span className="italic text-[#10b981]">Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/70 text-base font-sans leading-relaxed max-w-lg mx-auto"
        >
          Comprehensive renewable energy solutions tailored to your home or business
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-white/40 text-sm font-sans mt-6"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span>Services</span>
        </motion.nav>
      </div>
    </section>
  )
}

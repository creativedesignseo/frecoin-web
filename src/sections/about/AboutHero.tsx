import { Link } from 'react-router'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-darker-green">
      {/* Background image */}
      <img
        src="/about-solar-farm.jpg"
        alt="Solar farm"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081A3A]/80 to-[#081A3A]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-primary uppercase text-xs font-sans font-medium tracking-widest mb-4"
        >
          About Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-heading text-display-xl text-white"
        >
          The{' '}
          <span className="italic text-primary">Auron</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/70 text-base font-sans leading-relaxed max-w-lg text-center mt-4"
        >
          Pioneering sustainable energy solutions for a cleaner tomorrow
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-6"
        >
          <p className="text-white/40 text-sm font-sans">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {' / '}
            <span className="text-white/60">About Us</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

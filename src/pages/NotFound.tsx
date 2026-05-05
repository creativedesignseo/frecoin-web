import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Home, Phone } from 'lucide-react'

/* ─── Animation helpers ─── */
const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

/* ═══════════════════════════════════════════
   SECTION 1: ERROR CONTENT
   ═══════════════════════════════════════════ */
function ErrorContentSection() {
  return (
    <section className="relative bg-darker-green min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Subtle radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-lg mx-auto flex flex-col items-center">
        {/* 404 Watermark */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute text-[120px] font-bold text-primary/20 font-heading select-none pointer-events-none"
          style={{ top: '0', transform: 'translateY(-30%)' }}
          aria-hidden="true"
        >
          404
        </motion.span>

        {/* Illustration */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          src="/404-illustration.svg"
          alt="404 illustration - disconnected solar panel"
          className="w-[200px] h-[200px] mb-8"
          style={{ filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.15))' }}
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: easeSmooth }}
          className="font-heading text-4xl text-white text-center mt-6"
        >
          Oops! Page Not <span className="italic text-primary">Found</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: easeSmooth }}
          className="text-white/60 text-base leading-relaxed text-center max-w-md mx-auto mt-4"
        >
          The page you&apos;re looking for seems to have wandered off into the sun. It might have been
          moved, renamed, or never existed. But don&apos;t worry — we&apos;ve got plenty of other great
          content for you to explore.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: easeSmooth }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white font-sans font-medium rounded-full px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white text-white font-sans font-medium rounded-full px-6 py-3 transition-all duration-300 hover:bg-white hover:text-darker-green"
          >
            <Phone size={18} />
            Contact Support
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: easeSmooth }}
          className="mt-12"
        >
          <p className="text-white/40 text-sm font-sans text-center">
            Or try these popular pages:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-primary font-sans text-base hover:underline transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   404 NOT FOUND PAGE
   ═══════════════════════════════════════════ */
export default function NotFound() {
  return (
    <div>
      <ErrorContentSection />
    </div>
  )
}

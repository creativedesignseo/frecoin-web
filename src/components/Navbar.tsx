import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros', path: '/about' },
  { label: 'Servicios', path: '/services' },
  { label: 'Proyectos', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contacto', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-dark-green/95 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 md:px-8 lg:px-16 xl:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/imagotipo-frecoin.png"
              alt="FRECOIN"
              className="h-8 w-auto"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
            />
            <span className="font-heading text-xl tracking-tight leading-none">
              <span className="text-white">frecoin</span>
              <span className="text-primary"> comunicaciones</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-white font-sans text-base font-medium group"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-transform duration-300 origin-left ${
                    location.pathname === link.path
                      ? 'w-full scale-x-100'
                      : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center bg-primary text-white font-sans font-medium text-sm rounded-full px-6 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,82,255,0.3)]"
          >
            Solicitar Presupuesto
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-darker-green flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className="text-white font-sans text-2xl font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-8 py-3"
                  onClick={() => setMobileOpen(false)}
                >
                  Solicitar Presupuesto
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

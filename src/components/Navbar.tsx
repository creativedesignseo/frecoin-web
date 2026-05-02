import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sectores', href: '#sectores' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-light flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-blue/30">
            F
          </div>
          <div>
            <span className="text-navy-900 font-bold text-xl tracking-tight">frecoin</span>
            <p className="text-gray-400 text-[9px] uppercase tracking-widest leading-none mt-0.5">
              Infraestructuras Tecnológicas
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-navy-900/70 hover:text-navy-900 text-sm font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <a href="#contacto" className="btn-primary">
            Solicita asesoramiento
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-navy-900 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-navy-900/80 hover:text-navy-900 text-base font-medium py-2 border-b border-gray-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="btn-primary mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              Solicita asesoramiento
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

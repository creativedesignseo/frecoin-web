import { MapPin, Globe, Mail, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">frecoin</span>
              <p className="text-white/40 text-[9px] uppercase tracking-widest leading-none">
                Infraestructuras Tecnológicas
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-teal" />
              Sant Vicenç dels Horts, Barcelona, España
            </span>
            <a href="https://www.frecoin.es" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Globe size={14} className="text-brand-blue" />
              www.frecoin.es
            </a>
            <a href="mailto:info@frecoin.es" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Mail size={14} className="text-brand-blue" />
              info@frecoin.es
            </a>
            <a href="tel:+34936020365" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Phone size={14} className="text-brand-teal" />
              +34 936 02 03 65
            </a>
          </div>

          <p className="text-white/30 text-sm">
            © 2024 Frecoin Infraestructuras Tecnológicas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

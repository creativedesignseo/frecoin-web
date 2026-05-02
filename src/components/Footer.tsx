import { MapPin, Globe, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">frecoin</span>
              <p className="text-white/40 text-[9px] uppercase tracking-widest leading-none mt-0.5">
                Infraestructuras Tecnológicas
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-teal" />
              Sant Vicenç dels Horts, Barcelona, España
            </span>
            <a href="https://www.frecoin.es" className="flex items-center gap-2 hover:text-white transition-colors">
              <Globe size={14} className="text-brand-light" />
              www.frecoin.es
            </a>
            <a href="mailto:info@frecoin.es" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-brand-light" />
              info@frecoin.es
            </a>
            <a href="tel:+34936020365" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} className="text-brand-teal" />
              +34 936 02 03 65
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/40 text-xs">
            © 2024 Frecoin Infraestructuras Tecnológicas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

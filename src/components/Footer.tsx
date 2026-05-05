import { Link } from 'react-router'
import { ArrowRight, Facebook, Instagram, Linkedin } from 'lucide-react'

const quickLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros', path: '/about' },
  { label: 'Servicios', path: '/services' },
  { label: 'Proyectos', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contacto', path: '/contact' },
]

const legalLinks = [
  { label: 'Preguntas Frecuentes', path: '/#faq' },
  { label: 'Aviso Legal', path: '/aviso-legal' },
  { label: 'Política de Privacidad', path: '/privacidad' },
  { label: 'Política de Cookies', path: '/cookies' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-green">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Newsletter + Logo */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img
                src="/imagotipo-frecoin.png"
                alt="FRECOIN"
                className="h-8 w-auto"
                style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              />
              <span className="font-heading text-lg tracking-tight leading-none">
                <span className="text-white">frecoin</span>
                <span className="text-primary"> com.</span>
              </span>
            </Link>
            <h4 className="text-white font-sans text-base font-medium mb-4">Recibe nuestras novedades</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 bg-[#162B4D] border border-border-dark text-white rounded-full px-5 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-white/40"
              />
              <button
                className="ml-2 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 transition-all hover:shadow-[0_4px_12px_rgba(0,82,255,0.3)]"
                aria-label="Suscribirse"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-3">
              Al suscribirte, aceptas nuestra Política de Privacidad.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Navegación</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-sans relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Información Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-sans relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Contacto</h4>
            <ul className="space-y-3 text-white/60 text-sm font-sans">
              <li>España</li>
              <li>
                <a href="mailto:lfreire@frecoin.es" className="hover:text-white transition-colors">
                  lfreire@frecoin.es
                </a>
              </li>
              <li>
                <a href="https://frecoin.es" className="hover:text-white transition-colors">
                  frecoin.es
                </a>
              </li>
              <li>Lun–Vie: 8:00 – 18:00</li>
            </ul>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border-dark text-center">
          <p className="text-white/50 text-sm font-sans">
            &copy; 2026 FRECOIN Comunicaciones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

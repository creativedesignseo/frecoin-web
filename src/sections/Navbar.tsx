import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { services } from '@/data/services';

interface NavLink {
  label: string;
  href: string;
  isRoute: boolean;
  hasDropdown?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'INICIO', href: '/', isRoute: true },
  { label: 'SERVICIOS', href: '#servicios', isRoute: false, hasDropdown: true },
  { label: 'SOBRE NOSOTROS', href: '/sobre-nosotros', isRoute: true },
  { label: 'TRABAJOS', href: '#trabajos', isRoute: false },
  { label: 'CONTACTO', href: '#contacto', isRoute: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (link: NavLink) => {
    if (link.isRoute) return location.pathname === link.href;
    if (link.hasDropdown && location.pathname.startsWith('/servicios/')) return true;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (link.isRoute) return;
    e.preventDefault();
    setMobileOpen(false);
    setMobileServicesOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/' + link.href;
      return;
    }
    const el = document.querySelector(link.href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-white shadow-sm">
      <div className="container-gripz flex items-center justify-between w-full">
        <Link to="/" className="flex items-center">
          <img src="/assets/logo-frecoin-dark.png" alt="FRECOIN Comunicaciones — instalaciones tecnológicas para empresas" width={3647} height={1400} className="h-[48px] lg:h-[52px] w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link);

            // Item con dropdown (Servicios)
            if (link.hasDropdown) {
              return (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center gap-1 text-[13px] font-semibold tracking-[0.05em] transition-colors h-20 ${
                      active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                  </a>

                  {/* Dropdown panel (sin iconos — diseño limpio y sobrio) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-gripz-gray-200 overflow-hidden w-[300px]">
                      <div className="p-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/servicios/${service.slug}`}
                            className="block p-3 rounded-lg transition-colors hover:bg-gripz-cream"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-montserrat font-bold text-[13px] text-gripz-black leading-tight">
                                {service.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-gripz-gray-600 leading-snug mt-1 line-clamp-2">
                              {service.tagline === 'Servicio estrella' ? 'Conectividad rápida, segura y fiable' : service.heroParagraph.split('.')[0] + '.'}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gripz-gray-200 px-4 py-3 bg-gripz-cream">
                        <a
                          href="#servicios"
                          onClick={(e) => handleNavClick(e, link)}
                          className="text-[12px] font-semibold text-gripz-primary hover:underline"
                        >
                          Ver todos los servicios →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Item Link normal
            if (link.isRoute) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center gap-1 text-[13px] font-semibold tracking-[0.05em] transition-colors ${
                    active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            }

            // Item ancla (Sobre nosotros, Trabajos, Contacto)
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`flex items-center gap-1 text-[13px] font-semibold tracking-[0.05em] transition-colors ${
                  active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-4">
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, { label: 'PRESUPUESTO', href: '#contacto', isRoute: false })}
            className="btn-primary text-[13px] py-3 px-5 flex items-center gap-2"
          >
            PRESUPUESTO
          </a>
          <a href="tel:+34614134292" className="flex items-center gap-2 border border-gripz-primary rounded px-4 py-3">
            <Phone size={14} className="text-gripz-primary" />
            <span className="text-[13px] font-medium text-gripz-primary">614 134 292</span>
          </a>
        </div>

        <button
          className="xl:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gripz-gray-200 xl:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container-gripz py-6 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);

              // Item con dropdown en mobile (Servicios — acordeón)
              if (link.hasDropdown) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`flex items-center justify-between w-full text-sm font-semibold transition-colors py-3 ${
                        active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 pb-2 flex flex-col gap-1 border-l border-gripz-gray-200 ml-1">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/servicios/${service.slug}`}
                            onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                            className="flex items-center gap-2 py-2.5 text-[13px] text-gripz-gray-800 hover:text-gripz-primary transition-colors"
                          >
                            <span className="font-medium">{service.name}</span>
                          </Link>
                        ))}
                        <a
                          href="#servicios"
                          onClick={(e) => handleNavClick(e, link)}
                          className="text-[12px] font-semibold text-gripz-primary py-2 mt-1"
                        >
                          Ver todos →
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.isRoute) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-semibold transition-colors py-3 ${
                      active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-semibold transition-colors py-3 ${
                    active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, { label: 'PRESUPUESTO', href: '#contacto', isRoute: false })}
              className="btn-primary w-fit mt-3"
            >
              PRESUPUESTO
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

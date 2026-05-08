import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Search, Menu, X, ChevronDown, Zap } from 'lucide-react';

const navLinks = [
  { label: 'INICIO', href: '/', isRoute: true },
  { label: 'SERVICIOS', href: '#servicios', isRoute: false },
  { label: 'SOBRE NOSOTROS', href: '#sobre-nosotros', isRoute: false },
  { label: 'TRABAJOS', href: '#trabajos', isRoute: false },
  { label: 'CONTACTO', href: '/contacto', isRoute: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (link: typeof navLinks[0]) => {
    if (link.isRoute) return location.pathname === link.href;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isRoute) return;
    e.preventDefault();
    setMobileOpen(false);
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
          <img src="/assets/logo-frecoin-dark.png" alt="frecoin comunicaciones" className="h-[48px] lg:h-[52px] w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link);
            if (link.isRoute) {
              return (
                <Link key={link.label} to={link.href} className={`flex items-center gap-1 text-[13px] font-semibold tracking-[0.05em] transition-colors ${active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'}`}>
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link)} className={`flex items-center gap-1 text-[13px] font-semibold tracking-[0.05em] transition-colors ${active ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'}`}>
                {link.label}
                <ChevronDown size={12} />
              </a>
            );
          })}
          <button className="w-8 h-8 rounded-full border border-gripz-gray-200 flex items-center justify-center hover:border-gripz-primary transition-colors">
            <Search size={14} />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/contacto" className="btn-primary text-[13px] py-3 px-5 flex items-center gap-2">
            PRESUPUESTO <Zap size={14} className="fill-white" />
          </Link>
          <a href="tel:+34614134292" className="flex items-center gap-2 border border-gripz-primary rounded px-4 py-3">
            <Phone size={14} className="text-gripz-primary" />
            <span className="text-[13px] font-medium text-gripz-primary">614 134 292</span>
          </a>
        </div>

        <button className="lg:hidden w-10 h-10 flex items-center justify-center" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gripz-gray-200 lg:hidden">
          <div className="container-gripz py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.isRoute) {
                return (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className={`text-sm font-semibold transition-colors py-2 ${isActive(link) ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'}`}>
                    {link.label}
                  </Link>
                );
              }
              return (
                <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link)} className={`text-sm font-semibold transition-colors py-2 ${isActive(link) ? 'text-gripz-primary' : 'text-gripz-black hover:text-gripz-primary'}`}>
                  {link.label}
                </a>
              );
            })}
            <Link to="/contacto" onClick={() => setMobileOpen(false)} className="btn-primary w-fit mt-2">
              PRESUPUESTO <Zap size={14} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

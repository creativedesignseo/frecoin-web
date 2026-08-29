import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import FooterCTA from '@/sections/FooterCTA';
import { usePageMeta } from '@/hooks/usePageMeta';
import { services } from '@/data/services';

/**
 * Página 404 real.
 *
 * Sustituye al antiguo catch-all `<Navigate to="/" />`, que devolvía la home
 * con estado 200 para cualquier URL inventada (soft 404 masivo). El HTML de
 * esta página se prerenderiza a `dist/404.html` y Apache lo sirve mediante
 * `ErrorDocument 404 /404.html` — con el código de estado 404 correcto.
 */
export default function NotFound() {
  usePageMeta({
    title: 'Página no encontrada (404) | FRECOIN',
    description: 'La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio o consulta nuestros servicios.',
    canonical: 'https://frecoin.es/404',
    noindex: true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gripz-cream border-b border-gripz-gray-200">
        <div className="container-gripz">
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary mb-5">
              Error 404
            </p>
            <h1 className="font-montserrat font-extrabold text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-gripz-black mb-5">
              Esta página no existe.
            </h1>
            <p className="text-[16px] lg:text-[17px] leading-[1.65] text-gripz-gray-600 mb-8 max-w-xl">
              Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.
              Desde aquí puedes volver al inicio o ir directamente al servicio que buscabas.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link to="/" className="btn-primary flex items-center gap-2">
                <Home size={16} /> Volver al inicio
              </Link>
              <Link
                to="/sobre-nosotros"
                className="inline-flex items-center gap-2 border border-gripz-black text-gripz-black px-6 py-3.5 rounded text-sm font-semibold hover:bg-gripz-black hover:text-white transition-colors"
              >
                Sobre nosotros
              </Link>
            </div>

            <h2 className="font-montserrat font-bold text-[20px] text-gripz-black mb-5">
              Nuestros servicios
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/servicios/${s.slug}`}
                    className="group flex items-center justify-between gap-3 bg-white border border-gripz-gray-200 rounded-xl px-5 py-4 hover:border-gripz-primary/40 hover:shadow-md transition-all"
                  >
                    <span className="font-montserrat font-bold text-[15px] text-gripz-black">{s.name}</span>
                    <ArrowRight size={16} className="text-gripz-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <FooterCTA />
    </div>
  );
}

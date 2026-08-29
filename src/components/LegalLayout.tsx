import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import FooterCTA from '@/sections/FooterCTA';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { usePageMeta } from '@/hooks/usePageMeta';

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  /** <title> de la página. */
  metaTitle: string;
  /** meta description propia de la página. */
  metaDescription: string;
  /** Path absoluto sin dominio ni barra final, p. ej. "/aviso-legal". */
  path: string;
  children: React.ReactNode;
}

/**
 * Layout común para todas las páginas legales (Aviso Legal,
 * Política de Privacidad, Política de Cookies).
 * Misma navbar y footer que la home, hero corporativo claro,
 * tipografía coherente con el resto del sitio.
 */
export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  metaTitle,
  metaDescription,
  path,
  children,
}: LegalLayoutProps) {
  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    canonical: `https://frecoin.es${path}`,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero pequeño: breadcrumb + título */}
      <header className="pt-32 lg:pt-36 pb-12 lg:pb-16 bg-gripz-cream border-b border-gripz-gray-200">
        <div className="container-gripz">
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" className="flex items-center gap-2 text-[13px] text-gripz-gray-600 mb-6">
            <Link to="/" className="hover:text-gripz-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} className="text-gripz-gray-400" />
            <span className="text-gripz-black font-medium">{title}</span>
          </nav>

          <h1 className="font-montserrat font-extrabold text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-gripz-black mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[16px] text-gripz-gray-600 max-w-2xl">{subtitle}</p>
          )}
          <p className="text-[13px] text-gripz-gray-400 mt-6">
            Última actualización: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Cuerpo del documento legal */}
      <main className="flex-1 py-12 lg:py-20 bg-white">
        <div className="container-gripz">
          <article className="max-w-3xl mx-auto legal-doc">
            {children}
          </article>
        </div>
      </main>

      <FooterCTA />

      <BreadcrumbJsonLd
        crumbs={[{ name: 'Inicio', url: 'https://frecoin.es' }, { name: title }]}
      />
    </div>
  );
}

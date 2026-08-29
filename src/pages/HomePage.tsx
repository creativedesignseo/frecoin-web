import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Numbers from '@/sections/Numbers';
import Services from '@/sections/Services';
import WhyChooseUs from '@/sections/WhyChooseUs';
import About from '@/sections/About';
import WorkGallery from '@/sections/WorkGallery';
import Contacto from '@/sections/Contacto';
import FooterCTA from '@/sections/FooterCTA';
import { usePageMeta } from '@/hooks/usePageMeta';

export const HOME_TITLE = 'Instalaciones tecnológicas para empresas en España | FRECOIN';
export const HOME_DESCRIPTION =
  'Redes, instalaciones eléctricas, cámaras de seguridad, WiFi, SAI y accesos para empresas en toda España. Sede en Barcelona. Presupuesto sin compromiso.';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className="fixed bottom-[88px] right-6 w-11 h-11 rounded-full bg-gripz-black/90 flex items-center justify-center z-40 hover:scale-110 transition-transform shadow-md"
    >
      <ChevronUp size={18} className="text-white" />
    </button>
  );
}

export default function HomePage() {
  usePageMeta({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: 'https://frecoin.es/',
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Numbers />
      <Services />
      <WhyChooseUs />
      <About />
      <WorkGallery />
      <Contacto />
      <FooterCTA />
      <ScrollToTop />
    </div>
  );
}

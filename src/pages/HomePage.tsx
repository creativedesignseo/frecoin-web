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

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gripz-primary flex items-center justify-center z-50 hover:scale-110 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)]">
      <ChevronUp size={20} className="text-white" />
    </button>
  );
}

export default function HomePage() {
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

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import Servicio from './pages/Servicio';
import SobreNosotros from './pages/SobreNosotros';
import Rediseno from './pages/Rediseno';
import NotFound from './pages/NotFound';
import WhatsAppFloat from './components/WhatsAppFloat';
import CookieBanner from './components/CookieBanner';
import { initAnalyticsFromConsent } from './lib/analytics';

export default function App() {
  // Restaura analytics si el usuario ya había aceptado en una sesión previa
  useEffect(() => {
    initAnalyticsFromConsent();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rediseno" element={<Rediseno />} />
        <Route path="/servicios/:slug" element={<Servicio />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        {/* Antiguo /contacto redirige al ancla #contacto de la home */}
        <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
        {/* 404 real: página propia (Apache la sirve vía ErrorDocument /404.html) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}

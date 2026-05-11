import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import Servicio from './pages/Servicio';
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
        <Route path="/servicios/:slug" element={<Servicio />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        {/* Antiguo /contacto redirige al ancla #contacto de la home */}
        <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
        {/* 404 → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}

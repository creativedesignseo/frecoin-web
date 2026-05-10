import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import WhatsAppFloat from './components/WhatsAppFloat';
import CookieBanner from './components/CookieBanner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { enableAnalytics, disableAnalytics } from '@/lib/analytics';

const STORAGE_KEY = 'frecoin_cookie_consent';
const STORAGE_VERSION = '1';

type ConsentValue = 'accepted' | 'rejected';

interface ConsentRecord {
  v: string;          // versión del consentimiento (para invalidar si cambia la política)
  value: ConsentValue;
  at: string;         // ISO timestamp
}

function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.v !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  const record: ConsentRecord = {
    v: STORAGE_VERSION,
    value,
    at: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/**
 * Banner de cookies — RGPD + LSSI compliant.
 * Aparece bottom de la pantalla en la primera visita.
 * Estilo coherente con el resto del sitio: card blanca,
 * borde sutil, sombra suave, paleta brand.
 *
 * Tres acciones: Aceptar todas · Rechazar todas · Más info
 * (esta última lleva a /politica-cookies).
 *
 * Almacena la decisión en localStorage para no volver a preguntar.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      // Pequeño delay para no chocar con la carga inicial
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    writeConsent('accepted');
    enableAnalytics();   // carga GA4/GTM solo ahora
    closeBanner();
  };

  const handleReject = () => {
    writeConsent('rejected');
    disableAnalytics();
    closeBanner();
  };

  const closeBanner = () => {
    setExiting(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className={`fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 lg:p-8 pointer-events-none transition-all duration-300 ${
        exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="max-w-[640px] mx-auto pointer-events-auto bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-gripz-gray-200 overflow-hidden">
        {/* Header con icono y cierre */}
        <div className="flex items-start gap-4 px-6 pt-6 pb-2">
          <Cookie size={28} className="text-gripz-primary flex-shrink-0 mt-1" strokeWidth={2} />
          <div className="flex-1">
            <h3 className="font-montserrat font-bold text-[16px] text-gripz-black leading-tight mb-1">
              Tu privacidad nos importa
            </h3>
            <p className="text-[13px] leading-[1.6] text-gripz-gray-600">
              Utilizamos cookies técnicas necesarias para el funcionamiento del sitio. Puedes aceptar o rechazar el uso de cookies adicionales para análisis. Más información en nuestra{' '}
              <Link to="/politica-cookies" className="text-gripz-primary font-semibold hover:underline">
                Política de Cookies
              </Link>.
            </p>
          </div>
          <button
            onClick={handleReject}
            aria-label="Cerrar y rechazar cookies opcionales"
            className="text-gripz-gray-400 hover:text-gripz-black transition-colors flex-shrink-0 -mt-1 -mr-2 p-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-2 px-6 pb-6 pt-4">
          <button
            onClick={handleAccept}
            className="btn-primary flex-1 justify-center text-[13px] py-3"
          >
            Aceptar todas
          </button>
          <button
            onClick={handleReject}
            className="flex-1 justify-center inline-flex items-center text-[13px] font-semibold text-gripz-black border border-gripz-gray-200 px-6 py-3 rounded transition-colors hover:border-gripz-black"
          >
            Rechazar opcionales
          </button>
        </div>
      </div>
    </div>
  );
}

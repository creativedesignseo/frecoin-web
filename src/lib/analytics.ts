/**
 * Analytics — capa central de GA4 + GTM con respeto al consentimiento RGPD.
 *
 * Cómo funciona:
 * 1. Los IDs se leen de variables de entorno en build time:
 *    - VITE_GTM_ID  (formato: GTM-XXXXXXX) → contenedor Google Tag Manager
 *    - VITE_GA4_ID  (formato: G-XXXXXXXXXX) → propiedad GA4 directa (opcional si ya está en GTM)
 *
 * 2. NO se carga nada hasta que el usuario acepte cookies en el banner.
 *    El banner llama a `enableAnalytics()` cuando el usuario hace clic en "Aceptar todas".
 *
 * 3. Una vez cargado, los eventos se disparan con `trackEvent(name, params)`.
 *    Si el usuario no ha aceptado, los eventos quedan en una cola y se descartan.
 *
 * IDs configurables sin redespliegue: usando variables de entorno en Netlify.
 *
 * Cumple RGPD/ePrivacy: sin consentimiento → sin scripts ni cookies de tracking.
 */

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsEnabled = false;

/**
 * Carga los scripts de GTM y/o GA4. Llamar SOLO tras consentimiento del usuario.
 * Idempotente — si ya está cargado, no hace nada.
 */
export function enableAnalytics(): void {
  if (analyticsEnabled || typeof window === 'undefined') return;

  // dataLayer SIEMPRE existe — los eventos se acumulan aunque GTM tarde en cargar
  window.dataLayer = window.dataLayer || [];

  // Google Tag Manager
  if (GTM_ID) {
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);

    // noscript iframe para cumplir con la implementación oficial de GTM
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  // GA4 directo (solo si no se gestiona vía GTM)
  if (GA4_ID && !GTM_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.gtag = function gtag(...args) {
      (window.dataLayer = window.dataLayer || []).push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, {
      anonymize_ip: true,           // RGPD: anonimiza la IP
      send_page_view: true,
    });
  }

  analyticsEnabled = true;
}

/**
 * Llamar al rechazar cookies o al cambiar el consentimiento.
 * Marca el flag como deshabilitado para que `trackEvent` deje de empujar.
 * Nota: los scripts ya cargados siguen en la página hasta el siguiente refresh,
 * pero `trackEvent` no enviará nuevos hits.
 */
export function disableAnalytics(): void {
  analyticsEnabled = false;
}

/**
 * Dispara un evento al dataLayer (GTM lo procesa y enruta a GA4 + cualquier otro tag).
 * Si no hay consentimiento, no se envía.
 *
 * @example
 *   trackEvent('whatsapp_click', { location: 'hero' });
 *   trackEvent('form_submit', { form_id: 'contacto', value: 1 });
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  (window.dataLayer = window.dataLayer || []).push({
    event: name,
    ...params,
  });
}

/**
 * Helper para eventos de página vista en SPAs (cuando cambia la ruta).
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/**
 * Comprueba si el usuario ya había aceptado cookies en una sesión anterior
 * y habilita analytics en consecuencia.
 *
 * Llamar una vez al cargar la app (App.tsx).
 */
export function initAnalyticsFromConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('frecoin_cookie_consent');
    if (!raw) return;
    const parsed = JSON.parse(raw) as { value?: string };
    if (parsed.value === 'accepted') {
      enableAnalytics();
    }
  } catch {
    // ignore
  }
}

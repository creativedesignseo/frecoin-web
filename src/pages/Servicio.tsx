import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { getServiceBySlug, applyOverride, type ServiceOverride } from '@/data/services';

/**
 * Página de servicio individual: /servicios/:slug
 * - Si el slug no coincide con ningún servicio → redirige a la home con ancla #servicios
 * - Actualiza meta tags dinámicamente (title, description, OG) por servicio
 */
export default function Servicio() {
  const { slug } = useParams<{ slug: string }>();
  const base = slug ? getServiceBySlug(slug) : undefined;
  const [override, setOverride] = useState<ServiceOverride | undefined>(undefined);

  // Cargar overrides editados desde el panel (snapshot). Si falla la red o el
  // snapshot no existe, el servicio sigue mostrándose desde el código (fallback).
  useEffect(() => {
    if (!slug) return;
    let active = true;
    fetch('/assets/services.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: ServiceOverride[]) => {
        if (active && Array.isArray(list)) setOverride(list.find((s) => s.slug === slug));
      })
      .catch(() => { /* sin overrides: se usa el base de services.ts */ });
    return () => { active = false; };
  }, [slug]);

  const service = base ? applyOverride(base, override) : undefined;

  useEffect(() => {
    if (!service) return;
    // Update meta tags dinámicamente (Vite SPA — los meta del index.html se sobreescriben)
    document.title = service.metaTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', service.metaDescription);
    setMeta('meta[property="og:title"]', service.metaTitle);
    setMeta('meta[property="og:description"]', service.metaDescription);
    setMeta('meta[property="og:url"]', `https://frecoin.es/servicios/${service.slug}`);
    setMeta('meta[name="twitter:title"]', service.metaTitle);
    setMeta('meta[name="twitter:description"]', service.metaDescription);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://frecoin.es/servicios/${service.slug}`);

    return () => {
      // Al desmontar volvemos a los meta por defecto de la home
      document.title = 'FRECOIN — Infraestructuras tecnológicas para empresas | Barcelona y Cataluña';
      setMeta('meta[name="description"]', 'FRECOIN: instalaciones de redes informáticas, eléctricas, cámaras de seguridad, WiFi, SAI y controles de acceso. Más de 20 años de experiencia en Barcelona y Cataluña.');
      setMeta('meta[property="og:url"]', 'https://frecoin.es/');
      if (canonical) canonical.setAttribute('href', 'https://frecoin.es/');
    };
  }, [service]);

  if (!service) {
    return <Navigate to="/#servicios" replace />;
  }

  return <ServiceLayout service={service} />;
}

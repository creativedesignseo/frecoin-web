import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { usePageMeta } from '@/hooks/usePageMeta';
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
    fetch(`/assets/services.json?v=${Date.now()}`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: ServiceOverride[]) => {
        if (active && Array.isArray(list)) setOverride(list.find((s) => s.slug === slug));
      })
      .catch(() => { /* sin overrides: se usa el base de services.ts */ });
    return () => { active = false; };
  }, [slug]);

  const service = base ? applyOverride(base, override) : undefined;

  // Metas por ruta (title, description, canonical, OG/Twitter). El prerender
  // de build captura el <head> resultante, así que estos valores también
  // llegan a los bots que no ejecutan JavaScript.
  usePageMeta({
    title: service?.metaTitle ?? 'FRECOIN',
    description: service?.metaDescription ?? '',
    canonical: `https://frecoin.es/servicios/${service?.slug ?? ''}`,
  });

  if (!service) {
    return <Navigate to="/#servicios" replace />;
  }

  return <ServiceLayout service={service} />;
}

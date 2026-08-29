import { useEffect } from 'react';

export interface PageMeta {
  /** <title> and og:title / twitter:title */
  title: string;
  /** meta description + og:description / twitter:description */
  description: string;
  /**
   * Absolute canonical URL, no trailing slash except for the home page.
   * Example: "https://frecoin.es/servicios/sai"
   */
  canonical: string;
  /** Optional absolute og:image override. Falls back to the site default. */
  image?: string;
  /** When true, injects <meta name="robots" content="noindex, nofollow">. */
  noindex?: boolean;
}

const SITE = 'https://frecoin.es';

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Centralised per-route <head> management for the SPA.
 *
 * It is also what the build-time prerenderer captures: `scripts/prerender.mjs`
 * loads each route in headless Chrome after React has run, so whatever this
 * hook writes into <head> ends up baked into the static HTML that Apache
 * serves to crawlers that do not execute JavaScript.
 */
export function usePageMeta({ title, description, canonical, image, noindex }: PageMeta) {
  useEffect(() => {
    const ogImage = image || `${SITE}/assets/logo-frecoin.png`;

    document.title = title;
    setMetaByName('description', description);
    setCanonical(canonical);

    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', canonical);
    setMetaByProperty('og:image', ogImage);

    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', ogImage);

    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      setMetaByName('robots', 'noindex, nofollow');
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, canonical, image, noindex]);
}

export default usePageMeta;

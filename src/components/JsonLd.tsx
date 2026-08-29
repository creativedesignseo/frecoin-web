/**
 * Renders a JSON-LD block. Kept as a component so every structured-data
 * snippet in the app is serialised the same way and so the build-time
 * prerenderer (`scripts/prerender.mjs`) captures it in the static HTML.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface Crumb {
  name: string;
  /** Absolute URL. Omit on the last (current) crumb. */
  url?: string;
}

/** BreadcrumbList JSON-LD mirroring the visual breadcrumbs. */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          ...(c.url ? { item: c.url } : {}),
        })),
      }}
    />
  );
}

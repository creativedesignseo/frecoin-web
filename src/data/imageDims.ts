/**
 * Intrinsic pixel dimensions of the images shipped in /public/assets.
 * Measured with `sips -g pixelWidth -g pixelHeight`.
 *
 * They are rendered as width/height attributes so the browser can reserve
 * the right box before the image loads (CLS). CSS still controls the final
 * displayed size — these attributes only provide the aspect ratio hint.
 *
 * If an image is replaced, re-measure and update its entry here.
 */
export const imageDims: Record<string, { width: number; height: number }> = {
  '/assets/hero-electrician.webp': { width: 1200, height: 801 },
  '/assets/hero-electrician.jpg': { width: 1600, height: 1067 },
  '/assets/about-network-1.webp': { width: 1200, height: 801 },
  '/assets/about-network-1.jpg': { width: 1600, height: 1067 },
  '/assets/about-network-2.webp': { width: 1200, height: 801 },
  '/assets/about-network-2.jpg': { width: 1600, height: 1067 },
  '/assets/luis-avatar-v2.webp': { width: 512, height: 512 },
  '/assets/luis-fundador.webp': { width: 1374, height: 2048 },
  '/assets/logo-frecoin-dark.png': { width: 3647, height: 1400 },
  '/assets/logo-frecoin-light.png': { width: 3647, height: 1400 },
  '/assets/work-camaras-cctv.webp': { width: 1200, height: 1600 },
  '/assets/work-electricas-cuadro.webp': { width: 896, height: 1200 },
  '/assets/work-industrial.jpg': { width: 864, height: 1184 },
  '/assets/work-office-2.webp': { width: 864, height: 1184 },
  '/assets/work-outdoor.jpg': { width: 864, height: 1184 },
  '/assets/work-redes-corporativas.webp': { width: 1600, height: 2405 },
  '/assets/work-wifi-cobertura.webp': { width: 1200, height: 1600 },
  '/assets/services/redes/hero-server-rack.jpg': { width: 1600, height: 1068 },
  '/assets/services/redes/data-center.jpg': { width: 1200, height: 800 },
  '/assets/services/electricas/hero.webp': { width: 1000, height: 1778 },
  '/assets/services/electricas/hero.jpg': { width: 1600, height: 2844 },
  '/assets/services/electricas/benefits.jpg': { width: 1200, height: 2133 },
  '/assets/services/camaras/hero.jpg': { width: 1600, height: 1067 },
  '/assets/services/camaras/benefits.jpg': { width: 1200, height: 1800 },
  '/assets/services/wifi/hero.jpg': { width: 1600, height: 1067 },
  '/assets/services/wifi/benefits.jpg': { width: 1200, height: 800 },
  '/assets/services/sai/hero.webp': { width: 1448, height: 1086 },
  '/assets/services/sai/benefits.webp': { width: 1672, height: 941 },
  '/assets/services/accesos/hero.jpg': { width: 1600, height: 1067 },
  '/assets/services/accesos/benefits.jpg': { width: 1200, height: 801 },
};

/**
 * Returns `{ width, height }` for a known asset, or `{}` when the path is
 * unknown (e.g. an image uploaded from the admin panel) so it can be spread
 * into an <img> without emitting bogus attributes.
 */
export function dimsOf(src: string): { width?: number; height?: number } {
  return imageDims[src] ?? {};
}

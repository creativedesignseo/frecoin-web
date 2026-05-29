import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

/**
 * Icono WiFi tipo "hub": nodo central con ondas WiFi conectado a varios
 * dispositivos. Vectorial y line-style (stroke currentColor) para mantener
 * calidad a cualquier tamaño. API compatible con lucide-react.
 */
const WifiHubIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, strokeWidth = 2, color = 'currentColor', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Conectores nodo central → dispositivos en las esquinas */}
      <path d="M9.6 9.6 6 6" />
      <path d="M14.4 9.6 18 6" />
      <path d="M9.6 14.4 6 18" />
      <path d="M14.4 14.4 18 18" />
      {/* Dispositivos conectados (esquinas) */}
      <rect x="2.5" y="3" width="5" height="3.6" rx="0.8" />
      <rect x="16.5" y="3" width="5" height="3.6" rx="0.8" />
      <rect x="2.5" y="17.4" width="5" height="3.6" rx="0.8" />
      <rect x="16.5" y="17.4" width="5" height="3.6" rx="0.8" />
      {/* Nodo WiFi central: ondas + punto */}
      <path d="M7.6 10.4a6.2 6.2 0 0 1 8.8 0" />
      <path d="M9.5 12.3a3.5 3.5 0 0 1 5 0" />
      <circle cx="12" cy="14.2" r="0.9" fill={color} stroke="none" />
    </svg>
  ),
);

WifiHubIcon.displayName = 'WifiHubIcon';

export default WifiHubIcon;

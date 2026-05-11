/**
 * Catálogo de servicios FRECOIN.
 *
 * Cada servicio tiene su propia landing page en /servicios/[slug] preparada
 * para campañas de Google Ads / Meta Ads y SEO local.
 *
 * Para añadir un nuevo servicio: añade un objeto aquí siguiendo el shape de
 * ServiceData y la página se generará automáticamente vía routing dinámico.
 */
import {
  Wifi, Plug, Camera, Antenna, BatteryCharging, Lock,
  Network, Cable, Settings, ShieldCheck, Headphones, FileSearch,
  Briefcase, Factory, Building2, Store, type LucideIcon
} from 'lucide-react';

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceAudience {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  /** URL slug (debe ser kebab-case, sin acentos) */
  slug: string;
  /** Icono Lucide para representar el servicio (se usa en home, navbar, hero, etc.) */
  icon: LucideIcon;
  /** Nombre comercial (aparece en H1) */
  name: string;
  /** Si es el servicio estrella (Redes Informáticas) */
  featured?: boolean;

  // --- SEO ---
  /** title HTML — máx 60 caracteres (Google muestra ~58) */
  metaTitle: string;
  /** meta description — máx 160 caracteres */
  metaDescription: string;
  /** keywords para meta keywords + Schema */
  keywords: string[];

  // --- Hero ---
  /** Frase tagline corta debajo del breadcrumb (badge) */
  tagline: string;
  /** Headline principal del hero (H1) — más largo que name, más comercial */
  heroH1: string;
  /** Párrafo del hero (1-2 frases de propuesta de valor) */
  heroParagraph: string;
  /** Imagen del hero (path desde public/) */
  heroImage: string;
  /** Texto alt de la imagen */
  heroImageAlt: string;

  // --- ¿Qué incluye? ---
  includesTitle: string;
  includes: ServiceFeature[];

  // --- ¿A quién va dirigido? ---
  audienceTitle: string;
  audience: ServiceAudience[];

  // --- Beneficios / por qué nosotros ---
  benefitsTitle: string;
  benefits: ServiceFeature[];
  /** Imagen para la sección beneficios */
  benefitsImage: string;
  benefitsImageAlt: string;

  // --- Proceso de trabajo ---
  processTitle: string;
  process: ServiceProcessStep[];

  // --- FAQ específica del servicio ---
  faqTitle: string;
  faq: ServiceFAQ[];

  // --- CTA final ---
  ctaTitle: string;
  ctaSubtitle: string;
}

// ============================================================================
// REDES INFORMÁTICAS — Servicio estrella
// ============================================================================

const redesInformaticas: ServiceData = {
  slug: 'redes-informaticas',
  icon: Wifi,
  name: 'Redes Informáticas',
  featured: true,

  // SEO
  metaTitle: 'Instalación de redes informáticas en Barcelona | FRECOIN',
  metaDescription: 'Diseño, instalación y mantenimiento de redes informáticas para empresas en Sant Vicenç dels Horts y área metropolitana sur de Barcelona. Más de 20 años de experiencia.',
  keywords: [
    'redes informáticas',
    'instalación red empresa',
    'cableado estructurado',
    'red corporativa',
    'wifi empresarial',
    'Sant Vicenç dels Horts',
    'Barcelona',
    'redes Cat6',
    'firewall empresa',
  ],

  // Hero
  tagline: 'Servicio estrella',
  heroH1: 'Redes informáticas para empresas que no pueden permitirse caer.',
  heroParagraph: 'Diseñamos, instalamos y mantenemos redes corporativas estables, rápidas y seguras. Cableado estructurado, configuración de routers y switches, Wi-Fi empresarial y soporte continuo.',
  heroImage: '/assets/services/redes/hero-server-rack.jpg',
  heroImageAlt: 'Rack de servidores con iluminación azul en sala técnica',

  // ¿Qué incluye?
  includesTitle: '¿Qué incluye nuestro servicio de redes?',
  includes: [
    {
      icon: Cable,
      title: 'Cableado estructurado',
      description: 'Diseño y tendido de cableado Cat 6/6A/7 con etiquetado, certificación y documentación profesional.',
    },
    {
      icon: Network,
      title: 'Routers, switches y firewalls',
      description: 'Configuración de hardware profesional adaptado al tamaño y necesidades de tu empresa.',
    },
    {
      icon: Wifi,
      title: 'Wi-Fi empresarial',
      description: 'Cobertura total con APs gestionables, roaming sin cortes y redes separadas para empleados, invitados e IoT.',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad perimetral',
      description: 'Firewall, segmentación VLAN, control de acceso por usuario y políticas de seguridad acordes a tu actividad.',
    },
    {
      icon: FileSearch,
      title: 'Diagnóstico y auditoría',
      description: 'Analizamos tu red actual, identificamos cuellos de botella y proponemos mejoras con datos en mano.',
    },
    {
      icon: Headphones,
      title: 'Soporte y mantenimiento',
      description: 'Atención rápida ante incidencias, mantenimiento preventivo y monitorización continua de tu infraestructura.',
    },
  ],

  // ¿A quién va dirigido?
  audienceTitle: '¿A quién va dirigido?',
  audience: [
    {
      icon: Briefcase,
      name: 'Pequeñas y medianas empresas',
      description: 'Oficinas que necesitan una red profesional para crecer sin sufrir cortes ni caídas.',
    },
    {
      icon: Factory,
      name: 'Naves industriales',
      description: 'Entornos con maquinaria, sistemas de control, cámaras y empleados conectados.',
    },
    {
      icon: Building2,
      name: 'Comunidades de propietarios',
      description: 'Edificios que requieren red común, Wi-Fi en zonas comunes o vigilancia conectada.',
    },
    {
      icon: Store,
      name: 'Comercios y locales',
      description: 'Tiendas, restaurantes y oficinas pequeñas con TPV, Wi-Fi de clientes y cámaras.',
    },
  ],

  // Beneficios
  benefitsTitle: '¿Por qué elegirnos para tu red?',
  benefits: [
    {
      icon: ShieldCheck,
      title: 'Más de 20 años de experiencia',
      description: 'Trayectoria sólida en instalaciones técnicas profesionales. Sabemos qué funciona y qué no.',
    },
    {
      icon: Settings,
      title: 'Soluciones a medida',
      description: 'No vendemos paquetes cerrados. Estudiamos tu caso y diseñamos exactamente lo que necesitas.',
    },
    {
      icon: Headphones,
      title: 'Atención cercana y rápida',
      description: 'Respondemos rápido ante incidencias. No eres un número de ticket, te atendemos como nos gustaría que nos atendieran.',
    },
    {
      icon: FileSearch,
      title: 'Documentación profesional',
      description: 'Te entregamos esquemas, certificaciones y manual de uso. Si mañana cambia tu informático, sabe exactamente qué tiene.',
    },
    {
      icon: Cable,
      title: 'Cumplimiento de normativa',
      description: 'Trabajos conformes a la legislación vigente y estándares profesionales del sector.',
    },
  ],
  benefitsImage: '/assets/services/redes/data-center.jpg',
  benefitsImageAlt: 'Sala de servidores empresarial con rack metálico y cableado organizado',

  // Proceso
  processTitle: 'Cómo trabajamos',
  process: [
    {
      step: 1,
      title: 'Diagnóstico inicial',
      description: 'Visitamos tu empresa, evaluamos las necesidades reales y revisamos lo que ya tienes. Sin compromiso.',
    },
    {
      step: 2,
      title: 'Propuesta técnica',
      description: 'Te entregamos un presupuesto detallado con esquema de la solución, plazos y precio cerrado.',
    },
    {
      step: 3,
      title: 'Instalación profesional',
      description: 'Ejecutamos la instalación con orden y limpieza, minimizando interrupciones a tu actividad.',
    },
    {
      step: 4,
      title: 'Soporte continuado',
      description: 'Te entregamos documentación completa y quedamos disponibles para mantenimiento, incidencias y ampliaciones.',
    },
  ],

  // FAQ
  faqTitle: 'Preguntas frecuentes sobre redes informáticas',
  faq: [
    {
      question: '¿Cuánto cuesta instalar una red en mi empresa?',
      answer: 'El coste depende del tamaño del local, número de puntos de red, tipo de cableado y equipamiento (routers, switches, Wi-Fi). Te damos un presupuesto cerrado tras una visita gratuita en la que evaluamos tus necesidades reales. Sin sorpresas ni costes ocultos.',
    },
    {
      question: '¿Cuánto tarda la instalación?',
      answer: 'Una instalación típica de oficina pequeña (10-20 puntos de red) suele completarse en 2-4 días laborables. Naves industriales o instalaciones más grandes llevan más tiempo. En la propuesta te concretamos plazos exactos.',
    },
    {
      question: '¿Trabajáis en fines de semana o por la noche?',
      answer: 'Sí. Para empresas que no pueden parar su actividad durante el horario laboral, organizamos la instalación en horarios nocturnos o fines de semana. Avísanos en el presupuesto y lo planificamos.',
    },
    {
      question: '¿Aprovecháis la red que ya tengo o hay que cambiar todo?',
      answer: 'Siempre que sea técnicamente viable y seguro, reutilizamos el cableado y equipos existentes. Si algo ya no cumple normativa o limita el rendimiento, te lo decimos claramente y proponemos alternativas, pero no cambiamos por cambiar.',
    },
    {
      question: '¿Qué pasa si hay una incidencia después de la instalación?',
      answer: 'Te atendemos. Todas nuestras instalaciones incluyen un período de garantía y servicio post-venta. Para empresas con necesidades críticas ofrecemos contratos de mantenimiento con tiempos de respuesta garantizados.',
    },
    {
      question: '¿Trabajáis fuera de Sant Vicenç dels Horts?',
      answer: 'Sí, atendemos toda el área metropolitana sur de Barcelona y alrededores. Si tu empresa está en otra zona, cuéntanoslo y valoramos el desplazamiento sin compromiso.',
    },
  ],

  // CTA final
  ctaTitle: '¿Listo para una red profesional que no te deje colgado?',
  ctaSubtitle: 'Hablemos. Te visitamos, evaluamos tus necesidades reales y te damos un presupuesto cerrado sin compromiso.',
};

// ============================================================================
// Stubs para los otros 5 servicios (los completaremos cuando validemos el patrón)
// ============================================================================

const stub = (slug: string, name: string, icon: LucideIcon): ServiceData => ({
  slug, icon, name,
  metaTitle: `${name} | FRECOIN`,
  metaDescription: `Servicios profesionales de ${name.toLowerCase()} en Sant Vicenç dels Horts y Barcelona.`,
  keywords: [name.toLowerCase()],
  tagline: 'Nuestros servicios',
  heroH1: name,
  heroParagraph: 'Contenido en preparación. Pronto disponible.',
  heroImage: '/assets/services/redes/hero-server-rack.jpg',
  heroImageAlt: name,
  includesTitle: '¿Qué incluye?',
  includes: [],
  audienceTitle: '¿A quién va dirigido?',
  audience: [],
  benefitsTitle: '¿Por qué elegirnos?',
  benefits: [],
  benefitsImage: '/assets/services/redes/data-center.jpg',
  benefitsImageAlt: name,
  processTitle: 'Cómo trabajamos',
  process: [],
  faqTitle: 'Preguntas frecuentes',
  faq: [],
  ctaTitle: '¿Hablamos?',
  ctaSubtitle: 'Solicita presupuesto sin compromiso.',
});

// ============================================================================
// Catálogo completo (el orden aquí refleja el orden en la home)
// ============================================================================

export const services: ServiceData[] = [
  redesInformaticas,
  stub('instalaciones-electricas', 'Instalaciones Eléctricas', Plug),
  stub('camaras-videovigilancia', 'Cámaras de Videovigilancia', Camera),
  stub('antenas-wifi', 'Antenas WiFi', Antenna),
  stub('sai', 'Sistemas SAI', BatteryCharging),
  stub('controles-de-acceso', 'Controles de Acceso', Lock),
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}

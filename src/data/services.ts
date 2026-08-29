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
  Wifi, PlugZap, Cctv, BatteryCharging, Fingerprint,
  Network, Cable, Settings, ShieldCheck, Headphones, FileSearch,
  Briefcase, Factory, Building2, Store, type LucideIcon,
  Zap, Lightbulb, Gauge, AlertTriangle, Eye, Video, MonitorPlay,
  ShieldAlert, Smartphone, Globe, Radio, Signal, Server,
  Battery, Activity, Clock, KeyRound, UserCheck,
  ClipboardCheck, Warehouse, Hospital, Hotel,
} from 'lucide-react';
import WifiRouterIcon from '../components/icons/WifiRouterIcon';

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
  slug: string;
  icon: LucideIcon;
  name: string;
  featured?: boolean;

  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  tagline: string;
  heroH1: string;
  heroParagraph: string;
  heroImage: string;
  heroImageAlt: string;

  includesTitle: string;
  includes: ServiceFeature[];

  audienceTitle: string;
  audience: ServiceAudience[];

  benefitsTitle: string;
  benefits: ServiceFeature[];
  benefitsImage: string;
  benefitsImageAlt: string;

  processTitle: string;
  process: ServiceProcessStep[];

  faqTitle: string;
  faq: ServiceFAQ[];

  ctaTitle: string;
  ctaSubtitle: string;

  // Precio (editable desde el panel; opcional — si no hay, no se muestra).
  price?: number | null;
  priceUnit?: string;
  priceNote?: string;
}

/** Override que llega del panel vía el snapshot /assets/services.json. */
export interface ServiceOverride {
  slug: string;
  name?: string;
  tagline?: string;
  meta_title?: string;
  meta_description?: string;
  hero_h1?: string;
  hero_paragraph?: string;
  hero_image?: string;
  hero_image_alt?: string;
  benefits_image?: string;
  benefits_image_alt?: string;
  price?: number | string | null;
  price_unit?: string;
  price_note?: string;
}

/**
 * Aplica sobre un servicio base (de este archivo) los campos editados en el
 * panel. Lo no editado aún (includes, audience, FAQ, iconos, proceso) se
 * mantiene de este archivo. Permite reflejar ediciones en producción sin
 * perder los bloques ricos.
 */
export function applyOverride(base: ServiceData, o: ServiceOverride | undefined): ServiceData {
  if (!o) return base;
  const price = o.price === '' || o.price === undefined || o.price === null ? (base.price ?? null) : Number(o.price);
  return {
    ...base,
    name: o.name || base.name,
    tagline: o.tagline || base.tagline,
    metaTitle: o.meta_title || base.metaTitle,
    metaDescription: o.meta_description || base.metaDescription,
    heroH1: o.hero_h1 || base.heroH1,
    heroParagraph: o.hero_paragraph || base.heroParagraph,
    heroImage: o.hero_image || base.heroImage,
    heroImageAlt: o.hero_image_alt || base.heroImageAlt,
    benefitsImage: o.benefits_image || base.benefitsImage,
    benefitsImageAlt: o.benefits_image_alt || base.benefitsImageAlt,
    price,
    priceUnit: o.price_unit ?? base.priceUnit,
    priceNote: o.price_note ?? base.priceNote,
  };
}

// ============================================================================
// Beneficios comunes a todos los servicios (los 5 pilares aprobados por Luis)
// ============================================================================

const beneficiosFRECOIN = (especialidad: string): ServiceFeature[] => [
  {
    icon: ShieldCheck,
    title: 'Más de 20 años de experiencia',
    description: `Trayectoria sólida en ${especialidad}. Sabemos qué funciona y qué no, sin experimentar a costa del cliente.`,
  },
  {
    icon: Settings,
    title: 'Soluciones a medida',
    description: 'No vendemos paquetes cerrados. Estudiamos tu caso y proponemos exactamente lo que necesitas, sin coste innecesario.',
  },
  {
    icon: Headphones,
    title: 'Atención cercana y rápida',
    description: 'Respondemos rápido ante incidencias. No eres un número de ticket, te atendemos como nos gustaría que nos atendieran.',
  },
  {
    icon: FileSearch,
    title: 'Documentación profesional',
    description: 'Te entregamos esquemas, certificaciones y manual de uso. Si mañana cambia tu técnico, sabe exactamente qué tiene.',
  },
  {
    icon: ClipboardCheck,
    title: 'Cumplimiento de normativa',
    description: 'Trabajos conformes a la legislación vigente y estándares profesionales del sector.',
  },
];

// Proceso común (4 pasos iguales en todos los servicios — coherencia de marca)
const procesoFRECOIN: ServiceProcessStep[] = [
  { step: 1, title: 'Diagnóstico inicial', description: 'Visitamos tu instalación, evaluamos las necesidades reales y revisamos lo existente. Sin compromiso.' },
  { step: 2, title: 'Propuesta técnica', description: 'Te entregamos un presupuesto detallado con el esquema de la solución, plazos y precio cerrado.' },
  { step: 3, title: 'Instalación profesional', description: 'Ejecutamos el trabajo con orden y limpieza, minimizando interrupciones a tu actividad.' },
  { step: 4, title: 'Soporte continuado', description: 'Te entregamos documentación completa y quedamos disponibles para mantenimiento, incidencias y ampliaciones.' },
];

// Audiencias comunes
const audienciasGenericas = (extra1: ServiceAudience, extra2: ServiceAudience): ServiceAudience[] => [
  { icon: Briefcase, name: 'Pequeñas y medianas empresas', description: 'Oficinas y empresas que necesitan instalaciones profesionales y fiables.' },
  { icon: Factory, name: 'Naves industriales', description: 'Entornos productivos con requisitos técnicos exigentes.' },
  extra1,
  extra2,
];

// ============================================================================
// 1. REDES INFORMÁTICAS — Servicio estrella
// ============================================================================

const redesInformaticas: ServiceData = {
  slug: 'redes-informaticas',
  icon: Network,
  name: 'Redes Informáticas',
  featured: false,

  metaTitle: 'Instalación de redes informáticas para empresas | FRECOIN',
  metaDescription: 'Diseño, instalación y mantenimiento de redes informáticas y cableado estructurado para empresas en toda España. +20 años de experiencia.',
  keywords: ['redes informáticas', 'instalación red empresa', 'cableado estructurado', 'red corporativa', 'wifi empresarial', 'Cataluña', 'Barcelona', 'redes Cat6', 'firewall empresa'],

  tagline: 'Conectividad empresarial',
  heroH1: 'Redes informáticas para empresas que no pueden permitirse caer.',
  heroParagraph: 'Diseñamos, instalamos y mantenemos redes corporativas estables, rápidas y seguras. Cableado estructurado, certificación, configuración de routers y switches, Wi-Fi empresarial y soporte continuo.',
  heroImage: '/assets/services/redes/hero-server-rack.jpg',
  heroImageAlt: 'Rack de servidores con iluminación azul en sala técnica',

  includesTitle: '¿Qué incluye nuestro servicio de redes?',
  includes: [
    { icon: Cable, title: 'Cableado estructurado', description: 'Diseño y tendido de cableado Cat 6/6A/7 con etiquetado, certificación y documentación profesional.' },
    { icon: Network, title: 'Routers, switches y firewalls', description: 'Configuración de hardware profesional adaptado al tamaño y necesidades de tu empresa.' },
    { icon: Wifi, title: 'Wi-Fi empresarial', description: 'Cobertura total con APs gestionables, roaming sin cortes y redes separadas para empleados, invitados e IoT.' },
    { icon: ShieldCheck, title: 'Seguridad perimetral', description: 'Firewall, segmentación VLAN, control de acceso por usuario y políticas de seguridad acordes a tu actividad.' },
    { icon: FileSearch, title: 'Diagnóstico y auditoría', description: 'Analizamos tu red actual, identificamos cuellos de botella y proponemos mejoras con datos en mano.' },
    { icon: Headphones, title: 'Soporte y mantenimiento', description: 'Atención rápida ante incidencias, mantenimiento preventivo y monitorización continua de tu infraestructura.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: [
    { icon: Briefcase, name: 'Pequeñas y medianas empresas', description: 'Oficinas que necesitan una red profesional para crecer sin sufrir cortes ni caídas.' },
    { icon: Factory, name: 'Naves industriales', description: 'Entornos con maquinaria, sistemas de control, cámaras y empleados conectados.' },
    { icon: Building2, name: 'Comunidades de propietarios', description: 'Edificios que requieren red común, Wi-Fi en zonas comunes o vigilancia conectada.' },
    { icon: Store, name: 'Comercios y locales', description: 'Tiendas, restaurantes y oficinas pequeñas con TPV, Wi-Fi de clientes y cámaras.' },
  ],

  benefitsTitle: '¿Por qué elegirnos para tu red?',
  benefits: beneficiosFRECOIN('instalaciones técnicas profesionales'),
  benefitsImage: '/assets/services/redes/data-center.jpg',
  benefitsImageAlt: 'Sala de servidores empresarial con rack metálico y cableado organizado',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre redes informáticas',
  faq: [
    { question: '¿Cuánto cuesta instalar una red en mi empresa?', answer: 'El coste depende del tamaño del local, número de puntos de red, tipo de cableado y equipamiento (routers, switches, Wi-Fi). Te damos un presupuesto cerrado tras una visita gratuita en la que evaluamos tus necesidades reales. Sin sorpresas ni costes ocultos.' },
    { question: '¿Cuánto tarda la instalación?', answer: 'Una instalación típica de oficina pequeña (10-20 puntos de red) suele completarse en 2-4 días laborables. Naves industriales o instalaciones más grandes llevan más tiempo. En la propuesta te concretamos plazos exactos.' },
    { question: '¿Trabajáis en fines de semana o por la noche?', answer: 'Sí. Para empresas que no pueden parar su actividad durante el horario laboral, organizamos la instalación en horarios nocturnos o fines de semana. Avísanos en el presupuesto y lo planificamos.' },
    { question: '¿Aprovecháis la red que ya tengo o hay que cambiar todo?', answer: 'Siempre que sea técnicamente viable y seguro, reutilizamos el cableado y equipos existentes. Si algo ya no cumple normativa o limita el rendimiento, te lo decimos claramente y proponemos alternativas, pero no cambiamos por cambiar.' },
    { question: '¿Qué pasa si hay una incidencia después de la instalación?', answer: 'Te atendemos. Todas nuestras instalaciones incluyen un período de garantía y servicio post-venta. Para empresas con necesidades críticas ofrecemos contratos de mantenimiento con tiempos de respuesta garantizados.' },
    { question: '¿En qué zonas trabajáis?', answer: 'Damos servicio en toda España. Nuestra sede está en Barcelona (Sant Vicenç dels Horts), desde donde coordinamos las instalaciones y el mantenimiento en cualquier provincia. Cuéntanos dónde estás y lo valoramos sin compromiso.' },
  ],

  ctaTitle: '¿Listo para una red profesional que no te deje colgado?',
  ctaSubtitle: 'Hablemos. Te visitamos, evaluamos tus necesidades reales y te damos un presupuesto cerrado sin compromiso.',
};

// ============================================================================
// 2. INSTALACIONES ELÉCTRICAS
// ============================================================================

const instalacionesElectricas: ServiceData = {
  slug: 'instalaciones-electricas',
  icon: PlugZap,
  name: 'Instalaciones Eléctricas',

  metaTitle: 'Empresa de instalaciones eléctricas | FRECOIN',
  metaDescription: 'Ejecución de instalaciones eléctricas seguras y certificadas para empresas en toda España. Cableado, cuadros, protecciones y mantenimiento. +20 años.',
  keywords: ['instalaciones eléctricas', 'electricista empresa', 'cuadro eléctrico', 'cableado industrial', 'reforma eléctrica', 'Cataluña', 'Barcelona', 'boletín eléctrico'],

  tagline: 'Normativa y seguridad',
  heroH1: 'Instalaciones eléctricas seguras, certificadas y bien hechas.',
  heroParagraph: 'Diseño y ejecución de instalaciones eléctricas para empresas, oficinas y naves industriales. Cableado, cuadros, protecciones y certificación según normativa vigente.',
  heroImage: '/assets/services/electricas/hero.webp',
  heroImageAlt: 'Electricista profesional comprobando cuadro eléctrico con multímetro',

  includesTitle: '¿Qué incluye nuestro servicio eléctrico?',
  includes: [
    { icon: Cable, title: 'Cableado completo', description: 'Tendido de cableado eléctrico certificado, dimensionado correctamente para tu carga y crecimiento futuro.' },
    { icon: Zap, title: 'Cuadros eléctricos', description: 'Diseño e instalación de cuadros generales y secundarios con etiquetado claro y documentación.' },
    { icon: ShieldAlert, title: 'Protecciones y seguridad', description: 'Diferenciales, magnetotérmicos, descargadores y sistemas de puesta a tierra conforme a normativa.' },
    { icon: Lightbulb, title: 'Iluminación profesional', description: 'Iluminación LED para oficinas, naves y locales comerciales. Eficiente, regulable y con normativa cumplida.' },
    { icon: Gauge, title: 'Optimización energética', description: 'Estudios de consumo, baterías de condensadores y mejoras para reducir tu factura eléctrica.' },
    { icon: AlertTriangle, title: 'Boletines y certificados', description: 'Tramitamos boletín eléctrico, CIE y demás documentación oficial necesaria para tu instalación.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: audienciasGenericas(
    { icon: Building2, name: 'Reformas integrales', description: 'Locales y oficinas que requieren renovar la instalación eléctrica completa.' },
    { icon: Store, name: 'Comercios y locales', description: 'Tiendas, restaurantes y comercios con potencias elevadas o equipamiento específico.' },
  ),

  benefitsTitle: '¿Por qué elegirnos para tu instalación?',
  benefits: beneficiosFRECOIN('instalaciones eléctricas profesionales'),
  benefitsImage: '/assets/services/electricas/benefits.jpg',
  benefitsImageAlt: 'Técnico ajustando cables en cuadro de control eléctrico',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre instalaciones eléctricas',
  faq: [
    { question: '¿Está la instalación certificada y legalizada?', answer: 'Sí. Toda instalación que realizamos cumple con el Reglamento Electrotécnico de Baja Tensión (REBT) y se entrega con boletín eléctrico oficial y certificado de instalación eléctrica (CIE) cuando aplica.' },
    { question: '¿Puedo ampliar la potencia contratada?', answer: 'Sí. Estudiamos tu instalación actual y, si es necesario, adaptamos el cuadro y el cableado a la nueva potencia. Gestionamos también los trámites con la compañía eléctrica.' },
    { question: '¿Hacéis mantenimiento preventivo?', answer: 'Sí. Ofrecemos contratos de mantenimiento eléctrico para empresas: revisiones periódicas, termografía del cuadro, comprobación de protecciones y limpieza. Previene averías y cumple seguros.' },
    { question: '¿Qué normativa cumple la instalación?', answer: 'REBT (Reglamento Electrotécnico de Baja Tensión), normas UNE específicas según el tipo de local, y normativa autonómica catalana. Si tu actividad lo requiere, también ATEX, sectores especiales, etc.' },
    { question: '¿Atendéis urgencias eléctricas?', answer: 'Para clientes con contrato de mantenimiento, sí. Para clientes nuevos, intentamos dar respuesta rápida pero los tiempos dependen de la agenda y la distancia.' },
    { question: '¿Trabajáis con seguros y comunidades de propietarios?', answer: 'Sí. Estamos acostumbrados a facturar a compañías de seguros, comunidades, administradores y empresas con departamento de compras. Te damos la documentación que necesites.' },
  ],

  ctaTitle: '¿Necesitas una instalación eléctrica seria y certificada?',
  ctaSubtitle: 'Te visitamos, evaluamos lo que necesitas y te damos un presupuesto cerrado con todos los certificados incluidos.',
};

// ============================================================================
// 3. CÁMARAS DE VIDEOVIGILANCIA
// ============================================================================

const camarasVideovigilancia: ServiceData = {
  slug: 'camaras-videovigilancia',
  icon: Cctv,
  name: 'Cámaras de Videovigilancia',

  metaTitle: 'Instalación de cámaras de seguridad para empresas | FRECOIN',
  metaDescription: 'Instalación de cámaras de seguridad CCTV e IP para empresas, naves y comercios en toda España. Visión nocturna, acceso remoto y cumplimiento RGPD.',
  keywords: ['cámaras de seguridad', 'videovigilancia', 'CCTV', 'cámaras IP empresa', 'sistemas videovigilancia Barcelona', 'cámaras nave industrial', 'Cataluña', 'normativa cámaras'],

  tagline: 'Vigilancia activa',
  heroH1: 'Sistemas de videovigilancia profesionales y siempre operativos.',
  heroParagraph: 'Diseño e instalación de circuitos cerrados de cámaras IP y CCTV para empresas, naves, comercios y comunidades. Visión nocturna, acceso remoto, grabación segura y cumplimiento normativo.',
  heroImage: '/assets/services/camaras/hero.jpg',
  heroImageAlt: 'Cámara de seguridad domo de exterior instalada en muro',

  includesTitle: '¿Qué incluye nuestro servicio de cámaras?',
  includes: [
    { icon: Cctv, title: 'Cámaras IP profesionales', description: 'Cámaras Full HD/4K con visión nocturna, detección inteligente y conexión por red.' },
    { icon: Video, title: 'Grabador (NVR) configurado', description: 'Almacenamiento local seguro con disco duro dimensionado para los días de retención que necesites.' },
    { icon: Smartphone, title: 'Visualización remota', description: 'App móvil y acceso desde ordenador para ver tu negocio en directo desde cualquier lugar.' },
    { icon: Eye, title: 'Detección inteligente', description: 'Detección de movimiento por zonas, distinción entre personas/vehículos y alertas push al móvil.' },
    { icon: MonitorPlay, title: 'Instalación y cableado', description: 'Tendido del cableado UTP/coaxial, montaje físico de las cámaras y configuración completa del sistema.' },
    { icon: ShieldAlert, title: 'Cumplimiento RGPD', description: 'Te asesoramos sobre cartelería obligatoria, registro y políticas de privacidad para cumplir la AEPD.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: audienciasGenericas(
    { icon: Warehouse, name: 'Almacenes y logística', description: 'Naves con mercancía valiosa y zonas críticas que requieren vigilancia continua.' },
    { icon: Store, name: 'Comercios y restaurantes', description: 'Tiendas, locales y hostelería con cajas, accesos y zonas de público.' },
  ),

  benefitsTitle: '¿Por qué elegirnos para tu sistema de seguridad?',
  benefits: beneficiosFRECOIN('sistemas de videovigilancia'),
  benefitsImage: '/assets/services/camaras/benefits.jpg',
  benefitsImageAlt: 'Cámara de seguridad profesional CCTV montada en edificio moderno',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre cámaras de seguridad',
  faq: [
    { question: '¿Cuántas cámaras necesito para mi negocio?', answer: 'Depende del tamaño del local y de los puntos críticos (entradas, cajas, almacén, exteriores). En la visita identificamos los puntos clave y te recomendamos el número justo, ni más ni menos.' },
    { question: '¿Puedo ver las cámaras desde el móvil?', answer: 'Sí. Configuramos acceso remoto mediante app oficial del fabricante (sin servicios cloud de terceros que se cobren al mes). Lo verás desde tu móvil estés donde estés.' },
    { question: '¿Cuántos días se guarda la grabación?', answer: 'Según el disco duro instalado y la calidad de grabación. Lo habitual son 15-30 días para empresas, pero podemos dimensionar para 60-90 días si la actividad lo requiere (por normativa o por seguro).' },
    { question: '¿Las cámaras funcionan de noche?', answer: 'Sí. Todas nuestras cámaras incluyen visión nocturna por infrarrojos. Para zonas exteriores grandes recomendamos modelos con iluminadores adicionales o tecnología Starlight (color de noche).' },
    { question: '¿Tengo obligación legal de informar de las cámaras?', answer: 'Sí. La RGPD y la LOPDGDD obligan a poner cartelería visible informando de la videovigilancia y a tener una política de privacidad específica. Te entregamos los carteles y el documento informativo listo.' },
    { question: '¿Se pueden integrar con la alarma o el control de acceso?', answer: 'Sí. Los sistemas IP modernos se integran con alarmas, controles de acceso y plataformas de gestión unificada. Si ya tienes un sistema, valoramos la integración. Si no, te proponemos solución conjunta.' },
  ],

  ctaTitle: '¿Listo para vigilar tu negocio con tranquilidad?',
  ctaSubtitle: 'Te visitamos, evaluamos los puntos críticos y te damos un presupuesto cerrado con todo incluido.',
};

// ============================================================================
// 4. ANTENAS WIFI
// ============================================================================

const antenasWifi: ServiceData = {
  slug: 'antenas-wifi',
  icon: WifiRouterIcon,
  name: 'Antenas WiFi',

  metaTitle: 'Instalación de WiFi empresarial | FRECOIN',
  metaDescription: 'Cobertura WiFi profesional para empresas, naves y locales en toda España. Antenas exteriores, puntos de acceso, redes mesh y soporte continuo.',
  keywords: ['antenas WiFi', 'WiFi empresarial', 'cobertura WiFi nave', 'WiFi profesional Barcelona', 'puntos de acceso', 'mesh WiFi', 'WiFi 6', 'Cataluña'],

  tagline: 'Cobertura empresarial',
  heroH1: 'WiFi sin cortes en cada rincón de tu empresa.',
  heroParagraph: 'Diseñamos e instalamos cobertura WiFi profesional para oficinas, naves, locales y exteriores. Puntos de acceso gestionables, redes mesh y conectividad estable para todos tus dispositivos.',
  heroImage: '/assets/services/wifi/hero.jpg',
  heroImageAlt: 'Router WiFi 6 profesional con múltiples antenas',

  includesTitle: '¿Qué incluye nuestro servicio WiFi?',
  includes: [
    { icon: Wifi, title: 'Puntos de acceso profesionales', description: 'APs de gama empresarial (Ubiquiti, TP-Link Omada, Aruba) con cobertura amplia y gestión centralizada.' },
    { icon: Signal, title: 'Estudio de cobertura', description: 'Medimos in situ la cobertura, identificamos zonas muertas y planificamos exactamente cuántos APs hace falta.' },
    { icon: Network, title: 'Red mesh profesional', description: 'Para grandes espacios, naves o exteriores, configuramos redes mesh con roaming sin cortes entre antenas.' },
    { icon: Globe, title: 'Antenas exteriores', description: 'Cobertura WiFi para patios, almacenes exteriores y zonas amplias con antenas direccionales certificadas.' },
    { icon: Radio, title: 'SSIDs y VLANs separadas', description: 'Red separada para empleados, invitados y dispositivos IoT, todo gestionado desde un único panel.' },
    { icon: Headphones, title: 'Soporte y monitorización', description: 'Acceso remoto a tu red para diagnosticar y solucionar problemas sin esperar al desplazamiento.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: audienciasGenericas(
    { icon: Hotel, name: 'Hostelería y hoteles', description: 'Hoteles, restaurantes y locales que necesitan ofrecer WiFi de calidad a sus clientes.' },
    { icon: Warehouse, name: 'Naves y espacios amplios', description: 'Espacios industriales y almacenes con zonas de difícil cobertura o muchos dispositivos conectados.' },
  ),

  benefitsTitle: '¿Por qué elegirnos para tu WiFi?',
  benefits: beneficiosFRECOIN('redes WiFi empresariales'),
  benefitsImage: '/assets/services/wifi/benefits.jpg',
  benefitsImageAlt: 'Router WiFi profesional con LEDs iluminados',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre WiFi empresarial',
  faq: [
    { question: '¿Por qué un WiFi doméstico no me sirve en la empresa?', answer: 'Los routers domésticos están pensados para 5-10 dispositivos en una vivienda. En una empresa puedes tener 50-200 dispositivos conectados, zonas con paredes gruesas y necesidad de redes separadas. Un WiFi mal dimensionado es lentitud crónica y cortes constantes.' },
    { question: '¿Puedo separar la red de empleados y la de invitados?', answer: 'Sí. Configuramos distintos SSIDs (Wi-Fi público, Wi-Fi empleados, Wi-Fi IoT, etc.) cada uno con su VLAN y políticas. Los invitados nunca pueden acceder a tus archivos internos.' },
    { question: '¿El WiFi llegará al exterior / al almacén?', answer: 'Sí, dimensionando bien. Para exteriores usamos antenas profesionales certificadas para intemperie. Para naves industriales calculamos los puntos exactos según el material de los muros, alturas y obstáculos.' },
    { question: '¿Se puede gestionar el WiFi remotamente?', answer: 'Sí. Los APs profesionales se gestionan desde un panel cloud al que tú y nosotros tenemos acceso. Cambiar contraseñas, ver dispositivos conectados, monitorizar caídas... todo desde el móvil.' },
    { question: '¿Qué pasa si crece mi empresa y necesito más cobertura?', answer: 'El sistema es modular. Solo añadimos más antenas y se incorporan a la red existente sin cambiar nada. Por eso planteamos arquitecturas que crecen contigo.' },
    { question: '¿Aprovecháis el router que ya tengo del proveedor de internet?', answer: 'Sí. El router del operador queda solo como pasarela a internet. El WiFi profesional lo dan los APs que instalamos, mucho más potentes y gestionables.' },
  ],

  ctaTitle: '¿Tienes zonas muertas en tu WiFi?',
  ctaSubtitle: 'Hacemos un estudio de cobertura, te decimos qué necesitas y te damos un presupuesto cerrado.',
};

// ============================================================================
// 5. SISTEMAS SAI
// ============================================================================

const sai: ServiceData = {
  slug: 'sai',
  icon: BatteryCharging,
  name: 'Sistemas SAI',

  metaTitle: 'Sistemas SAI para empresas | FRECOIN',
  metaDescription: 'Instalación de sistemas SAI/UPS para servidores y equipos críticos de empresa en toda España. Evita pérdidas de datos y paradas por cortes de luz.',
  keywords: ['SAI', 'UPS', 'sistema alimentación ininterrumpida', 'protección eléctrica', 'SAI servidor', 'UPS empresa Barcelona', 'cortes de luz', 'protección equipos'],

  tagline: 'Continuidad operativa',
  heroH1: 'Sistemas SAI para empresas: no pierdas dinero por un corte de luz.',
  heroParagraph: 'Instalamos Sistemas de Alimentación Ininterrumpida (SAI/UPS) que mantienen tus servidores, ordenadores y equipos críticos funcionando durante cortes y picos eléctricos. Cero pérdidas de datos, cero interrupciones.',
  heroImage: '/assets/services/sai/hero.webp',
  heroImageAlt: 'Gama de sistemas SAI/UPS profesionales para empresas: torres y equipos rack',

  includesTitle: '¿Qué incluye nuestro servicio SAI?',
  includes: [
    { icon: BatteryCharging, title: 'Estudio de necesidades', description: 'Calculamos la potencia exacta que necesitas según equipos a proteger y autonomía deseada.' },
    { icon: Server, title: 'SAI dimensionado correctamente', description: 'Modelo y capacidad ajustados a tu caso: desde 1 kVA para puestos críticos hasta sistemas de 10+ kVA para salas de servidores.' },
    { icon: Battery, title: 'Baterías y autonomía', description: 'Módulos de baterías ampliables para conseguir la autonomía que necesites: 5 min, 30 min, 2 horas.' },
    { icon: AlertTriangle, title: 'Protección contra picos', description: 'Filtrado de la red eléctrica que protege tus equipos de subidas, bajadas y armónicos que dañan electrónica sensible.' },
    { icon: Activity, title: 'Monitorización remota', description: 'Acceso al estado del SAI desde la red, alertas por email y apagado controlado de servidores ante corte prolongado.' },
    { icon: Clock, title: 'Mantenimiento preventivo', description: 'Revisión periódica de baterías (vida útil típica 3-5 años) para evitar fallos cuando más los necesitas.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: audienciasGenericas(
    { icon: Hospital, name: 'Equipos críticos', description: 'Clínicas, gestorías, laboratorios y empresas con datos o procesos que no pueden detenerse.' },
    { icon: Server, name: 'Salas de servidores', description: 'CPDs y empresas con infraestructura propia que requiere continuidad eléctrica.' },
  ),

  benefitsTitle: '¿Por qué elegirnos para tu SAI?',
  benefits: beneficiosFRECOIN('sistemas de alimentación ininterrumpida'),
  benefitsImage: '/assets/services/sai/benefits.webp',
  benefitsImageAlt: 'Equipos SAI/UPS profesionales en una sala de servidores empresarial',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre SAI/UPS',
  faq: [
    { question: '¿Cuánto tiempo aguanta el SAI en un corte?', answer: 'Depende del modelo y el consumo conectado. Configuraciones típicas: 5-10 minutos para guardar trabajo y apagar ordenado, 30 min - 2h para mantener servidores hasta restablecer la luz. Te dimensionamos según lo que necesites.' },
    { question: '¿El SAI también protege mis equipos de subidas de tensión?', answer: 'Sí. Además del corte total, el SAI filtra picos, microcortes y armónicos eléctricos que dañan progresivamente equipos sensibles (servidores, NAS, equipos médicos, electrónica industrial).' },
    { question: '¿Cuándo se cambian las baterías del SAI?', answer: 'Vida típica 3-5 años según uso y temperatura ambiente. Las revisamos en cada mantenimiento preventivo. Cuando se acerca su fin de vida, te avisamos para reemplazarlas antes de que fallen.' },
    { question: '¿Qué pasa con los servidores cuando el SAI se queda sin batería?', answer: 'Con la configuración correcta, el SAI manda señal a tus servidores antes de agotarse y se apagan ordenadamente sin perder datos. Es la diferencia entre "apagón controlado" y "corrupción de datos".' },
    { question: '¿Hace ruido un SAI?', answer: 'En modo normal, ruido mínimo (ventiladores). Cuando salta a batería emite un pitido intermitente para avisarte (se puede silenciar tras unos segundos). Para entornos sensibles hay modelos silenciosos.' },
    { question: '¿Necesito un SAI por cada ordenador?', answer: 'No necesariamente. Para puestos individuales con datos importantes, sí. Para una empresa con sala de servidores, lo lógico es un SAI central que proteja todo el rack y opcionalmente SAIs pequeños en puestos críticos.' },
  ],

  ctaTitle: '¿Cuánto te cuesta un día sin luz?',
  ctaSubtitle: 'Si la respuesta es "mucho", hablemos. Te visitamos, dimensionamos tu SAI y te damos un presupuesto cerrado.',
};

// ============================================================================
// 6. CONTROLES DE ACCESO
// ============================================================================

const controlesAcceso: ServiceData = {
  slug: 'controles-de-acceso',
  icon: Fingerprint,
  name: 'Controles de Acceso',

  metaTitle: 'Control de accesos para empresas | FRECOIN',
  metaDescription: 'Instalación de sistemas de control de acceso para empresas en toda España: tarjetas RFID, huella, código y app. Sin llaves físicas, todo trazado.',
  keywords: ['control de acceso', 'control accesos empresa', 'tarjeta RFID', 'lector huella', 'cerradura electrónica', 'control horario', 'Cataluña', 'Barcelona'],

  tagline: 'Trazabilidad y seguridad',
  heroH1: 'Control de accesos para empresas: adiós a las llaves perdidas.',
  heroParagraph: 'Sistemas de control de acceso por tarjeta, huella, código o app móvil. Quién entra, cuándo y a qué zonas, todo registrado y configurable desde un único panel.',
  heroImage: '/assets/services/accesos/hero.jpg',
  heroImageAlt: 'Empresario usando lector RFID para acceder a oficina',

  includesTitle: '¿Qué incluye nuestro servicio de accesos?',
  includes: [
    { icon: KeyRound, title: 'Tarjetas y llaveros RFID', description: 'Sistema clásico fiable: cada usuario tiene su tarjeta o llavero, y tú gestionas permisos desde el panel.' },
    { icon: Fingerprint, title: 'Lectores biométricos', description: 'Huella dactilar o reconocimiento facial. Sin tarjetas que se pierden y sin posibilidad de "prestar" la llave.' },
    { icon: Smartphone, title: 'Acceso por móvil', description: 'Apertura mediante app móvil con Bluetooth o NFC. Útil para visitas puntuales o personal externo temporal.' },
    { icon: Clock, title: 'Control horario integrado', description: 'El mismo sistema sirve para fichar entrada/salida y cumplir con el registro horario obligatorio.' },
    { icon: UserCheck, title: 'Permisos por zonas y horarios', description: 'Configura quién puede acceder a qué zona y en qué franjas horarias. Por ejemplo: limpieza solo de 19:00 a 21:00.' },
    { icon: FileSearch, title: 'Registro y trazabilidad', description: 'Histórico completo de accesos para cumplir con auditorías, normativa o investigaciones internas.' },
  ],

  audienceTitle: '¿A quién va dirigido?',
  audience: audienciasGenericas(
    { icon: Building2, name: 'Comunidades y edificios', description: 'Portales, garajes y zonas comunes que requieren control de quién entra y cuándo.' },
    { icon: Briefcase, name: 'Oficinas y coworkings', description: 'Empresas con varios departamentos, salas restringidas o registro horario obligatorio.' },
  ),

  benefitsTitle: '¿Por qué elegirnos para tu sistema de accesos?',
  benefits: beneficiosFRECOIN('sistemas de control de acceso'),
  benefitsImage: '/assets/services/accesos/benefits.jpg',
  benefitsImageAlt: 'Persona usando lector de huella para acceso seguro a oficina',

  processTitle: 'Cómo trabajamos',
  process: procesoFRECOIN,

  faqTitle: 'Preguntas frecuentes sobre control de acceso',
  faq: [
    { question: '¿Qué pasa si se pierde una tarjeta?', answer: 'Es la gran ventaja frente a llaves físicas: anulas esa tarjeta desde el panel en 10 segundos y emites otra. Las llaves físicas pierdes la copia "para siempre".' },
    { question: '¿Funciona si se va la luz?', answer: 'Sí. El sistema suele tener autonomía de batería propia (varias horas) y, conectado a un SAI, mucho más. Configuramos también el modo "fail-safe" (en emergencia se abre) o "fail-secure" (en emergencia se cierra) según tu caso.' },
    { question: '¿Necesito cambiar las puertas para instalar el control de acceso?', answer: 'No en la mayoría de casos. Adaptamos lo existente con cerraduras electromagnéticas, electrocerraduras o motores compatibles. Solo cambiamos puerta cuando técnicamente no es viable adaptar.' },
    { question: '¿Es compatible con el registro horario obligatorio?', answer: 'Sí, los sistemas modernos integran control horario para cumplir con el Real Decreto-ley 8/2019. Tus empleados fichan al entrar y los reportes se generan automáticamente.' },
    { question: '¿Se puede integrar con alarma o cámaras?', answer: 'Sí. Plataformas modernas integran control de acceso, alarma y videovigilancia en una sola interfaz. Si ya tienes alarma o cámaras, valoramos la integración antes de proponer cambios.' },
    { question: '¿Cumple con la RGPD el sistema biométrico?', answer: 'Sí, siempre que la implementación se haga conforme a la AEPD. Para sistemas con biometría el tratamiento es especial y te damos las plantillas necesarias (información a empleados, consentimientos, política).' },
  ],

  ctaTitle: '¿Cansado de llaves, copias y descontrol?',
  ctaSubtitle: 'Visitamos tu local, evaluamos el sistema más adecuado y te damos un presupuesto cerrado.',
};

// ============================================================================
// Catálogo completo (orden = orden en la home)
// ============================================================================

export const services: ServiceData[] = [
  redesInformaticas,
  instalacionesElectricas,
  camarasVideovigilancia,
  antenasWifi,
  sai,
  controlesAcceso,
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}

/**
 * Enlazado interno: 2 servicios afines por página.
 * Cada par se ha elegido por proximidad técnica real (lo que un cliente
 * suele contratar junto), no al azar.
 */
const relatedBySlug: Record<string, [string, string]> = {
  'redes-informaticas': ['antenas-wifi', 'sai'],
  'instalaciones-electricas': ['sai', 'controles-de-acceso'],
  'camaras-videovigilancia': ['controles-de-acceso', 'antenas-wifi'],
  'antenas-wifi': ['redes-informaticas', 'camaras-videovigilancia'],
  'sai': ['instalaciones-electricas', 'redes-informaticas'],
  'controles-de-acceso': ['camaras-videovigilancia', 'instalaciones-electricas'],
};

export function getRelatedServices(slug: string): ServiceData[] {
  return (relatedBySlug[slug] || [])
    .map(getServiceBySlug)
    .filter((s): s is ServiceData => Boolean(s));
}

import { Building2, Wrench, Bath, Store, Building, Zap, Waves, BadgeCheck, Sparkles, PaintRoller, Ruler, Trash2, Layers } from 'lucide-react';

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon?: React.ComponentType<{ className?: string }>;
  badges?: string[];
  microStat?: string;
};

export const servicesData: ServiceItem[] = [
  {
    id: 'viviendas',
    title: 'Reformas Integrales de Viviendas',
    description:
      'Interiorismo a medida para transformar tu hogar. Cocinas, baños y espacios totalmente renovados con gestión integral.',
    features: [
      'Diseño y planificación de espacios',
      'Renovación completa de instalaciones (fontanería, electricidad)',
      'Carpintería a medida (armarios, puertas, suelos)',
      'Iluminación y domótica',
      'Gestión de licencias y permisos'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_2_1-2.jpg',
    icon: Building2,
    badges: ['Más solicitado', 'Ideal para viviendas'],
    microStat: '+30 cocinas renovadas este año'
  },
  {
    id: 'cocinas-banos',
    title: 'Cocinas y Baños',
    description:
      'Espacios funcionales y estéticos donde el diseño se une a la practicidad. Materiales premium y acabados duraderos.',
    features: [
      'Diseño 3D previo',
      'Mobiliario de alta calidad',
      'Sanitarios y grifería de diseño',
      'Alicatados y solados modernos',
      'Optimización del espacio'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_3_2-2.jpg',
    icon: Bath,
    badges: ['Ideal para viviendas'],
    microStat: 'Proyectos con arquitectos y comunidades'
  },
  {
    id: 'locales',
    title: 'Locales Comerciales y Oficinas',
    description:
      'Diseño corporativo para potenciar tu marca y productividad. Plazos ajustados para minimizar cierres.',
    features: [
      'Adecuación a normativa vigente',
      'Diseño corporativo e imagen de marca',
      'Insonorización y acústica',
      'Climatización y ventilación',
      'Plazos ajustados para minimizar el cierre'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_4_3-2.jpg',
    icon: Store,
    badges: ['Recomendado para locales comerciales'],
    microStat: '+120 locales optimizados en Bilbao'
  },
  {
    id: 'fachadas',
    title: 'Fachadas y Comunidades',
    description:
      'Eficiencia energética, seguridad y estética para tu edificio. Soluciones SATE y cubiertas con garantía.',
    features: [
      'Rehabilitación de fachadas (SATE, ventiladas)',
      'Impermeabilización de cubiertas y tejados',
      'Instalación de ascensores a cota cero',
      'Eliminación de barreras arquitectónicas',
      'Inspección Técnica de Edificios (ITE)'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_5_4-2.jpg',
    icon: Building,
    badges: ['Proyectos con comunidades'],
    microStat: '+300 comunidades rehabilitadas'
  },
  {
    id: 'reformas',
    title: 'Reformas',
    description:
      'Cubrimos todas las ramas de obras desde derribos hasta las últimas técnicas de reformas, interiorismo y decoración.',
    features: [
      'Interiores de viviendas',
      'Cocinas',
      'Baños',
      'Locales comerciales',
      'Oficinas'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_6_5-2.jpg',
    icon: PaintRoller,
    badges: ['Servicio integral']
  },
  {
    id: 'insonorizacion',
    title: 'Insonorización',
    description:
      'Soluciones acústicas para mejorar la calidad y confort en cualquier espacio.',
    features: [
      'Aislamiento y acondicionamiento',
      'Licencias de actividad',
      'Protección frente al ruido',
      'Control de ruido',
      'Calidad acústica'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_7_6-2.jpg',
    icon: Waves,
    badges: ['Mejora de confort']
  },
  {
    id: 'reparaciones',
    title: 'Reparaciones',
    description:
      'Atención rápida y eficaz para arreglos y mantenimiento de tu vivienda o negocio.',
    features: [
      'Suelos deteriorados',
      'Maderas desgastadas',
      'Instalaciones eléctricas',
      'Instalaciones de fontanería',
      'Falsos techos caídos'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_8_7-2.jpg',
    icon: Wrench,
    badges: ['Respuesta rápida']
  },
  {
    id: 'impermeabilizacion',
    title: 'Impermeabilización',
    description:
      'Evita filtraciones y humedades con soluciones duraderas para interior y exterior.',
    features: [
      'Cimientos y suelos exteriores',
      'Fachadas y muros',
      'Suelos y paredes interiores',
      'Tejados, terrazas y azoteas',
      'Goteras, filtraciones y humedades'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_9_8-2.jpg',
    icon: Waves,
    badges: ['Protección contra agua']
  },
  {
    id: 'rehabilitaciones',
    title: 'Rehabilitaciones',
    description:
      'Recuperamos y mejoramos edificios y espacios comunes con criterios técnicos y estéticos.',
    features: [
      'Fachadas deterioradas',
      'Restauración de tejados',
      'Reestructuración de terrazas',
      'Acondicionamiento de zonas comunitarias',
      'Reparación de portales'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_10_9.jpg',
    icon: Building,
    badges: ['Comunidades']
  },
  {
    id: 'refuerzos-estructuras',
    title: 'Refuerzos de Estructuras',
    description:
      'Seguridad y estabilidad estructural con refuerzos en viviendas y edificios.',
    features: [
      'Viviendas',
      'Edificios',
      'Vigas',
      'Columnas',
      'Forjados y muros'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_11_10.jpg',
    icon: Building2,
    badges: ['Ingeniería']
  },
  {
    id: 'accesibilidad',
    title: 'Accesibilidad',
    description:
      'Soluciones para eliminar barreras arquitectónicas y mejorar la accesibilidad.',
    features: [
      'Rampas',
      'Ascensores',
      'Plataformas de acceso',
      'Salva escaleras',
      'Domótica'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_12_11.jpg',
    icon: BadgeCheck,
    badges: ['Mejora accesible']
  },
  {
    id: 'pladur',
    title: 'Pladúr',
    description:
      'Sistemas de pladúr para compartimentación, aislamiento y decoración.',
    features: [
      'Separación de espacios',
      'Aislamiento térmico',
      'Impermeabilización',
      'Insonorización',
      'Decoración'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_13_12.jpg',
    icon: Layers,
    badges: ['Versatilidad']
  },
  {
    id: 'informes-tecnicos',
    title: 'Informes Técnicos',
    description:
      'Evaluaciones y documentación técnica para proyectos y certificaciones.',
    features: [
      'Adecuación de ruido',
      'Eficiencia energética',
      'Habitabilidad',
      'Gestión de residuos',
      'Segregación de viviendas'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_14_13.jpg',
    icon: BadgeCheck,
    badges: ['Documentación']
  },
  {
    id: 'decoraciones-escayola',
    title: 'Decoraciones en Escayola',
    description:
      'Elementos decorativos en escayola para dar personalidad a tus espacios.',
    features: [
      'Baldas y estantería',
      'Arcos',
      'Columnas',
      'Cornisas',
      'Frisos'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_15_14.jpg',
    icon: Sparkles,
    badges: ['Decoración']
  },
  {
    id: 'derribos',
    title: 'Derribos',
    description:
      'Demoliciones y retirada de materiales con gestión de residuos.',
    features: [
      'Tabiques de ladrillos y pladúr',
      'Muebles de cocinas y techos',
      'Aparatos sanitarios',
      'Suelos, tarimas y revestimientos',
      'Transporte a vertedero'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_16_15.jpg',
    icon: Trash2,
    badges: ['Gestión responsable']
  },
  {
    id: 'carpinteria',
    title: 'Carpintería',
    description:
      'Carpintería interior y exterior con madera y metal.',
    features: [
      'Ventanas y puertas de madera',
      'Ventanas y puertas metálicas',
      'Interior y exterior',
      'Tarimas flotantes y parqués',
      'Escaleras'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_2_1-2.jpg',
    icon: Ruler,
    badges: ['A medida']
  },
  {
    id: 'instalaciones-electricas',
    title: 'Instalaciones Eléctricas',
    description:
      'Modernización y ampliación de instalaciones eléctricas y sistemas de domótica.',
    features: [
      'Acometida general',
      'Modernización de instalaciones eléctricas',
      'Iluminación general',
      'Cableados de red para voz y datos',
      'Porteros, video vigilancia y domótica'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_3_2-2.jpg',
    icon: Zap,
    badges: ['Eficiencia y seguridad']
  },
  {
    id: 'instalaciones-fontaneria',
    title: 'Instalaciones de Fontanería',
    description:
      'Suministro y saneamiento, climatización y ACS con materiales y soluciones actuales.',
    features: [
      'Red de suministro y saneamiento',
      'Sustitución e instalación equipos de cocina y baño',
      'Calefacción, climatización y agua caliente',
      'Sustitución de tuberías de plomo, cobre y PVC',
      'Cálculo calorífico de la vivienda'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_4_3-2.jpg',
    icon: Bath,
    badges: ['Confort y eficiencia']
  },
  {
    id: 'desarrollo-proyectos',
    title: 'Desarrollo de Proyectos',
    description:
      'Dirección y gestión integral de obras nuevas, reformas y rehabilitaciones.',
    features: [
      'Obras nuevas',
      'Reformas de interiores',
      'Rehabilitación total o parcial de edificios',
      'Mantenimiento integral de edificaciones',
      'Remodelación de locales comerciales'
    ],
    image: '/Servicios – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_5_4-2.jpg',
    icon: Building2,
    badges: ['Gestión integral']
  }
];

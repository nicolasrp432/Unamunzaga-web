import { Project, Testimonial, BlogPost, KPI } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Reforma Integral Vivienda Bilbao',
    description: 'Transformación completa de vivienda de 150m² con diseño moderno y sostenible. Incluye cocina, baños y salón con acabados de alta calidad.',
    category: 'Viviendas',
    tags: ['PREMIUM', 'Reforma integral', 'Diseño moderno'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20home%20renovation%20bilbao%20interior%20design%20premium%20quality&image_size=landscape_16_9',
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20kitchen%20renovation%20premium%20materials%20bilbao&image_size=landscape_16_9'
    ],
    featured: true,
    status: 'completed',
    completion_date: '2024-03-15',
    budget: 85000,
    testimonial: {
      id: '1',
      client_name: 'María García',
      company: 'Familia García',
      rating: 5,
      testimonial_text: 'Excelente trabajo. Transformaron completamente nuestra casa con un diseño moderno y funcional. El equipo fue muy profesional y cumplió con los plazos.',
      project: 'Reforma Integral Vivienda Bilbao'
    }
  },
  {
    id: '2',
    title: 'Bar Cafetería Casco Viejo',
    description: 'Reforma integral de bar tradicional con mantenimiento de elementos históricos. Diseño que respeta la esencia del local con toques modernos.',
    category: 'Bares',
    tags: ['HISTÓRICO', 'Reforma comercial', 'Diseño tradicional'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20bar%20renovation%20bilbao%20old%20town%20historic%20preservation&image_size=landscape_16_9',
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20bar%20interior%20traditional%20spanish%20tavern%20bilbao&image_size=landscape_16_9'
    ],
    featured: true,
    status: 'completed',
    completion_date: '2024-02-20',
    budget: 45000,
    testimonial: {
      id: '2',
      client_name: 'Carlos Mendieta',
      company: 'Bar El Puerto',
      rating: 5,
      testimonial_text: 'Increíble transformación de nuestro bar. Mantuvieron la esencia tradicional mientras modernizaban el espacio. Los clientes están encantados.',
      project: 'Bar Cafetería Casco Viejo'
    }
  },
  {
    id: '3',
    title: 'Restaurante Gourmet Indautxu',
    description: 'Creación de restaurante de alta cocina con cocina abierta y terraza. Diseño contemporáneo con materiales premium y iluminación especial.',
    category: 'Restaurantes',
    tags: ['PREMIUM', 'Restauración', 'Diseño contemporáneo'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20restaurant%20interior%20gourmet%20kitchen%20open%20concept%20bilbao&image_size=landscape_16_9',
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20terrace%20outdoor%20dining%20modern%20design%20bilbao&image_size=landscape_16_9'
    ],
    featured: false,
    status: 'completed',
    completion_date: '2024-01-10',
    budget: 120000,
    testimonial: {
      id: '3',
      client_name: 'Elena Rodríguez',
      company: 'Restaurante Ambrosía',
      rating: 5,
      testimonial_text: 'Profesionales excepcionales. Crearon el restaurante de nuestros sueños con atención a cada detalle. La cocina abierta es espectacular.',
      project: 'Restaurante Gourmet Indautxu'
    }
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'María García',
    company: 'Familia García',
    avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20woman%20portrait%20happy%20client%20spanish&image_size=square',
    rating: 5,
    testimonial_text: 'Excelente trabajo. Transformaron completamente nuestra casa con un diseño moderno y funcional. El equipo fue muy profesional y cumplió con los plazos.',
    project: 'Reforma Integral Vivienda Bilbao'
  },
  {
    id: '2',
    client_name: 'Carlos Mendieta',
    company: 'Bar El Puerto',
    avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20man%20portrait%20happy%20client%20spanish%20bar%20owner&image_size=square',
    rating: 5,
    testimonial_text: 'Increíble transformación de nuestro bar. Mantuvieron la esencia tradicional mientras modernizaban el espacio. Los clientes están encantados.',
    project: 'Bar Casco Viejo'
  },
  {
    id: '3',
    client_name: 'Elena Rodríguez',
    company: 'Restaurante Ambrosía',
    avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20woman%20portrait%20restaurant%20owner%20elegant&image_size=square',
    rating: 5,
    testimonial_text: 'Profesionales excepcionales. Crearon el restaurante de nuestros sueños con atención a cada detalle. La cocina abierta es espectacular.',
    project: 'Restaurante Gourmet'
  },
  {
    id: '4',
    client_name: 'Antonio López',
    company: 'Grupo Inmobiliario López',
    avatar_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20man%20portrait%20business%20executive%20spanish&image_size=square',
    rating: 5,
    testimonial_text: 'Trabajamos con Unamunzaga en múltiples proyectos. Su profesionalismo y calidad son inigualables. Siempre cumplen con los plazos y presupuestos.'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Reformas Integrales: Guía Completa para Transformar tu Vivienda',
    slug: 'reformas-integrales-guia-completa',
    excerpt: 'Descubre todo lo que necesitas saber sobre reformas integrales: desde la planificación hasta la ejecución. Consejos de expertos con más de 20 años de experiencia.',
    content: 'Contenido completo sobre reformas integrales...',
    featured_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=home%20renovation%20guide%20interior%20design%20tips%20professional&image_size=landscape_16_9',
    tags: ['Reformas', 'Consejos', 'Guía'],
    category: 'Reformas integrales',
    published: true,
    published_at: '2024-03-01',
    created_at: '2024-02-15'
  },
  {
    id: '2',
    title: 'Caso de Éxito: Transformación de Bar Histórico en Bilbao',
    slug: 'caso-exito-bar-historico-bilbao',
    excerpt: 'Cómo transformamos un bar histórico del Casco Viejo manteniendo su esencia tradicional mientras lo modernizábamos para el siglo XXI.',
    content: 'Detalles del proyecto del bar histórico...',
    featured_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=historic%20bar%20transformation%20before%20after%20bilbao%20success%20story&image_size=landscape_16_9',
    tags: ['Casos de éxito', 'Bares', 'Renovación'],
    category: 'Casos de éxito',
    published: true,
    published_at: '2024-02-15',
    created_at: '2024-02-10'
  },
  {
    id: '3',
    title: 'Colaboración con Arquitectos: Diseños Innovadores para Restaurantes',
    slug: 'colaboracion-arquitectos-restaurantes',
    excerpt: 'Exploramos nuestra colaboración con arquitectos de renombre para crear espacios gastronómicos únicos que combinan funcionalidad y estética.',
    content: 'Detalles sobre colaboraciones con arquitectos...',
    featured_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=architect%20collaboration%20restaurant%20design%20innovative%20spaces&image_size=landscape_16_9',
    tags: ['Colaboraciones', 'Arquitectos', 'Restaurantes'],
    category: 'Colaboraciones',
    published: true,
    published_at: '2024-02-01',
    created_at: '2024-01-25'
  }
];

export const mockKPIs: KPI[] = [
  {
    label: 'Años de experiencia',
    value: 20,
    suffix: '+',
    description: 'Más de dos décadas transformando espacios'
  },
  {
    label: 'Proyectos ejecutados',
    value: 10000,
    suffix: '+',
    description: 'Miles de clientes satisfechos'
  },
  {
    label: 'Clientes satisfechos',
    value: 98,
    suffix: '%',
    description: 'Tasa de satisfacción demostrada'
  }
];
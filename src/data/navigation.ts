import {
  Home,
  Briefcase,
  Users,
  Phone,
  Calculator,
  UserPlus,
  BookOpen,
  Sparkles,
  Box,
  Building2,
  Bath,
  Store,
  Building,
  Eye,
  Star,
  HelpCircle,
  Coffee,
  Hammer,
  Heart,
  Shield,
  Award,
  MapPin,
  GraduationCap,
  Smile,
  Gift,
  FileText,
  Send,
  PhoneCall,
  MessageCircle,
  Mail,
  Share2,
  Calendar,
  Clock
} from 'lucide-react';

export const navigationItems = [
  { label: 'Inicio', href: '/', icon: Home, hasDropdown: true },
  { label: 'Servicios', href: '/servicios', icon: Briefcase, hasDropdown: true },
  { label: 'Proyectos', href: '/proyectos', icon: Users, hasDropdown: true },
  { label: 'Nosotros', href: '/nosotros', icon: BookOpen, hasDropdown: true },
  { label: 'Bolsa de Empleo', href: '/bolsa-empleo', icon: UserPlus, hasDropdown: true },
  { label: 'Contacto', href: '/contacto', icon: Phone, hasDropdown: true }
];

export const navDropdownData = {
  '/': {
    title: 'Bienvenido a Unamunzaga',
    featured: [
      { id: 'latest-projects', title: 'Últimos Proyectos', description: 'Descubre nuestras reformas más recientes', icon: Sparkles, href: '/proyectos' },
      { id: 'request-quote', title: 'Pide tu Presupuesto', description: 'Sin compromiso y a medida', icon: Calculator, href: '/contacto' }
    ],
    items: [
      { id: 'hero', title: 'Nuestra Propuesta', icon: Home, href: '/#hero' },
      { id: 'why-us', title: 'Por qué elegirnos', icon: Star, href: '/#features' },
      { id: 'testimonials', title: 'Clientes Felices', icon: Users, href: '/#testimonials' },
      { id: 'faq', title: 'Preguntas Frecuentes', icon: HelpCircle, href: '/#faq' }
    ]
  },
  '/servicios': {
    title: 'Nuestros Servicios',
    featured: [
      { id: 'ai-redesign', title: 'Rediseña tu espacio con IA', description: 'Prueba nuestra herramienta de diseño inteligente', icon: Sparkles, href: '/servicios#editor-ia' },
      { id: 'ai-3d', title: 'Tu plano en 3D', description: 'Visualiza el resultado final antes de empezar', icon: Box, href: '/servicios#editor-ia-2' }
    ],
    items: [
      { id: 'viviendas', title: 'Reformas Integrales', icon: Building2, href: '/servicios#viviendas' },
      { id: 'cocinas', title: 'Cocinas y Baños', icon: Bath, href: '/servicios#cocinas-banos' },
      { id: 'locales', title: 'Locales Comerciales', icon: Store, href: '/servicios#locales' },
      { id: 'fachadas', title: 'Fachadas y Tejados', icon: Building, href: '/servicios#fachadas' }
    ]
  },
  '/proyectos': {
    title: 'Nuestro Portfolio',
    featured: [
      { id: 'featured-work', title: 'Obras Destacadas', description: 'Proyectos premiados y de alta gama', icon: Star, href: '/proyectos?sort=featured' },
      { id: '360-tours', title: 'Tours Virtuales 360°', description: 'Visita nuestras obras desde tu pantalla', icon: Eye, href: '/proyectos#360' }
    ],
    items: [
      { id: 'residential', title: 'Viviendas', icon: Home, href: '/proyectos?category=viviendas' },
      { id: 'commercial', title: 'Locales y Negocios', icon: Store, href: '/proyectos?category=locales-comerciales' },
      { id: 'hospitality', title: 'Bares y Restaurantes', icon: Coffee, href: '/proyectos?category=bares-restaurantes' },
      { id: 'restoration', title: 'Rehabilitaciones', icon: Hammer, href: '/proyectos?category=fachadas' }
    ]
  },
  '/nosotros': {
    title: 'Sobre Unamunzaga',
    featured: [
      { id: 'team', title: 'Nuestro Equipo', description: 'Conoce a los profesionales detrás de cada obra', icon: Users, href: '/nosotros#equipo' },
      { id: 'history', title: 'Nuestra Historia', description: 'Más de 20 años construyendo sueños', icon: Clock, href: '/nosotros#historia' }
    ],
    items: [
      { id: 'philosophy', title: 'Filosofía', icon: Heart, href: '/nosotros#filosofia' },
      { id: 'values', title: 'Valores', icon: Shield, href: '/nosotros#valores' },
      { id: 'certifications', title: 'Certificaciones', icon: Award, href: '/nosotros#certificados' },
      { id: 'showroom', title: 'Visita el Showroom', icon: MapPin, href: '/nosotros#showroom' }
    ]
  },
  '/bolsa-empleo': {
    title: 'Únete al Equipo',
    featured: [
      { id: 'open-positions', title: 'Ofertas Activas', description: 'Puestos disponibles actualmente', icon: Briefcase, href: '/bolsa-empleo#ofertas' },
      { id: 'internship', title: 'Prácticas', description: 'Inicia tu carrera con nosotros', icon: GraduationCap, href: '/bolsa-empleo#practicas' }
    ],
    items: [
      { id: 'culture', title: 'Cultura de Empresa', icon: Smile, href: '/bolsa-empleo#cultura' },
      { id: 'benefits', title: 'Beneficios', icon: Gift, href: '/bolsa-empleo#beneficios' },
      { id: 'process', title: 'Proceso de Selección', icon: FileText, href: '/bolsa-empleo#proceso' },
      { id: 'form', title: 'Enviar CV', icon: Send, href: '/bolsa-empleo#formulario' }
    ]
  },
  '/contacto': {
    title: 'Hablemos',
    featured: [
      { id: 'call-now', title: 'Llámanos Ahora', description: 'Atención inmediata: 944 123 456', icon: PhoneCall, href: 'tel:+34944123456' },
      { id: 'whatsapp', title: 'WhatsApp', description: 'Escríbenos directamente', icon: MessageCircle, href: 'https://wa.me/34666123456' }
    ],
    items: [
      { id: 'location', title: 'Dónde Estamos', icon: MapPin, href: '/contacto#mapa' },
      { id: 'form', title: 'Formulario Web', icon: Mail, href: '/contacto#formulario' },
      { id: 'social', title: 'Redes Sociales', icon: Share2, href: '/contacto#social' },
      { id: 'schedule', title: 'Horarios', icon: Calendar, href: '/contacto#horario' }
    ]
  }
};

import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Users,
  Phone,
  Menu,
  X,
  Search,
  Calculator,
  UserPlus,
  BookOpen,
  Sparkles,
  Box,
  Building2,
  Bath,
  Store,
  Building,
  ArrowRight,
  Eye,
  ChevronDown,
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
import { cn } from '../../lib/utils';
import { useScrollEffects } from '../../hooks/useScrollEffects';
import logo from '../../assets/logo.png';
import GlobalSearch from '../search/GlobalSearch';
import './DropdownMenu.css';

const navigationItems = [
  { label: 'Inicio', href: '/', icon: Home, hasDropdown: true },
  { label: 'Servicios', href: '/servicios', icon: Briefcase, hasDropdown: true },
  { label: 'Proyectos', href: '/proyectos', icon: Users, hasDropdown: true },
  { label: 'Nosotros', href: '/nosotros', icon: BookOpen, hasDropdown: true },
  { label: 'Bolsa de Empleo', href: '/bolsa-empleo', icon: UserPlus, hasDropdown: true },
  { label: 'Contacto', href: '/contacto', icon: Phone, hasDropdown: true }
];

// Rich Dropdown Data for ALL navigation items
const navDropdownData = {
  '/': {
    title: 'Bienvenido a Unamunzaga',
    featured: [
      {
        id: 'latest-projects',
        title: 'Últimos Proyectos',
        description: 'Descubre nuestras reformas más recientes',
        icon: Sparkles,
        href: '/proyectos'
      },
      {
        id: 'request-quote',
        title: 'Pide tu Presupuesto',
        description: 'Sin compromiso y a medida',
        icon: Calculator,
        href: '/contacto'
      }
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
      {
        id: 'ai-redesign',
        title: 'Rediseña tu espacio con IA',
        description: 'Prueba nuestra herramienta de diseño inteligente',
        icon: Sparkles,
        href: '/servicios#editor-ia'
      },
      {
        id: 'ai-3d',
        title: 'Tu plano en 3D',
        description: 'Visualiza el resultado final antes de empezar',
        icon: Box,
        href: '/servicios#editor-ia-2'
      }
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
      {
        id: 'featured-work',
        title: 'Obras Destacadas',
        description: 'Proyectos premiados y de alta gama',
        icon: Star,
        href: '/proyectos?sort=featured'
      },
      {
        id: '360-tours',
        title: 'Tours Virtuales 360°',
        description: 'Visita nuestras obras desde tu pantalla',
        icon: Eye,
        href: '/proyectos#360'
      }
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
      {
        id: 'team',
        title: 'Nuestro Equipo',
        description: 'Conoce a los profesionales detrás de cada obra',
        icon: Users,
        href: '/nosotros#equipo'
      },
      {
        id: 'history',
        title: 'Nuestra Historia',
        description: 'Más de 20 años construyendo sueños',
        icon: Clock,
        href: '/nosotros#historia'
      }
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
      {
        id: 'open-positions',
        title: 'Ofertas Activas',
        description: 'Puestos disponibles actualmente',
        icon: Briefcase,
        href: '/bolsa-empleo#ofertas'
      },
      {
        id: 'internship',
        title: 'Prácticas',
        description: 'Inicia tu carrera con nosotros',
        icon: GraduationCap,
        href: '/bolsa-empleo#practicas'
      }
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
      {
        id: 'call-now',
        title: 'Llámanos Ahora',
        description: 'Atención inmediata: 944 123 456',
        icon: PhoneCall,
        href: 'tel:+34944123456'
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        description: 'Escríbenos directamente',
        icon: MessageCircle,
        href: 'https://wa.me/34666123456'
      }
    ],
    items: [
      { id: 'location', title: 'Dónde Estamos', icon: MapPin, href: '/contacto#mapa' },
      { id: 'form', title: 'Formulario Web', icon: Mail, href: '/contacto#formulario' },
      { id: 'social', title: 'Redes Sociales', icon: Share2, href: '/contacto#social' },
      { id: 'schedule', title: 'Horarios', icon: Calendar, href: '/contacto#horario' }
    ]
  }
};

export const ModernNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScrollEffects();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    // Keep scroll effects hook active
  }, [scrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isClickInsideDropdown = dropdownRef.current?.contains(target);
      const isClickInsideNavButton = Object.values(navRefs.current).some(ref => ref?.contains(target));

      if (!isClickInsideDropdown && !isClickInsideNavButton) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (target: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);

    if (target.includes('#')) {
      const [path, hash] = target.split('#');

      if (location.pathname === path || path === '') {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate(target);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    } else if (target.startsWith('/') || target.startsWith('http') || target.startsWith('tel:') || target.startsWith('mailto:')) {
      if (target.startsWith('http')) {
        window.open(target, '_blank');
      } else if (target.startsWith('tel:') || target.startsWith('mailto:')) {
        window.location.href = target;
      } else {
        navigate(target);
      }
    } else {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDropdown = (href: string) => {
    if (activeDropdown === href) {
      if (href === '/' || href === '/proyectos' || href === '/servicios' || href === '/nosotros' || href === '/bolsa-empleo' || href === '/contacto') {
        scrollToSection(href);
      }
      setActiveDropdown(null);
    } else {
      setActiveDropdown(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <img src={logo} alt="Unamunzaga Obras Logo" className="h-28 w-auto" />
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isHashLink = item.href.includes('#');
                const isActive = isHashLink
                  ? (location.pathname + location.hash) === item.href
                  : location.pathname === item.href;
                const isDropdownOpen = activeDropdown === item.href;

                // Get data for this dropdown
                const dropdownData = navDropdownData[item.href as keyof typeof navDropdownData];

                return (
                  <div key={item.href} className="relative">
                    <motion.button
                      ref={el => navRefs.current[item.href] = el}
                      onClick={() => toggleDropdown(item.href)}
                      onMouseEnter={() => setActiveDropdown(item.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'relative px-4 py-2 rounded-lg transition-all duration-300 group',
                        'flex items-center space-x-2 text-sm font-medium',
                        isActive
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-blue-900 hover:text-blue-900 hover:bg-blue-100'
                      )}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform duration-300",
                            isDropdownOpen && "rotate-180"
                          )}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className={cn(
                            'absolute bottom-0 left-0 right-0 h-0.5',
                            'bg-blue-900'
                          )}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>

                    {/* Rich Dropdown content */}
                    <AnimatePresence>
                      {isDropdownOpen && dropdownData && (
                        <motion.div
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="dropdown-menu"
                          style={{ width: '640px', maxWidth: '90vw' }}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-blue-900 font-semibold">
                            <Icon className="w-5 h-5" />
                            {dropdownData.title}
                          </div>

                          <div className="flex">
                            {/* Featured Side */}
                            <div className="w-2/5 p-4 border-r border-gray-100 bg-white">
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">DESTACADO</div>
                              <div className="space-y-3">
                                {dropdownData.featured.map((feature, idx) => {
                                  const FeatureIcon = feature.icon;
                                  return (
                                    <div
                                      key={feature.id}
                                      onClick={() => scrollToSection(feature.href)}
                                      className="group cursor-pointer p-3 rounded-xl hover:bg-blue-100 transition-colors border border-transparent hover:border-blue-200"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors">
                                          <FeatureIcon className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-900">{feature.title}</div>
                                          <div className="text-xs text-gray-700 mt-0.5 leading-snug">{feature.description}</div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Standard Links Side */}
                            <div className="w-3/5 p-4 bg-gray-50/50">
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">SECCIONES</div>
                              <div className="grid grid-cols-1 gap-2">
                                {dropdownData.items.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <div
                                      key={subItem.id}
                                      onClick={() => scrollToSection(subItem.href)}
                                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-100 cursor-pointer transition-all group"
                                    >
                                      <SubIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-900 transition-colors" />
                                      <span className="text-sm font-medium text-gray-800 group-hover:text-blue-900">{subItem.title}</span>
                                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </div>
                                  );
                                })}
                              </div>

                              <button
                                onClick={() => scrollToSection(item.href)}
                                className="w-full mt-4 py-2 px-4 bg-white border border-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-blue-100 hover:text-blue-900 hover:border-blue-300 transition-all flex items-center justify-center gap-2"
                              >
                                <span>Ir a {item.label}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'p-2 rounded-lg transition-colors duration-300',
                  'text-gray-800 hover:text-blue-900 hover:bg-blue-100'
                )}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('/contacto')}
                className={cn(
                  'hidden lg:flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-300',
                  'bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl'
                )}
              >
                <Calculator className="w-4 h-4" />
                <span>Solicita Presupuesto</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors duration-300',
                  'text-gray-800 hover:text-blue-900 hover:bg-blue-100'
                )}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  const dropdownData = navDropdownData[item.href as keyof typeof navDropdownData];
                  const isOpen = activeDropdown === item.href;

                  // Rich mobile menu
                  return (
                    <div key={item.href}>
                      <motion.button
                        onClick={() => setActiveDropdown(isOpen ? null : item.href)}
                        whileHover={{ x: 8 }}
                        className={cn(
                          'w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300',
                          isActive
                            ? 'text-blue-900 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.hasDropdown && (
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                          />
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {isOpen && dropdownData && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 rounded-lg mt-1 overflow-hidden"
                          >
                            <div className="p-3">
                              {/* Featured Mobile */}
                              <div className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2 px-1">DESTACADO</div>
                              <div className="space-y-2 mb-4">
                                {dropdownData.featured.map((feature) => {
                                  const FeatureIcon = feature.icon;
                                  return (
                                    <div
                                      key={feature.id}
                                      onClick={() => scrollToSection(feature.href)}
                                      className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm"
                                    >
                                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                                        <FeatureIcon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <div className="font-medium text-sm text-gray-900">{feature.title}</div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Links Mobile */}
                              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">EXPLORAR</div>
                              <div className="grid grid-cols-1 gap-1">
                                {dropdownData.items.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <div
                                      key={subItem.id}
                                      onClick={() => scrollToSection(subItem.href)}
                                      className="flex items-center gap-3 p-2 rounded-lg active:bg-gray-200/50"
                                    >
                                      <SubIcon className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-700">{subItem.title}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              <button
                                onClick={() => scrollToSection(item.href)}
                                className="w-full mt-3 py-2 px-4 bg-blue-900 text-white rounded-lg text-sm font-medium active:scale-95 transition-transform flex items-center justify-center gap-2"
                              >
                                <span>Ver todo {item.label}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <motion.button
                  whileHover={{ x: 8 }}
                  onClick={() => scrollToSection('/contacto')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 mt-4"
                >
                  <Calculator className="w-5 h-5" />
                  <span className="font-medium">Solicita Presupuesto</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

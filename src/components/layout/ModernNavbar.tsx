import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
  BookOpen
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollEffects } from '../../hooks/useScrollEffects';
import logo from '../../assets/logo.png';
import GlobalSearch from '../search/GlobalSearch';

const navigationItems = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Servicios', href: '/servicios', icon: Briefcase },
  { label: 'Proyectos', href: '/proyectos', icon: Users },
  { label: 'Nosotros', href: '/nosotros', icon: BookOpen },
  { label: 'Bolsa de Empleo', href: '/bolsa-empleo', icon: UserPlus },
  { label: 'Contacto', href: '/contacto', icon: Phone }
];

export const ModernNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScrollEffects();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Keep scroll effects hook active for potential future UI changes
  }, [scrollY]);

  const scrollToSection = (target: string) => {
    if (target.startsWith('/#')) {
      navigate(target);
    } else if (target.startsWith('/')) {
      navigate(target);
    } else {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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

                return (
                  <Link to={item.href} key={item.href}>
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'relative px-4 py-2 rounded-lg transition-all duration-300 group',
                        'flex items-center space-x-2 text-sm font-medium',
                        isActive
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                      )}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.label}</span>
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
                  </Link>
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
                  'text-gray-700 hover:text-blue-900 hover:bg-blue-50' 
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
                  'text-gray-700 hover:text-blue-900 hover:bg-blue-50' 
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
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isHashLink = item.href.includes('#');
                  const isActive = isHashLink
                    ? (location.pathname + location.hash) === item.href
                    : location.pathname === item.href;

                  return (
                    <Link to={item.href} key={item.href}>
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        whileHover={{ x: 8 }}
                        className={cn(
                          'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300',
                          isActive
                            ? 'text-blue-900 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    </Link>
                  );
              })}
                
                <motion.button
                  whileHover={{ x: 8 }}
                  onClick={() => scrollToSection('/contacto')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300"
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

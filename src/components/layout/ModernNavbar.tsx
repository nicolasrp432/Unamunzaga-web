import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import {
  Menu,
  X,
  Search,
  Calculator,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { useScrollEffects } from '../../hooks/useScrollEffects';
import logo from '../../assets/logo.png';
import GlobalSearch from '../search/GlobalSearch';
import { navigationItems, navDropdownData } from '../../data/navigation';

/**
 * @component ModernNavbar
 * @description Main navigation component for the application.
 * Implements a responsive navbar with desktop dropdowns and a mobile accordion menu.
 * Uses styled-components for styling and Framer Motion for animations.
 * 
 * Features:
 * - Sticky positioning with scroll effects
 * - Responsive design (Desktop/Mobile)
 * - Animated dropdowns and mobile menu
 * - Global search integration
 * - Accessible navigation (ARIA attributes)
 * - Themed using CSS variables
 */

// --- STYLED COMPONENTS ---

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-normal);
  will-change: transform;

  /* Protect text colors from external overrides */
  span {
    color: inherit;
  }
`;

const NavContainer = styled.div`
  max-width: 80rem; /* 7xl */
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) { padding: 0 1.5rem; }
  @media (min-width: 1024px) { padding: 0 2rem; }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  @media (min-width: 1024px) { height: 5rem; }
`;

const DesktopNav = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const NavItemButton = styled(motion.button)<{ $isActive?: boolean }>`
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.$isActive ? 'var(--color-accent)' : 'var(--color-text-dark)'};
  background: ${props => props.$isActive ? 'var(--color-accent-transparent-5)' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    color: var(--color-accent);
    background: var(--color-accent-transparent-5);
  }

  svg {
    transition: transform var(--transition-normal);
  }

  &:hover svg:first-child {
    transform: scale(1.1);
  }

  span {
    color: inherit;
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
  overflow: hidden;
  z-index: 60;
  will-change: opacity, transform;
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  background: var(--color-bg-light);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent);
  font-weight: 600;
`;

const DropdownContent = styled.div`
  display: flex;
`;

const FeaturedSide = styled.div`
  width: 40%;
  padding: 1rem;
  border-right: 1px solid var(--color-border);
  background: white;
`;

const LinksSide = styled.div`
  width: 60%;
  padding: 1rem;
  background: rgba(249, 250, 251, 0.5);
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`;

const FeaturedItem = styled.div`
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all var(--transition-normal);
  border: 1px solid transparent;

  &:hover {
    background: var(--color-accent-transparent-5);
    border-color: var(--color-accent-transparent-10);
  }
`;

const IconWrapper = styled.div`
  padding: 0.5rem;
  background: var(--color-accent-transparent-10);
  color: var(--color-accent);
  border-radius: 0.5rem;
  transition: all var(--transition-normal);

  ${FeaturedItem}:hover & {
    background: var(--color-accent);
    color: white;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled(motion.button)`
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--color-text);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    color: var(--color-accent);
    background: var(--color-accent-transparent-5);
  }
`;

const CTAButton = styled(motion.button)`
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: white;
  background: var(--color-accent);
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--color-accent-dark);
    box-shadow: var(--shadow-lg);
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const MobileMenuToggle = styled(motion.button)`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--color-text);
  background: transparent;
  border: none;
  cursor: pointer;
  
  @media (min-width: 1024px) {
    display: none;
  }

  &:hover {
    color: var(--color-accent);
    background: rgba(213, 66, 25, 0.05);
  }
`;

const MobileMenu = styled(motion.div)`
  border-top: 1px solid var(--color-border);
  background: white;
  max-height: 80vh;
  overflow-y: auto;
  will-change: height, opacity;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileMenuItem = styled(motion.button)<{ $isActive?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  text-align: left;
  background: ${props => props.$isActive ? 'rgba(213, 66, 25, 0.05)' : 'transparent'};
  color: ${props => props.$isActive ? 'var(--color-accent)' : 'var(--color-text)'};
  border: none;
  border-radius: 0.5rem;
  transition: all var(--transition-normal);

  &:hover {
    color: var(--color-accent);
    background: rgba(213, 66, 25, 0.05);
  }
`;

const MobileSubMenu = styled(motion.div)`
  background: var(--color-bg-light);
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  overflow: hidden;
  will-change: height, opacity;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: white;
    color: var(--color-accent);
  }

  /* Specific handling for icon colors */
  svg {
    color: var(--color-text-light);
    transition: color 0.2s;
  }

  &:hover svg {
    color: var(--color-accent);
  }
  
  /* Text color override */
  span {
    color: var(--color-text);
    transition: color 0.2s;
  }
  
  &:hover span {
    color: var(--color-accent);
  }
`;

// --- COMPONENT ---

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

    const smoothScrollTo = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        // Adjust offset based on navbar height (approx 5rem on desktop, 4rem on mobile)
        const headerOffset = window.innerWidth >= 1024 ? 90 : 70; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (target.includes('#')) {
      const [path, hash] = target.split('#');
      const normalizedCurrentPath = location.pathname.replace(/\/$/, '') || '/';
      const normalizedTargetPath = path.replace(/\/$/, '') || '/';
      
      if (normalizedCurrentPath === normalizedTargetPath || (path === '' && hash)) {
        setTimeout(() => smoothScrollTo(hash), 100);
      } else {
        // Navigate to the page first
        navigate(path);
        // Wait for page load then scroll
        setTimeout(() => smoothScrollTo(hash), 500);
      }
    } else if (target.startsWith('/') || target.startsWith('http') || target.startsWith('tel:') || target.startsWith('mailto:')) {
      if (target.startsWith('http')) {
        window.open(target, '_blank');
      } else if (target.startsWith('tel:') || target.startsWith('mailto:')) {
        window.location.href = target;
      } else {
        navigate(target);
        window.scrollTo(0, 0);
      }
    } else {
      // Fallback for simple IDs
      smoothScrollTo(target);
    }
  };

  const toggleDropdown = (href: string) => {
    if (activeDropdown === href) {
      if (['/', '/proyectos', '/servicios', '/nosotros', '/bolsa-empleo', '/contacto'].includes(href)) {
        scrollToSection(href);
      }
      setActiveDropdown(null);
    } else {
      setActiveDropdown(href);
    }
  };

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <NavContainer>
          <NavContent>
            {/* Logo */}
            <a href="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <img src={logo} alt="Unamunzaga Obras Logo" className="h-28 w-auto" />
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <DesktopNav>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isHashLink = item.href.includes('#');
                const isActive = isHashLink
                  ? (location.pathname + location.hash) === item.href
                  : location.pathname === item.href;
                const isDropdownOpen = activeDropdown === item.href;
                const dropdownData = navDropdownData[item.href as keyof typeof navDropdownData];

                return (
                  <div key={item.href} style={{ position: 'relative' }}>
                    <NavItemButton
                      ref={el => navRefs.current[item.href] = el}
                      onClick={() => toggleDropdown(item.href)}
                      onMouseEnter={() => setActiveDropdown(item.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      $isActive={isActive}
                      aria-haspopup={item.hasDropdown ? 'true' : undefined}
                      aria-expanded={isDropdownOpen}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className="w-3 h-3"
                          style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      )}
                      {isActive && (
                        <ActiveIndicator
                          layoutId="activeTab"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </NavItemButton>

                    <AnimatePresence>
                      {isDropdownOpen && dropdownData && (
                        <DropdownMenu
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          style={{ width: '640px' }}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <DropdownHeader>
                            <Icon className="w-5 h-5" />
                            {dropdownData.title}
                          </DropdownHeader>

                          <DropdownContent>
                            <FeaturedSide>
                              <SectionTitle>DESTACADO</SectionTitle>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {dropdownData.featured.map((feature) => {
                                  const FeatureIcon = feature.icon;
                                  return (
                                    <FeaturedItem
                                      key={feature.id}
                                      onClick={() => scrollToSection(feature.href)}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                        <IconWrapper>
                                          <FeatureIcon className="w-4 h-4" />
                                        </IconWrapper>
                                        <div>
                                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-dark)' }}>
                                            {feature.title}
                                          </div>
                                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.125rem' }}>
                                            {feature.description}
                                          </div>
                                        </div>
                                      </div>
                                    </FeaturedItem>
                                  );
                                })}
                              </div>
                            </FeaturedSide>

                            <LinksSide>
                              <SectionTitle>SECCIONES</SectionTitle>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                                {dropdownData.items.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <LinkItem
                                      key={subItem.id}
                                      onClick={() => scrollToSection(subItem.href)}
                                    >
                                      <SubIcon className="w-4 h-4" />
                                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                        {subItem.title}
                                      </span>
                                    </LinkItem>
                                  );
                                })}
                              </div>

                                <button
                                  onClick={() => scrollToSection(item.href)}
                                  style={{
                                    width: '100%', marginTop: '1rem', padding: '0.5rem 1rem', background: 'white',
                                    border: '1px solid var(--color-border)', borderRadius: '0.5rem',
                                    fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                  }}
                                  className="hover:border-accent hover:text-accent"
                                >
                                  <span>Ir a {item.label}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </LinksSide>
                            </DropdownContent>
                        </DropdownMenu>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </DesktopNav>

            {/* Right Side Actions */}
            <ActionButtons>
              <IconButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </IconButton>

              <CTAButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('/contacto')}
              >
                <Calculator className="w-4 h-4" />
                <span>Solicita Presupuesto</span>
              </CTAButton>

              <MobileMenuToggle
                data-testid="mobile-menu-toggle"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </MobileMenuToggle>
            </ActionButtons>
          </NavContent>
        </NavContainer>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  const dropdownData = navDropdownData[item.href as keyof typeof navDropdownData];
                  const isOpen = activeDropdown === item.href;

                  return (
                    <div key={item.href}>
                      <MobileMenuItem
                        onClick={() => setActiveDropdown(isOpen ? null : item.href)}
                        $isActive={isActive}
                        whileHover={{ x: 4 }}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-submenu-${item.href}`}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Icon className="w-5 h-5" />
                          <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </div>
                        {item.hasDropdown && (
                          <ChevronDown
                            className="w-4 h-4"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                          />
                        )}
                      </MobileMenuItem>

                      <AnimatePresence>
                        {isOpen && dropdownData && (
                          <MobileSubMenu
                            id={`mobile-submenu-${item.href}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div style={{ padding: '0.75rem' }}>
                              <SectionTitle style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>DESTACADO</SectionTitle>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                {dropdownData.featured.map((feature) => {
                                  const FeatureIcon = feature.icon;
                                  return (
                                    <div
                                      key={feature.id}
                                      onClick={() => scrollToSection(feature.href)}
                                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'white', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}
                                    >
                                      <div style={{ padding: '0.375rem', background: 'rgba(213, 66, 25, 0.1)', color: 'var(--color-accent)', borderRadius: '0.375rem' }}>
                                        <FeatureIcon className="w-4 h-4" />
                                      </div>
                                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-dark)' }}>{feature.title}</div>
                                    </div>
                                  );
                                })}
                              </div>

                              <SectionTitle style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>EXPLORAR</SectionTitle>
                              <div style={{ display: 'grid', gap: '0.25rem' }}>
                                {dropdownData.items.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <button
                                      key={subItem.id}
                                      onClick={() => scrollToSection(subItem.href)}
                                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}
                                      className="active:bg-gray-100"
                                    >
                                      <SubIcon className="w-4 h-4 text-gray-400" />
                                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>{subItem.title}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                onClick={() => scrollToSection(item.href)}
                                style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', background: 'var(--color-accent)', color: 'white', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none' }}
                              >
                                <span>Ver todo {item.label}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </MobileSubMenu>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection('/contacto')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--color-accent)', color: 'white', borderRadius: '0.5rem', border: 'none', marginTop: '1rem', fontWeight: 500 }}
                >
                  <Calculator className="w-5 h-5" />
                  <span>Solicita Presupuesto</span>
                </motion.button>
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
      </Nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { ModernNavbar } from './ModernNavbar';

// Ensure cleanup after each test to avoid DOM leakage
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  const React = await import('react');
  
  // Helper to filter out motion-specific props that React doesn't recognize on DOM elements
  const filterMotionProps = (props: any) => {
    const { 
      layoutId, whileHover, whileTap, initial, animate, exit, 
      transition, variants, onAnimationComplete, viewport,
      ...validProps 
    } = props;
    return validProps;
  };

  return {
    ...actual,
    motion: {
      nav: React.forwardRef(({ children, ...props }: any, ref: any) => <nav ref={ref} {...filterMotionProps(props)}>{children}</nav>),
      div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...filterMotionProps(props)}>{children}</div>),
      // Use actual button or simplified mock without intercepting logic to reduce variables
      button: React.forwardRef(({ children, ...props }: any, ref: any) => <button ref={ref} {...filterMotionProps(props)}>{children}</button>),
      a: React.forwardRef(({ children, ...props }: any, ref: any) => <a ref={ref} {...filterMotionProps(props)}>{children}</a>),
      span: React.forwardRef(({ children, ...props }: any, ref: any) => <span ref={ref} {...filterMotionProps(props)}>{children}</span>),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock hooks
vi.mock('../../hooks/useScrollEffects', () => ({
  useScrollEffects: () => ({
    scrollY: 0,
    isScrollingUp: false,
    scrollDirection: null,
    isAtTop: true,
    isAtBottom: false,
  }),
}));

// Mock GlobalSearch
vi.mock('../search/GlobalSearch', () => ({
  default: () => <div data-testid="global-search-mock" />,
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.scrollTo
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

describe('ModernNavbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <ModernNavbar />
      </BrowserRouter>
    );
    expect(screen.getByAltText('Unamunzaga Obras Logo')).toBeInTheDocument();
    // Desktop menu items
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    // Force mobile viewport for this test
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <ModernNavbar />
      </BrowserRouter>
    );

    const toggleButton = screen.getByTestId('mobile-menu-toggle');
    expect(toggleButton).toBeInTheDocument();
    
    // Click to open
    fireEvent.click(toggleButton);

    // Wait for state change and animation (simulated)
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      expect(toggleButton).toHaveAttribute('aria-label', 'Cerrar menú');
    });
    
    // Check if mobile menu content is visible
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('handles mobile submenu interaction', async () => {
    // Set mobile size
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <ModernNavbar />
      </BrowserRouter>
    );

    // Open mobile menu
    const toggleButton = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    // Find "Servicios" item in mobile menu.
    // Since there are desktop and mobile items, and both render "Servicios", we need to distinguish.
    // The mobile items are inside the mobile menu container.
    // But standard queries might return multiple.
    // Let's rely on the fact that mobile menu is the one visible or just query all and click the one that has aria-controls starting with "mobile-submenu".
    
    const serviciosButtons = screen.getAllByText('Servicios');
    // Find the one that is a button and part of mobile menu logic (has aria-controls)
    // Actually, in my code:
    // MobileMenuItem has aria-controls={`mobile-submenu-${item.href}`}
    // Desktop NavItemButton has aria-haspopup but NOT aria-controls (for submenu, it just toggles dropdown).
    
    // Let's look for the button with aria-controls="mobile-submenu-/servicios"
    // I need to use a custom query or querySelector.
    const mobileServiciosBtn = document.querySelector('[aria-controls="mobile-submenu-/servicios"]');
    expect(mobileServiciosBtn).toBeInTheDocument();
    
    if (mobileServiciosBtn) {
      expect(mobileServiciosBtn).toHaveAttribute('aria-expanded', 'false');
      
      // Click to expand submenu
      fireEvent.click(mobileServiciosBtn);
      
      await waitFor(() => {
        expect(mobileServiciosBtn).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Check if submenu content is rendered
      // Submenu has ID "mobile-submenu-/servicios"
      const submenu = document.getElementById('mobile-submenu-/servicios');
      expect(submenu).toBeInTheDocument();
      
      // Click again to collapse
      fireEvent.click(mobileServiciosBtn);
      
      await waitFor(() => {
        expect(mobileServiciosBtn).toHaveAttribute('aria-expanded', 'false');
      });
    }
  });

  it('renders global search', () => {
    render(
      <BrowserRouter>
        <ModernNavbar />
      </BrowserRouter>
    );
    const searchMocks = screen.getAllByTestId('global-search-mock');
    expect(searchMocks.length).toBeGreaterThan(0);
  });
});

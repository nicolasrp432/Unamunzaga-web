import { useEffect, useState, useCallback } from 'react';

interface ScrollEffects {
  scrollY: number;
  isScrollingUp: boolean;
  scrollDirection: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export const useScrollEffects = (): ScrollEffects => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Update scroll position
    setScrollY(currentScrollY);
    
    // Check if at top
    setIsAtTop(currentScrollY < 100);
    
    // Check if at bottom
    setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 100);
    
    // Determine scroll direction
    if (currentScrollY < scrollY) {
      setIsScrollingUp(true);
      setScrollDirection('up');
    } else if (currentScrollY > scrollY) {
      setIsScrollingUp(false);
      setScrollDirection('down');
    }
  }, [scrollY]);

  useEffect(() => {
    let ticking = false;

    const updateScrollEffects = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', updateScrollEffects);
    };
  }, [handleScroll]);

  return {
    scrollY,
    isScrollingUp,
    scrollDirection,
    isAtTop,
    isAtBottom
  };
};

// Custom hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
};

// Custom hook for element visibility
export const useElementVisibility = (elementRef: React.RefObject<HTMLElement>, threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, threshold]);

  return isVisible;
};
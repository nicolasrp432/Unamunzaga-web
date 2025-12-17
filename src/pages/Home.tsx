import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './Home.css';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
const TestimonialsSection = lazy(() =>
  import('../components/sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const ServicesPreview = lazy(() =>
  import('../components/sections/ServicesPreview').then((m) => ({ default: m.ServicesPreview }))
);
const LatestPostsCarousel = lazy(() =>
  import('../components/sections/LatestPostsCarousel').then((m) => ({ default: m.LatestPostsCarousel }))
);
const ClientTrust = lazy(() => import('../components/sections/ClientTrust'));
import ModernFooter from '../components/layout/ModernFooter';
import { CTASection } from '../components/sections/CTASection';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import SEOHead from '../components/layout/SEOHead';
import { Link } from 'react-router-dom';
import type { ProjectData } from '../components/sections/PortfolioSection';
import { mockKPIs } from '../data/mockData';
import { useProjects } from '../hooks/useProjects';

import { useTestimonials } from '../hooks/useTestimonials';

const Home: React.FC = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  return (
    <HelmetProvider>
      <SEOHead />
      <div className="min-h-screen home-page bg-dark-bg overflow-x-hidden">
        <ModernNavbar />
        <main>
          <HeroSection kpis={mockKPIs} />
          <PortfolioSection projects={projects} />
          <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando servicios...</div>}>
            <ServicesPreview />
          </Suspense>
          <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando testimonios...</div>}>
            <TestimonialsSection testimonials={testimonials} loading={testimonialsLoading} />
          </Suspense>
          <CTASection />
          <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando últimas publicaciones...</div>}>
            <LatestPostsCarousel />
          </Suspense>
          <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando confianza de clientes...</div>}>
            <ClientTrust />
          </Suspense>
        </main>
        <ModernFooter />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export { Home };
export default Home;

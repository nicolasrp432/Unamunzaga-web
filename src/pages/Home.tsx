import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './Home.css';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { CTASection } from '../components/sections/CTASection';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { LatestPostsCarousel } from '../components/sections/LatestPostsCarousel';
import ClientTrust from '../components/sections/ClientTrust';
import ModernFooter from '../components/layout/ModernFooter';
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
          <ServicesPreview />
          <TestimonialsSection testimonials={testimonials} loading={testimonialsLoading} />
          <CTASection />
          <LatestPostsCarousel />
          <ClientTrust />
        </main>
        <ModernFooter />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export { Home };
export default Home;

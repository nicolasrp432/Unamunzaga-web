import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './Home.css';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
const ServicesPreview = lazy(() =>
  import('../components/sections/ServicesPreview').then((m) => ({ default: m.ServicesPreview }))
);
const LatestPostsCarousel = lazy(() =>
  import('../components/sections/LatestPostsCarousel').then((m) => ({ default: m.LatestPostsCarousel }))
);
import ClientTrust from '../components/sections/ClientTrust';
import ModernFooter from '../components/layout/ModernFooter';
import { CTASection } from '../components/sections/CTASection';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import SEOHead from '../components/layout/SEOHead';
import { Link } from 'react-router-dom';
import type { ProjectData } from '../components/sections/PortfolioSection';
import { mockKPIs } from '../data/mockData';
import { useProjects } from '../hooks/useProjects';

import { useTestimonials } from '../hooks/useTestimonials';
import FAQSection from '../components/sections/FAQSection';

const Home: React.FC = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  // Map database projects to the format expected by PortfolioSection
  const mappedProjects: ProjectData[] = projects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category || 'General',
    location: p.location || 'Bilbao',
    year: p.year ? parseInt(p.year) : new Date().getFullYear(),
    duration: p.duration || 'Consultar',
    budget: 'A consultar', // Default value since it's not in the database yet
    images: p.images || [],
    featured: p.is_featured,
    services: [],
    client_name: 'Cliente Privado'
  }));

  return (
    <HelmetProvider>
      <SEOHead />
      <div className="min-h-screen home-page bg-dark-bg overflow-x-hidden">
        <ModernNavbar />
        <main>
          <div id="hero">
            <HeroSection kpis={mockKPIs} />
          </div>
          <PortfolioSection projects={mappedProjects} />
          <div id="features">
            <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando servicios...</div>}>
              <ServicesPreview />
            </Suspense>
          </div>
          <div id="testimonials">
            <TestimonialsSection testimonials={testimonials} loading={testimonialsLoading} />
          </div>
          <CTASection />
          <Suspense fallback={<div className="py-8 text-center text-white/80">Cargando últimas publicaciones...</div>}>
            <LatestPostsCarousel />
          </Suspense>
          <ClientTrust />
          <div id="faq">
            <FAQSection />
          </div>
        </main>
        <ModernFooter />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export { Home };
export default Home;

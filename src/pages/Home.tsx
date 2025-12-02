import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { CTASection } from '../components/sections/CTASection';
import { BlogSection } from '../components/sections/BlogSection';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import ModernFooter from '../components/layout/ModernFooter';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import SEOHead from '../components/layout/SEOHead';
import projectsData from '../data/projects.json';
import type { ProjectData } from '../components/sections/PortfolioSection';
import { mockTestimonials, mockBlogPosts, mockKPIs } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <HelmetProvider>
      <SEOHead />
      <div className="min-h-screen home-page bg-dark-bg">
        <ModernNavbar />
        <main>
          <HeroSection kpis={mockKPIs} />
          <PortfolioSection projects={projectsData as ProjectData[]} />
          <ServicesPreview />
          <TestimonialsSection testimonials={mockTestimonials} />
          <CTASection />
          <BlogSection posts={mockBlogPosts} />
        </main>
        <ModernFooter />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export { Home };
export default Home;

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { CTASection } from '../components/sections/CTASection';
import { BlogSection } from '../components/sections/BlogSection';
import ModernFooter from '../components/layout/ModernFooter';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import SEOHead from '../components/layout/SEOHead';
import { mockProjects, mockTestimonials, mockBlogPosts, mockKPIs } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <HelmetProvider>
      <SEOHead />
      <div className="min-h-screen bg-white">
        <ModernNavbar />
        <main>
          <HeroSection kpis={mockKPIs} />
          <PortfolioSection projects={mockProjects} />
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

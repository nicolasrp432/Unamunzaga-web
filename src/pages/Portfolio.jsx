import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KuulaTour from '../components/kuula/KuulaTour';
import { useProjects } from '../hooks/useProjects';
import { FilterButtons } from '../components/portfolio/FilterButtons';
import { ViewToggle } from '../components/portfolio/ViewToggle';
import { ProjectGrid } from '../components/portfolio/ProjectGrid';
import { PORTFOLIO_CATEGORIES, getCategoryName, getCategoryIcon } from '../constants/portfolio';
import { CTASection } from '../components/sections/CTASection';
import './Portfolio.css';

const Portfolio = () => {
    const { projects, loading } = useProjects();
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const categories = useMemo(() => [...PORTFOLIO_CATEGORIES], []);

    return (
        <>
            <ModernNavbar />
            <div className="page portfolio-page">
            <section className="page-header">
                <div className="container">
                    <h1 className="animate-fade-in">Nuestros Proyectos</h1>
                    <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Una muestra de nuestro compromiso con la calidad y el diseño</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <FilterButtons
                            categories={categories}
                            selectedCategory={filter}
                            onCategoryChange={setFilter}
                            getCategoryName={getCategoryName}
                            getCategoryIcon={getCategoryIcon}
                        />
                        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 animate-pulse">Cargando proyectos...</p>
                        </div>
                    ) : (
                        <ProjectGrid 
                            projects={filter === 'all' ? projects : projects.filter(p => p.category === filter)} 
                            viewMode={viewMode}
                        />
                    )}
                </div>
            </section>

            {/* Recorridos 360° */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Recorridos Virtuales 360°</h2>
                    <p className="text-center mb-lg">Explora cada obra de forma inmersiva y profesional con Kuula.</p>

                    {[
                        {
                            id: 1,
                            title: 'Reforma Integral en Casco Viejo – Tour 360°',
                            description: 'Recorre la vivienda reformada y aprecia los detalles de carpintería e iluminación.',
                            src: 'https://kuula.co/share/hb9t7?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
                            category: 'viviendas'
                        },
                        {
                            id: 4,
                            title: 'Local Comercial Moderno – Tour 360°',
                            description: 'Visualiza el espacio comercial con su diseño corporativo e imagen de marca.',
                            src: 'https://kuula.co/share/hb9t7?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
                            category: 'locales'
                        },
                        {
                            id: 5,
                            title: 'Rehabilitación de Fachada – Tour 360°',
                            description: 'Observa la fachada rehabilitada y la integración estética con el entorno.',
                            src: 'https://kuula.co/share/hb9t7?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
                            category: 'fachadas'
                        }
                    ].filter(t => filter === 'all' || t.category === filter).map(tour => (
                        <KuulaTour key={tour.id} id={tour.id} title={tour.title} description={tour.description} src={tour.src} />
                    ))}
                </div>
            </section>
            <CTASection />
        </div>
        <ModernFooter />
        </>
    );
};

export default Portfolio;

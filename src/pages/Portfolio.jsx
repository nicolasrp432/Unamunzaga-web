import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import KuulaTour from '../components/kuula/KuulaTour';
import { useProjects } from '../hooks/useProjects';
import './Portfolio.css';

const Portfolio = () => {
    const { projects, loading } = useProjects();
    const [filter, setFilter] = useState('all');

    const mappedProjects = projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category || 'viviendas', // default category
        location: p.location || '',
        image: p.images && p.images.length > 0 ? p.images[0] : ''
    }));

    const filteredProjects = filter === 'all'
        ? mappedProjects
        : mappedProjects.filter(project => project.category === filter);

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
                    <div className="filter-buttons mb-lg">
                        {['all', 'viviendas', 'locales', 'fachadas'].map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="loader">Cargando proyectos...</div>
                        </div>
                    ) : (
                        <motion.div layout className="projects-grid">
                            <AnimatePresence>
                                {filteredProjects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
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
        </div>
        <ModernFooter />
        </>
    );
};

export default Portfolio;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import KuulaTour from '../components/kuula/KuulaTour';
import './Portfolio.css';

const projects = [
    {
        id: 1,
        title: 'Reforma Integral en Casco Viejo',
        category: 'viviendas',
        location: 'Bilbao',
        image: 'https://unamunzagaobras.com/home/wp-content/uploads/2020/12/casco-viejo-ITURRIBIDE-7.jpg'
    },
    {
        id: 2,
        title: 'Rehabilitación El Cano',
        category: 'viviendas',
        location: 'Bilbao Centro',
        image: 'https://unamunzagaobras.com/home/wp-content/uploads/2020/12/centro-de-Bilbao-EL-CANO-12.jpg'
    },
    {
        id: 3,
        title: 'Proyecto Iturrizar',
        category: 'viviendas',
        location: 'Bilbao',
        image: 'https://unamunzagaobras.com/home/wp-content/uploads/2020/12/centro-de-Bilbao-ITURRIZAR-2.jpg'
    },
    {
        id: 4,
        title: 'Local Comercial Moderno',
        category: 'locales',
        location: 'Getxo',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Rehabilitación de Fachada',
        category: 'fachadas',
        location: 'Indautxu',
        image: 'https://images.unsplash.com/photo-1517581177697-0005ec4a6190?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Oficinas Corporativas',
        category: 'locales',
        location: 'Bilbao',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop'
    }
];

const Portfolio = () => {
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
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

                    <motion.div layout className="projects-grid">
                        <AnimatePresence>
                            {filteredProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
    );
};

export default Portfolio;

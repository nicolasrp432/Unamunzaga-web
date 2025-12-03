import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Calendar, MapPin, Euro, Clock, Star, Eye, ArrowRight } from 'lucide-react';
import projectsData from '../data/projects.json';
import './Portfolio.css';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = useMemo(() => {
    return [
      'all',
      'trabajos-recientes',
      'bares-restaurantes',
      'viviendas',
      'fachadas',
      'locales-comerciales',
      'tejados',
      'insonorizacion'
    ];
  }, []);

  const years = useMemo(() => {
    const yrs = new Set();
    projectsData.forEach(project => yrs.add(project.year));
    return ['all', ...Array.from(yrs).sort((a, b) => b - a)];
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    if (selectedCategory === 'trabajos-recientes') {
      const currentYear = new Date().getFullYear();
      const threshold = currentYear - 1;
      filtered = filtered.filter(project => project.year >= threshold);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(project => project.year === parseInt(selectedYear));
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        case 'featured':
          return b.featured ? 1 : -1;
        case 'budget-high':
          return parseInt(b.budget) - parseInt(a.budget);
        case 'budget-low':
          return parseInt(a.budget) - parseInt(b.budget);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedYear, sortBy]);

  const getCategoryName = (category) => {
    const names = {
      'all': 'Todos',
      'trabajos-recientes': 'TRABAJOS RECIENTES',
      'bares-restaurantes': 'BARES Y RESTAURANTES',
      'viviendas': 'VIVIENDAS',
      'fachadas': 'FACHADAS',
      'locales-comerciales': 'LOCALES COMERCIALES',
      'tejados': 'TEJADOS',
      'insonorizacion': 'INSONORIZACIÓN'
    };
    return names[category] || category;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'trabajos-recientes': '🆕',
      'bares-restaurantes': '🍽️',
      'viviendas': '🏠',
      'fachadas': '🏢',
      'locales-comerciales': '🏪',
      'tejados': '🏚️',
      'insonorizacion': '🔇'
    };
    return icons[category] || '📋';
  };

  return (
    <>
      <ModernNavbar />
      <div className="page projects-page">
      <section className="page-header">
        <div className="container">
          <h1>Nuestros trabajos</h1>
          <p>Hechos con esmero por el mejor equipo de profesionales</p>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          {/* Filters */}
          <div className="projects-filters">
            <div className="filter-group">
              <label><Filter size={16} /> Categoría</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label><Calendar size={16} /> Año</label>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'Todos los años' : year}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Ordenar por</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguas</option>
                <option value="featured">Destacados</option>
                <option value="budget-high">Mayor presupuesto</option>
                <option value="budget-low">Menor presupuesto</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Vista</label>
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞ Grid
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  ☰ Lista
                </button>
              </div>
            </div>
          </div>

          {/* Results summary */}
          <div className="results-summary">
            <p>Mostrando <strong>{filteredProjects.length}</strong> proyectos</p>
            <div className="category-tags">
              {selectedCategory !== 'all' && (
                <span className="active-filter">
                  {getCategoryIcon(selectedCategory)} {getCategoryName(selectedCategory)}
                  <button onClick={() => setSelectedCategory('all')}>×</button>
                </span>
              )}
              {selectedYear !== 'all' && (
                <span className="active-filter">
                  📅 {selectedYear}
                  <button onClick={() => setSelectedYear('all')}>×</button>
                </span>
              )}
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={`projects-container ${viewMode}`}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={`project-card ${viewMode}`}>
                <div className="project-image">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="featured-badge">
                      <Star size={16} />
                      <span>Destacado</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <Link to={`/proyectos/${project.id}`} className="view-project">
                      <Eye size={20} />
                      Ver Proyecto
                    </Link>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-meta">
                      <span className="category">
                        {getCategoryIcon(project.category)} {getCategoryName(project.category)}
                      </span>
                      <span className="year">📅 {project.year}</span>
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-details">
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{project.location}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{project.duration}</span>
                    </div>
                    <div className="detail-item">
                      <Euro size={16} />
                      <span>{project.budget}</span>
                    </div>
                  </div>

                  <div className="project-services">
                    <h4>Servicios incluidos:</h4>
                    <div className="services-tags">
                      {project.services.map((service, index) => (
                        <span key={index} className="service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.testimonial && (
                    <div className="project-testimonial">
                      <blockquote>
                        "{project.testimonial}"
                      </blockquote>
                      <cite>— {project.client_name}</cite>
                    </div>
                  )}

                <div className="project-actions">
                  <Link to={`/proyectos/${project.id}`} className="btn btn-primary">
                    Ver Detalles
                    <ArrowRight size={16} />
                  </Link>
                  <Link to={`/proyectos/${project.id}#tour`} className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>
                    <Eye size={16} />
                    Tour 360°
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No se encontraron proyectos</h3>
              <p>Intenta ajustar los filtros para ver más resultados.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedYear('all');
                }}
                className="btn btn-outline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>¿Tienes un proyecto en mente?</h2>
          <p>Contáctanos y te ayudaremos a hacerlo realidad con la misma calidad que ves en nuestros proyectos.</p>
          <Link to="/contacto" className="btn btn-primary btn-lg">
            Solicitar Presupuesto
          </Link>
        </div>
      </section>
    </div>
    <ModernFooter />
    </>
  );
};

export default Projects;

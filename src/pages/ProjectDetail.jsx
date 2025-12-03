import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Euro, 
  Clock, 
  Star, 
  CheckCircle,
  User,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import projectsData from '../data/projects.json';
import KuulaTour, { DEFAULT_KUULA_SRC, SAMPLE_COLLECTION_SRC } from '../components/kuula/KuulaTour';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('images');

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (window.location && window.location.hash === '#tour') {
      setViewMode('tour');
    }
  }, []);

  const nextImage = () => {
    if (project && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const getCategoryName = (category) => {
    const names = {
      'trabajos-recientes': 'TRABAJOS RECIENTES',
      'bares-restaurantes': 'BARES Y RESTAURANTES',
      'viviendas': 'VIVIENDA',
      'fachadas': 'FACHADA',
      'locales-comerciales': 'LOCAL COMERCIAL',
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

  if (loading) {
    return (
      <div className="page project-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page project-detail-page">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Proyecto no encontrado</h2>
          <p>El proyecto que buscas no existe o ha sido eliminado.</p>
          <Link to="/proyectos" className="btn btn-primary">
            <ArrowLeft size={16} />
            Volver a Proyectos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ModernNavbar />
      <div className="page project-detail-page">
      {/* Hero Section */}
      <section className="project-hero">
        <div className="container">
          <div className="hero-content">
            <div className="breadcrumb">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <Link to="/proyectos">Proyectos</Link>
              <span>/</span>
              <span className="current">{project.title}</span>
            </div>
            
            <div className="hero-header">
              <div className="hero-title">
                <h1>{project.title}</h1>
                <div className="hero-meta">
                  <span className="category-badge">
                    {getCategoryIcon(project.category)} {getCategoryName(project.category)}
                  </span>
                  {project.featured && (
                    <span className="featured-badge">
                      <Star size={16} />
                      Proyecto Destacado
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => navigate(-1)}
                className="back-btn"
              >
                <ArrowLeft size={20} />
                Volver
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="project-gallery">
        <div className="container">
          <div className="gallery-container">
            <div className="gallery-header" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'images' ? 'active' : ''}`}
                  onClick={() => setViewMode('images')}
                >
                  Imágenes
                </button>
                <button 
                  className={`view-btn ${viewMode === 'tour' ? 'active' : ''}`}
                  onClick={() => setViewMode('tour')}
                >
                  Tour 360°
                </button>
              </div>
            </div>

            {viewMode === 'images' ? (
              <>
                <div className="main-image">
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                    loading="lazy"
                  />
                  {project.images.length > 1 && (
                    <>
                      <button 
                        className="gallery-nav prev"
                        onClick={prevImage}
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        className="gallery-nav next"
                        onClick={nextImage}
                        aria-label="Imagen siguiente"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                {project.images.length > 1 && (
                  <div className="thumbnail-gallery">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Ver imagen ${index + 1}`}
                      >
                        <img src={image} alt={`Miniatura ${index + 1}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <KuulaTour 
                id={project.id}
                title={project.title}
                description={project.location}
                src={project.kuulaSrc || SAMPLE_COLLECTION_SRC}
              />
            )}
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="project-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-main">
              <div className="description-section">
                <h2>Descripción del Proyecto</h2>
                <p className="description-text">{project.description}</p>
              </div>

              {project.challenge && (
                <div className="challenge-section">
                  <h3>El Reto</h3>
                  <p>{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="solution-section">
                  <h3>Nuestra Solución</h3>
                  <p>{project.solution}</p>
                </div>
              )}

              <div className="services-section">
                <h3>Servicios Realizados</h3>
                <div className="services-grid">
                  {project.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <CheckCircle size={16} className="service-icon" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-gallery">
                <h3>Galería del Proyecto</h3>
                <div className="details-gallery-grid">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`details-gallery-item ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Ver imagen ${index + 1} en grande`}
                    >
                      <img src={image} alt={`Galería ${index + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="info-sidebar">
              <div className="project-stats">
                <h3>Detalles del Proyecto</h3>
                <div className="stat-item">
                  <Calendar size={20} />
                  <div>
                    <span className="stat-label">Año</span>
                    <span className="stat-value">{project.year}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <MapPin size={20} />
                  <div>
                    <span className="stat-label">Ubicación</span>
                    <span className="stat-value">{project.location}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Euro size={20} />
                  <div>
                    <span className="stat-label">Presupuesto</span>
                    <span className="stat-value">{project.budget}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Clock size={20} />
                  <div>
                    <span className="stat-label">Duración</span>
                    <span className="stat-value">{project.duration}</span>
                  </div>
                </div>
              </div>

              {project.testimonial && (
                <div className="testimonial-card">
                  <h4>Testimonio del Cliente</h4>
                  <blockquote>"{project.testimonial}"</blockquote>
                  <cite>— {project.client_name}</cite>
                </div>
              )}

              <div className="contact-cta">
                <h4>¿Te interesa este tipo de proyecto?</h4>
                <p>Contáctanos y te ayudaremos a hacerlo realidad</p>
                <Link to="/contacto" className="btn btn-primary btn-block">
                  <Phone size={16} />
                  Solicitar Presupuesto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="related-projects">
        <div className="container">
          <h2 className="section-title">Proyectos Relacionados</h2>
          <div className="related-grid">
            {projectsData
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map(relatedProject => (
                <Link 
                  key={relatedProject.id} 
                  to={`/proyectos/${relatedProject.id}`}
                  className="related-card"
                >
                  <div className="related-image">
                    <img src={relatedProject.images[0]} alt={relatedProject.title} loading="lazy" />
                    <div className="related-overlay">
                      <h3>{relatedProject.title}</h3>
                      <p>{relatedProject.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          
          {projectsData.filter(p => p.id !== project.id && p.category === project.category).length === 0 && (
            <div className="no-related">
              <p>No hay proyectos relacionados en esta categoría.</p>
              <Link to="/proyectos" className="btn btn-outline">
                Ver todos los proyectos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>¿Tienes un proyecto en mente?</h2>
          <p>Transformamos tus ideas en espacios funcionales y hermosos. Contáctanos para una consulta gratuita.</p>
          <div className="cta-buttons">
            <Link to="/contacto" className="btn btn-primary btn-lg">
              <Phone size={20} />
              Solicitar Consulta
            </Link>
            <a 
              href={`tel:+34666123456`} 
              className="btn btn-outline btn-lg"
            >
              <Phone size={20} />
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
    <ModernFooter />
    </>
  );
};

export default ProjectDetail;

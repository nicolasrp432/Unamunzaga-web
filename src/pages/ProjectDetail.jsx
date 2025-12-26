import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Euro,
  Clock,
  Star,
  CheckCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize2,
  XCircle
} from 'lucide-react';
import { useProject, useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/portfolio/ProjectCard';
import { CTASection } from '../components/sections/CTASection';
import KuulaTour from '../components/kuula/KuulaTour';
import { getCategoryName, getCategoryIcon } from '../constants/portfolio';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project, loading: projectLoading, error: projectError } = useProject(id);
  const { projects: allProjects, loading: relatedLoading } = useProjects();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('images');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter related projects - Moved here to follow Rules of Hooks
  const relatedProjects = useMemo(() => {
    if (!project || !allProjects) return [];
    return allProjects
      .filter(p => p.id !== project.id && p.category === project.category)
      .slice(0, 3);
  }, [allProjects, project?.id, project?.category]);

  useEffect(() => {
    if (window.location && window.location.hash === '#tour') {
      setViewMode('tour');
    }
  }, []);

  const nextImage = () => {
    if (project && project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project && project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (projectLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <span className="ml-4 text-lg text-gray-600">Cargando proyecto...</span>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="page project-detail-page">
        <div className="error-container">
          <div className="error-icon">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
          </div>
          <h2>{projectError ? 'Error al cargar el proyecto' : 'Proyecto no encontrado'}</h2>
          <p>{projectError ? projectError.message : 'El proyecto que buscas no existe o ha sido eliminado.'}</p>
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
                      <span className="featured-badge" title="Proyecto Destacado">
                        <Star size={20} />
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
        <section className="project-gallery py-12 bg-gray-50">
          <div className="container">
            <div className="gallery-container bg-white p-4 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Galería de obra</h2>
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'images' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setViewMode('images')}
                  >
                    Imágenes
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'tour' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setViewMode('tour')}
                  >
                    Tour 360°
                  </button>
                </div>
              </div>

              {viewMode === 'images' ? (
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden group bg-gray-900">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={project.images?.[currentImageIndex] || '/placeholder-project.jpg'}
                        alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-contain cursor-zoom-in"
                        onClick={() => setIsLightboxOpen(true)}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute top-4 right-4 z-10">
                      <button 
                        onClick={() => setIsLightboxOpen(true)}
                        className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Maximize2 size={20} />
                      </button>
                    </div>

                    {project.images && project.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                        <button
                          className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all pointer-events-auto"
                          onClick={prevImage}
                        >
                          <ChevronLeft size={28} />
                        </button>
                        <button
                          className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all pointer-events-auto"
                          onClick={nextImage}
                        >
                          <ChevronRight size={28} />
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 text-white rounded-full text-xs backdrop-blur-md">
                      {currentImageIndex + 1} / {project.images?.length || 0}
                    </div>
                  </div>

                  {project.images && project.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img src={image} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
                  <KuulaTour
                    id={project.id}
                    title={project.title}
                    description={project.location}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-4 md:p-8"
            >
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-50"
              >
                <ArrowLeft className="rotate-45" size={32} />
              </button>

              <div className="flex-1 relative flex items-center justify-center">
                <motion.img 
                  key={currentImageIndex}
                  src={project.images?.[currentImageIndex]}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-full max-h-full object-contain"
                />

                <button onClick={prevImage} className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors">
                  <ChevronLeft size={48} />
                </button>
                <button onClick={nextImage} className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors">
                  <ChevronRight size={48} />
                </button>
              </div>

              <div className="mt-8 flex gap-2 overflow-x-auto justify-center pb-4">
                {project.images?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${idx === currentImageIndex ? 'border-amber-500' : 'border-transparent opacity-40'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Info */}
        <section className="project-info py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                    Descripción del Proyecto
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Servicios Realizados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.services && project.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl group hover:bg-amber-50 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center bg-white text-amber-500 rounded-full shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-medium text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Todas las imágenes ({project.images?.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.images && project.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-amber-500 shadow-lg' : 'border-transparent'}`}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setViewMode('images');
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                      >
                        <img src={image} alt={`Galería ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                  <h3 className="text-xl font-bold mb-8">Ficha Técnica</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-xl text-white">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Año</span>
                        <span className="block text-lg font-semibold">{project.year}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-xl text-white">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Ubicación</span>
                        <span className="block text-lg font-semibold">{project.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-xl text-white">
                        <Euro size={24} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Presupuesto</span>
                        <span className="block text-lg font-semibold">{project.budget}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-xl text-white">
                        <Clock size={24} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Duración</span>
                        <span className="block text-lg font-semibold">{project.duration}</span>
                      </div>
                    </div>
                  </div>

                  {project.testimonial && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="relative">
                        <span className="absolute -top-4 -left-2 text-6xl text-amber-500/20 font-serif">“</span>
                        <p className="italic text-gray-300 relative z-10 mb-4">{project.testimonial}</p>
                        <cite className="block font-bold text-amber-500 not-italic">— {project.client_name}</cite>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <Link to="/contacto" className="flex items-center justify-center gap-3 w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/20">
                      <Phone size={20} />
                      Solicitar Presupuesto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Proyectos Relacionados</h2>
                <p className="text-gray-600 max-w-2xl">Otros trabajos similares que podrían interesarte en la categoría de {getCategoryName(project.category)}.</p>
              </div>
              <Link to="/proyectos" className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-2 group">
                Ver todos los proyectos
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {relatedLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map(relatedProject => (
                  <ProjectCard key={relatedProject.id} project={relatedProject} />
                ))}
                
                {relatedProjects.length === 0 && (
                  <div className="col-span-full bg-white p-12 rounded-3xl border border-gray-100 text-center">
                    <p className="text-gray-500 mb-6">No hay proyectos relacionados en esta categoría.</p>
                    <Link to="/proyectos" className="inline-flex px-8 py-3 bg-amber-500 text-white rounded-xl font-bold">
                      Explorar galería completa
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </div>
      <ModernFooter />
    </>
  );
};
export default ProjectDetail;

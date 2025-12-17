import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ExternalLink,
  X,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import KuulaTour from '../kuula/KuulaTour';

export type ProjectData = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  location: string;
  year: number;
  duration: string;
  budget: string;
  images: string[];
  services?: string[];
  testimonial?: string;
  client_name?: string;
  featured?: boolean;
  kuulaSrc?: string;
};

interface PortfolioSectionProps {
  projects: ProjectData[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);

  const filteredProjects = useMemo(() => (
    selectedCategory === 'Todos' ? projects : projects.filter(p => p.category === selectedCategory)
  ), [projects, selectedCategory]);

  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Proyectos Destacados
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Descubre nuestras últimas obras y transformaciones. Cada proyecto refleja nuestro compromiso con la excelencia y la innovación.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                {featuredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-64">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          DESTACADO
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="mb-4 line-clamp-2 text-gray-300">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-500 font-semibold">{project.category}</span>
                        <span className="text-sm text-gray-400">📅 {project.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center space-x-2 mr-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Filtrar por:</span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-6 py-2 rounded-full font-medium transition-all duration-300',
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-gray-300 border border-slate-700 hover:bg-slate-700 hover:text-white shadow-md'
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                      <ExternalLink className="w-6 h-6 text-blue-900" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-gray-300">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm mb-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-500 font-semibold">{project.category}</span>
                    <span className="text-gray-400">{project.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video bg-gray-100">
                  <img
                    alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* View Details Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                    <a href={`/proyectos/${selectedProject.id}`} className="px-6 py-3 bg-white text-blue-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                      <ExternalLink size={20} />
                      Ver Detalles Completos
                    </a>
                  </div>
                </div>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.images.length - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
                      aria-label="Anterior imagen"
                      type="button"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < selectedProject.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
                      aria-label="Siguiente imagen"
                      type="button"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                {selectedProject.kuulaSrc && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualiza en 360°</h3>
                    <KuulaTour
                      id={String(selectedProject.id)}
                      title={selectedProject.title}
                      description="Explora este proyecto en 360 grados"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Categoría</span>
                    <p className="font-semibold text-gray-900">{selectedProject.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ubicación</span>
                    <p className="font-semibold text-gray-900">{selectedProject.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Año</span>
                    <p className="font-semibold text-gray-900">{selectedProject.year}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Presupuesto</span>
                    <p className="font-semibold text-gray-900">{selectedProject.budget}</p>
                  </div>
                </div>

                {selectedProject.testimonial && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Testimonio del Cliente</h3>
                    <blockquote className="text-gray-700 mb-2">“{selectedProject.testimonial}”</blockquote>
                    {selectedProject.client_name && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">{selectedProject.client_name}</span>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

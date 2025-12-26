import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import KuulaTour from '../kuula/KuulaTour';
import { FilterButtons } from '../portfolio/FilterButtons';
import { ProjectGrid } from '../portfolio/ProjectGrid';
import { getCategoryName, getCategoryIcon } from '../../constants/portfolio';

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
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Proyectos Destacados
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Descubre nuestras últimas obras y transformaciones. Cada proyecto refleja nuestro compromiso con la excelencia y la innovación.
          </p>
        </motion.div>

        {/* Featured Projects Carousel (Optional/Hidden if not needed, but keeping for functionality) */}
        {featuredProjects.length > 0 && (
          <div className="mb-20 overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
              Obras Maestras
            </h3>
            <div className="flex overflow-x-auto space-x-8 pb-8 scrollbar-hide snap-x">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer snap-start border border-gray-100"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-56">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        DESTACADO
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2 text-gray-900 line-clamp-1">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-amber-600 uppercase tracking-wider">{getCategoryName(project.category)}</span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <FilterButtons 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          getCategoryName={getCategoryName}
          getCategoryIcon={getCategoryIcon}
        />

        {/* Projects Grid */}
        <ProjectGrid projects={filteredProjects} />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <p className="text-sm text-amber-600 font-semibold uppercase tracking-widest">{getCategoryName(selectedProject.category)}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Left Side: Media */}
                <div className="lg:w-2/3 border-r border-gray-100">
                  <div className="relative group">
                    <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          src={selectedProject.images[currentImageIndex]}
                          alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                    </div>

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.images.length - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev < selectedProject.images.length - 1 ? prev + 1 : 0)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Thumbnail Strip */}
                    <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50/50">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={cn(
                            "relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200",
                            idx === currentImageIndex ? "ring-2 ring-amber-500 scale-105 shadow-md" : "opacity-60 hover:opacity-100"
                          )}
                        >
                          <img src={img} className="w-full h-full object-cover" alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="lg:w-1/3 p-8 space-y-8 bg-gray-50/30">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                      Sobre el Proyecto
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </section>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ubicación</span>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <MapPin size={16} className="text-amber-500" />
                        {selectedProject.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Año</span>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <Calendar size={16} className="text-amber-500" />
                        {selectedProject.year}
                      </p>
                    </div>
                  </div>

                  {selectedProject.kuulaSrc && (
                    <div className="pt-4">
                      <KuulaTour
                        id={String(selectedProject.id)}
                        title={selectedProject.title}
                        description="Vista 360° interactiva"
                      />
                    </div>
                  )}

                  <div className="pt-6">
                    <a 
                      href={`/proyectos/${selectedProject.id}`} 
                      className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-amber-600 transition-all duration-300 shadow-xl"
                    >
                      <ExternalLink size={20} />
                      Ver Proyecto Completo
                    </a>
                  </div>

                  {selectedProject.testimonial && (
                    <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm relative italic text-gray-600">
                      <span className="absolute -top-4 left-6 text-4xl text-amber-500 font-serif">“</span>
                      <p className="relative z-10 mb-4">{selectedProject.testimonial}</p>
                      {selectedProject.client_name && (
                        <p className="text-sm font-bold text-gray-900 not-italic">— {selectedProject.client_name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

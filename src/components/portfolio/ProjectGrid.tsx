import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: any[];
  viewMode?: 'grid' | 'list';
  loading?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  viewMode = 'grid',
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout 
      className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "flex flex-col gap-8"
      }
    >
      <AnimatePresence mode='popLayout'>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProjectCard project={project} viewMode={viewMode} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

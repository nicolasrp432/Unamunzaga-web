import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star, Calendar, Clock, Euro } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { getCategoryName, getCategoryIcon } from '../../constants/portfolio';

const ProjectCard = ({ project, viewMode = 'grid' }) => {
  // Handle different project object structures
  const id = project.id;
  const title = project.title;
  const description = project.description || '';
  const location = project.location || '';
  const category = project.category || '';
  const year = project.year || '';
  const duration = project.duration || '';
  const budget = project.budget || '';
  const featured = project.featured || project.is_featured || false;
  
  // Image handling
  const image = project.image || (project.images && project.images.length > 0 ? project.images[0] : '/placeholder-project.jpg');

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300"
      >
        <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          {featured && (
            <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star size={12} fill="currentColor" />
              DESTACADO
            </div>
          )}
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                {getCategoryIcon(category)}
                {getCategoryName(category)}
              </span>
            </div>
            <p className="text-gray-600 line-clamp-2 mb-4">{description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-amber-500" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={16} className="text-amber-500" />
                <span>{year}</span>
              </div>
              {duration && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={16} className="text-amber-500" />
                  <span>{duration}</span>
                </div>
              )}
              {budget && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Euro size={16} className="text-amber-500" />
                  <span>{budget}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to={`/proyectos/${id}`} 
              className="px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-md"
            >
              Ver Detalles <ArrowRight size={18} />
            </Link>
            <Link 
              to={`/proyectos/${id}#tour`} 
              className="px-6 py-2 border border-amber-600 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Tour 360°
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (Default)
  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {getCategoryIcon(category)}
            {getCategoryName(category)}
          </span>
          {featured && (
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg w-fit">
              <Star size={12} fill="currentColor" />
              DESTACADO
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link 
            to={`/proyectos/${id}`} 
            className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white transition-colors shadow-xl"
          >
            Ver Proyecto <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
            <MapPin size={14} className="text-amber-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
            <Calendar size={14} className="text-amber-500" />
            <span>{year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

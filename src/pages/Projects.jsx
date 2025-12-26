import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Calendar, Loader2, AlertTriangle, Search, X } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { FilterButtons } from '../components/portfolio/FilterButtons';
import { ViewToggle } from '../components/portfolio/ViewToggle';
import { ProjectGrid } from '../components/portfolio/ProjectGrid';
import { PORTFOLIO_CATEGORIES, getCategoryName, getCategoryIcon } from '../constants/portfolio';
import { CTASection } from '../components/sections/CTASection';
import './Portfolio.css';

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = useMemo(() => [...PORTFOLIO_CATEGORIES], []);

  const years = useMemo(() => {
    const yrs = new Set();
    projects.forEach(project => yrs.add(project.year));
    return ['all', ...Array.from(yrs).sort((a, b) => b - a)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

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
          return (b.year || 0) - (a.year || 0);
        case 'oldest':
          return (a.year || 0) - (b.year || 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'budget-high':
          return (parseInt(b.budget?.replace(/\D/g, '') || '0')) - (parseInt(a.budget?.replace(/\D/g, '') || '0'));
        case 'budget-low':
          return (parseInt(a.budget?.replace(/\D/g, '') || '0')) - (parseInt(b.budget?.replace(/\D/g, '') || '0'));
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, selectedCategory, selectedYear, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <span className="ml-4 text-lg text-gray-600">Cargando proyectos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <div className="text-red-500 mb-4">
          <AlertTriangle size={64} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar proyectos</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          Intentar de nuevo
        </button>
      </div>
    );
  }

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
            {/* Main Category Filter */}
            <div className="mb-12">
              <FilterButtons
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                getCategoryName={getCategoryName}
                getCategoryIcon={getCategoryIcon}
              />
            </div>

            {/* Sub-Filters and View Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-amber-500" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'all' ? 'Todos los años' : year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-amber-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguas</option>
                    <option value="featured">Destacados</option>
                    <option value="budget-high">Mayor presupuesto</option>
                    <option value="budget-low">Menor presupuesto</option>
                  </select>
                </div>
              </div>

              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {/* Results summary */}
            <div className="results-summary mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-600">
                Mostrando <strong className="text-gray-900">{filteredProjects.length}</strong> proyectos
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100">
                    {getCategoryIcon(selectedCategory)} {getCategoryName(selectedCategory)}
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-amber-900 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedYear !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                    <Calendar size={14} /> {selectedYear}
                    <button 
                      onClick={() => setSelectedYear('all')}
                      className="hover:text-blue-900 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Projects Grid/List */}
            <ProjectGrid projects={filteredProjects} viewMode={viewMode} />

            {filteredProjects.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">
                  <Search size={48} className="text-gray-400 mb-4" />
                </div>
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
        <CTASection />
      </div>
      <ModernFooter />
    </>
  );
};

export default Projects;

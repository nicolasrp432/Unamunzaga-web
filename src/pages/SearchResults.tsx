import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import type { ProjectData } from '../components/sections/PortfolioSection';
import { useServices } from '../hooks/useServices';
import { Sparkles, Box, Eye, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { useBlogPosts } from '../hooks/useBlogPosts';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults: React.FC = () => {
  const qParam = useQuery().get('q') || '';
  const q = normalize(qParam);

  const { projects: allProjects } = useProjects();
  const { posts: allBlogPosts } = useBlogPosts();
  const { services: allServices } = useServices();

  // Check if searching for AI tools
  const aiKeywords = ['rediseñ', 'diseñ', '3d', 'plano', 'espacio', 'ia', 'ai', 'inteligencia'];
  const isAiSearch = aiKeywords.some(keyword => q.includes(keyword));

  const pages = useMemo(() => (
    [
      { title: 'Inicio', url: '/' },
      { title: 'Servicios', url: '/servicios' },
      { title: 'Proyectos', url: '/proyectos' },
      { title: 'Nosotros', url: '/nosotros' },
      { title: 'Bolsa de Empleo', url: '/bolsa-empleo' },
      { title: 'Contacto', url: '/contacto' },
    ].filter((p) => normalize(p.title).includes(q))
  ), [q]);


  const services = useMemo(() => (
    allServices.filter((s) => normalize([s.title, s.description, ...(s.features || [])].join(' ')).includes(q))
  ), [q, allServices]);

  const projects = useMemo(() => (
    allProjects.filter((p) => normalize([p.title, p.description, p.category, p.location].join(' ')).includes(q))
  ), [q, allProjects]);

  const blogPosts = useMemo(() => (
    allBlogPosts.filter((b) => normalize([b.title, b.excerpt || '', b.content || ''].join(' ')).includes(q))
  ), [q, allBlogPosts]);

  const total = pages.length + services.length + projects.length + blogPosts.length;

  return (
    <>
      <ModernNavbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <SearchIcon className="w-8 h-8 text-blue-900" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Resultados de búsqueda</h1>
            </div>
            <p className="text-gray-600 text-lg">
              {qParam ? `Mostrando resultados para "${qParam}"` : 'Introduce un término para buscar'}
            </p>
            <p className="text-blue-900 font-semibold mt-2">{total} resultados encontrados</p>
          </motion.div>

          {/* Featured AI Tools Section */}
          {isAiSearch && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Herramientas de Diseño con IA</h2>
                </div>
                <p className="text-white/90 mb-6">Transforma tus espacios con nuestras herramientas potenciadas por inteligencia artificial</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    to="/servicios#editor-ia"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-8 h-8 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">
                          Rediseña tu espacio con IA
                        </h3>
                        <p className="text-sm text-white/80">
                          Transforma tu hogar con nuestra herramienta de diseño inteligente
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>

                  <Link
                    to="/servicios#editor-ia-2"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <Box className="w-8 h-8 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">
                          Tu plano en 3D
                        </h3>
                        <p className="text-sm text-white/80">
                          Crea planos profesionales en minutos
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* Pages Results */}
          {pages.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                  {pages.length}
                </span>
                Páginas
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((p, idx) => (
                  <motion.div
                    key={p.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={p.url}
                      className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all group"
                    >
                      <h3 className="text-blue-900 font-bold text-lg group-hover:text-blue-700 flex items-center justify-between">
                        {p.title}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Services Results */}
          {services.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                  {services.length}
                </span>
                Servicios
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/servicios#${s.id}`}
                      className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all group"
                    >
                      <h3 className="text-blue-900 font-bold text-lg mb-2 group-hover:text-blue-700">
                        {s.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{s.description}</p>
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                        Ver detalles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Results */}
          {projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                  {projects.length}
                </span>
                Proyectos
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-normal flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  Vista 360° disponible
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/proyectos?project=${encodeURIComponent(p.id)}`}
                      className="block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all group"
                    >
                      {p.images?.[0] && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-blue-900 font-bold text-lg group-hover:text-blue-700 flex-1">
                            {p.title}
                          </h3>
                          <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ml-2">
                            <Eye className="w-3 h-3" />
                            360°
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{p.category} • {p.location}</p>
                        <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Blog Results */}
          {blogPosts.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                  {blogPosts.length}
                </span>
                Artículos del Blog
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogPosts.map((b, idx) => (
                  <motion.div
                    key={(b.slug || b.id || b.title) as string}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/blog/${b.slug || ''}`}
                      className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all group"
                    >
                      <h3 className="text-blue-900 font-bold text-lg mb-2 group-hover:text-blue-700">
                        {b.title}
                      </h3>
                      {b.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{b.excerpt}</p>
                      )}
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                        Leer más
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {total === 0 && qParam && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600 mb-6">No hay resultados para "{qParam}". Intenta con otros términos.</p>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Explorar servicios
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <ModernFooter />
    </>
  );
};

export default SearchResults;

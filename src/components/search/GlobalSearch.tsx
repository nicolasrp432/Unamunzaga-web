import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as SearchIcon, Home, Briefcase, Users, BookOpen, FileText, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import type { ProjectData } from '../sections/PortfolioSection';
import { useProjects } from '../../hooks/useProjects';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useServices } from '../../hooks/useServices';

type ResultItem = {
  type: 'page' | 'service' | 'project' | 'blog';
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const pages: ResultItem[] = [
  { type: 'page', title: 'Inicio', subtitle: 'Página principal', url: '/', icon: Home },
  { type: 'page', title: 'Servicios', subtitle: 'Catálogo de servicios', url: '/servicios', icon: Briefcase },
  { type: 'page', title: 'Proyectos', subtitle: 'Trabajos destacados', url: '/proyectos', icon: Users },
  { type: 'page', title: 'Nosotros', subtitle: 'Quiénes somos', url: '/nosotros', icon: BookOpen },
  { type: 'page', title: 'Bolsa de Empleo', subtitle: 'Únete al equipo', url: '/bolsa-empleo', icon: BookOpen },
  { type: 'page', title: 'Contacto', subtitle: 'Solicita presupuesto', url: '/contacto', icon: FileText }
];

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { projects } = useProjects();
  const { posts: blogPosts } = useBlogPosts();
  const { services } = useServices();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    // Only search if we have data or if query is empty (for quick links)
    // We don't block on loading since we can show partial results or pages/services

    const handler = setTimeout(() => {
      const q = normalize(query);
      if (!q) {
        const quick = [
          ...pages,
          ...services.slice(0, 5).map<ResultItem>((s) => ({
            type: 'service',
            title: s.title,
            subtitle: s.description,
            url: `/servicios#${s.id}`,
            icon: Briefcase
          })),
        ];
        setResults(quick);
        setActiveIndex(0);
        return;
      }

      // Check if searching for AI tools
      const aiKeywords = ['rediseñ', 'diseñ', '3d', 'plano', 'espacio', 'ia', 'ai', 'inteligencia'];
      const isAiSearch = aiKeywords.some(keyword => q.includes(keyword));

      let combined: ResultItem[] = [];

      // Add AI tools at the beginning if relevant
      if (isAiSearch) {
        combined.push(
          {
            type: 'service',
            title: 'Rediseña tu espacio con IA',
            subtitle: 'Transforma tu hogar con nuestra herramienta de diseño inteligente',
            url: '/servicios#editor-ia',
            icon: Briefcase
          },
          {
            type: 'service',
            title: 'Tu plano en 3D',
            subtitle: 'Crea planos profesionales en minutos',
            url: '/servicios#editor-ia-2',
            icon: Briefcase
          }
        );
      }

      const matchPage = pages.filter((p) => normalize(p.title + ' ' + (p.subtitle || '')).includes(q));

      const matchServices = services
        .filter((s) => normalize([s.title, s.description, ...(s.features || [])].join(' ')).includes(q))
        .map<ResultItem>((s) => ({ type: 'service', title: s.title, subtitle: s.description, url: `/servicios#${s.id}`, icon: Briefcase }));

      const matchProjects = projects
        .filter((p) => normalize([p.title, p.description, p.category, p.location].join(' ')).includes(q))
        .map<ResultItem>((p) => ({
          type: 'project',
          title: p.title,
          subtitle: `${p.category} • ${p.location}`,
          url: `/proyectos/${p.id}`, // Ensure correct URL format
          icon: Users
        }));

      const matchBlog = blogPosts
        .filter((b) => normalize([b.title, b.excerpt || '', b.content || ''].join(' ')).includes(q))
        .map<ResultItem>((b) => ({ type: 'blog', title: b.title, subtitle: b.excerpt, url: `/blog/${b.id}`, icon: FileText }));

      combined = [...combined, ...matchPage, ...matchServices, ...matchProjects, ...matchBlog].slice(0, 50);
      setResults(combined);
      setActiveIndex(0);
    }, 200);
    return () => clearTimeout(handler);
  }, [query, projects, blogPosts, services]);

  const onSelect = (item: ResultItem) => {
    onClose();
    navigate(item.url);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) onSelect(item);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-16 lg:top-20 left-0 right-0 z-40"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            className="max-w-7xl mx-auto px-4"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center px-4 md:px-6 py-4 gap-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Busca proyectos, servicios, páginas o artículos..."
                  className="flex-1 outline-none text-base md:text-lg placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-4 md:px-6 pb-3">
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const defaults = ['viviendas', 'cocinas', 'baños', 'locales', 'fachadas', 'accesibilidad'];
                    const q = normalize(query);
                    const pool = [
                      ...pages.map((p) => p.title),
                      ...services.map((s) => s.title),
                    ];
                    const related = q ? pool.filter((t) => normalize(t).includes(q)) : defaults;
                    const sug = Array.from(new Set(related)).slice(0, 6);
                    return (sug.length ? sug : defaults).map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          navigate(`/buscar?q=${encodeURIComponent(s)}`);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                      >
                        {s}
                      </button>
                    ));
                  })()}
                </div>
              </div>

              {/* Results Section */}
              {query && results.length > 0 && (
                <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
                  <div className="px-4 md:px-6 py-4 space-y-2">
                    {results.slice(0, 8).map((result, idx) => {
                      const ResultIcon = result.icon;
                      return (
                        <motion.div
                          key={`${result.type}-${result.title}-${idx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => onSelect(result)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
                            activeIndex === idx
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                          )}
                        >
                          <ResultIcon className={cn(
                            "w-5 h-5 flex-shrink-0 mt-0.5",
                            activeIndex === idx ? "text-blue-900" : "text-gray-400"
                          )} />
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              "font-semibold text-sm",
                              activeIndex === idx ? "text-blue-900" : "text-gray-900"
                            )}>
                              {result.title}
                            </div>
                            {result.subtitle && (
                              <div className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                {result.subtitle}
                              </div>
                            )}
                          </div>
                          {result.url.includes('360') || result.url.includes('proyectos') ? (
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex-shrink-0">
                              360°
                            </span>
                          ) : null}
                        </motion.div>
                      );
                    })}
                    {results.length > 8 && (
                      <button
                        onClick={() => {
                          navigate(`/buscar?q=${encodeURIComponent(query)}`);
                          onClose();
                        }}
                        className="w-full mt-2 py-2 text-sm text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Ver todos los {results.length} resultados
                      </button>
                    )}
                  </div>
                </div>
              )}

              {query && results.length === 0 && (
                <div className="px-4 md:px-6 py-8 text-center">
                  <p className="text-gray-500">No se encontraron resultados para "{query}"</p>
                  <p className="text-sm text-gray-400 mt-1">Prueba con otros términos de búsqueda</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;

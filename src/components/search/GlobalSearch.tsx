import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as SearchIcon, Home, Briefcase, Users, BookOpen, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import projectsData from '../../data/projects.json';
import type { ProjectData } from '../sections/PortfolioSection';
import { servicesData } from '../../data/services';
import blogPostsRaw from '../../data/blog.json';

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

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
};

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const blogPosts = blogPostsRaw as BlogPost[];

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const q = normalize(query);
      if (!q) {
        const quick = [
          ...pages,
          ...servicesData.slice(0, 5).map<ResultItem>((s) => ({
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

      const matchPage = pages.filter((p) => normalize(p.title + ' ' + (p.subtitle || '')).includes(q));

      const matchServices = servicesData
        .filter((s) => normalize([s.title, s.description, ...(s.features || [])].join(' ')).includes(q))
        .map<ResultItem>((s) => ({ type: 'service', title: s.title, subtitle: s.description, url: `/servicios#${s.id}`, icon: Briefcase }));

      const matchProjects = (projectsData as ProjectData[])
        .filter((p) => normalize([p.title, p.description, p.category, p.location].join(' ')).includes(q))
        .map<ResultItem>((p) => ({ type: 'project', title: p.title, subtitle: `${p.category} • ${p.location}`, url: `/proyectos?project=${encodeURIComponent(p.id)}` , icon: Users }));

      const matchBlog = blogPosts
        .filter((b: BlogPost) => normalize([b.title, b.excerpt || '', b.content || ''].join(' ')).includes(q))
        .map<ResultItem>((b: BlogPost) => ({ type: 'blog', title: b.title, subtitle: b.excerpt, url: `/blog/${b.slug || ''}` , icon: FileText }));

      const combined = [...matchPage, ...matchServices, ...matchProjects, ...matchBlog].slice(0, 50);
      setResults(combined);
      setActiveIndex(0);
    }, 200);
    return () => clearTimeout(handler);
  }, [query, blogPosts]);

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
                      ...servicesData.map((s) => s.title),
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;

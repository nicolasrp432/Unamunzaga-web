import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import projectsData from '../data/projects.json';
import type { ProjectData } from '../components/sections/PortfolioSection';
import { servicesData } from '../data/services';
import blogPostsRaw from '../data/blog.json';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults: React.FC = () => {
  const qParam = useQuery().get('q') || '';
  const q = normalize(qParam);

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
    servicesData.filter((s) => normalize([s.title, s.description, ...(s.features || [])].join(' ')).includes(q))
  ), [q]);

  const projects = useMemo(() => (
    (projectsData as ProjectData[]).filter((p) => normalize([p.title, p.description, p.category, p.location].join(' ')).includes(q))
  ), [q]);

  type BlogPost = { id?: number; slug?: string; title: string; excerpt?: string; content?: string };
  const blogPosts = useMemo(() => (
    (blogPostsRaw as BlogPost[]).filter((b) => normalize([b.title, b.excerpt || '', b.content || ''].join(' ')).includes(q))
  ), [q]);

  const total = pages.length + services.length + projects.length + blogPosts.length;

  return (
    <>
      <ModernNavbar />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Resultados</h1>
          <p className="text-gray-600 mb-8">{qParam ? `Buscando "${qParam}"` : 'Introduce un término para buscar'}. {total} resultados.</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Páginas</h2>
            {pages.length === 0 ? (
              <p className="text-gray-600">Sin resultados en páginas</p>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((p) => (
                  <li key={p.url} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <Link to={p.url} className="text-blue-900 font-semibold hover:text-blue-700">{p.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Servicios</h2>
            {services.length === 0 ? (
              <p className="text-gray-600">Sin resultados en servicios</p>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <li key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <Link to={`/servicios#${s.id}`} className="text-blue-900 font-semibold hover:text-blue-700">{s.title}</Link>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{s.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Proyectos</h2>
            {projects.length === 0 ? (
              <p className="text-gray-600">Sin resultados en proyectos</p>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <li key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <Link to={`/proyectos?project=${encodeURIComponent(p.id)}`} className="text-blue-900 font-semibold hover:text-blue-700">{p.title}</Link>
                    <p className="text-gray-600 text-sm mt-1">{p.category} • {p.location}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Artículos</h2>
            {blogPosts.length === 0 ? (
              <p className="text-gray-600">Sin resultados en el blog</p>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogPosts.map((b: BlogPost) => (
                  <li key={(b.slug || b.id || b.title) as string} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <Link to={`/blog/${b.slug || ''}`} className="text-blue-900 font-semibold hover:text-blue-700">{b.title}</Link>
                    {b.excerpt && <p className="text-gray-600 text-sm mt-1 line-clamp-2">{b.excerpt}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <ModernFooter />
    </>
  );
};

export default SearchResults;

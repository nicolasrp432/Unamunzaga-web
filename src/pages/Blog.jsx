import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useExternalNews } from '../hooks/useExternalNews';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // Replaced internal hook with external news hook
  const { news, loading, error } = useExternalNews(20);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredNews = useMemo(() => {
    if (!debouncedSearch) return news;
    const q = debouncedSearch.toLowerCase();
    return news.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }, [news, debouncedSearch]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    setNewsletterError('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email: newsletterEmail,
          status: 'active',
          source: 'blog'
        }]);

      if (error) {
        if (error.code === '23505') {
          setNewsletterError('Este correo ya está suscrito a nuestra newsletter.');
        } else {
          setNewsletterError('Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.');
        }
        setNewsletterStatus('error');
        return;
      }

      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterError('Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.');
      setNewsletterStatus('error');
    }
  };

  return (
    <>
      <ModernNavbar />
      <div className="page blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="container">
            <div className="hero-content">
              <BookOpen size={48} className="hero-icon" />
              <h1>Noticias de Arquitectura y Diseño</h1>
              <p>
                Mantente al día con las últimas tendencias, historia y conceptos del mundo de la arquitectura y el diseño de interiores.
                Contenido curado de fuentes globales.
              </p>
            </div>
          </div>
        </section>

        {/* Search Only (Filters removed as they don't apply easily to Wikipedia mix) */}
        <section className="blog-filters">
          <div className="container">
            <div className="filters-container justify-center">
              <div className="search-group w-full max-w-2xl">
                <div className="search-input-container">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar temas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    aria-label="Buscar noticias"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="results-summary">
          <div className="container">
            <p className="results-text">
              Mostrando <strong>{filteredNews.length}</strong> artículos encontrados
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-posts">
          <div className="container">
            {loading ? (
              <div className="no-results"><h3>Cargando noticias...</h3></div>
            ) : error ? (
              <div className="no-results"><h3>{error}</h3></div>
            ) : filteredNews.length > 0 ? (
              <div className="posts-grid">
                {filteredNews.map((item) => (
                  <article key={item.id} className="post-card external-post">
                    <div className="post-image">
                      <img
                        src={item.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={item.title}
                        loading="lazy"
                        className="object-cover w-full h-full"
                      />
                      <div className="post-category bg-blue-600">
                        {item.source}
                      </div>
                    </div>

                    <div className="post-content">
                      <div className="post-meta">
                        {/* 
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        */}
                        <div className="meta-item">
                          <User size={14} />
                          <span>Wikipedia</span>
                        </div>
                      </div>

                      <h2 className="post-title">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h2>

                      <p className="post-excerpt line-clamp-3">{item.description}</p>

                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more">
                        Leer artículo completo
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">📝</div>
                <h3>No se encontraron artículos</h3>
                <p>Intenta buscar con otros términos.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-primary"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="newsletter-cta">
          <div className="container">
            {/* Same newsletter content */}
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h3>¿Quieres recibir más consejos?</h3>
                <p>Suscríbete a nuestra newsletter y recibe artículos exclusivos sobre reformas y diseño de interiores.</p>
              </div>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={newsletterStatus === 'loading'}
                >
                  {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirme'}
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="newsletter-success" style={{ color: '#10b981', marginTop: '1rem' }}>
                  ¡Gracias! Te hemos suscrito correctamente.
                </p>
              )}
              {newsletterStatus === 'error' && (
                <p className="newsletter-error" style={{ color: '#ef4444', marginTop: '1rem' }}>
                  {newsletterError}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
      <ModernFooter />
    </>
  );
};

export default Blog;

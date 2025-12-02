import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Filter
} from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://news.google.com/rss/search?q=reformas%20OR%20construcción&hl=es&gl=ES&ceid=ES:es');
    setLoading(true);
    setError(null);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data.items) ? data.items : [];
        setPosts(items);
      })
      .catch(e => setError('No se pudo cargar el contenido de actualidad'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set();
    posts.forEach(p => {
      if (Array.isArray(p.categories)) p.categories.forEach(c => cats.add(c));
    });
    return ['all', ...Array.from(cats)];
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach(p => {
      if (Array.isArray(p.categories)) p.categories.forEach(t => tags.add(t));
    });
    return ['all', ...Array.from(tags)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(post =>
        (post.title || '').toLowerCase().includes(q) ||
        (post.description || '').toLowerCase().includes(q) ||
        (post.content || '').toLowerCase().includes(q) ||
        (post.author || '').toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => Array.isArray(post.categories) && post.categories.includes(selectedCategory));
    }
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => Array.isArray(post.categories) && post.categories.includes(selectedTag));
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.pubDate) - new Date(a.pubDate);
        case 'oldest':
          return new Date(a.pubDate) - new Date(b.pubDate);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });
    return filtered;
  }, [posts, debouncedSearch, selectedCategory, selectedTag, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const getCategoryName = (category) => category;
  const getCategoryColor = () => '#6b7280';

  const readingMinutes = (post) => getReadingTime((post.content || post.description || '')); 

  return (
    <>
      <ModernNavbar />
      <div className="page blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="hero-content">
            <BookOpen size={48} className="hero-icon" />
            <h1>Blog de Reformas y Diseño</h1>
            <p>
              Descubre consejos, tendencias e ideas inspiradoras para transformar tu hogar o negocio. 
              Nuestros expertos comparten su conocimiento para ayudarte a crear espacios únicos.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="blog-filters">
        <div className="container">
          <div className="filters-container">
            {/* Search Bar */}
            <div className="search-group">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Buscar artículos"
                />
              </div>
            </div>

            {/* Filter Groups */}
            <div className="filter-groups">
              <div className="filter-group">
                <label><Filter size={16} /> Categoría</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas las categorías' : getCategoryName(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label><Tag size={16} /> Etiqueta</label>
                <select 
                  value={selectedTag} 
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="filter-select"
                >
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'Todas las etiquetas' : tag}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label><TrendingUp size={16} /> Ordenar</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="popular">Más populares</option>
                  <option value="title">Por título</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedTag !== 'all' || searchTerm) && (
              <div className="active-filters">
                <span className="filters-label">Filtros activos:</span>
                {searchTerm && (
                  <span className="active-filter">
                    🔍 "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>×</button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="active-filter" style={{ backgroundColor: getCategoryColor(selectedCategory) }}>
                    {getCategoryName(selectedCategory)}
                    <button onClick={() => setSelectedCategory('all')}>×</button>
                  </span>
                )}
                {selectedTag !== 'all' && (
                  <span className="active-filter">
                    🏷️ {selectedTag}
                    <button onClick={() => setSelectedTag('all')}>×</button>
                  </span>
                )}
                <button 
                  className="clear-all-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTag('all');
                  }}
                >
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="results-summary">
        <div className="container">
          <p className="results-text">
            Mostrando <strong>{filteredPosts.length}</strong> artículos
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        <div className="container">
          {loading ? (
            <div className="no-results"><h3>Cargando contenido...</h3></div>
          ) : error ? (
            <div className="no-results"><h3>{error}</h3></div>
          ) : filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <article key={post.guid || post.link} className="post-card">
                  <div className="post-image">
                    <img 
                      src={post.thumbnail || '/placeholder.jpg'} 
                      alt={post.title}
                      loading="lazy"
                    />
                    <div className="post-category" style={{ backgroundColor: getCategoryColor() }}>
                      {Array.isArray(post.categories) && post.categories[0] ? getCategoryName(post.categories[0]) : 'Actualidad'}
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <div className="post-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formatDate(post.pubDate)}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{readingMinutes(post)} min lectura</span>
                      </div>
                      <div className="meta-item">
                        <User size={14} />
                        <span>{post.author || new URL(post.link).hostname}</span>
                      </div>
                    </div>
                    
                    <h2 className="post-title">
                      <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    </h2>
                    
                    <p className="post-excerpt">{post.description}</p>
                    
                    <div className="post-tags">
                      {(Array.isArray(post.categories) ? post.categories : []).slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag-item">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">
                      Leer más
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📝</div>
              <h3>No se encontraron artículos</h3>
              <p>Intenta ajustar los filtros o utilizar otros términos de búsqueda.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                className="btn btn-primary"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Posts Section */}
      {filteredPosts.filter(post => post.featured).length > 0 && (
        <section className="featured-posts">
          <div className="container">
            <h2 className="section-title">Artículos Destacados</h2>
            <div className="featured-grid">
              {filteredPosts
                .filter(post => post.featured)
                .slice(0, 3)
                .map((post) => (
                  <article key={post.slug} className="featured-card">
                    <div className="featured-image">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        loading="lazy"
                      />
                      <div className="featured-badge">
                        <TrendingUp size={16} />
                        Destacado
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-meta">
                        <span className="featured-category" style={{ backgroundColor: getCategoryColor(post.category) }}>
                          {getCategoryName(post.category)}
                        </span>
                        <span className="featured-date">{formatDate(post.date)}</span>
                      </div>
                      <h3 className="featured-title">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="featured-excerpt">{post.excerpt}</p>
                      <div className="featured-footer">
                        <div className="featured-author">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="featured-link">
                          Leer artículo
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="newsletter-cta">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>¿Quieres recibir más consejos?</h3>
              <p>Suscríbete a nuestra newsletter y recibe artículos exclusivos sobre reformas y diseño de interiores.</p>
            </div>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    <ModernFooter />
  </>
  );
};

export default Blog;

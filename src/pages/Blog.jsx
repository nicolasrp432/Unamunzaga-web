import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useState, useMemo } from 'react';
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
import blogData from '../data/blog.json';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = new Set();
    blogData.forEach(post => cats.add(post.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    blogData.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return ['all', ...Array.from(tags)];
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = blogData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'popular':
          return b.views - a.views;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedTag, sortBy]);

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

  const getCategoryName = (category) => {
    const names = {
      'consejos': 'Consejos y Trucos',
      'tendencias': 'Tendencias',
      'reformas': 'Reformas',
      'diseno': 'Diseño de Interiores',
      'mantenimiento': 'Mantenimiento'
    };
    return names[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'consejos': '#10b981',
      'tendencias': '#f59e0b',
      'reformas': '#3b82f6',
      'diseno': '#8b5cf6',
      'mantenimiento': '#ef4444'
    };
    return colors[category] || '#6b7280';
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
          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="post-card">
                  <div className="post-image">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      loading="lazy"
                    />
                    <div className="post-category" style={{ backgroundColor: getCategoryColor(post.category) }}>
                      {getCategoryName(post.category)}
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <div className="post-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{getReadingTime(post.content)} min lectura</span>
                      </div>
                      <div className="meta-item">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <h2 className="post-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="post-excerpt">{post.excerpt}</p>
                    
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag-item">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="read-more">
                      Leer más
                      <ArrowRight size={16} />
                    </Link>
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
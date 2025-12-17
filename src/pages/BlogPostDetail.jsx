import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useBlogPost, useBlogPosts } from '../hooks/useBlogPosts';
import './BlogPostDetail.css';

const BlogPostDetail = () => {
  const { id } = useParams();
  const { post, loading, error } = useBlogPost(id);
  const [copiedLink, setCopiedLink] = useState(false);
  const { posts: allPosts } = useBlogPosts(4); // Fetch some posts for "Related"

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const relatedPosts = allPosts.filter(p => p.id !== id).slice(0, 3);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post?.title || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
      default:
        break;
    }
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
          source: 'blog-post'
        }]);

      if (error) {
        if (error.code === '23505') {
          setNewsletterError('Este correo ya está suscrito a nuestra newsletter.');
        } else {
          setNewsletterError('Hubo un error al procesar tu suscripción.');
        }
        setNewsletterStatus('error');
        return;
      }

      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterError('Hubo un error al procesar tu suscripción.');
      setNewsletterStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="blog-post-loading">
        <ModernNavbar />
        <div className="container py-20 flex justify-center">
          <h2>Cargando artículo...</h2>
        </div>
        <ModernFooter />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-not-found">
        <ModernNavbar />
        <div className="container py-20">
          <h1>Artículo no encontrado</h1>
          <p>El artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog" className="back-to-blog">
            <ArrowLeft size={20} />
            Volver al Blog
          </Link>
        </div>
        <ModernFooter />
      </div>
    );
  }

  return (
    <>
      <ModernNavbar />
      <div className="blog-post-detail">
        {/* Hero Section */}
        <div className="blog-post-hero">
          <div className="blog-post-hero-image">
            <img src={post.featured_image} alt={post.title} />
            <div className="blog-post-hero-overlay"></div>
          </div>
          <div className="blog-post-hero-content">
            <div className="container">
              <Link to="/blog" className="back-to-blog-link">
                <ArrowLeft size={20} />
                Volver al Blog
              </Link>
              <div className="blog-post-meta">
                <span className="blog-post-category">{post.category}</span>
                <div className="blog-post-date">
                  <Calendar size={16} />
                  {new Date(post.published_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                {/* 
                <div className="blog-post-reading-time">
                  <Clock size={16} />
                  {post.readingTime} min de lectura
                </div>
                */}
              </div>
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container">
          <div className="blog-post-content-wrapper">
            <div className="blog-post-main">
              <div className="blog-post-content prose lg:prose-xl max-w-none">
                {/* 
                    Note: Dev.to API returns markdown or html. 
                    Simple rendering for now, mimicking previous structure 
                 */}
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="blog-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-post-tags">
                  <h3>Tags</h3>
                  <div className="tags-list">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="blog-post-share">
                <h3>Compartir este artículo</h3>
                <div className="share-buttons">
                  <button onClick={() => handleShare('facebook')} className="share-button facebook">
                    <Facebook size={20} />
                    Facebook
                  </button>
                  <button onClick={() => handleShare('twitter')} className="share-button twitter">
                    <Twitter size={20} />
                    Twitter
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="share-button linkedin">
                    <Linkedin size={20} />
                    LinkedIn
                  </button>
                  <button onClick={() => handleShare('copy')} className="share-button copy">
                    {copiedLink ? <Check size={20} /> : <Copy size={20} />}
                    {copiedLink ? '¡Copiado!' : 'Copiar enlace'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="blog-post-sidebar">
              {/* Newsletter */}
              <div className="sidebar-newsletter">
                <h3>¡No te pierdas nada!</h3>
                <p>Suscríbete a nuestra newsletter y recibe los mejores artículos sobre construcción y arquitectura.</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={newsletterStatus === 'loading'}>
                    {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirse'}
                  </button>
                </form>
                {newsletterStatus === 'success' && (
                  <p style={{ color: '#10b981', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    ¡Gracias! Te hemos suscrito correctamente.
                  </p>
                )}
                {newsletterStatus === 'error' && (
                  <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    {newsletterError}
                  </p>
                )}
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-related">
                  <h3>Artículos relacionados</h3>
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="related-post">
                      <img src={relatedPost.featured_image || '/placeholder.jpg'} alt={relatedPost.title} className="related-post-image" />
                      <div className="related-post-content">
                        <h4>{relatedPost.title}</h4>
                        <span className="related-post-date">
                          {new Date(relatedPost.published_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModernFooter />
    </>
  );
};

export default BlogPostDetail;

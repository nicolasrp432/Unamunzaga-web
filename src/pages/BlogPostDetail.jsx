import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import blogData from '../data/blog.json';
import './BlogPostDetail.css';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundPost = blogData.posts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      
      const related = blogData.posts
        .filter(p => p.slug !== slug && p.category === foundPost.category)
        .slice(0, 3);
      
      if (related.length < 3) {
        const additional = blogData.posts
          .filter(p => p.slug !== slug && !related.includes(p))
          .slice(0, 3 - related.length);
        setRelatedPosts([...related, ...additional]);
      } else {
        setRelatedPosts(related);
      }
    }
  }, [slug]);

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

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <div className="container">
          <h1>Artículo no encontrado</h1>
          <p>El artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog" className="back-to-blog">
            <ArrowLeft size={20} />
            Volver al Blog
          </Link>
        </div>
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
          <img src={post.image} alt={post.title} />
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
                {new Date(post.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="blog-post-reading-time">
                <Clock size={16} />
                {post.readingTime} min de lectura
              </div>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-excerpt">{post.excerpt}</p>
            <div className="blog-post-author">
              <img src={post.author.avatar} alt={post.author.name} className="author-image" />
              <div className="author-info">
                <span className="author-name">{post.author.name}</span>
                <span className="author-role">{post.author.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className="blog-post-content-wrapper">
          <div className="blog-post-main">
            <div className="blog-post-content">
              {post.content.split('\n\n').map((paragraph, index) => (
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

            {/* Author Bio */}
            <div className="blog-post-author-bio">
              <img src={post.author.avatar} alt={post.author.name} className="author-bio-image" />
              <div className="author-bio-content">
                <h3>{post.author.name}</h3>
                <p className="author-bio-role">{post.author.role}</p>
                <p className="author-bio-description">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="blog-post-sidebar">
            {/* Newsletter */}
            <div className="sidebar-newsletter">
              <h3>¡No te pierdas nada!</h3>
              <p>Suscríbete a nuestra newsletter y recibe los mejores artículos sobre construcción y arquitectura.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Tu correo electrónico" required />
                <button type="submit">Suscribirse</button>
              </form>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="sidebar-related">
                <h3>Artículos relacionados</h3>
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="related-post">
                    <img src={relatedPost.image} alt={relatedPost.title} className="related-post-image" />
                    <div className="related-post-content">
                      <h4>{relatedPost.title}</h4>
                      <span className="related-post-date">
                        {new Date(relatedPost.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Categories */}
            <div className="sidebar-categories">
              <h3>Categorías</h3>
              {blogData.categories.map((category) => (
                <Link key={category} to={`/blog?category=${category.toLowerCase()}`} className="category-link">
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <ModernFooter />
    </>
  );
};

export default BlogPostDetail;

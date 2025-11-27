import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <section className="newsletter-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="newsletter-content">
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Suscríbete a nuestra newsletter</h2>
          <p style={{ opacity: 0.9 }}>Recibe consejos de reformas y novedades directamente en tu correo</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Correo electrónico"
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
            </button>
          </form>
          {status === 'success' && (
            <p style={{ marginTop: 12 }}>¡Gracias! Te hemos suscrito correctamente.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

import { useState, useEffect } from 'react';

const DekorAIEmbed = ({
  src,
  title = 'DekorAI IA Editor',
  height = 800,
  allow = 'camera; microphone; fullscreen',
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) setError(true);
    }, 15000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <section className={`dekorai-container ${className}`} style={{ position: 'relative' }}>
      {loading && (
        <div aria-live="polite" role="status" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 2 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #fff', borderTopColor: 'var(--color-accent)', animation: 'spin 1s linear infinite' }} />
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 3 }}>
          <div style={{ background: 'rgba(0,0,0,0.6)', padding: '12px 16px', borderRadius: 8 }}>No se pudo cargar DekorAI. Reintenta o verifica conexión.</div>
        </div>
      )}
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        allow={allow}
        scrolling="yes"
        onLoad={() => setLoading(false)}
        aria-busy={loading}
        style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: 'none', background: '#111' }}
      />
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </section>
  );
};

export default DekorAIEmbed;

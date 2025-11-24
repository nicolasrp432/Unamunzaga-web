import { useState } from 'react';

const KuulaTour = ({ id, title, description, src, fullScreen = false, children }) => {
    const [loading, setLoading] = useState(true);

    if (fullScreen) {
        return (
            <section className="kuula-tour-fullscreen" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                {loading && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.7)', zIndex: 2
                    }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #fff', borderTopColor: 'var(--color-accent)', animation: 'spin 1s linear infinite' }} />
                    </div>
                )}
                <iframe
                    title={title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="xr-spatial-tracking; gyroscope; accelerometer"
                    allowFullScreen
                    scrolling="no"
                    src={`${src}&chromeless=1`}
                    onLoad={() => setLoading(false)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', zIndex: 1 }}
                />
                {children && (
                    <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
                        {children}
                    </div>
                )}
                <style>
                    {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
                </style>
            </section>
        );
    }

    return (
        <section id={`tour-${id}`} className="kuula-tour" style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
            {description && <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>{description}</p>}
            <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#111' }}>
                {loading && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))', zIndex: 2
                    }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #fff', borderTopColor: 'var(--color-accent)', animation: 'spin 1s linear infinite' }} />
                    </div>
                )}
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                    <iframe
                        title={title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="xr-spatial-tracking; gyroscope; accelerometer"
                        allowFullScreen
                        scrolling="no"
                        src={src}
                        onLoad={() => setLoading(false)}
                        style={{ position: 'absolute', inset: 0, border: 'none' }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Explora el proyecto en 360°</a>
            </div>
            <style>
                {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
            </style>
        </section>
    );
};

export default KuulaTour;
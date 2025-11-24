import { useRef } from 'react';
import ReactCompareImage from 'react-compare-image';

const BeforeAfter = ({
  leftImage,
  rightImage,
  captionLeft = 'Antes',
  captionRight = 'Después',
  className = '',
  fullWidth = false,
  height = 600
}) => {
  const containerRef = useRef(null);

  const enterFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  return (
    <section className={`before-after ${className}`} aria-label="Comparador antes y después">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Comparador Antes y Después</h2>
          <p className="section-subtitle">Arrastra para comparar el resultado de la reforma.</p>
        </div>
      </div>
      <figure
        ref={containerRef}
        style={{
          position: 'relative',
          width: fullWidth ? '100vw' : '100%',
          height: fullWidth ? height : 'auto',
          maxWidth: fullWidth ? '100%' : '1200px',
          margin: fullWidth ? '0' : '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}
      >
        <ReactCompareImage
          leftImage={leftImage}
          rightImage={rightImage}
          sliderLineColor={getComputedStyle(document.documentElement).getPropertyValue('--color-accent') || '#f7941d'}
          hover
          sliderPositionPercentage={0.5}
        />
        <figcaption style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 8 }}>
          <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 10px', borderRadius: 12, fontSize: 14 }}>{captionLeft}</span>
          <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 10px', borderRadius: 12, fontSize: 14 }}>{captionRight}</span>
        </figcaption>
        <button
          type="button"
          onClick={enterFullscreen}
          className="btn btn-outline"
          style={{ position: 'absolute', right: 16, top: 16 }}
        >
          Pantalla completa
        </button>
      </figure>
    </section>
  );
};

export default BeforeAfter;

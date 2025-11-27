import React from 'react';

const ClientTrust = ({
  title = 'Ellos creen en nosotros',
  images = [
    '/creen/imgi_10_estudios-9.png',
    '/creen/imgi_11_estudios-8 (1).png',
    '/creen/imgi_11_estudios-8.png',
    '/creen/imgi_12_estudios-7.png',
    '/creen/imgi_13_estudios-6.png',
    '/creen/imgi_14_estudios-5.png',
    '/creen/imgi_15_estudios-4.png',
    '/creen/imgi_16_estudios-2.png',
    '/creen/imgi_17_estudios-1.png',
  ],
  speed = 24,
  height = 120,
}) => {
  return (
    <section className="client-trust">
      <div className="container">
        <h2 className="trust-title">{title}</h2>
        <div className="logos-marquee">
          <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
            {images.map((src, i) => (
              <div className="logo-item" key={`${src}-${i}`}>
                <img src={src} alt="Logo de cliente" loading="lazy" style={{ height }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTrust;

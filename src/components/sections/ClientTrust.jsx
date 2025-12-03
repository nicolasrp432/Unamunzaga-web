import React from 'react';

const ClientTrust = ({
  title = 'Ellos creen en nosotros',
  images = [
    '/creen/imgi_10_estudios-9.png',
    '/creen/imgi_11_estudios-8.png',
    '/creen/imgi_12_estudios-7.png',
    '/creen/imgi_13_estudios-6.png',
    '/creen/imgi_14_estudios-5.png',
    '/creen/imgi_15_estudios-4.png',
    '/creen/imgi_16_estudios-2.png',
    '/creen/imgi_17_estudios-1.png',
  ],
  height = 120,
}) => {
  const normalizeKey = (src) => src.replace(/\s*\(\d+\)\s*/g, '');
  const unique = images.filter((src, index, self) =>
    self.findIndex((s) => normalizeKey(s) === normalizeKey(src)) === index
  );

  const mid = Math.ceil(unique.length / 2);
  const row1 = unique.slice(0, mid);
  const row2 = unique.slice(mid);

  return (
    <section className="client-trust">
      <div className="container">
        <h2 className="trust-title">{title}</h2>
        <div className="logos-rows">
          <div className="logos-row">
            {row1.map((src) => (
              <div className="logo-item" key={src}>
                <img src={src} alt="Logo de cliente" loading="lazy" style={{ height }} />
              </div>
            ))}
          </div>
          <div className="logos-row">
            {row2.map((src) => (
              <div className="logo-item" key={src}>
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

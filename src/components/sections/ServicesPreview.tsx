import React, { useMemo, useState } from 'react';
import { servicesData } from '../../data/services';
import ServiceCard from '../services/ServiceCard';

const quickFilters = [
  'principales',
  'all',
  'viviendas',
  'cocinas',
  'baños',
  'locales',
  'fachadas',
  'reformas',
  'insonorizacion',
  'impermeabilizacion',
  'rehabilitaciones',
  'accesibilidad'
];

export const ServicesPreview: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('principales');

  const filtered = useMemo(() => {
    if (selectedFilter === 'principales') {
      const ids = ['viviendas', 'locales', 'fachadas'];
      return servicesData.filter(s => ids.includes(s.id)).slice(0, 3);
    }
    if (selectedFilter === 'all') return servicesData.slice(0, 3);
    const cat = selectedFilter.toLowerCase();
    return servicesData.filter(
      s => s.id.toLowerCase().includes(cat) || s.title.toLowerCase().includes(cat)
    ).slice(0, 3);
  }, [selectedFilter]);

  return (
    <section id="services" className="services-preview py-20 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Algunos de nuestros servicios</h2>
            <div className="mt-4 h-1 w-28 bg-amber-500 rounded-full"></div>
          </div>
          <a href="/servicios" className="text-amber-500 font-semibold">Ver todos</a>
        </div>

        <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(selectedFilter === f ? 'all' : f)}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${selectedFilter === f ? 'bg-amber-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                {f === 'all' ? 'Todos' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;

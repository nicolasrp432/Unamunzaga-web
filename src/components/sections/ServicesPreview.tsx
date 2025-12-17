import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import ServiceCard from '../services/ServiceCard';
import { Loader2 } from 'lucide-react';

const quickFilters = [
  'todos',
  'reformas',
  'insonorizacion',
  'reparaciones',
  'impermeabilizacion',
  'rehabilitaciones',
  'estructuras',
  'accesibilidad',
  'pladur',
  'tecnico',
  'decoracion',
  'obras',
  'carpinteria',
  'electricidad',
  'fontaneria',
  'proyectos'
];

export const ServicesPreview: React.FC = () => {
  const { services, loading } = useServices();
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (loading) return [];
    if (selectedFilter === 'todos') {
      // Return 6 main services for the preview instead of just 3
      const priority = ['reformas', 'insonorizacion', 'rehabilitaciones', 'accesibilidad', 'impermeabilizacion', 'proyectos'];
      const main = services.filter(s => priority.some(p => s.category?.toLowerCase() === p));
      return main.length > 0 ? main : services.slice(0, 6);
    }

    const cat = selectedFilter.toLowerCase();
    return services.filter(
      s => (s.category || '').toLowerCase().includes(cat) || s.title.toLowerCase().includes(cat)
    );
  }, [selectedFilter, services, loading]);

  if (loading) {
    return (
      <section id="services" className="services-preview py-20 bg-white">
        <div className="flex justify-center"><Loader2 className="animate-spin text-blue-900" /></div>
      </section>
    )
  }

  return (
    <section id="services" className="services-preview py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{/* Changed to white per user request */}
              Algunos de nuestros servicios
            </h2>
            <div className="mt-4 h-1 w-28 bg-amber-500 rounded-full"></div>
          </div>
          <a href="/servicios" className="text-amber-500 font-semibold hover:text-amber-600 transition-colors">Ver todos</a>
        </div>

        <div className="mb-6 bg-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(selectedFilter === f ? 'todos' : f)}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${selectedFilter === f ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
              >
                {f === 'todos' ? 'Principales' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <div key={service.id} className="service-card-wrapper border border-gray-100 rounded-2xl shadow-lg bg-white overflow-hidden">
              <ServiceCard
                service={service}
                compact
                showCTAs
                onQuote={() => navigate('/contacto')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;

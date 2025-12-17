import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Check,
  ArrowRight,
  Building2,
  Wrench,
  Bath,
  Store,
  Building,
  Zap,
  Waves,
  BadgeCheck,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  Star
} from 'lucide-react';
import DekorAIEmbed from '../components/integrations/DekorAIEmbed';
import './Services.css';
import { CTASection } from '../components/sections/CTASection';
import NewsletterSignup from '../components/sections/NewsletterSignup';
import ClientTrust from '../components/sections/ClientTrust';
import { useServices } from '../hooks/useServices';
import { Loader2 } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';
import logo from '../assets/logo.png';

const Services = () => {
  const { services, loading: servicesLoading } = useServices();
  const [ctaOpen, setCtaOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const quickFilters = [
    'all',
    'viviendas',
    'cocinas-banos',
    'locales',
    'fachadas',
    'reformas',
    'insonorizacion',
    'impermeabilizacion',
    'rehabilitaciones',
    'accesibilidad'
  ];
  const filteredServices = useMemo(() => {
    if (selectedFilter === 'all') return services;
    const cat = selectedFilter.toLowerCase();
    return services.filter(
      (s) => (s.category || '').toLowerCase().includes(cat) || s.title.toLowerCase().includes(cat)
    );
  }, [selectedFilter, services]);

  const clientLogos = [
    logo,
    '/creen/imgi_10_estudios-9.png',
    '/creen/imgi_11_estudios-8.png',
    '/creen/imgi_12_estudios-7.png',
    '/creen/imgi_13_estudios-6.png',
    '/creen/imgi_14_estudios-5.png',
    '/creen/imgi_15_estudios-4.png',
    '/creen/imgi_16_estudios-2.png',
    '/creen/imgi_17_estudios-1.png',
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  };
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 }
  };

  const navigate = useNavigate();
  const openModalFor = (service) => {
    setSelectedService(service);
    navigate('/contacto');
  };

  const onSubmit = (data) => {
    // Simulación de envío y feedback visual
    setTimeout(() => {
      setCtaOpen(false);
      reset();
      const message = `Hola, soy ${data.name}. Quiero presupuesto para ${selectedService?.title}. ${data.message}`;
      const url = `https://wa.me/34674274466?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }, 800);
  };

  return (
    <>
      <ModernNavbar />
      <div className="min-h-screen bg-white">
        {/* Encabezado de página */}
        <section className="bg-blue-900 text-white py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Nuestros Servicios</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">Soluciones profesionales para cada tipo de proyecto</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="flex flex-wrap gap-2">
                {quickFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(selectedFilter === f ? 'all' : f)}
                    className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${selectedFilter === f ? 'bg-[#D54219] text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  >
                    {f === 'all' ? 'Todos' : f}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Stats rápidos */}
        <div className="bg-[#D54219]/10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-6 h-6 text-[#D54219]" />
              <span className="font-semibold text-[#D54219]">+1000 obras finalizadas en Bilbao y Bizkaia</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-[#D54219]" />
              <span className="text-[#D54219]">Clientes particulares y profesionales confían en nosotros</span>
            </div>
          </div>
        </div>

        {/* Grid de servicios */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {servicesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} onQuote={openModalFor} showCTAs />
              ))}
            </div>
          )}
        </div>


        {/* Bloque asistente visual */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">¿No sabes qué servicio necesitas?</h2>
              <p className="text-gray-600">Elige tu perfil y te mostramos ejemplos y soluciones.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacto" className="px-6 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800">Soy particular</Link>
              <Link to="/contacto" className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300">Soy arquitecto / profesional</Link>
            </div>
          </div>
        </div>

        {/* Banner de contacto con imagen */}
        <section className="contact-banner">
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/fondounamunzaga.jpg" alt="Equipo Unamunzaga" className="w-full h-80 object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Tienes un problema? Lo solucionamos hoy</h2>
              <p className="text-gray-600 mb-6">Llámanos o escríbenos y te asesoramos sin compromiso.</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+34944078427" className="px-5 py-3 rounded-xl bg-blue-900 text-white inline-flex items-center gap-2"><Phone className="w-5 h-5" /> +34 944 07 84 27</a>
                <a href="mailto:contacto@unamunzagaobras.com" className="px-5 py-3 rounded-xl bg-gray-700 text-white inline-flex items-center gap-2"><Mail className="w-5 h-5" /> contacto@unamunzagaobras.com</a>
                <Link to="/contacto" className="px-5 py-3 rounded-xl bg-[#D54219] text-white font-semibold hover:bg-[#D54219]">Solicitar presupuesto</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Componente de contacto reutilizable */}
        <CTASection />

        {/* Suscripción a newsletter */}
        <NewsletterSignup />

        {/* Editor IA existente */}
        <section id="editor-ia" className="section">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">Rediseña tu espacio con IA</h2>
              <p className="section-subtitle">Explora y diseña con la aplicación AI Space Canvas integrada en nuestra web.</p>
            </div>
            <DekorAIEmbed
              src="https://ai-space-canvas.lovable.app"
              title="AI Space Canvas"
              height={800}
              allow="camera; microphone; fullscreen"
            />
          </div>
        </section>

        {/* Editor IA adicional */}
        <section id="editor-ia-2" className="section">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">Rediseña tu espacio con IA</h2>
              <p className="section-subtitle">Explora y diseña con la aplicación integrada en nuestra web.</p>
            </div>
            <DekorAIEmbed
              src="https://floorplan-forge-73.lovable.app/"
              title="Floorplan Forge"
              height={800}
              allow="camera; microphone; fullscreen"
            />
          </div>
        </section>

        {/* Modal CTA */}
        <AnimatePresence>
          {ctaOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur" onClick={() => setCtaOpen(false)}>
              <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -20 }} className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-2xl mt-24 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Solicita tu presupuesto</h3>
                  <p className="text-gray-600">Te asesoramos sin coste. Servicio seleccionado: <span className="font-semibold">{selectedService?.title || 'General'}</span></p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm text-gray-700">Nombre *</label>
                    <input className={`w-full px-4 py-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} {...register('name', { required: 'Tu nombre es obligatorio' })} placeholder="Tu nombre" />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Email *</label>
                    <input className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} {...register('email', { required: 'Email obligatorio' })} placeholder="tu@email.com" />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Descripción breve *</label>
                    <textarea rows={3} className={`w-full px-4 py-3 border rounded-lg ${errors.message ? 'border-red-500' : 'border-gray-300'}`} {...register('message', { required: 'Cuéntanos brevemente tu necesidad' })} placeholder="Cuéntanos sobre tu proyecto" />
                    {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="px-6 py-3 rounded-xl bg-[#D54219] text-white font-semibold hover:bg-[#D54219] inline-flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" /> Enviar solicitud
                    </button>
                    <button type="button" onClick={() => setCtaOpen(false)} className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300">Cerrar</button>
                    <a href="tel:+34612345678" className="px-4 py-3 rounded-xl bg-blue-900 text-white inline-flex items-center gap-2"><Phone className="w-4 h-4" /> Llamar</a>
                    <a href="mailto:info@unamunzagaobras.com" className="px-4 py-3 rounded-xl bg-gray-700 text-white inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Email</a>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confianza de clientes */}
        <ClientTrust images={clientLogos} />

      </div >
      <ModernFooter />
    </>
  );
};

export default Services;

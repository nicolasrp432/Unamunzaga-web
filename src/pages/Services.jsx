import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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

const Services = () => {
  const services = [
    {
      id: 'viviendas',
      title: 'Reformas Integrales de Viviendas',
      description:
        'Interiorismo a medida para transformar tu hogar. Cocinas, baños y espacios totalmente renovados con gestión integral.',
      features: [
        'Diseño y planificación de espacios',
        'Renovación completa de instalaciones (fontanería, electricidad)',
        'Carpintería a medida (armarios, puertas, suelos)',
        'Iluminación y domótica',
        'Gestión de licencias y permisos'
      ],
      image:
        '/fondounamunzaga.jpg',
      icon: Building2,
      badges: ['Más solicitado', 'Ideal para viviendas'],
      microStat: '+30 cocinas renovadas este año'
    },
    {
      id: 'cocinas-banos',
      title: 'Cocinas y Baños',
      description:
        'Espacios funcionales y estéticos donde el diseño se une a la practicidad. Materiales premium y acabados duraderos.',
      features: [
        'Diseño 3D previo',
        'Mobiliario de alta calidad',
        'Sanitarios y grifería de diseño',
        'Alicatados y solados modernos',
        'Optimización del espacio'
      ],
      image:
        '/fondounamunzaga.jpg',
      icon: Bath,
      badges: ['Ideal para viviendas'],
      microStat: 'Proyectos con arquitectos y comunidades'
    },
    {
      id: 'locales',
      title: 'Locales Comerciales y Oficinas',
      description:
        'Diseño corporativo para potenciar tu marca y productividad. Plazos ajustados para minimizar cierres.',
      features: [
        'Adecuación a normativa vigente',
        'Diseño corporativo e imagen de marca',
        'Insonorización y acústica',
        'Climatización y ventilación',
        'Plazos ajustados para minimizar el cierre'
      ],
      image:
        '/fondounamunzaga.jpg',
      icon: Store,
      badges: ['Recomendado para locales comerciales'],
      microStat: '+120 locales optimizados en Bilbao'
    },
    {
      id: 'fachadas',
      title: 'Fachadas y Comunidades',
      description:
        'Eficiencia energética, seguridad y estética para tu edificio. Soluciones SATE y cubiertas con garantía.',
      features: [
        'Rehabilitación de fachadas (SATE, ventiladas)',
        'Impermeabilización de cubiertas y tejados',
        'Instalación de ascensores a cota cero',
        'Eliminación de barreras arquitectónicas',
        'Inspección Técnica de Edificios (ITE)'
      ],
      image:
        '/fondounamunzaga.jpg',
      icon: Building,
      badges: ['Proyectos con comunidades'],
      microStat: '+300 comunidades rehabilitadas'
    },
    {
      id: 'reformas',
      title: 'Reformas',
      description:
        'Cubrimos todas las ramas de obras desde derribos hasta las últimas técnicas de reformas, interiorismo y decoración.',
      features: [
        'Interiores de viviendas',
        'Cocinas',
        'Baños',
        'Locales comerciales',
        'Oficinas'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Wrench,
      badges: ['Servicio integral']
    },
    {
      id: 'insonorizacion',
      title: 'Insonorización',
      description:
        'Soluciones acústicas para mejorar la calidad y confort en cualquier espacio.',
      features: [
        'Aislamiento y acondicionamiento',
        'Licencias de actividad',
        'Protección frente al ruido',
        'Control de ruido',
        'Calidad acústica'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Waves,
      badges: ['Mejora de confort']
    },
    {
      id: 'reparaciones',
      title: 'Reparaciones',
      description:
        'Atención rápida y eficaz para arreglos y mantenimiento de tu vivienda o negocio.',
      features: [
        'Suelos deteriorados',
        'Maderas desgastadas',
        'Instalaciones eléctricas',
        'Instalaciones de fontanería',
        'Falsos techos caídos'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Wrench,
      badges: ['Respuesta rápida']
    },
    {
      id: 'impermeabilizacion',
      title: 'Impermeabilización',
      description:
        'Evita filtraciones y humedades con soluciones duraderas para interior y exterior.',
      features: [
        'Cimientos y suelos exteriores',
        'Fachadas y muros',
        'Suelos y paredes interiores',
        'Tejados, terrazas y azoteas',
        'Goteras, filtraciones y humedades'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Waves,
      badges: ['Protección contra agua']
    },
    {
      id: 'rehabilitaciones',
      title: 'Rehabilitaciones',
      description:
        'Recuperamos y mejoramos edificios y espacios comunes con criterios técnicos y estéticos.',
      features: [
        'Fachadas deterioradas',
        'Restauración de tejados',
        'Reestructuración de terrazas',
        'Acondicionamiento de zonas comunitarias',
        'Reparación de portales'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Building,
      badges: ['Comunidades']
    },
    {
      id: 'refuerzos-estructuras',
      title: 'Refuerzos de Estructuras',
      description:
        'Seguridad y estabilidad estructural con refuerzos en viviendas y edificios.',
      features: [
        'Viviendas',
        'Edificios',
        'Vigas',
        'Columnas',
        'Forjados y muros'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Building2,
      badges: ['Ingeniería']
    },
    {
      id: 'accesibilidad',
      title: 'Accesibilidad',
      description:
        'Soluciones para eliminar barreras arquitectónicas y mejorar la accesibilidad.',
      features: [
        'Rampas',
        'Ascensores',
        'Plataformas de acceso',
        'Salva escaleras',
        'Domótica'
      ],
      image: '/fondounamunzaga.jpg',
      icon: BadgeCheck,
      badges: ['Mejora accesible']
    },
    {
      id: 'pladur',
      title: 'Pladúr',
      description:
        'Sistemas de pladúr para compartimentación, aislamiento y decoración.',
      features: [
        'Separación de espacios',
        'Aislamiento térmico',
        'Impermeabilización',
        'Insonorización',
        'Decoración'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Wrench,
      badges: ['Versatilidad']
    },
    {
      id: 'informes-tecnicos',
      title: 'Informes Técnicos',
      description:
        'Evaluaciones y documentación técnica para proyectos y certificaciones.',
      features: [
        'Adecuación de ruido',
        'Eficiencia energética',
        'Habitabilidad',
        'Gestión de residuos',
        'Segregación de viviendas'
      ],
      image: '/fondounamunzaga.jpg',
      icon: BadgeCheck,
      badges: ['Documentación']
    },
    {
      id: 'decoraciones-escayola',
      title: 'Decoraciones en Escayola',
      description:
        'Elementos decorativos en escayola para dar personalidad a tus espacios.',
      features: [
        'Baldas y estantería',
        'Arcos',
        'Columnas',
        'Cornisas',
        'Frisos'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Sparkles,
      badges: ['Decoración']
    },
    {
      id: 'derribos',
      title: 'Derribos',
      description:
        'Demoliciones y retirada de materiales con gestión de residuos.',
      features: [
        'Tabiques de ladrillos y pladúr',
        'Muebles de cocinas y techos',
        'Aparatos sanitarios',
        'Suelos, tarimas y revestimientos',
        'Transporte a vertedero'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Wrench,
      badges: ['Gestión responsable']
    },
    {
      id: 'carpinteria',
      title: 'Carpintería',
      description:
        'Carpintería interior y exterior con madera y metal.',
      features: [
        'Ventanas y puertas de madera',
        'Ventanas y puertas metálicas',
        'Interior y exterior',
        'Tarimas flotantes y parqués',
        'Escaleras'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Wrench,
      badges: ['A medida']
    },
    {
      id: 'instalaciones-electricas',
      title: 'Instalaciones Eléctricas',
      description:
        'Modernización y ampliación de instalaciones eléctricas y sistemas de domótica.',
      features: [
        'Acometida general',
        'Modernización de instalaciones eléctricas',
        'Iluminación general',
        'Cableados de red para voz y datos',
        'Porteros, video vigilancia y domótica'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Zap,
      badges: ['Eficiencia y seguridad']
    },
    {
      id: 'instalaciones-fontaneria',
      title: 'Instalaciones de Fontanería',
      description:
        'Suministro y saneamiento, climatización y ACS con materiales y soluciones actuales.',
      features: [
        'Red de suministro y saneamiento',
        'Sustitución e instalación equipos de cocina y baño',
        'Calefacción, climatización y agua caliente',
        'Sustitución de tuberías de plomo, cobre y PVC',
        'Cálculo calorífico de la vivienda'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Bath,
      badges: ['Confort y eficiencia']
    },
    {
      id: 'desarrollo-proyectos',
      title: 'Desarrollo de Proyectos',
      description:
        'Dirección y gestión integral de obras nuevas, reformas y rehabilitaciones.',
      features: [
        'Obras nuevas',
        'Reformas de interiores',
        'Rehabilitación total o parcial de edificios',
        'Mantenimiento integral de edificaciones',
        'Remodelación de locales comerciales'
      ],
      image: '/fondounamunzaga.jpg',
      icon: Building2,
      badges: ['Gestión integral']
    }
  ];

  const [ctaOpen, setCtaOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const quickFilters = [
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
  const filteredServices = useMemo(() => {
    if (selectedFilter === 'all') return services;
    const cat = selectedFilter.toLowerCase();
    return services.filter(
      (s) => s.id.toLowerCase().includes(cat) || s.title.toLowerCase().includes(cat)
    );
  }, [services, selectedFilter]);
  

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

  const openModalFor = (service) => {
    setSelectedService(service);
    setCtaOpen(true);
  };

  const onSubmit = (data) => {
    // Simulación de envío y feedback visual
    setTimeout(() => {
      setCtaOpen(false);
      reset();
      const message = `Hola, soy ${data.name}. Quiero presupuesto para ${selectedService?.title}. ${data.message}`;
      const url = `https://wa.me/34612345678?text=${encodeURIComponent(message)}`;
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
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${selectedFilter === f ? 'bg-amber-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  {f === 'all' ? 'Todos' : f}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      

      {/* Stats rápidos */}
      <div className="bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <BadgeCheck className="w-6 h-6 text-amber-500" />
            <span className="font-semibold text-amber-700">+1000 obras finalizadas en Bilbao y Bizkaia</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-amber-500" />
            <span className="text-amber-700">Clientes particulares y profesionales confían en nosotros</span>
          </div>
        </div>
      </div>

      {/* Grid de servicios */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon || Wrench;
            return (
              <motion.section
                key={service.id}
                id={service.id}
                whileHover={{ y: -6, scale: 1.02 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="service-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
              >
                {/* Imagen */}
                <div className="relative h-52 service-image">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {service.badges?.map((b) => (
                      <span key={b} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-white">
                        {b}
                      </span>
                    ))}
                  </div>
                  {/* Icono centrado */}
                  <div className="service-icon-badge">
                    <Icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-4 pt-20">
                  <h2 className="text-xl font-bold text-gray-900 text-center">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>

                  {/* Micro-caso de éxito */}
                  {service.microStat && (
                    <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{service.microStat}</span>
                    </div>
                  )}

                  {/* Features */}
                  <motion.ul className="space-y-2" variants={listVariants}>
                    {service.features.map((feature, i) => (
                      <motion.li key={i} className="flex items-start gap-2 text-gray-700" variants={itemVariants}>
                        <Check className="w-4 h-4 text-amber-500 mt-0.5" /> {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openModalFor(service)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" /> Solicita tu presupuesto fácil
                    </motion.button>

                    <Link
                      to="/proyectos"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-900 hover:bg-blue-50"
                    >
                      Explora proyectos <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>

      {/* Prueba social: logos/testimonios mini */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex justify-center">
              <img
                src={`https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=client%20logo%20minimal%20blue%20and%20gray%20professional&image_size=square`}
                alt={`Logo cliente ${i}`}
                className="h-12 object-contain grayscale hover:grayscale-0 transition"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bloque asistente visual */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">¿No sabes qué servicio necesitas?</h2>
            <p className="text-gray-600">Elige tu perfil y te mostramos ejemplos y soluciones.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800">Soy particular</button>
            <button className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300">Soy arquitecto / profesional</button>
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
              <a href="tel:+34944231213" className="px-5 py-3 rounded-xl bg-blue-900 text-white inline-flex items-center gap-2"><Phone className="w-5 h-5" /> +34 944 231 213</a>
              <a href="mailto:info@unamunzagaobras.com" className="px-5 py-3 rounded-xl bg-gray-700 text-white inline-flex items-center gap-2"><Mail className="w-5 h-5" /> info@unamunzagaobras.com</a>
              <button onClick={() => setCtaOpen(true)} className="px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600">Solicitar presupuesto</button>
            </div>
          </div>
        </div>
      </section>

      {/* Componente de contacto reutilizable */}
      <CTASection />

      {/* Suscripción a newsletter */}
      <NewsletterSignup />

      {/* Editor IA existente */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Rediseña tu espacio con IA</h2>
            <p className="section-subtitle">Edita tu espacio con IA en segundos usando DekorAI, ¡prueba el rediseño interactivo!</p>
          </div>
          <DekorAIEmbed
            src="https://dekorai.com/prueba-dekorai-gratis-en-tu-e-commerce-por-un-mes/#style-swapper"
            title="DekorAI IA Editor"
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
                  <button type="submit" className="px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 inline-flex items-center gap-2">
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

    </div>
    <ModernFooter />
    </>
  );
};

export default Services;

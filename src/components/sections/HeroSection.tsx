import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { Play, Calculator, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KPI } from '../../types';

interface HeroSectionProps {
  kpis: KPI[];
}

const heroImages = [
  "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20construction%20site%20bilbao%20professional%20workers%20premium%20quality%20architecture&image_size=landscape_16_9",
  "/fondounamunzaga.jpg",
  "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20commercial%20office%20renovation%20bilbao%20sleek%20glass%20meeting%20room&image_size=landscape_16_9",
  "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=exterior%20building%20facade%20restoration%20bilbao%20scaffolding%20professional%20safety&image_size=landscape_16_9"
];

const heroTitles = [
  {
    prefix: "Más de",
    highlight: "20 años",
    suffix: "transformando espacios"
  },
  {
    prefix: "Excelencia y",
    highlight: "Calidad",
    suffix: "en cada proyecto"
  },
  {
    prefix: "Tu visión,",
    highlight: "Nuestra pasión",
    suffix: "hecha realidad"
  }
];
const mobileMessages = [
  "En Bilbao para clientes exigentes",
  "Más de 10.000 proyectos ejecutados",
  "Excelencia en cada reforma"
];

export const HeroSection: React.FC<HeroSectionProps> = ({ kpis }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentMobileMsg, setCurrentMobileMsg] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMobileMsg((prev) => (prev + 1) % mobileMessages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  

  return (
    <section id="home" className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black-800/70 to-amber-600/60 z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Unamunzaga Obras Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Carousel Controls */}
        <div className="absolute inset-0 z-50 hidden md:flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={prevImage}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all pointer-events-auto transform hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={nextImage}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all pointer-events-auto transform hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex space-x-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImage ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 md:pt-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 md:space-y-6 min-h-[160px]" // Min height to prevent layout shift
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-inter text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                {heroTitles[currentTitle].prefix}{' '}
                <span className="text-amber-400 block sm:inline">
                  {heroTitles[currentTitle].highlight}
                </span>
                <br className="hidden md:block" />
              {heroTitles[currentTitle].suffix}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`msg-${currentMobileMsg}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="md:hidden text-base font-bold tracking-wide text-amber-400 max-w-xs mx-auto leading-relaxed"
            >
              {mobileMessages[currentMobileMsg]}
            </motion.p>
          </AnimatePresence>
            
            <p className="hidden md:block text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              En Bilbao para clientes exigentes: particulares y profesionales. 
              <br className="hidden md:block" />
              Confía en los expertos con más de{' '}
              <span className="text-amber-400 font-semibold">10.000 proyectos ejecutados</span>
            </p>
          </motion.div>

          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-4">
                  <motion.div
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8 + index * 0.1,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <CountUp
                      start={0}
                      end={kpi.value}
                      duration={2.5}
                      separator=","
                      suffix={kpi.suffix}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-amber-400">
                      {kpi.label}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      {kpi.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Decorative element */}
                <motion.div
                  className="w-16 h-1 bg-amber-400 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 64 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contacto')}
              className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Solicita Presupuesto</span>
              <Calculator className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Ver Proyectos</span>
              <Play className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/servicios#editor-ia')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Rediseña tu espacio</span>
              <Play className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      
    </section>
  );
};

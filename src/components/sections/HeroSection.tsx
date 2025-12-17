import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Play, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { KPI } from '../../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSectionProps {
  kpis: KPI[];
}

const heroVideos = [
  "/video/2.mp4",
  "/video/3.mp4",
  "/video/4.mp4",
  "/video/6.mp4"
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
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentMobileMsg, setCurrentMobileMsg] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const navigate = useNavigate();

  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

  useEffect(() => {
    const tryAutoplay = async () => {
      if (!isMobile) return;
      try {
        const plays = videoRefs.current
          .filter(Boolean)
          .map((v) => {
            v.muted = true;
            v.playsInline = true;
            return v.play();
          });
        const results = await Promise.allSettled(plays);
        const rejected = results.some((r) => r.status === 'rejected');
        setAutoplayBlocked(rejected);
      } catch {
        setAutoplayBlocked(true);
      }
    };
    // delay a bit to ensure videos are mounted by Swiper
    const id = setTimeout(tryAutoplay, 300);
    return () => clearTimeout(id);
  }, [isMobile]);

  const handleUserPlay = () => {
    videoRefs.current.forEach((v) => {
      try {
        if (v) {
          v.muted = true;
          v.playsInline = true;
          v.play().catch(() => {});
        }
      } catch {}
    });
    setAutoplayBlocked(false);
  };

  return (
    <section id="home" className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-amber-900/30 z-10" />
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {heroVideos.map((video, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                ref={(el) => {
                  if (el) videoRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {autoplayBlocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <button
              onClick={handleUserPlay}
              className="px-6 py-3 rounded-full bg-amber-600 text-white shadow-lg active:scale-95 transition-transform"
            >
              Reproducir fondo
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center h-full pt-20 md:pt-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 md:space-y-10"
        >
          {/* Main Title */}
          <div className="space-y-4 min-h-[140px] md:min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-inter text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg"
              >
                {heroTitles[currentTitle].prefix}{' '}
                <span className="text-amber-400 block sm:inline">
                  {heroTitles[currentTitle].highlight}
                </span>
                <span className="block mt-1 sm:mt-2">
                  {heroTitles[currentTitle].suffix}
                </span>
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`msg-${currentMobileMsg}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="md:hidden text-lg font-bold tracking-wide text-amber-300 max-w-xs mx-auto leading-relaxed drop-shadow-md"
              >
                {mobileMessages[currentMobileMsg]}
              </motion.p>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md"
            >
              En Bilbao para clientes exigentes: particulares y profesionales.
              <br className="hidden lg:block" />
              Confía en los expertos con más de{' '}
              <span className="text-amber-400 font-bold">10.000 proyectos ejecutados</span>
            </motion.p>
          </div>

          {/* KPIs */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center group p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="mb-2">
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  >
                    <CountUp
                      start={0}
                      end={kpi.value}
                      duration={2.5}
                      separator=","
                      suffix={kpi.suffix}
                    />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-1">
                    {kpi.label}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {kpi.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md mx-auto sm:max-w-none"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contacto')}
              className="w-full sm:w-[280px] h-12 md:h-14 px-6 md:px-8 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center space-x-2 text-base md:text-lg"
            >
              <span>Solicita Presupuesto</span>
              <Calculator className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/servicios#editor-ia')}
              className="w-full sm:w-[280px] h-12 md:h-14 px-6 md:px-8 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center space-x-2 text-base md:text-lg"
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

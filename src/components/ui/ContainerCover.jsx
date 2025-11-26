
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ContainerCover.css';

export const ContainerCover = ({ children, images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="container-cover">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          className="cover-image"
          alt="Background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="cover-overlay" />

      <button onClick={prevSlide} className="carousel-arrow left-arrow">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="carousel-arrow right-arrow">
        <ChevronRight size={32} />
      </button>

      <div className="cover-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="cover-title">{title}</h1>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
      </div>
    </div>
  );
};

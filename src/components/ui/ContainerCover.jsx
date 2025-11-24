
import React from 'react';
import { motion } from 'framer-motion';
import './ContainerCover.css';

export const ContainerCover = ({ children, image, title }) => {
  return (
    <div className="container-cover">
      <img src={image} className="cover-image" alt="Background" />
      <div className="cover-overlay" />
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

import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="loader-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'var(--color-primary)',
            zIndex: 9999
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    borderRadius: ["20%", "50%", "20%"]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity
                }}
                style={{
                    width: 60,
                    height: 60,
                    background: 'var(--color-accent)',
                    boxShadow: 'var(--shadow-gold)'
                }}
            />
        </div>
    );
};

export default Loader;

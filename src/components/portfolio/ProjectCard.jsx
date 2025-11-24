import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="project-card"
            whileHover={{ y: -10 }}
        >
            <div className="project-image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--border-radius)' }}>
                <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '20px',
                        color: 'white'
                    }}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '5px', fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px', color: 'var(--color-accent)' }}>
                            <MapPin size={16} />
                            <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.location}</span>
                        </div>
                        <a href={`#tour-${project.id}`} className="btn-text" style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            Explora el proyecto en 360° <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

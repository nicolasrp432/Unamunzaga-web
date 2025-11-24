import { ArrowRight, CheckCircle, Home as HomeIcon, Building, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContainerCover } from '../components/ui/ContainerCover';
import './Home.css';

const Home = () => {
    return (
        <div className="page home">
            <ContainerCover
                image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                title={<>Building New World <span className="text-accent">Construction</span></>}
            >
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                    Más de 20 años creando hogares y espacios únicos en Bilbao. Calidad, transparencia y profesionalidad en cada proyecto.
                </p>
                <div className="hero-buttons mt-8">
                    <Link to="/contacto" className="btn btn-primary">Solicitar Presupuesto</Link>
                    <Link to="/proyectos" className="btn btn-outline-white">Ver Proyectos</Link>
                </div>
            </ContainerCover>


            {/* Services Preview */}
            <section className="section services-preview">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Nuestros Servicios</h2>
                        <p className="section-subtitle">Soluciones integrales para cada necesidad</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="icon-box"><HomeIcon size={32} /></div>
                            <h3>Reformas de Viviendas</h3>
                            <p>Transformamos tu hogar con diseños funcionales y acabados de primera calidad. Cocinas, baños y reformas integrales.</p>
                            <Link to="/servicios" className="link-arrow">Saber más <ArrowRight size={16} /></Link>
                        </div>

                        <div className="service-card">
                            <div className="icon-box"><Building size={32} /></div>
                            <h3>Locales Comerciales</h3>
                            <p>Creamos espacios de negocio atractivos y funcionales que impulsan tu marca y mejoran la experiencia de tus clientes.</p>
                            <Link to="/servicios" className="link-arrow">Saber más <ArrowRight size={16} /></Link>
                        </div>

                        <div className="service-card">
                            <div className="icon-box"><Hammer size={32} /></div>
                            <h3>Fachadas y Comunidades</h3>
                            <p>Rehabilitación de edificios, fachadas y zonas comunes con las mejores técnicas y materiales del mercado.</p>
                            <Link to="/servicios" className="link-arrow">Saber más <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="section about-preview">
                <div className="container about-grid">
                    <div className="about-image">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" alt="Equipo trabajando" />
                        <div className="experience-badge">
                            <span className="years">20+</span>
                            <span className="text">Años de<br />Experiencia</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title text-left">Construyendo confianza desde el año 2000</h2>
                        <p>En Unamunzaga Obras, entendemos que una reforma es más que una obra; es la materialización de un sueño. Nuestro equipo de profesionales altamente cualificados trabaja con pasión y precisión para superar tus expectativas.</p>
                        <ul className="features-list">
                            <li><CheckCircle size={20} className="text-accent" /> Presupuestos transparentes y sin sorpresas</li>
                            <li><CheckCircle size={20} className="text-accent" /> Cumplimiento estricto de plazos</li>
                            <li><CheckCircle size={20} className="text-accent" /> Asesoramiento personalizado</li>
                        </ul>
                        <Link to="/nosotros" className="btn btn-primary">Conoce nuestra historia</Link>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container text-center">
                    <h2>¿Listo para comenzar tu proyecto?</h2>
                    <p>Cuéntanos tu idea y te ayudaremos a hacerla realidad.</p>
                    <Link to="/contacto" className="btn btn-primary btn-lg">Contactar Ahora</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

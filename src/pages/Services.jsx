import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DekorAIEmbed from '../components/integrations/DekorAIEmbed';
import './Services.css';

const Services = () => {
    const services = [
        {
            id: 'viviendas',
            title: 'Reformas Integrales de Viviendas',
            description: 'Convertimos tu casa en el hogar que siempre has soñado. Nos encargamos de todo el proceso, desde el diseño inicial hasta la entrega de llaves, garantizando acabados perfectos y una gestión sin preocupaciones.',
            features: [
                'Diseño y planificación de espacios',
                'Renovación completa de instalaciones (fontanería, electricidad)',
                'Carpintería a medida (armarios, puertas, suelos)',
                'Iluminación y domótica',
                'Gestión de licencias y permisos'
            ],
            image: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 'cocinas-banos',
            title: 'Cocinas y Baños',
            description: 'Espacios funcionales y estéticos donde el diseño se une a la practicidad. Trabajamos con las mejores marcas para ofrecerte durabilidad y estilo.',
            features: [
                'Diseño 3D previo',
                'Mobiliario de alta calidad',
                'Sanitarios y grifería de diseño',
                'Alicatados y solados modernos',
                'Optimización del espacio'
            ],
            image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 'locales',
            title: 'Locales Comerciales y Oficinas',
            description: 'Entendemos que tu local es tu carta de presentación. Creamos espacios que transmiten la identidad de tu marca y mejoran la productividad.',
            features: [
                'Adecuación a normativa vigente',
                'Diseño corporativo e imagen de marca',
                'Insonorización y acústica',
                'Climatización y ventilación',
                'Plazos ajustados para minimizar el cierre'
            ],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 'fachadas',
            title: 'Fachadas y Comunidades',
            description: 'Mantenimiento y rehabilitación de edificios para mejorar la eficiencia energética, la seguridad y la estética de tu comunidad.',
            features: [
                'Rehabilitación de fachadas (SATE, ventiladas)',
                'Impermeabilización de cubiertas y tejados',
                'Instalación de ascensores a cota cero',
                'Eliminación de barreras arquitectónicas',
                'Inspección Técnica de Edificios (ITE)'
            ],
            image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    return (
        <div className="page services-page">
            <section className="page-header">
                <div className="container">
                    <h1>Nuestros Servicios</h1>
                    <p>Soluciones profesionales para cada tipo de proyecto</p>
                </div>
            </section>

            <div className="container services-list">
                {services.map((service, index) => (
                    <section key={service.id} id={service.id} className={`service-section ${index % 2 !== 0 ? 'reverse' : ''}`}>
                        <div className="service-content">
                            <h2>{service.title}</h2>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}><Check size={18} className="text-accent" /> {feature}</li>
                                ))}
                            </ul>
                            <div className="buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <Link to="/contacto" className="btn btn-primary mt-md">Pedir Presupuesto</Link>
                                <Link to="/proyectos" className="btn btn-outline mt-md">Explora en 360°</Link>
                            </div>
                        </div>
                        <div className="service-image">
                            <img src={service.image} alt={service.title} loading="lazy" />
                        </div>
                    </section>
                ))}
            </div>

            <section className="cta-section">
                <div className="container text-center">
                    <h2>¿Tienes un proyecto en mente?</h2>
                    <p>Hablemos sobre cómo podemos ayudarte a realizarlo.</p>
                    <Link to="/contacto" className="btn btn-outline-white">Contactar con Unamunzaga</Link>
                </div>
            </section>
            
            {/* DekorAI IA Editor */}
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
        </div>
    );
};

export default Services;

import { AnimatedTestimonials } from '../components/ui/AnimatedTestimonials';
import { Link } from 'react-router-dom';
import './About.css';

const teamMembers = [
    {
        quote: "La arquitectura es el arte de organizar el espacio. Nuestro objetivo es crear lugares que inspiren y mejoren la vida de las personas.",
        name: "Elena García",
        title: "Arquitecta Principal",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        quote: "Cada proyecto es un nuevo reto. Me apasiona encontrar soluciones creativas y funcionales que superen las expectativas de nuestros clientes.",
        name: "Javier Rodríguez",
        title: "Diseñador de Interiores",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        quote: "La buena gestión de obra es la clave para cumplir plazos y presupuestos. Mi trabajo es asegurar que todo funcione como un reloj.",
        name: "Carlos Martínez",
        title: "Jefe de Obra",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
        quote: "La calidad está en los detalles. Me aseguro de que cada acabado sea perfecto y de que los materiales sean de la mejor calidad.",
        name: "Laura Fernández",
        title: "Supervisora de Calidad",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];

const About = () => {
    return (
        <div className="page about-page">
            <section className="page-header">
                <div className="container">
                    <h1>Sobre Nosotros</h1>
                    <p>Más de dos décadas construyendo confianza en Bilbao</p>
                </div>
            </section>

            <section className="section story-section">
                <div className="container story-grid">
                    <div className="story-content">
                        <h2>Nuestra Historia</h2>
                        <p>Fundada en el año 2000, Unamunzaga Obras nació con una misión clara: ofrecer servicios de reforma integral que combinen la excelencia técnica con un trato cercano y transparente.</p>
                        <p>A lo largo de estos más de 20 años, hemos crecido gracias a la confianza de nuestros clientes en Bilbao y alrededores. Lo que comenzó como una pequeña empresa familiar se ha convertido en un referente en el sector, manteniendo siempre nuestros valores fundacionales.</p>
                        <p>Nos enorgullece decir que gran parte de nuestro trabajo proviene de recomendaciones de clientes satisfechos, lo cual es nuestro mayor sello de calidad.</p>
                    </div>
                    <div className="story-image">
                        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" alt="Equipo trabajando en planos" />
                    </div>
                </div>
            </section>

            <section className="section team-section">
                <div className="container">
                    <h2 className="section-title text-center">Nuestro Equipo</h2>
                    <p className="text-center mb-lg" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Contamos con un equipo multidisciplinar de arquitectos, interioristas, jefes de obra y operarios especializados, listos para hacer realidad tu proyecto.
                    </p>
                    <AnimatedTestimonials items={teamMembers} />
                </div>
            </section>

            <section className="cta-section">
                <div className="container text-center">
                    <h2>¿Quieres conocernos mejor?</h2>
                    <p>Ven a visitarnos o contáctanos para hablar de tu proyecto.</p>
                    <Link to="/contacto" className="btn btn-outline-white">Contactar</Link>
                </div>
            </section>
        </div>
    );
};

export default About;

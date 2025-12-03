import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  Star,
  Briefcase,
  Heart,
  Shield,
  Target
} from 'lucide-react';
import teamData from '../data/team.json';
import './About.css';
import ClientTrust from '../components/sections/ClientTrust';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { mockTestimonials } from '../data/mockData';

const About = () => {
  const companyStats = [
    { number: '15+', label: 'Años de Experiencia', icon: Calendar },
    { number: '200+', label: 'Proyectos Completados', icon: Briefcase },
    { number: '50+', label: 'Clientes Satisfechos', icon: Users },
    { number: '10+', label: 'Premios y Reconocimientos', icon: Award }
  ];

  const companyValues = [
    {
      icon: Heart,
      title: 'Pasión por el Diseño',
      description: 'Amamos lo que hacemos y eso se refleja en cada proyecto que realizamos. Cada espacio es una obra de arte funcional.'
    },
    {
      icon: Shield,
      title: 'Calidad Garantizada',
      description: 'Utilizamos solo los mejores materiales y trabajamos con los profesionales más cualificados del sector.'
    },
    {
      icon: Target,
      title: 'Compromiso con el Cliente',
      description: 'Tu satisfacción es nuestra prioridad. Trabajamos contigo en cada paso para asegurarnos de que tu visión se haga realidad.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consulta Inicial',
      description: 'Nos reunimos contigo para entender tus necesidades, preferencias y presupuesto.'
    },
    {
      step: '02',
      title: 'Diseño y Planificación',
      description: 'Creamos un diseño personalizado que maximice el potencial de tu espacio.'
    },
    {
      step: '03',
      title: 'Ejecución del Proyecto',
      description: 'Nuestro equipo de profesionales lleva a cabo la obra con la máxima calidad y eficiencia.'
    },
    {
      step: '04',
      title: 'Entrega y Seguimiento',
      description: 'Entregamos tu proyecto terminado y nos aseguramos de que estés completamente satisfecho.'
    }
  ];

  const clientLogos = [
    '/creen/imgi_10_estudios-9.png',
    '/creen/imgi_11_estudios-8 (1).png',
    '/creen/imgi_11_estudios-8.png',
    '/creen/imgi_12_estudios-7.png',
    '/creen/imgi_13_estudios-6.png',
    '/creen/imgi_14_estudios-5.png',
    '/creen/imgi_15_estudios-4.png',
    '/creen/imgi_16_estudios-2.png',
    '/creen/imgi_17_estudios-1.png',
  ];

  return (
    <>
      <ModernNavbar />
      <div className="page about-page">
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="font-inter">Sobre Nosotros</h1>
            <p>Transformamos espacios en Bilbao y Bizkaia con calidad, diseño y cumplimiento.</p>
            <div className="hero-badges">
              <span className="badge"><Star size={16} /> +10.000 proyectos</span>
              <span className="badge"><Users size={16} /> Equipo propio especializado</span>
              <span className="badge"><Shield size={16} /> Garantía y seguridad</span>
            </div>
            <div className="hero-actions">
              <Link to="/contacto" className="btn hero-btn-primary">
                <Phone size={18} /> Solicitar consulta
              </Link>
              <div className="hero-contact-inline">
                <div className="contact-item"><Phone size={16} /><span>+34 944 07 84 27</span></div>
                <div className="contact-item"><Phone size={16} /><span>+34 674 27 44 66</span></div>
                <div className="contact-item"><Phone size={16} /><span>+34 629 11 65 15</span></div>
                <div className="contact-item"><Mail size={16} /><span>contacto@unamunzagaobras.com</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="company-stats">
        <div className="container">
          <div className="stats-grid">
            {companyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <Icon size={32} />
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Nuestra Historia</h2>
              <p>
                Fundada en 2009 en Bilbao, Unamunzaga nació de la pasión por transformar espacios y crear ambientes 
                que inspiren y mejoren la calidad de vida de las personas. A lo largo de más de 15 años, hemos 
                convertido cientos de hogares y locales en espacios funcionales, modernos y acogedores.
              </p>
              <p>
                Nuestro equipo de profesionales altamente cualificados combina experiencia, innovación y atención 
                al detalle para ofrecer soluciones personalizadas que superan las expectativas de nuestros clientes.
              </p>
              <div className="story-highlights">
                <div className="highlight-item">
                  <CheckCircle size={20} className="highlight-icon" />
                  <span>Más de 15 años de experiencia en el sector</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} className="highlight-icon" />
                  <span>Especialistas en reformas integrales y parciales</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} className="highlight-icon" />
                  <span>Compromiso con la calidad y el plazo de entrega</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} className="highlight-icon" />
                  <span>Atención personalizada en cada proyecto</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img 
                src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20construction%20team%20working%20together%20on%20a%20modern%20reform%20project%2C%20wearing%20safety%20equipment%2C%20high%20quality%20lighting%2C%20architectural%20setting&image_size=landscape_16_9" 
                alt="Equipo de profesionales de Unamunzaga trabajando"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="company-values">
        <div className="container">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="values-grid">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <Icon size={48} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="our-process">
        <div className="container">
          <h2 className="section-title">Nuestro Proceso de Trabajo</h2>
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <p className="section-subtitle">
            Conoce a los profesionales que hacen posible cada proyecto
          </p>
          <div className="team-grid">
            {teamData.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                  />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.position}</p>
                  <p className="team-experience">{member.experience}</p>
                  {(() => {
                    const specialties = Array.isArray(member.specialties)
                      ? member.specialties.slice(0, 3)
                      : (member.specialization
                          ? member.specialization.split(/,\s*|\s+y\s+/).slice(0, 3)
                          : []);
                    return specialties.length > 0 ? (
                      <div className="team-specialties">
                        {specialties.map((specialty, index) => (
                          <span key={index} className="specialty-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    ) : null;
                  })()}
                  {member.description && (
                    <p className="team-bio">{member.description}</p>
                  )}
                  <div className="team-contact">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="contact-link">
                        <Phone size={16} />
                      </a>
                    )}
                    {member?.social?.email && (
                      <a href={`mailto:${member.social.email}`} className="contact-link">
                        <Mail size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={mockTestimonials} />

      {/* Certifications and Awards */}
      <section className="certifications">
        <div className="container">
          <h2 className="section-title">Certificaciones y Reconocimientos</h2>
          <div className="certifications-grid">
            <div className="cert-item">
              <Star size={32} className="cert-icon" />
              <h3>Certificación ISO 9001</h3>
              <p>Sistema de gestión de calidad certificado</p>
            </div>
            <div className="cert-item">
              <Award size={32} className="cert-icon" />
              <h3>Mejor Empresa de Reformas 2022</h3>
              <p>Premio otorgado por la Cámara de Comercio de Bizkaia</p>
            </div>
            <div className="cert-item">
              <Shield size={32} className="cert-icon" />
              <h3>Seguridad en el Trabajo</h3>
              <p>Certificados en prevención de riesgos laborales</p>
            </div>
          </div>
        </div>
      </section>

      <ClientTrust images={clientLogos} />

      {/* Contact CTA */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para transformar tu espacio?</h2>
            <p>
              Contáctanos hoy mismo para una consulta gratuita. Estamos aquí para ayudarte a hacer realidad 
              el hogar o negocio de tus sueños.
            </p>
            <div className="cta-buttons">
              <Link to="/contacto" className="btn btn-primary btn-lg">
                <Phone size={20} />
                Solicitar Consulta
              </Link>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+34 944 07 84 27</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>contacto@unamunzagaobras.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>Bilbao, Bizkaia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <ModernFooter />
    </>
  );
};

export default About;

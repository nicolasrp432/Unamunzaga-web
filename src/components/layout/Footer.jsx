import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h3 className="footer-logo">UNAMUNZAGA <span className="logo-accent">OBRAS</span></h3>
                    <p>Reformas integrales en Bilbao con más de 20 años de experiencia. Calidad, transparencia y cercanía para crear el hogar de tus sueños.</p>
                    <div className="social-links">
                        <a href="https://www.facebook.com/UnamunzagaObras" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        <a href="https://www.instagram.com/UnamunzagaObras/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                        {/* Twitter icon is not directly available in lucide-react as 'Twitter', usually X or Twitter. Using generic link for now if needed or just these two as requested. */}
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/proyectos">Proyectos</Link></li>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contacto</h4>
                    <ul className="contact-list">
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <div className="contact-details">
                                <span>+34 944 07 84 27</span>
                                <span>+34 674 27 44 66</span>
                            </div>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>contacto@unamunzagaobras.com</span>
                        </li>
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>C/ Hurtado de Amézaga 27, planta 12, dep. 1, Bilbao – 48008</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Unamunzaga Obras. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;

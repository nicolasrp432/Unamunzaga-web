import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    UNAMUNZAGA <span className="logo-accent">OBRAS</span>
                </Link>

                <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </div>

                <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
                    <Link to="/servicios" onClick={() => setIsOpen(false)}>Servicios</Link>
                    <Link to="/proyectos" onClick={() => setIsOpen(false)}>Proyectos</Link>
                    <Link to="/nosotros" onClick={() => setIsOpen(false)}>Nosotros</Link>
                    <Link to="/contacto" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                        Contacto
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;

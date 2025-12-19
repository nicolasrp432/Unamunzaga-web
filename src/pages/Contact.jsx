import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Contact.css';

import { useSiteSettings } from '../hooks/useSiteSettings';
import { Loader2 } from 'lucide-react';
import FAQSection from '../components/sections/FAQSection';

const Contact = () => {
    const { settings, loading: settingsLoading } = useSiteSettings();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        // ... previous submit logic
        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.service,
                    message: formData.message,
                    status: 'unread'
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    if (settingsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
            </div>
        );
    }

    return (
        <>
            <ModernNavbar />
            <div className="page contact-page">
                <section className="page-header">
                    <div className="container">
                        <h1>Contacta con Nosotros</h1>
                        <p>Estamos aquí para responder a tus preguntas y hacer realidad tu proyecto</p>
                    </div>
                </section>

                <section className="contact-section" id="contact-info">
                    <div className="container contact-grid">
                        <div className="contact-info-wrapper" id="horario">
                            <h2 className="contact-info-title">Información de Contacto</h2>
                            <p className="contact-info-subtitle">Visítanos en nuestras oficinas o llámanos para concertar una cita.</p>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="info-card-icon">
                                        <Phone size={24} />
                                    </div>
                                    <div className="info-card-content">
                                        <h3>Teléfonos</h3>
                                        {settings?.phone_primary && (
                                            <a href={`tel:${settings.phone_primary.replace(/\s/g, '')}`} className="info-link">
                                                {settings.phone_primary}
                                            </a>
                                        )}
                                        {settings?.phone_mobile && (
                                            <a href={`tel:${settings.phone_mobile.replace(/\s/g, '')}`} className="info-link">
                                                {settings.phone_mobile}
                                            </a>
                                        )}
                                        {settings?.phone_secondary && (
                                            <a href={`tel:${settings.phone_secondary.replace(/\s/g, '')}`} className="info-link">
                                                {settings.phone_secondary}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-card-icon">
                                        <Mail size={24} />
                                    </div>
                                    <div className="info-card-content">
                                        <h3>Email</h3>
                                        <a href={`mailto:${settings?.email_contact}`} className="info-link">
                                            {settings?.email_contact}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-card-icon">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="info-card-content">
                                        <h3>Dirección</h3>
                                        <p>{settings?.address_street}</p>
                                        <p>{settings?.address_zip} {settings?.address_city}, {settings?.address_province}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container" id="formulario">
                            <h2>Envíanos un Mensaje</h2>
                            <p className="form-description">Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre Completo *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Teléfono</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+34 600 000 000"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="service">Tipo de Reforma *</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="vivienda">Reforma de Vivienda</option>
                                            <option value="cocina-bano">Cocina o Baño</option>
                                            <option value="local">Local Comercial / Oficina</option>
                                            <option value="fachada">Fachada / Comunidad</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Mensaje *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Cuéntanos brevemente tu proyecto..."
                                        rows="5"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <span className="spinner"></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar Mensaje
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <div className="message-box success-message">
                                        <CheckCircle size={20} />
                                        <span>¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.</span>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="message-box error-message">
                                        <AlertCircle size={20} />
                                        <span>Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>

                <FAQSection />

                <section className="map-section" id="mapa">
                    <div className="container">
                        <h2 className="map-title">Encuéntranos</h2>
                        <div className="map-container">
                            <iframe
                                src={settings?.google_maps_embed_url || "https://maps.google.com/maps?q=Unamunzaga%20Obras%2C%20Hurtado%20de%20Am%C3%A9zaga%2027%2C%20Bilbao&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Unamunzaga Obras"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
            <ModernFooter />
        </>
    );
};

export default Contact;

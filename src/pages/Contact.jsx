import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Contact.css';

const Contact = () => {
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

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    status: 'new'
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            // Optional: Reset status after delay
        }
    };

    return (
        <div className="page contact-page">
            <section className="page-header">
                <div className="container">
                    <h1>Contacta con Nosotros</h1>
                    <p>Estamos aquí para responder a tus preguntas y hacer realidad tu proyecto</p>
                </div>
            </section>

            <section className="section contact-section">
                <div className="container contact-grid">
                    <div className="contact-info">
                        <h2>Información de Contacto</h2>
                        <p className="mb-md">Visítanos en nuestras oficinas o llámanos para concertar una cita.</p>

                        <div className="info-item">
                            <div className="icon-box-sm"><Phone size={20} /></div>
                            <div>
                                <h3>Teléfono</h3>
                                <p>+34 944 000 000</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box-sm"><Mail size={20} /></div>
                            <div>
                                <h3>Email</h3>
                                <p>info@unamunzagaobras.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box-sm"><MapPin size={20} /></div>
                            <div>
                                <h3>Dirección</h3>
                                <p>Calle Principal 123, 48001 Bilbao, Bizkaia</p>
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46485.67912367683!2d-2.9636976685424805!3d43.263012599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e4e27664b89b9%3A0x653456329637000!2sBilbao%2C%20Biscay!5e0!3m2!1sen!2ses!4v1716543210987!5m2!1sen!2ses"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <h2>Envíanos un Mensaje</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre Completo</label>
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
                                <label htmlFor="email">Email</label>
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
                                <label htmlFor="service">Tipo de Reforma</label>
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

                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
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

                            <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'} <Send size={18} style={{ marginLeft: '8px' }} />
                            </button>

                            {status === 'success' && (
                                <div className="success-message">
                                    ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="error-message">
                                    Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

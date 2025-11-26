import { ModernNavbar } from '../components/layout/ModernNavbar';
import ModernFooter from '../components/layout/ModernFooter';
import { useState } from 'react';
import { Briefcase, Mail, Phone, User, FileText, Send, MapPin, Users, Clock, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './BolsaEmpleo.css';

const BolsaEmpleo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        skills: '',
        message: '',
        cv_file: null
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, cv_file: file });
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            let cv_url = null;

            // Upload CV file if provided
            if (formData.cv_file) {
                const fileName = `cv_${Date.now()}_${formData.cv_file.name}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('cvs')
                    .upload(fileName, formData.cv_file);

                if (uploadError) throw uploadError;
                
                const { data: { publicUrl } } = supabase.storage
                    .from('cvs')
                    .getPublicUrl(fileName);
                
                cv_url = publicUrl;
            }

            // Insert job application data
            const { error } = await supabase
                .from('job_applications')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    position: formData.position,
                    experience: formData.experience,
                    education: formData.education,
                    skills: formData.skills,
                    message: formData.message,
                    cv_url: cv_url,
                    status: 'new'
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                education: '',
                skills: '',
                message: '',
                cv_file: null
            });
            setFileName('');
        } catch (error) {
            console.error('Error submitting job application:', error);
            setStatus('error');
        }
    };

    const jobPositions = [
        {
            title: 'Oficial de Albañilería',
            description: 'Buscamos oficial experimentado en albañilería para reformas integrales.',
            requirements: ['Mínimo 3 años de experiencia', 'Carnet de conducir', 'Disponibilidad inmediata'],
            type: 'Tiempo completo'
        },
        {
            title: 'Ayudante de Albañil',
            description: 'Persona joven con ganas de aprender el oficio de la albañilería.',
            requirements: ['No se requiere experiencia', 'Buena actitud de trabajo', 'Disponibilidad de horario'],
            type: 'Tiempo completo / Medio tiempo'
        },
        {
            title: 'Oficial de Fontanería',
            description: 'Profesional autónomo para colaboraciones en proyectos de reforma.',
            requirements: ['Certificaciones en fontanería', 'Experiencia en reformas', 'Material propio'],
            type: 'Autónomo / Colaboración'
        },
        {
            title: 'Oficial de Electricidad',
            description: 'Electricista con experiencia en instalaciones y reformas.',
            requirements: ['Certificado de instalador', 'Experiencia demostrable', 'Carnet de conducir'],
            type: 'Autónomo / Colaboración'
        }
    ];

    return (
        <>
            <ModernNavbar />
            <div className="page bolsa-empleo-page">
            <section className="page-header">
                <div className="container">
                    <h1>Bolsa de Empleo</h1>
                    <p>Únete a nuestro equipo de profesionales en el sector de la construcción y reformas</p>
                </div>
            </section>

            <section className="section job-positions-section">
                <div className="container">
                    <h2 className="section-title">Posiciones Disponibles</h2>
                    <p className="section-subtitle">Estamos buscando profesionales comprometidos para unirse a nuestro equipo</p>
                    
                    <div className="job-grid">
                        {jobPositions.map((job, index) => (
                            <div key={index} className="job-card">
                                <div className="job-header">
                                    <Briefcase className="job-icon" />
                                    <div>
                                        <h3>{job.title}</h3>
                                        <span className="job-type">{job.type}</span>
                                    </div>
                                </div>
                                <p className="job-description">{job.description}</p>
                                <div className="job-requirements">
                                    <h4>Requisitos:</h4>
                                    <ul>
                                        {job.requirements.map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section application-form-section">
                <div className="container form-grid">
                    <div className="company-info">
                        <h2>¿Por qué trabajar con nosotros?</h2>
                        <p className="mb-md">En Unamunzaga Obras valoramos a nuestros empleados y ofrecemos un ambiente de trabajo profesional y en constante crecimiento.</p>

                        <div className="info-item">
                            <div className="icon-box-sm"><Award size={20} /></div>
                            <div>
                                <h3>Proyectos Estables</h3>
                                <p>Trabajamos con importantes clientes y proyectos de reforma integral</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box-sm"><Users size={20} /></div>
                            <div>
                                <h3>Equipo Profesional</h3>
                                <p>Trabaja junto a profesionales experimentados del sector</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box-sm"><Clock size={20} /></div>
                            <div>
                                <h3>Horario Flexible</h3>
                                <p>Ofrecemos flexibilidad horaria y buen ambiente laboral</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box-sm"><MapPin size={20} /></div>
                            <div>
                                <h3>Ubicación</h3>
                                <p>Calle Principal 123, 48001 Bilbao, Bizkaia</p>
                            </div>
                        </div>
                    </div>

                    <div className="application-form-container">
                        <h2>Envía tu Solicitud</h2>
                        <form onSubmit={handleSubmit} className="application-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
                                />
                            </div>

                            <div className="form-row">
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
                                        required
                                        placeholder="+34 600 000 000"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="position">Puesto al que aspira</label>
                                <select
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="oficial-albanileria">Oficial de Albañilería</option>
                                    <option value="ayudante-albanil">Ayudante de Albañil</option>
                                    <option value="oficial-fontaneria">Oficial de Fontanería</option>
                                    <option value="oficial-electricidad">Oficial de Electricidad</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="experience">Experiencia Laboral</label>
                                <textarea
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                    placeholder="Describe tu experiencia laboral relevante..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="education">Formación Académica</label>
                                <input
                                    type="text"
                                    id="education"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="Tus estudios y formación relacionada"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="skills">Habilidades y Competencias</label>
                                <textarea
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="Menciona tus habilidades técnicas y personales..."
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Carta de Presentación</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Cuéntanos por qué te gustaría trabajar con nosotros..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="cv_file">Curriculum Vitae (PDF)</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        id="cv_file"
                                        name="cv_file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    <label htmlFor="cv_file" className="file-upload-label">
                                        <FileText size={20} />
                                        <span>{fileName || 'Seleccionar archivo...'}</span>
                                    </label>
                                </div>
                                <small className="form-text">Formatos aceptados: PDF, DOC, DOCX (máx. 5MB)</small>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'} <Send size={18} style={{ marginLeft: '8px' }} />
                            </button>

                            {status === 'success' && (
                                <div className="success-message">
                                    ¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="error-message">
                                    Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
        <ModernFooter />
        </>
    );
};

export default BolsaEmpleo;

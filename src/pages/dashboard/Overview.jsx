import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const Overview = () => {
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!user) return;

            try {
                // Fetch project associated with user
                const { data: projectData, error: projectError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('client_id', user.id)
                    .single();

                if (projectError && projectError.code !== 'PGRST116') throw projectError;

                if (projectData) {
                    setProject(projectData);

                    // Fetch updates for the project
                    const { data: updatesData, error: updatesError } = await supabase
                        .from('project_updates')
                        .select('*')
                        .eq('project_id', projectData.id)
                        .order('date', { ascending: false });

                    if (updatesError) throw updatesError;
                    setUpdates(updatesData);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [user]);

    if (loading) return <div>Cargando datos del proyecto...</div>;

    if (!project) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Bienvenido, {user?.email}</h1>
                </div>
                <div className="empty-state">
                    <p>No tienes ningún proyecto activo asignado actualmente.</p>
                    <p>Si crees que es un error, contacta con nosotros.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>{project.title}</h1>
                <p className="text-muted">Estado: <span className="status-badge">{project.status}</span></p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Inicio</h3>
                    <div className="value">{project.start_date || 'Pendiente'}</div>
                </div>
                <div className="stat-card">
                    <h3>Fin Estimado</h3>
                    <div className="value">{project.end_date || 'Pendiente'}</div>
                </div>
                <div className="stat-card">
                    <h3>Progreso</h3>
                    <div className="value">35%</div> {/* Mocked for now */}
                </div>
            </div>

            <div className="timeline-section">
                <h2>Avance de Obra</h2>
                <div className="timeline">
                    {updates.length > 0 ? (
                        updates.map((update) => (
                            <div key={update.id} className="timeline-item completed">
                                <div className="timeline-dot"></div>
                                <div className="timeline-date">{update.date}</div>
                                <div className="timeline-content">
                                    <h4>{update.title}</h4>
                                    <p>{update.description}</p>
                                    {update.image_url && (
                                        <img src={update.image_url} alt="Update" className="update-image" style={{ marginTop: '10px', borderRadius: '4px', maxWidth: '100%' }} />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay actualizaciones recientes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;

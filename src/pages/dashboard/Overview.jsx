import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Users, Briefcase, MessageSquare, Image, Activity } from 'lucide-react';

const Overview = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        team: 0,
        services: 0,
        testimonials: 0,
        projects: 0
    });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoading(true);

            try {
                // Fetch counts (parallel)
                const [
                    { count: teamCount },
                    { count: servicesCount },
                    { count: testimonialsCount },
                    { count: projectsCount }
                ] = await Promise.all([
                    supabase.from('team_members').select('*', { count: 'exact', head: true }),
                    supabase.from('services').select('*', { count: 'exact', head: true }),
                    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                    supabase.from('featured_projects').select('*', { count: 'exact', head: true })
                ]);

                setStats({
                    team: teamCount || 0,
                    services: servicesCount || 0,
                    testimonials: testimonialsCount || 0,
                    projects: projectsCount || 0
                });

                // Fetch recent activity
                const { data: activityData } = await supabase
                    .from('activity_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setActivities(activityData || []);

            } catch (error) {
                console.error('Error fetching admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando estadísticas...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
                <p className="text-gray-500">Bienvenido, {user?.user_metadata?.full_name || user?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.team}</div>
                        <div className="text-sm text-gray-500">Miembros del Equipo</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.services}</div>
                        <div className="text-sm text-gray-500">Servicios Activos</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.testimonials}</div>
                        <div className="text-sm text-gray-500">Testimonios</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                        <Image size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.projects}</div>
                        <div className="text-sm text-gray-500">Proyectos Destacados</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Activity size={20} /> Actividad Reciente
                </h2>
                <div className="space-y-4">
                    {activities.length > 0 ? (
                        activities.map((log) => (
                            <div key={log.id} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="text-xs font-mono text-gray-400 mt-1 whitespace-nowrap">
                                    {new Date(log.created_at).toLocaleString()}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {log.action} - {log.entity_type}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate max-w-md">
                                        {JSON.stringify(log.details)}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No hay actividad reciente registrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;

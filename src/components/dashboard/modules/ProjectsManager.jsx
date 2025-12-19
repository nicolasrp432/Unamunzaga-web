import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logActivity } from '../../../lib/activityLogger';
import { Plus, Edit, Trash2, Save, X, Loader2, Briefcase, Star, Image as ImageIcon } from 'lucide-react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProjects();

        const channel = supabase
            .channel('projects-manager-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'projects' },
                () => fetchProjects()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: true }); // Temporarily using created_at
            
            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            // Ensure images is an array
            let images = formData.images;
            if (typeof images === 'string') {
                images = images.split(',').map(s => s.trim()).filter(s => s);
            }

            const dataToSave = {
                ...formData,
                images: images || []
            };

            if (editingId === 'new') {
                const { data, error } = await supabase.from('projects').insert([dataToSave]).select();
                if (error) throw error;
                await logActivity('CREATE', 'project', data[0].id, dataToSave);
            } else {
                const { error } = await supabase
                    .from('projects')
                    .update(dataToSave)
                    .eq('id', editingId);
                if (error) throw error;
                await logActivity('UPDATE', 'project', editingId, dataToSave);
            }
            setEditingId(null);
            setFormData({});
            fetchProjects(); // Should be handled by realtime, but good for immediate feedback
        } catch (error) {
            alert('Error saving project: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este proyecto?')) return;
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            await logActivity('DELETE', 'project', id);
            // Realtime will update list
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    const toggleFeatured = async (project) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({ is_featured: !project.is_featured })
                .eq('id', project.id);
            if (error) throw error;
            await logActivity('UPDATE', 'project', project.id, { is_featured: !project.is_featured });
        } catch (error) {
            console.error('Error toggling featured:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Briefcase size={20} /> Gestión de Proyectos
                </h3>
                <button 
                    onClick={() => { setEditingId('new'); setFormData({ is_featured: false, display_order: projects.length + 1 }); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm"
                >
                    <Plus size={16} /> Añadir Proyecto
                </button>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-900" /></div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Título / Categoría</th>
                                <th className="px-6 py-3">Descripción</th>
                                <th className="px-6 py-3">Detalles</th>
                                <th className="px-6 py-3">Imágenes (URLs)</th>
                                <th className="px-6 py-3 text-center">Destacado</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {editingId === 'new' && (
                                <tr className="bg-blue-50">
                                    <td className="px-6 py-4 align-top">
                                        <input 
                                            placeholder="Título"
                                            className="w-full p-2 border rounded mb-2"
                                            value={formData.title || ''}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                        />
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={formData.category || ''}
                                            onChange={e => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="">Categoría...</option>
                                            <option value="Reformas Integrales">Reformas Integrales</option>
                                            <option value="Cocinas">Cocinas</option>
                                            <option value="Baños">Baños</option>
                                            <option value="Locales Comerciales">Locales Comerciales</option>
                                            <option value="Obra Nueva">Obra Nueva</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <textarea 
                                            placeholder="Descripción"
                                            className="w-full p-2 border rounded"
                                            rows={3}
                                            value={formData.description || ''}
                                            onChange={e => setFormData({...formData, description: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4 align-top space-y-2">
                                        <input 
                                            placeholder="Año"
                                            className="w-full p-2 border rounded"
                                            value={formData.year || ''}
                                            onChange={e => setFormData({...formData, year: e.target.value})}
                                        />
                                        <input 
                                            placeholder="Ubicación"
                                            className="w-full p-2 border rounded"
                                            value={formData.location || ''}
                                            onChange={e => setFormData({...formData, location: e.target.value})}
                                        />
                                        <input 
                                            placeholder="Duración"
                                            className="w-full p-2 border rounded"
                                            value={formData.duration || ''}
                                            onChange={e => setFormData({...formData, duration: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <textarea 
                                            placeholder="URLs separadas por coma"
                                            className="w-full p-2 border rounded"
                                            rows={3}
                                            value={Array.isArray(formData.images) ? formData.images.join(',\n') : (formData.images || '')}
                                            onChange={e => setFormData({...formData, images: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center align-top">
                                        <input 
                                            type="checkbox"
                                            checked={formData.is_featured || false}
                                            onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                                            className="w-5 h-5 text-blue-600 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={handleSave} className="p-2 bg-blue-900 text-white rounded"><Save size={16} /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-white border rounded"><X size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {projects.map(project => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    {editingId === project.id ? (
                                        <>
                                            <td className="px-6 py-4 align-top">
                                                <input 
                                                    className="w-full p-2 border rounded mb-2"
                                                    value={formData.title || ''}
                                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                                />
                                                <select
                                                    className="w-full p-2 border rounded"
                                                    value={formData.category || ''}
                                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                                >
                                                    <option value="">Categoría...</option>
                                                    <option value="Reformas Integrales">Reformas Integrales</option>
                                                    <option value="Cocinas">Cocinas</option>
                                                    <option value="Baños">Baños</option>
                                                    <option value="Locales Comerciales">Locales Comerciales</option>
                                                    <option value="Obra Nueva">Obra Nueva</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <textarea 
                                                    className="w-full p-2 border rounded"
                                                    rows={3}
                                                    value={formData.description || ''}
                                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4 align-top space-y-2">
                                                <input 
                                                    placeholder="Año"
                                                    className="w-full p-2 border rounded"
                                                    value={formData.year || ''}
                                                    onChange={e => setFormData({...formData, year: e.target.value})}
                                                />
                                                <input 
                                                    placeholder="Ubicación"
                                                    className="w-full p-2 border rounded"
                                                    value={formData.location || ''}
                                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                                />
                                                <input 
                                                    placeholder="Duración"
                                                    className="w-full p-2 border rounded"
                                                    value={formData.duration || ''}
                                                    onChange={e => setFormData({...formData, duration: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <textarea 
                                                    className="w-full p-2 border rounded"
                                                    rows={3}
                                                    value={Array.isArray(formData.images) ? formData.images.join(',\n') : (formData.images || '')}
                                                    onChange={e => setFormData({...formData, images: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center align-top">
                                                <input 
                                                    type="checkbox"
                                                    checked={formData.is_featured || false}
                                                    onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                                                    className="w-5 h-5 text-blue-600 rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right align-top whitespace-nowrap">
                                                <button onClick={handleSave} className="text-green-600 p-1 mr-2"><Save size={18} /></button>
                                                <button onClick={() => setEditingId(null)} className="text-gray-500 p-1"><X size={18} /></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 align-top">
                                                <div className="font-bold text-gray-900">{project.title}</div>
                                                <div className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded mt-1">{project.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm align-top line-clamp-3">
                                                {project.description}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs align-top space-y-1">
                                                <div>📅 {project.year}</div>
                                                <div>📍 {project.location}</div>
                                                <div>⏱️ {project.duration}</div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                {project.images && project.images.length > 0 ? (
                                                    <div className="flex -space-x-2 overflow-hidden">
                                                        {project.images.slice(0, 3).map((img, i) => (
                                                            <img 
                                                                key={i} 
                                                                src={img} 
                                                                alt="Project" 
                                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                                                            />
                                                        ))}
                                                        {project.images.length > 3 && (
                                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs ring-2 ring-white">
                                                                +{project.images.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Sin imágenes</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center align-top">
                                                <button 
                                                    onClick={() => toggleFeatured(project)}
                                                    className={`p-1 rounded-full transition-colors ${project.is_featured ? 'text-amber-400 bg-amber-50' : 'text-gray-300 hover:text-amber-300'}`}
                                                >
                                                    <Star size={20} fill={project.is_featured ? "currentColor" : "none"} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                                                <button 
                                                    onClick={() => { setEditingId(project.id); setFormData(project); }}
                                                    className="text-blue-600 hover:bg-blue-50 p-2 rounded mr-1"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(project.id)}
                                                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;

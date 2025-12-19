import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logActivity } from '../../../lib/activityLogger';
import { Plus, Edit, Trash2, Save, X, Loader2, Briefcase } from 'lucide-react';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchServices();

        const channel = supabase
            .channel('services-manager-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'services' },
                () => fetchServices()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true }); // Temporarily using created_at
            
            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingId === 'new') {
                const { data, error } = await supabase.from('services').insert([formData]).select();
                if (error) throw error;
                await logActivity('CREATE', 'service', data[0].id, formData);
            } else {
                const { error } = await supabase
                    .from('services')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                await logActivity('UPDATE', 'service', editingId, formData);
            }
            setEditingId(null);
            setFormData({});
            fetchServices();
        } catch (error) {
            alert('Error saving service: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este servicio?')) return;
        try {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;
            await logActivity('DELETE', 'service', id);
            fetchServices();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Briefcase size={20} /> Gestión de Servicios
                </h3>
                <button 
                    onClick={() => { setEditingId('new'); setFormData({}); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm"
                >
                    <Plus size={16} /> Añadir Servicio
                </button>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-900" /></div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Título</th>
                                <th className="px-6 py-3">Descripción Corta</th>
                                <th className="px-6 py-3">Precio</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {editingId === 'new' && (
                                <tr className="bg-blue-50">
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Título"
                                            className="w-full p-2 border rounded"
                                            value={formData.title || ''}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Descripción Corta"
                                            className="w-full p-2 border rounded"
                                            value={formData.short_description || ''}
                                            onChange={e => setFormData({...formData, short_description: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Precio"
                                            className="w-full p-2 border rounded"
                                            value={formData.price_range || ''}
                                            onChange={e => setFormData({...formData, price_range: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={handleSave} className="p-2 bg-blue-900 text-white rounded"><Save size={16} /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-white border rounded"><X size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {services.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    {editingId === service.id ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <input 
                                                    className="w-full p-2 border rounded"
                                                    value={formData.title || ''}
                                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <textarea 
                                                    className="w-full p-2 border rounded"
                                                    rows={2}
                                                    value={formData.short_description || ''}
                                                    onChange={e => setFormData({...formData, short_description: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    className="w-full p-2 border rounded"
                                                    value={formData.price_range || ''}
                                                    onChange={e => setFormData({...formData, price_range: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button onClick={handleSave} className="text-green-600 p-1 mr-2"><Save size={18} /></button>
                                                <button onClick={() => setEditingId(null)} className="text-gray-500 p-1"><X size={18} /></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                            <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{service.short_description}</td>
                                            <td className="px-6 py-4 text-gray-500">{service.price_range}</td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button 
                                                    onClick={() => { setEditingId(service.id); setFormData(service); }}
                                                    className="text-blue-600 hover:bg-blue-50 p-2 rounded mr-1"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(service.id)}
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

export default ServicesManager;

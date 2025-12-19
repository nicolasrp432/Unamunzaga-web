import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logActivity } from '../../../lib/activityLogger';
import { Plus, Edit, Trash2, Save, X, Loader2, User } from 'lucide-react';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchTeam();

        const channel = supabase
            .channel('team-manager-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'team_members' },
                () => fetchTeam()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('created_at', { ascending: true }); // Temporarily using created_at
            
            if (error) throw error;
            setTeam(data || []);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingId === 'new') {
                const { data, error } = await supabase.from('team_members').insert([formData]).select();
                if (error) throw error;
                await logActivity('CREATE', 'team_member', data[0].id, formData);
            } else {
                const { error } = await supabase
                    .from('team_members')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                await logActivity('UPDATE', 'team_member', editingId, formData);
            }
            setEditingId(null);
            setFormData({});
            fetchTeam();
        } catch (error) {
            alert('Error saving team member: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este miembro del equipo?')) return;
        try {
            const { error } = await supabase.from('team_members').delete().eq('id', id);
            if (error) throw error;
            await logActivity('DELETE', 'team_member', id);
            fetchTeam();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <User size={20} /> Gestión del Equipo
                </h3>
                <button 
                    onClick={() => { setEditingId('new'); setFormData({}); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm"
                >
                    <Plus size={16} /> Añadir Miembro
                </button>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-900" /></div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">Rol</th>
                                <th className="px-6 py-3">Email/Teléfono</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {editingId === 'new' && (
                                <tr className="bg-blue-50">
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Nombre Completo"
                                            className="w-full p-2 border rounded"
                                            value={formData.full_name || ''}
                                            onChange={e => setFormData({...formData, full_name: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Cargo/Rol"
                                            className="w-full p-2 border rounded"
                                            value={formData.role || ''}
                                            onChange={e => setFormData({...formData, role: e.target.value})}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input 
                                            placeholder="Email"
                                            className="w-full p-2 border rounded mb-2"
                                            value={formData.email || ''}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
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
                            {team.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    {editingId === member.id ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <input 
                                                    className="w-full p-2 border rounded"
                                                    value={formData.full_name || ''}
                                                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    className="w-full p-2 border rounded"
                                                    value={formData.role || ''}
                                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    className="w-full p-2 border rounded"
                                                    value={formData.email || ''}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button onClick={handleSave} className="text-green-600 p-1 mr-2"><Save size={18} /></button>
                                                <button onClick={() => setEditingId(null)} className="text-gray-500 p-1"><X size={18} /></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 font-medium text-gray-900">{member.full_name}</td>
                                            <td className="px-6 py-4 text-gray-600">{member.role}</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                <div>{member.email}</div>
                                                <div className="text-xs">{member.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button 
                                                    onClick={() => { setEditingId(member.id); setFormData(member); }}
                                                    className="text-blue-600 hover:bg-blue-50 p-2 rounded mr-1"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(member.id)}
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

export default TeamManager;

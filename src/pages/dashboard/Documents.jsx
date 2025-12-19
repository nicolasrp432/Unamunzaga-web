import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { FileText, Download } from 'lucide-react';

const Documents = () => {
    const { user } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!user) return;
            
            // Skip fetch for guest admin to avoid 400 error (UUID mismatch)
            if (user.id === 'guest-admin') {
                setLoading(false);
                return;
            }

            try {
                // First get project id
                const { data: project } = await supabase
                    .from('projects')
                    .select('id')
                    .eq('client_id', user.id)
                    .single();

                if (project) {
                    const { data, error } = await supabase
                        .from('documents')
                        .select('*')
                        .eq('project_id', project.id);

                    if (error) throw error;
                    setDocuments(data);
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Documentos</h1>
            </div>

            <div className="documents-list" style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
                {loading ? (
                    <p>Cargando documentos...</p>
                ) : documents.length > 0 ? (
                    <ul style={{ listStyle: 'none' }}>
                        {documents.map((doc) => (
                            <li key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #eee' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FileText size={24} className="text-accent" />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{doc.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{doc.type}</div>
                                    </div>
                                </div>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px' }}>
                                    <Download size={16} /> Descargar
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay documentos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Documents;

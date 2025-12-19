import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Upload, Trash2, Copy, Image as ImageIcon, Check, Loader2 } from 'lucide-react';

const MediaManager = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .storage
                .from('public-assets')
                .list('uploads', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        try {
            const { error } = await supabase.storage
                .from('public-assets')
                .upload(filePath, file);

            if (error) throw error;
            await fetchImages();
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (name) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return;

        try {
            const { error } = await supabase.storage
                .from('public-assets')
                .remove([`uploads/${name}`]);

            if (error) throw error;
            setImages(images.filter(img => img.name !== name));
        } catch (error) {
            alert('Error deleting image: ' + error.message);
        }
    };

    const copyToClipboard = (name) => {
        const { data } = supabase.storage
            .from('public-assets')
            .getPublicUrl(`uploads/${name}`);
            
        navigator.clipboard.writeText(data.publicUrl);
        setCopiedId(name);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getPublicUrl = (name) => {
        const { data } = supabase.storage
            .from('public-assets')
            .getPublicUrl(`uploads/${name}`);
        return data.publicUrl;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Gestor Multimedia</h3>
                    <p className="text-sm text-gray-500">Sube y gestiona tus imágenes</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-800 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                        <span>{uploading ? 'Subiendo...' : 'Subir Imagen'}</span>
                    </label>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-blue-900" size={32} />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                            <p>No hay imágenes subidas</p>
                        </div>
                    )}
                    {images.map((img) => (
                        <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={getPublicUrl(img.name)}
                                alt={img.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(img.name)}
                                    className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100"
                                    title="Copiar URL"
                                >
                                    {copiedId === img.name ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(img.name)}
                                    className="p-2 bg-white text-red-600 rounded-full hover:bg-gray-100"
                                    title="Eliminar"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs truncate">
                                {img.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaManager;

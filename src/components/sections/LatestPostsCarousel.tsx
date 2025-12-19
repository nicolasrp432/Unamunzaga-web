import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight, Edit, Save, X, Plus, Trash2, Loader2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Interface matching the DB table 'featured_projects'
interface Project {
    id: string;
    image_url: string;
    title: string;
    description: string;
    link: string;
    display_order: number;
}

const FALLBACK_PROJECTS: Project[] = [
    {
        id: '1',
        image_url: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_12_centro-de-Bilbao-EL-CANO-1.jpg',
        title: 'UNA VIVIENDA DE REVISTA EN EL CORAZÓN DE BILBAO',
        description: 'Hemos reformado ésta vivienda en pleno corazón de Bilbao y su resultado ha sido de interés para una de las revistas más importantes del país.',
        link: '/portfolio',
        display_order: 1
    },
    {
        id: '2',
        image_url: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_17_centro-de-Bilbao-EL-CANO-3.jpg',
        title: 'REMODELACIÓN DE VIVIENDA EN EL CENTRO DE BILBAO',
        description: 'Una reforma sutil y conservadora, manteniendo la esencia de la vivienda a petición de sus dueños con toques modernos y minimalistas.',
        link: '/portfolio',
        display_order: 2
    },
    {
        id: '3',
        image_url: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_10_casco-viejo-ITURRIBIDE-7.jpg',
        title: 'VIVIENDA EN CASCO VIEJO DE BILBAO',
        description: 'Reforma de una vivienda en el Casco Viejo de Bilbao, usando tonos suaves logrados a partir de la combinación de materiales y elementos que en conjunto forman una maravillosa armonía.',
        link: '/portfolio',
        display_order: 3
    },
    {
        id: '4',
        image_url: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_146_viviendas-7.jpg',
        title: 'DISEÑO CONTEMPORÁNEO EN INDAUTXU',
        description: 'Transformación integral priorizando la luz natural y los espacios abiertos, creando un hogar funcional y estéticamente impecable.',
        link: '/portfolio',
        display_order: 4
    }
];

export const LatestPostsCarousel: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdminMode, setIsAdminMode] = useState(false);
    
    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Project>>({});
    const [operationLoading, setOperationLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Fetch Data
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('featured_projects')
                .select('*')
                .order('display_order', { ascending: true });
            
            if (error) {
                console.warn('Supabase error, falling back to local data:', error.message);
                setProjects(FALLBACK_PROJECTS);
            } else if (data && data.length > 0) {
                setProjects(data);
            } else {
                // If table exists but empty, maybe show fallback or empty?
                // Given the requirement "Mantener la funcionalidad existente del carrusel como fallback",
                // if DB is empty, we probably want to show the hardcoded data to not break the site.
                setProjects(FALLBACK_PROJECTS);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
            setProjects(FALLBACK_PROJECTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // CRUD Handlers
    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setEditForm(project);
    };

    const handleAddNew = () => {
        setEditingId('new');
        setEditForm({
            title: '',
            description: '',
            image_url: '',
            link: '/portfolio',
            display_order: projects.length + 1
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        if (!editForm.title || !editForm.description || !editForm.image_url) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        setOperationLoading(true);
        try {
            if (editingId === 'new') {
                const { error } = await supabase
                    .from('featured_projects')
                    .insert([editForm]);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('featured_projects')
                    .update(editForm)
                    .eq('id', editingId);
                if (error) throw error;
            }
            await fetchProjects();
            handleCancel();
        } catch (err: any) {
            alert(`Error al guardar: ${err.message}`);
        } finally {
            setOperationLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar este proyecto?')) return;
        
        setOperationLoading(true);
        try {
            const { error } = await supabase
                .from('featured_projects')
                .delete()
                .eq('id', id);
            if (error) throw error;
            await fetchProjects();
        } catch (err: any) {
            alert(`Error al eliminar: ${err.message}`);
        } finally {
            setOperationLoading(false);
        }
    };
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `featured/${fileName}`;

        setUploadingImage(true);
        try {
            const { error: uploadError } = await supabase.storage
                .from('public-assets') // Assuming a public bucket, or reuse 'testimonials' if needed
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('public-assets')
                .getPublicUrl(filePath);

            setEditForm(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error: any) {
            console.error('Upload error:', error);
            // Fallback: Ask user for URL if upload fails (e.g. bucket doesn't exist)
            const url = prompt('No se pudo subir la imagen automáticamente. Por favor ingrese la URL de la imagen:');
            if (url) setEditForm(prev => ({ ...prev, image_url: url }));
        } finally {
            setUploadingImage(false);
        }
    };

    if (loading && projects.length === 0) {
        return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-900" /></div>;
    }

    return (
        <section className="py-20 bg-gray-50/50 relative group/section">
             {/* Admin Toggle */}
            <div className="absolute top-4 right-4 z-50 opacity-0 group-hover/section:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
                    title={isAdminMode ? "Ver modo usuario" : "Modo edición"}
                >
                    <Edit size={16} />
                </button>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-light text-blue-900 mb-4 tracking-wide">
                            ÚLTIMAS PUBLICACIONES
                        </h2>
                        <div className="w-24 h-1 bg-red-500 rounded-full"></div>
                    </div>

                    {!isAdminMode && (
                        <Link
                            to="/blog"
                            className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium mt-4 md:mt-0"
                        >
                            Todas las publicaciones...
                        </Link>
                    )}
                </div>

                {isAdminMode ? (
                    // ADMIN TABLE VIEW
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-700">Gestión de Publicaciones</h3>
                            <button 
                                onClick={handleAddNew}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                            >
                                <Plus size={16} /> Añadir Proyecto
                            </button>
                        </div>
                        
                        {editingId === 'new' && (
                             <div className="p-6 bg-blue-50 border-b border-blue-100">
                                <h4 className="font-bold mb-4 text-blue-900">Nuevo Proyecto</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        className="p-2 border rounded" 
                                        placeholder="Título" 
                                        value={editForm.title || ''} 
                                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                                    />
                                    <input 
                                        className="p-2 border rounded" 
                                        placeholder="URL Imagen" 
                                        value={editForm.image_url || ''} 
                                        onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                                    />
                                    <textarea 
                                        className="p-2 border rounded md:col-span-2" 
                                        placeholder="Descripción" 
                                        value={editForm.description || ''} 
                                        onChange={e => setEditForm({...editForm, description: e.target.value})}
                                    />
                                    <div className="flex justify-end gap-2 md:col-span-2">
                                        <button onClick={handleCancel} className="px-3 py-1 text-gray-600 bg-white border rounded hover:bg-gray-50">Cancelar</button>
                                        <button onClick={handleSave} className="px-3 py-1 text-white bg-blue-900 rounded hover:bg-blue-800">Guardar</button>
                                    </div>
                                </div>
                             </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3">Orden</th>
                                        <th className="px-6 py-3">Imagen</th>
                                        <th className="px-6 py-3">Título</th>
                                        <th className="px-6 py-3">Descripción</th>
                                        <th className="px-6 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {projects.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            {editingId === item.id ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <input 
                                                            type="number" 
                                                            className="w-12 p-1 border rounded"
                                                            value={editForm.display_order}
                                                            onChange={e => setEditForm({...editForm, display_order: parseInt(e.target.value)})}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input 
                                                            className="w-full p-1 border rounded text-xs mb-1"
                                                            value={editForm.image_url}
                                                            onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                                                            placeholder="URL"
                                                        />
                                                        {editForm.image_url && <img src={editForm.image_url} className="h-10 w-10 object-cover rounded" alt="Preview" />}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input 
                                                            className="w-full p-1 border rounded"
                                                            value={editForm.title}
                                                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <textarea 
                                                            className="w-full p-1 border rounded h-20"
                                                            value={editForm.description}
                                                            onChange={e => setEditForm({...editForm, description: e.target.value})}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded mr-1" title="Guardar">
                                                            <Save size={18} />
                                                        </button>
                                                        <button onClick={handleCancel} className="p-1 text-gray-500 hover:bg-gray-100 rounded" title="Cancelar">
                                                            <X size={18} />
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4 font-medium">{item.display_order}</td>
                                                    <td className="px-6 py-4">
                                                        <img src={item.image_url} alt="" className="h-12 w-16 object-cover rounded shadow-sm" />
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                                                    <td className="px-6 py-4 max-w-xs truncate">{item.description}</td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <button onClick={() => handleEdit(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2" title="Editar">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleDelete(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Eliminar">
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
                    </div>
                ) : (
                    // PUBLIC CAROUSEL VIEW
                    <div className="relative group">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination-custom',
                                bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100',
                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-gray-800'
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="!pb-16 px-2"
                        >
                            {projects.map((item) => (
                                <SwiperSlide key={item.id} className="h-auto">
                                    <article className="h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow text-center">
                                            <h3 className="text-lg font-medium text-gray-800 mb-4 uppercase tracking-wide leading-snug line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                                                {item.title}
                                            </h3>

                                            <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4"></div>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                                {item.description}
                                            </p>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Arrows */}
                        <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-400 hover:text-gray-800 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex border border-gray-100">
                            <ChevronLeft size={24} />
                        </button>

                        <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-400 hover:text-gray-800 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex border border-gray-100">
                            <ChevronRight size={24} />
                        </button>

                        {/* Custom Pagination */}
                        <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
                    </div>
                )}

                {!isAdminMode && (
                    <div className="mt-8 text-center md:hidden">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-gray-600 font-medium"
                        >
                            Todas las publicaciones...
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                .swiper-pagination-bullet {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #d1d5db;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                  background: #ef4444 !important; /* Red-500 usually */
                  width: 24px;
                  border-radius: 4px;
                }
            `}</style>
        </section>
    );
};

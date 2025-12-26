import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../../types';
import { Star, ChevronLeft, ChevronRight, Quote, Loader2, Edit, Trash2, Plus, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

// DB Type definition matching the Supabase table
interface DBTestimonial {
  id: string;
  client_name: string;
  role: string | null;
  testimonial_text: string;
  image_url: string | null;
  created_at: string;
  company?: string | null;
  project_id?: string | null;
  rating?: number | null;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]; // Made optional as we might fetch internally
  loading?: boolean;
  error?: string | null;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials: initialTestimonials = [], loading: initialLoading, error: initialError }) => {
  // State for display
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isLoading, setIsLoading] = useState(initialLoading || false);
  const [fetchError, setFetchError] = useState<string | null>(initialError || null);
  
  // Update local state when props change
  useEffect(() => {
    if (initialTestimonials.length > 0) {
      setTestimonials(initialTestimonials);
    }
  }, [initialTestimonials]);

  useEffect(() => {
    setIsLoading(initialLoading || false);
  }, [initialLoading]);

  useEffect(() => {
    setFetchError(initialError || null);
  }, [initialError]);
  
  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // 0: next, 1: prev

  // Admin/Edit State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form State
  const initialFormState = {
    client_name: '',
    role: '',
    testimonial_text: '',
    company: '',
    rating: 5,
    image_url: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch testimonials from Supabase (only if not provided via props)
  const fetchTestimonials = async () => {
    if (initialTestimonials.length > 0) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Map DB fields to UI Testimonial type
        const mappedTestimonials: Testimonial[] = data.map((item: DBTestimonial) => ({
          id: item.id,
          client_name: item.client_name,
          role: item.role || '',
          testimonial_text: item.testimonial_text,
          avatar_url: item.image_url || undefined,
          company: item.company || undefined,
          project: undefined, // Project mapping would require join or separate fetch if using project_id
          rating: item.rating || 5,
          created_at: item.created_at
        }));
        setTestimonials(mappedTestimonials);
      }
    } catch (err: any) {
      console.error('Error fetching testimonials:', err);
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch if needed
    fetchTestimonials();

    // Real-time subscription
    const channel = supabase
      .channel('testimonials-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'testimonials'
        },
        (payload) => {
          console.log('Real-time change received for testimonials:', payload);
          // If we have an external fetcher (hook), we might not need this here
          // but for the admin mode it's useful
          fetchTestimonials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Slider Logic
  useEffect(() => {
    if (!isAutoPlaying || isLoading || fetchError || testimonials.length === 0 || isAdminMode) return;

    const interval = setInterval(() => {
      setDirection(0);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, isLoading, fetchError, isAdminMode]);

  const nextTestimonial = () => {
    setDirection(0);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 0 : 1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // CRUD Operations
  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      client_name: testimonial.client_name,
      role: testimonial.role || '',
      testimonial_text: testimonial.testimonial_text,
      company: testimonial.company || '',
      rating: testimonial.rating,
      image_url: testimonial.avatar_url || ''
    });
    setEditingId(testimonial.id);
    setIsEditing(true);
    setIsAutoPlaying(false);
  };

  const handleAddNew = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsEditing(true);
    setIsAutoPlaying(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploadingImage(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from('testimonials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.testimonial_text) {
      alert('Nombre y contenido son obligatorios');
      return;
    }

    setOperationLoading(true);
    try {
      const testimonialData = {
        client_name: formData.client_name,
        role: formData.role,
        testimonial_text: formData.testimonial_text,
        company: formData.company,
        rating: formData.rating,
        image_url: formData.image_url,
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingId);
        
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);
        
        if (error) throw error;
      }

      await fetchTestimonials();
      handleCancel();
    } catch (error: any) {
      console.error('Error saving testimonial:', error);
      alert(`Error al guardar: ${error.message}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este testimonio?')) return;

    setOperationLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Adjust current index if needed
      if (currentIndex >= testimonials.length - 1) {
        setCurrentIndex(Math.max(0, testimonials.length - 2));
      }
      
      await fetchTestimonials();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      alert(`Error al eliminar: ${error.message}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction === 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Render Logic
  if (isLoading && testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex justify-center p-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-900" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white relative">
      {/* Admin Toggle - Hidden or discrete */}
      <div className="absolute top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="p-2 bg-gray-800 text-white rounded-full"
          title="Modo Admin"
        >
          <Edit size={16} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 20 años construyendo confianza y relaciones duraderas con nuestros clientes en Bilbao.
          </p>
        </motion.div>

        {/* Admin Interface */}
        {isAdminMode && (
          <div className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Gestión de Testimonios</h3>
              <button
                onClick={handleAddNew}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus size={20} />
                <span>Nuevo Testimonio</span>
              </button>
            </div>

            {isEditing && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol / Cargo</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonio *</label>
                  <textarea
                    value={formData.testimonial_text}
                    onChange={e => setFormData({ ...formData, testimonial_text: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-32"
                    required
                  />
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Puntuación (1-5)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <span className="font-bold text-lg">{formData.rating}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <div className="flex items-center space-x-4">
                      {formData.image_url && (
                        <img src={formData.image_url} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                      >
                        {uploadingImage ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />}
                        <span>{uploadingImage ? 'Subiendo...' : 'Subir Imagen'}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={operationLoading}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center space-x-2"
                  >
                    {operationLoading && <Loader2 className="animate-spin w-4 h-4" />}
                    <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testimonio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {t.avatar_url ? (
                              <img className="h-10 w-10 rounded-full object-cover" src={t.avatar_url} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 font-bold">{t.client_name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{t.client_name}</div>
                            <div className="text-sm text-gray-500">{t.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{t.testimonial_text}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEdit(t)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Testimonials Slider */}
        {testimonials.length > 0 ? (
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[600px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextTestimonial();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevTestimonial();
                  }
                }}
                className="absolute inset-0 flex items-center justify-center w-full"
              >
                <div className="bg-white rounded-3xl p-10 md:p-16 text-center w-full mx-auto shadow-xl border border-gray-100 relative overflow-hidden">
                  {/* Subtle background decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-bl-full -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50/50 rounded-tr-full -ml-16 -mb-16" />
                  
                  {/* Client Image - Top Center */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex justify-center relative z-10"
                  >
                    {testimonials[currentIndex].avatar_url ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-900 rounded-full blur-md opacity-20 transform scale-110" />
                        <img
                          src={testimonials[currentIndex].avatar_url}
                          alt={testimonials[currentIndex].client_name}
                          className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                        />
                      </div>
                    ) : (
                      <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center border-4 border-white shadow-xl relative z-10">
                         <span className="text-5xl text-white font-bold">{testimonials[currentIndex].client_name.charAt(0)}</span>
                      </div>
                    )}
                  </motion.div>


                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center space-x-1 mb-6"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonials[currentIndex].rating
                            ? 'text-amber-500 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8"
                  >
                     <Quote className="w-8 h-8 text-blue-900/20 mx-auto mb-4" />
                     <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      "{testimonials[currentIndex].testimonial_text}"
                     </p>
                  </motion.div>

                  {/* Client Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h4 className="font-bold text-gray-900 text-xl mb-1">
                      {testimonials[currentIndex].client_name}
                    </h4>
                    <p className="text-gray-600 font-medium">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].company && (
                        <span className="block text-sm text-gray-500 mt-1">
                          {testimonials[currentIndex].company}
                        </span>
                      )}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2 p-4 bg-white text-blue-900 rounded-full shadow-xl hover:bg-blue-900 hover:text-white transition-all duration-300 hover:scale-110 z-20 border border-gray-100 group"
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 p-4 bg-white text-blue-900 rounded-full shadow-xl hover:bg-blue-900 hover:text-white transition-all duration-300 hover:scale-110 z-20 border border-gray-100 group"
            aria-label="Siguiente"
            type="button"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No hay testimonios disponibles.</p>
            {isAdminMode && (
              <button
                onClick={handleAddNew}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                Añadir el primero
              </button>
            )}
          </div>
        )}

        {/* Dots Indicator */}
        {testimonials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center space-x-2 mt-8"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-blue-900 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </motion.div>
        )}

        {/* Auto-play Toggle */}
        {testimonials.length > 0 && !isAdminMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-6"
        >
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              isAutoPlaying
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            {isAutoPlaying ? 'Pausar reproducción' : 'Reproducir automáticamente'}
          </button>
        </motion.div>
        )}


        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
        >
          {testimonials
            .filter(t => t.logo_url)
            .slice(0, 4)
            .map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="flex justify-center"
              >
                <img
                  src={testimonial.logo_url}
                  alt={testimonial.company}
                  className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

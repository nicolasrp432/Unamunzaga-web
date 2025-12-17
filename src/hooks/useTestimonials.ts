import { useState, useEffect } from 'react';
import { Testimonial } from '../types';

export const useTestimonials = () => {
    // Hardcoded testimonials as requested by the user, bypassing Supabase for now to ensure content control without DB access
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: '1',
            client_name: 'María García',
            company: 'Propietaria de Vivienda',
            role: 'Cliente',
            rating: 5,
            testimonial_text: 'Ha sido muy divertido trabajar con Unamunzaga Obras, esa cercanía que nos han transmitido ha quedado reflejada en los trabajos realizados. La verdad es que estamos muy contentos ya que muchos de nuestros clientes nos han felicitado por ello. Nos han ayudado a mostrar nuestro trabajo de una manera fresca y diferente.',
            avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            created_at: new Date().toISOString()
        },
        {
            id: '2',
            client_name: 'Carlos Ruiz',
            company: 'Arquitectos CR',
            role: 'Arquitecto',
            rating: 5,
            testimonial_text: 'La atención al detalle en la ejecución de la obra fue impecable. Cumplieron con los plazos establecidos y la gestión de todo el proceso fue transparente y profesional. Sin duda volveremos a colaborar en futuros proyectos.',
            avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            created_at: new Date().toISOString()
        },
        {
            id: '3',
            client_name: 'Laura Mendieta',
            company: 'Boutique Zazpi',
            role: 'Dueña de Negocio',
            rating: 5,
            testimonial_text: 'Transformaron nuestro local comercial por completo. Entendieron perfectamente la identidad de nuestra marca y la plasmaron en cada rincón. La iluminación y los acabados son justo lo que buscábamos. ¡Recomendados 100%!',
            avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            created_at: new Date().toISOString()
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If we wanted to keep the fetch but fallback, we could, but user wants this specific data NOW.
    // So we just return the state.

    return { testimonials, loading, error };
};

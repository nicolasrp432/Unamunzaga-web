import { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { supabase } from '../lib/supabase';

export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('testimonials')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (fetchError) throw fetchError;

                if (data) {
                    const mappedTestimonials: Testimonial[] = data.map((item: any) => ({
                        id: item.id,
                        client_name: item.client_name,
                        role: item.role || '',
                        testimonial_text: item.testimonial_text,
                        avatar_url: item.image_url || undefined,
                        company: item.company || undefined,
                        rating: item.rating || 5,
                        created_at: item.created_at
                    }));
                    setTestimonials(mappedTestimonials);
                }
            } catch (err: any) {
                console.error('Error fetching testimonials:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();

        // Optional: Subscribe to changes
        const channel = supabase
            .channel('testimonials_hook_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'testimonials'
                },
                () => {
                    fetchTestimonials();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { testimonials, loading, error };
};

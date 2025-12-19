import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface Service {
    id: string;
    title: string;
    description: string;
    image?: string;
    icon: string;
    image_url?: string; // Added field
    category?: string;
    starting_price?: string;
    duration?: string;
    featured: boolean;
    features?: string[];
    badges?: string[];
    microStat?: string;
}

export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        async function fetchServices() {
            try {
                // Temporarily using created_at as default sort to avoid 400 errors until DB schema is updated
                // Switch back to 'display_order' after running the FIX_SCHEMA_ERRORS.sql script
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data) {
                    setServices(data);
                }
            } catch (e) {
                setError(e as PostgrestError);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();

        // Real-time subscription
        const channel = supabase
            .channel('services-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'services'
                },
                (payload) => {
                    console.log('Real-time change received for services:', payload);
                    fetchServices();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { services, loading, error };
}

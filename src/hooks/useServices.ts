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
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('title');

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
    }, []);

    return { services, loading, error };
}

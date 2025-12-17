import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface JobPosition {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    type: string;
    is_active: boolean;
}

export const useJobPositions = () => {
    const [positions, setPositions] = useState<JobPosition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPositions() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('job_positions')
                    .select('*')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data) {
                    setPositions(data);
                }
            } catch (err: any) {
                console.error('Error fetching job positions:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPositions();
    }, []);

    return { positions, loading, error };
};

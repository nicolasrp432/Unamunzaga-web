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
                // Check for missing table error (PGRST205)
                if (err.code === 'PGRST205' || err.message?.includes('job_positions')) {
                    console.warn('⚠️ Table "job_positions" missing. Please run "src/scripts/update_schema_jobs.sql" in Supabase.');
                    setPositions([]); // Return empty list so UI works
                    // Don't set error state to avoid scary UI messages for missing optional feature
                } else {
                    console.error('Error fetching job positions:', err);
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPositions();
    }, []);

    return { positions, loading, error };
};

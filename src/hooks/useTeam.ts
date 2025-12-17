import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface TeamMember {
    id: string;
    name: string;
    position: string;
    experience?: string;
    description?: string;
    image_url?: string;
    specialties?: string[];
    phone?: string;
    email?: string;
    display_order: number;
}

export function useTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        async function fetchTeam() {
            try {
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .order('display_order', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data) {
                    setTeam(data);
                }
            } catch (e) {
                setError(e as PostgrestError);
            } finally {
                setLoading(false);
            }
        }

        fetchTeam();
    }, []);

    return { team, loading, error };
}

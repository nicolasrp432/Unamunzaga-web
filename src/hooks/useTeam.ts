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
        let isMounted = true;

        async function fetchTeam() {
            try {
                // Temporarily using created_at as default sort to avoid 400 errors until DB schema is updated
                // Switch back to 'display_order' after running the FIX_SCHEMA_ERRORS.sql script
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data && isMounted) {
                    const mappedTeam: TeamMember[] = data.map(item => ({
                        id: item.id,
                        name: item.full_name,
                        position: item.role,
                        experience: item.experience,
                        description: item.bio,
                        image_url: item.image_url,
                        specialties: item.specialties,
                        phone: item.phone,
                        email: item.email,
                        display_order: item.display_order
                    }));
                    setTeam(mappedTeam);
                }
            } catch (e) {
                if (isMounted) setError(e as PostgrestError);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchTeam();

        const channel = supabase
            .channel('team-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'team_members'
                },
                (payload) => {
                    console.log('Real-time change received for team:', payload);
                    fetchTeam();
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    return { team, loading, error };
}

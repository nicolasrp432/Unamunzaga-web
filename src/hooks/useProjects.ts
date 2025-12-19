import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface Project {
    id: string;
    title: string;
    description: string;
    year?: string;
    location?: string;
    category?: string;
    duration?: string;
    images?: string[];
    is_featured?: boolean;
    display_order: number;
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchProjects() {
            try {
                // Temporarily using created_at as default sort to avoid 400 errors until DB schema is updated
                // Switch back to 'display_order' after running the FIX_SCHEMA_ERRORS.sql script
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data && isMounted) {
                    setProjects(data);
                }
            } catch (e) {
                if (isMounted) setError(e as PostgrestError);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchProjects();

        const channel = supabase
            .channel('projects-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'projects'
                },
                (payload) => {
                    console.log('Real-time change received for projects:', payload);
                    fetchProjects();
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    return { projects, loading, error };
}

export function useProject(id: string | undefined) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        async function fetchProject() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data && isMounted) {
                    setProject(data);
                }
            } catch (e) {
                if (isMounted) setError(e as PostgrestError);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchProject();

        const channel = supabase
            .channel(`project-${id}-changes`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'projects',
                    filter: `id=eq.${id}`
                },
                (payload) => {
                    console.log('Real-time change received for project:', payload);
                    fetchProject();
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, [id]);

    return { project, loading, error };
}

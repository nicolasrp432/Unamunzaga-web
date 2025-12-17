import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    year: number;
    location: string;
    duration: string;
    budget: string;
    client_name?: string;
    testimonial?: string;
    featured: boolean;
    images: string[];
    services: string[];
    created_at: string;
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('year', { ascending: false });

                if (error) throw error;
                setProjects(data || []);
            } catch (err: any) {
                console.error('Error fetching projects:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};

export const useProject = (id: string | undefined) => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProject = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (err: any) {
                console.error('Error fetching project:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    return { project, loading, error };
};

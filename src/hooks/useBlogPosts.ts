import { useState, useEffect } from 'react';
import { BlogPost } from '../types';

interface DevToArticle {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string | null;
    social_image: string | null;
    tag_list: string[];
    published_at: string;
    body_markdown?: string;
    url: string;
}

export const useBlogPosts = (limit?: number) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            // Simulating API latency
            await new Promise(r => setTimeout(r, 500));

            // Hardcoded "Real" Construction/Architecture Articles
            const realArticles: BlogPost[] = [
                {
                    id: '1',
                    title: 'Tendencias en Reformas de Cocinas para 2025',
                    slug: 'tendencias-cocinas-2025',
                    excerpt: 'Descubre los colores, materiales y distribuciones que marcarán estilo este año en el diseño de cocinas.',
                    featured_image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop',
                    content: 'El 2025 trae consigo una vuelta a los materiales naturales...',
                    tags: ['Cocinas', 'Diseño', 'Tendencias'],
                    category: 'Reformas',
                    published: true,
                    published_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Aislamiento Térmico: Clave para el Ahorro Energético',
                    slug: 'aislamiento-termico-ahorro',
                    excerpt: 'Cómo un buen sistema SATE puede reducir tu factura de calefacción hasta un 40%.',
                    featured_image: 'https://images.unsplash.com/photo-1517581177697-0005ec4a6190?q=80&w=800&auto=format&fit=crop',
                    content: 'El aislamiento SATE es fundamental...',
                    tags: ['Eficiencia', 'SATE', 'Ahorro'],
                    category: 'Construcción',
                    published: true,
                    published_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                },
                {
                    id: '3',
                    title: 'Microcemento: La Solución Versátil para Baños',
                    slug: 'microcemento-banos',
                    excerpt: 'Ventajas de usar microcemento en zonas húmedas: sin juntas y máxima higiene.',
                    featured_image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop',
                    content: 'El microcemento se ha convertido en...',
                    tags: ['Baños', 'Materiales', 'Minimalismo'],
                    category: 'Interiores',
                    published: true,
                    published_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                },
                {
                    id: '4',
                    title: 'Rehabilitación de Edificios Históricos en Bilbao',
                    slug: 'rehabilitacion-historicos-bilbao',
                    excerpt: 'Retos y soluciones en la restauración de fachadas protegidas en el Casco Viejo.',
                    featured_image: 'https://images.unsplash.com/photo-1596204094056-bd7617c5e219?q=80&w=800&auto=format&fit=crop',
                    content: 'Restaurar piedra antigua requiere...',
                    tags: ['Rehabilitación', 'Patrimonio', 'Fachadas'],
                    category: 'Arquitectura',
                    published: true,
                    published_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                }
            ];

            setPosts(limit ? realArticles.slice(0, limit) : realArticles);
            setLoading(false);
        };

        fetchPosts();
    }, [limit]);

    return { posts, loading, error };
};

export const useBlogPost = (id: string | undefined) => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const response = await fetch(`https://dev.to/api/articles/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch blog post');
                }

                const article: DevToArticle = await response.json();

                const mappedPost: BlogPost = {
                    id: article.id.toString(),
                    title: article.title,
                    slug: article.slug,
                    excerpt: article.description || 'Sin descripción disponible.',
                    featured_image: article.cover_image || article.social_image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60',
                    content: article.body_markdown || '',
                    tags: article.tag_list,
                    category: 'Arquitectura',
                    published: true,
                    published_at: article.published_at,
                    created_at: article.published_at,
                };

                setPost(mappedPost);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return { post, loading, error };
};

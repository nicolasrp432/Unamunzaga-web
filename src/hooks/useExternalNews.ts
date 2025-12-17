import { useState, useEffect } from 'react';

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    url: string;
    source: string;
    date: string;
    author?: string;
}

export const useExternalNews = (limit: number = 10) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                // Using Wikipedia API to search for Architecture and Interior Design related pages
                const searchTerm = 'Arquitectura_moderna|Diseño_de_interiores|Reformas_de_viviendas|Minimalismo|Decoración';
                const endpoint = `https://es.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrnamespace=0&gsrlimit=${limit}&prop=pageimages|extracts|info&pithumbsize=600&exintro&explaintext&inprop=url&exsentences=3&format=json&origin=*`;

                const response = await fetch(endpoint);
                const data = await response.json();

                if (!data.query || !data.query.pages) {
                    throw new Error('No se encontraron noticias');
                }

                const pages = data.query.pages;
                const formattedNews: NewsItem[] = Object.values(pages).map((page: any) => ({
                    id: page.pageid.toString(),
                    title: page.title,
                    description: page.extract || 'Sin descripción disponible.',
                    thumbnail: page.thumbnail?.source || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Fallback image
                    url: page.fullurl,
                    source: 'Wikipedia',
                    date: new Date().toISOString(), // Wikipedia doesn't give date easily in this query, so defaulting to now for sorting or hiding
                    author: 'Wikipedia Contributor'
                }));

                setNews(formattedNews);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('No se pudieron cargar las noticias. Por favor intenta más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [limit]);

    return { news, loading, error };
};

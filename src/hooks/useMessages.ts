import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: string;
}

export function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchMessages() {
            try {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data && isMounted) {
                    setMessages(data);
                }
            } catch (e) {
                if (isMounted) setError(e as PostgrestError);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchMessages();

        const channel = supabase
            .channel('messages-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'contact_messages'
                },
                (payload) => {
                    console.log('Real-time change received for messages:', payload);
                    fetchMessages();
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'read' })
                .eq('id', id);

            if (error) throw error;
        } catch (e) {
            console.error('Error marking message as read:', e);
            throw e;
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (e) {
            console.error('Error deleting message:', e);
            throw e;
        }
    };

    return { messages, loading, error, markAsRead, deleteMessage };
}

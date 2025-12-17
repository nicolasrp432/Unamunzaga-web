import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
    company_name: string;
    phone_primary: string;
    phone_secondary: string | null;
    phone_mobile: string | null;
    email_contact: string;
    address_street: string;
    address_city: string;
    address_province: string;
    address_zip: string;
    google_maps_embed_url: string;
    business_hours: string;
    social_facebook: string | null;
    social_instagram: string | null;
    social_linkedin: string | null;
}

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (error) {
                // If table doesn't exist or is empty, we might get an error. 
                // We can ignore PGRST116 (0 rows) if we want to handle it gracefully, 
                // but for now let's just log it.
                if (error.code !== 'PGRST116') {
                    throw error;
                }
            }

            if (data) {
                setSettings(data);
            }
        } catch (err: any) {
            console.error('Error fetching site settings:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { settings, loading, error };
};

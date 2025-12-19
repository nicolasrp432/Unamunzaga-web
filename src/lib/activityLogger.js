import { supabase } from './supabase';

export const logActivity = async (action, entityType, entityId, details = {}) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.from('activity_logs').insert({
            user_id: user.id,
            action,
            entity_type: entityType,
            entity_id: entityId,
            details,
            ip_address: 'client-side' // Real IP would need server-side or edge function
        });

        if (error) {
            console.error('Error logging activity:', error);
        } else {
            console.log(`[ACTIVITY] ${action} on ${entityType} (ID: ${entityId})`, details);
        }
    } catch (err) {
        console.error('Unexpected error logging activity:', err);
    }
};

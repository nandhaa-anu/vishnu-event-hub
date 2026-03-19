import { supabase } from "./supabase";

export const collaborationService = {
    async getClubs() {
        const { data, error } = await supabase
            .from('clubs')
            .select('*');
        if (error) throw error;
        return data;
    },

    async requestCollaboration(eventId: string, clubId: string) {
        const { data, error } = await supabase
            .from('collaborations')
            .insert([{ event_id: eventId, club_id: clubId, status: 'pending' }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getEventCollaborations(eventId: string) {
        const { data, error } = await supabase
            .from('collaborations')
            .select('*, clubs(*)')
            .eq('event_id', eventId);
        if (error) throw error;
        return data;
    },

    async updateCollaborationStatus(collabId: string, status: 'accepted' | 'rejected') {
        const { data, error } = await supabase
            .from('collaborations')
            .update({ status })
            .eq('id', collabId)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};

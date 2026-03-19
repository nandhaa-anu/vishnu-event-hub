import { supabase } from './supabase';

export const eventService = {
    async getEvents() {
        const { data, error } = await supabase
            .from('events')
            .select('*, clubs(name, logo_url)')
            .eq('status', 'approved')
            .order('date', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getEventById(id: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*, clubs(*), users!organizer_id(*)')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async registerForEvent(studentId: string, eventId: string) {
        // 1. Create Registration
        const { data: registration, error: regError } = await supabase
            .from('registrations')
            .insert([{ student_id: studentId, event_id: eventId }])
            .select()
            .single();

        if (regError) {
            if (regError.code === '23505') throw new Error('You are already registered for this event.');
            throw regError;
        }

        // 2. Auto-generate Ticket
        const qrData = JSON.stringify({
            registrationId: registration.id,
            studentId,
            eventId,
            timestamp: new Date().toISOString()
        });

        const { data: ticket, error: ticketError } = await supabase
            .from('tickets')
            .insert([{
                registration_id: registration.id,
                qr_code_data: qrData
            }])
            .select()
            .single();

        if (ticketError) throw ticketError;

        return { registration, ticket };
    },

    async getMyRegistrations(studentId: string) {
        const { data, error } = await supabase
            .from('registrations')
            .select('*, events(*)')
            .eq('student_id', studentId);
        if (error) throw error;
        return data;
    },

    async createEvent(eventData: any) {
        const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getOrganizerEvents(organizerId: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*, registrations(count)')
            .eq('organizer_id', organizerId);
        if (error) throw error;
        return data;
    },

    async getEventRegistrations(eventId: string) {
        const { data, error } = await supabase
            .from('registrations')
            .select('*, users(*)')
            .eq('event_id', eventId);
        if (error) throw error;
        return data;
    },

    async markAttendance(ticketId: string, scannedBy: string) {
        // 1. Log Attendance
        const { data, error } = await supabase
            .from('attendance')
            .insert([{ ticket_id: ticketId, scanned_by: scannedBy }])
            .select()
            .single();
        if (error) throw error;

        // 2. Get registration ID from ticket
        const { data: ticket, error: ticketError } = await supabase
            .from('tickets')
            .select('registration_id')
            .eq('id', ticketId)
            .single();

        if (ticketError) throw ticketError;

        // 3. Update registration status to attended
        if (ticket) {
            const { error: updateError } = await supabase
                .from('registrations')
                .update({ status: 'attended' })
                .eq('id', ticket.registration_id);
            if (updateError) throw updateError;
        }

        return data;
    },

    async getTicketByRegistrationId(registrationId: string) {
        const { data, error } = await supabase
            .from('tickets')
            .select('*, registrations(*, events(*), student:users!student_id(*))')
            .eq('registration_id', registrationId)
            .single();
        if (error) throw error;
        return data;
    }
};

export const opportunityService = {
    async getOpportunities() {
        const { data, error } = await supabase
            .from('opportunities')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
};

export const certificateService = {
    async getMyCertificates(studentId: string) {
        const { data, error } = await supabase
            .from('certificates')
            .select('*, events(title, date)')
            .eq('student_id', studentId);
        if (error) throw error;
        return data;
    }
};

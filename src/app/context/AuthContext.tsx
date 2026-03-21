"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../services/supabase";

interface AuthContextType {
    user: User | null;
    role: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchProfile = async (userId: string) => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', userId)
                    .single();

                if (error) throw error;
                if (mounted) setRole(data?.role ?? 'student');
            } catch (error) {
                console.error("AuthContext: Failed to fetch user role:", error);
                if (mounted) setRole('student'); // Fallback gracefully
            }
        };

        // 1. Explicitly fetch initial session exactly once
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id).finally(() => {
                    if (mounted) setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        // 2. ONLY respond to actual changes to prevent duplicate database loads
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'INITIAL_SESSION') return; // Handled by getSession above
            if (!mounted) return;

            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setRole(null);
            }
            if (mounted) setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserCircle, Rocket, Lock, Mail, Cpu, Globe, Activity } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../services/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
            if (!data.user) throw new Error("Login failed");

            const { data: userData, error: dbError } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (dbError || !userData) {
                setError("User profile not found.");
                return;
            }

            router.push(`/dashboard/${userData.role}`);
        } catch (err: any) {
            setError("AUTHENTICATION_FAILED: INVALID_CREDENTIALS");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="mesh-bg" />
            <div className="noise-overlay" />

            {/* System HUD Overlay */}
            <div className="absolute top-10 left-10 hidden md:block">
                <div className="cyber-hud-label mb-2 flex items-center gap-2">
                    <Activity size={12} className="text-accent-emerald animate-pulse" />
                    AUTH_SERVER_STATUS: ONLINE
                </div>
                <div className="cyber-hud-label opacity-30">
                    STATION_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block mb-12 group">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase group-hover:scale-110 transition-transform inline-block">
                            VISHNU <span className="text-gradient">HUB!!</span>
                        </span>
                    </Link>
                    <div className="cyber-hud-label mb-4">ACCESS_PROTOCOL_V5.0</div>
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-text-main">Welcome Back</h1>
                </div>

                <div className="cyber-panel p-10 bg-card-bg/20">
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-blue transition-colors" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="USER_IDENTIFIER (EMAIL)"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs uppercase tracking-widest text-text-main focus:border-accent-blue/50 outline-none transition-all placeholder:text-slate-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-violet transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    placeholder="SECURITY_KEY (PASSWORD)"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs uppercase tracking-widest text-text-main focus:border-accent-violet/50 outline-none transition-all placeholder:text-slate-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-mono uppercase tracking-[0.2em] text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all bg-text-main text-bg-main hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 uppercase text-xs tracking-widest"
                        >
                            {loading ? "AUTHENTICATING..." : "EXECUTE_LOGIN"}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                        NEW_NODE? <Link href="/register" className="text-accent-blue hover:text-accent-violet transition-colors ml-2 border-b border-accent-blue/20">INITIALIZE_ACCOUNT</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserCircle, Rocket, Mail, Lock, User, Activity, Cpu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../services/supabase";
import toast from "react-hot-toast";

const roles = [
    { id: 'student', title: 'STUDENT_NODE', icon: <User size={18} />, desc: "Access events & digital pass." },
    { id: 'organizer', title: 'ORGANIZER_NODE', icon: <Cpu size={18} />, desc: "Manage campus interactions." },
    { id: 'admin', title: 'ADMIN_NODE', icon: <ShieldCheck size={18} />, desc: "Full system oversight." }
];

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || cooldown) return;

        setLoading(true);
        setError('');

        if (selectedRole === 'student') {
            const allowedDomains = ['vishnu.edu.in', 'srivishnu.edu.in'];
            const emailDomain = email.split('@')[1];
            if (!allowedDomains.includes(emailDomain)) {
                setError(`RESTRICTION_ERROR: STUDENT_EMAIL must be @vishnu.edu.in`);
                setLoading(false);
                return;
            }
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name, role: selectedRole }
                }
            });

            if (signUpError) throw signUpError;
            if (!data.user) throw new Error("REGISTRATION_FAILED");

            const { error: dbError } = await supabase
                .from('users')
                .insert([{
                    id: data.user.id,
                    name,
                    email,
                    role: selectedRole,
                    roll_number: selectedRole === 'student' ? rollNo : null,
                    department,
                }]);

            if (dbError) throw dbError;

            toast.success("Registration successful! Initializing...");
            router.push(`/dashboard/${selectedRole}`);
        } catch (err: any) {
            console.error("Registration error:", err);
            let errorMessage = `SYSTEM_ERROR: ${err?.message?.toUpperCase() || "UNKNOWN ERROR"}`;

            if (err?.message?.toLowerCase().includes("rate limit") || err?.status === 429) {
                errorMessage = "RATE_LIMIT_EXCEEDED: PLEASE WAIT BEFORE RETRYING.";
                setCooldown(true);
                setTimeout(() => setCooldown(false), 20000); // 20 sec cooldown
                toast.error("Too many signup attempts. Please wait 20 seconds.");
            } else if (err?.message === "Failed to fetch" || err?.message?.includes("fetch")) {
                errorMessage = "NETWORK_ERROR: UNABLE TO CONTACT AUTH SERVER. CHECK ENV VARS.";
                toast.error("Network error. Please check your connection or Server Configuration.");
            } else if (err?.message?.toLowerCase().includes("already registered")) {
                toast.error("Account already exists. Please login instead.");
            } else {
                toast.error(err?.message || "Registration failed. Please try again.");
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
            <div className="mesh-bg" />
            <div className="noise-overlay" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
            >
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block mb-12 group">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase group-hover:scale-110 transition-transform inline-block">
                            VISHNU <span className="text-gradient">HUB!!</span>
                        </span>
                    </Link>
                    <div className="cyber-hud-label mb-4">INITIALIZE_NEW_NODE</div>
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-text-main">Create Account</h1>
                </div>

                <div className="cyber-panel p-10 bg-card-bg/20">
                    <form onSubmit={handleRegister} className="space-y-10">
                        {/* Role Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center group ${selectedRole === role.id
                                        ? "bg-accent-violet border-accent-violet text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                                        : "bg-card-bg/10 border-border-main/10 text-slate-500 hover:border-accent-violet/30"
                                        }`}
                                >
                                    <div className={`${selectedRole === role.id ? "text-white" : "text-slate-400 group-hover:text-accent-violet"} transition-colors`}>
                                        {role.icon}
                                    </div>
                                    <div>
                                        <div className="font-mono text-[9px] uppercase tracking-widest mb-1">{role.title}</div>
                                        <div className="text-[8px] opacity-60 font-medium uppercase leading-tight">{role.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-blue transition-colors" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="FULL_NAME"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs tracking-widest text-text-main focus:border-accent-blue/50 outline-none transition-all placeholder:text-slate-600 placeholder:uppercase"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-emerald transition-colors" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="DEPARTMENT (E.G. CSE)"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs tracking-widest text-text-main focus:border-accent-emerald/50 outline-none transition-all placeholder:text-slate-600 placeholder:uppercase"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>

                            {selectedRole === 'student' && (
                                <div className="md:col-span-2 relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-rose transition-colors" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="ROLL_NUMBER (E.G. 20PA1A05XX)"
                                        className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs tracking-widest text-text-main focus:border-accent-rose/50 outline-none transition-all placeholder:text-slate-600 placeholder:uppercase"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="md:col-span-2 relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-blue transition-colors" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="NODE_IDENTIFIER (EMAIL_ADDRESS)"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs tracking-widest text-text-main focus:border-accent-blue/50 outline-none transition-all placeholder:text-slate-600 placeholder:uppercase"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2 relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-violet transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    placeholder="SECURITY_KEY (PASSWORD)"
                                    className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs tracking-widest text-text-main focus:border-accent-violet/50 outline-none transition-all placeholder:text-slate-600 placeholder:uppercase"
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
                            disabled={loading || cooldown}
                            className={`w-full py-6 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase text-xs tracking-[0.2em] ${cooldown
                                ? "bg-rose-500/20 text-rose-500 cursor-not-allowed border border-rose-500/30"
                                : "bg-text-main text-bg-main hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                                }`}
                        >
                            {loading ? "INITIALIZING_NODE..." : cooldown ? "SYSTEM_COOLDOWN ACTIVE" : "EXECUTE_REGISTRATION"}
                            {!loading && !cooldown && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                        EXISTING_NODE? <Link href="/login" className="text-accent-blue hover:text-accent-violet transition-colors ml-2 border-b border-accent-blue/20">ACCESS_STATION</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
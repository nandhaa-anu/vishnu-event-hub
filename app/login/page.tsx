"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserCircle, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const roles = [
    {
        id: 'student',
        title: 'Student',
        description: 'Discover events and manage your digital pass.',
        icon: <Rocket size={32} />,
        color: 'from-blue-500/20 to-blue-600/20',
        borderColor: 'group-hover:border-blue-500/50',
        path: '/dashboard/student'
    },
    {
        id: 'organizer',
        title: 'Club Organizer',
        description: 'Manage club events and track participation.',
        icon: <UserCircle size={32} />,
        color: 'from-violet-500/20 to-violet-600/20',
        borderColor: 'group-hover:border-violet-500/50',
        path: '/dashboard/organizer'
    },
    {
        id: 'admin',
        title: 'Administrator',
        description: 'Full oversight and advanced platform analytics.',
        icon: <ShieldCheck size={32} />,
        color: 'from-pink-500/20 to-pink-600/20',
        borderColor: 'group-hover:border-pink-500/50',
        path: '/dashboard/admin'
    }
];

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                router.push(`/dashboard/${userData.role}`);
            } else {
                setError("User profile not found in database.");
            }
        } catch (err: any) {
            setError("Invalid credentials or user does not exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="mesh-bg" />

            {/* Dynamic Background Elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-blue/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-12 h-12 rounded-2xl bg-accent-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            <ShieldCheck size={28} fill="currentColor" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black mb-4">Welcome Back</h1>
                    <p className="text-slate-400 font-bold">Access the most advanced campus hub.</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative bg-primary/40 backdrop-blur-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">

                        <div className="space-y-4">
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 rounded-2xl font-black flex items-center justify-center gap-2 transition-all bg-white text-primary hover:bg-slate-200 disabled:opacity-50"
                        >
                            {loading ? "Authenticating..." : "Access Portal"} <ArrowRight size={20} />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-sm text-slate-500 font-bold">
                    New here? <Link href="/register" className="text-accent-blue hover:underline">Create an account</Link>
                </div>
            </motion.div>
        </div>
    );
}

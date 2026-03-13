"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserCircle, Rocket, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const roles = [
    { id: 'student', title: 'Student', icon: <Rocket size={24} />, color: 'from-blue-500/20 to-blue-600/20' },
    { id: 'organizer', title: 'Club Organizer', icon: <UserCircle size={24} />, color: 'from-violet-500/20 to-violet-600/20' },
    { id: 'admin', title: 'Administrator', icon: <ShieldCheck size={24} />, color: 'from-pink-500/20 to-pink-600/20' }
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
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user profile to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                role: selectedRole,
                rollNumber: selectedRole === 'student' ? rollNo : null,
                department,
                createdAt: new Date().toISOString()
            });

            router.push(`/dashboard/${selectedRole}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="mesh-bg" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-4">Create <span className="text-gradient">Account</span></h1>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Join the Vishnu Hub</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-primary/40 backdrop-blur-2xl">
                    <form onSubmit={handleRegister} className="space-y-6">

                        {/* Role Selection Tabs */}
                        <div className="flex p-1 bg-white/5 rounded-2xl gap-1">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${selectedRole === role.id ? 'bg-white text-primary shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    {role.title}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {selectedRole === 'student' && (
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Roll Number (e.g. 20PA1A05XX)"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Rocket className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Department (e.g. CSE, ECE)"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    required
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-blue/50 transition-all font-bold"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 rounded-2xl font-black flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? "Initializing..." : "Register Account"}
                            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500 font-bold">
                    Already have an account? <Link href="/login" className="text-accent-blue hover:underline">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
}

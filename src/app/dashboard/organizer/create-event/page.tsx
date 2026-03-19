"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { eventService } from "@/services/eventService";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, MapPin, AlignLeft, Image as ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        poster_url: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);
        try {
            await eventService.createEvent({
                ...formData,
                organizer_id: user.id,
                status: 'pending' // Admin needs to approve
            });
            router.push("/dashboard/organizer");
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRole="organizer">
            <div className="min-h-screen bg-primary p-10 flex flex-col items-center">
                <div className="w-full max-w-3xl">
                    <Link href="/dashboard/organizer" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-10 font-bold uppercase tracking-widest text-[10px]">
                        <ChevronLeft size={16} /> Back to Workbench
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl font-black mb-2">Create <span className="text-gradient-violet">Experience.</span></h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Design your next big event</p>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-10 rounded-[3rem] border border-white/5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={14} className="text-accent-violet" /> Event Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-accent-violet/50 transition-all"
                                    placeholder="Hackathon 2024..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={14} className="text-accent-violet" /> Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-accent-violet/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={14} className="text-accent-violet" /> Location
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-accent-violet/50 transition-all"
                                        placeholder="Auditorium..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <AlignLeft size={14} className="text-accent-violet" /> Description
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-accent-violet/50 transition-all resize-none"
                                    placeholder="Tell us more about the event..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <ImageIcon size={14} className="text-accent-violet" /> Poster URL (Supabase storage integration pending)
                                </label>
                                <input
                                    type="text"
                                    value={formData.poster_url}
                                    onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-accent-violet/50 transition-all"
                                    placeholder="https://..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-premium py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Deploying..." : (
                                    <>
                                        <Sparkles size={20} /> Deploy Event Proposal
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

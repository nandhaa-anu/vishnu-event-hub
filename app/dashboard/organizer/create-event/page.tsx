"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar, MapPin, Users, Link as LinkIcon,
    Image as ImageIcon, Clock, Save, ArrowLeft, Type, AlignLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function CreateEventPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        category: "Technical",
        limit: "",
        whatsappLink: "",
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No authenticated user found");

            await addDoc(collection(db, "events"), {
                ...formData,
                organizerId: user.uid,
                organizerName: user.displayName || "Club Organizer",
                status: "pending",
                createdAt: serverTimestamp(),
                popularityScore: 0,
            });

            router.push("/dashboard/organizer");
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRole="organizer">
            <div className="min-h-screen bg-primary px-6 py-20 relative overflow-hidden">
                <div className="mesh-bg" />

                <div className="container mx-auto max-w-4xl relative z-10">
                    <Link href="/dashboard/organizer" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-bold group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Workbench
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-5xl font-black mb-4">Create New <span className="text-gradient-violet">Experience.</span></h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fill in the details to deploy your campus event</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest pl-2">
                                    <Type size={16} /> Event Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. TechNova Hackathon v3"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-accent-violet/50 transition-all font-bold text-lg"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest pl-2">
                                    <AlignLeft size={16} /> Full Description
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Provide a compelling overview of your event..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[3rem] border border-white/5 space-y-6">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <Calendar size={14} /> Event Date
                                </label>
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <Clock size={14} /> Start Time
                                </label>
                                <input
                                    required
                                    type="time"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <MapPin size={14} /> Venue
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. CSE Block Seminar Hall"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[3rem] border border-white/5 space-y-6">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <Users size={14} /> Student Limit
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder="Leave blank for no limit"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.limit}
                                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <LinkIcon size={14} /> WhatsApp Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://chat.whatsapp.com/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold"
                                    value={formData.whatsappLink}
                                    onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    <ImageIcon size={14} /> Category
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent-violet/50 transition-all font-bold appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Technical" className="bg-primary text-white">Technical</option>
                                    <option value="Cultural" className="bg-primary text-white">Cultural</option>
                                    <option value="Sports" className="bg-primary text-white">Sports</option>
                                    <option value="Workshop" className="bg-primary text-white">Workshop</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-6 pt-6">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-10 py-5 rounded-3xl font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-premium flex items-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Initializing Deployment..." : "Deploy Event Hub"} <Save size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
}

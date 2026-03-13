"use client";

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    Users, Calendar, Plus, BarChart2,
    Settings, LogOut, MessageSquare, Target, Send, LayoutDashboard
} from "lucide-react";
import Link from "next/link";

export default function OrganizerDashboard() {
    return (
        <ProtectedRoute allowedRole="organizer">
            <div className="min-h-screen bg-primary flex overflow-hidden">
                <div className="mesh-bg" />

                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 flex flex-col p-8 bg-primary/40 backdrop-blur-xl shrink-0 hidden lg:flex">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-accent-violet flex items-center justify-center text-white">
                            <Target size={22} fill="currentColor" />
                        </div>
                        <span className="text-lg font-black tracking-tighter">VISHNU <span className="text-accent-violet">HUB</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {[
                            { icon: <LayoutDashboard size={20} />, label: "Workbench", active: true },
                            { icon: <Plus size={20} />, label: "Create Event" },
                            { icon: <Users size={20} />, label: "Registrations" },
                            { icon: <MessageSquare size={20} />, label: "Broadcasts" },
                            { icon: <BarChart2 size={20} />, label: "Club Insights" },
                            { icon: <Settings size={20} />, label: "Settings" }
                        ].map((item, i) => (
                            <Link key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => auth.signOut()}
                        className="flex items-center gap-4 p-4 text-rose-500 font-bold hover:bg-rose-500/10 rounded-2xl transition-all text-left"
                    >
                        <LogOut size={20} />
                        Exit Portal
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Club <span className="text-gradient-violet">Organizer.</span></h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Managing "ACN Developers Club"</p>
                        </div>
                        <Link href="/dashboard/organizer/create-event" className="btn-premium flex items-center gap-2 group">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> New Event Experience
                        </Link>
                    </header>

                    {/* Event Summary Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-8 rounded-[3rem] border border-white/5"
                        >
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <BarChart2 className="text-accent-violet" />
                                Performance Pulse
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Fill Rate - Hackathon", val: 85, color: "bg-accent-blue" },
                                    { label: "Workshop Engagement", val: 62, color: "bg-accent-violet" },
                                    { label: "Seminar Occupancy", val: 94, color: "bg-pink-500" }
                                ].map((p, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            <span>{p.label}</span>
                                            <span>{p.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${p.val}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full ${p.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-8 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-accent-violet/10 flex items-center justify-center text-accent-violet mx-auto mb-6">
                                <Send size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Broadcast Update</h3>
                            <p className="text-slate-400 text-sm font-bold mb-8">Send instant notification to all registered participants via Email & WhatsApp.</p>
                            <button className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-sm font-black uppercase tracking-widest">
                                Configure Broadcast
                            </button>
                        </motion.div>
                    </div>

                    {/* Active Events List */}
                    <div className="glass-card rounded-[3rem] p-8">
                        <h3 className="text-xl font-black mb-8">Scheduled Deployments</h3>
                        <div className="space-y-4">
                            {[
                                { name: "TechNova v2", date: "Oct 15", status: "LIVE", registrations: 450 },
                                { name: "System Design 101", date: "Nov 02", status: "PENDING", registrations: 128 }
                            ].map((event, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-accent-violet/30 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-violet font-black">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-black text-lg">{event.name}</p>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{event.date} &bull; {event.registrations} Registered</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[10px] font-black px-4 py-1.5 rounded-full ${event.status === 'LIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {event.status}
                                        </span>
                                        <button className="p-3 rounded-xl hover:bg-white/5 text-slate-400 group-hover:text-white transition-all">
                                            <Settings size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

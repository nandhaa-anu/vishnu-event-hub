"use client";

import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../services/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    Users, Calendar, Plus, BarChart2,
    Settings, LogOut, MessageSquare, Target, Send, LayoutDashboard, QrCode
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { eventService } from "@/services/eventService";

export default function OrganizerDashboard() {
    const { user } = useAuth();
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!user) return;
            try {
                const data = await eventService.getOrganizerEvents(user.id);
                setEvents(data || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [user]);

    return (
        <ProtectedRoute allowedRole="organizer">
            <div className="min-h-screen bg-bg-main flex overflow-hidden transition-colors duration-300">
                <div className="mesh-bg opacity-30 dark:opacity-10" />

                {/* Sidebar */}
                <aside className="w-72 border-r border-border-main/10 flex flex-col p-8 bg-card-bg shrink-0 hidden lg:flex transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-accent-violet flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all">
                            <Target size={22} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-accent-violet">HUB!!</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {[
                            { icon: <LayoutDashboard size={20} />, label: "Workbench", href: "#", active: true },
                            { icon: <Plus size={20} />, label: "Create Event", href: "/dashboard/organizer/create-event" },
                            { icon: <QrCode size={20} />, label: "Scan Attendance", href: "/dashboard/organizer/scanner" },
                            { icon: <Users size={20} />, label: "Collaborations", href: "#" },
                            { icon: <BarChart2 size={20} />, label: "Analytics", href: "#" },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20' : 'text-slate-500 hover:text-text-main hover:bg-bg-main'}`}>
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex items-center gap-4 p-4 text-rose-500 font-bold hover:bg-rose-500/10 rounded-2xl transition-all text-left uppercase text-xs tracking-widest"
                    >
                        <LogOut size={20} />
                        Exit Portal
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10 bg-bg-main/50 transition-colors duration-300">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black mb-2 text-text-main">Club <span className="text-accent-violet">Organizer.</span></h1>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing Professional Experiences</p>
                        </div>
                        <Link href="/dashboard/organizer/create-event" className="bg-accent-violet text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-2 group shadow-[0_10px_20px_rgba(124,58,237,0.2)] hover:scale-105 active:scale-95 transition-all">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> New Event Experience
                        </Link>
                    </header>

                    {/* Event Summary Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card-bg p-8 rounded-[3rem] border border-border-main/10 relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-text-main">
                                <BarChart2 size={120} />
                            </div>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-text-main">
                                <BarChart2 className="text-accent-violet" />
                                Creation_Workbench
                            </h3>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-5 rounded-[2rem] bg-bg-main/50 border border-border-main/5">
                                    <p className="text-3xl font-black text-text-main">{events.length}</p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Projs</p>
                                </div>
                                <div className="p-5 rounded-[2rem] bg-bg-main/50 border border-border-main/5">
                                    <p className="text-3xl font-black text-accent-violet">
                                        {events.reduce((acc, curr) => acc + (curr.registrations?.[0]?.count || 0), 0)}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Users</p>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-border-main/10 relative z-10">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter">
                                    <span className="text-slate-500">System_Status</span>
                                    <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Operational</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card-bg p-8 rounded-[3rem] border border-border-main/10 flex flex-col justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] dark:shadow-none"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-accent-violet/10 flex items-center justify-center text-accent-violet mx-auto mb-6">
                                <QrCode size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-text-main">Smart Attendance</h3>
                            <p className="text-slate-500 text-sm font-bold mb-8">Scan student QR tickets to automatically mark attendance and trigger certificates.</p>
                            <Link href="/dashboard/organizer/scanner" className="w-full py-4 rounded-2xl border border-border-main/20 hover:bg-bg-main transition-all text-sm font-black text-text-main uppercase tracking-widest inline-block transition-all">
                                Open Scanner
                            </Link>
                        </motion.div>
                    </div>

                    {/* Active Events List */}
                    <div className="bg-card-bg rounded-[3rem] p-8 border border-border-main/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors duration-300">
                        <h3 className="text-xl font-black mb-8 text-text-main">Scheduled Deployments</h3>
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2].map(i => <div key={i} className="h-20 bg-bg-main rounded-[2rem]" />)}
                            </div>
                        ) : events.length > 0 ? (
                            <div className="space-y-4">
                                {events.map((event, i) => (
                                    <div key={event.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-bg-main/30 border border-border-main/5 hover:border-accent-violet/30 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-bg-main flex items-center justify-center text-accent-violet font-black transition-all">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="font-black text-lg text-text-main transition-colors">{event.title}</p>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                                                    {new Date(event.date).toLocaleDateString()} &bull; {event.registrations?.[0]?.count || 0} Registered
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full ${event.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {event.status.toUpperCase()}
                                            </span>
                                            <button className="p-3 rounded-xl hover:bg-bg-main text-slate-500 hover:text-text-main transition-all">
                                                <Settings size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No events created yet.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

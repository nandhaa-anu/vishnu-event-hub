"use client";

import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../services/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    Rocket, Calendar, Ticket as TicketIcon, User,
    LogOut, Sparkles, Compass, Wallet, MapPin, Award, Briefcase
} from "lucide-react";
import Link from "next/link";
import TicketPass from "../../components/TicketPass";
import { useEffect, useState } from "react";
import { eventService, certificateService } from "@/services/eventService";

export default function StudentDashboard() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const [registrations, certs] = await Promise.all([
                    eventService.getMyRegistrations(user.id),
                    certificateService.getMyCertificates(user.id)
                ]);

                setTickets(registrations || []);
                setCertificates(certs || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <ProtectedRoute allowedRole="student">
            <div className="min-h-screen bg-bg-main flex overflow-hidden transition-colors duration-300">
                {/* Sidebar */}
                <aside className="w-72 border-r-[3px] border-border-main flex flex-col p-8 bg-card-bg shrink-0 hidden lg:flex transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-text-main flex items-center justify-center text-bg-main border-2 border-border-main shadow-[3px_3px_0px_0px_var(--border-main)]">
                            <Rocket size={22} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="opacity-40">HUB!!</span></span>
                    </div>

                    <nav className="flex-1 space-y-3">
                        {[
                            { icon: <Compass size={20} />, label: "EVENT_LOG", href: "/events", active: true },
                            { icon: <Award size={20} />, label: "CERT_LOCKER", href: "#certificates" },
                            { icon: <Briefcase size={20} />, label: "OPPORTUNITIES", href: "/opportunities" },
                            { icon: <User size={20} />, label: "NODE_PROFILE", href: "#" }
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className={`flex items-center gap-4 p-4 border-[3px] transition-all font-mono font-black text-xs tracking-widest ${item.active ? 'bg-text-main text-bg-main border-border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]' : 'border-transparent text-slate-500 hover:text-text-main hover:border-border-main'}`}>
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex items-center gap-4 p-4 text-text-main font-mono font-black text-xs tracking-widest border-[3px] border-border-main hover:bg-rose-500 hover:text-white transition-all uppercase"
                    >
                        <LogOut size={20} />
                        TERMINATE_SESSION
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10 bg-bg-main/50 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto space-y-12">

                        {/* Dossier Header System */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end px-1">
                                <p className="font-mono text-[10px] font-black text-slate-500 tracking-widest leading-none uppercase select-none">
                                    // SYSTEM_ACCESS: AUTHORIZED // USER_NODE: {(user?.user_metadata?.name || "STUDENT").toUpperCase()}
                                </p>
                                <span className="font-mono text-[10px] font-black text-emerald-500 animate-pulse uppercase tracking-widest">Connection: Secure</span>
                            </div>

                            <div className="relative bg-card-bg border-[3px] border-border-main p-1 shadow-[12px_12px_0px_0px_var(--border-main)] overflow-hidden transition-all duration-300">
                                <div className="border border-border-main/20 p-8 md:p-16 relative">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                                        <h1 className="text-6xl md:text-9xl font-black tracking-[0.1em] uppercase leading-none text-text-main">
                                            DOSSIER_V5.0: <span className="opacity-10">EVENT_LOG</span>
                                        </h1>

                                        <div className="bg-text-main p-8 font-mono text-bg-main text-[11px] leading-relaxed shrink-0 border-2 border-border-main/20 shadow-[8px_8px_0px_0px_var(--border-main)] transition-all">
                                            <p className="flex justify-between gap-12 border-b border-bg-main/10 pb-2 mb-2">
                                                <span className="opacity-50">LAST_SYNC:</span> 2026.03.17_16:20
                                            </p>
                                            <p className="flex justify-between gap-12 border-b border-bg-main/10 pb-2 mb-2">
                                                <span className="opacity-50">STATUS:</span> <span className="text-emerald-400 font-black">ONLINE</span>
                                            </p>
                                            <p className="flex justify-between gap-12">
                                                <span className="opacity-50">LOC:</span> <span className="opacity-80">GLOBAL_DATABASE</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-12 h-4 w-full bg-gradient-to-r from-emerald-500 via-yellow-500 via-orange-500 via-rose-500 to-indigo-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Command Bar */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-card-bg border-[3px] border-border-main p-1 shadow-[6px_6px_0px_0px_var(--border-main)] transition-all">
                                <div className="border border-border-main/20 flex items-center px-6 py-4 gap-4">
                                    <span className="font-mono font-black text-text-main text-sm">CMD&gt;</span>
                                    <input
                                        type="text"
                                        placeholder="SEARCH_BY_KEYWORDS..."
                                        className="bg-transparent border-none outline-none flex-1 font-mono font-black text-sm uppercase placeholder:text-slate-500 text-text-main"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {['ALL_ENTRIES', 'TECH', 'CREATIVE'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-8 py-5 font-mono font-black text-[11px] border-[3px] border-border-main uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_var(--border-main)] ${tab === 'ALL_ENTRIES' ? 'bg-text-main text-bg-main shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-card-bg text-text-main hover:bg-bg-main'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid of Events */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {loading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="bg-card-bg border-[3px] border-border-main p-1 shadow-[6px_6px_0px_0px_var(--border-main)] animate-pulse h-80" />
                                ))
                            ) : tickets.length > 0 ? (
                                tickets.map(reg => (
                                    <div key={reg.id} className="relative bg-card-bg border-[3px] border-border-main p-1 shadow-[8px_8px_0px_0px_var(--border-main)] group hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col">
                                        <div className="border border-border-main/20 p-8 flex-1 flex flex-col">
                                            <div className="mb-8 flex justify-between items-start">
                                                <span className="bg-text-main text-bg-main text-[10px] px-4 py-1.5 font-mono font-black uppercase tracking-widest transition-colors">
                                                    CATEGORY: {reg.events.category?.[0] || 'GENERAL'}
                                                </span>
                                                <span className="font-mono text-[10px] font-bold text-slate-500">#{reg.id.slice(0, 8).toUpperCase()}</span>
                                            </div>

                                            <h4 className="text-3xl font-black uppercase text-text-main tracking-tighter mb-8 leading-[0.9] flex-1">
                                                {reg.events.title}
                                            </h4>

                                            <div className="space-y-3 border-t-2 border-border-main/10 pt-8 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                                <div className="flex justify-between items-center">
                                                    <span>DATE_OBJECT:</span>
                                                    <span className="text-text-main font-black">{new Date(reg.events.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace(/ /g, '_')}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>TIMESTAMP:</span>
                                                    <span className="text-text-main font-black">{new Date(reg.events.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', ':')}00_PST</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>LOCATION:</span>
                                                    <span className="text-text-main font-black truncate max-w-[120px]">{reg.events.venue.replace(/ /g, '_').toUpperCase()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-border-main/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ENTRY_FEE</span>
                                                    <span className="text-2xl font-black text-text-main tracking-tighter">${reg.events.price || 'FREE_ACCESS'}</span>
                                                </div>
                                                <Link
                                                    href={`/ticket/${reg.id}`}
                                                    className="bg-text-main text-bg-main px-8 py-4 font-black uppercase text-[11px] tracking-widest border-2 border-border-main hover:bg-card-bg hover:text-text-main transition-all"
                                                >
                                                    ACCESS_LOG
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full border-[4px] border-dashed border-border-main/10 py-40 text-center bg-card-bg shadow-inner">
                                    <p className="font-mono text-slate-500 font-bold uppercase tracking-[0.4em] text-sm">// NO_DATA_ENTRIES_FOUND_IN_NODE : {(user?.id || 'LOCAL').slice(0, 8)}</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination / Block Nav */}
                        <div className="flex items-center justify-center gap-6 py-16">
                            <button className="px-8 py-5 font-mono font-black text-[11px] border-[3px] border-border-main bg-card-bg text-text-main uppercase tracking-widest hover:bg-text-main hover:text-bg-main transition-all shadow-[6px_6px_0px_0px_var(--border-main)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                                &lt; PREV_BLOCK
                            </button>
                            <div className="flex gap-3">
                                {['01', '02', '03'].map(num => (
                                    <button key={num} className={`w-14 h-14 font-mono font-black text-[11px] border-[3px] border-border-main transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] ${num === '01' ? 'bg-text-main text-bg-main shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-card-bg text-text-main hover:bg-bg-main'}`}>
                                        {num}
                                    </button>
                                ))}
                            </div>
                            <button className="px-8 py-5 font-mono font-black text-[11px] border-[3px] border-border-main bg-card-bg text-text-main uppercase tracking-widest hover:bg-text-main hover:text-bg-main transition-all shadow-[6px_6px_0px_0px_var(--border-main)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                                NEXT_BLOCK &gt;
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

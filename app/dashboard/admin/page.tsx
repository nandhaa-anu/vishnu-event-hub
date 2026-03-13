"use client";

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    BarChart3, Users, Calendar, Shield, Activity,
    Settings, LogOut, Search, Plus, Filter, LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import DashboardPreview from "../../components/DashboardPreview";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <ProtectedRoute allowedRole="admin">
            <div className="min-h-screen bg-primary flex overflow-hidden">
                <div className="mesh-bg" />

                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 flex flex-col p-8 bg-primary/40 backdrop-blur-xl shrink-0 hidden lg:flex">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white">
                            <Shield size={22} fill="currentColor" />
                        </div>
                        <span className="text-lg font-black tracking-tighter">VISHNU <span className="text-accent-blue">HUB</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {[
                            { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
                            { icon: <Calendar size={20} />, label: "Event Control" },
                            { icon: <Users size={20} />, label: "Users Registry" },
                            { icon: <Activity size={20} />, label: "Live Analytics" },
                            { icon: <Settings size={20} />, label: "Settings" }
                        ].map((item, i) => (
                            <Link key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
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
                        Sign Out
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Admin <span className="text-gradient">Infrastructure.</span></h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Real-time campus oversight</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input type="text" placeholder="Search infrastructure..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:border-accent-blue/50 transition-all" />
                            </div>
                            <button className="flex items-center gap-2 p-3 rounded-2xl bg-accent-blue text-white hover:scale-105 transition-all">
                                <Plus size={20} />
                            </button>
                        </div>
                    </header>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { label: "Total Registrations", val: "12.4k", icon: <Users size={20} />, color: "text-accent-blue" },
                            { label: "Active Platform Events", val: "156", icon: <Calendar size={20} />, color: "text-accent-violet" },
                            { label: "Engagement Rate", val: "89.2%", icon: <Activity size={20} />, color: "text-emerald-500" },
                            { label: "System Uptime", val: "100%", icon: <Shield size={20} />, color: "text-amber-500" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 rounded-3xl"
                            >
                                <div className={`mb-4 w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.val}</p>
                            </motion.div>
                        ))}
                    </div>

                    <DashboardPreview />
                </main>
            </div>
        </ProtectedRoute>
    );
}

"use client";

import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../services/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    BarChart3, Users, Calendar, Shield, Activity,
    Settings, LogOut, Search, Plus, Filter, LayoutDashboard, TrendingUp, PieChart
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        activeEvents: 0,
        totalUsers: 0,
        clubActivities: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, these would be RPC calls or complex queries
                const [regs, evs, usrs, clubs] = await Promise.all([
                    supabase.from('registrations').select('*', { count: 'exact', head: true }),
                    supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
                    supabase.from('users').select('*', { count: 'exact', head: true }),
                    supabase.from('clubs').select('*', { count: 'exact', head: true })
                ]);

                setStats({
                    totalRegistrations: regs.count || 0,
                    activeEvents: evs.count || 0,
                    totalUsers: usrs.count || 0,
                    clubActivities: clubs.count || 0
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <ProtectedRoute allowedRole="admin">
            <div className="min-h-screen bg-bg-main flex overflow-hidden transition-colors duration-300">
                {/* Sidebar */}
                <aside className="w-72 border-r border-border-main/10 flex flex-col p-8 bg-card-bg shrink-0 hidden lg:flex transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                            <Shield size={22} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-emerald-500">HUB!!</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {[
                            { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
                            { icon: <Calendar size={20} />, label: "Approvals" },
                            { icon: <Users size={20} />, label: "Users Registry" },
                            { icon: <TrendingUp size={20} />, label: "Faculty Analytics" },
                            { icon: <Settings size={20} />, label: "Settings" }
                        ].map((item, i) => (
                            <Link key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-500 hover:text-text-main hover:bg-bg-main'}`}>
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
                        Sign Out
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10 bg-bg-main/50 transition-colors duration-300">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black mb-2 text-text-main">Admin <span className="text-emerald-500">Infrastructure.</span></h1>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time campus oversight</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Link href="/dashboard/admin/settings" className="p-3 rounded-2xl bg-card-bg border border-border-main/10 text-text-main hover:bg-bg-main transition-all">
                                <Settings size={20} />
                            </Link>
                        </div>
                    </header>

                    {/* Infrastructure Pulse Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { label: "Network_Registrations", val: stats.totalRegistrations, icon: <Users size={20} />, color: "text-emerald-500", health: "98%" },
                            { label: "Active_Protocols", val: stats.activeEvents, icon: <Calendar size={20} />, color: "text-emerald-400", health: "100%" },
                            { label: "Secure_User_Nodes", val: stats.totalUsers, icon: <Shield size={20} />, color: "text-emerald-600", health: "100%" },
                            { label: "Verified_Clubs", val: stats.clubActivities, icon: <PieChart size={20} />, color: "text-emerald-500", health: "94%" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card-bg p-6 rounded-3xl relative overflow-hidden group border border-border-main/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] dark:shadow-none"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-text-main">
                                    {stat.icon}
                                </div>
                                <div className={`mb-4 w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center ${stat.color} transition-all`}>
                                    {stat.icon}
                                </div>
                                <div className="flex justify-between items-end mb-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                    <span className="text-[8px] font-black text-emerald-500">{stat.health} HEALTH</span>
                                </div>
                                <p className="text-3xl font-black text-text-main transition-colors">{stat.val}</p>
                                <div className="mt-4 h-1 w-full bg-border-main/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: stat.health }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-card-bg p-8 rounded-[3rem] border border-border-main/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] transition-colors">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-text-main">
                                <TrendingUp className="text-accent-blue" />
                                Participation Trends
                            </h3>
                            <div className="h-64 flex items-center justify-center border border-dashed border-border-main/20 rounded-2xl bg-bg-main/30">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Data Visualization Module Loading...</p>
                            </div>
                        </div>

                        <div className="bg-card-bg p-8 rounded-[3rem] border border-border-main/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] transition-colors">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-text-main">
                                <PieChart className="text-accent-violet" />
                                Top Clubs
                            </h3>
                            <div className="space-y-4">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Most active clubs ranking live</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}


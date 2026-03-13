"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Cpu, Zap } from "lucide-react";

const DashboardPreview = () => {
    return (
        <section className="py-24 px-6 bg-primary/50 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-accent-violet/10 flex items-center justify-center text-accent-violet mb-8">
                            <BarChart3 size={32} />
                        </div>
                        <h2 className="text-5xl font-black mb-6 leading-tight">Master your events with <span className="text-gradient">powerful</span> analytics.</h2>
                        <p className="text-slate-400 text-lg mb-8 font-bold leading-relaxed">
                            Real-time insights for organizers. Track registrations, monitor fill rates, and analyze participant engagement with our futuristic dashboard.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Fill Rate", value: "94%", icon: <TrendingUp size={20} /> },
                                { label: "Efficiency", value: "2.4x", icon: <Zap size={20} /> },
                            ].map((stat, i) => (
                                <div key={i} className="glass-card p-6 rounded-2xl">
                                    <div className="text-accent-blue mb-2">{stat.icon}</div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">{stat.label}</p>
                                    <p className="text-2xl font-black">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="glass-card p-4 rounded-[2rem] border border-white/10 shadow-2xl"
                        >
                            {/* Simulated Chart UI */}
                            <div className="bg-[#0f172a] rounded-[1.5rem] p-6 min-h-[400px]">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="px-4 py-1.5 rounded-lg bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Live View
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { label: "Technical Workshop", val: "w-[85%]", color: "bg-accent-blue" },
                                        { label: "Hackathon 2026", val: "w-[60%]", color: "bg-accent-violet" },
                                        { label: "Cultural Night", val: "w-[40%]", color: "bg-pink-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span>{item.label}</span>
                                                <span className="text-slate-500">Processing...</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: item.val.split('[')[1].split(']')[0] }}
                                                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(37,99,235,0.3)]`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 grid grid-cols-4 items-end gap-4 h-32">
                                    {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                                            className="w-full bg-gradient-to-t from-accent-blue/20 to-accent-blue rounded-t-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating floating chip */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border border-accent-blue/30"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-black">
                                <Cpu size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500">SYSTEM PERFORMANCE</p>
                                <p className="text-sm font-black">ULTRA STABLE</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;

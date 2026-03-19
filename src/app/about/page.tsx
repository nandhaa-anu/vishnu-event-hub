"use client";

import { motion } from "framer-motion";
import { Shield, Target, Zap, Globe, Cpu, Activity } from "lucide-react";
import CardNav, { CardNavItem } from "../components/CardNav";

export default function AboutPage() {
    const navItems: CardNavItem[] = [
        {
            label: "Explore",
            bgColor: "#0a0a0a",
            textColor: "#fff",
            links: [
                { label: "Home", href: "/", ariaLabel: "Go home" },
                { label: "Events", href: "/events", ariaLabel: "Browse events" }
            ]
        },
        {
            label: "People",
            bgColor: "#111",
            textColor: "#fff",
            links: [
                { label: "Team", href: "/team", ariaLabel: "Meet the team" },
                { label: "Gallery", href: "/gallery", ariaLabel: "View gallery" }
            ]
        }
    ];

    const pillars = [
        {
            title: "Distributed Innovation",
            desc: "Pushing the boundaries of campus engagement through decentralized event management.",
            icon: <Cpu className="text-accent-blue" />,
            border: "border-l-accent-blue"
        },
        {
            title: "Unified Ecosystem",
            desc: "One protocol for every student, every club, and every department at VIT.",
            icon: <Globe className="text-accent-violet" />,
            border: "border-l-accent-violet"
        },
        {
            title: "Instant Verification",
            desc: "Zero-latency registration and digital entry via secure QR tokens.",
            icon: <Zap className="text-accent-emerald" />,
            border: "border-l-accent-emerald"
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="mesh-bg" />
            <div className="noise-overlay" />

            <CardNav
                logo="/logo.png"
                logoAlt="Vishnu Hub Logo"
                items={navItems}
                baseColor="transparent"
                menuColor="var(--text-main)"
                buttonBgColor="var(--accent-violet)"
                buttonTextColor="#fff"
                ease="power4.out"
                theme="dark"
            />

            <main className="container mx-auto pt-40 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center mb-24 text-center"
                    >
                        <div className="cyber-hud-label mb-4 px-4 py-2 border border-border-main/10 rounded-full">
                            /SYSTEM/CORE/MISSION_INFO
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-text-main uppercase mb-8">
                            THE <span className="text-gradient">OBJECTIVE.</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-xl leading-relaxed uppercase tracking-tight">
                            Vishnu Hub is the centralized digital protocol designed to architect,
                            manage, and archive the vibrant ecosystem of student innovation at
                            the Vishnu Institute of Technology.
                        </p>
                    </motion.div>

                    {/* Mission Core Section */}
                    <div className="grid md:grid-cols-2 gap-12 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="cyber-panel p-12 bg-card-bg/20 border-accent-blue/30"
                        >
                            <Target className="text-accent-blue mb-8" size={40} />
                            <h2 className="text-3xl font-black mb-6 text-text-main uppercase tracking-tighter">OUR_PROTOCOL</h2>
                            <p className="text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
                                To eliminate fragmentation in campus interactions. We provide a single,
                                high-fidelity platform where ideas meet execution and events become
                                lasting digital achievements.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="cyber-panel p-12 bg-accent-violet/5 border-accent-violet/30"
                        >
                            <Shield className="text-accent-violet mb-8" size={40} />
                            <h2 className="text-3xl font-black mb-6 text-text-main uppercase tracking-tighter">SECURE_SYNC</h2>
                            <p className="text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
                                Built on the core values of integrity and transparency, ensuring every
                                registration, certificate, and interaction is authenticated and
                                persistent within the university node.
                            </p>
                        </motion.div>
                    </div>

                    {/* Pillars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`cyber-panel p-8 bg-transparent border-t-0 border-r-0 border-b-0 border-l-4 ${item.border} hover:bg-card-bg/10 transition-all`}
                            >
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-xl font-black mb-4 text-text-main uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-slate-500 font-medium text-xs leading-relaxed uppercase tracking-widest">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Technical Stack Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-40 p-12 cyber-panel bg-card-bg/10 border-dashed border-border-main/20"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <Activity size={20} className="text-accent-emerald animate-pulse" />
                            <span className="cyber-hud-label">INFRASTRUCTURE_METRICS_V5.0</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            {[
                                { val: "100ms", label: "RESPONSE_TIME" },
                                { val: "256-BIT", label: "ENCRYPTION" },
                                { val: "CLOUD", label: "SYNC_STATUS" },
                                { val: "STABLE", label: "SYSTEM_VERSION" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-black text-text-main mb-2">{stat.val}</div>
                                    <div className="cyber-hud-label text-[8px]">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-24 bg-bg-main border-t border-border-main/10 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-12">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-gradient">HUB!!</span></span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] gap-8">
                        <p>&copy; 2026 VISHNU_INSTITUTE_TECHNOLOGY. BHIMAVARAM.</p>
                        <p>PROTOCOL_VERSION_5.0.2</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

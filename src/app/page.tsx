"use client";

import { motion } from "framer-motion";
import {
    Rocket, Sparkles, Users, Calendar,
    ArrowRight, Zap, Award, Search,
    Cpu, Globe, Shield, Activity
} from "lucide-react";
import CardNav, { CardNavItem } from "./components/CardNav";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import Link from "next/link";

export default function VishnuHubHome() {
    const navItems: CardNavItem[] = [
        {
            label: "Explore",
            bgColor: "#0a0a0a",
            textColor: "#fff",
            links: [
                { label: "Events", href: "/events", ariaLabel: "Browse events" },
                { label: "Community", href: "/clubs", ariaLabel: "Join clubs" }
            ]
        },
        {
            label: "Systems",
            bgColor: "#111",
            textColor: "#fff",
            links: [
                { label: "About", href: "/about", ariaLabel: "About us" },
                { label: "Team", href: "/team", ariaLabel: "View team" }
            ]
        },
        {
            label: "Connect",
            bgColor: "#1a1a1a",
            textColor: "#fff",
            links: [
                { label: "Email", href: "mailto:support@vishnu.edu.in", ariaLabel: "Email support" },
                { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn" }
            ]
        }
    ];

    const events = [
        {
            title: "NEO_GEN HACKATHON",
            description: "24-hour sprint focused on AI and decentralized systems. Build the next layer of innovation.",
            date: "OCT 15, 2026",
            image: "/cyber_hackathon_hero_1773841404818.png", // Corrected path assuming it will be served
            category: "PROTOCAL_DEV",
            color: "accent-blue"
        },
        {
            title: "ROBOTICS_LAB_V5",
            description: "Advanced workshop on humanoid robotics and neural network integration.",
            date: "NOV 02, 2026",
            image: "/ai_robotics_lab_futuristic_1773841584985.png",
            category: "HARDWARE_SYNTH",
            color: "accent-emerald"
        },
        {
            title: "CULTURAL_FUSION",
            description: "High-energy festival blending traditional spirit with futuristic digital art.",
            date: "DEC 20, 2026",
            image: "/cyber_cultural_festival_1773841515665.png",
            category: "SOCIAL_NETWORK",
            color: "accent-rose"
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

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 container mx-auto">
                <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="cyber-hud-label flex items-center gap-2">
                                <Activity size={12} className="text-accent-emerald animate-pulse" /> SYSTEM_ONLINE
                            </span>
                            <div className="h-px w-12 bg-border-main" />
                            <span className="cyber-hud-label">V.5.0.2_STABLE</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-tight text-text-main">
                            VISHNU <span className="text-gradient">HUB!!</span>
                        </h1>

                        <p className="text-lg md:text-xl font-medium text-slate-500 max-w-2xl mx-auto mb-12 uppercase tracking-tight">
                            Centralized Event & Innovation Protocol for the Next Generation of Students.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/events" className="btn-premium flex items-center gap-3">
                                <Search size={18} /> INITIALIZE_EXPLORATION
                            </Link>
                            <Link href="/register" className="cyber-panel px-10 py-4 font-black text-xs uppercase tracking-widest border-2 border-border-main/20 hover:border-accent-violet/50 transition-all flex items-center gap-3 group bg-transparent">
                                JOIN_NETWORK <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating HUD Elements */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden xl:block">
                        <div className="cyber-panel p-6 flex flex-col gap-6 scale-90 border-l-4 border-l-accent-blue">
                            {[
                                { icon: <Globe size={16} />, val: "100+", label: "NODES" },
                                { icon: <Users size={16} />, val: "2.4K", label: "USERS" },
                                { icon: <Shield size={16} />, val: "SECURE", label: "AUTH" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="cyber-hud-label mb-1">{stat.label}</span>
                                    <div className="flex items-center gap-2 text-text-main">
                                        {stat.icon} <span className="font-mono font-bold tracking-tighter">{stat.val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hero Feature Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="mt-24 relative max-w-6xl mx-auto"
                >
                    <div className="cyber-panel p-2 shadow-[0_0_50px_rgba(124,58,237,0.15)] bg-card-bg/30">
                        <img
                            src="/cyber_hackathon_hero_1773841404818.png"
                            alt="Cyber Hackathon Hero"
                            className="rounded-[1.5rem] w-full h-[500px] object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent" />
                    </div>
                </motion.div>
            </section>

            {/* Scrolling Events Section */}
            <section className="py-24 relative z-10 overflow-hidden" id="events">
                <div className="container mx-auto px-6 mb-20 flex flex-col items-center">
                    <div className="cyber-hud-label mb-4 px-4 py-2 border border-border-main/10 rounded-full">
                        /SYSTEM/DATA/UPCOMING_PROTOCOLS
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-center tracking-tighter text-text-main uppercase">
                        SCHEDULED <span className="italic font-serif opacity-40">DEPLOYMENTS</span>
                    </h2>
                </div>

                <ScrollStack useWindowScroll={true}>
                    {events.map((event, i) => (
                        <ScrollStackItem key={i} itemClassName="cyber-panel p-0 bg-transparent overflow-hidden">
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="relative group">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-bg-main/80 to-transparent md:hidden" />
                                    <div className="absolute top-8 left-8">
                                        <span className="cyber-hud-label bg-accent-violet text-white px-3 py-1 rounded-sm">{event.date}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-12 relative">
                                    <div className="cyber-hud-label mb-6 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-${event.color}`} />
                                        STATUS: ACTIVE_SYNC
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase text-text-main">
                                        {event.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed uppercase tracking-tight">
                                        {event.description}
                                    </p>
                                    <div className="mt-auto">
                                        <button className="px-8 py-4 rounded-xl border-2 border-border-main/20 hover:border-accent-violet transition-all font-black text-xs uppercase tracking-[0.2em] text-text-main">
                                            ACCESS_PROTOCOL
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </section>

            {/* Tech Stack / Integration Section */}
            <section className="py-32 bg-bg-main relative">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="cyber-hud-label bg-accent-blue/10 text-accent-blue px-4 py-2 w-fit mb-8 rounded-lg">
                            INFRASTRUCTURE v5.0.2
                        </div>
                        <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight text-text-main uppercase">
                            POWERING THE <br /><span className="text-accent-blue">CAMPUS NODES.</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { icon: <Cpu />, title: "Distributed Compute", text: "Optimized response cycles for 10k+ concurrent users." },
                                { icon: <Shield />, title: "Quantum Security", text: "End-to-end encryption for all registration protocols." },
                                { icon: <Zap />, title: "Instant Sync", text: "Real-time updates across the global community stack." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 cyber-panel border-r-4 border-r-accent-blue/40 bg-transparent hover:bg-card-bg/20 transition-all">
                                    <div className="text-accent-blue">{item.icon}</div>
                                    <div>
                                        <h4 className="font-black text-lg text-text-main mb-1 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="cyber-panel p-2 shadow-[0_0_80px_rgba(0,112,243,0.1)]">
                            <img src="/ai_robotics_lab_futuristic_1773841584985.png" alt="Tech" className="rounded-[1.5rem]" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 hidden xl:block">
                            <div className="cyber-panel p-8 bg-accent-blue text-white shadow-2xl">
                                <span className="text-4xl font-black font-mono">99.9%</span>
                                <p className="cyber-hud-label text-white/80 mt-2">UPTIME_PROTOCOL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 bg-bg-main border-t border-border-main/10 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-border-main/10 pb-20 mb-20">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-gradient">HUB!!</span></span>
                        <div className="flex gap-12 font-mono text-[10px] items-center">
                            <Link href="/about" className="hover:text-accent-violet transition-all uppercase tracking-widest">/ABOUT</Link>
                            <Link href="/events" className="hover:text-accent-violet transition-all uppercase tracking-widest">/EVENTS</Link>
                            <Link href="/team" className="hover:text-accent-violet transition-all uppercase tracking-widest">/TEAM</Link>
                            <Link href="/gallery" className="hover:text-accent-violet transition-all uppercase tracking-widest">/GALLERY</Link>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-[0.4em]">
                        <p>&copy; 2026 VISHNU_INSTITUTE. ALL_DATA_SECURED.</p>
                        <p>POWERED_BY_ADVANCED_ENGINEERING</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

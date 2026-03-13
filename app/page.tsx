"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Rocket, Users, Calendar } from "lucide-react";
import Navbar from "./components/Navbar";
import Discovery from "./components/Discovery";
import Experience from "./components/Experience";
import DashboardPreview from "./components/DashboardPreview";
import TicketPass from "./components/TicketPass";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* Hero Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-bold mb-6">
                                    <Sparkles size={16} />
                                    <span>The Future of Campus Events</span>
                                </div>
                                <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter">
                                    Build <span className="text-gradient">unforgettable</span> <br />
                                    campus events.
                                </h1>
                                <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                                    The most advanced event management platform designed for Vishnu Institute of Technology.
                                    Streamline discovery, registration, and attendance with futuristic tools.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <button className="btn-premium flex items-center justify-center gap-2">
                                        Explore Events <Rocket size={20} />
                                    </button>
                                    <button className="px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                        Watch Demo <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Hero Card / Interactive Element */}
                        <div className="flex-1 w-full max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="glass-card p-8 rounded-[2.5rem] relative"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-violet/20 blur-[60px] animate-pulse-glow" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/20 blur-[60px] animate-pulse-glow" />

                                <h3 className="text-2xl font-bold mb-6">Quick Registration</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Roll Number</label>
                                        <input type="text" placeholder="20PA1A05XX" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent-blue/50 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                        <input type="email" placeholder="name@vishnu.edu.in" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent-blue/50 outline-none transition-all" />
                                    </div>
                                    <button className="w-full py-4 bg-white text-primary font-black rounded-2xl hover:bg-slate-200 transition-all mt-4">
                                        Join the Experience
                                    </button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold">ACTIVE USERS</p>
                                            <p className="text-sm font-black">2.4k+</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center text-accent-violet">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold">TOTAL EVENTS</p>
                                            <p className="text-sm font-black">150+</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* Floating background shapes */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-blue/10 blur-[100px] rounded-full"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full"
                />
            </section>

            {/* Trust Bar */}
            <section className="py-10 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale contrast-125">
                        {/* Mock logos or university sub-brands */}
                        <span className="text-xl font-black italic">VIT-BHIMAVARAM</span>
                        <span className="text-xl font-black italic">SVES</span>
                        <span className="text-xl font-black italic">IEEE STUDENT BRANCH</span>
                        <span className="text-xl font-black italic">CSI VISHNU</span>
                        <span className="text-xl font-black italic">ACN CLUB</span>
                    </div>
                </div>
            </section>

            <Discovery />
            <Experience />
            <DashboardPreview />

            {/* Footer / CTA */}
            <section className="py-24 px-6 bg-gradient-to-b from-primary to-black">
                <div className="container mx-auto text-center glass-card p-16 rounded-[4rem] border border-white/5">
                    <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">Ready to <span className="text-gradient">transform</span> <br /> your campus life?</h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-bold">Join thousands of students and organizers already building the future of VIT events.</p>
                    <button className="btn-premium">Create Your Account Now</button>
                </div>
                <div className="mt-20 text-center text-slate-600 text-sm font-bold">
                    &copy; 2026 Vishnu Institute of Technology. Built with &hearts; for the student community.
                </div>
            </section>
        </main>
    );
}

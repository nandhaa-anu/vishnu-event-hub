"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Globe, Cpu, Users, Zap } from "lucide-react";
import CardNav, { CardNavItem } from "../components/CardNav";
import Link from "next/link";

export default function TeamPage() {
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
            label: "Systems",
            bgColor: "#111",
            textColor: "#fff",
            links: [
                { label: "About", href: "/about", ariaLabel: "About us" },
                { label: "Gallery", href: "/gallery", ariaLabel: "View gallery" }
            ]
        }
    ];

    const team = [
        {
            name: "Dr. Vishnu Prasad",
            role: "DIRECTOR_PROTOCOL",
            bio: "Strategic oversight and architectural lead for the Vishnu Hub ecosystem.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vishnu",
            color: "accent-blue",
            socials: { linkedin: "#", mail: "#" }
        },
        {
            name: "Ananya Sharma",
            role: "CORE_LEAD_DEV",
            bio: "Expert in distributed systems and high-fidelity frontend engineering.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
            color: "accent-violet",
            socials: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Rahul Varma",
            role: "SYSTEM_ARCHITECT",
            bio: "Building the backbone of real-time event synchronization and security.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
            color: "accent-rose",
            socials: { github: "#", linkedin: "#" }
        },
        {
            name: "Priya Das",
            role: "UI_UX_DESIGNER",
            bio: "Defining the Cyber-Premium aesthetic and user interaction flows.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
            color: "accent-emerald",
            socials: { dribbble: "#", linkedin: "#" }
        },
        {
            name: "Karthik Raja",
            role: "EVENT_COORDINATOR",
            bio: "Managing the intersection of physical and digital campus interactions.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik",
            color: "accent-blue",
            socials: { linkedin: "#", mail: "#" }
        },
        {
            name: "Sneha Reddy",
            role: "COMMUNITY_OPS",
            bio: "Scaling the student network nodes across all campus departments.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
            color: "accent-violet",
            socials: { linkedin: "#", twitter: "#" }
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

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
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center mb-24"
                >
                    <div className="cyber-hud-label mb-4 px-4 py-2 border border-border-main/10 rounded-full">
                        /SYSTEM/NODES/CORE_TEAM
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-center tracking-tighter text-text-main uppercase">
                        CENTRAL <span className="text-gradient">ENGINEERS.</span>
                    </h1>
                    <p className="mt-8 text-slate-500 font-medium text-lg max-w-2xl text-center uppercase tracking-tight">
                        The multidisciplinary team architecting the future of campus interactions and digital student life.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="cyber-panel p-0 bg-transparent relative group"
                        >
                            <div className="p-8 pb-0">
                                <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-3xl border-2 border-border-main/10">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 to-transparent" />

                                    {/* HUD Elements on Hover */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
                                                <Cpu size={14} className="text-white" />
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
                                                <Zap size={14} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 pb-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full bg-${member.color}`} />
                                    <span className="cyber-hud-label">{member.role}</span>
                                </div>
                                <h3 className="text-3xl font-black mb-4 tracking-tighter text-text-main uppercase">
                                    {member.name}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 uppercase tracking-tight">
                                    {member.bio}
                                </p>

                                <div className="flex gap-4">
                                    {Object.entries(member.socials).map(([platform, link], idx) => (
                                        <Link
                                            key={idx}
                                            href={link}
                                            className="p-3 cyber-panel rounded-xl border-border-main/20 hover:bg-accent-violet hover:text-white transition-all scale-90"
                                        >
                                            {platform === 'github' && <Github size={16} />}
                                            {platform === 'linkedin' && <Linkedin size={16} />}
                                            {platform === 'twitter' && <Twitter size={16} />}
                                            {platform === 'mail' && <Mail size={16} />}
                                            {platform === 'dribbble' && <Globe size={16} />}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* System Stats Footer */}
                <div className="mt-40 pt-20 border-t border-border-main/10 grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="cyber-hud-label mb-2">UPTIME_LAST_24H</div>
                        <div className="text-4xl font-black text-accent-emerald">99.99%</div>
                    </div>
                    <div>
                        <div className="cyber-hud-label mb-2">COMMITS_DEPLOYED</div>
                        <div className="text-4xl font-black text-accent-blue">12.4K</div>
                    </div>
                    <div>
                        <div className="cyber-hud-label mb-2">NODES_MAINTAINED</div>
                        <div className="text-4xl font-black text-accent-violet">42</div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-24 bg-bg-main border-t border-border-main/10 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-12">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-gradient">HUB!!</span></span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] gap-8">
                        <p>&copy; 2026 VISHNU_INSTITUTE. ALL_DATA_SECURED.</p>
                        <p>INTEGRITY. INNOVATION. IMPACT.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

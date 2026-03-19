"use client";

import { motion } from "framer-motion";
import CardNav, { CardNavItem } from "../components/CardNav";
import Discovery from "../components/Discovery";

export default function EventsPage() {
    const navItems: CardNavItem[] = [
        {
            label: "Explore",
            bgColor: "#0a0a0a",
            textColor: "#fff",
            links: [
                { label: "Home", href: "/", ariaLabel: "Go home" },
                { label: "Gallery", href: "/gallery", ariaLabel: "View gallery" }
            ]
        },
        {
            label: "People",
            bgColor: "#111",
            textColor: "#fff",
            links: [
                { label: "Team", href: "/team", ariaLabel: "Meet the team" },
                { label: "About", href: "/about", ariaLabel: "About us" }
            ]
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

            <main className="pt-40 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-6 mb-12"
                >
                    <div className="cyber-hud-label mb-4 px-4 py-2 border border-border-main/10 rounded-full inline-block">
                        /SYSTEM/CORE/EVENT_DISCOVERY
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-text-main uppercase">
                        ACTIVE <span className="text-gradient">NODES.</span>
                    </h1>
                </motion.div>

                <Discovery />
            </main>

            {/* Footer */}
            <footer className="py-24 bg-bg-main border-t border-border-main/10 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-12">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-gradient">HUB!!</span></span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] gap-8">
                        <p>&copy; 2026 VISHNU_INSTITUTE. DATA_VERIFIED.</p>
                        <p>BHIMAVARAM_CAMPUS_NODE</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

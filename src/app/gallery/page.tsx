"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Camera, Calendar, MapPin, Search } from "lucide-react";
import CardNav, { CardNavItem } from "../components/CardNav";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                { label: "Clubs", href: "/clubs", ariaLabel: "View clubs" }
            ]
        }
    ];

    const photos = [
        {
            src: "/cyber_hackathon_hero_1773841404818.png",
            title: "NEO_GEN HACKATHON 2026",
            tag: "INNOVATION",
            span: "md:col-span-2 md:row-span-2"
        },
        {
            src: "/ai_robotics_lab_futuristic_1773841584985.png",
            title: "ROBOTICS_LAB_V5",
            tag: "HARDWARE",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/cyber_cultural_festival_1773841515665.png",
            title: "CULTURAL_FUSION_V3",
            tag: "CULTURE",
            span: "md:col-span-1 md:row-span-2"
        },
        {
            src: "/buzz_hub_events_section_1773650840583.png",
            title: "SYSTEM_LAUNCH_EVENT",
            tag: "DEPLOYMENT",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/buzz_hub_hero_section_1773650817224.png",
            title: "CORE_VISUAL_STACK",
            tag: "DESIGN",
            span: "md:col-span-2 md:row-span-1"
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-24"
                >
                    <div className="cyber-hud-label mb-4 px-4 py-2 border border-border-main/10 rounded-full">
                        /SYSTEM/ARCHIVE/VISUAL_DATA
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-center tracking-tighter text-text-main uppercase">
                        EVENT <span className="text-gradient">CHRONICLES.</span>
                    </h1>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
                >
                    {photos.map((photo, i) => (
                        <motion.div
                            key={i}
                            layoutId={`image-${photo.src}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`cyber-panel p-0 bg-transparent relative group cursor-pointer overflow-hidden ${photo.span}`}
                            onClick={() => setSelectedImage(photo.src)}
                        >
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                                <span className="cyber-hud-label text-accent-emerald mb-1 block">{photo.tag}</span>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{photo.title}</h3>
                            </div>

                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                    <Maximize2 size={18} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            layoutId={`image-${selectedImage}`}
                            className="relative max-w-6xl w-full h-full flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(124,58,237,0.3)]"
                            />

                            <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                                        {photos.find(p => p.src === selectedImage)?.title}
                                    </h2>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-[0.2em]">
                                            <Camera size={12} /> SONY_ALPHA_A7R
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-[0.2em]">
                                            <Calendar size={12} /> OCT_15_2026
                                        </div>
                                    </div>
                                </div>
                                <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-accent-violet hover:text-white transition-all">
                                    DOWNLOAD_RESOURCE
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-24 bg-bg-main border-t border-border-main/10 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-12">
                        <span className="text-4xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-gradient">HUB!!</span></span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] gap-8">
                        <p>&copy; 2026 VISHNU_INSTITUTE. ALL_DATA_SECURED. VISUAL_LICENSE_ACTIVE.</p>
                        <p>POWERED_BY_ADVANCED_ENGINEERING</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

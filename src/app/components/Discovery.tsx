"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Search, Filter, Shield, Zap, Globe, Cpu, Activity } from "lucide-react";

interface Event {
    id: number;
    title: string;
    date: string;
    venue: string;
    category: string;
    image: string;
    color: string;
}

const events: Event[] = [
    {
        id: 1,
        title: "NEO_GEN HACKATHON 2026",
        date: "Oct 15, 2026",
        venue: "Main Auditorium, Block A",
        category: "COMPETITION",
        image: "/cyber_hackathon_hero_1773841404818.png",
        color: "accent-blue"
    },
    {
        id: 2,
        title: "AI & FUTURE WORKSHOP",
        date: "Nov 02, 2026",
        venue: "Seminar Hall, IT Block",
        category: "WORKSHOP",
        image: "/ai_robotics_lab_futuristic_1773841584985.png",
        color: "accent-violet"
    },
    {
        id: 3,
        title: "CULTURAL FUSION NIGHT",
        date: "Dec 20, 2026",
        venue: "Open Air Theater",
        category: "ENTERTAINMENT",
        image: "/cyber_cultural_festival_1773841515665.png",
        color: "accent-rose"
    },
    {
        id: 4,
        title: "ROBOTICS_LAB_V5",
        date: "Nov 12, 2026",
        venue: "Robotics Hub",
        category: "WORKSHOP",
        image: "/buzz_hub_events_section_1773650840480.png", // Fallback placeholder
        color: "accent-emerald"
    },
    {
        id: 5,
        title: "STARTUP_BOOTCAMP",
        date: "Jan 10, 2027",
        venue: "Innovation Center",
        category: "SEMINAR",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800",
        color: "accent-blue"
    }
];

const categories = ["ALL", "COMPETITION", "WORKSHOP", "ENTERTAINMENT", "SEMINAR"];

const Discovery = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "ALL" || event.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <section className="py-12 px-6">
            <div className="container mx-auto">
                {/* Search & Filter Header */}
                <div className="flex flex-col gap-12 mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="relative w-full max-w-xl group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-accent-violet transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="SEARCH_EVENT_PROTOCOLS..."
                                className="w-full bg-card-bg/10 border-2 border-border-main/20 rounded-2xl py-5 pl-14 pr-6 font-mono text-xs uppercase tracking-widest text-text-main focus:border-accent-violet/50 outline-none transition-all placeholder:text-slate-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? "bg-accent-violet text-white shadow-lg"
                                        : "bg-card-bg/20 border border-border-main/10 text-slate-500 hover:border-accent-violet/50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-border-main/10" />
                        <div className="cyber-hud-label flex items-center gap-2">
                            <Activity size={12} className="text-accent-emerald" />
                            {filteredEvents.length} PROTOCOLS_FOUND
                        </div>
                        <div className="h-px flex-1 bg-border-main/10" />
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="cyber-panel p-0 bg-transparent group border-border-main/10 hover:border-accent-violet/30 transition-all duration-500"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-80" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white uppercase tracking-[0.2em]">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-black mb-6 tracking-tighter text-text-main group-hover:text-accent-violet transition-colors uppercase">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <Calendar size={16} className="text-accent-blue" />
                                            <span className="font-mono text-[10px] uppercase tracking-widest">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <MapPin size={16} className="text-accent-violet" />
                                            <span className="font-mono text-[10px] uppercase tracking-widest">{event.venue}</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-xl border-2 border-border-main/20 group-hover:border-accent-violet group-hover:bg-accent-violet group-hover:text-white font-black text-xs uppercase tracking-widest transition-all">
                                        ACCESS_PROTOCOL
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredEvents.length === 0 && (
                    <div className="py-40 text-center">
                        <div className="cyber-hud-label opacity-20 text-4xl mb-4">NO_PROTOCOLS_FOUND</div>
                        <p className="text-slate-500 font-mono tracking-widest uppercase text-xs">RETRYING_CONNECTION_TO_CAMPUS_NODES...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Discovery;

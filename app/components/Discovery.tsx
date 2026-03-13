"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const events = [
    {
        id: 1,
        title: "TechNova Hackathon 2026",
        date: "Oct 15, 2026",
        venue: "Main Auditorium, Block A",
        category: "Competition",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "AI & Future Workshop",
        date: "Nov 02, 2026",
        venue: "Seminar Hall, IT Block",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Cultural Fusion Night",
        date: "Dec 20, 2026",
        venue: "Open Air Theater",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    }
];

const Discovery = () => {
    return (
        <section className="py-24 px-6 bg-primary">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-5xl font-black mb-4">Discover <span className="text-gradient">trending</span> events.</h2>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Stay ahead with the latest campus activities, from elite hackathons to cultural festivals.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-accent-blue font-bold hover:gap-4 transition-all">
                        See all events <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card rounded-[2rem] overflow-hidden group border border-white/5 hover:border-accent-blue/30 transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black text-white uppercase tracking-widest">
                                        {event.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-black mb-4 group-hover:text-accent-blue transition-colors">
                                    {event.title}
                                </h3>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                                        <Calendar size={18} className="text-accent-blue" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                                        <MapPin size={18} className="text-accent-violet" />
                                        <span>{event.venue}</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-primary font-black transition-all">
                                    Register Instantly
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Discovery;

"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Code, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { opportunityService } from "@/services/eventService";
import Navbar from "@/app/components/Navbar";

export default function OpportunityHub() {
    const [opportunities, setOpportunities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOpps = async () => {
            try {
                const data = await opportunityService.getOpportunities();
                setOpportunities(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOpps();
    }, []);

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'internship': return <Briefcase size={20} />;
            case 'hackathon': return <Code size={20} />;
            case 'competition': return <Trophy size={20} />;
            default: return <BookOpen size={20} />;
        }
    };

    return (
        <main className="min-h-screen pt-32 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold mb-6"
                    >
                        <Sparkles size={14} />
                        <span>Accelerator Program</span>
                    </motion.div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-6">Campus <span className="text-gradient">Opportunities.</span></h1>
                    <p className="text-slate-400 text-xl max-w-2xl font-bold">Discover internships, hackathons, and workshops tailored for VIT students.</p>
                </header>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card h-64 rounded-[2rem] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {opportunities.map((opp, i) => (
                            <motion.div
                                key={opp.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 rounded-[2.5rem] hover:border-accent-blue/50 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {getIcon(opp.type)}
                                </div>
                                <div className="mb-6 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-blue">
                                    {getIcon(opp.type)}
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{opp.type}</span>
                                <h3 className="text-2xl font-black mb-4 group-hover:text-accent-blue transition-colors">{opp.title}</h3>
                                <p className="text-slate-400 text-sm mb-8 font-bold line-clamp-2">{opp.description}</p>
                                <a
                                    href={opp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all"
                                >
                                    Apply Now <ExternalLink size={14} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

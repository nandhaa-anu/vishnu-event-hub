"use client";

import { motion } from "framer-motion";
import { Search, Send, Ticket, MessageSquare } from "lucide-react";

const steps = [
    {
        title: "Discover Events",
        desc: "Browse through a curated list of campus activities tailored to your interests.",
        icon: <Search size={32} />,
        color: "bg-blue-500",
    },
    {
        title: "Register Instantly",
        desc: "One-tap registration using your university credentials. No tedious forms.",
        icon: <Send size={32} />,
        color: "bg-violet-500",
    },
    {
        title: "Get QR Ticket",
        desc: "Receive a futuristic digital pass with a unique QR code for seamless entry.",
        icon: <Ticket size={32} />,
        color: "bg-pink-500",
    },
    {
        title: "Join Community",
        desc: "Get instant access to WhatsApp groups and connect with fellow participants.",
        icon: <MessageSquare size={32} />,
        color: "bg-amber-500",
    }
];

const Experience = () => {
    return (
        <section className="py-24 px-6 relative">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black mb-6">The <span className="text-gradient">seamless</span> experience.</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-bold">
                        Four simple steps to elevate your campus participation from ordinary to extraordinary.
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline connecting line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-transparent hidden lg:block" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                            >
                                <div className="flex-1 text-center lg:text-right">
                                    <div className={index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:text-left'}>
                                        <h3 className="text-3xl font-black mb-4">{step.title}</h3>
                                        <p className="text-slate-400 font-bold leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center text-white shadow-lg shadow-${step.color.split('-')[1]}-500/30 transform rotate-12 group-hover:rotate-0 transition-transform`}>
                                        {step.icon}
                                    </div>
                                </div>

                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

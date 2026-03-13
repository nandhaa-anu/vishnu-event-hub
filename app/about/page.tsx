"use client";

import Navbar from "../components/Navbar";
import { Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-40 px-6 container mx-auto text-center">
                <div className="w-20 h-20 rounded-3xl bg-accent-violet/10 flex items-center justify-center text-accent-violet mx-auto mb-8">
                    <Shield size={40} />
                </div>
                <h1 className="text-5xl font-black mb-6">About <span className="text-gradient">Vishnu Event Hub</span></h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 font-bold">
                    Our mission is to unify campus events and empower the student community through technology.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {[
                        { title: "Innovation", desc: "Pushing the boundaries of campus engagement." },
                        { title: "Inclusion", desc: "Every student, every club, one platform." },
                        { title: "Efficiency", desc: "Instant registration and digital entry." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5">
                            <h3 className="text-xl font-black mb-4">{item.title}</h3>
                            <p className="text-slate-400 text-sm font-bold">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

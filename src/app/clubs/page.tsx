"use client";

import Navbar from "../components/Navbar";
import { Building2 } from "lucide-react";

export default function ClubsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-40 px-6 container mx-auto text-center">
                <div className="w-20 h-20 rounded-3xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mx-auto mb-8">
                    <Building2 size={40} />
                </div>
                <h1 className="text-5xl font-black mb-6">Campus <span className="text-gradient">Clubs</span></h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 font-bold">
                    Explore the diverse student organizations at VIT Bhimavaram. This section is currently under development.
                </p>
                <div className="glass-card p-12 rounded-[3rem] border border-white/5 opacity-50">
                    <p className="text-xl font-black italic">CLUBS DATABASE COMING SOON</p>
                </div>
            </div>
        </main>
    );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles, Menu, Shield, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, role } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4 bg-primary/40 backdrop-blur-xl border-bottom border-white/5" : "py-8 bg-transparent"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                        <Shield size={22} fill="currentColor" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">VISHNU <span className="text-accent-blue">EVENT HUB</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {["Events", "Clubs", "About"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-bold text-slate-400 hover:text-white transition-colors relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link href={`/dashboard/${role}`} className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all">
                                <UserIcon size={16} /> Dashboard
                            </Link>
                            <button onClick={() => auth.signOut()} className="text-slate-400 hover:text-rose-500 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="px-6 py-2.5 rounded-full bg-white text-primary font-black text-sm hover:scale-105 transition-all active:scale-95">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white">
                    <Menu size={28} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

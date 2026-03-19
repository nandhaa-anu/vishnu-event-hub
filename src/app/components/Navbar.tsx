"use client";

import { motion } from "framer-motion";
import { Sparkles, Menu, Shield, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../../services/supabase";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, role } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4 bg-bg-main/60 backdrop-blur-xl border-b border-border-main/10" : "py-8 bg-transparent"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                        <Shield size={22} fill="currentColor" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-text-main uppercase">VISHNU <span className="text-accent-blue">HUB!!</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Events", "Clubs", "Opportunities", "About"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-text-main transition-colors relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    <div className="h-6 w-[1px] bg-border-main/10 mx-2" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl border-2 border-border-main shadow-[3px_3px_0px_0px_var(--border-main)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-card-bg text-text-main"
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link href={`/dashboard/${role}`} className="flex items-center gap-2 px-6 py-2.5 bg-text-main text-bg-main font-black text-[11px] uppercase tracking-widest border-2 border-text-main hover:bg-transparent hover:text-text-main transition-all">
                                <UserIcon size={16} /> Dashboard
                            </Link>
                            <button onClick={() => supabase.auth.signOut()} className="text-slate-500 hover:text-rose-500 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="px-8 py-3 bg-text-main text-bg-main font-black text-[11px] uppercase tracking-widest border-2 border-text-main hover:bg-transparent hover:text-text-main transition-all">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 text-text-main">
                        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                    </button>
                    <button className="text-text-main">
                        <Menu size={28} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

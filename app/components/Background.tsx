"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Particle = ({ delay }: { delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0, x: "50%", y: "50%" }}
        animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        }}
        transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay,
            ease: "linear",
        }}
        className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
    />
);

const FloatingShape = ({ color, size, delay }: { color: string, size: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
            opacity: [0, 0.3, 0],
            rotate: 360,
            x: [`${Math.random() * 20 - 10}%`, `${Math.random() * 20 - 10}%`],
            y: [`${Math.random() * 20 - 10}%`, `${Math.random() * 20 - 10}%`],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
        }}
        style={{ backgroundColor: color }}
        className={`absolute ${size} rounded-full blur-[80px] pointer-events-none`}
    />
);

export default function Background() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0F1A]">
            {/* Mesh Gradient Wrappers */}
            <div className="absolute inset-0">
                <FloatingShape color="#2563EB" size="w-[500px] h-[500px]" delay={0} />
                <FloatingShape color="#7C3AED" size="w-[600px] h-[600px]" delay={5} />
                <FloatingShape color="#F59E0B" size="w-[400px] h-[400px]" delay={10} />
            </div>

            {/* Grid Lines Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Particles */}
            {[...Array(30)].map((_, i) => (
                <Particle key={i} delay={i * 0.5} />
            ))}

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F1A]/50 to-[#0B0F1A]" />
        </div>
    );
}

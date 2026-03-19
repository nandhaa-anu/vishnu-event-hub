"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, XCircle, Search, RefreshCw } from "lucide-react";
import { eventService } from "@/services/eventService";
import { useAuth } from "../context/AuthContext";

const Scanner = () => {
    const { user } = useAuth();
    const [scanResult, setScanResult] = useState<any>(null);
    const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            /* verbose= */ false
        );

        scanner.render(
            (decodedText) => {
                handleScan(decodedText);
            },
            (error) => {
                // Ignore errors during scanning
            }
        );

        return () => {
            scanner.clear().catch(error => console.error("Failed to clear scanner", error));
        };
    }, []);

    const handleScan = async (data: string) => {
        setStatus("loading");
        try {
            const parsedData = JSON.parse(data);
            setScanResult(parsedData);

            if (!parsedData.ticketId) {
                throw new Error("Invalid ticket data");
            }

            // Mark Attendance using eventService (Supabase)
            // Note: In Supabase, the ticketId is a UUID from the tickets table
            if (user?.id) {
                await eventService.markAttendance(parsedData.ticketId, user.id);
            }

            setStatus("success");
            setMessage("Check-in successful.");

        } catch (e: any) {
            console.error(e);
            setStatus("error");
            setMessage(e.message || "Invalid QR code format or unable to reach database.");
        }
    };

    const resetScanner = () => {
        setScanResult(null);
        setStatus("idle");
        setMessage("");
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-2">Event <span className="text-gradient">Entrance</span></h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Scanner Terminal v1.0</p>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    {status === "idle" || status === "loading" ? (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 bg-primary/40 backdrop-blur-3xl aspect-[4/3] relative"
                        >
                            <div id="reader" className="w-full h-full scale-110 grayscale-[0.5] contrast-[1.2] invert-[0.9] opacity-80" />

                            {status === "loading" && (
                                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                                    <RefreshCw className="text-accent-blue animate-spin mb-4" size={40} />
                                    <p className="font-black text-xs tracking-widest text-white">VERIFYING TICKET...</p>
                                </div>
                            )}

                            {/* Corner Accents */}
                            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-accent-blue rounded-tl-2xl opacity-50" />
                            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-accent-blue rounded-tr-2xl opacity-50" />
                            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-accent-blue rounded-bl-2xl opacity-50" />
                            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-accent-blue rounded-br-2xl opacity-50" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`glass-card rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center text-center ${status === 'success' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                        >
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${status === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                                {status === "success" ? <CheckCircle size={40} /> : <XCircle size={40} />}
                            </div>

                            <h3 className={`text-2xl font-black mb-2 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {status === "success" ? "Access Granted" : "Access Denied"}
                            </h3>
                            <p className="text-slate-400 font-bold mb-8">{message}</p>

                            {scanResult && (
                                <div className="w-full bg-white/5 rounded-2xl p-6 text-left mb-8 border border-white/5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Student Roll</p>
                                            <p className="font-black text-sm">{scanResult.rollNo}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ticket ID</p>
                                            <p className="font-black text-sm">{scanResult.ticketId}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={resetScanner}
                                className="w-full py-5 rounded-2xl bg-white text-primary font-black flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
                            >
                                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                NEXT SCAN
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Scanner;

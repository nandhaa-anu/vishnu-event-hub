"use client";

import { motion } from "framer-motion";
import { Wifi, Cpu, ShieldCheck, Download, Share2 } from "lucide-react";
import QRCode from "react-qr-code";
import { useRef } from "react";
import html2canvas from "html2canvas";
import ElectricBorder from "./ElectricBorder";

interface TicketProps {
    name: string;
    rollNo: string;
    eventName: string;
    ticketId: string; // Full UUID for QR
    displayId?: string; // Short ID for UI
    eventId: string;
    date: string;
    venue: string;
}

const TicketPass = ({
    name = "Rohit Sharma",
    rollNo = "20PA1A0501",
    eventName = "TechNova Hackathon 2026",
    ticketId = "TKT-7782-X",
    displayId,
    eventId = "EVT-001",
    date = "March 25, 2026",
    venue = "Vishnu Central Auditorium"
}: TicketProps) => {
    const ticketRef = useRef<HTMLDivElement>(null);

    const downloadTicket = async () => {
        if (!ticketRef.current) return;
        const canvas = await html2canvas(ticketRef.current, {
            backgroundColor: "#0B0F1A",
            scale: 2,
        });
        const link = document.createElement("a");
        link.download = `Ticket_${name.replace(/\s+/g, "_")}_${eventName.replace(/\s+/g, "_")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const qrValue = JSON.stringify({
        ticketId,
        eventId,
        rollNo
    });

    return (
        <div className="flex flex-col items-center gap-8 py-10 px-6">
            <motion.div
                ref={ticketRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] relative group"
            >
                <ElectricBorder
                    color="#7df9ff"
                    speed={1}
                    chaos={0.12}
                    thickness={2}
                    borderRadius={40}
                    className="w-full"
                >
                    <div className="relative glass-card overflow-hidden flex flex-col bg-[#0B0F1A]/80 backdrop-blur-3xl border border-white/10">

                        {/* Ticket Top: Brand & Icon */}
                        <div className="p-8 pb-4 flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                                    <ShieldCheck size={20} />
                                </div>
                                <span className="text-xs font-black tracking-widest text-slate-400">V-PASS PRO</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Wifi size={20} className="text-accent-blue animate-pulse" />
                            </div>
                        </div>

                        {/* Ticket Content */}
                        <div className="px-8 py-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Participant</h4>
                            <p className="text-2xl font-black mb-6 text-white">{name}</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Roll Number</h4>
                                    <p className="text-sm font-black font-mono text-accent-blue">{rollNo}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Date</h4>
                                    <p className="text-sm font-black text-slate-300 uppercase">{date}</p>
                                </div>
                            </div>

                            <div className="py-6 border-y border-white/5 relative">
                                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0B0F1A]" />
                                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0B0F1A]" />
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event & Venue</h4>
                                <p className="text-base font-black text-gradient leading-tight mb-1">{eventName}</p>
                                <p className="text-[10px] font-bold text-slate-400 italic">{venue}</p>
                            </div>
                        </div>

                        {/* Ticket Bottom: QR Code */}
                        <div className="p-8 pt-6 bg-white/[0.02] flex flex-col items-center gap-6">
                            <div className="p-4 bg-white rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.2)] relative group/qr">
                                <div className="relative z-0">
                                    <QRCode
                                        value={qrValue}
                                        size={140}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-accent-blue/40 blur-[1px] z-10"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] mb-1 uppercase">Scan for entry</p>
                                <div className="flex items-center gap-2 text-[8px] font-mono text-slate-600">
                                    <Cpu size={10} />
                                    <span>TICKET ID: {displayId || ticketId}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ElectricBorder>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={downloadTicket}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black transition-all group"
                >
                    <Download size={16} className="text-accent-blue transition-transform group-hover:-translate-y-1" />
                    DOWNLOAD PASS
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black transition-all group">
                    <Share2 size={16} className="text-accent-violet transition-transform group-hover:scale-110" />
                    SHARE
                </button>
            </div>
        </div>
    );
};

export default TicketPass;

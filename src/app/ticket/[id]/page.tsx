"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventService } from "@/services/eventService";
import TicketPass from "../../components/TicketPass";
import { ArrowLeft, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TicketPage() {
    const params = useParams();
    const id = params?.id as string;
    const [ticketData, setTicketData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchTicket = async () => {
            if (!id) return;
            try {
                const data = await eventService.getTicketByRegistrationId(id as string);
                setTicketData(data);
            } catch (err: any) {
                console.error("Error fetching ticket:", err);
                setError("FAILED_TO_RETRIEVE_NODE_PASS. Data may be restricted or missing.");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="text-accent-blue animate-spin" size={40} />
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Decrypting_Secure_Pass...</p>
                </div>
            </div>
        );
    }

    if (error || !ticketData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main px-6">
                <div className="cyber-panel p-10 max-w-md text-center border-rose-500/20">
                    <ShieldAlert className="text-rose-500 mx-auto mb-6" size={48} />
                    <h2 className="text-2xl font-black mb-4 uppercase text-text-main">Access Denied</h2>
                    <p className="text-slate-500 font-mono text-xs mb-8 leading-relaxed">{error || "NO_TICKET_FOUND_FOR_SPECIFIED_REGISTRATION"}</p>
                    <Link href="/dashboard/student" className="btn-premium inline-flex items-center gap-2">
                        <ArrowLeft size={16} /> RETURN_TO_NODE
                    </Link>
                </div>
            </div>
        );
    }

    const { registrations } = ticketData;
    const { events: event, student } = registrations;

    return (
        <div className="min-h-screen bg-bg-main py-20 px-6 relative overflow-hidden">
            <div className="mesh-bg opacity-30" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/dashboard/student" className="flex items-center gap-3 text-slate-500 hover:text-text-main transition-all font-mono text-[10px] uppercase tracking-[0.3em]">
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div className="cyber-hud-label px-4 py-2 bg-accent-blue/10 text-accent-blue w-fit rounded-lg">
                            ENCRYPTED_ENTRY_PROTOCOL
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-text-main leading-none uppercase tracking-tighter">
                            YOUR DIGITAL <br /><span className="text-gradient">NETWORK_PASS.</span>
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium uppercase tracking-tight">
                            Present this encrypted QR code at the event entrance for secure biometric validation and node check-in.
                        </p>

                        <div className="p-8 cyber-panel border-l-4 border-l-accent-emerald bg-card-bg/20">
                            <h4 className="font-black text-xs uppercase tracking-widest text-emerald-500 mb-2">Security Note</h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-mono">
                                This pass is uniquely bound to your Student ID ({student.roll_number}). Unauthorized duplication or sharing will result in session termination.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <TicketPass
                            name={student.name}
                            rollNo={student.roll_number}
                            eventName={event.title}
                            ticketId={ticketData.id}
                            displayId={ticketData.id.slice(0, 13).toUpperCase()}
                            eventId={event.id}
                            date={new Date(event.date).toLocaleDateString()}
                            venue={event.venue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

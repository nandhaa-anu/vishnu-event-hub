"use client";

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { motion } from "framer-motion";
import {
    Rocket, Calendar, Ticket as TicketIcon, User,
    LogOut, Sparkles, Compass, Wallet, MapPin, Navigation
} from "lucide-react";
import Link from "next/link";
import TicketPass from "../../components/TicketPass";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EventMap from "../../components/EventMap";

export default function StudentDashboard() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            if (!user) return;
            try {
                // Fetch user document to get rollNumber
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                const userData = userDocSnap.data();

                if (userData && userData.rollNumber) {
                    const ticketsQuery = query(
                        collection(db, "tickets"),
                        where("rollNumber", "==", userData.rollNumber)
                    );
                    const ticketSnap = await getDocs(ticketsQuery);

                    const fetchedTickets = await Promise.all(ticketSnap.docs.map(async (tDoc) => {
                        const tData = tDoc.data();

                        // Fetch associated event details for venue and date
                        const eventDocRef = doc(db, "events", tData.eventId);
                        const eventDocSnap = await getDoc(eventDocRef);
                        const eventData = eventDocSnap.exists() ? eventDocSnap.data() : null;

                        return {
                            id: tDoc.id,
                            ...tData,
                            eventName: eventData?.eventName || "Unknown Event",
                            eventDate: eventData?.date || "TBD",
                            venue: eventData?.venue || "TBD",
                            latitude: eventData?.latitude,
                            longitude: eventData?.longitude,
                            googleMapsLink: eventData?.googleMapsLink
                        };
                    }));

                    setTickets(fetchedTickets);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [user]);

    return (
        <ProtectedRoute allowedRole="student">
            <div className="min-h-screen bg-primary flex overflow-hidden">
                <div className="mesh-bg" />

                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 flex flex-col p-8 bg-primary/40 backdrop-blur-xl shrink-0 hidden lg:flex">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white">
                            <Rocket size={22} fill="currentColor" />
                        </div>
                        <span className="text-lg font-black tracking-tighter">VISHNU <span className="text-accent-blue">HUB</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {[
                            { icon: <Compass size={20} />, label: "Discover", active: true },
                            { icon: <Wallet size={20} />, label: "My Wallet" },
                            { icon: <Calendar size={20} />, label: "Schedule" },
                            { icon: <User size={20} />, label: "Profile" }
                        ].map((item, i) => (
                            <Link key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => auth.signOut()}
                        className="flex items-center gap-4 p-4 text-rose-500 font-bold hover:bg-rose-500/10 rounded-2xl transition-all text-left"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-10">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Hello, <span className="text-gradient">{user?.displayName || "Student"}.</span></h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Student Dashboard | Campus Access</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-accent-blue shadow-lg">
                                <Sparkles size={24} />
                            </div>
                        </div>
                    </header>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Wallet Preview */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="flex justify-between items-end mb-8">
                                    <h2 className="text-2xl font-black">Elite Pass <span className="text-slate-500">Wallet</span></h2>
                                    <button className="text-accent-blue font-bold text-sm hover:underline">View All Tickets</button>
                                </div>
                                {loading ? (
                                    <div className="w-full h-40 glass-card rounded-[2.5rem] flex flex-col items-center justify-center border border-white/5 animate-pulse">
                                        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-accent-blue animate-spin mb-4" />
                                        <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Syncing Wallet...</p>
                                    </div>
                                ) : tickets.length > 0 ? (
                                    tickets.map(ticket => (
                                        <div key={ticket.id} className="mb-12">
                                            <TicketPass
                                                name={ticket.studentName}
                                                rollNo={ticket.rollNumber}
                                                eventName={ticket.eventName}
                                                ticketId={ticket.ticketId}
                                                eventId={ticket.eventId}
                                                date={ticket.eventDate}
                                                venue={ticket.venue}
                                            />
                                            {/* Render Event Map if coordinates exist */}
                                            {ticket.latitude && ticket.longitude && (
                                                <div className="flex justify-center -mt-4">
                                                    <EventMap
                                                        venue={ticket.venue}
                                                        lat={ticket.latitude}
                                                        lng={ticket.longitude}
                                                        googleMapsLink={ticket.googleMapsLink}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full py-20 glass-card rounded-[2.5rem] flex flex-col items-center justify-center border border-white/5 text-center px-6">
                                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-600 mb-6">
                                            <TicketIcon size={32} />
                                        </div>
                                        <h3 className="text-xl font-black mb-2">No Active Passes</h3>
                                        <p className="text-slate-500 font-bold mb-8">You haven't registered for any upcoming events yet.</p>
                                        <Link href="/events" className="btn-premium py-4 text-xs tracking-widest uppercase">
                                            Explore Events
                                        </Link>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right Column: Recommendations & Activity */}
                        <div className="space-y-12">
                            <section className="glass-card p-8 rounded-[3rem] border border-white/5">
                                <h3 className="text-xl font-black mb-6">Upcoming Near You</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "AI Workshop", time: "Tomorrow, 10:00 AM", cat: "TECHNICAL" },
                                        { title: "Music Fest", time: "Friday, 06:00 PM", cat: "CULTURAL" }
                                    ].map((rec, i) => (
                                        <div key={i} className="flex gap-4 group cursor-pointer">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-blue group-hover:scale-110 transition-all font-black shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="font-black group-hover:text-accent-blue transition-colors">{rec.title}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{rec.time}</p>
                                                <span className="text-[8px] font-black text-accent-blue/60 tracking-widest uppercase">{rec.cat}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-10 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-blue/30 transition-all font-black text-xs uppercase tracking-widest">
                                    Discover More
                                </button>
                            </section>

                            <section className="glass-card p-8 rounded-[3rem] border border-white/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <Calendar className="text-accent-violet" size={20} />
                                    <h3 className="text-xl font-black">Your Schedule</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { date: "15 OCT", event: "TechNova v2.0", type: "Competition" },
                                        { date: "18 OCT", event: "Cloud Career Talk", type: "Seminar" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                            <div className="text-center font-black">
                                                <p className="text-lg leading-none">{item.date.split(' ')[0]}</p>
                                                <p className="text-[8px] text-accent-blue">{item.date.split(' ')[1]}</p>
                                            </div>
                                            <div className="flex-1 px-4">
                                                <p className="text-xs font-black">{item.event}</p>
                                                <p className="text-[10px] text-slate-500 font-bold">{item.type}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

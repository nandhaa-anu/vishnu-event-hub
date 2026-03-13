"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

interface EventMapProps {
    venue: string;
    lat: number;
    lng: number;
    googleMapsLink?: string;
}

const EventMap = ({
    venue = "Vishnu Central Auditorium",
    lat = 16.5684, // Example coordinates for Bhimavaram 영역
    lng = 81.5234,
    googleMapsLink = "https://www.google.com/maps/search/?api=1&query=16.5684,81.5234"
}: EventMapProps) => {

    // Google Maps Embed URL
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${lat},${lng}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px] mt-8"
        >
            <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 bg-primary/40 backdrop-blur-xl">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-accent-blue" size={20} />
                            <h3 className="font-black text-sm tracking-widest uppercase">Event Venue</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full">{venue}</span>
                    </div>

                    {/* Map Preview */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                        <iframe
                            title="Event Location"
                            className="w-full h-full grayscale-[0.8] contrast-[1.2] invert-[0.9] opacity-80"
                            src={`https://www.google.com/maps?q=${lat},${lng}&output=embed&z=15`}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>

                        {/* Overlay to catch clicks and open in real maps */}
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                                href={googleMapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"
                            >
                                <Navigation size={14} />
                                MAPS VIEW
                            </a>
                        </div>
                    </div>

                    <div className="mt-6">
                        <a
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            OPEN IN GOOGLE MAPS
                            <ExternalLink size={14} className="text-accent-blue" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventMap;

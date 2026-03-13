"use client";

import Navbar from "../components/Navbar";
import Discovery from "../components/Discovery";

export default function EventsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20">
                <Discovery />
            </div>
        </main>
    );
}

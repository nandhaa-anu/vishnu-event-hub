"use client";

import { useAuth } from "../../../context/AuthContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Scanner from "../../../components/Scanner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ScannerPage() {
    return (
        <ProtectedRoute allowedRole="organizer">
            <div className="min-h-screen bg-primary p-10">
                <Link href="/dashboard/organizer" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-10 font-bold uppercase tracking-widest text-[10px]">
                    <ChevronLeft size={16} /> Back to Workbench
                </Link>
                <Scanner />
            </div>
        </ProtectedRoute>
    );
}

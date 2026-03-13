"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole: string;
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (role !== allowedRole) {
                router.push("/"); // Redirect unauthorized roles to home
            }
        }
    }, [user, role, loading, router, allowedRole]);

    if (loading || !user || role !== allowedRole) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;

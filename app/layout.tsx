import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import Background from "./components/Background";

export const metadata: Metadata = {
    title: "Vishnu Event Hub | Advanced Campus Events",
    description: "Next-gen event management platform for Vishnu Institute of Technology.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <AuthProvider>
                    <Background />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

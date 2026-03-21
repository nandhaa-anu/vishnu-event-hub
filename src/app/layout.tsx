import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Background from "./components/Background";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

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
        <html lang="en" className="dark bg-[#0a0a0a]">
            <body className={`${spaceGrotesk.className} antialiased min-h-screen text-white`}>
                <ThemeProvider>
                    <AuthProvider>
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                style: {
                                    background: '#0a0a0a',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }
                            }}
                        />
                        <Background />
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

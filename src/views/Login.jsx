import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';
import { ArrowRight, Mail, Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Guard against repeat clicks
        if (loading || cooldown) return;

        setLoading(true);

        try {
            // 2. Auth request
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
            if (!data.user) throw new Error("Login failed");

            // Optionally fetch profile... (omitted for brevity, handled by AuthContext if needed globally)

            toast.success("Login successful! Welcome back.");
            navigate('/');

        } catch (err) {
            console.error("Login Error:", err);

            // 3. Rate Limit Detection
            if (err?.message?.toLowerCase().includes("rate limit") || err?.status === 429) {
                setCooldown(true);
                setTimeout(() => setCooldown(false), 15000); // 15s cooldown
                toast.error("Too many attempts. Please wait 15 seconds.");
            }
            // 4. Network Fetch Error Detection
            else if (err?.message?.toLowerCase().includes("fetch")) {
                toast.error("Network error. Unable to contact Auth Server. Check VITE_SUPABASE_URL.");
            }
            else {
                toast.error("Authentication failed. Invalid credentials.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-[#0a0a0a]">
            <div className="max-w-md w-full space-y-8 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Access <span className="text-amber-500">Station</span>
                    </h2>
                    <p className="text-slate-400 mt-2 text-xs font-mono uppercase">Authenticate to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-amber-500 transition-colors" size={18} />
                        <input
                            required
                            type="email"
                            placeholder="NODE_IDENTIFIER (EMAIL)"
                            className="w-full py-4 pl-12 pr-4 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-amber-500 transition-all font-mono text-xs uppercase"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-purple-500 transition-colors" size={18} />
                        <input
                            required
                            type="password"
                            placeholder="SECURITY_KEY (PASSWORD)"
                            className="w-full py-4 pl-12 pr-4 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-purple-500 transition-all font-mono text-xs uppercase"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || cooldown}
                        className={`w-full font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${cooldown
                                ? "bg-rose-500/20 text-rose-500 cursor-not-allowed border border-rose-500/30"
                                : "bg-white text-black hover:bg-amber-500 hover:text-white disabled:opacity-50"
                            }`}
                    >
                        {loading ? "AUTHENTICATING..." : cooldown ? "SYSTEM_COOLDOWN ACTIVE" : "EXECUTE_LOGIN"}
                        {!loading && !cooldown && <ArrowRight size={16} />}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                            NEW NODE? <Link to="/signup" className="text-amber-500 hover:text-amber-400">INITIALIZE ACCOUNT</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

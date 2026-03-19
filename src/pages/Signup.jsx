import { supabase } from '../lib/supabase';
import { useState } from 'react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = async () => {
        // Step 1: create auth user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        // Step 2: insert into users table
        await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
            name: name,
            role: 'student'
        });

        alert("Signup Success ✅");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-black text-center text-white uppercase tracking-tighter">
                    Initialise <span className="text-blue-500">Node</span>
                </h2>
                <div className="space-y-4">
                    <input
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-blue-500 transition-all font-mono text-xs uppercase"
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-blue-500 transition-all font-mono text-xs uppercase"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-blue-500 transition-all font-mono text-xs uppercase"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleSignup}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all uppercase tracking-widest text-sm"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

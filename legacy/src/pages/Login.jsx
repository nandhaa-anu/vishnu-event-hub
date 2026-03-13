import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Rocket, ShieldCheck, UserCircle,
    ArrowRight, Sparkles, Building2, Calendar
} from 'lucide-react';
import './Login.css';

import logo from '../assets/vishnu-logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(null);

    const roles = [
        {
            id: 'student',
            title: 'Student',
            description: 'Discover events and manage your digital tickets.',
            icon: <Rocket size={32} />,
            colorClass: 'icon-box-blue',
            path: '/dashboard/student'
        },
        {
            id: 'organizer',
            title: 'Club Organizer',
            description: 'Create and manage events for your specific club.',
            icon: <UserCircle size={32} />,
            colorClass: 'icon-box-pink',
            path: '/dashboard/organizer'
        },
        {
            id: 'admin',
            title: 'Administrator',
            description: 'Full platform access, analytics, and oversight.',
            icon: <ShieldCheck size={32} />,
            colorClass: 'icon-box-purple',
            path: '/dashboard/admin'
        }
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (selectedRole) {
            const roleConfig = roles.find(r => r.id === selectedRole);
            // In a real app, you would set an auth token here
            navigate(roleConfig.path);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container container">

                {/* Left Side: Branding & Pitch */}
                <div className="login-branding animate-fade-in">
                    <div className="login-logo">
                        <div className="logo-sparkle">
                            <img src={logo} alt="Vishnu Logo" className="v-logo-img" />
                        </div>
                        <span>Vishnu <span className="font-heavy text-gradient">Event Hub</span></span>
                    </div>

                    <h1 className="login-title">
                        The Smart Campus <br />
                        Experience.
                    </h1>
                    <p className="login-subtitle">
                        A unified, power-packed platform to streamline every event at VIT Bhimavaram.
                        Select your role to continue securely.
                    </p>

                    <div className="feature-badges delay-200">
                        <span className="pill-badge"><Building2 size={16} /> 15+ Active Clubs</span>
                        <span className="pill-badge"><Calendar size={16} /> 100+ Yearly Events</span>
                    </div>
                </div>

                {/* Right Side: Role Selection & Form */}
                <div className="login-form-wrapper glass-panel animate-fade-in delay-100">
                    <h2 className="form-header">Welcome Back</h2>
                    <p className="form-subtext">Choose your designated portal to continue.</p>

                    <form onSubmit={handleLogin} className="role-selection-form">

                        <div className="roles-grid">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedRole(role.id)}
                                >
                                    <div className={`role-icon icon-box ${role.colorClass}`}>
                                        {role.icon}
                                    </div>
                                    <div className="role-content">
                                        <h3>{role.title}</h3>
                                        <p>{role.description}</p>
                                    </div>
                                    <div className="selector-ring"></div>
                                </div>
                            ))}
                        </div>

                        <div className="login-action mt-2">
                            <button
                                type="submit"
                                className={`btn btn-primary full-width login-btn ${!selectedRole ? 'disabled' : ''}`}
                                disabled={!selectedRole}
                            >
                                Access Portal <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;

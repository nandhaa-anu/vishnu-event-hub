import React from 'react';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content animate-fade-in">
                        <span className="badge">Vishnu Institute of Technology</span>
                        <h1 className="hero-title">
                            Smart Campus <br />
                            <span className="text-gradient">Event Platform</span>
                        </h1>
                        <p className="hero-description delay-100">
                            Discover, register, and manage your campus events seamlessly. The ultimate hub for Technical, Cultural, and Workshop activities at VIT Bhimavaram.
                        </p>
                        <div className="hero-cta delay-200">
                            <a href="/events" className="btn btn-primary">Explore Events</a>
                            <a href="/dashboard" className="btn btn-outline">My Digital Wallet</a>
                        </div>
                    </div>

                    <div className="hero-visual delay-300">
                        {/* We will add 3D elements or floating cards here later */}
                        <div className="glass-panel mockup-card">
                            <div className="mockup-header">
                                <div className="mockup-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <div className="mockup-title">Upcoming Event</div>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-image"></div>
                                <h3>TechNova Hackathon 2026</h3>
                                <p>Register now to secure your spot!</p>
                                <div className="mockup-footer">
                                    <span className="mockup-date">Oct 15, 2026</span>
                                    <button className="btn btn-primary btn-sm">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

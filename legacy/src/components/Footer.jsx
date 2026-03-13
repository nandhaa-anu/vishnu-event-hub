import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Github, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            <div className="logo-icon-container small">
                                <Calendar className="logo-icon" size={18} />
                            </div>
                            <span className="logo-text">Vishnu <span className="text-gradient">Event Hub</span></span>
                        </Link>
                        <p className="footer-desc">
                            The premium smart campus platform for discovering, registering, and managing events at Vishnu Institute of Technology.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" className="social-icon" aria-label="Github"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Platform</h4>
                        <ul className="footer-links">
                            <li><Link to="/events">Discover Events</Link></li>
                            <li><Link to="/categories/technical">Technical Categories</Link></li>
                            <li><Link to="/categories/cultural">Cultural Categories</Link></li>
                            <li><Link to="/dashboard">Student Dashboard</Link></li>
                            <li><Link to="/leaderboard">Leaderboard</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Resources</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/organizers">For Organizers</Link></li>
                            <li><Link to="/faq">Help & FAQ</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col contact-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="contact-list">
                            <li>
                                <MapPin size={16} className="contact-icon" />
                                <span>Vishnu Institute of Technology, Vishnupur, Bhimavaram - 534202</span>
                            </li>
                            <li>
                                <Phone size={16} className="contact-icon" />
                                <span>+91 12345 67890</span>
                            </li>
                            <li>
                                <Mail size={16} className="contact-icon" />
                                <span>events@vishnu.edu.in</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Vishnu Event Hub. All rights reserved.</p>
                    <div className="made-with">
                        Designed for VIT Bhimavaram
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import './Navbar.css';

import logo from '../assets/vishnu-logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Determine role based on URL path
    const isStudent = location.pathname.includes('/dashboard/student') || location.pathname.includes('/events');
    const isOrganizer = location.pathname.includes('/dashboard/organizer');
    const isAdmin = location.pathname.includes('/dashboard/admin');

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">

                {/* Logo */}
                <Link to="/events" className="navbar-logo" onClick={closeMobileMenu}>
                    <div className="logo-sparkle-nav">
                        <img src={logo} alt="Vishnu Logo" className="v-logo-nav" />
                    </div>
                    <span className="logo-text">Vishnu <span className="font-heavy text-gradient">Event Hub</span></span>
                </Link>

                {/* Desktop Navigation - Role Contextual */}
                <div className="navbar-links desktop-only">
                    {isStudent && (
                        <>
                            <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Discover</NavLink>
                            <NavLink to="/dashboard/student" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>My Wallet</NavLink>
                        </>
                    )}
                    {isOrganizer && (
                        <>
                            <NavLink to="/dashboard/organizer" className="nav-link active">Manage Club</NavLink>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <NavLink to="/dashboard/admin" className="nav-link active">Admin Center</NavLink>
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="navbar-actions desktop-only">
                    <div className="role-indicator">
                        <User size={16} className="text-muted" />
                        <span className="text-secondary text-sm font-medium">
                            {isStudent && 'Student Portal'}
                            {isOrganizer && 'Organizer Portal'}
                            {isAdmin && 'Admin Portal'}
                        </span>
                    </div>
                    <Link to="/" className="btn btn-outline btn-sm logout-btn">
                        <LogOut size={16} /> Logout
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle mobile-only">
                    <button
                        className="menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content glass-panel">
                    {isStudent && (
                        <>
                            <NavLink to="/events" className="mobile-link" onClick={closeMobileMenu}>Discover Events</NavLink>
                            <NavLink to="/dashboard/student" className="mobile-link" onClick={closeMobileMenu}>My Wallet</NavLink>
                        </>
                    )}
                    {isOrganizer && <NavLink to="/dashboard/organizer" className="mobile-link" onClick={closeMobileMenu}>Manage Club</NavLink>}
                    {isAdmin && <NavLink to="/dashboard/admin" className="mobile-link" onClick={closeMobileMenu}>Admin Center</NavLink>}
                    <Link to="/" className="mobile-link text-danger mt-1" onClick={closeMobileMenu}>Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

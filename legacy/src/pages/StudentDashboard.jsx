import React, { useState } from 'react';
import { getEventById } from '../utils/mockData';
import DigitalTicket from '../components/DigitalTicket';
import {
    Ticket, Award, LogOut, MessageCircle,
    MapPin, Calendar, Clock, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

// Mock user data
const userData = {
    name: 'Rohit Sharma',
    rollNo: '20PA1A0501',
    department: 'CSE',
    year: '3rd Year'
};

// Mock ticket data
const mockTickets = [
    {
        id: 'TKT-98A7B6',
        eventId: 'evt-001',
        user: userData,
        event: getEventById('evt-001')
    },
    {
        id: 'TKT-45X2Y1',
        eventId: 'evt-003',
        user: userData,
        event: getEventById('evt-003')
    }
];

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('wallet');
    const navigate = useNavigate();

    return (
        <div className="dashboard-container container py-section">

            {/* Student Profile Header - Redesigned for Bright Theme */}
            <div className="student-header glass-card animate-fade-in">
                <div className="profile-main">
                    <div className="profile-avatar icon-box-blue">
                        {userData.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="profile-name">{userData.name}</h1>
                        <p className="profile-meta">{userData.rollNo} • {userData.department} {userData.year}</p>
                    </div>
                </div>

                <div className="profile-actions">
                    <button className="btn btn-outline" onClick={() => navigate('/events')}>
                        Discover Events
                    </button>
                </div>
            </div>

            <div className="dashboard-layout mt-2">
                {/* Simplified Sidebar Nav */}
                <div className="dashboard-sidebar student-sidebar animate-fade-in delay-100">
                    <h3 className="sidebar-title">My Portal</h3>

                    <button
                        className={`dash-nav-btn ${activeTab === 'wallet' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wallet')}
                    >
                        <div className="nav-icon-wrap icon-box-blue"><Ticket size={18} /></div>
                        <span>Digital Tickets</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>

                    <button
                        className={`dash-nav-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                        onClick={() => setActiveTab('certificates')}
                    >
                        <div className="nav-icon-wrap icon-box-purple"><Award size={18} /></div>
                        <span>Certificates</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>

                    <div className="sidebar-divider"></div>

                    <Link to="/" className="dash-nav-btn text-danger">
                        <div className="nav-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.1)' }}><LogOut size={18} /></div>
                        <span>Sign Out</span>
                    </Link>
                </div>

                {/* Main Content Area */}
                <div className="dashboard-content animate-fade-in delay-200">

                    {activeTab === 'wallet' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <div>
                                    <h2 className="pane-title">Digital Wallet</h2>
                                    <p className="pane-subtitle">Access your registered event tickets and QR codes securely.</p>
                                </div>
                                <div className="ticket-count-badge">
                                    <Ticket size={16} /> {mockTickets.length} Active
                                </div>
                            </div>

                            <div className="tickets-grid mt-2">
                                {mockTickets.map((ticket) => (
                                    <div key={ticket.id} className="ticket-item-container block-shadow">
                                        <DigitalTicket ticket={ticket} />

                                        <div className="ticket-actions">
                                            <a href="#" className="btn btn-outline full-width whatsapp-btn">
                                                <MessageCircle size={18} /> Join Event Group
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'certificates' && (
                        <div className="tab-pane">
                            <h2 className="pane-title">Verified Certificates</h2>
                            <p className="pane-subtitle">Download certificates from completed events.</p>

                            <div className="empty-state-bright mt-2">
                                <div className="icon-box-purple large-icon mb-1">
                                    <Award size={40} />
                                </div>
                                <h3>No certificates yet</h3>
                                <p>Attend events and get verified to earn digital certificates.</p>
                                <button className="btn btn-creative mt-1" onClick={() => navigate('/events')}>
                                    Find Events to Attend
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

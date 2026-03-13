import React, { useState } from 'react';
import {
    BarChart3, PlusCircle, Users, QrCode, ClipboardList,
    Settings, TrendingUp, Calendar as CalIcon, Search, ShieldCheck, List
} from 'lucide-react';
import './AdminDashboard.css';
import { eventsData } from '../utils/mockData';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate mock stats
    const totalEvents = eventsData.length;
    const totalRegistrations = eventsData.reduce((acc, event) => acc + event.registeredCount, 0);
    const totalCapacity = eventsData.reduce((acc, event) => acc + event.seatLimit, 0);
    const fillRate = Math.round((totalRegistrations / totalCapacity) * 100) || 0;

    return (
        <div className="admin-dashboard container py-section">

            {/* Admin Header - Bright Theme */}
            <div className="admin-header glass-card animate-fade-in">
                <div className="admin-title-wrap">
                    <div className="icon-box-purple lg-icon-box">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="page-title">Admin <span className="text-gradient">Control Center</span></h1>
                        <p className="page-subtitle">Full system oversight and analytics dashboard.</p>
                    </div>
                </div>
                <div className="admin-quick-actions">
                    <button className="btn btn-outline">
                        <Search size={18} /> Global Search
                    </button>
                </div>
            </div>

            <div className="admin-layout mt-2">
                {/* Admin Sidebar */}
                <div className="dashboard-sidebar admin-sidebar animate-fade-in delay-100">
                    <h3 className="sidebar-title">System Tools</h3>

                    <button
                        className={`dash-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <div className="nav-icon-wrap icon-box-blue"><BarChart3 size={18} /></div>
                        <span className="nav-text">Platform Overview</span>
                    </button>

                    <button
                        className={`dash-nav-btn ${activeTab === 'all_events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all_events')}
                    >
                        <div className="nav-icon-wrap icon-box-purple"><List size={18} /></div>
                        <span className="nav-text">All Events Database</span>
                    </button>

                    <button
                        className={`dash-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <div className="nav-icon-wrap icon-box-pink"><Users size={18} /></div>
                        <span className="nav-text">User Directory</span>
                    </button>

                    <div className="sidebar-divider"></div>

                    <button className="dash-nav-btn">
                        <div className="nav-icon-wrap"><Settings size={18} /></div>
                        <span className="nav-text">Platform Settings</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="dashboard-content animate-fade-in delay-200">

                    {activeTab === 'overview' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">Live Metrics</h2>

                            <div className="stats-grid">
                                <div className="admin-stat-card">
                                    <div className="stat-content">
                                        <p className="stat-title">Total Active Events</p>
                                        <h3 className="stat-value">{totalEvents}</h3>
                                    </div>
                                    <div className="stat-icon-wrapper icon-box-blue">
                                        <CalIcon size={24} />
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-content">
                                        <p className="stat-title">Platform Registrations</p>
                                        <h3 className="stat-value">{totalRegistrations}</h3>
                                    </div>
                                    <div className="stat-icon-wrapper icon-box-pink">
                                        <Users size={24} />
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-content">
                                        <p className="stat-title">Average Capacity Fill</p>
                                        <h3 className="stat-value text-gradient">{fillRate}%</h3>
                                    </div>
                                    <div className="stat-icon-wrapper icon-box-purple">
                                        <TrendingUp size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="admin-panel mt-2 block-shadow">
                                <div className="panel-header">
                                    <h3>Recent Events Database</h3>
                                    <button className="btn btn-outline btn-sm">View Full Database</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Event Name</th>
                                                <th>Organizer</th>
                                                <th>Registrations</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventsData.slice(0, 5).map(event => {
                                                const isFull = event.registeredCount >= event.seatLimit;
                                                const progress = (event.registeredCount / event.seatLimit) * 100;
                                                return (
                                                    <tr key={event.id}>
                                                        <td>
                                                            <div className="event-cell-name">
                                                                <span className="font-bold">{event.title}</span>
                                                                <span className="sub-text">{event.date}</span>
                                                            </div>
                                                        </td>
                                                        <td><span className="pill-badge-table">{event.organizer}</span></td>
                                                        <td>
                                                            <div className="td-progress-wrap">
                                                                <span className="progress-text">{event.registeredCount} / {event.seatLimit}</span>
                                                                <div className="mini-progress-bar">
                                                                    <div
                                                                        className="mini-progress-fill"
                                                                        style={{
                                                                            width: `${progress}%`,
                                                                            background: isFull ? 'var(--accent-pink)' : 'var(--accent-electric)'
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`status-badge-new ${isFull ? 'full' : 'active'}`}>
                                                                {isFull ? 'Sold Out' : 'Active'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button className="text-btn">Edit</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'all_events' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">All Events Database</h2>
                            <div className="admin-panel block-shadow">
                                <p className="text-secondary p-2">Full database view functionality coming soon.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">User Directory</h2>
                            <div className="admin-panel block-shadow">
                                <p className="text-secondary p-2">User management directory coming soon.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

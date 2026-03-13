import React, { useState } from 'react';
import {
    Building2, PlusCircle, QrCode, ClipboardList,
    Calendar as CalIcon, Users, Edit3, Image
} from 'lucide-react';
import { eventsData } from '../utils/mockData';
import '../pages/AdminDashboard.css'; // Reusing admin structural styles for consistency

const OrganizerDashboard = () => {
    const [activeTab, setActiveTab] = useState('manage_events');

    // Filter events to only show "Coding Club" for this mock view
    const myEvents = eventsData.filter(e => e.organizer === 'Coding Club');

    return (
        <div className="admin-dashboard container py-section">

            {/* Organizer Header */}
            <div className="admin-header glass-card animate-fade-in">
                <div className="admin-title-wrap">
                    <div className="icon-box-pink lg-icon-box">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h1 className="page-title">Club <span className="text-gradient">Organizer</span></h1>
                        <p className="page-subtitle">Managing events for: <strong>Coding Club</strong></p>
                    </div>
                </div>
                <div className="admin-quick-actions">
                    <button className="btn btn-creative" onClick={() => setActiveTab('create_event')}>
                        <PlusCircle size={18} /> New Event
                    </button>
                </div>
            </div>

            <div className="admin-layout mt-2">
                {/* Sidebar Nav */}
                <div className="dashboard-sidebar admin-sidebar animate-fade-in delay-100">
                    <h3 className="sidebar-title">Club Tools</h3>

                    <button
                        className={`dash - nav - btn ${activeTab === 'manage_events' ? 'active' : ''} `}
                        onClick={() => setActiveTab('manage_events')}
                    >
                        <div className="nav-icon-wrap icon-box-blue"><Building2 size={18} /></div>
                        <span className="nav-text">My Events</span>
                    </button>

                    <button
                        className={`dash - nav - btn ${activeTab === 'create_event' ? 'active' : ''} `}
                        onClick={() => setActiveTab('create_event')}
                    >
                        <div className="nav-icon-wrap icon-box-pink"><PlusCircle size={18} /></div>
                        <span className="nav-text">Create Event</span>
                    </button>

                    <button
                        className={`dash - nav - btn ${activeTab === 'scanner' ? 'active' : ''} `}
                        onClick={() => setActiveTab('scanner')}
                    >
                        <div className="nav-icon-wrap icon-box-purple"><QrCode size={18} /></div>
                        <span className="nav-text">Gate Scanner</span>
                    </button>

                    <button
                        className={`dash - nav - btn ${activeTab === 'certificates' ? 'active' : ''} `}
                        onClick={() => setActiveTab('certificates')}
                    >
                        <div className="nav-icon-wrap"><ClipboardList size={18} /></div>
                        <span className="nav-text">Manage Certificates</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="dashboard-content animate-fade-in delay-200">

                    {activeTab === 'manage_events' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">My Active Events</h2>

                            <div className="admin-panel block-shadow">
                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Event Details</th>
                                                <th>Date & Venue</th>
                                                <th>Registrations</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myEvents.map(event => {
                                                const isFull = event.registeredCount >= event.seatLimit;
                                                const progress = (event.registeredCount / event.seatLimit) * 100;
                                                return (
                                                    <tr key={event.id}>
                                                        <td>
                                                            <div className="event-cell-name">
                                                                <span className="font-bold">{event.title}</span>
                                                                <span className="pill-badge-table mt-1">{event.category}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="event-cell-name">
                                                                <span className="font-bold">{event.date}</span>
                                                                <span className="sub-text">{event.venue}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="td-progress-wrap">
                                                                <span className="progress-text">{event.registeredCount} / {event.seatLimit}</span>
                                                                <div className="mini-progress-bar">
                                                                    <div
                                                                        className="mini-progress-fill"
                                                                        style={{ width: `${progress}% `, background: isFull ? 'var(--accent-pink)' : 'var(--accent-electric)' }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button className="btn btn-outline btn-sm"><Edit3 size={14} /> Edit</button>
                                                                <button className="btn btn-primary btn-sm"><Users size={14} /> Guest List</button>
                                                            </div>
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

                    {activeTab === 'create_event' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">Launch New Event</h2>

                            <div className="admin-panel block-shadow p-2">
                                <form className="event-creation-form">
                                    <div className="form-row">
                                        <div className="input-group">
                                            <label className="input-label">Event Title</label>
                                            <input type="text" className="input-field" placeholder="e.g. Next.js Masterclass" />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Event Category</label>
                                            <select className="input-field select-field">
                                                <option>Technical</option>
                                                <option>Cultural</option>
                                                <option>Workshop</option>
                                                <option>Hackathon</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Full Description</label>
                                        <textarea className="input-field" rows="4" placeholder="Detail the event schedule, speakers, and requirements..."></textarea>
                                    </div>

                                    <div className="form-row">
                                        <div className="input-group">
                                            <label className="input-label">Date</label>
                                            <input type="date" className="input-field" />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Time</label>
                                            <input type="time" className="input-field" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="input-group">
                                            <label className="input-label">Venue</label>
                                            <input type="text" className="input-field" placeholder="e.g. Main Auditorium" />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Seat Capacity Limit</label>
                                            <input type="number" className="input-field" placeholder="Maximum attendees" />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Upload Event Poster</label>
                                        <div className="poster-upload-zone">
                                            <Image size={32} className="text-muted mb-1" />
                                            <p className="font-bold">Click to upload or drag and drop</p>
                                            <p className="text-sm text-muted">SVG, PNG, JPG (Max 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="form-actions mt-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                        <button type="button" className="btn btn-outline" onClick={() => setActiveTab('manage_events')}>Cancel</button>
                                        <button type="button" className="btn btn-creative" onClick={(e) => { e.preventDefault(); alert("Draft Saved!"); }}>
                                            Publish Event Live
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'scanner' && (
                        <div className="tab-pane scanner-pane">
                            <h2 className="section-heading mb-2">Gate Scanner</h2>
                            <div className="admin-panel block-shadow p-2 text-center">
                                <QrCode size={64} className="text-muted mb-2 mx-auto" style={{ display: 'block', margin: '0 auto 1rem' }} />
                                <h3 className="mb-1">Camera Access Required</h3>
                                <p className="text-secondary mb-2">Please select an event from 'My Events' to begin checking in attendees for that specific event.</p>
                                <button className="btn btn-primary" onClick={() => setActiveTab('manage_events')}>Select Event to Scan</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'certificates' && (
                        <div className="tab-pane">
                            <h2 className="section-heading mb-2">Manage Certificates</h2>
                            <div className="admin-panel block-shadow p-2">
                                <p className="text-secondary">Select a completed event to bulk generate and issue certificates to attendees.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;

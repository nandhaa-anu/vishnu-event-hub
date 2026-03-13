import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../utils/mockData';
import {
    Calendar, MapPin, Clock, Users, UserRound,
    ArrowLeft, CheckCircle, ShieldCheck, Info
} from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showRegistration, setShowRegistration] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const event = getEventById(id);

    if (!event) {
        return (
            <div className="container py-section text-center">
                <h2>Event not found</h2>
                <button className="btn btn-primary mt-1" onClick={() => navigate('/events')}>
                    Back to Events
                </button>
            </div>
        );
    }

    const isFull = event.registeredCount >= event.seatLimit;

    const handleRegistrationSuccess = () => {
        setIsRegistered(true);
        setShowRegistration(false);
    };

    return (
        <div className="event-details-page">
            <div className="container banner-nav animate-fade-in">
                <button className="back-link-btn" onClick={() => navigate('/events')}>
                    <ArrowLeft size={18} /> Explore More Events
                </button>
            </div>

            <div className="container event-content-container py-section">
                <div className="event-main-content animate-fade-in delay-100">
                    <div className="event-header-box mb-2">
                        <div className="event-tag-vibrant mb-1">{event.category}</div>
                        <h1 className="event-title-hero">{event.title}</h1>
                        <p className="organizer-text">Hosted by <span className="font-bold">{event.organizer}</span></p>
                    </div>

                    <div className="meta-info-strip block-shadow mb-2">
                        <div className="meta-col">
                            <div className="icon-box-blue sm-icon"><Calendar size={20} /></div>
                            <div>
                                <p className="meta-label">Date</p>
                                <p className="meta-value">{event.date}</p>
                            </div>
                        </div>
                        <div className="meta-col">
                            <div className="icon-box-pink sm-icon"><Clock size={20} /></div>
                            <div>
                                <p className="meta-label">Time</p>
                                <p className="meta-value">{event.time}</p>
                            </div>
                        </div>
                        <div className="meta-col">
                            <div className="icon-box-purple sm-icon"><MapPin size={20} /></div>
                            <div>
                                <p className="meta-label">Venue</p>
                                <p className="meta-value">{event.venue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="details-section mb-3">
                        <h2 className="details-heading"><Info size={24} className="text-gradient" /> About The Event</h2>
                        <p className="event-long-description">{event.description}</p>
                    </div>

                    <div className="details-grid-two mb-3">
                        <div className="glass-card detail-info-card">
                            <div className="icon-box-blue sm-icon mb-1"><UserRound size={20} /></div>
                            <h3>Official Organizer</h3>
                            <p className="text-secondary">{event.organizer}</p>
                        </div>
                        {event.guestSpeaker !== 'None' && (
                            <div className="glass-card detail-info-card">
                                <div className="icon-box-purple sm-icon mb-1"><Users size={20} /></div>
                                <h3>Guest Speaker</h3>
                                <p className="text-secondary">{event.guestSpeaker}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Sticky */}
                <div className="event-sidebar animate-fade-in delay-200">
                    <div className="registration-panel glass-panel block-shadow">
                        <div className="panel-top">
                            <h3 className="panel-title">Secure Your Seat</h3>
                            <p className="panel-desc">Join the <strong>{event.registeredCount}</strong> people already registered.</p>
                        </div>

                        <div className="seats-visualizer mb-2">
                            <div className="seats-header">
                                <span className="seats-count-text">{event.registeredCount} / {event.seatLimit}</span>
                                <span className="availability-tag">{isFull ? 'Waitlist' : 'Available'}</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${(event.registeredCount / event.seatLimit) * 100}%`,
                                        background: isFull ? 'var(--accent-pink)' : 'var(--gradient-creative)'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {isRegistered ? (
                            <div className="success-action-box">
                                <div className="success-icon-wrap mb-1 animate-fade-in">
                                    <CheckCircle size={40} className="text-success" />
                                </div>
                                <h4>You're Registered!</h4>
                                <p className="text-sm text-secondary mb-2 text-center">Your ticket is ready in your wallet.</p>
                                <button className="btn btn-primary full-width" onClick={() => navigate('/dashboard/student')}>
                                    Go to My Wallet
                                </button>
                            </div>
                        ) : showRegistration ? (
                            <RegistrationForm
                                event={event}
                                onSuccess={handleRegistrationSuccess}
                                onCancel={() => setShowRegistration(false)}
                            />
                        ) : (
                            <div className="registration-launch">
                                <button
                                    className={`btn full-width ${isFull ? 'disabled' : 'btn-creative'}`}
                                    disabled={isFull}
                                    onClick={() => setShowRegistration(true)}
                                >
                                    {isFull ? 'Event Fully Booked' : 'Proceed to Register'}
                                </button>
                                <div className="secure-badge mt-1">
                                    <ShieldCheck size={14} />
                                    <span>Verified VIT Registration</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

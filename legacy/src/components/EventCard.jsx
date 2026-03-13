import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    const isFull = event.registeredCount >= event.seatLimit;

    return (
        <div className="glass-card event-card animate-fade-in">
            <div
                className="event-card-image"
                style={{ background: event.image }}
            >
                <div className="event-category-badge">{event.category}</div>
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>

                <div className="event-card-details">
                    <div className="detail-item">
                        <Calendar size={16} className="detail-icon" />
                        <span>{event.date}</span>
                    </div>
                    <div className="detail-item">
                        <MapPin size={16} className="detail-icon" />
                        <span>{event.venue}</span>
                    </div>
                    <div className="detail-item">
                        <Users size={16} className="detail-icon" />
                        <span>{event.registeredCount} / {event.seatLimit} Registered</span>
                    </div>
                </div>

                <div className="event-card-footer">
                    <div className="organizer-info">
                        <span className="organizer-label">By</span>
                        <span className="organizer-name">{event.organizer}</span>
                    </div>

                    <Link
                        to={`/events/${event.id}`}
                        className={`btn btn-sm ${isFull ? 'btn-outline disabled' : 'btn-primary'}`}
                    >
                        {isFull ? 'Sold Out' : 'Details'} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Progress bar for seats */}
            <div className="registration-progress">
                <div
                    className="progress-fill"
                    style={{
                        width: `${(event.registeredCount / event.seatLimit) * 100}%`,
                        background: isFull ? 'var(--accent-pink)' : 'var(--accent-electric)'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default EventCard;

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Download, Share2, Sparkles } from 'lucide-react';
import './DigitalTicket.css';

const DigitalTicket = ({ ticket }) => {
    if (!ticket) return null;

    return (
        <div className="ticket-premium-wrapper animate-fade-in">
            <div className="v-ticket block-shadow">

                {/* Visual Header */}
                <div className="v-ticket-accent" style={{ background: ticket.event.image }}>
                    <div className="v-ticket-header">
                        <div className="v-brand">
                            <Sparkles size={16} /> V-Hub Pass
                        </div>
                        <div className="v-category">{ticket.event.category}</div>
                    </div>
                </div>

                <div className="v-ticket-content">
                    <div className="v-event-info">
                        <h2 className="v-event-title">{ticket.event.title}</h2>
                        <div className="v-meta-grid">
                            <div className="v-meta-item">
                                <Calendar size={14} className="v-icon-blue" />
                                <span>{ticket.event.date}</span>
                            </div>
                            <div className="v-meta-item">
                                <MapPin size={14} className="v-icon-pink" />
                                <span>{ticket.event.venue}</span>
                            </div>
                        </div>
                    </div>

                    <div className="v-perforation">
                        <div className="v-hole-left"></div>
                        <div className="v-dash-line"></div>
                        <div className="v-hole-right"></div>
                    </div>

                    <div className="v-attendee-section">
                        <div className="v-details-box">
                            <div className="v-field-group">
                                <label>Attendee Name</label>
                                <p className="v-field-value">{ticket.user.name}</p>
                            </div>
                            <div className="v-details-row">
                                <div className="v-field-group">
                                    <label>Roll Number</label>
                                    <p className="v-field-value">{ticket.user.rollNo}</p>
                                </div>
                                <div className="v-field-group">
                                    <label>Department</label>
                                    <p className="v-field-value">{ticket.user.department}</p>
                                </div>
                            </div>
                            <div className="v-field-group mt-1">
                                <label>V-Hub Unique Authorization</label>
                                <p className="v-field-value v-mono">{ticket.id}</p>
                            </div>
                        </div>

                        <div className="v-qr-side">
                            <div className="v-qr-frame">
                                <QRCodeSVG
                                    value={ticket.id}
                                    size={90}
                                    bgColor={"#ffffff"}
                                    fgColor={"#0F172A"}
                                    level={"H"}
                                />
                            </div>
                            <p className="v-scan-label">SCAN AT GATE</p>
                        </div>
                    </div>
                </div>

                <div className="v-ticket-actions">
                    <button className="v-ticket-btn">
                        <Download size={16} /> Download PDF
                    </button>
                    <div className="v-vert-divider"></div>
                    <button className="v-ticket-btn">
                        <Share2 size={16} /> Get Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DigitalTicket;

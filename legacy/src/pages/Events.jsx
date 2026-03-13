import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { eventsData } from '../utils/mockData';
import { Search, Filter, Sparkles } from 'lucide-react';
import './Events.css';

const Events = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Technical', 'Cultural', 'Workshop', 'Seminar'];

    const filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="events-page container py-section">
            <div className="events-header">
                <div className="icon-box-purple mx-auto mb-1" style={{ width: '4rem', height: '4rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={32} />
                </div>
                <h1 className="page-title animate-fade-in">Discover <span className="text-gradient">Campus Events</span></h1>
                <p className="page-subtitle animate-fade-in delay-100">
                    Find and register for the most exciting events happening at Vishnu Institute of Technology.
                </p>
            </div>

            <div className="events-controls animate-fade-in delay-200">
                <div className="search-bar glass-panel">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search events, clubs, or organizers..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    <Filter size={20} className="filter-icon" />
                    <div className="filter-buttons">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredEvents.length > 0 ? (
                <div className="events-grid">
                    {filteredEvents.map((event, index) => (
                        <div key={event.id} style={{ animationDelay: `${index * 50 + 100}ms` }} className="animate-fade-in">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state glass-card animate-fade-in delay-300">
                    <div className="empty-icon-container icon-box-blue">
                        <Search size={40} />
                    </div>
                    <h3>No events found</h3>
                    <p>We couldn't find any events matching your current filters.</p>
                    <button
                        className="btn btn-outline mt-1"
                        onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Events;

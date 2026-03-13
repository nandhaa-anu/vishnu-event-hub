import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
    return (
        <BrowserRouter>
            <div className="bg-glow-orb orb-1"></div>
            <div className="bg-glow-orb orb-2"></div>
            <Routes>
                {/* Unified Login Route */}
                <Route path="/" element={<Login />} />

                {/* Main Application Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />

                    {/* Role-Specific Dashboards */}
                    <Route path="/dashboard/student" element={<StudentDashboard />} />
                    <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
                    <Route path="/dashboard/admin" element={<AdminDashboard />} />

                    <Route path="*" element={<div className="container" style={{ padding: '6rem 2rem' }}><h2>404 - Coming Soon</h2></div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

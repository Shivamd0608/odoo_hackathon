// src/components/ExplorePage.jsx
import React, { useState } from 'react';
import './ExplorePage.css'; // Import the dedicated CSS file
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const userProfiles = [
    {
        id: 1,
        name: 'Marc Demo',
        avatar: 'https://i.pravatar.cc/150?img=68', // Placeholder avatar
        skillsOffered: ['Web Development', 'React', 'Node.js'],
        skillsWanted: ['UI/UX Design', 'Marketing'],
        rating: 4, // Out of 5
        available: true,
    },
    {
        id: 2,
        name: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=47',
        skillsOffered: ['Graphic Design', 'Photoshop'],
        skillsWanted: ['Video Editing', 'Photography'],
        rating: 5,
        available: false,
    },
    {
        id: 3,
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=12',
        skillsOffered: ['Python Programming', 'Data Analysis'],
        skillsWanted: ['Machine Learning'],
        rating: 4,
        available: true,
    },
    {
        id: 4,
        name: 'Emily White',
        avatar: 'https://i.pravatar.cc/150?img=25',
        skillsOffered: ['Content Writing', 'SEO'],
        skillsWanted: ['Digital Marketing', 'Social Media'],
        rating: 3,
        available: true,
    },
    {
        id: 5,
        name: 'David Green',
        avatar: 'https://i.pravatar.cc/150?img=33',
        skillsOffered: ['Guitar Lessons', 'Music Theory'],
        skillsWanted: ['Singing', 'Songwriting'],
        rating: 5,
        available: false,
    },
    {
        id: 6,
        name: 'Sophia Lee',
        avatar: 'https://i.pravatar.cc/150?img=19',
        skillsOffered: ['Yoga Instruction', 'Meditation'],
        skillsWanted: ['Nutrition', 'Pilates'],
        rating: 4,
        available: true,
    },
];

// Star Rating Component
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
                ★
            </span>
        );
    }
    return <div className="star-rating">{stars}</div>;
};

const ExplorePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'unavailable'
    const navigate = useNavigate();

    const filteredProfiles = userProfiles.filter(profile => {
        const matchesSearchTerm = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  profile.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  profile.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesAvailability = availabilityFilter === 'all' ||
                                    (availabilityFilter === 'available' && profile.available) ||
                                    (availabilityFilter === 'unavailable' && !profile.available);

        return matchesSearchTerm && matchesAvailability;
    });

    const handleSwapRequest = (profileName) => {
        // In a real application, this would open a modal, send an API request, etc.
        alert(`Swap request sent to ${profileName}! (Simulated)`);
    };

    return (
        <div className="explore-page-wrapper">
            {/* Header */}
            <header className="explore-header">
                <div className="explore-header-content">
                    <div className="logo">
                        <a href="/">Skill<span className="logo-accent">Swap</span></a>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-secondary" onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </header>

            <main className="explore-main">
                <h1 className="explore-title">Explore Skills & Connect</h1>
                <p className="explore-subtitle">Find the perfect swap partner for your learning journey.</p>

                {/* Search and Filter Bar */}
                <div className="filter-bar">
                    <div className="filter-group">
                        <label htmlFor="availability" className="filter-label">Availability:</label>
                        <select
                            id="availability"
                            className="filter-select"
                            value={availabilityFilter}
                            onChange={(e) => setAvailabilityFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div className="filter-group search-input-group">
                        <input
                            type="text"
                            placeholder="Search by name or skill..."
                            className="filter-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-icon-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* User Profile Grid */}
                <section className="profile-grid">
                    {filteredProfiles.length > 0 ? (
                        filteredProfiles.map(profile => (
                            <div key={profile.id} className="profile-card">
                                <div className="profile-header">
                                    <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
                                    <h3 className="profile-name">{profile.name}</h3>
                                    <span className={`availability-status ${profile.available ? 'available' : 'unavailable'}`}>
                                        {profile.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>
                                <div className="profile-skills">
                                    <p className="skills-label">Skills Offered:</p>
                                    <div className="skill-tags">
                                        {profile.skillsOffered.map(skill => (
                                            <span key={skill} className="skill-tag-small">{skill}</span>
                                        ))}
                                    </div>
                                    <p className="skills-label">Skills Wanted:</p>
                                    <div className="skill-tags">
                                        {profile.skillsWanted.map(skill => (
                                            <span key={skill} className="skill-tag-small wanted">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="profile-footer">
                                    <StarRating rating={profile.rating} />
                                    <button
                                        className="btn btn-request"
                                        onClick={() => handleSwapRequest(profile.name)}
                                        disabled={!profile.available} // Disable if not available
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No profiles found matching your criteria.</p>
                    )}
                </section>

                {/* Pagination */}
                <div className="pagination">
                    <button className="pagination-arrow" disabled>←</button>
                    <span className="pagination-number active">1</span>
                    <span className="pagination-number">2</span>
                    <span className="pagination-number">3</span>
                    <span className="pagination-dots">...</span>
                    <span className="pagination-number">46</span>
                    <span className="pagination-number">47</span>
                    <button className="pagination-arrow">→</button>
                </div>
            </main>
        </div>
    );
};

export default ExplorePage;

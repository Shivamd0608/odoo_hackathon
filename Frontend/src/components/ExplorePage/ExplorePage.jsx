// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExplorePage.css'; // Make sure this exists

const ExplorePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/swap/explore`);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const requestSwap = async (userId) => {
    try {
      const res = await axios.post(`/swap/request`, { to: userId });
      alert("Swap request sent!");
    } catch (err) {
      alert("Failed to send swap request");
    }
  };

  return (
    <div className="explore-container">
      <h2>Explore Users</h2>
      <input
        type="text"
        placeholder="Search by name or skill..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="explore-search"
      />

      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user._id} className="user-card">
            <img src={user.profilePhoto || '/default-avatar.png'} alt="Avatar" />
            <h3>{user.name}</h3>
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong>Skills:</strong> {user.skills.map(s => s.name).join(', ')}</p>
            <button onClick={() => requestSwap(user._id)}>Request Swap</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
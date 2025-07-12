import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const userData = {
    username: "john_doe",
    company: "Tech Solutions Inc.",
    experience: "5 years",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    location: "New York, USA",
    email: "john.doe@example.com"
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>Tasks</li>
          <li>Calendar</li>
          <li>Analytics</li>
          <li>Team</li>
          <li>Settings</li>
          <li>Help</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {userData.username} 👋</h1>
          <button className="btn">+ Add Project</button>
        </header>

        <div className="cards-grid">
          <div className="card stats">
            <h3>Total Projects</h3>
            <p>24</p>
            <span>↑ Increased from last month</span>
          </div>
          <div className="card stats">
            <h3>Ended Projects</h3>
            <p>10</p>
            <span>↑ Improved</span>
          </div>
          <div className="card stats">
            <h3>Running Projects</h3>
            <p>12</p>
            <span>↑ Improved</span>
          </div>
          <div className="card stats">
            <h3>Pending Projects</h3>
            <p>2</p>
            <span>On discuss</span>
          </div>

          <div className="card">
            <h3>Project Analytics</h3>
            <div className="analytics-bars">
              <div className="bar" style={{ height: '30%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '100%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
            </div>
          </div>

          <div className="card">
            <h3>Reminders</h3>
            <p><strong>Meeting with Arc Company</strong></p>
            <p>2:00 PM – 4:00 PM</p>
            <button className="btn green">Start Meeting</button>
          </div>

          <div className="card">
            <h3>User Info</h3>
            <p><strong>Company:</strong> {userData.company}</p>
            <p><strong>Experience:</strong> {userData.experience}</p>
            <p><strong>Skills:</strong> {userData.skills.join(', ')}</p>
            <p><strong>Location:</strong> {userData.location}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>

          <div className="card progress">
            <h3>Project Progress</h3>
            <div className="circle-progress">
              <p>41%</p>
            </div>
            <span>Project Ended</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

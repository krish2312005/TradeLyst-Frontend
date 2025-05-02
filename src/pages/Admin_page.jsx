import React from 'react';
import './Admin_page.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome, Admin</h1>
        <p>Manage your application here.</p>
      </main>
    </div>
  );
};

export default AdminPage;
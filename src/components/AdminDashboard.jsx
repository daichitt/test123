import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        categories: 0,
        foods: 0,
        orders: 0,
        users: 0,
        revenue: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Unable to fetch statistics. Please try again later.');
            }
        };

        fetchStats();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="admin-dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <div className="stat">
                    <h3>{stats.categories}</h3>
                    <p>Categories</p>
                </div>
                <div className="stat">
                    <h3>{stats.foods}</h3>
                    <p>Foods</p>
                </div>
                <div className="stat">
                    <h3>{stats.orders}</h3>
                    <p>Total Orders</p>
                </div>
                <div className="stat">
                    <h3>{stats.users}</h3>
                    <p>Total Users</p>
                </div>
                <div className="stat-item revenue">
                    <h3>Total Revenue</h3>
                    <p className="revenue-amount">${Number(stats.revenue || 0).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
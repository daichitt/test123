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
        return (
            <div className="text-red-500 text-center py-8 mx-4">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-orange-500 mb-2">{stats.categories}</h3>
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-orange-500 mb-2">{stats.foods}</h3>
                    <p className="text-sm font-medium text-gray-600">Foods</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-orange-500 mb-2">{stats.orders}</h3>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-orange-500 mb-2">{stats.users}</h3>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                </div>

                {/* Revenue Card - Full Width */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-sm p-8 text-white">
                    <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
                    <p className="text-4xl font-bold">
                        ${Number(stats.revenue || 0).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';

const Profile = ({ loggedInUser }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch user details if needed
        setUserDetails(loggedInUser);
    }, [loggedInUser]);

    if (!userDetails) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-gray-500">
                Please log in to access your profile.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {/* Profile Header */}
                <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Welcome, {userDetails.name}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Email: {userDetails.email}
                    </p>
                </div>

                {/* Action Buttons */}
                {userDetails.isAdmin ? (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Admin Controls</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                onClick={() => navigate('/admin')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Dashboard
                            </button>
                            <button 
                                onClick={() => navigate('/admin/orders')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Order Information
                            </button>
                            <button 
                                onClick={() => navigate('/admin/menu')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Menu Edit
                            </button>
                            <button 
                                onClick={() => navigate('/menu')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                View Menu
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-600 italic">
                            Thank you for being a valued customer!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                onClick={() => navigate('/menu')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Browse Menu
                            </button>
                            <button 
                                onClick={() => navigate('/checkout')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Go to Checkout
                            </button>
                            <button 
                                onClick={() => navigate('/past-orders')}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                View Past Orders
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
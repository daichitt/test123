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
        return <div>Please log in to access your profile.</div>;
    }

    return (
        <div className="profile-page">
            <h2>Welcome, {userDetails.name}</h2>
            <p>Email: {userDetails.email}</p>
            {userDetails.isAdmin ? (
                <div className="admin-buttons">
                    <button onClick={() => navigate('/admin')}>Dashboard</button>
                    <button onClick={() => navigate('/admin/orders')}>Order Information</button>
                    <button onClick={() => navigate('/admin/menu')}>Menu Edit</button>
                    <button onClick={() => navigate('/menu')}>View Menu</button>
                </div>
            ) : (
                <div className="user-buttons">
                    <p>Thank you for being a valued customer!</p>
                    <button onClick={() => navigate('/menu')}>Browse Menu</button>
                    <button onClick={() => navigate('/checkout')}>Go to Checkout</button>
                    {/* Add a button to navigate to the Past Orders page */}
                    <button onClick={() => navigate('/past-orders')}>View Past Orders</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome to FoofFood</h1>
                <p>Delicious meals delivered to your doorstep or ready for pickup!</p>
                <Link to="/menu" className="cta-button">Explore Menu</Link>
            </div>
            <div className="features">
                <div className="feature">
                    <h3>Fast Delivery</h3>
                    <p>Get your food delivered in no time.</p>
                </div>
                <div className="feature">
                    <h3>Fresh Ingredients</h3>
                    <p>We use only the freshest ingredients.</p>
                </div>
                <div className="feature">
                    <h3>Easy Ordering</h3>
                    <p>Order your favorite meals with ease.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
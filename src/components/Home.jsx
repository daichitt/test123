import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="hero py-20 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to FoofFood</h1>
                    <p className="text-xl text-gray-600 mb-8">Delicious meals delivered to your doorstep or ready for pickup!</p>
                    <Link 
                        to="/menu" 
                        className="inline-flex items-center px-8 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors duration-200 transform hover:scale-105"
                    >
                        Explore Menu
                    </Link>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 py-16">
                    <div className="feature p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-orange-500 mb-4">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                        <p className="text-gray-600">Get your food delivered in no time.</p>
                    </div>
                    
                    <div className="feature p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-orange-500 mb-4">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Ingredients</h3>
                        <p className="text-gray-600">We use only the freshest ingredients.</p>
                    </div>
                    
                    <div className="feature p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-orange-500 mb-4">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Ordering</h3>
                        <p className="text-gray-600">Order your favorite meals with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
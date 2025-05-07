import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                onLogin(data); // Pass user data to parent
                alert('Login successful!');
                navigate('/'); // Add try-catch if needed
            } else {
                alert(data.message || 'Login failed!');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please login to your account
                    </p>
                </div>
    
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
    
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
    
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                        Sign In
                    </button>
    
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                        >
                            Register here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
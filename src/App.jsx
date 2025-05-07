import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmationPopup from './components/OrderConfirmationPopup';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import OrderInfo from './components/OrderInfo';
import AddMenu from './components/AddMenu';
import Profile from './components/Profile';
import PastOrders from './components/PastOrders';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
    console.log('App is rendering');

    // Retrieve logged-in user from localStorage
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [cartItems, setCartItems] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [filter, setFilter] = useState('all');
    const [menuItems, setMenuItems] = useState([]); // Track menu items

    const navigate = useNavigate();
    const location = useLocation();

    // Save logged-in user to localStorage whenever it changes
    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }, [loggedInUser]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1, name: item.item_name }]; // Ensure name is passed
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: parseInt(quantity, 10) } : item
            )
        );
    };

    const proceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            return;
        }

        if (!loggedInUser) {
            alert('Please log in to proceed to checkout.');
            navigate('/login');
            return;
        }

        navigate('/checkout'); // Navigate to the checkout page
    };

    const confirmOrder = (details) => {
        console.log('Order confirmed:', details); // Debugging log
        setOrderDetails(details); // Save the order details
        setCartItems([]); // Clear the cart
        setIsCheckout(false); // Reset the checkout state
        alert('Your order has been placed successfully!');
    };

    const closeOrderConfirmation = () => {
        setOrderDetails(null);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleProfileClick = () => {
        if (!loggedInUser) {
            alert('Please log in to access your profile.');
            navigate('/login');
        } else {
            navigate('/profile');
        }
    };

    return (
        <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-orange-500">FoofFood</h1>
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                                Home
                            </Link>
                            <Link to="/menu" className="text-gray-600 hover:text-orange-500 transition-colors">
                                Menu
                            </Link>
                            <button 
                                onClick={handleProfileClick}
                                className="text-gray-600 hover:text-orange-500 transition-colors"
                            >
                                Profile
                            </button>
                            {loggedInUser ? (
                                <button
                                    onClick={() => {
                                        setLoggedInUser(null);
                                        alert('You have been logged out.');
                                    }}
                                    className="text-gray-600 hover:text-orange-500 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="text-gray-600 hover:text-orange-500 transition-colors">
                                    Login
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
                <main className="flex-grow">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={<Login onLogin={(user) => setLoggedInUser(user)} />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/menu"
                            element={
                                <div className="menu-cart-container">
                                    <Menu addToCart={addToCart} filter={filter} />
                                    <Cart
                                        cartItems={cartItems}
                                        onUpdateQuantity={updateQuantity}
                                        onRemoveItem={removeFromCart}
                                        totalPrice={totalPrice}
                                        onCheckout={proceedToCheckout}
                                    />
                                </div>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <Checkout
                                    cartItems={cartItems}
                                    totalPrice={totalPrice}
                                    onConfirmOrder={confirmOrder}
                                />
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                loggedInUser && loggedInUser.isAdmin ? (
                                    <AdminDashboard />
                                ) : (
                                    <div>You do not have access to this page.</div>
                                )
                            }
                        />
                        <Route
                            path="/admin/orders"
                            element={
                                loggedInUser && loggedInUser.isAdmin ? (
                                    <OrderInfo />
                                ) : (
                                    <div>You do not have access to this page.</div>
                                )
                            }
                        />
                        <Route
                            path="/admin/menu"
                            element={
                                loggedInUser && loggedInUser.isAdmin ? (
                                    <AddMenu />
                                ) : (
                                    <div>You do not have access to this page.</div>
                                )
                            }
                        />
                        <Route
                            path="/profile"
                            element={<Profile loggedInUser={loggedInUser} />}
                        />
                        <Route
                            path="/past-orders"
                            element={
                                loggedInUser ? (
                                    <PastOrders userId={loggedInUser.id} />
                                ) : (
                                    <div>Please log in to view your past orders.</div>
                                )
                            }
                        />
                    </Routes>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-sm text-gray-500">&copy; 2025 FoofFood. All rights reserved.</p>
                            <p className="text-sm text-gray-500">123 McDonald's Street, Food City</p>
                            <nav className="flex space-x-4">
                                <Link to="/" className="text-sm text-gray-500 hover:text-orange-500">Home</Link>
                                <span className="text-gray-300">|</span>
                                <Link to="/menu" className="text-sm text-gray-500 hover:text-orange-500">Menu</Link>
                                <span className="text-gray-300">|</span>
                                <Link to="/contact" className="text-sm text-gray-500 hover:text-orange-500">Contact</Link>
                            </nav>
                        </div>
                    </div>
                </footer>
            </div>
        </ErrorBoundary>
    );
}

export default App;
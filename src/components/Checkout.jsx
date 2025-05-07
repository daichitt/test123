import React, { useState } from 'react';
import "./styles/Checkout.css";
import OrderConfirmationPopup from './OrderConfirmationPopup';

const Checkout = ({ cartItems, totalPrice, onConfirmOrder, loggedInUser }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [showPopup, setShowPopup] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const handleConfirmOrder = () => {
        if (deliveryMethod === 'delivery' && !address.trim()) {
            alert('Please provide a delivery address.');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to your cart before confirming the order.');
            return;
        }

        const orderDetails = {
            deliveryMethod,
            address: deliveryMethod === 'delivery' ? address : null,
            paymentMethod,
            totalPrice,
            items: cartItems,
        };

        console.log('Order Details:', orderDetails);
        setOrderDetails(orderDetails); // Set the order details for the popup
        setShowPopup(true); // Show the confirmation popup
    };

    const handleClosePopup = async () => {
        setShowPopup(false); // Close the popup

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: loggedInUser.id, // Use dynamic userId
                    deliveryMethod: orderDetails.deliveryMethod,
                    address: orderDetails.address,
                    paymentMethod: orderDetails.paymentMethod,
                    totalPrice: parseFloat(orderDetails.totalPrice || 0), // Ensure valid number
                    items: orderDetails.items,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const data = await response.json();
            console.log('Order placed successfully:', data);
            alert('Your order has been placed successfully!');
            onConfirmOrder(orderDetails); // Trigger the parent callback
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
                
                {/* Delivery Method */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Delivery Method</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="delivery"
                                checked={deliveryMethod === 'delivery'}
                                onChange={() => setDeliveryMethod('delivery')}
                                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-gray-700">Delivery</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="pickup"
                                checked={deliveryMethod === 'pickup'}
                                onChange={() => setDeliveryMethod('pickup')}
                                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-gray-700">Pickup</span>
                        </label>
                    </div>
                </div>

                {/* Address Input */}
                {deliveryMethod === 'delivery' && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Delivery Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your delivery address"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                        />
                    </div>
                )}

                {/* Payment Method */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Payment Method
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                        <option value="e-wallet">E-Wallet</option>
                    </select>
                </div>

                {/* Order Summary */}
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <p className="text-2xl font-bold text-orange-500">
                        ${totalPrice.toFixed(2)}
                    </p>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirmOrder}
                    className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Confirm Order
                </button>
            </div>

            {/* Popup */}
            {showPopup && (
                <OrderConfirmationPopup
                    orderDetails={orderDetails}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default Checkout;
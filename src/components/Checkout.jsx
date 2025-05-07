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
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={() => setDeliveryMethod('delivery')}
                    />
                    Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={() => setDeliveryMethod('pickup')}
                    />
                    Pickup
                </label>
            </div>
            {deliveryMethod === 'delivery' && (
                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        required
                    />
                </div>
            )}
            <div className="input-group">
                <label>Payment Method:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                    <option value="e-wallet">E-Wallet</option>
                </select>
            </div>
            <div className="summary">
                <h3>Order Summary</h3>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <button className="button" onClick={handleConfirmOrder}>
                Confirm Order
            </button>

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
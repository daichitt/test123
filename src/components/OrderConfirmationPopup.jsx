import React from 'react';
import "./styles/OrderConfirmationPopup.css";

const OrderConfirmationPopup = ({ orderDetails, onClose }) => {
    return (
        <div className="order-confirmation-popup">
            <h2>Order Confirmation</h2>
            <div className="order-summary">
                <h3>Your Order:</h3>
                <ul>
                    {orderDetails.items.map((item, index) => (
                        <li key={index}>
                            {item.item_name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total Price: ${orderDetails.totalPrice.toFixed(2)}</p>
            </div>
            <button className="confirm-button" onClick={onClose}>
                Confirm Order
            </button>
        </div>
    );
};

export default OrderConfirmationPopup;

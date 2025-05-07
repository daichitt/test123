import React from 'react';
import './styles/Cart.css';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <div className="cart-header">Your Cart</div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-details">
                            <span className="item-name">{item.name}</span> {/* Display item name */}
                            <div className="quantity-controls">
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button className="cart-button" onClick={() => onRemoveItem(item.id)}>
                            Remove
                        </button>
                    </div>
                ))
            )}
            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <p>Total: ${calculateTotal()}</p>
                    <button className="cart-button" onClick={onCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
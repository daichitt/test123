import React from 'react';
import './styles/Cart.css';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 max-w-md w-full">
            <div className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-100">
                Your Cart
            </div>
            
            {cartItems.length === 0 ? (
                <p className="py-8 text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4 py-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{item.name}</span>
                                <span className="text-orange-500 font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-sm text-red-500 hover:text-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-orange-500">
                            ${calculateTotal()}
                        </span>
                    </div>
                    <button 
                        onClick={onCheckout}
                        className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
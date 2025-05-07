import React from 'react';

const OrderConfirmationPopup = ({ orderDetails, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Order Confirmation
                </h2>
                
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Your Order:</h3>
                    <ul className="space-y-2">
                        {orderDetails.items.map((item, index) => (
                            <li 
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                            >
                                <span className="text-gray-700">{item.item_name}</span>
                                <span className="text-gray-600">Qty: {item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-gray-200">
                        <p className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900">Total:</span>
                            <span className="text-xl font-bold text-orange-500">
                                ${orderDetails.totalPrice.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="w-full mt-6 py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPopup;
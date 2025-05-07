import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Unable to fetch orders. Please try again later.');
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Information</h2>
            {error ? (
                <p className="text-red-500 text-center py-4">{error}</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user_name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-500">
                                        ${typeof order.total_price === 'number' ? order.total_price.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.delivery_method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.payment_method}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="space-y-1">
                                            {order.items.map((item) => (
                                                <div key={item.menu_item_id} className="flex items-center space-x-2">
                                                    <span>{item.item_name}</span>
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        x{item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    // return (
    //     <div className="order-info">
    //         <h2>Order Information</h2>
    //         {error ? (
    //             <p>{error}</p>
    //         ) : orders.length === 0 ? (
    //             <p>No orders found.</p>
    //         ) : (
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>Order ID</th>
    //                         <th>User Name</th> {/* Add User Name Column */}
    //                         <th>Total Price</th>
    //                         <th>Delivery Method</th>
    //                         <th>Address</th>
    //                         <th>Payment Method</th>
    //                         <th>Items</th>
    //                         <th>Created At</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {orders.map((order, index) => (
    //                         <tr key={index}>
    //                             <td>{order.id}</td>
    //                             <td>{order.user_name || 'N/A'}</td> {/* Display User Name */}
    //                             <td>${typeof order.total_price === 'number' ? order.total_price.toFixed(2) : '0.00'}</td>
    //                             <td>{order.delivery_method}</td>
    //                             <td>{order.address || 'N/A'}</td>
    //                             <td>{order.payment_method}</td>
    //                             <td>
    //                                 {order.items.map((item) => (
    //                                     <div key={item.menu_item_id}>
    //                                         {item.item_name} (x{item.quantity})
    //                                     </div>
    //                                 ))}
    //                             </td>
    //                             <td>{new Date(order.created_at).toLocaleString()}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         )}
    //     </div>
    // );
    
};

export default OrderInfo;
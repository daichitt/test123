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
        <div className="order-info">
            <h2>Order Information</h2>
            {error ? (
                <p>{error}</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th> {/* Add User Name Column */}
                            <th>Total Price</th>
                            <th>Delivery Method</th>
                            <th>Address</th>
                            <th>Payment Method</th>
                            <th>Items</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.user_name || 'N/A'}</td> {/* Display User Name */}
                                <td>${typeof order.total_price === 'number' ? order.total_price.toFixed(2) : '0.00'}</td>
                                <td>{order.delivery_method}</td>
                                <td>{order.address || 'N/A'}</td>
                                <td>{order.payment_method}</td>
                                <td>
                                    {order.items.map((item) => (
                                        <div key={item.menu_item_id}>
                                            {item.item_name} (x{item.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td>{new Date(order.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderInfo;
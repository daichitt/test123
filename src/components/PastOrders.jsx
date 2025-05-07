import React, { useEffect, useState } from 'react';
import './styles/PastOrders.css';

const PastOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders?userId=${userId}`);
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
    }, [userId]);

    if (loading) {
        return <div>Loading past orders...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!orders || orders.length === 0) {
        return <div>No past orders found.</div>;
    }

    return (
        <div className="past-orders">
            <h2>Your Past Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Items</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>${order.total_price.toFixed(2)}</td>
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
        </div>
    );
};

export default PastOrders;
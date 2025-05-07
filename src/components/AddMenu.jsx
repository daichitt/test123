import React, { useState, useEffect } from 'react';
import './styles/AddMenu.css';

const AddMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ item_name: '', description: '', price: '', image_url: '' });

    // Fetch menu items from the backend
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/menu-items');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    // Add a new menu item
    const handleAddItem = async () => {
        if (!newItem.item_name || !newItem.description || !newItem.price || !newItem.image_url) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/menu-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                const addedItem = await response.json();
                setMenuItems((prevItems) => [...prevItems, addedItem]);
                setNewItem({ item_name: '', description: '', price: '', image_url: '' });
                alert('Menu item added successfully!');
            } else {
                alert('Failed to add menu item.');
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    // Delete a menu item
    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/menu-items/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
                alert('Menu item deleted successfully!');
            } else {
                alert('Failed to delete menu item.');
            }
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Menu Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Menu Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button 
                    onClick={handleAddItem}
                    className="sm:col-span-2 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Add Item
                </button>
            </div>
        </div>

        {/* Menu Items Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-900 p-6 border-b border-gray-200">Menu Items</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.item_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-500">
                                    ${Number(item.price).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={item.image_url} 
                                        alt={item.item_name} 
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button 
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default AddMenu;
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
        <div className="add-menu">
            <h2>Add Menu Item</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            <h2>Menu Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.item_name}</td>
                            <td>{item.description}</td>
                            <td>${Number(item.price).toFixed(2)}</td>
                            <td>
                                <img src={item.image_url} alt={item.item_name} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddMenu;
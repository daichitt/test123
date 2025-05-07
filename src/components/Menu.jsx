import React, { useState, useEffect } from 'react';
import './styles/Menu.css';

const Menu = ({ addToCart, filter }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [localFilter, setLocalFilter] = useState(filter || '');

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
    
    const filteredItems = menuItems.filter((item) =>
        item.item_name.toLowerCase().includes(localFilter.toLowerCase())
    );

    return (
        <div className="menu">
            <div className="menu-header">
                <h2>Our Menu</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={localFilter}
                        onChange={(e) => setLocalFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="menu-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="menu-item">
                            <img src={item.image_url} alt={item.item_name} />
                            <h3>{item.item_name}</h3>
                            <p className="description">{item.description}</p>
                            <p className="price">${parseFloat(item.price || 0).toFixed(2)}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No menu items found.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
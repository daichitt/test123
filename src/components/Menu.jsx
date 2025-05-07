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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">Our Menu</h2>
                    <div className="w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={localFilter}
                            onChange={(e) => setLocalFilter(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>
    
                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                            >
                                <img 
                                    src={item.image_url} 
                                    alt={item.item_name} 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 space-y-3">
                                    <h3 className="text-xl font-semibold text-gray-900">{item.item_name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                                    <div className="flex justify-between items-center pt-2">
                                        <p className="text-lg font-semibold text-orange-500">
                                            ${parseFloat(item.price || 0).toFixed(2)}
                                        </p>
                                        <button 
                                            onClick={() => addToCart(item)}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No menu items found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
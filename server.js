const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'isd_final_db', // Replace with your database name
    password: 'kiomapost3247', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

// Mock database
const orders = [
    {
        order_id: 1,
        user_id: 1,
        total_price: 25.99,
        items: [
            { menu_item_id: 101, item_name: 'Burger', quantity: 2 },
            { menu_item_id: 102, item_name: 'Fries', quantity: 1 },
        ],
        created_at: '2025-05-01T10:30:00Z',
    },
    {
        order_id: 2,
        user_id: 1,
        total_price: 15.49,
        items: [
            { menu_item_id: 103, item_name: 'Pizza', quantity: 1 },
        ],
        created_at: '2025-05-03T14:15:00Z',
    },
];

// API endpoint for login
app.post('/api/login', async (req, res) => {
    console.log('Request Body:', req.body);
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.is_admin, // Ensure this is included
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API endpoint for registration
app.post('/api/register', async (req, res) => {
    console.log('Request Body:', req.body);
    const { name, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);

        // Handle duplicate email error
        if (error.code === '23505') {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Get all menu items
app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, item_name, description, CAST(price AS FLOAT) AS price, image_url FROM menu_items');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a new menu item
app.post('/api/menu-items', async (req, res) => {
    console.log('Request Body:', req.body);
    const { item_name, description, price, image_url } = req.body;
    try {
        await pool.query(
            'INSERT INTO menu_items (item_name, description, price, image_url) VALUES ($1, $2, $3, $4)',
            [item_name, description, price, image_url]
        );
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a menu item
app.put('/api/menu-items/:id', async (req, res) => {
    console.log('Request Body:', req.body);
    const { id } = req.params;
    const { item_name, description, price, image_url } = req.body;
    try {
        await pool.query(
            'UPDATE menu_items SET item_name = $1, description = $2, price = $3, image_url = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5',
            [item_name, description, price, image_url, id]
        );
        res.json({ message: 'Menu item updated successfully' });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a menu item
app.delete('/api/menu-items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Save order and order items
app.post('/api/checkout', async (req, res) => {
    console.log('Request Body:', req.body);
    const { user_id, delivery_method, address, payment_method, items } = req.body;
    try {
        // Calculate total price
        const total_price = items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Insert the order
        const result = await pool.query(
            'INSERT INTO orders (user_id, total_price, delivery_method, address, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [user_id, total_price, delivery_method, address, payment_method]
        );
        const orderId = result.rows[0].id;

        // Insert the order items
        const orderItemsPromises = items.map((item) =>
            pool.query(
                'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)',
                [orderId, item.id, item.quantity]
            )
        );
        await Promise.all(orderItemsPromises);

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all orders with their items
app.get('/api/orders', async (req, res) => {
    try {
        const ordersResult = await pool.query(`
            SELECT 
                o.id, 
                o.user_id, 
                CAST(o.total_price AS FLOAT) AS total_price, 
                o.delivery_method, 
                o.address, 
                o.payment_method, 
                o.created_at,
                json_agg(
                    json_build_object(
                        'menu_item_id', oi.menu_item_id, 
                        'item_name', mi.item_name, 
                        'quantity', oi.quantity
                    )
                ) AS items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
            GROUP BY o.id
            ORDER BY o.id ASC
        `);

        res.json(ordersResult.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Save order and order items (new endpoint)
app.post('/api/orders', async (req, res) => {
    console.log('Request Body:', req.body);
    const { userId, deliveryMethod, address, paymentMethod, totalPrice, items } = req.body;

    // Validate the request body
    if (!userId || !totalPrice || !items || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data' });
    }

    try {
        // Insert the order into the database
        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, delivery_method, address, payment_method, total_price, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`,
            [userId, deliveryMethod, address, paymentMethod, totalPrice]
        );

        const orderId = orderResult.rows[0].id;

        // Insert the order items into the database
        const orderItemsQueries = items.map((item) =>
            pool.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity)
                 VALUES ($1, $2, $3)`,
                [orderId, item.menu_item_id, item.quantity]
            )
        );

        await Promise.all(orderItemsQueries);

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

//api endpoint for statistics
app.get('/api/stats', async (req, res) => {
    try {
        console.log('Fetching statistics...');
        const categoriesResult = await pool.query('SELECT COUNT(DISTINCT category) AS count FROM menu_items');
        const foodsResult = await pool.query('SELECT COUNT(*) AS count FROM menu_items');
        const ordersResult = await pool.query('SELECT COUNT(*) AS count FROM orders');
        const usersResult = await pool.query('SELECT COUNT(*) AS count FROM users');
        const revenueResult = await pool.query('SELECT COALESCE(SUM(total_price::NUMERIC), 0) AS revenue FROM orders');

        res.json({
            categories: categoriesResult.rows[0].count || 0,
            foods: foodsResult.rows[0].count || 0,
            orders: ordersResult.rows[0].count || 0,
            users: usersResult.rows[0].count || 0,
            revenue: parseFloat(revenueResult.rows[0].revenue) || 0,
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
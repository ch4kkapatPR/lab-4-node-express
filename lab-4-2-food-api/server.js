const express = require('express');
const cors = require('cors');
const path = require('path');
const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

// ✅ ใช้ foodRoutes
app.use('/api/foods', foodRoutes);

// ✅ API Docs
app.get('/api/docs', (req, res) => {
    res.json({
        endpoints: {
            GET: [
                { path: '/', description: 'Welcome message' },
                { path: '/api/foods', description: 'Get all foods' },
                { path: '/api/foods?search=xxx', description: 'Search by keyword' },
                { path: '/api/foods?category=xxx', description: 'Filter by category' },
                { path: '/api/foods?maxSpicy=3', description: 'Filter by spiciness level' },
                { path: '/api/foods?vegetarian=true', description: 'Filter vegetarian' },
                { path: '/api/stats', description: 'Get foods statistics' },
                { path: '/api/docs', description: 'API documentation' }
            ]
        }
    });
});

// ✅ Stats route 
app.get('/api/stats', (req, res) => {
    const foods = foodRoutes.loadFoods();
    const total = foods.length;
    const byCategory = {};

    foods.forEach(food => {
        byCategory[food.category] = (byCategory[food.category] || 0) + 1;
    });

    res.json({
        totalFoods: total,
        categoryStats: byCategory
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});

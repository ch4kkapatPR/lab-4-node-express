const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// ✅ โหลดข้อมูลจาก food.json
const dataPath = path.join(__dirname, '../data/food.json');

function loadFoods() {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
}

// ✅ GET /api/foods + filter
router.get('/', (req, res) => {
    const foods = loadFoods();
    const { search, category, maxSpicy, vegetarian } = req.query;
    let result = foods;

    if (search) {
        result = result.filter(f => f.name.includes(search));
    }
    if (category) {
        result = result.filter(f => f.category === category);
    }
    if (maxSpicy) {
        result = result.filter(f => f.spicy <= Number(maxSpicy));
    }
    if (vegetarian) {
        result = result.filter(f => f.vegetarian === (vegetarian === 'true'));
    }

    res.json(result);
});

// ✅ GET /api/foods/:id — ดึงเมนูตาม ID
router.get('/:id', (req, res) => {
    try {
        const foods = loadFoods();
        const id = Number(req.params.id);
        const food = foods.find(f => f.id === id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: `Food with ID ${id} not found`
            });
        }

        res.json(food);
    } catch (error) {
        console.error('❌ Failed to get food by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get food by ID',
            error: error.message
        });
    }
});

// ✅ export ทั้ง router และ function โหลดข้อมูล
module.exports = router;
module.exports.loadFoods = loadFoods;

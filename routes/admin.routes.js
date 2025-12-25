const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Dashboard stats
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      totalProducts: 5,
      totalOrders: 12,
      totalRevenue: 45000,
      totalUsers: 8
    }
  });
});

// Create product
router.post('/products', authMiddleware, (req, res) => {
  const { name, price, material, description } = req.body;
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { id: 6, name, price, material, description }
  });
});

// Update product
router.put('/products/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, price, material, description } = req.body;
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { id, name, price, material, description }
  });
});

// Delete product
router.delete('/products/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

module.exports = router;

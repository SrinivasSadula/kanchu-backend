const express = require('express');
const router = express.Router();

// Sample products data
const products = [
  { id: 1, name: 'Handmade Pottery', price: 2500, material: 'Clay', image: 'pottery.jpg' },
  { id: 2, name: 'Silk Saree', price: 5000, material: 'Silk', image: 'saree.jpg' },
  { id: 3, name: 'Wooden Handicraft', price: 1500, material: 'Wood', image: 'wood.jpg' },
  { id: 4, name: 'Beaded Necklace', price: 3000, material: 'Beads', image: 'necklace.jpg' },
  { id: 5, name: 'Brass Lamp', price: 4000, material: 'Brass', image: 'lamp.jpg' }
];

// Get all products
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: products
  });
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.json({
    success: true,
    data: product
  });
});

// Search products
router.get('/search/query', (req, res) => {
  const { q } = req.query;
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.material.toLowerCase().includes(q.toLowerCase())
  );
  res.json({
    success: true,
    data: results
  });
});

module.exports = router;

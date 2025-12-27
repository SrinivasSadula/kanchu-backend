const express = require('express');
const router = express.Router();

// Sample products data
const products = [
  {
    "id": 1,
    "name": "kanchu(Bronze or Khansa) kancham",
    "price": 4200,
    "material": "Bronze",
    "image": "https://cdn.dotpe.in/longtail/item_thumbnails/8267455/ZfepcomI-800-800.webp",
    "images": ["https://cdn.dotpe.in/longtail/item_thumbnails/8267455/ZfepcomI-800-800.webp", "pottery-2.jpg", "pottery-3.jpg", "pottery-4.jpg"],
    "rating": 4.7,
    "reviews": 102
  },
  {
    "id": 2,
    "name": "Brass design parath",
    "price": 2000,
    "material": "Bronze",
    "image": "https://cdn.dotpe.in/longtail/item_thumbnails/8267455/QCz5OpYV-800-800.webp",
    "images": ["https://cdn.dotpe.in/longtail/item_thumbnails/8267455/QCz5OpYV-800-800.webp", "saree-2.jpg", "saree-3.jpg"],
    "rating": 4.9,
    "reviews": 111
  },
  {
    "id": 3,
    "name": "Brass kagu",
    "price": 500,
    "material": "Brass",
    "image": "https://cdn.dotpe.in/longtail/store-items/8267455/985o539d.jpeg",
    "images": ["https://cdn.dotpe.in/longtail/store-items/8267455/985o539d.jpeg","https://cdn.dotpe.in/longtail/item_thumbnails/8267455/uscXtzKD-800-800.webp"],
    "rating": 3,
    "reviews": 94
  },
  {
    "id": 4,
    "name": "Brass RR ghada",
    "price": 3000,
    "material": "Beads",
    "image": "https://cdn.dotpe.in/longtail/store-items/8267455/KmA4gOi6.jpeg",
    "images": ["https://cdn.dotpe.in/longtail/store-items/8267455/KmA4gOi6.jpeg", "necklace-2.jpg", "necklace-3.jpg"],
    "rating": 3.8,
    "reviews": 78
  },
  {
    "id": 5,
    "name": "Brass Lamp",
    "price": 4000,
    "material": "Brass",
    "image": "lamp.jpg",
    "images": ["lamp.jpg", "lamp-2.jpg", "lamp-3.jpg", "lamp-4.jpg"],
    "rating": 3.1,
    "reviews": 85
  }
]

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

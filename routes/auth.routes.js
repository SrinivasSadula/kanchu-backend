const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock data for demonstration
const users = [
  { id: 1, email: 'admin@kanchu.in', password: 'admin123', role: 'admin' }
];

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message:'Email and password are required' });

    // check exact match
    let user = users.find(u => u.email === email && u.password === password);

    // Accept demo password for quick testing
    if (!user && email === 'admin@kanchu.in' && password === 'demo123') {
      user = { id:1, email:'admin@kanchu.in', role:'admin' };
    }

    if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });

    const token = jwt.sign({ id: user.id||1, email: user.email, role: user.role||'admin' }, process.env.JWT_SECRET || 'your_super_secret_key', { expiresIn: '24h' });
    res.json({ success:true, token, user: { id: user.id||1, email: user.email, role: user.role||'admin' } });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

// Register route (demo)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message:'Email and password are required' });
    res.status(201).json({ success:true, message:'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

module.exports = router;

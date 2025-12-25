const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
  { id: 1, email: 'admin@kanchu.in', password: 'admin123', role: 'admin' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Accept either the real admin password or the demo password for testing
  const allowedDemo = (password === 'demo123');
  if (password !== user.password && !allowedDemo) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_super_secret_key', { expiresIn: '12h' });

  return res.json({ success: true, token });
});

module.exports = router;

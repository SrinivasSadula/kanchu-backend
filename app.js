const express = require('express');
const cors = require('cors');
const { errorHandler, asyncHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kanchu API is Live' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;

const app = require('./app');
const { errorHandler } = require('./middleware/errorHandler');

// Error handling middleware (place at the END)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Kanchu API running on port ' + PORT);
});

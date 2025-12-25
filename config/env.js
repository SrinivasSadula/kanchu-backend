module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'kanchu_db',
  DB_PORT: process.env.DB_PORT || 3306,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // API
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api',
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:4200'],
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS
};

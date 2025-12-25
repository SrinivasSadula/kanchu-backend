/**
 * Global Error Handler Middleware
 * Handles all application errors and sends appropriate responses
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Handling wrong MongoDB id error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new AppError(message, 400);
  }

  // Handling JWT expired error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid, Try again ';
    err = new AppError(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is expired, Try again ';
    err = new AppError(message, 400);
  }

  // Handling duplicate KEY error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new AppError(message, 400);
  }

  // Database connection error
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    err = new AppError('Database connection lost', 503);
  }

  if (err.code === 'ER_CON_COUNT_ERROR') {
    err = new AppError('Database has too many connections', 503);
  }

  if (err.code === 'ECONNREFUSED') {
    err = new AppError('Database server refused the connection', 503);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    err = new AppError(message, 400);
  }

  // Missing required fields
  if (err.name === 'SyntaxError') {
    err = new AppError('Invalid JSON in request body', 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: {
      message: err.message,
      status: err.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

/**
 * Async error wrapper - catches errors in async route handlers
 * Usage: router.get('/route', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { errorHandler, AppError, asyncHandler };

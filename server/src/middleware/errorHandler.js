// server/src/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
}

module.exports = errorHandler;

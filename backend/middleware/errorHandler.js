const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "An unexpected error occurred.",
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = errorHandler;

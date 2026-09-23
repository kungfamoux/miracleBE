const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Prisma record not found
  if (err.code === 'P2025') {
    const message = 'Record not found';
    error = { message, statusCode: 404 };
  }

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Prisma validation error
  if (err.code === 'P2003') {
    const message = 'Foreign key constraint failed';
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

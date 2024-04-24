import logger from '../config/logger.js';
import handler from '../errors/handlers/handler.js';
import IS_DEV_ENV from '../utils/general/isDevEnv.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error = handler(err);
  error.stack = err.stack;

  logger.error(
    error,
    'Error message from the centralized error-handling component',
  );

  res.status(error.httpCode).json({
    name: error.name,
    httpCode: error.httpCode,
    message: error.message,
    isOperational: error.isOperational,
    ...(IS_DEV_ENV && { stack: error.stack }),
  });
};

export default errorHandler;

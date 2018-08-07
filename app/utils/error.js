import boom from 'boom';
import log from './log';

const createError = (name) => (message, data = {}) =>
  Object.assign(new Error(message), { ...data, name });

const errorMiddleware = (options) => (err, req, res, next) => {
  const error = err.isBoom ? err.output.payload : boom.internal().output.payload;
  log.error(error);
  res.status(error.statusCode).json(error);
};

export default {
  create: createError,
  middleware: errorMiddleware
};

import boom from 'boom';
import log from './log';

const createError = (name) => (message, data = {}) =>
  Object.assign(new Error(message), { ...data, name });

const errorMiddleware = (options) => (err, req, res, next) => {
  console.error(err);
  log.error(err.message);

  const error = (err.isBoom ? err : boom.internal(err.message)).output.payload;

  res.status(error.statusCode).json(error);
};

export default {
  create: createError,
  middleware: errorMiddleware
};

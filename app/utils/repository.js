import error from './../utils/error';
import log from './../utils/log';

const createDbError = error.create('DatabaseError');

export const handleError = () => (err) => {
  log.error(err);
  throw createDbError('There was a database error.');
};

export const ifQuery = (query) => typeof query === 'object' && Object.keys(query).length;

export default {
  handleError,
  ifQuery
};

import error from './../utils/error';
import log from './../utils/log';

const createDbError = error.create('DatabaseError');

function handleDbError (err) {
  log.error(err);

  throw createDbError('There was an error with the database.');
}

export default {
  handleDbError
};

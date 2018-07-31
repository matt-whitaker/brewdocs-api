import Promise from 'bluebird';
import database from '../utils/database';
import repositoryUtils from '../utils/repository';

function findRecipes (query = {}) {
  const q = database.from('recipes').select('*');

  if (typeof query === 'object' && Object.keys(query).length) {
    return q.where(query).catch(repositoryUtils.handleDbError);
  }

  return q.catch(repositoryUtils.handleDbError);
}

function deleteRecipe (query = {}) {
  if (typeof query === 'object' && Object.keys(query).length) {
    return database.from('recipes').where(query).del()
      .catch(repositoryUtils.handleDbError);
  }

  return Promise.reject(new Error('Query is empty.'))
    .catch(repositoryUtils.handleDbError);
}

export default { find: findRecipes, delete: deleteRecipe };

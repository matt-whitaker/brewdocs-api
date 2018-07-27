import database from '../utils/database';
import repositoryUtils from '../utils/repository';

function getRecipes () {
  return database.from('recipes').select('*')
    .catch(repositoryUtils.handleDbError);
}

export default {
  get: getRecipes
};

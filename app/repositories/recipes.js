import database from '../utils/database';
import repositoryUtils from '../utils/repository';

function findRecipes (query = {}) {
  const trx = database.from('recipes').select('*');

  return ((typeof query === 'object' && Object.keys(query).length) ? trx.where(query) : trx)
    .catch(repositoryUtils.handleDbError);
}

export default { find: findRecipes };

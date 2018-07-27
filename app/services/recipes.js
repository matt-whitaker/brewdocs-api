import recipesRepository from './../repositories/recipes';
import serviceUtils from '../utils/service';

function list () {
  return recipesRepository.get().catch(serviceUtils.handleError);
}

export default {
  list
};

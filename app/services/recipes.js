import Promise from 'bluebird';
import boom from 'boom';
import { ifElse, isEmpty, head } from 'ramda';

import recipesRepository from './../repositories/recipes';
import serviceUtils from '../utils/service';

function list () {
  return recipesRepository.find().catch(serviceUtils.handleError);
}

function get (slug) {
  const notFound = () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
  const handleEmpty = ifElse(isEmpty, notFound, head);

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .catch(serviceUtils.handleError);
}

export default { list, get };

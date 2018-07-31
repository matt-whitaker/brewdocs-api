import Promise from 'bluebird';
import boom from 'boom';
import { ifElse, isEmpty, head, when } from 'ramda';

import recipesRepository from './../repositories/recipes';
import serviceUtils from '../utils/service';

function listRecipes () {
  return recipesRepository.find().catch(serviceUtils.handleError);
}

function getRecipe (slug) {
  const notFound = () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
  const handleEmpty = ifElse(isEmpty, notFound, head);

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .catch(serviceUtils.handleError);
}

function deleteRecipe (slug) {
  const notFound = () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
  const handleEmpty = when(isEmpty, notFound);

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .then(() => recipesRepository.delete({ slug }))
    .catch(serviceUtils.handleError);
}

export default { list: listRecipes, get: getRecipe, delete: deleteRecipe };

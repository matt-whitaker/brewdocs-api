import Promise from 'bluebird';
import boom from 'boom';
import slugify from 'slug';
import { head, ifElse, isEmpty, when } from 'ramda';

import recipesRepository from './../repositories/recipes';
import recipeValidator from './../validators/recipe';
import serviceUtils from '../utils/service';

function listRecipes () {
  return recipesRepository.find()
    .catch(serviceUtils.handleError);
}

function getRecipe (slug) {
  const notFound = () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
  const handleEmpty = ifElse(isEmpty, notFound, head);

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .catch(serviceUtils.handleError);
}

function createRecipe (data) {
  const slug = slugify(data.slug || data.name || '', { lower: true });
  const conflict = () => Promise.reject(boom.conflict(`Recipe "${slug}" already exists.`));
  const handleFound = when(head, conflict);

  const validateRecipe = recipeValidator.validate({ slug, id: null });

  return recipesRepository.find({ slug })
    .then(handleFound)
    .then(() => validateRecipe(data))
    .then((data) => recipesRepository.create(data))
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

export default {
  list: listRecipes,
  get: getRecipe,
  create: createRecipe,
  delete: deleteRecipe
};

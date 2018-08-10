import Promise from 'bluebird';
import boom from 'boom';
import slugify from 'slug';
import { prop, pipe, head, ifElse, isEmpty, when } from 'ramda';

import recipesRepository from './../repositories/recipes';
import recipeValidator from './../validators/recipe';
import serviceUtils from '../utils/service';

const notFound = (slug) => () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
const conflict = (slug) => () => Promise.reject(boom.conflict(`Recipe "${slug}" already exists.`));

function listRecipes () {
  return recipesRepository.find()
    .catch(serviceUtils.handleError);
}

function getRecipe (slug) {
  const handleEmpty = ifElse(isEmpty, notFound(slug), head);

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .catch(serviceUtils.handleError);
}

function createRecipe (data) {
  const slug = slugify(data.slug || data.name || '', { lower: true });
  const handleFound = when(head, conflict(slug));

  const validateRecipe = recipeValidator.validate({ slug, id: null });
  const validate = () => validateRecipe(data);
  const create = (recipe) => recipesRepository.create(recipe);

  return recipesRepository.find({ slug })
    .then(handleFound)
    .then(validate)
    .then(create)
    .catch(serviceUtils.handleError);
}

function updateRecipe (_slug, data) {
  const slug = slugify(data.slug || data.name || _slug, { lower: true });

  const _slugQuery = { slug: _slug };
  const slugQuery = { slug };

  const getOldRecipe = pipe(prop('oldRecipe'), head);

  const oldIsEmpty = pipe(prop('oldRecipe'), isEmpty);
  const handleOldEmpty = when(oldIsEmpty, notFound(_slug));

  const newIsFound = pipe(prop('newRecipe'), head);
  const handleNewFound = when(newIsFound, conflict(slug));

  const validate = (recipe) => recipeValidator.validate({ slug, id: recipe.id })(recipe);
  const update = (recipe) => recipesRepository.update(_slugQuery, recipe);

  return Promise.props({
    oldRecipe: recipesRepository.find(_slugQuery),
    newRecipe: _slug !== slug ? recipesRepository.find(slugQuery) : []
  })
    .then(handleOldEmpty)
    .then(handleNewFound)
    .then(getOldRecipe)
    .then(validate)
    .then(update)
    .catch(serviceUtils.handleError);
}

function deleteRecipe (slug) {
  const handleEmpty = when(isEmpty, notFound(slug));

  const destroy = () => recipesRepository.delete({ slug });

  return recipesRepository.find({ slug })
    .then(handleEmpty)
    .then(destroy)
    .catch(serviceUtils.handleError);
}

export default {
  list: listRecipes,
  get: getRecipe,
  create: createRecipe,
  update: updateRecipe,
  delete: deleteRecipe
};

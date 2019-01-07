import Promise from 'bluebird';
import boom from 'boom';
import slugify from 'slug';
import uuid from "uuid";
import { head, ifElse, isEmpty, when } from 'ramda';

import Recipe from '../models/Recipe';
import recipesRepository from './../repositories/recipes';
import { handleError } from '../utils/service';

const notFound = (slug) => () => Promise.reject(boom.notFound(`Recipe "${slug}" not found.`));
const conflict = (slug) => () => Promise.reject(boom.conflict(`Recipe "${slug}" already exists.`));

const service = {
  listRecipes () {
    const correlationId = this._correlation || uuid.v4();

    return recipesRepository
      .correlate(correlationId)
      .findRecipes()
      .catch(handleError);
  },

  getRecipe (slug) {
    const correlationId = this._correlation || uuid.v4();
    const handleEmpty = ifElse(isEmpty, notFound(slug), head);

    return recipesRepository
      .correlate(correlationId)
      .findRecipes({ slug })
      .then(handleEmpty)
      .catch(handleError);
  },

  createRecipe (data) {
    const correlationId = this._correlation || uuid.v4();
    /**
     * Allow custom slug, empty will fail validation
     */
    const slug = slugify(data.slug || data.name || '', { lower: true });
    const handleFound = ifElse(head, conflict(slug), () => new Recipe(data));

    const find = (slug) => recipesRepository
      .correlate(correlationId)
      .findRecipes({ slug });

    const create = (recipe) => recipesRepository
      .correlate(correlationId)
      .createRecipe(recipe);

    return find(slug)
      .then(handleFound)
      .then(create)
      .catch(handleError);
  },

  updateRecipe (_slug, data) {
    const correlationId = this._correlation || uuid.v4();

    // const slug = slugify(data.slug || data.name || _slug, { lower: true });
    //
    // const _slugQuery = { slug: _slug };
    // const slugQuery = { slug };
    //
    // const getOldRecipe = pipe(prop('oldRecipe'), head);
    //
    // const oldIsEmpty = pipe(prop('oldRecipe'), isEmpty);
    // const handleOldEmpty = when(oldIsEmpty, notFound(_slug));
    //
    // const newIsFound = pipe(prop('newRecipe'), head);
    // const handleNewFound = when(newIsFound, conflict(slug));
    //
    // const validate = (recipe) => recipeValidator.validate({ slug, id: recipe.id })(data);
    // const update = (recipe) => recipesRepository.update(_slugQuery, recipe);
    //
    // return Promise.props({
    //   oldRecipe: recipesRepository.find(_slugQuery),
    //   newRecipe: _slug !== slug ? recipesRepository.find(slugQuery) : []
    // })
    //   .then(handleOldEmpty)
    //   .then(handleNewFound)
    //   .then(getOldRecipe)
    //   .then(validate)
    //   .then(update)
    //   .catch(handleError);
  },

  deleteRecipe (slug) {
    const correlationId = this._correlation || uuid.v4();
    const handleEmpty = when(isEmpty, notFound(slug));

    const find = (slug) => recipesRepository
      .correlate(correlationId)
      .findRecipes({ slug });

    const destroy = (recipe) => recipesRepository
      .correlate(correlationId)
      .deleteRecipe(recipe);

    return find(slug)
      .then(handleEmpty)
      .then(destroy)
      .catch(handleError);
  },

  correlate(id) {
    console.log(id);
    return Object.create(this, {
      _correlation: { value: id }
    });
  }
};

export default service;

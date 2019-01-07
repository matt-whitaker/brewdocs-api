import Promise from 'bluebird';
import { transaction } from 'objection'
import Recipe from '../models/Recipe';
import utils from '../utils/repository';

const handleError = utils.handleError('recipes');

const repository = {
  /**
   * Retrieves a list of recipes. Supports basic key-value query via an object.
   * @param   {Object} query
   * @returns {Promise<Recipe[]>}
   */
  findRecipes (query = {}) {
    if (utils.ifQuery(query)) {
      return Recipe.query().where(query).catch(handleError);
    }

    return Recipe.query().catch(handleError);
  },

  /**
   * Save a new recipe.
   * @param   {Recipe} recipe
   * @returns {Promise<Recipe>}
   */
  createRecipe (recipe) {
    return transaction.start(Recipe.knex())
      .then((trx) =>
        recipe.$query(trx).insertGraphAndFetch(recipe)
          .catch(handleError));
  },

  /**
   * Save an existing recipe.
   * @param   {Recipe} recipe
   * @returns {Promise<Recipe>}
   */
  updateRecipe (recipe) {
    return transaction.start(Recipe.knex())
      .then((trx) =>
        recipe.$query(trx).upsertGraphAndFetch(recipe)
          .catch(handleError));
  },

  /**
   * Deletes a recipe
   * @param   {Recipe} recipe
   * @returns {Promise}
   */
  deleteRecipe (recipe) {
    return transaction.start(Recipe.knex())
      .then((trx) =>
        recipe.$query(trx).delete()
          .catch(handleError))
  },

  /**
   * Return a child of the service bound to the correlationId
   * @param id
   * @returns {any}
   */
  correlate(id) {
    console.log(id);
    return Object.create(this, {
      _correlation: { value: id }
    });
  }
};

export default repository;

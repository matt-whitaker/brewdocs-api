import RESTRouter from '../../utils/RESTRouter';

/**
 * Router for recipes REST endpoints
 */
class RecipesRouter extends RESTRouter {
  /**
   * Setup the router with the recipes controller
   */
  constructor(recipesController) {
    super(recipesController);
  }
}

export default RecipesRouter;

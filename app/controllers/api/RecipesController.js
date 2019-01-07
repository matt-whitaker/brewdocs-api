import RESTController from "../../utils/RESTController";

class RecipesController extends RESTController {
  constructor(recipesService) {
    super();

    this.recipesService = recipesService;
  }

  list(req, res, next) {
    return this.recipesService
      .listRecipes()
      .then((recipes) => res.status(200).json(recipes))
      .catch(next);
  }

  get(req, res, next) {
    return this.recipesService
      .getRecipe(req.params.slug)
      .then((recipe) => res.status(200).json(recipe))
      .catch(next);
  }

  create(req, res, next) {
    return this.recipesService
      .createRecipe(req.body)
      .then((recipe) => res.status(201).json(recipe))
      .catch(next);
  }

  update(req, res, next) {
    return this.recipesService
      .updateRecipe(req.params.slug, req.body)
      .then((recipe) => res.status(200).json(recipe))
      .catch(next);
  }

  delete(req, res, next) {
    return this.recipesService
      .deleteRecipe(req.params.slug)
      .then(() => res.sendStatus(204))
      .catch(next);
  }
}

export default RecipesController;

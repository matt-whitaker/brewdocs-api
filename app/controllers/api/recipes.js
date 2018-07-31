import recipesService from './../../services/recipes';

function listRecipes (req, res, next) {
  return recipesService.list()
    .then((recipes) => res.status(200).json(recipes))
    .catch(next);
}

function getRecipe (req, res, next) {
  return recipesService.get(req.params.slug)
    .then((recipe) => res.status(200).json(recipe))
    .catch(next);
}

function deleteRecipe (req, res, next) {
  return recipesService.delete(req.params.slug)
    .then(() => res.sendStatus(204))
    .catch(next);
}

export default { list: listRecipes, get: getRecipe, delete: deleteRecipe };

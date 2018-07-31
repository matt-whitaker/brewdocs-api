import recipesService from './../../services/recipes';

function list (req, res, next) {
  return recipesService.list()
    .then((recipes) => res.status(200).json(recipes))
    .catch(next);
}

function get (req, res, next) {
  return recipesService.get(req.match.params.slug)
    .then((recipe) => res.status(200).json(recipe))
    .catch(next);
}

export default { list, get };

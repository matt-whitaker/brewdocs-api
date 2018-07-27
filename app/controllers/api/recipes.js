import recipesService from './../../services/recipes';

function list (req, res) {
  return recipesService.list().then((recipes) => res.status(200).json(recipes));
}

export default {
  list
};

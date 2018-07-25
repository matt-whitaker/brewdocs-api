import recipes from './../../repositories/recipes';

function list (req, res, next) {
    recipes.get().then((recipes) => res.status(200).json(recipes));
}

export default {
    list
};
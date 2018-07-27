import recipesRepository from './../../repositories/recipes';

function list (req, res) {
    return recipesRepository.get().then((recipes) => res.status(200).json(recipes));
}

export default {
    list
};
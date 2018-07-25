import database from '../utils/database';

function getRecipes () {
    return database.from('recipes').select('*');
}

export default {
    get: getRecipes
}
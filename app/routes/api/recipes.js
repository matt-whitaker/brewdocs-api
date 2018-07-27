import {Router} from 'express';
import recipes from '../../controllers/api/recipes';

function createRouter () {
  const router = new Router();

  router.get('/', recipes.list);

  return router;
}

export default {
  router: createRouter
}

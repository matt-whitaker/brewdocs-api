import { Router } from 'express';
import recipes from '../../controllers/api/recipes';

function createRouter () {
  const router = new Router();

  router.get('/', recipes.list);
  router.get('/:slug', recipes.get);

  return router;
}

export default { router: createRouter };

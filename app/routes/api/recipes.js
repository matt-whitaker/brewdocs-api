import { Router } from 'express';
import recipes from '../../controllers/api/recipes';

function createRouter () {
  const router = new Router();

  router.get('/', recipes.list);
  router.post('/', recipes.create);
  router.get('/:slug', recipes.get);
  router.put('/:slug', recipes.update);
  router.delete('/:slug', recipes.delete);

  return router;
}

export default { router: createRouter };

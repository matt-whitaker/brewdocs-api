import { Router } from 'express';
import recipes from './recipes';

function createRouter () {
  const router = new Router();

  router.use('/recipes', recipes.router());

  return router;
}

export default {
  router: createRouter
};

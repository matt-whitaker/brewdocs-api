import {Router} from 'express';
import health from '../controllers/health';

function createRouter () {
  const router = new Router();

  router.get('/', health.check);

  return router;
}

export default {
  router: createRouter
}

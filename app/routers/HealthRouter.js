import { Router } from 'express';
import health from '../controllers/health';

class HealthRouter extends Router {
  constructor() {
    super();

    this.get('/', health.check);
  }
}

export default HealthRouter;

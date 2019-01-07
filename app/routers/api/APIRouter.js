import { json } from 'body-parser';
import { Router } from 'express';
import RecipesRouter from './RecipesRouter';
import RecipesController from "../../controllers/api/RecipesController";

class APIRouter extends Router {
  constructor() {
    super();

    this.use(json());
    this.use('/recipes', new RecipesRouter(new RecipesController())); // TODO: Setup DI
  }
}

export default APIRouter;

import JoiModel from '../utils/JoiModel';
import schema from '../schemas/recipe';

export default class Recipe extends JoiModel {
  static get tableName() {
    return 'recipes'
  }

  static get schema() {
    return schema;
  }
}
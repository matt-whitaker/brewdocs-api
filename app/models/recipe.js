import { Model } from 'objection';
import validator from '../utils/JoiValidator';
import schmea from '../schemas/recipe';

export default class Recipe extends Model {
    static get tableName () {
        return 'recipes'
    }

    static get joiSchema () {
        return schema.schema;
    }

    static createValidator () {
        const { JoiValidator } = validator;
        return new JoiValidator();
    }
}
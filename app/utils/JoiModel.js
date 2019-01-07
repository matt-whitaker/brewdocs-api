import { Model } from 'objection';
import JoiValidator from '../utils/JoiValidator';

export default class JoiModel extends Model {
  static createValidator() {
    return new JoiValidator();
  }
}
import boom from 'boom';
import { reject, isNil } from 'ramda';

const rejectNil = reject(isNil);

const validateRecipe = (overrides) => (recipe) => {
  const { error, value } = schema.validate((rejectNil({ ...recipe, ...overrides })));

  if (error) {
    return Promise.reject(boom.badData(error));
  }

  return Promise.resolve(value);
};

export default { validate: validateRecipe };


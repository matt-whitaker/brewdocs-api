import boom from 'boom';
import joi from 'joi';
import { reject, isNil } from 'ramda';

const rejectNil = reject(isNil);

const schema = joi.object().required().keys({
  id: joi.number().optional(),
  slug: joi.string().optional().when(joi.ref('id'), { is: joi.exist(), then: joi.required() }),
  name: joi.string().required(),
  description: joi.string().optional().default(null)
});

const validateRecipe = (overrides) => (recipe) => {
  const { error, value } = schema.validate((rejectNil({ ...recipe, ...overrides })));

  if (error) {
    return Promise.reject(boom.badData(error));
  }

  return Promise.resolve(value);
};

export default { validate: validateRecipe };

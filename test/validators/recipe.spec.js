import recipeValidator from '../../app/validators/recipe';

describe('recipe validator', () => {
  describe('#validate', () => {
    it('succeeds a valid recipe', () => {
      return recipeValidator.validate({})({ name: 'test' });
    });

    it('fails an invalid recipe', (done) => {
      recipeValidator.validate({})({})
        .catch(() => done());
    });

    it('overrides data', () => {
      return recipeValidator.validate({ name: 'test' })({});
    });
  });
});

import recipesRepository from '../../../app/repositories/recipes';
import recipesController from '../../../app/controllers/api/recipes';

describe('recipes controller', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.reset();
  });

  const mockRecipesRepository = sandbox.mock(recipesRepository);

  describe('#list', () => {
    it('resolves with an empty list', () => {
      const response = {
        status () {
        },
        json () {
        }
      };
      const mockResponse = sandbox.mock(response);

      mockRecipesRepository.expects('get').resolves([]);
      mockResponse.expects('status').withArgs(200).returns(response);
      mockResponse.expects('json').withArgs([]);

      return recipesController.list({}, response)
        .then(() => {
          mockRecipesRepository.verify();
          mockResponse.verify();
        });
    });
  })
});

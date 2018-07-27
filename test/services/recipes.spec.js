import recipesRepository from '../../app/repositories/recipes';
import recipesService from '../../app/services/recipes';

import recipesData from '../../data/recipes';

describe('recipes service', () => {
  let sandbox, mockRecipesRepository;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockRecipesRepository = sandbox.mock(recipesRepository);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#list', () => {
    it('can resolve with an empty list', () => {
      mockRecipesRepository.expects('get').resolves([]);

      return recipesService.list()
        .then((recipes) => {
          expect(recipes).to.eql([]);
          mockRecipesRepository.verify();
        });
    });

    it('can resolve with an a populated list', () => {
      mockRecipesRepository.expects('get').resolves(recipesData);

      return recipesService.list()
        .then((recipes) => {
          expect(recipes).to.eql(recipesData);
          mockRecipesRepository.verify();
        });
    });

    it('can bubble an error', () => {
      const error = new Error();
      mockRecipesRepository.expects('get').rejects(error);

      return recipesService.list()
        .then(failResolve)
        .catch((err) => expect(err).to.eql(error));
    });
  });
});

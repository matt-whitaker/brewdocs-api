import recipesRepository from '../../app/repositories/recipes';
import recipesService from '../../app/services/recipes';

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
      mockRecipesRepository.expects('get').resolves([{ id: 1 }, { id: 2 }]);

      return recipesService.list()
        .then((recipes) => {
          expect(recipes).to.eql([{ id: 1 }, { id: 2 }]);
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

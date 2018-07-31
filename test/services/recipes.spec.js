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
      mockRecipesRepository.expects('find').resolves([]);

      return recipesService.list()
        .then((recipes) => {
          expect(recipes).to.eql([]);
          mockRecipesRepository.verify();
        });
    });

    it('can resolve with an a populated list of recipes', () => {
      mockRecipesRepository.expects('find').resolves(recipesData);

      return recipesService.list()
        .then((recipes) => {
          expect(recipes).to.eql(recipesData);
          mockRecipesRepository.verify();
        });
    });

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find').rejects(error);

      recipesService.list()
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });

  describe('#get', () => {
    it('can reject if empty', (done) => {
      mockRecipesRepository.expects('find').resolves([]);

      recipesService.get('test')
        .catch((e) => {
          expect(e.output.payload).to.eql({
            statusCode: 404,
            error: 'Not Found',
            message: 'Recipe "test" not found.'
          });
          expect(e.isBoom).to.be.true;
          done();
        })
        .catch(done);
    });

    it('can resolve with a recipe', () => {
      mockRecipesRepository.expects('find')
        .withArgs(sinon.match({ slug: 'test' }))
        .resolves([recipesData[0]]);

      return recipesService.get('test')
        .then((recipe) => {
          expect(recipe).to.eql(recipesData[0]);
          mockRecipesRepository.verify();
        });
    });

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find')
        .withArgs(sinon.match({ slug: 'test' }))
        .rejects(error);

      recipesService.get('test')
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });
});

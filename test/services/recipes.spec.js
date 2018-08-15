import { omit } from 'ramda';
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
    it('can resolve with a recipe', () => {
      const recipeData = recipesData[0];
      const { slug } = recipeData;

      mockRecipesRepository.expects('find')
        .withArgs(sinon.match({ slug }))
        .resolves([recipeData]);

      return recipesService.get(slug)
        .then((recipe) => {
          expect(recipe).to.eql(recipeData);
          mockRecipesRepository.verify();
        });
    });

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

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find').rejects(error);

      recipesService.get('test')
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });

  describe('#create', () => {
    it('can create a recipe', () => {
      const recipeData = recipesData[0];
      const { slug } = recipeData;

      mockRecipesRepository.expects('find').withArgs({ slug }).resolves([]);
      mockRecipesRepository.expects('create').withArgs({
        ...omit(['id'], recipeData)
      }).resolves({
        id: 1,
        ...recipeData
      });

      return recipesService.create(omit(['id'], recipeData))
        .then((recipe) => {
          expect(recipe).to.eql({
            ...recipeData
          });
        });
    });

    it('can conflict with a recipe', (done) => {
      const recipeData = recipesData[0];
      const { slug } = recipeData;

      mockRecipesRepository.expects('find').withArgs({ slug }).resolves([recipeData]);

      recipesService.create(recipeData)
        .catch((err) => {
          expect(err.output.payload).to.eql({
            statusCode: 409,
            error: 'Conflict',
            message: `Recipe "${slug}" already exists.`
          });
          expect(err.isBoom).to.be.true;
          mockRecipesRepository.verify();
          done();
        })
        .catch(done);
    });

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find').rejects(error);

      recipesService.create({})
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });

  describe('#update', () => {
    it('can update a recipe', () => {
      const recipeData = recipesData[0];
      const { id, slug } = recipeData;

      mockRecipesRepository.expects('find').withArgs({ slug }).resolves([recipeData]);
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([]);

      mockRecipesRepository.expects('update').withArgs({
        slug
      }, {
        id,
        name: 'Test',
        slug: 'test',
        description: 'test'
      }).resolves({
        id,
        name: 'Test',
        slug: 'test',
        description: 'test'
      });

      return recipesService.update(slug, { id: 1, name: 'Test', description: 'test' })
        .then((recipe) => {
          expect(recipe).to.eql({
            id,
            name: 'Test',
            slug: 'test',
            description: 'test'
          });
        });
    });

    it('can throw when not found', (done) => {
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([]);
      mockRecipesRepository.expects('find').withArgs({ slug: 'test-2' }).resolves([]);

      recipesService.update('test', { name: 'Test 2' })
        .catch((err) => {
          expect(err.output.payload).to.eql({
            statusCode: 404,
            error: 'Not Found',
            message: 'Recipe "test" not found.'
          });
          expect(err.isBoom).to.be.true;
          mockRecipesRepository.verify();
          done();
        })
        .catch(done);
    });

    it('can conflict with a recipe', (done) => {
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([{}]);
      mockRecipesRepository.expects('find').withArgs({ slug: 'test-2' }).resolves([{}]);

      recipesService.update('test', { name: 'Test 2' })
        .catch((err) => {
          expect(err.output.payload).to.eql({
            statusCode: 409,
            error: 'Conflict',
            message: 'Recipe "test-2" already exists.'
          });
          expect(err.isBoom).to.be.true;
          mockRecipesRepository.verify();
          done();
        })
        .catch(done);
    });

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find').rejects(error);

      recipesService.update('test', { })
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });

  describe('#delete', () => {
    it('can delete a recipe', () => {
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([{}]);
      mockRecipesRepository.expects('delete').withArgs({ slug: 'test' }).resolves();

      return recipesService.delete('test')
        .then(() => {
          mockRecipesRepository.verify();
        });
    });

    it('can reject if empty', (done) => {
      mockRecipesRepository.expects('find').resolves([]);
      mockRecipesRepository.expects('delete').never();

      recipesService.get('test')
        .catch((e) => {
          expect(e.output.payload).to.eql({
            statusCode: 404,
            error: 'Not Found',
            message: 'Recipe "test" not found.'
          });
          expect(e.isBoom).to.be.true;
          mockRecipesRepository.verify();
          done();
        })
        .catch(done);
    });

    it('can bubble an error', (done) => {
      const error = new Error();
      mockRecipesRepository.expects('find').rejects(error);

      recipesService.get('test')
        .catch((err) => {
          expect(err).to.eql(error);
          done();
        })
        .catch(done);
    });
  });
});

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
      mockRecipesRepository.expects('find')
        .withArgs(sinon.match({ slug: 'test' }))
        .resolves([recipesData[0]]);

      return recipesService.get('test')
        .then((recipe) => {
          expect(recipe).to.eql(recipesData[0]);
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
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([]);
      mockRecipesRepository.expects('create').withArgs({
        name: 'Test',
        slug: 'test',
        description: null
      }).resolves({
        id: 1,
        name: 'Test',
        slug: 'test'
      });

      return recipesService.create({ name: 'Test' })
        .then((recipe) => {
          expect(recipe).to.eql({
            id: 1,
            name: 'Test',
            slug: 'test'
          });
        });
    });

    it('can conflict with a recipe', (done) => {
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([recipesData[0]]);

      recipesService.create({ name: 'test' })
        .catch((err) => {
          expect(err.output.payload).to.eql({
            statusCode: 409,
            error: 'Conflict',
            message: 'Recipe "test" already exists.'
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
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([recipesData[0]]);
      mockRecipesRepository.expects('find').withArgs({ slug: 'test-2' }).resolves([]);

      mockRecipesRepository.expects('update').withArgs({
        slug: 'test'
      }, {
        id: 1,
        name: 'Test 2',
        slug: 'test-2',
        description: 'test 2'
      }).resolves({
        id: 1,
        name: 'Test 2',
        slug: 'test-2',
        description: 'test 2'
      });

      return recipesService.update('test', { id: 1, name: 'Test 2', description: 'test 2' })
        .then((recipe) => {
          expect(recipe).to.eql({
            id: 1,
            name: 'Test 2',
            slug: 'test-2',
            description: 'test 2'
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
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([recipesData[0]]);
      mockRecipesRepository.expects('find').withArgs({ slug: 'test-2' }).resolves([recipesData[0]]);

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
      mockRecipesRepository.expects('find').withArgs({ slug: 'test' }).resolves([recipesData[0]]);
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

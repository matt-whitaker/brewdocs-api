import database from '../../app/utils/database';
import recipesRepository from '../../app/repositories/recipes';

import recipesData from '../../data/recipes';

describe('recipes repository', () => {
  let sandbox, mockDatabase;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockDatabase = sandbox.mock(database);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#get', () => {
    beforeEach(() => {
      mockDatabase.expects('from').withArgs('recipes').returns(database);
      mockDatabase.where = function () {};
    });

    it('can retrieve and empty list', () => {
      mockDatabase.expects('select').withArgs('*').resolves([]);

      return recipesRepository.find()
        .then((recipes) => {
          expect(recipes).to.eql([]);
          mockDatabase.verify();
        });
    });

    it('can retrieve a list of recipes', () => {
      mockDatabase.expects('select').withArgs('*').resolves(recipesData);

      return recipesRepository.find()
        .then((recipes) => {
          expect(recipes).to.eql(recipesData);
          mockDatabase.verify();
        });
    });

    it('can retrieve a list of recipes by query', () => {
      mockDatabase.expects('select').withArgs('*').returns(database);
      mockDatabase.expects('where').withArgs(sinon.match({ slug: 'test' })).resolves(recipesData);

      return recipesRepository.find({ slug: 'test' })
        .then((recipe) => {
          expect(recipe).to.eql(recipesData);
          mockDatabase.verify();
        });
    });

    it('can retrieve a list of recipes by empty query', () => {
      mockDatabase.expects('select').withArgs('*').resolves(recipesData);

      return recipesRepository.find({})
        .then((recipe) => {
          expect(recipe).to.eql(recipesData);
          mockDatabase.verify();
        });
    });

    it('can capture a database error', (done) => {
      const error = new Error();
      mockDatabase.expects('select').withArgs('*').rejects(error);

      recipesRepository.find()
        .catch(({ name, message }) => {
          expect({ name, message }).to.eql({
            name: 'DatabaseError',
            message: 'There was a database error.'
          });
          done();
        })
        .catch(done);
    });
  });
});

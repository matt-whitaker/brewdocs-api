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
    });

    it('can resolve with an empty list', () => {
      mockDatabase.expects('select').withArgs('*').resolves([]);

      return recipesRepository.get()
        .then((recipes) => {
          expect(recipes).to.eql([]);
          mockDatabase.verify();
        });
    });

    it('can resolve with an a populated list', () => {
      mockDatabase.expects('select').withArgs('*').resolves(recipesData);

      return recipesRepository.get()
        .then((recipes) => {
          expect(recipes).to.eql(recipesData);
          mockDatabase.verify();
        });
    });

    it('can capture a database error', () => {
      const error = new Error();
      mockDatabase.expects('select').withArgs('*').rejects(error);

      return recipesRepository.get()
        .then(failResolve)
        .catch(({ name, message }) => {
          expect({ name, message }).to.eql({
            name: 'DatabaseError',
            message: 'There was a database error.'
          });
        });
    });
  });
});

import database from '../../app/utils/database';
import repository from '../../app/repositories/recipes';

describe('recipes repository', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.reset();
    });

    const mockDatabase = sandbox.mock(database);

    describe('#get', () => {
        it('can resolve with an empty list', () => {
            mockDatabase.expects('from').withArgs('recipes').returns(database);
            mockDatabase.expects('select').withArgs('*').resolves([]);

            return repository.get()
                .then((recipes) => {
                    expect(recipes).to.eql([]);
                    mockDatabase.verify();
                });
        });

        it('can resolve with an a populated list', () => {
            mockDatabase.expects('from').withArgs('recipes').returns(database);
            mockDatabase.expects('select').withArgs('*').resolves([{id: 1}]);

            return repository.get()
                .then((recipes) => {
                    expect(recipes).to.eql([{id: 1}, {id: 2}]);
                    mockDatabase.verify();
                });
        });

        it('can capture a database error', () => {
            throw(new Error('not tested'))
        })
    });
});
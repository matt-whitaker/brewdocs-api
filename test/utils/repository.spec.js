import repositoryUtils from '../../app/utils/repository';

describe('repository utils', () => {
  describe('#handleError', () => {
    it('throws generic db error', () => {
      const error = new Error('Test');

      try {
        repositoryUtils.handleDbError(error);
      } catch ({ name, message }) {
        return expect({ name, message }).to.eql({
          name: 'DatabaseError',
          message: 'There was a database error.'
        });
      }

      throw new Error('Failed to throw');
    });
  });
});

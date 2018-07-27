import serviceUtils from '../../app/utils/service';

describe('service utils', () => {
  describe('#handleDbError', () => {
    it('rethrows', () => {
      const error = new Error('Test');

      try {
        serviceUtils.handleDbError(error);
        throw new Error('Failed to throw');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });
});

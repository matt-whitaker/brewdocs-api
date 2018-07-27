import serviceUtils from '../../app/utils/service';

describe('service utils', () => {
  describe('#handleError', () => {
    it('rethrows', () => {
      const error = new Error('Test');

      try {
        serviceUtils.handleError(error);
      } catch (err) {
        return expect(err).to.equal(error);
      }

      throw new Error('Failed to throw');
    });
  });
});

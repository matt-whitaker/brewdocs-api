import error from '../../app/utils/error';

describe('error utils', () => {
  describe('#create', () => {
    it('is an error', () => {
      const createTestError = error.create('TestError');
      const testError = createTestError('TestError message.');
      const { name, message } = testError;

      expect(testError).to.be.instanceOf(Error);
      expect({ name, message }).to.eql({
        name: 'TestError',
        message: 'TestError message.'
      });
    });

    it('is extends', () => {
      const createTestError = error.create('TestError');
      const testError = createTestError('TestError message.', { code: 'SOME_ERROR' });
      const { code } = testError;

      expect(code).to.equal('SOME_ERROR');
    });
  });
});

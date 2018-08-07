import boom from 'boom';
import error from '../../app/utils/error';

describe('error utils', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

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

  describe('#middleware', () => {
    let middleware;

    beforeEach(() => {
      middleware = error.middleware();
    });

    it('handles a non-error', () => {
      const error = new Error('test');

      const response = {
        status () {
        },
        json () {
        }
      };

      const mockResponse = sandbox.mock(response);

      mockResponse.expects('status').withArgs(500).returns(response);
      mockResponse.expects('json').withArgs(sinon.match({
        statusCode: 500,
        message: 'An internal server error occurred',
        error: 'Internal Server Error',
        level: 'error'
      }));

      middleware(error, null, response);

      mockResponse.verify();
    });

    it('unpacks an error', () => {
      const error = boom.notFound();

      const response = {
        status () {
        },
        json () {
        }
      };

      const mockResponse = sandbox.mock(response);

      mockResponse.expects('status').withArgs(404).returns(response);
      mockResponse.expects('json').withArgs(sinon.match({
        statusCode: 404,
        message: 'Not Found',
        error: 'Not Found',
        level: 'error'
      }));

      middleware(error, null, response);

      mockResponse.verify();
    });
  });
});

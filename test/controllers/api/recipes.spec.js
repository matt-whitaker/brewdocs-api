import recipesService from '../../../app/services/recipes';
import recipesController from '../../../app/controllers/api/recipes';

import recipesData from '../../../data/recipes';

describe('recipes controller', () => {
  let sandbox, mockRecipesService;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockRecipesService = sandbox.mock(recipesService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#list', () => {
    it('responds with an empty list', () => {
      const response = {
        status () {
        },
        json () {
        }
      };
      const mockResponse = sandbox.mock(response);

      mockRecipesService.expects('list').resolves([]);
      mockResponse.expects('status').withArgs(200).returns(response);
      mockResponse.expects('json').withArgs([]);

      return recipesController.list({}, response)
        .then(() => {
          mockRecipesService.verify();
          mockResponse.verify();
        });
    });

    it('responds with a populated list', () => {
      const response = {
        status () {
        },
        json () {
        }
      };
      const mockResponse = sandbox.mock(response);

      mockRecipesService.expects('list').resolves(recipesData);
      mockResponse.expects('status').withArgs(200).returns(response);
      mockResponse.expects('json').withArgs(recipesData);

      return recipesController.list({}, response)
        .then(() => {
          mockRecipesService.verify();
          mockResponse.verify();
        });
    });

    it('passes along errors', () => {
      const error = new Error('test');
      const next = sinon.spy();

      mockRecipesService.expects('list').rejects(error);

      return recipesController.list({}, {}, next)
        .then(() => {
          mockRecipesService.verify();
          expect(next.calledWith(error)).to.be.true;
        });
    });
  });

  describe('#get', () => {
    it('responds with a recipe', () => {
      const request = {
        params: {
          slug: 'test'
        }
      };

      const response = {
        status () {
        },
        json () {
        }
      };

      const mockResponse = sandbox.mock(response);

      mockRecipesService.expects('get').resolves(recipesData[0]);

      mockResponse.expects('status').withArgs(200).returns(response);
      mockResponse.expects('json').withArgs(recipesData[0]);

      return recipesController.get(request, response)
        .then(() => {
          mockRecipesService.verify();
          mockResponse.verify();
        });
    });

    it('passes along errors', () => {
      const error = new Error('test');
      const request = {
        params: {
          slug: 'test'
        }
      };

      const next = sinon.spy();

      mockRecipesService.expects('get').rejects(error);

      return recipesController.get(request, {}, next)
        .then(() => {
          mockRecipesService.verify();
          expect(next.calledWith(error)).to.be.true;
        });
    });
  });
});

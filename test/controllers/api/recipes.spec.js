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
  });
});

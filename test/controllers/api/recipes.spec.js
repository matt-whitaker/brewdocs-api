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
    it('responds with a list', () => {
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

  describe('#create', () => {
    it('responds with a created recipe', () => {
      const recipe = { name: 'Test' };

      const request = {
        body: recipe
      };

      const response = {
        status () {
        },
        json () {
        }
      };

      const mockResponse = sandbox.mock(response);

      mockResponse.expects('status').withArgs(201).returns(response);
      mockResponse.expects('json').withArgs(sinon.match(recipe)).resolves();

      mockRecipesService.expects('create').withArgs(sinon.match(recipe)).resolves(recipe);

      return recipesController.create(request, response)
        .then(() => {
          mockRecipesService.verify();
          mockResponse.verify();
        });
    });

    it('passes along errors', () => {
      const error = new Error('test');
      const request = {
        body: {}
      };

      const next = sinon.spy();

      mockRecipesService.expects('create').rejects(error);

      return recipesController.create(request, {}, next)
        .then(() => {
          mockRecipesService.verify();
          expect(next.calledWith(error)).to.be.true;
        });
    });
  });

  describe('#update', () => {
    it('responds with an updated recipe', () => {
      const recipe = { id: 1, name: 'Test', slug: 'test' };

      const request = {
        body: recipe,
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

      mockResponse.expects('status').withArgs(200).returns(response);
      mockResponse.expects('json').withArgs(sinon.match(recipe)).resolves();

      mockRecipesService.expects('update').withArgs('test', sinon.match(recipe)).resolves(recipe);

      return recipesController.update(request, response)
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
        },
        body: {}
      };

      const next = sinon.spy();

      mockRecipesService.expects('update').rejects(error);

      return recipesController.update(request, {}, next)
        .then(() => {
          mockRecipesService.verify();
          expect(next.calledWith(error)).to.be.true;
        });
    });
  });

  describe('#delete', () => {
    it('responds ok', () => {
      const request = {
        params: {
          slug: 'test'
        }
      };

      const response = {
        sendStatus () {
        }
      };

      const mockResponse = sandbox.mock(response);

      mockRecipesService.expects('delete').withArgs('test').resolves(recipesData[0]);
      mockResponse.expects('sendStatus').withArgs(204).resolves();

      return recipesController.delete(request, response)
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

      mockRecipesService.expects('delete').rejects(error);

      return recipesController.delete(request, {}, next)
        .then(() => {
          mockRecipesService.verify();
          expect(next.calledWith(error)).to.be.true;
        });
    });
  });
});

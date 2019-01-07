import { Router } from 'express';

/**
 * Router encapsulating a base set of REST functionality
 */
class RESTRouter extends Router {
  /**
   * Constructor function
   * @param {Object}    controller          Controller instance
   * @param {Function}  controller.list     method to list resources
   * @param {Function}  controller.create   method to create a resource
   * @param {Function}  controller.get      method to retrieve a resource
   * @param {Function}  controller.update   method to update a resource
   * @param {Function}  controller.delete   method to delete a resource
   */
  constructor(controller) {
    super();

    this.get('/', controller.list);
    this.post('/', controller.create);
    this.get('/:slug', controller.get);
    this.put('/:slug', controller.update);
    this.delete('/:slug', controller.delete);
  }
}

export default RESTRouter;
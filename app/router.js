'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/postUserId', controller.home.postUserId);
  router.get('/postDynamicCode', controller.home.postDynamicCode);
};

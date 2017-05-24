/* eslint-env node */

'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment,
    rootURL: '/',
    locationType: 'auto'
  };

  ENV.EmberENV = {
    FEATURES: {},
    EXTEND_PROTOTYPES: false
  };

  ENV.APP = {};

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};

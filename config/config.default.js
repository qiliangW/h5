/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.siteFile = {
    '/': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/dist/index.html')),

  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public/dist'),
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1662429774366_2196';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 防护
  config.security = {
    enable: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};

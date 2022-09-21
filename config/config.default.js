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
  const config = (exports = {});

  // config.siteFile = {
  //   '/': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/dist/index.html')),

  // };
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
    domainWhiteList: [ 'http://apitest.dev.com' ],
  };
  config.cors = {
    // 任何地址都可以访问
    origin: '*',
    // 指定地址才可以访问
    // origin: 'http://localhost:8080',
    allowMethods: 'GET,PUT,POST,DELETE',
    // cookie跨域配置
    credentials: true,
  };
  // mongoose数据库配置
  // config.mongoose = {
  //   url: "'mongodb://127.0.0.1/website", // 端口号27021数据库名 website
  //   options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  // };

  // config.mysql = {
  //   // database configuration
  //   client: {
  //     // host
  //     host: 'mysql.com',
  //     // port
  //     port: '3306',
  //     // username
  //     user: 'test_user',
  //     // password
  //     password: 'test_password',
  //     // database
  //     database: 'test',
  //   },
  //   // load into app, default is open
  //   app: true,
  //   // load into agent, default is close
  //   agent: false,
  // };

  return {
    ...config,
    ...userConfig,
  };
};

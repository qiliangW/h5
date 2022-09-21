'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
// config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

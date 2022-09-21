'use strict';
const { decryptCode } = require('../../utils/index');
const Service = require('egg').Service;
// 拿到一个公钥
class analysisCode extends Service {
  async analysisCode(code) {
    const dynamicCode = await decryptCode(code);
    return dynamicCode;
  }
}
module.exports = analysisCode;

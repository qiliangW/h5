'use strict';
const Service = require('egg').Service;
// 拿到一个公钥
class analysisCode extends Service {
  async analysisCode() {
    console.log('拿到一个公钥解析返回');
  }
}
module.exports = analysisCode;

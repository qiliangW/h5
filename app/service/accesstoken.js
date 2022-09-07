'use strict';
const Service = require('egg').Service;
const token_path = '../../configs/tokens.json';
const axios = require('axios');
const Config = require('../../configs/index');
const fs = require('fs');
const path = require('path');
// 判断是否token过期
const _isExpire = function(create_time, expire_time) {
  const current = Math.floor(Date.now() / 1000);
  return create_time + expire_time < current;
};

class tokenService extends Service {

  async getToken() {
    let tokens = {};
    const corp_id = Config.corp_id;
    //

    const secret = Config.secret;

    // 先尝试从缓存中读取出token
    try {
      tokens = JSON.parse(fs.readFileSync(path.join(__dirname, token_path), {
        encoding: 'utf-8',
      }));
    } catch (err) {
      // 缓存文件读取失败
      console.error(err);
    }

    if (!tokens.access_token || _isExpire(tokens.create_time, tokens.expire_time)) {
      // 如果缓存中没有 token，或者 token 过期
      console.log('重新获取 access_token');
      // 发起请求，获取 access_token
      const access_response = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
        params: {
          corpid: corp_id,
          corpsecret: secret,
        },
      });

      const { data: {
        access_token, expires_in,
      } } = access_response;

      if (access_token) {
        // 重新写入 access_token
        tokens = {};
        tokens.create_time = Math.floor(Date.now() / 1000);
        tokens.expire_time = expires_in;
        tokens.token = access_token;
        fs.writeFileSync(path.join(__dirname, token_path), JSON.stringify(tokens), {
          encoding: 'utf-8',
        });
        // 返回 access_token
        console.log('获取 access_token 成功', access_token);
        return access_token;
      }

      console.log('获取 access_token 失败');
      console.log(access_response);
      return false;


    }
    // 从缓存中读取
    console.log('从缓存中读取 access_token', tokens.token);
    return tokens.token;

  }
}
module.exports = tokenService;

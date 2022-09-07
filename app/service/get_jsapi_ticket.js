'use strict';
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const Service = require('egg').Service;
const jsApiTicket_path = '../../configs/apiTicket.json';
// 判断是否token过期
const _isExpire = function(create_time, expire_time) {
  const current = Math.floor(Date.now() / 1000);
  return create_time + expire_time < current;
};

class jsApiTicketService extends Service {
  async getJsApiTicket(access_token) {
    // 先尝试从缓存中读取出jsapi_ticket  => 是H5应用调用企业微信JS接口的临时票据
    let jsapi_ticket = {};
    try {
      jsapi_ticket = JSON.parse(fs.readFileSync(path.join(__dirname, jsApiTicket_path), {
        encoding: 'utf-8',
      }));
    } catch (err) {
      // 缓存文件读取失败
      console.error(err);
    }
    if (!jsapi_ticket.ticket || _isExpire(jsapi_ticket.create_time, jsapi_ticket.expire_time)) {
      // 如果缓存中没有 jsapi_ticket，或者 jsapi_ticket 过期
      const jsApiTicketRes = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket', {
        params: {
          access_token,
        },
      });
      const { data: {
        ticket, expires_in,
      } } = jsApiTicketRes;

      if (ticket) {
        // 重新写入 ticket
        jsapi_ticket = {};
        jsapi_ticket.create_time = Math.floor(Date.now() / 1000);
        jsapi_ticket.expire_time = expires_in;
        jsapi_ticket.ticket = ticket;
        fs.writeFileSync(path.join(__dirname, jsApiTicket_path), JSON.stringify(jsapi_ticket), {
          encoding: 'utf-8',
        });
        // 返回 ticket
        console.log('获取 jsapi_ticket 成功', ticket);
        return ticket;
      }
      console.log('获取 jsapi_ticket 失败', ticket);
      return false;

    }
    // 从缓存中读取
    console.log('从缓存中读取 jsapi_ticket', jsapi_ticket.ticket);
    return jsapi_ticket.ticket;

  }
}
module.exports = jsApiTicketService;

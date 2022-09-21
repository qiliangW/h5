'use strict';
const axios = require('axios');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 初始化获取企业token
  async index() {
    const { ctx } = this;
    const access_token = await ctx.service.accesstoken.getToken();
    console.log(access_token, 'access_token');
  }
  // 获取企业微信详细信息
  async postUserId() {
    const { ctx } = this;
    const access_token = await ctx.service.accesstoken.getToken();
    console.log(access_token, 'access_tokenaccess_token');
    const { code } = ctx.query;
    console.log(code, 'codecode');
    if (access_token) {
      const { data: { userid, user_ticket } } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token=${access_token}&code=${code}`);
      console.log(user_ticket, 'user_ticket');
      // const data = await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail?access_token=${access_token}`, {
      //   data: {
      //     access_token,
      //     user_ticket,
      //   },
      // });
      ctx.body = {
        msg: 'success',
        code: 0,
      };
    } else {
      ctx.body = {
        msg: 'success',
        code: 1,
      };
    }
  }
  // 解密code
  async postDynamicCode() {
    const { ctx } = this;
    const { code } = ctx.query;
    const Code = await ctx.service.analysisCode(code);
    if (Code) {
      ctx.body = {
        data: { Code },
        msg: 'success',
        code: 0,
      };
    } else {
      ctx.body = {
        data: null,
        msg: 'success',
        code: 1,
      };
    }
  }
}

module.exports = HomeController;

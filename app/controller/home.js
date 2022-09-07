'use strict';
const axios = require('axios');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(111);
    // ctx.body = 'hi, egg';
    // await ctx.render('./index.html');
    // const token = await ctx.service.accesstoken.getToken();
    // console.log(token);
  }
  async postUserId() {
    const { ctx } = this;
    const token = await ctx.service.accesstoken.getToken();
    const { code } = ctx.req.query;
    if (token) {
      const { data: user_data } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`);
      const user_id = user_data.userid;
      const { data: user_detail_data } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&userid=${user_id}`);
      ctx.res.body({
        data: { user_detail_data },
        msg: 'success',
        code: 0,
      });
    } else {
      ctx.res.body({
        data: null,
        msg: 'success',
        code: 1,
      });
    }
  }

  async postDynamicCode() {
    const { ctx } = this;
    // 写一个根据公钥 解析动态码的的service返回给前端显示
  }
}

module.exports = HomeController;

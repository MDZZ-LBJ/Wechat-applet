import { request } from "../../request/index.js"
// 引入自定义Promise形式的 wx接口
import {  login } from "../../utils/asyncWx.js"
// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'
Page({
 

  // 获取用户信息
  async __handleGetUserInfo(e){
    // 获取用户信息
    const { encryptedData , rawData , iv , signature } = e.detail
    // 获取小程序登录后后的 code 值
    const {code} = await login() 
   // 发送请求获取用户 token
    const loginParams = { encryptedData, rawData, iv, signature , code }
    const {token} = await  request({
                                    url: '/users/wxlogin',
                                    data: loginParams,
                                    header: {},
                                    method: 'post',

                                  })
    console.log(token)  // 这里需要用企业账号才能获取到   
    //  把 token 放入缓存中 
    wx.setStorageSync('token', 123)
    // 同时调回上一级页面(支付页面)  1表示返回上一层 2表示返回上2层
    wx.navigateBack({
       delta:1
    })
    console.log(code) 
  }

})
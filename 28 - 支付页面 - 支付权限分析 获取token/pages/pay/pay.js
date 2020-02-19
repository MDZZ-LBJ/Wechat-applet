
// 引入自定义Promise形式的 wx接口
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js"
// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
 
   onShow: function (options) {
    // 获取缓存中收货地址数据
    let address = wx.getStorageSync('address')
   
    // 获取缓存中购物车中 checked 为 true 的 数据 
    let cart = wx.getStorageSync('cart') || []

    // 过滤 checked 为 true 的 数据 
     cart = cart.filter(v=>v.checked)

    // 计算  总价格 总数量 等 
     let totalPrice = 0
     let totalNum = 0
     cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
     })

     // 重新赋值给data 但是不能放入缓存 
    //  因为这里的数据都是购物车checked为true的数据 放入缓存再返回购物车时
    // checked 不为true的数据会丢失
  
     this.setData({
       cart,
       totalPrice,
       totalNum,
       address
     })
  },
   
  //  微信支付
  //  1 只有 企业账号 才能实现微信支付
  //  2 企业账号的小程序后台中 必须 要给 开发者 加入 白名单
      //  一个appid 可以绑定多个开发者，这些开发者就可以共用appid和开发权限
  
  // 步骤：
  // 1 判断缓存中有无 token ，若没有 则跳到授权页面 点击授权后再获取
  // 2 
  __handleOrderPay(){
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return 
    }
    console.log('----')

  }

})
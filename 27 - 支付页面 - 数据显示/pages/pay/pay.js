
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
   
 

})
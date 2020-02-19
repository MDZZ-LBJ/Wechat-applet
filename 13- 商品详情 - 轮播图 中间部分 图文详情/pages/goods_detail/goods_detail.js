// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'
Page({

   
  data: {
    goodsObj:{}
  },

 
  onLoad: function (options) {
    const { goods_id} = options
    this.__getGoodsDetail(goods_id)
  },
  
  // 获取商品详情数据
  async __getGoodsDetail(goods_id){
    const result= await  request({url: '/goods/detail',data: { goods_id}})
    console.log(result)
    const res = result.data.message
    this.setData({
      // 由于数据较多 有的字段用不到 这里取需要用到的字段
      goodsObj:{
          goods_name:res.goods_name,
          goods_price: res.goods_price,
          goods_introduce: res.goods_introduce,
          pics: res.pics,
       }
    })
  }
 
})
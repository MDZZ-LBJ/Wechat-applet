// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'
Page({

   
  data: {
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
 
  onLoad: function (options) {
    const { goods_id} = options
    this.__getGoodsDetail(goods_id)
  },
  
  // 获取商品详情数据
  async __getGoodsDetail(goods_id){
    const result= await  request({url: '/goods/detail',data: { goods_id}})
    const res = result.data.message
    this.GoodsInfo=res
    this.setData({
      // 由于数据较多 有的字段用不到 这里取需要用到的字段
      goodsObj:{
          goods_name:res.goods_name,
          goods_price: res.goods_price,
          goods_introduce: res.goods_introduce,
          pics: res.pics,
       }
    })
  },
 
 // 点击轮播图放大预览 思路：
 // 1 轮播图添加点击事件 
 // 2 调用小程序的api中 previewImage方法
    __handlePreviewImage(e){
        const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
        // 获取点击图片的url
        let { currenturl}=e.currentTarget.dataset
        wx.previewImage({
          urls ,
          current: currenturl
        })
     }

})
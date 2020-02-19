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
     },

  // 点击加入购物车 思路
  // 1 绑定点击事件
  // 2 获取缓存中购物车数据
  // 3 先判断当前商品是否已经存在购物车
       // 若已经存在 将该商品在购物车中的数量++ 
       // 若不存在  则直接添加 另外在添加一个属性 num  用于计算该商品添加几次
  // 4 重新将数据放置在缓存中
  // 5 弹出提示
  __handleCartAdd(){
    // 1.获取缓存中购物车数据 第一次为空时转为数组
    let cart=wx.getStorageSync("cart") || []
    // 2 判断该商品是否存在购物车数组中
    let index = cart.findIndex(v => v.goods_id == this.GoodsInfo.goods_id)
    if(index==-1){
       this.GoodsInfo.num=1
       this.GoodsInfo.checked=true
       cart.push(this.GoodsInfo)
      }else{
        cart[index].num++
      }
    // 3  重新将数据放置在缓存中
    wx.setStorageSync("cart", cart)
    // 4. 弹出提示
     wx.showToast({
       title: '加入购物车成功',
       icon:'success',
       mask:true
     }) 

  }


})
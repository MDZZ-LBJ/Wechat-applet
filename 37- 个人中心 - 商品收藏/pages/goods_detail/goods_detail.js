// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'
Page({

   
  data: {
    goodsObj:{},
    isCollect:false, //商品是否被收藏
  },
  //商品对象
  GoodsInfo:{},
 
  onShow: function () {
    let pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const { goods_id} = options
    this.__getGoodsDetail(goods_id)
    
  },
  
  // 获取商品详情数据
  async __getGoodsDetail(goods_id){
    const result= await  request({url: '/goods/detail',data: { goods_id}})
    const res = result.data.message
    this.GoodsInfo=res

    // 收藏
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(v => v.goods_id == this.GoodsInfo.goods_id)

    this.setData({
      // 由于数据较多 有的字段用不到 这里取需要用到的字段
      goodsObj:{
          goods_name:res.goods_name,
          goods_price: res.goods_price,
          goods_introduce: res.goods_introduce,
          pics: res.pics,
       },
      isCollect
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

  },

  // 商品收藏
  // 1 页面 onShow 的时候 加载缓存中商品收藏的数据
  // 2 判断当前商品能够是不是已经被收藏，显示已收藏 或 未收藏 图标
  // 3 点击收藏按钮，判断该商品是否存在缓存中，存在->删除 ， 不存在->添加
  __handleCollect(){
    let collect = wx.getStorageSync('collect')||[]
    let index=collect.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id)
    if(index!==-1){
      collect.splice(index,1)
      wx.showToast({
        title: '取消收藏成功',
        icon:'success',
        mask:true
      })
    }else{
      collect.push(this.GoodsInfo)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect:!this.data.isCollect
    })
    
  }

})
// 引入发送请求的方法
import { request} from "../../request/index.js"

Page({
  data: {
    swiperList:[],
    catesList:[]
  },

  // 页面开始加载就触发  
  onLoad: function (options) {
    // 发送请求 获取数据 使用封装的promise
    this.__getSwiperList()
    this.__getCatesList()
    // 不使用 promise
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success:(result)=>{
    //        this.setData({
    //          swiperList: result.data.message
    //        })
    //   }
    // })


  },

 // 获取轮播图数据
  __getSwiperList(){
      request({ url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata' }).then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
// 获取中间导航数据
  __getCatesList() {
    request({ url: 'https://api.zbztb.cn/api/public/v1/home/catitems' }).then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  }

})
// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'

Page({

  
  data: {
   
    // 左侧菜单数据 
    leftMenulist:[],
    // 右侧的商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧菜单距顶部距离
    scrollTop:0

    
  },
  // 接口返回的
  Cates:[],
  
  onLoad: function (options) {
    // 若本地存储中有旧数据且没过期，就使用旧数据不发送请求
         const Cates =   wx.getStorageSync('cates')// 获取本地存储数据
         if(!Cates){
            this.__getCategoryList()
         }else{
           //有旧的数据 定义过期时间大于10秒重新请求
           if(Date.now()-Cates.time>1000*10){
             this.__getCategoryList()
           }else{
             // 使用旧数据
             // 拿到全部数据
             this.Cates = Cates.data
             let leftMenulist = this.Cates.map(v => v.cat_name)
             let rightContent = this.Cates[0].children
             this.setData({
               leftMenulist,
               rightContent
             })
           }
         }
  },
  // 获取分类数据
  async __getCategoryList() {
    let res =await request({ url: '/categories ' })
    console.log(res)
    // 拿到全部数据
    this.Cates = res.data.message
    // 存入缓存
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    // 左侧数据
    let leftMenulist = this.Cates.map(v => v.cat_name)
    // 右侧数据
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenulist,
      rightContent
    })
  },
  __handleItemTap:function(e){
     const {index}=e.currentTarget.dataset
     // 右侧数据
     let rightContent = this.Cates[index].children
     this.setData({
       currentIndex:index,
       rightContent,
       scrollTop: 0 // 冲新设置右侧菜单位置
     })
  } 

})
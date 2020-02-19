// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({

  
  data: {
   
    // 左侧菜单数据 
    leftMenulist:[],
    // 右侧的商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0

    
  },
  // 接口返回的
  Cates:[],
  
  onLoad: function (options) {
    // 若本地存储中有旧数据且没过期，就使用旧数据不发送请求
         const Cates =   wx.getStorageSync('cates')// 获取本地存储数据
    console.log(Cates)
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
  __getCategoryList() {
    request({ url: 'https://api.zbztb.cn/api/public/v1/categories ' }).then(result => {
      // 拿到全部数据
      this.Cates = result.data.message
      // 存入缓存
      wx.setStorageSync('cates', { time: Date.now(), data: this.Cates}) 
      // 左侧数据
      let leftMenulist=this.Cates.map(v=>v.cat_name)
      // 右侧数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenulist,
        rightContent
      })
    })
  },
  __handleItemTap:function(e){
     const {index}=e.currentTarget.dataset
     // 右侧数据
     let rightContent = this.Cates[index].children
     this.setData({
       currentIndex:index,
       rightContent
     })
  } 

})
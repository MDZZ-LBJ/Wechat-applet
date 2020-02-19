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
    this.__getCategoryList()
  },
  // 获取分类数据
  __getCategoryList() {
    request({ url: 'https://api.zbztb.cn/api/public/v1/categories ' }).then(result => {
      // 拿到全部数据
      this.Cates = result.data.message
      console.log(this.Cates)
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
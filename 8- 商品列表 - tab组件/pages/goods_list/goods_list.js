Page({

 
  data: {
    tabs:[
      {id:0,value:'综合',isActive:true},
      { id: 1, value: '销量', isActive: false },
      { id: 2, value: '价格', isActive: false }
    ]
  },

 
  onLoad: function (options) {
    // 获取通过navigator跳转过来的时携带的参数
    console.log(options)
  },

  // 监听子组件触发的方法
  __handletabsItemChange(e){
      const {index} = e.detail
      let { tabs}=this.data
      tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false) 
      this.setData({
        tabs
      })
  }

})
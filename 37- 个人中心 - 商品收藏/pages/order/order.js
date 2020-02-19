 
Page({
 
  data: {
    orders:[],
    tabs: [
      { id: 0, value: '全部订单', isActive: true },
      { id: 1, value: '待付款', isActive: false },
      { id: 2, value: '待收货', isActive: false },
      { id: 3, value: '退款\退货', isActive: false }
    ],
  },

  // 监听子组件触发的方法
  __handletabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  
  //查询订单
  // 1 获取url上的参数type ，
  // 2 根据type的不同获取订单数据
  onShow(options){
    console.log(options)// undefined
    // onShow无法在形参上接收 options 参数
    // 解决方式：
    //   1 获取当前的小程序的页面栈数组 ，这个栈的长度最大是10
    //     即当连续打开20个页面时，连续点击返回时只能返回到第9个页面
    //     之前的页面都被释放了  
    //   2 获取这个栈数组
    //   3 这个栈数组中的最后一项即为 当前的页面，里面有个 options 参数即可获取到传来的值  
    let  pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    let type = currentPage.options.type
    // 设置tabs 首次激活样式
    let { tabs } = this.data
    tabs.forEach((v, i) => i == type-1 ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })  
    // 实际开发中这里需要调取接口 传入 type 获取订单数据
    this.__getOrders()
  } ,
   

 __getOrders(){
   let orders=wx.getStorageSync('buyCart')
  this.setData({orders})
 }  
 
  


})
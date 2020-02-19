// pages/order/order.js
Page({
 
  data: {
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
})
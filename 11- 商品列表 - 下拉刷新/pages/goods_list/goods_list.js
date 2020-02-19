// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'


Page({
  data: {
    tabs:[
      {id:0,value:'综合',isActive:true},
      { id: 1, value: '销量', isActive: false },
      { id: 2, value: '价格', isActive: false }
    ],
    goodsList:[]
  },
  
  // 接口要的参数
  QueryParams:{
     query:'',
     cid:'',
     pagenum:1,
     pagesize:10
  },
//  总页数
  totalPages:1,

  onLoad: function (options) {
    // 获取通过navigator跳转过来的时携带的参数
    console.log(options)
    this.QueryParams.cid = options.cid
    // 请求数据
    this.__getGoodsList()
  },

  // 监听子组件触发的方法
  __handletabsItemChange(e){
      const {index} = e.detail
      let { tabs}=this.data
      tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false) 
      this.setData({
        tabs
      })
  },

  //获取商品列表数据
  async __getGoodsList(){
     const res = await  request({ url: '/goods/search', data: this.QueryParams})
    //  获取数据总条数
    const total = res.data.message.total
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages)

     this.setData({
       // 拼接之前的数据和上滑加载的数据
       goodsList: [...this.data.goodsList, ...res.data.message.goods]
     })   

     //关闭下拉刷新效果 如果没有调用下拉刷新窗口 直接关闭不会报错
     wx.stopPullDownRefresh()                
  },


  //  滚动条到底 触发的事件
   onReachBottom: function (e) {
     //  判断是否有下一页数据
      if(this.QueryParams.pagenum>=this.totalPages){
        //没有下一页数据
        console.log('没有l')
        wx.showToast({ title: '没有下一页数据了'})
      }else{
        //有下一页数据
        console.log('有下一页数据')
        this.QueryParams.pagenum++
        this.__getGoodsList()
      }
  },


  // 下拉属性页面 实现思路：
  // 1. 开放下拉功能 
          //  .json文件中  "enablePullDownRefresh":true,
  // 2. 触发下拉刷新事件 onPullDownRefresh()
  // 3. 清空数据 页码置为1 
  // 4. 重新请求数据
  // 5. 若数据请求回来时 下拉loading还未结束需要手动关闭 
        //  wx.stopPullDownRefresh() 
  
  onPullDownRefresh:function(){
    this.setData({
      goodsList: []
    })   
    this.QueryParams.pagenum=1
    this.__getGoodsList()
  }


})


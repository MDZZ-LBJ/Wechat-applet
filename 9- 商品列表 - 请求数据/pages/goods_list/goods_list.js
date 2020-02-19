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
     this.setData({
       goodsList:res.data.message.goods
     })                   
  }

})
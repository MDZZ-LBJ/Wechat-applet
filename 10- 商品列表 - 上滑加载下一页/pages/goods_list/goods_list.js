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
  },

  // 上滑页面 滚动条触底 加载下一页数据 思路：
// 1. 找到滚动条触底事件（微信官方文档查找 onReachBottom）
// 2. 判断还有没有下一页数据
      // 获取到总页数 和 当前页码pagenum
        // 接口中有返回总条数total，那么总页数=Math.ceil(total/pagesize)
      // 判断当前页码是否 >= 总页数
// 3. 若没有 弹出提示：暂无数据
// 4. 若有数据  则加载下一页数据
          // 当前页码+1
          // 重新加载数据 注意：不能直接this.setData()会将以前数据覆盖
          // 对之前数据进行拼接 而不是 全部替换

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
  }


})


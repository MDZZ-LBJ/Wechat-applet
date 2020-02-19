// 引入发送请求的方法
import { request } from "../../request/index.js"

// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'
Page({

  data: {
    goods:[],
    isFocus:false,
    inputValue:''
  },
  TimeId :-1,
// 1 给输入框绑定事件(值改变事件)
// 2 合法性判断 输入的值不为空的
// 3 拿到值 发送请求
// 4 渲染列表
__handleInput(e){

  const { value} =e.detail
  console.log(value)
  if (!value.trim()){
    this.setData({
      isFocus: false,
      goods:[]
    })
    return
  }
  this.setData({
    isFocus:true
  })

// 防抖（防止抖动）一般用于输入框中防止重复发送请求
      // 实现不是每输入一个字符就开始查询，而是输入稳定之后再开始查询
      // 使用 定时器 实现
  clearTimeout(this.TimeId)
  this.TimeId=setTimeout(()=>{
    this.qsearch(value)
  },1000)

//节流 一半用于页面 下拉 和 上拉 加载


},

async qsearch(query){
  const res = await request({ url: '/goods/qsearch', data: { query}})
  const goods=res.data.message
  this.setData({
    goods
  })
},

// 点清除按钮
__handleCancel(){
  this.setData({
    inputValue: '',
    isFocus: false,
    goods: []
  })
}

})
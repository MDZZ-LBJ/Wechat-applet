//  记录一个页面中发送了多少个请求 用于关闭loading
let ajaxTimes=0

//  封装 promise 回调发送请求
export const request=(parmas)=>{
 ajaxTimes++
 // 发送请求前显示 ‘加载中’
  wx.showLoading({
    title: '加载中',
    mask:true
  })

  const baseUrl ='https://api.zbztb.cn/api/public/v1'
   return new Promise((resolve,reject)=>{
     
     wx.request({
       ...parmas,
       url:baseUrl+parmas.url,
       success: (result) => {
         resolve(result)
       },
       fail: (err)=>{
         reject(err)
       },
       complete:()=>{ //无论请求成功失败都会执行
         // 请求完成关闭loading
        //  若一个页面有多个请求 则必须要等所有的请求都执行完成才关闭loading
        ajaxTimes--
        if(ajaxTimes==0){
          wx.hideLoading()
        }
       }
     })


   })
}

//  封装 promise 回调发送请求
export const request=(parmas)=>{
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
       }
     })

   })
}
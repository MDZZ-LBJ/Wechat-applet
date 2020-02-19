
//  封装 promise 回调发送请求
export const request=(parmas)=>{
  
   return new Promise((resolve,reject)=>{
     
     wx.request({
       ...parmas,
       success: (result) => {
         resolve(result)
       },
       fail: (err)=>{
         reject(err)
       }
     })

   })
}
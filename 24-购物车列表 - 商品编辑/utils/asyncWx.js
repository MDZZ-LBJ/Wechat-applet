// Promise 形式的 getSetting 获取授权状态
export const  getSetting=()=>{
  return new Promise((reslove,reject)=>{
      wx.getSetting({
         success:(reslut)=>{
           reslove(reslut)
         },
         fail:(err)=>{
           reject(err)
         }
      })
  })
} 

// Promise 形式的 chooseAddress 获取收货地址
export const chooseAddress = () => {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success: (reslut) => {
        reslove(reslut)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
} 

// Promise 形式的 openSetting 打开授权页面
export const openSetting = () => {
  return new Promise((reslove, reject) => {
    wx.openSetting({
      success: (reslut) => {
        reslove(reslut)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
} 

// Promise 形式的 showModal 弹窗  
export const showModal = ({content}) => {
  return new Promise((reslove, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
} 
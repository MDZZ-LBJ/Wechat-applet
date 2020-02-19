 
// 引入自定义Promise形式的 wx接口
import { getSetting, chooseAddress, openSetting} from "../../utils/asyncWx.js"
// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'

 Page({
  data: {

  },
  onLoad: function (options) {

  },
 
  // 优化获取收货地址代码 
  // 1 utils 文件夹下新建 asyncWx.js 文件
   async __handleChooseAddress(){
       try{
         // 获取权限状态
         const res1 = await getSetting()
         const scopeAddress = res1.authSetting["scope.address"]
         if (scopeAddress == false) {
           // 用户曾经拒绝过授权 诱导用户打开授权页面
           await openSetting()
         }
         // 授权成功 调用获取收货地址api
         const address = await chooseAddress()
        //  将收获地址存入缓存
         wx.setStorageSync('address', address)
       }catch(error){
         console.log(error)
       }
   },

})
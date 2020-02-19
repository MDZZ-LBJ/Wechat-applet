 Page({
  data: {

  },
  onLoad: function (options) {

  },
 
  // 点击收货地址按钮
  // (A) 调用小程序内置 api （ wx.chooseAddress）可以 获取用户收货地址(这里是获取微信中绑定的收货地址)
        // 用户之前若执行过(A)，会弹出弹窗进行授权，
           // 若点击确定则 scope=true  且再次执行（A）时会显示收货地址页面
           // 若点击取消(即拒绝授权)则 scope=false 且再次执行（A）时不会显示收货地址页面 这就是为什么下面要事先获取权限状态
       //若没有执行过（A）则scope=undefinde 
      // 注：wx.getSetting 可以查看 scope 值

  // 1 绑定点击事件
  // 2 获取用户对小程序 获取收货地址 的权限状态 scope
      // 若 scope=true 则 执行(A)
      // 若 scope=false 则诱导用户打开授权权限设置页面(wx.openSetting) 重新给 获取用户地址 授权
      // 若 scope=undefined

  

   __handleChooseAddress(){
       // 获取权限状态
       wx.getSetting({
         success:(result)=>{
            //只要发现属性名很怪异的情况 就是用[]获取  
           const scopeAddress = result.authSetting["scope.address"]
           if (scopeAddress == true || scopeAddress==undefined ){
              // 调用获取收货地址的api
               wx.chooseAddress({
                 success:(res)=>{
                       console.log(res)
                 }
               })
           }else{
            // 用户曾经拒绝过授权 诱导用户打开授权页面
             wx.openSetting({
               // 授权成功
               success: () => {
                  // 调用获取收货地址api
                  wx.chooseAddress({
                    success: (res) => {
                      console.log(res)
                    }
                  })
               }
             })

           }
         }
       })
   },

  
})
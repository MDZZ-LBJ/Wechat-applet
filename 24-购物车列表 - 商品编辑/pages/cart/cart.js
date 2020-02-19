 
// 引入自定义Promise形式的 wx接口
import { getSetting, chooseAddress, openSetting, showModal} from "../../utils/asyncWx.js"
// 引入支持 async 的库
import regeneratorRuntime from '../../lib/runtime/runtimr.js'

 Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  // onShow 会执行多次 因为需要多次切换添加收货地址 所以使用 onShow 来获取最新数据
  onShow: function (options) {
    // 获取缓存中收货地址数据
    let address= wx.getStorageSync('address')
    this.setData({address})
    // 获取缓存中购物车数据
    let cart = wx.getStorageSync('cart')||[]
    // 重新计算全选 总价格 总数量 等 
     this.setCart(cart)
    
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

  //  商品的选中
   __handleItemChange(e){
      // 1 给商品前面的复选框的父元素checkbox-group绑定 change 事件
      // 2 获取到被修改的商品对象 将该商品的选中状态取反
          const goods_id = e.currentTarget.dataset.id
          let { cart } = this.data
          let index = cart.findIndex(v => v.goods_id == goods_id)
          cart[index].checked = !cart[index].checked
     
     // 3 重新计算全选 总价格 总数量 等 
          this.setCart(cart)
   },

   // 设置购物车状态 底部工具栏 全选 总价格 总数量的等
   setCart(cart){

     // 全选的实现
     // 1 计算全选 若购物车数据数组中每一项checked属性都为true 则返回true
     // 2 注意：空数组调用 every 返回值为true, 可以一并写在下面 forEach中
     //const allChecked=cart.length > 0 ?cart.every(v=>v.checked):false
    
    // 总价格 和 总数量 
          // 1 都需要商品被选中才能计算
          // 2 获取购物车数组 进行遍历 判断商品是否被选中 
          // 3 总价格 = 商品单价 * 选中的商品数量，总数量 = 选中的商品数量
          // 4 把计算后的结果赋值给 data

     let allChecked = true
     let totalPrice = 0
     let totalNum = 0
     cart.forEach(v => {
       if (v.checked) {
         totalPrice += v.num * v.goods_price
         totalNum += v.num
       } else {
         allChecked = false
       }
     })
     allChecked = cart.length > 0 ? allChecked : false

     // 4 重新赋值给data 并存入缓存
     this.setData({
       cart,
       allChecked,
       totalPrice,
       totalNum
     })
     wx.setStorageSync("cart", cart)
   },

  // 全选和反选
   __handleItemAllCheck(){
      //  1 全选复选框的父元素checkbox-group绑定 change 事件
      //  2 data 中 allChecked取反
      //  3 遍历购物车数组 所有的选中状态 跟随 allChecked
      //  4 购物车数组 和 allChecked 设置到 data 中和 缓存
      let {cart,allChecked} = this.data
      allChecked=!allChecked
      cart.forEach(v=>v.checked=allChecked)
      this.setCart(cart)
   },

  //  商品的编辑
  async __handleItemNumEdit(e){
     // 1 给 ‘+’ ‘-’ 按钮绑定同一个点击事件 传入不同值来区分
      // 2 获取被点击商品的 goods_id
      // 3 获取购物车数组 修改被点击的那个商品的数量属性
      // 4 把购物车数组重新设置到 data 和 缓存中
      // 5 当数量为 1 时 继续点 ‘-’ 就提示用户是否删除该商品  
        const {id,operation} = e.currentTarget.dataset 
        let {cart} = this.data
        const index=cart.findIndex(v=>v.goods_id==id)
        if(cart[index].num==1 && operation==-1){ 
          const res = await showModal({ content:'是否删除该商品'})
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }  
        }else{
          cart[index].num += operation
          this.setCart(cart)
        }
   }   
 


})
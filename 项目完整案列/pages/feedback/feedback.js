// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '体验问题', isActive: true },
      { id: 1, value: '商品，商家投诉', isActive: false },
    ],
    chooseImgs:[],
    textVal:''
  },
  // 外网的图片路径数组
  UpLoadImages:[],

  // 监听子组件触发的方法
  __handletabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  // 选择图片
  // 1 给 ‘+’ 号绑定点击事件
  // 2 调用小程序内置选择图片的api，把图片路径存到data变量中
  // 3 页面循环渲染显示
  __handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...tempFilePaths]
        })
      }
    })   
  },
  // 点击删除图片图标
  __handleDeleteImg(e){
    const deleteImgIndex = e.detail
    let { chooseImgs} = this.data
    chooseImgs.splice(deleteImgIndex,1)
    this.setData({
      chooseImgs 
    })
  },
  
  // 绑定文本域内容 
  __handleTextInput(e){
     let textVal = e.detail.value
     this.setData({
       textVal
     })
  },
  // 点击提交按钮
  // 1 获取文本域内容，进行合法性验证 为不为空
  // 2 将选择的图片上传到专门的图片服务器， 会返回图片路径 
  // 3 将文本域内容 和 图片路径 提交到后台
  __handleFormSubmit(){
    const { textVal, chooseImgs} = this.data
     if(!textVal.trim()){
       wx.showToast({
         title: '请输入内容',
         icon:'none',
         mask:true
       })
       return
     }
     wx.showLoading({
       title: '正在提交...',
       mask:true
     })
    if (!chooseImgs.length==0){
      //  不支持上传数组 ， 遍历上传
      chooseImgs.forEach((v, i) => {

        wx.uploadFile({
          url: '', // 图片上传的路径 要上传到哪里去 自己注册图传账号
          filePath: v,// 被上传图片的路径
          name: 'imgFile', // 上传文件的名称 用于后台获取文件 
          formData: {}, //顺带的文本信息
          success: (res) => {
            let url = JSON.parse(res.data).url
            this.UpLoadImages.push(url)
            //所有图片上传完毕时
            if (i == chooseImgs.length - 1) {
              wx.hideLoading()
              // 这里省略了 执行3的步骤 提交到后台
              // 清空页面 返回上一级
              this.setData({
                textVal: '',
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1
              })
            }
          },
          fail: () => {
            wx.hideLoading()
            this.setData({
              textVal: '',
              chooseImgs: []
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })

      })

    }else{
      wx.hideLoading()
      this.setData({
        textVal: '',
        chooseImgs: []
      })
      wx.navigateBack({
        delta: 1
      })
    }
   

  }

  
})
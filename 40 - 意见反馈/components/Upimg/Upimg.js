// components/Upimg/Upimg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:''
    },
    imgIndex:{
      type: Number,
      value: ''
    }
  },
 
 
   
  methods: {
    __deleteImg(e){
      const imgIndex = e.currentTarget.dataset.index
      this.triggerEvent('deleteImg',imgIndex)
    }
  }
})

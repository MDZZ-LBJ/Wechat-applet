 Component({
  
  properties: {
     tabs:{
       type:Array,
       value:[]
     }
  },

  
  data: {

  },

   
  methods: {
    __handleItemTap(e){
     const {index} = e.currentTarget.dataset
     // 向父组件传递数据
     this.triggerEvent('tabsItemChange',{index})  

    }
  }
})

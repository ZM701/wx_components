// components/videoSecond/videoSecond.js
Component({
  /**
   * 组件的属性列表
   */
  props: [
  ],
  properties: {
    //视频标题
    videoTitle:{
      type:String,
      value:''
    },
    //视频地址
    videoUrl: {
      type: String,
      value: ''
    },
    //评论
    videoComment: {
      type: Number,
      value: 112
    },
    //转发量
    videoSend: {
      type: Number,
      value: 119
    },
    //接收过来的属性
    videoData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _user(){
      this.triggerEvent("userEvent");
    }   
  }

})

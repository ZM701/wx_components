// components/video/video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    res:null,
    imgUrl: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loop(e){
      console.log(e.currentTarget.dataset.url);
      wx.navigateTo({
        url: '../detail/detail?url=' + e.currentTarget.dataset.url
      })
    }
  },

  attached:function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.180/data.json',
      data: {
      },
      method: 'get',
      success: function (res) {
        that.setData({
          res: res.data.video,
          //imgUrl:
        })
        //--------------------------------------------------------
       // console.log("1111", res.data.video.src)
      },
      error: function (res) {
        // console.log(res)
      }
    });
  }

})

// pages/video2/video2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"aaa",
    goods:{},
    kind:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //添加组件
    this.videoSecond = this.selectComponent("#videoSecond"); 
    this.videoDetail = this.selectComponent("#videoDetail");  

    var that = this;
    wx.request({
      url: 'http://192.168.1.180/data.json',
      data: {
      },
      method: 'get',
      success: function (res) {
        that.setData({
          goods: res.data.video
        })
        //--------------------------------------------------------
       // console.log("222", that.data.goods)
      },
      error: function (res) {
        // console.log(res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //组件事件
  _user(){
    console.log("用户的相关信息")
  }
 
})
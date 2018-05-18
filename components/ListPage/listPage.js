// components/ListPage/listPage.js
var pageNum = 1;
var lists = [];
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
    list:[], //分页数据列表
    windowHeight:null, // 屏幕高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleList:function(pageNum,pageSize){
      var that = this;
      wx.request({
        url:'https://nwsapi.nanniwan.com/nws_cms/article/articleRecommend_list.api',
        data: {
          uid: 1,
          pageNum:pageNum,
          pageSize:pageSize
        },
        method: 'GET',
        success: function (res) {
          lists = lists.concat(res.data.pageBean.list); 
          that.setData({
            list:lists
          })
        },
        error: function (res) {
          console.log("错误");
        }
      })
    },
    bindDownLoad:function(){
      pageNum=pageNum+1;
      this.handleList(pageNum,10);    
    }
  },
  attached:function(){
    this.handleList(1,10);
    var that = this;
    //获取屏幕的相关信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  }

})

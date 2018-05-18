const app = getApp();
var register = require('../../components/Refresh/refreshLoadRegister.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentSize: 0,         //
    words: [],               //
    navData: [
      {
        text: '视频'
      },
      {
        text: '详情'
      },
      {
        text: '活动'
      },
      {
        text: '排名'
      },
      {
        text: '搜索'
      },
      {
        text: '分页'
      },
      {
        text: '青葱'
      },
      {
        text: '上课'
      },
      {
        text: '下课'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },
  //事件处理函数
  onLoad: function () { 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    // -----------------------------------------------------------------------------------
    var _this = this;
    register.register(this);
    //获取words  
    this.doLoadData(0, 20);
    // ------------------------------------------------------------------------------------------

  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  //添加组件
  onReady:function(){
    this.videoCom = this.selectComponent("#videoCom");
    this.videoDetail = this.selectComponent("#videoDetail");  
    this.voteActive = this.selectComponent("#voteActive"); 
    this.sort = this.selectComponent("#sort"); 
    this.listPage = this.selectComponent("#listPage");  
  },
  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  },
  onPullDownRefresh: function (){
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉")
  },
  // ---------------------------------------------------------------------------
  doLoadData(currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    setTimeout(function () {
      var length = currendSize + PAGE_SIZE;
      // console.log('currendSize:', currendSize);
      for (var i = currendSize; i < length; i++) {
        that.data.words.push('内容' + i);
      }
      var words = that.data.words;
      that.data.currentSize += PAGE_SIZE;
      that.setData({
        words: words
      });
      wx.hideLoading();
      register.loadFinish(that, true);
    }, 2000);
  },
  //模拟刷新数据
  refresh: function () {

    this.setData({
      words: [],
      currentSize: 0
    });
    this.doLoadData(0, 20);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  },
  // ------------------------------------------------------------------------
})
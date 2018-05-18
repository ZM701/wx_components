//index.js
var WxSearch = require('../../components/wxSearchView/wxSearchView.js');

Page({
  data: {
    searchValue: '',  //搜索内容
    showData:[],  //展示内容
    isShow:true,  //搜索是否有内容
  },

  // 搜索栏
  onLoad: function (options) {
    //-----------------------------------------------
    var that = this;
    wx.request({
      // url: 'http://192.168.1.160:1020/vote/vote_users.api',
      url: 'http://192.168.1.160:1020/search/product.api',
      data: {
        xcx: "nnw",
        uid: 1,
        search_words: options.searchValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.list.length>0){
          that.setData({
            showData: res.data.list,
            isShow:true
          });
        }else{
          that.setData({
            isShow: false
          });
        }
      
        //console.log("000", res.data.list);
      },
      error: function (res) {
        // console.log(res)
      }
    })
  //-------------------------------------------------------------
    //搜索页面跳回-开始-------------------------------------------------------------
    if (options && options.searchValue) {
      this.setData({
        searchValue: options.searchValue,
        showData: that.data.showData
      });
    }
  //搜索页面跳回---结束-----------------------------------------------------------
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.reLaunch({
      url: '../findList/findList?searchValue=' + value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.reLaunch({
      url: '../search/search?searchValue=返回'
    })
  }

})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getRemoteDoc: function(e) {
    console.log('getRemoteDoc');
    wx.downloadFile({
    url:'https://hkcash-private-test.oss-cn-hongkong.aliyuncs.com/econtract/423053238691692544-b03f3e2e-b41d-41a6-9b83-303112bb1e5b.pdf?OSSAccessKeyId=LTAI2pFx7EflElP7&Expires=1570771544&Signature=n98aAWhcwzZeDob3dfTZPe26S8c%3D',
      success: function(res){
        var filePath = res.tempFilePath;
        console.log(res);

        wx.openDocument({
          filePath: filePath,
          fileType: "pdf",
          success: function(result) {
            console.log(result);
            console.log('打开文档成功')
          }
        })
      }
    });
  },
  getRemoteImg: function (e) {
    console.log('getRemoteDoc');
    wx.downloadFile({
      url: 'https://hkcash-private-test.oss-cn-hongkong.aliyuncs.com/APP_ID_CARD/00003d65d8d62c76.jpeg?OSSAccessKeyId=LTAI2pFx7EflElP7&Expires=1570692837&Signature=FIq4tvwrbqMe%2F7yPkUiXyHf4vYA%3D',
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(res);

        wx.openDocument({
          filePath: filePath,
          fileType: "jpeg",
          success: function (result) {
            console.log(result);
            console.log('打开文档成功')
          }
        })
      
      }
    });
  },
  
})

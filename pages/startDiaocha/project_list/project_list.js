const app = getApp();
Page({

  data: {
    elements: [],
  },


   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    var terminalUserId = app.terminalUserId;
    console.log(terminalUserId)
    that.getProjectList(terminalUserId);
  },


  getProjectList:function(terminalUserId){
    var that = this;
    wx.request({
      // 必需
      url: 'http://192.168.15.146:8080/wechat/api/fieldProject/getFieldProjectListByTerminalUserId',
      data: {
        terminalUserId:terminalUserId
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        if (res.data.status == 'success') {
            that.setData({
              elements:res.data.retObj
            })
         
          } else {
            wx.showToast({
              title: '获取项目列表失败',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
      },
      fail: (res) => {
        
      },
      complete: (res) => {
        
      }
    })

  },

  goToPoint_type:function(even){
    console.log("点击了")
     console.log(even)
  }
})
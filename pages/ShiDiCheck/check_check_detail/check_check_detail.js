// 引入跳转js
import router from '../../../utils/router.js';
var app = getApp();
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    requestUrl: '', //请求路径
    gradualColor: ["red", "#4a67d6"],

    //资源
    retObj: [],
    imgDescList: [{
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }], //图片对应描述
    voidDescList: [{
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }, {
      description: " "
    }], //视频对应描述 
    //举报图片
    reportImgSrc: [],
    //举报视频
    reportVideoSrc: [],
    //图片上传数据
    imgList_No: [],
    imgList: [],
    //视频上传数据
    videoList_No: [],
    videoList: [],

    //录音变量
    audioSrc: [],
    audioSrc_No: [],
    isShow: 1,
    isShow_No: 1,

    resourceList: [], //资源集合

    address: '', //地址
    latitude: '', //地址经纬度
    longitude: '',

    //任务ID
    taskId: '',
    projectId: '', //项目id
    terminalUserId: '', //用户id
    locationName: '', //点位
    pointName: '', //点位类型
    questionContent: '', //问题
    auditContent: '', //整改说明
    commitContent: '', //审核意见

    radios: [{
      id: 0,
      content: '通过',
    }, {
      id: 2,
      content: '不通过',
    }, {
      id: 1,
      content: '长期整改',
    }],
    desc: '', //审批意见
    redioId: 0, //选项id
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    var terminalUserId = app.terminalUserId;
    var taskId = e.taskId;
    var projectId = e.projectId;
    var requestUrl = app.globalData.requestUrl; //请求路径
    that.setData({
      requestUrl: requestUrl,
      taskId: taskId,
      projectId: projectId,
      terminalUserId: terminalUserId
    })
    console.log("任务id：", this.data.taskId, ",项目id：", this.data.projectId)
    //获取数据
    that.detail();

  },

  /**
   * 播放录音
   */

  playRecord: function(e) {
    var that = this;
    var audioSrc = this.data.audioSrc;
    var index = e.currentTarget.dataset.id;

    if (audioSrc == '') {
      this.tip("请先录音！")
      return;
    }
    audioSrc.forEach((v, i, array) => {
      v.bl = false;
      if (i == index) {
        v.bl = true;
      }
    })
    that.setData({
      audioSrc: audioSrc
    })
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.audioSrc[index].src,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    // console.log("播放录音", that.data.audioSrc[index])
     // 监听音频自然播放至结束的事件
      innerAudioContext.onEnded(() => {
        console.log("播放结束")
        audioSrc[index].bl = false;
        that.setData({
          audioSrc: audioSrc,
        })
        // 取消自然播放至结束的事件
        innerAudioContext.offEnded();

      })
  },
  /**
   * 播放录音
   */

  playRecord_No: function(e) {
    var that = this;
    var audioSrc = this.data.audioSrc_No;
    var index = e.currentTarget.dataset.id;
     audioSrc.forEach((v, i, array) => {
      v.bl = false;
      if (i == index) {
        v.bl = true;
      }
    })
    that.setData({
      audioSrc_No: audioSrc
    })
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.audioSrc_No[index].src,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    // console.log("播放录音", that.data.audioSrc[index])
      // 监听音频自然播放至结束的事件
    innerAudioContext.onEnded(() => {
      console.log("播放结束")
      audioSrc_No[index].bl = false;
      that.setData({
        audioSrc_No: audioSrc_No,
      })
      // 取消自然播放至结束的事件
      innerAudioContext.offEnded();
    })
  },

  //发送请求获取数据
  detail: function() {
    var that = this;
    var projectId = that.data.projectId; //项目id
    var taskId = that.data.taskId; //任务id
    var requestUrl = that.data.requestUrl; //请求路径
    wx.request({
      url: requestUrl + "/mobile/fieldTask/getFieldTaskDetail",
      // url: "http://192.168.15.71:8083/mobile/fieldTask/getFieldTaskAnswerDetail",
      data: {
        'projectId': projectId,
        'taskId': taskId
      },
      success(res) {
        console.log("任务详情：", res.data.retObj)
        if (res.data.status === "success") {

          var images = res.data.retObj.answerResourceMap[0];
          var videos = res.data.retObj.answerResourceMap[2];
          var audios = res.data.retObj.answerResourceMap[1];
          // console.log("图片列表：",images,"---------视频列表：",videos,"-------音频列表：",audios )


          var images_task = res.data.retObj.taskResourceMap[0];
          var videos_task = res.data.retObj.taskResourceMap[2];
          var audios_task = res.data.retObj.taskResourceMap[1];

          that.downlodaResource(images, videos, audios);

          that.downlodaResource_task(images_task, videos_task, audios_task);

          that.setData({
            address: res.data.retObj.address,
            //经纬度
            latitude: res.data.retObj.latitude,
            longitude: res.data.retObj.longitude,
            code: res.data.retObj.code,
            questionContent: res.data.retObj.questionContent,
            pointName: res.data.retObj.pointName,
            locationName: res.data.retObj.locationName,
            auditContent: res.data.retObj.auditContent,
            commitContent: res.data.retObj.commitContent
          })
        }
      },
      //请求失败
      fail: function(err) {},
      //请求完成后执行的函数
      complete: function() {}
    })
  },


  downlodaResource: async function(images, videos, audios) {
    var that = this;
    wx.showLoading({
      title: '资源加载中',
      mask: true
    })
    //如果录音有值显示录音
    if (audios != null) {
      that.setData({
        isShow_No: 0
      })
    }
    var imgDesc = []; //图片描述
    var videoDesc = []; //视频描述

    var mapImage = []; //图片下载
    if (images != null) {
      for (var i = 0; i < images.length; i++) {
        mapImage.push(images[i].url)
        imgDesc.push({
          description: images[i].description
        });
      }
    }
    var mapVoid = []; //视频下载
    if (videos != null) {
      for (var i = 0; i < videos.length; i++) {
        mapVoid.push(videos[i].url)
        videoDesc.push({
          description: videos[i].description
        })
      }
    }

    that.setData({
      imgDescList: imgDesc, //图片描述
      voidDescList: videoDesc, //视频描述
    })

    for (var index = 0; index < mapImage.length; index++) {
      await that.downlodaImage(mapImage[index]).then((res) => {})
    }

    for (var index = 0; index < mapVoid.length; index++) {
      await that.downlodaVideo(mapVoid[index]).then((res) => {})
    }

    var mapAudio = []; //音频下载

    if (audios != null) {
      for (var i = 0; i < audios.length; i++) {
        mapAudio.push(audios[i].url)
      }
    }
    for (var index = 0; index < mapAudio.length; index++) {
      await that.downlodaAudio(mapAudio[index]).then((res) => {})
    }
    wx.hideLoading();
  },

  downlodaResource_task: async function(images_task, videos_task, audios_task) {
    var that = this;
    wx.showLoading({
      title: '资源加载中',
      mask: true
    })
    //如果录音有值显示录音
    if (audios_task != null) {
      that.setData({
        isShow: 0
      })
    }

    var mapImage = []; //图片下载
    if (images_task != null) {
      for (var i = 0; i < images_task.length; i++) {
        mapImage.push(images_task[i].url)
      }
    }
    var mapVoid = []; //视频下载
    if (videos_task != null) {
      for (var i = 0; i < videos_task.length; i++) {
        mapVoid.push(videos_task[i].url)
      }
    }

    for (var index = 0; index < mapImage.length; index++) {
      await that.downlodaImage_task(mapImage[index]).then((res) => {})
    }

    for (var index = 0; index < mapVoid.length; index++) {
      await that.downlodaVideo_task(mapVoid[index]).then((res) => {})
    }

    var mapAudio = []; //音频下载

    if (audios_task != null) {
      for (var i = 0; i < audios_task.length; i++) {
        mapAudio.push(audios_task[i].url)
      }
    }
    for (var index = 0; index < mapAudio.length; index++) {
      await that.downlodaAudio_task(mapAudio[index]).then((res) => {})
    }
    wx.hideLoading();
  },
  /**
   ***********************************下载图片资源**************************************
   */

  downlodaImage: function(filePath) {
    var that = this;
    var imgList = that.data.imgList_No;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            // console.log('图片下载成功' + res.tempFilePath)
            imgList.push(res.tempFilePath)
            that.setData({
              imgList_No: imgList
            })
          }
        }
      })
    })

  },
  downlodaImage_task: function(filePath) {
    // console.log("再看看看任务图片的值：",filePath)
    var that = this;
    var imgList = that.data.imgList;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            // console.log('图片下载成功' + res.tempFilePath)
            imgList.push(res.tempFilePath)
            that.setData({
              imgList: imgList
            })
          }
        }
      })
    })

  },
  /**
   ***********************************下载视频资源**************************************
   */

  downlodaVideo: function(filePath) {

    var that = this;
    var videoList = that.data.videoList_No;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            videoList.push({
              url: res.tempFilePath
            })
            that.setData({
              videoList_No: videoList
            })
          }
        }
      })
    })
  },
  downlodaVideo_task: function(filePath) {

    var that = this;
    var videoList = that.data.videoList;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            videoList.push({
              url: res.tempFilePath
            })
            that.setData({
              videoList: videoList
            })
          }
        }
      })
    })
  },
  /**
   ***********************************下载音频资源**************************************
   */

  downlodaAudio: function(filePath) {
    var that = this;
    var audioSrc = that.data.audioSrc_No;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // console.log("音频的res：",res)
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            // console.log("下载的音频:",res.tempFilePath)
             audioSrc.push({
               bl: false,
               src: res.tempFilePath,
            })
            that.setData({
              audioSrc_No: audioSrc
            })
          }
        }
      })
    })
  },
  downlodaAudio_task: function(filePath) {
    var that = this;
    var audioSrc = that.data.audioSrc;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success(res) {
          // console.log("音频的res：",res)
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.data)
            // console.log("下载的音频:",res.tempFilePath)
             audioSrc.push({
               bl: false,
               src: res.tempFilePath,
            })
            that.setData({
              audioSrc: audioSrc
            })
          }
        }
      })
    })
  },

  ViewImageForreport(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ViewImageForreport_No(e) {
    wx.previewImage({
      urls: this.data.imgList_No,
      current: e.currentTarget.dataset.url
    });
  },
  ViewVideoForreport(e) {
    console.log("视频的啥？：", e);
    this.VideoContext = wx.createVideoContext('reportVideo' + e.currentTarget.dataset.url);
    this.VideoContext.requestFullScreen(0);
  },


  go() {
    var that = this;
    var latitude = Number(that.data.latitude);
    var longitude = Number(that.data.longitude);
    var address = that.data.address;
    // console.log(latitude)
    wx.openLocation({
      name: address,
      address: address,
      latitude,
      longitude,
      scale: 18
    })
  },

  //-------------- 审批意见-----------
  textareaAInput(e) {
    this.data.desc = e.detail.value;
  },

  /**
   ***********************************测评结果单选框**************************************
   */

  radioChange: function(e) {
    var that = this;
    this.data.redioId = e.detail.value;
  },

  submit: function() {
    var that = this;

    var auditContent = that.data.desc; //创文办审批意见
    var redioId = that.data.redioId; //整改结果  0||2->result -- 1->longTask
    //审批意见不能为空
    if (auditContent == '') {
      wx.showToast({
        title: '请输入审批意见',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    wx.showToast({
      title: '审核结果已提交',
      icon: 'none',
      duration: 1000,
      mask: true
    })
    if (redioId == 0 || redioId == 2) {
      that.resultSubmit(auditContent, redioId);
    } else {
      that.longTaskSubmit(auditContent, redioId);
    }

    console.log("答案和id：", auditContent, "----", redioId)
  },
  //合格不合格上传
  resultSubmit: function(auditContent, redioId) {
    var that = this;
    var requestUrl = that.data.requestUrl; //请求路径
    var taskId = that.data.taskId; //任务id
    var terminalUserId = app.terminalUserId;
    var projectId = that.data.projectId; //项目id

    console.log("合格不合格")
    wx.request({
      // 必需
      url: requestUrl + '/mobile/fieldTask/check',
      data: {
        'id': taskId,
        'auditContent': auditContent,
        'result': redioId,
        'terminalUserId': terminalUserId
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.status === "success") {
          router.navigateTo({
            url: "../check_index/check_index?projectId=" + projectId
          })

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
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
  //长期整改上传
  longTaskSubmit: function(auditContent, redioId) {
    var that = this;
    var requestUrl = that.data.requestUrl; //请求路径
    var taskId = that.data.taskId; //任务id
    var terminalUserId = app.terminalUserId;
    var projectId = that.data.projectId; //项目id
    console.log("长期整改")
    wx.request({
      // 必需
      url: requestUrl + '/mobile/fieldTask/check',
      data: {
        'id': taskId,
        'auditContent': auditContent,
        'longTask': redioId,
        'terminalUserId': terminalUserId
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.status === "success") {
          router.navigateTo({
            url: "../check_index/check_index?projectId=" + projectId
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
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
  }

})
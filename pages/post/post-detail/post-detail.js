// pages/post-detail/post-detail.js
var postsData=require('../../../data/posts-data.js');
var app=getApp();
Page({
    data:{
      isPlayingMusic:false
  },
    onLoad:function(option){
        // 页面初始化 option为页面跳转所带来的参数
        var postId=option.id;
        this.data.currentPostId=postId;
        var postData=postsData.postList[postId];
        this.setData({
          postData:postData
        });
        var postsCollected=wx.getStorageSync('posts_collected');
        if(postsCollected){
          var postCollected=postsCollected[postId];
          this.setData({
            collected:postCollected
          });
        }else{
          var postsCollected={};
          postsCollected[postId]=false;
          wx.setStorageSync('posts_collected',postsCollected);
        }
        if(app.globalData.g_isPlayingMusic && app.g_currentMusicPostId===postId){
              this.setData({
                  isPlayingMusic:true
              });
        }else{

        }
          this.setMusicMonitor();
  },
    setMusicMonitor: function () {
      var that=this;
      wx.onBackgroundAudioPlay(function () {
          that.setData({
              isPlayingMusic:true
          });
          app.globalData.g_isPlayingMusic=true;
          app.globalData.g_currentMusicPostId=that.data.currentPostId;
      });
      wx.onBackgroundAudioPause(function () {
          that.setData({
              isPlayingMusic:false
          });
          app.globalData.g_isPlayingMusic=false;
      });
      wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic:false
            });
            app.globalData.g_isPlayingMusic=false;
        });
  },
    onCollectionTap:function (event) {
      var postsCollected=wx.getStorageSync('posts_collected');
      var postCollected=postsCollected[this.data.currentPostId]
      postCollected=!postCollected;
      postsCollected[this.data.currentPostId]=postCollected;
      this.showToast(postCollected,postsCollected);

  },
    showModal: function (postCollected,postsCollected) {
    var that=this;
    wx.showModal({
          title:"收藏",
          content:postCollected?"收藏该文章":"取消收藏该文章",
          showCancel:'true',
          cancelText:"取消",
          cancelColor:'#333',
          confirmText:"确认",
          confirmColor:"#405f80",
          success: function (res) {
            if(res.confirm){
              wx.setStorageSync('posts_collected',postsCollected);
              that.setData({
                collected:postCollected
              });
            }
          }
        })
  },
    showToast: function (postCollected,postsCollected) {
      var that=this;
    wx.setStorageSync('posts_collected',postsCollected);
    that.setData({
      collected:postCollected
    });
    wx.showToast({
       title:postCollected?"收藏成功":"取消成功",
       duration:1000,
       icon:'success'
    });
  },
    onShowTap:function (event) {
        var itemList=[
            "分享到微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList:itemList,
            itemColor:"#405f80",
            success:function (res) {
                // res.cancel
                // res.tabIndex
                wx.showModal({
                    title:"用户"+itemList[res.tabIndex],
                    content:res.cancel+"现在无法实现分享功能"
                });
            }
        })
    },
    onMusicTap: function (event) {
        var currentPostId=this.data.currentPostId;
        var postData=postsData.postList[currentPostId];
        var isPlayingMusic=this.data.isPlayingMusic;
        if(isPlayingMusic){
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic:false
            });
        }else{
            wx.playBackgroundAudio({
                dataUrl:postData.music.url,
                title:postData.music.title,
                coverImgUrl:postData.music.coverImgUrl
            });
            this.setData({
                isPlayingMusic:true
            });
        }
    }
});



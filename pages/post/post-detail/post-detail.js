// pages/post-detail/post-detail.js
var postsData=require('../../../data/posts-data.js');
Page({
  data:{

  },
  onLoad:function(option){
    // 页面初始化 option为页面跳转所带来的参数
    var postId=option.id;
    this.data.currentPostId=postId;
   /* this.setData({
      currentPostId:postId
    })*/
    var postData=postsData.postList[postId];
    /*this.data.postData=postData;*/
    this.setData({
      postData:postData
    });


    var postsCollected=wx.getStorageSync('posts_collected');
    if(postsCollected){
      var postCollected=postsCollected[postId];
      this.setData({
        collected:postCollected
      })
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('posts_collected',postsCollected);
    }
  },
  onCollectionTap:function (event) {
      var postsCollected=wx.getStorageSync('posts_collected');
      var postCollected=postsCollected[this.data.currentPostId]
      postCollected=!postCollected;
      postsCollected[this.data.currentPostId]=postCollected;
      this.showModal();

  },
  showModal: function (postCollected,postsCollected) {
    wx.showModal({
      title:"收藏",
      content:"是否收藏该文章",
      showCancel:'true',
      cancelText:"不收藏",
      cancelColor:'#333',
      confirmText:"收藏",
      confirmColor:"#405f80",
      success: function (res) {
        if(res.confirm){
          wx.setStorageSync('posts_collected',postsCollected);
          this.setData({
            collected:postCollected
          });
        }
      }
    })
  },
  showToast: function (postCollected,postsCollected) {
    wx.setStorageSync('posts_collected',postsCollected);
    this.setData({
      collected:postCollected
    });
    wx.showToast({
       title:postCollected?"收藏成功":"取消成功",
       duration:1000,
       icon:'success',
    });
  }
});
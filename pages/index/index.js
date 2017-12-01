Page({
    onTap: function () {
       /* wx.navigateTo({
            url:"../post/post"
        });*/
        wx.switchTab({
            url:"../post/post"
        });
    },
    onUnload: function () {
        console.log("unload")
    },
    onHide: function () {

    }
});
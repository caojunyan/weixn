Page({
    onTap: function () {
       /* wx.navigateTo({
            url:"../post/post"
        });*/
        wx.redirectTo({
            url:"../post/post"
        });
    },
    onUnload: function () {
        console.log("unload")
    },
    onHide: function () {
        console.log("onHide")
    }
});
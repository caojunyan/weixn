function convertToStarsArray(stars){
    var num = stars.toString().substring(0,1);
    var array = [];
    for(var i=1;i<=5;i++){
        if(i<=num){
            array.push(1);
        }
        else{
            array.push(0)
        }
    }
    return array;
}

function  http (url,moviesDouban) {
    wx.request({
        url: url,
        method:'GET',
        header:{
            "Content-Type":"application/xml"
        },
        success: function (res) {
            moviesDouban(res.data);
        },
        fail: function (error) {
        },
        complete: function () {

        }
    })
}
module.exports={
    convertToStarsArray:convertToStarsArray,
    http:http
};
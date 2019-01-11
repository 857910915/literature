$(function () {
    var newsId=showWindowHref();
    $.get("../news/toFindNews",{"newsId":newsId},function (data) {
        console.log(data);
        $("#msgSend").html(data.suser.userNickname);
        $("#msgTitle").html(data.newsTitle);
        var date=new Date(data.newsCreatetime);
        var time=formatDate(date);
        $("#msgTime").html(time);
        $("#msgText").html(data.newsText);

    },"json");
});

function showWindowHref() {
    var sHref = window.location.href;
    var args = sHref.split('?');
    if (args[0] == sHref) {
        return "";
    }
    var arr = args[1].split('=');
    //console.log(arr[1]);
    return arr[1];
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
$(function () {
    var username=showWindowHref();
    if (username.length==0){
        $.get("../user/toSelectUser1",function (data) {
            $("#userImg2").attr("src","../"+data.userImg);
            $("#userImg2").attr("alt",data.userNickname);
            $("#biming").html("笔名："+data.userNickname);
            var date=new Date(data.userBirthday);
            var time=formatDate(date);
            $("#shengri").html("生日："+time);
            $("#sex").html("性别："+data.userSex);

        },"json");
    }else {
        $.get("../user/toSelectUser",{"username":username},function (data) {
            $("#userImg2").attr("src","../"+data.userImg);
            $("#userImg2").attr("alt",data.userNickname);
            $("#biming").html("笔名："+data.userNickname);
            var date=new Date(data.userBirthday);
            var time=formatDate(date);
            $("#shengri").html("生日："+time);
            $("#sex").html("性别："+data.userSex);
        },"json");
    }
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
    return year+"-"+month+"-"+date;
}
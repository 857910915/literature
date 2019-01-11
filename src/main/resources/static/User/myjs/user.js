var pageNo=1;
$(function () {
    //获取用户信息
    var username=showWindowHref();
    if (username.length==0){
        $.get("../user/toSelectUser1",function (data) {
            // console.log(data);
            $("#userImg").attr("src","../"+data.userImg);
            $("#userNickname").html(data.userNickname);
            $("#space_title").html(data.userNickname);
            $("#userImg1").attr("src","../"+data.userImg);
            $("#userImg1").attr("alt",data.userNickname);
            $(".atten_num").html(data.followList.length);
            $("#profile_desc").html(data.space.spaceAutograph+"<br><br>"+data.space.spaceIntroduction);
        },"json");
    }else {
        $.get("../user/toSelectUser",{"username":username},function (data) {
            // console.log(data);
            $("#userImg").attr("src","../"+data.userImg);
            $("#userNickname").html(data.userNickname);
            $("#space_title").html(data.userNickname);
            $("#userImg1").attr("src","../"+data.userImg);
            $("#userImg1").attr("alt",data.userNickname);
            $(".atten_num").html(data.followList.length);
            $("#profile_desc").html(data.space.spaceAutograph+"<br><br>"+data.space.spaceIntroduction);
            $("#wenji").attr("href","user.html?username="+data.username);
            $("#ziliao").attr("href","userinfo.html?username="+data.username);
            $("#liuyan").attr("href","usercom.html?username="+data.username);
            $("#guanzhu").attr("href","userzhu.html?username="+data.username);
            $("#fensi").attr("href","userfen.html?username="+data.username);
        },"json");
    }

    //访问空间
    $.get("../visit/toVisit",{"vusername":username},function () {

    });
    //统计访问量
    $.get("../visit/toSelectVisitList",{"vusername":username,"pageNo":pageNo},function (data) {
        // console.log(data);
        $("#num").html(data.length);
    },"json");

    //访客
    $.get("../visit/toSelectVisitList1",{"vusername":username,"pageNo":pageNo},function (data) {
        // console.log(data);
        for (var i in data){
            var visit=data[i];
            $("#fangke").append('<li>\n' +
                '                                <a title="'+visit.user.userNickname+'" href="/User/user.html?username='+visit.user.username+'"><img src="../'+visit.user.userImg+'" alt="'+visit.user.userNickname+'" /></a>\n' +
                '                            </li>');
        }

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

//关注
function toGuanzhu() {
    var username=showWindowHref();
    if (username.length==0){
        alert("不能关注自己");
    } else {
        $.get("../follow/toGuanzhu",{"username":username},function (data) {
            alert(data);
            window.location.href="/User/user.html?username="+username;
        },"json");
    }
}



//下一页
function nextPage() {
    pageNo++;
    toShow();
}
//上一页
function prePage() {
    if (pageNo==1){
        return;
    }
    pageNo--;
    toShow();
}
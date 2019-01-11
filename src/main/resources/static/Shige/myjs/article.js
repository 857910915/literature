$(function () {
    var artId=showWindowHref();
    $.get("../article/toFindArticle",{"artId":artId},function (data) {
        console.log(data);
        $("#zuoze").html('<a target="_blank" href="/User/user.html?username='+data.user.username+'">'+data.user.userNickname+'的诗词</a>');
        $("#biaoti").html(data.artTitle);
        $("#artText").html(data.artText.replace(/\n/g,"<br/>"));
        var date=new Date(data.artCreatetime);
        var time=formatDate1(date);
        $("#fabutime").html(time);
        $("#zan").html(data.fabulousList.length);
        $("#num").html(data.artNum);
        for (var i in data.commentList) {
            var com=data.commentList[i];
            var date1=new Date(com.comCreatetime);
            var time1=formatDate1(date1);
            $("#pinglun").append('<li><span class="ziduan">\n' +
                '                <a href="/User/user.html?username='+com.user.username+'"><img src="../'+com.user.userImg+'"></a></span>\n' +
                '                <div class="wen">\n' +
                '                    <h2><a href="/User/user.html?username='+com.user.username+'">'+com.user.userNickname+'</a>'+time1+'</h2>\n' +
                '                    <div class="wenzi">'+com.comText+'</div>\n' +
                '                    <h3>\n' +
                '                        <a href="javascript:;" onclick="tohuifu('+com.comId+');">\n' +
                '                        <img src="/images/huifu.png">回复</a>\n' +
                '                    </h3>\n' +
                '                </div>\n' +
                '            </li>');
        }
    },"json");

    //点评
    $("#pinglun1").click(function () {
        var comText=$("#content1").val();
        if (comText.length!=0){
            $.get("../comment/toInsertComment",{"comAid":artId,"comText":comText},function (data) {
                alert(data);
                window.location.href="article.html?artId="+artId;
            },"json");
        }
    });
    //点赞
    $("#dianzan").click(function () {
        $.get("../fab/toInsertFab",{"fabAid":artId},function (data) {
            alert(data);
            window.location.href="article.html?artId="+artId;
        },"json");
    });

});

function showWindowHref() {
    var sHref = window.location.href;
    var args = sHref.split('?');
    if (args[0] == sHref) {
        return "";
    }
    var arr = args[1].split('=');
    return arr[1];
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"."+month+"."+date;
}

function formatDate1(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
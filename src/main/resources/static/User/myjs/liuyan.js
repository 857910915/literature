var username=showWindowHref();
$(function () {
    $.get("../msg/toSelectAllMsgList",{"rusername":username},function (data) {
        console.log(data);
        $("#num2").html(data.length);
        for (var i in data){
            var msg=data[i];
            var date=new Date(msg.msgCreatetime);
            var time=formatDate(date);
            $("#liuyan1").append('<dl>\n' +
                '                                    <dt>\n' +
                '                                        <div class="head"><a href="/User/user.html?username='+msg.suser.username+'"><img src="../'+msg.suser.userImg+'" /></a></div>\n' +
                '                                        <div class="name"><a href="/User/user.html?username='+msg.suser.username+'">'+msg.suser.userNickname+'</a></div>\n' +
                '                                    </dt>\n' +
                '                                    <dd>\n' +
                '                                        <div class="fb">\n' +
                '                                            <div class="fm">\n' +
                '                                                <div class="fc">\n' +
                '                                                    <p class="c">\n' +
                '                                                                     '+msg.msgText+'          </p>\n' +
                '                                                    <span class="d">'+time+'</span>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </dd>\n' +
                '                                </dl>');
        }
    },"json");

    $("#toSendMsg").click(function () {
        var msgText=$("#guestbook_content").val();
        if (msgText.length!=0){
            $.get("../msg/toSendMsg",{"msgText":msgText,"rusername":username},function (data) {
                alert(data);
                window.location.href="/User/usercom.html?username="+username;
            },"json");
        } else {
            alert("请输入留言内容！")
        }
    });
    var contentFloat=$(".jscroll-c");
    var top=contentFloat.offset().top;
    $(".jscroll-e").scroll(function () {
        console.log(top);
        contentFloat.offset({top:top});
    });

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
    return year+"年"+month+"月"+date+"日";
}
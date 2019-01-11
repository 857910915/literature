$(function () {
    //获取用户信息
    $.get("../user/toSelectUser1",function (data) {
        console.log(data);
        $("#userImg1").attr("src","../"+data.userImg);
        $("#crop-preview-100").attr("src","../"+data.userImg);
        $("#crop-preview-60").attr("src","../"+data.userImg);
        $("#userName1").html(data.userNickname);
        $("#userImg2").attr("src","../"+data.userImg);
        $("#userImg2").attr("alt",data.userNickname);
        $("#userName2").html(data.userNickname);
        $("#yue").html("账户余额："+data.userBalance);
        $("#jifen").html("我的积分："+data.userIntegral);
        $("#renqi").html(data.followList.length);
        var num=parseInt(data.userIntegral);
        if (num<100){
            $("#lv_num").html("LV1 ");
            $("#lv_span").html(" 初入江湖");
        }else if (num>=100&&num<200){
            $("#lv_num").html("LV2 ");
            $("#lv_span").html(" 再接再厉");
        }else if (num>=200&&num<500){
            $("#lv_num").html("LV3 ");
            $("#lv_span").html(" 文坛新秀");
        } else if (num>=500&&num<1000){
            $("#lv_num").html("LV4 ");
            $("#lv_span").html(" 趣味横生");
        }else if (num>=1000&&num<2000){
            $("#lv_num").html("LV5 ");
            $("#lv_span").html(" 妙笔生花");
        }else if (num>=2000&&num<5000){
            $("#lv_num").html("LV6 ");
            $("#lv_span").html(" 倚马可待");
        }else if (num>=5000&&num<10000){
            $("#lv_num").html("LV7 ");
            $("#lv_span").html(" 诗和远方");
        }else if (num>=10000&&num<20000){
            $("#lv_num").html("LV8 ");
            $("#lv_span").html(" 文学泰斗");
        }else if (num>=20000&&num<50000){
            $("#lv_num").html("LV9 ");
            $("#lv_span").html(" 受益匪浅");
        }else if (num>=50000&&num<100000){
            $("#lv_num").html("LV10 ");
            $("#lv_span").html(" 传道受业");
        }else if (num>=100000){
            $("#lv_num").html("满级 ");
            $("#lv_span").html(" 谁与争锋");
        }
    },"json");

    $(".acco_info .problem").hover(function(){
        $(this).next(".tips").toggle();
    });
    //获取签到信息
    $.get("../sign/toFindSign",function (data) {
        console.log(data);
        if (data=="1000"){
            $("#sign_show_index").html("签到");
        } else {
            $("#sign_show_index").html("已签到");
        }
    },"json");
});

function qiandao(){
    //签到加积分
    console.log($("#sign_show_index").html());
    if($("#sign_show_index").html()=="已签到"){
        alert("您已签到，请不要重复点击");
    }else {
        $.get("../sign/toSign",function (data) {
            alert(data);
            window.location.href="/User/index.html";
        },"json");
    }
}


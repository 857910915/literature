<#--  chenyi 2018-07-24 16:10:31-->
<!DOCTYPE html>
<html>
<head>
    <title>诗友会</title>
    <meta charset="utf-8">
<#include "../header.ftl"/>
    <link rel="stylesheet" href="/css/login.css" media="all">
</head>
<body>
<img class="video_mask" src="/img/background.jpg">

<div class="login">
    <h1>欢迎进入水墨世界聊天室</h1>
    <form class="layui-form">
        <div class="layui-form-item">
            <input class="layui-input" name="username" id="username" placeholder="请输入昵称" maxlength="10" value="" type="text"
               readonly="readonly"    autocomplete="off">
        </div>
        <span class="layui-btn chat_login_btn right" lay-submit="" lay-filter="login">立即进入</span>

    </form>
</div>

<script>
    $(function () {
        layui.use(['form', 'layer'], function () {
            var form = layui.form;
            var layer = layui.layer;
            $.post("../user/toGetUsername",function (data) {
                //赋值
                var username=data;
                $("#username").val(username);
                form.on("submit(login)", function (data) {
                    // if (data.field.username.trim() === "") {
                    //     //获取用户名
                    //
                    //     layer.tips('进入前请先输入昵称', $("#username"), {
                    //         tips: [3, '#3595CC'],
                    //         time: 4000
                    //     });
                    //     return;
                    // }
                    window.location.href="/chat?username="+data.field.username;

            },"json");

            });
    });


    });

</script>
</body>
</html>
<#--  chenyi 2018-07-24 16:10:31-->
<!DOCTYPE html>
<html>
<head>
    <title>诗友会——水墨世界</title>
    <meta charset="utf-8">
    <#include "../header.ftl"/>
    <link rel="stylesheet" href="/css/cy_chat.css" media="all">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <#--<script src="/js/utils.js"></script>-->
    <script src="/js/chat.js"></script>
    <script src="/libs/jquery.snowfall.js"></script>
</head>
<body>
<ul class="layui-nav layui-bg-blue">

        <li class="layui-nav-item mobile-none"><a target="_blank" href="../User/index.html" target="_blank">个人中心</a></li>
        <#--<li class="layui-nav-item mobile-none"><a href="https://gitee.com/leiyuxi" target="_blank">码云</a></li>-->
        <li class="layui-nav-item mobile-none">
            <#--<a href="javascript:;">开发框架</a>-->
            <#--<dl class="layui-nav-child">-->
                <#--<dd><a href="http://admin.cymall.xin" target="_blank">cy-security</a></dd>-->
                <#--<dd><a href="http://fast.cymall.xin" target="_blank">cy-fast</a></dd>-->
                <#--<dd><a href="http://ui.cymall.xin" target="_blank">cy-ui</a></dd>-->
            <#--</dl>-->
        </li>
        <li class="layui-nav-item mobile-none">
            <#--<a href="javascript:;">友情链接</a>-->
            <dl class="layui-nav-child">
                <#--<dd><a href="http://www.layui.com" target="_blank">layui官网</a></dd>-->
                <#--<dd><a href="http://layim.layui.com/" target="_blank">layim</a></dd>-->
                <#--<dd><a href="https://fly.layui.com/case/u/5129040" target="_blank">layui案例</a></dd>-->
            </dl>
        </li>
        <#--<li class="layui-nav-item"><a href="http://im.cymall.xin" target="_blank">二维社区</a></li>-->

    <li class="online-count">当前在线人数: <span id="onlineCount">0</span></li>

    <div class="nav-right" style="float: right;">


        <li class="layui-nav-item">
            <#--<a href="javascript:download();" mobile-none><i class="layui-icon layui-icon-face-smile">&#xe60b;</i> 关于</a>-->
        </li>

        <li class="layui-nav-item">
            <#--<a href="javascript:reward();" mobile-none>捐赠作者</a>-->
        </li>

        <li class="layui-nav-item ">
            <#--<a href="javascript:publics();" >关注公众号</a>-->
        </li>

        <li class="layui-nav-item">
            <a href="javascript:;">
                <img src="" id="headPic" class="layui-nav-img">
                <span id="username">${(username)!""}</span>
            </a>

        </li>


        <li class="layui-nav-item">
            <a href="javascript:CHAT.logout();">
                <i title="退出" class="iconfont icon-guanbi"></i> 退了</a>
        </li>
    </div>
</ul>


<div class="cy-chat-main">
    <ul>

    </ul>

</div>

<div class="cy-chat-footer">
    <div class="cy-chat-tool">
        <div class="face-box" id="faceBox"></div>
        <span class="iconfont  icon-biaoqing" onclick="CHAT.openFace()" title="选择表情"></span>
    <#--<span class="iconfont  icon-jianqie" title="剪切" ></span>-->
        <span class="iconfont  icon-tupian1" onclick="CHAT.chooseFile()" title="发送图片"></span>
        <input id="fileBtn" onchange="CHAT.sendPic(event)" type="file" name="fileName" accept="image/*" value="发送图片"
               style="display: none">
        <span class="iconfont  icon-shouye" onclick="CHAT.sendFlower()" title="鲜花"></span>
    </div>

    <div class="cy-chat-textarea">
        <textarea id="sendMessage"></textarea>
    </div>

    <div class="cy-chat-bottom">
        <div class="cy-chat-send">
            <span class="cy-send-btn" onclick="CHAT.sendText()"> <i class="layui-icon">&#xe609;</i> &nbsp;发送</span>
        </div>
    </div>

</div>


</body>

<script>

    $(function () {
        //初始化WebSocket
        CHAT.init('${(username)!""}');
        //获取用户信息
        var username=showWindowHref();
        $.get("../user/toSelectUser",{"username":username},function (data) {
            console.log(data);
            $("#headPic").attr("src",data.userImg);
        },"json");
    });

    //获取参数
    function showWindowHref() {
        var sHref = window.location.href;
        var args = sHref.split('?');
        if (args[0] == sHref) {
            return "";
        }
        var arr = args[1].split('=');
        return arr[1];
    }

    layui.use(['element', 'layer'], function () {
        var element = layui.element;
        var layer = layui.layer;
        layer.tips('Enter 发送消息', $(".cy-chat-send"), {
            tips: [4, '#1E9FFF'],
            time: 4000
        });
    });


</script>

</html>
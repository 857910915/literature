$(function () {
    //获取用户
    $.get("../user/toGetUsername",function (data) {
        console.log(data);
        if (username.length==0){
            $("#title1").append('<li><a href="/Public/login.html">登录</a></li>\n' +
                '\t\t\t\t<li><a href="/Public/register.html">注册</a></li>\n' +
                '\t\t\t\t<style>\n' +
                '\t\t\t\t\t.zh_click {\n' +
                '\t\t\t\t\t\tcolor: #757575 !important;\n' +
                '\t\t\t\t\t}\n' +
                '\t\t\t\t</style>\n' +
                '\t\t\t\t<li><a href="javascript:zh_tran("s");" class="zh_click" id="zh_click_s">简体中文</a></li>\n' +
                '\t\t\t\t<li class="head_fan"><a href="javascript:zh_tran("t");" class="zh_click" id="zh_click_t">繁體中文</a></li>\n');
        }else {
            $("#user").append('<a href="User/index.html" target="_top">欢迎用户：'+username+'</a>\n' +
                '<style>\n' +
                '\t\t\t\t\t.zh_click {\n' +
                '\t\t\t\t\t\tcolor: #757575 !important;\n' +
                '\t\t\t\t\t}\n' +
                '\t\t\t\t</style>\n' +
                '\t\t\t\t<li><a href="javascript:zh_tran(\'s\');" class="zh_click" id="zh_click_s">简体中文</a></li>\n' +
                '\t\t\t\t<li class="head_fan"><a href="javascript:zh_tran(\'t\');" class="zh_click" id="zh_click_t">繁體中文</a></li>\n');
        }
    },"json")
});


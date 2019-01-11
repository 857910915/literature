$(function () {
    //用户登录
    $("#toLogin").click(function () {
        if (uname()==true&&pass()==true){
            $("#login").submit();
        } else {
            alert("请输入正确的信息");
        }
    });



    //注册
    $("#toRegister").click(function () {
        // console.log($("#sure").prop("checked"));
        if (uname()==true&&pass()==true&&code()==true&&$("#sure").prop("checked")==true){
            var toRegister = $.get("../register",{"username": $("#userAccount").val(),"code1":$("#yanzhen").val(), "password": $("#password").val()},function (data) {
                alert(data);
                if (data=="注册成功！"){
                    window.location.href="login.html";
                }
            },"json");
        }else {
            alert("请输入正确的信息");
        }

    });
});

//用户名验证
function uname() {
    if (/^[0-9a-zA-Z_]{6,15}$/.test($("#userAccount").val())) {
        $("#span1").html("用户名符合要求").css("color","green");
        return true;
    }else {
        $("#span1").html("用户名不符合要求").css("color","red");
        return false;
    }
}
//密码验证
function pass() {
    if (/^[0-9a-zA-Z_]{6,15}$/.test($("#password").val())) {
        $("#span2").html("密码符合要求").css("color","green");
        return true;
    }else {
        $("#span2").html("密码不符合要求").css("color","red");
        return false;
    }
};
//验证码判断
function code() {
    var code=$("#yanzhen").val();
    if (code.length!=4){
        $("#span3").html("验证码不符合要求").css("color","red");
        return false;
    } else {
        $("#span3").html("验证码符合要求").css("color","green");
        return true;
    }
}
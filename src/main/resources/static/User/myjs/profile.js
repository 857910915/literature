$(function () {
    $.get("../user/toSelectUser1",function (data) {
        $("#uname").val(data.userNickname);
        $("#wx").val(data.userVx);
        $("#qq").val(data.userQq);
        $("#mobile").val(data.userPhone);
        // $("#email").val(data.userEmail);
        $("#sign").val(data.userAutograph);
        if (data.userSex=="男"){
            $("#sex1").attr("checked",'checked');
        }else if (data.userSex=="女"){
            $("#sex2").attr("checked",'checked');
        }else if (data.userSex=="保密"){
            $("#sex3").attr("checked",'checked');
        }
    },"json");




    $("#form_submit").click(function () {
        var userPhone=$("#mobile").val();
        var userEmail=$("#email").val();
        var userQq=$("#qq").val();
        if ((userPhone.length==0||isMobile(userPhone))&&(userQq.length==0||isQq(userQq))) {
            $.get("../user/updateUser",{"userNickname":$("#uname").val(),"userVx":$("#wx").val(),"userQq":$("#qq").val(),"userPhone":$("#mobile").val(),"userEmail":$("#email").val(),"userSex":$("input[name='sex']:checked").val(),"userAutograph":$("#sign").val()},function (data) {
                alert(data);
            },"json");
        }else {
            alert("请输入正确信息！")
        }

    });


});

//电话号码验证
function isMobile(value){
    var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
    if(!reg.test(value)){
        return false;
    }
    return true;
}

function isEmail(value) {
    var reg = /\w+[@]{1}\w+[.]\w+/;
    if(reg.test(value)){
        return true;
    }else{
        return false;
    }
}

//qq号码验证
function isQq(value){
    var reg=/^[1-9][0-9]\d{5,11}$/;
    if(!reg.test(value)){
        return false;
    }
    return true;
}
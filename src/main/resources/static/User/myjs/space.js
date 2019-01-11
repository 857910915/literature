$(function () {
    $.get("../space/toSelectSpace",function (data) {
        console.log(data);
        $("#spacename").val(data.spaceName);
        $("#sign").val(data.spaceAutograph);
        $("#spacenews").val(data.spaceIntroduction);
    },"json");


    $("#form_submit").click(function () {
        if ($("#spacename").val().length!=0||$("#sign").val().length!=0||$("#spacenews").val().length!=0){
            $.get("../space/toUpdateSpace",{"spaceName":$("#spacename").val(),"spaceAutograph":$("#sign").val(),"spaceIntroduction":$("#spacenews").val()},function (data) {
                alert(data);
            },"json");
        }else {
            alert("请输入要更改的信息！");
        }
    });
});
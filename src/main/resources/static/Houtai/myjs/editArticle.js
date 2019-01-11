$(function () {
    var artId=showWindowHref();
    $.get("../article/toFindArticle",{"artId":artId},function (data) {
        console.log(data);
        $("#articletitle").val(data.artTitle);
        $("#artType").val(data.artType);
        $("#author").val(data.user.userNickname);
        $("#sources").val(data.artMsource);
        $("#artText").val(data.artText);
    },"json");

    $("#toSave").click(function () {
        var artType=$("#artType").val();
        if (artType!=0){
            $.get("../article/toUpdateArticle1",{"artId":artId,"artType":artType,"artStatus":0},function (data) {
                alert(data);
                window.location.href="article-list.html";
            },"json");
        } else {
            alert("请选择分类！");
        }
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
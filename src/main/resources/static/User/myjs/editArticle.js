$(function () {
    var artId=showWindowHref();
    $.get("../article/toFindArticle",{"artId":artId},function (data) {
        console.log(data);
        $("#title").val(data.artTitle);
        $("#body").val(data.artText);
        $("#typeid").val(data.artType);
        if (data.artMsource=="原创"){
            $("#yc").attr("checked","checked");
        } else if (data.artMsource=="转载"){
            $("#zz").attr("checked","checked");
        }
    },"json");



    $("#article_add_submit").click(function () {
        var artTitle=$("#title").val();
        var artText=$("#body").val();
        var artType=$("#typeid").val();
        var artMsource=$("input[name='msource']:checked").val();
        if (artTitle.length!=0&&artText.length!=0&&artType!=0&&artMsource.length!=0){
            $.get("../article/toUpdateArticle",{"artId":artId,"artTitle":artTitle,"artText":artText,"artType":artType,"artMsource":artMsource},function (data) {
                alert(data);
                window.location.href="content_list.html";
            },"json");
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
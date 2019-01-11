$(function () {
    $("#article_add_submit").click(function () {
        var artTitle=$("#title").val();
        var artText=$("#body").val();
        var artType=$("#typeid").val();
        var artMsource=$("input[name='msource']:checked").val();
        if (artTitle.length!=0&&artText.length!=0&&artType!=0&&artMsource.length!=0){
            $.get("../article/toInsertArticle",{"artTitle":artTitle,"artText":artText,"artType":artType,"artMsource":artMsource},function (data) {
                alert(data);
                window.location.href="content_list.html";
            },"json");
        }
    });
});
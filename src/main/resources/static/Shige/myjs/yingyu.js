var pageNo=1;
$(function () {
    $("#prev").attr("href","javascript:prePage();");
    $("#next").attr("href","javascript:nextPage();");
    toShow();
});

function toShow() {
    $.get("../../article/toSelectArticleList1",{"pageNo":pageNo,"pageSize":8,"artStatus":1,"artType":"英语诗歌"},function (data) {
        if (data.length<8){
            $("#next").removeAttr("href");
        }else {
            $("#next").attr("href","javascript:nextPage();");
        }
        $("#jingdian").empty();
        toAdd(data);

    },"json");
}
function toAdd(data) {
    for (var i in data){
        var art=data[i];
        var date=new Date(art.artCreatetime);
        var time=formatDate(date);
        $("#this").html(pageNo);
        $("#yingyu").append('<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">\n' +
            '                       <li>' +
            '                            <span>'+art.artTitle+'</span>\n' +
            '                            <font>作者：'+art.user.userNickname+'</font>\n' +
            '                            <p>'+art.artText.replace(/\n/g,"<br/>")+'</p><p style="text-align: right;">'+time+'</p>\n' +
            '                       </li>' +
            '                    </a>');
    }
}
function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"."+month+"."+date;
}

//下一页
$("#next").click(function () {
    pageNo++;
    toShow();
});
//下一页
$("#prev").click(function () {
    if (pageNo==1){
        return;
    }
    pageNo--;
    toShow();
});

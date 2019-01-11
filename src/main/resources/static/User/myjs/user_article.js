var pageNo;
var username=showWindowHref();
$(function () {
    pageNo=1;
    toShow();
});
function toShow() {
    $.get("../article/toSelectArticleList",{"pageNo":pageNo,"artStatus":1,"username":username},function (data) {
        // console.log(data);
        if (data.length<20){
            $("#next").removeAttr("href");
        }else {
            $("#next").attr("href","javascript:nextPage();");
        }
        $("#content1").empty();
        toAdd(data);
    },"json");
}
function toAdd(data) {
    for (var i in data){
        var article=data[i];
        var date=new Date(article.artCreatetime);
        var time=formatDate(date);
        var path;
        if (article.artType=="现代诗歌"){
            path="../shige/xiandai/xiandai.html";
        } else if (article.artType=="古风词韵"){
            path="../shige/gufeng/gufeng.html";
        } else if (article.artType=="经典诗词"){
            path="../shige/jingdian/jingdian.html";
        }else if (article.artType=="英语诗歌"){
            path="../shige/yingyu/yingyu.html";
        }
        $("#content1").append('<div class="list_article_box">\n' +
            '                                <div class="box_time">'+time+'</div>\n' +
            '                                <div class="box_type"><a href="'+path+'" target="_blank">【'+article.artType+'】</a></div>\n' +
            '                                <div class="box_title"><a href="/Shige/article.html?artId='+article.artId+'" target="_blank" title="'+article.artTitle+'" >'+article.artTitle+'</a></div>\n' +
            '                                <div class="box_other">\n' +
            '                                    <span class="box_yuedushu">阅读量：'+article.artNum+'</span>\n' +
            '                                    <span class="box_pinglunshu">评论：'+article.commentList.length+'</span>\n' +
            '                                    <sss class="box_dianzanshu"><a class="like" onclick="zan('+article.artId+')"><span>点赞：</span><em>'+article.fabulousList.length+'</em></a></sss>\n' +
            '                                </div>\n' +
            '                                <div class="clear"></div>\n' +
            '                            </div>');
    }
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"-"+month+"-"+date;
}

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

//下一页
function nextPage() {
    pageNo++;
    toShow();
}
//上一页
function prePage() {
    if (pageNo==1){
        return;
    }
    pageNo--;
    toShow();
}
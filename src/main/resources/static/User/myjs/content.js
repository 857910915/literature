var pageNo=1;
$(function () {
   toShow();
});

function toShow() {
    $.get("../article/toSelectArticleList",{"pageNo":pageNo},function (data) {
        console.log(data);
        var num=data.length;
        var num1=Math.ceil(num/20);
        $("#num1").html(num);
        $("#num2").html(pageNo+"/"+num1);
        toAdd(data);
    },"json");
}

//动态添加数据
function toAdd(data) {
    for (var i in data) {
        var article=data[i];
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
        var status;
        var clolr;
        var href;
        var a;
        if (article.artStatus==0){
            status="待审核";
            clolr="blue";
            href="article_edit.html";
            a='<a onclick="delArt('+article.artId+')" class="i_del"></a>';
        } else if (article.artStatus==1){
            status="已通过"
            clolr="green";
            href="/Shige/article.html";
            a="<a></a>";
        } else if (article.artStatus==1){
            status="未通过"
            clolr="red";
            href="article_edit.html"
            a="<a></a>";
        }
        var date=new Date(article.artCreatetime);
        var time=formatDate(date);
        $("#tb").append(' <tr id="'+article.artId+'">\n' +
            '                        <td><a class="fl" target="_blank" href="'+href+'?artId='+article.artId+'"><span  class="i_see"></span>'+article.artTitle+'</a>\n' +
            '                        '+a+'\n' +
            '                        </td>\n' +
            '                        <td align="center">\n' +
            '                            <a href="'+path+'" target="_blank">'+article.artType+'</a>\n' +
            '                        </td>\n' +
            '                        <td align="center"><span class="'+clolr+'">'+status+'</span></td>\n' +
            '                        <td align="center">'+article.commentList.length+'</td>\n' +
            '                        <td align="center">'+article.artNum+'</td>\n' +
            '                        <td align="center">'+time+'</td>\n' +
            '                    </tr>');
    }
    // console.log(article.commentList.length);
}
//删除
function delArt(artId) {
    $.get("../article/toDeleteArticle",{"artId":artId},function (data) {
        alert(data);
        window.location.href="content_list.html";
    },"json");
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"-"+month+"-"+date;
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
//首页
function firstPage() {
    pageNo=1;
    toShow();
}
//末页
function lastPage() {
    var num=$("#num2").val();
    pageNo=num.split("/")[1];
    toShow();
}
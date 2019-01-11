var pageNo=1;
$(function () {

    toShow();
});
function toShow() {
    $.get("../news/toSelectNewsList",{"pageNo":pageNo,"pageSize":20},function (data) {
        // console.log(data);
        var num=data.length;
        var num1=Math.ceil(num/20);
        $("#num1").html(num);
        $("#num2").html(pageNo+"/"+num1);
        for (var i in data){
            var news=data[i];
            var status;
            if (news.newsStatus==0){
                status="未读";
            } else {
                status="已读";
            }
            var date=new Date(news.newsCreatetime);
            var time=formatDate(date);
            $("#tb").append('<tr>\n' +
                '                            <td width="10"><input type="checkbox" class="selecte_id" name="id[]"/></td>\n' +
                '                            <td align="left">\n' +
                '                                <a href="?dopost=read&id=632610" class="i_see"></a>\n' +
                '                                <div class="view_name">\n' +
                '                                    <a href="javascript:yuedu('+news.newsId+');">'+news.newsTitle+'</a>\n' +
                '                                </div>\n' +
                '                                <a href="javascript:shanchu('+news.newsId+');" class="i_del"></a>\n' +
                '                            </td>\n' +
                '                            <td align="center">'+news.suser.userNickname+'</td>\n' +
                '                            <td align="center">'+status+'</td>\n' +
                '                            <td align="center">'+time+'</td>\n' +
                '                        </tr>');
        }
    },"json");
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"/"+month+"/"+date;
}

function yuedu(newsId){
    $.get("../news/toUpdateNews",{"newsId":newsId},function () {
        window.location.href="message1.html?newsId="+newsId;
    });
}
function shanchu(newsId){
    $.get("../news/toDeleteNews",{"newsId":newsId},function (data) {
        alert(data);
        window.location.href="message.html";
    },"json");
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
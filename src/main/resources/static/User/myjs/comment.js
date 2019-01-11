var pageNo=1;
$(function () {
    toShow();
});
function toShow() {
    $.get("../article/toSelectArticleList",{"pageNo":pageNo},function (data) {
        console.log(data);
        var num=0;
        for (var i in data){
            var art=data[i];
            num=num+art.commentList.length;
            for (var j in art.commentList){
                var com=art.commentList[j];
                var date=new Date(com.comCreatetime);
                var time=formatDate(date);
                $("#tb").append('<tr>\n' +
                    '                            <td align="left"><a class="view_name green" target="_blank" href="/Shige/article.html?artId='+art.artId+'">'+art.artTitle+'</a><a target="_blank" href="/Shige/article.html?artId='+art.artId+'" class="i_see"></a>\n' +
                    '                                <br /><p style="word-spacing:normal; white-space:normal; word-break:break-all;">\n' +
                    '                                    '+com.comText+'                                                </p></td>\n' +
                    '                            <td align="center"><a href="/User/user.html?username='+com.user.username+'" target="_blank">'+com.user.userNickname+'</a></td>\n' +
                    '                            <td align="center">'+time+'</td>\n' +
                    '                        </tr>');
            }
        }
        var num1=Math.ceil(num/20);
        $("#num1").html(num);
        $("#num2").html(pageNo+"/"+num1);
    },"json");
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"/"+month+"/"+date;
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

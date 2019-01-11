var pageNo;
$(function () {
    pageNo=1;
    toShow();
});
function toShow() {
    $.get("../article/toSelectArticleList",{"pageNo":pageNo},function (data) {
        $("#num2").html(pageNo);
        var num=0;
        for (var i in data){
            var com=data[i];
            num=num+com.commentList.length;
        }
        $("#num1").html(num);
        if (data.length<20){
            $("#next").removeAttr("href");
        }else {
            $("#next").attr("href","javascript:nextPage();");
        }
        $("#tb").empty();
        toAdd(data);
    },"json");
}

function toAdd(data) {
    for (var i in data){
        var art=data[i];
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


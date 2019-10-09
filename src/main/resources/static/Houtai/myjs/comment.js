var pageNo;
var pageSize;
$(function () {
    $("#DataTables_Table_0_previous").attr("href","javascript:prePage();");
    $("#DataTables_Table_0_next").attr("href","javascript:nextPage();");
    pageNo=1;
    $($(".select")[0]).attr("onchange","tochange()");
    pageSize=$($(".select")[0]).val();
    toShow();

});
function toShow() {
    $.get("../comment/toSelectAllComList",{"pageNo":pageNo,"pageSize":pageSize},function (data) {
        // console.log(data);
        $("#num1").html(data.length);
        if (data.length<pageSize){
            $("#DataTables_Table_0_next").removeAttr("href");
        }else {
            $("#DataTables_Table_0_next").attr("href","javascript:nextPage();");
        }
        $("#tb").empty();
        toAdd(data);
    },"json");
}
function toAdd(data){
    for (var i in data){
        var com=data[i];
        var date=new Date(com.comCreatetime);
        var time=formatDate(date);
        var status;
        if (com.comStatus==0){
            status="已启用";
        } else {
            status="已删除";
        }
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t\t<td>'+com.comId+'</td>\n' +
            '\\t\\t\\t\\t\\t<td><a href="/Shige/article.html?artId='+com.article.artId+'">'+com.article.artTitle+'</a></td>\\n\'' +
            '\t\t\t\t\t<td><a href="/User/user.html?username='+com.user.username+'"><i class="avatar size-L radius"><img alt="" src="../'+com.user.userImg+'"></i></a></td>\n' +
            '\t\t\t\t\t<td class="text-l"><div class="c-999 f-12">\n' +
            '\t\t\t\t\t\t\t<u style="cursor:pointer" class="text-primary" onclick="member_show()">'+com.user.userNickname+'</u> <time>'+time+'</time> <span class="ml-20">'+com.user.userPhone+'</span> <span class="ml-20">'+com.user.userVx+'</span></div>\n' +
            '\t\t\t\t\t\t\t<div class="f-12 c-999"><a href="/User/user.html?username='+com.user.username+'" target="_blank">http://localhost:8088/User/user.html?username='+com.user.username+'</a></div>\n' +
            '\t\t\t\t\t\t<div>'+com.comText+'</div></td>\n' +
            '\\t\\t\\t\\t\\t<td>'+status+'</td>\\n' +
            '\t\t\t\t\t<td class="td-manage"><a title="删除" href="javascript:shanchu('+com.comId+','+com.comStatus+');" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
            '\t\t\t\t</tr>');
    }
}

function tochange() {
    pageSize=$($(".select")[0]).val();
    toShow();
}

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second;
}

function shanchu(comId,comStatus) {
    if (comStatus==0){
        comStatus=1;
    } else {
        comStatus=0;
    }
    $.get("../comment/toUpdateCom",{"comId":comId,"comStatus":comStatus},function (data) {
        alert(data);
        window.location.href="/Houtai/comment-list.html";
    },"json");
}


function prePage() {
    if (pageNo==1){
        return;
    }
    pageNo--;
    toShow();
}
function nextPage() {
    pageNo++;
    console.log(pageNo+"+1");
    toShow();
}
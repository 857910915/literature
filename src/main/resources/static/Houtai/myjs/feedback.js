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
    $.get("../msg/toSelectAllMsgList1",{"pageNo":pageNo,"pageSize":pageSize},function (data) {
        console.log(data);
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
        var msg=data[i];
        var date=new Date(msg.msgCreatetime);
        var time=formatDate(date);
        var status;
        if (msg.msgStatus==0){
            status="已启用";
        } else {
            status="已删除";
        }
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t\t<td>'+msg.msgId+'</td>\n' +
            '\t\t\t\t\t<td><a href="/User/user.html?username='+msg.suser.username+'"><i class="avatar size-L radius"><img alt="" src="../'+msg.suser.userImg+'"></i></a></td>\n' +
            '\t\t\t\t\t<td class="text-l"><div class="c-999 f-12">\n' +
            '\t\t\t\t\t\t\t<u style="cursor:pointer" class="text-primary" onclick="member_show()">'+msg.suser.userNickname+'</u> <time>'+time+'</time> <span class="ml-20">'+msg.suser.userPhone+'</span> <span class="ml-20">'+msg.suser.userVx+'</span></div>\n' +
            '\t\t\t\t\t\t\t<div class="f-12 c-999"><a href="/User/user.html?username='+msg.suser.username+'" target="_blank">http://localhost:8088/User/user.html?username='+msg.suser.username+'</a></div>\n' +
            '\t\t\t\t\t\t<div>'+msg.msgText+'</div></td>\n' +
            '\\t\\t\\t\\t\\t<td>'+status+'</td>\\n' +
            '\t\t\t\t\t<td class="td-manage"><a title="删除" href="javascript:shanchu('+msg.msgId+','+msg.msgStatus+');" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
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

function shanchu(msgId,msgStatus) {
    if (msgStatus==0){
        msgStatus=1;
    } else {
        msgStatus=0;
    }
    $.get("../msg/toUpdateMsg",{"msgId":msgId,"msgStatus":msgStatus},function (data) {
        alert(data);
        window.location.href="/Houtai/feedback-list.html";
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
    toShow();
}
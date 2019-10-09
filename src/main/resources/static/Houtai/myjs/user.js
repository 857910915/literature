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
    $.get("../user/toSelectAllUserList",{"pageNo":pageNo,"pageSize":pageSize},function (data) {
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
        var user=data[i];
        var date=new Date(user.userCreatetime);
        var time=formatDate(date);
        var date1=new Date(user.userBirthday);
        var time1=formatDate1(date1);
        var status;
        var title;
        var lab;
        if (user.userStatus==0){
            status='已启用';
            title="停用"
            lab="success"
        } else if (user.userStatus==1){
            status='已停用';
            title="启用";
            lab="defaunt"
        }else if (user.userStatus==2){
            status='已删除';
            title="恢复";
            lab="danger"
        }
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t<td>'+user.userId+'</td>\n' +
            '\t\t\t\t<td><a target="_blank" href="/User/user.html?username='+user.username+'"><img class="img-user" src="../'+user.userImg+'"></a></td>\n' +
            '\t\t\t\t<td><u style="cursor:pointer" class="text-primary" onclick="member_show()">'+user.userNickname+'</u></td>\n' +
            '\t\t\t\t<td>'+user.userSex+'</td>\n' +
            '\t\t\t\t<td>'+user.userPhone+'</td>\n' +
            '\t\t\t\t<td>'+user.userVx+'</td>\n' +
            '\t\t\t\t<td>'+time1+'</td>\n' +
            '\t\t\t\t<td class="text-l">'+user.userAutograph+'</td>\n' +
            '\t\t\t\t<td>'+time+'</td>\n' +
            '\t\t\t\t<td class="td-status"><span class="label label-'+lab+' radius" id="span'+user.userId+'">'+status+'</span></td>\n' +
            '\t\t\t\t<td class="td-manage"><a style="text-decoration:none" onClick="member_update('+user.userId+','+user.userStatus+')" href="javascript:;" title="'+title+'"><i class="Hui-iconfont">&#xe631;</a> <a title="删除" href="javascript:;" onclick="member_dell('+user.userId+','+user.userStatus+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
            '\t\t\t</tr>');
    }
}

function member_update(id,status) {
    var flag;
    if (status==0){
        status=1;
        flag=confirm("确定停用");
    }else if (status==1){
        status=0;
        flag=confirm("确定启用");
    }else if (status==2) {
        status=0;
        flag=confirm("确定恢复");
    }

    if (flag){
        $.get("../user/toUpdateStatus",{"userStatus":status,"userId":id},function () {
            window.location.href="member-list.html";
        });
    }else {
        alert("未修改！")
    }
}
function member_dell(id,status) {
    var flag;
    if (status!=2){
        flag=confirm("确定删除");
        status=2;
        if (flag){
            $.get("../user/toUpdateStatus",{"userStatus":status,"userId":id},function () {
                window.location.href="member-list.html";
            });
        }else {
            alert("未修改！")
        }
    } else {
        flag=confirm("确定彻底删除");
        if (flag){
            $.get("../user/toDelete",{"userId":id},function () {
                window.location.href="member-list.html";
            });
        }else {
            alert("未删除！")
        }
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
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

function formatDate1(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"-"+month+"-"+date;
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
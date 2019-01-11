var pageNo;
$(function () {
    pageNo=1;
    toShow();
});

function toShow() {
    $.get("../msg/toSelectMsgList",{"pageNo":pageNo},function (data) {
        $("#num1").html(data.length);
        $("#num2").html(pageNo);
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
        var msg=data[i];
        var date=new Date(msg.msgCreatetime);
        var time=formatDate(date)
        $("#tb").append('<tr id="gutstbook_'+msg.msgId+'">\n' +
            '                            <td>\n' +
            '                                '+msg.msgText+'\n' +
            '                                <div style="color:#999; font-size:12px;">\n' +
            '                                '+time+'\n' +
            '                                </div>\n' +
            '                                <div class="reply_c" style="border:1px solid #eee; margin:10px 0; padding:5px; background:#F9F9F9; display:none;"></div>\n' +
            '                                <div class="replay_box" style="padding:10px 0; overflow:hidden; display:none;">\n' +
            '                                    <textarea class="reply_content" style="font-size:12px; width:98%; height:38px; padding:3px; line-height:1.3em; "></textarea>\n' +
            '                                    <div class="clear"></div>\n' +
            '                                    <a class="btn reply_ok" href="javascript:;" id="400131"><span>&nbsp;确定&nbsp;</span></a>\n' +
            '                                </div>\n' +
            '                            </td>\n' +
            '                            <td align="center">'+msg.suser.userNickname+'</td>\n' +
            '                            <td align="center"><a href="javascript:;" class="reply">回复</a>&nbsp;<a href="javascript:shanchu('+msg.msgId+');" class="del" id="40013">删除</a></td>\n' +
            '                        </tr>');
    }
}

function shanchu(msgId) {
    var flag=confirm("确定删除？");
    if (flag){
      $.get("../msg/toDeleteMsg",{"msgId":msgId},function (data) {
          alert(data);
          window.location.href="/User/feedback.html";
      },"json");
    }
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

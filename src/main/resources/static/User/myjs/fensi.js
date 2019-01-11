var username=showWindowHref();
var pageNo;
$(function () {
    pageNo=1;
    toShow();
});

function toShow() {
    $.get("../follow/selectFollowList1",{"username":username,"pageNo":pageNo},function (data) {
        if (data.length<10){
            $("#next").removeAttr("href");
        }else {
            $("#next").attr("href","javascript:nextPage();");
        }
        $("#fensi1").empty();
        toAdd(data);
    },"json");
}

function toAdd(data) {
    for (var i in data){
        var fol=data[i];
        var user=fol.user;
        $("#fensi1").append('<dl class="lastdl">\n' +
            '                                    <dt>\n' +
            '                                        <div class="head"><a href="/User/user.html?username='+user.username+'"><img src="../'+user.userImg+'" /></a></div>\n' +
            '                                    </dt>\n' +
            '                                    <dd>\n' +
            '                                        <div class="namelist">\n' +
            '                                            <a href="/User/user.html?username='+user.username+'">'+user.userNickname+'</a>\n' +
            '                                            <div>'+user.userAutograph+'</div>\n' +
            '                                        </div>\n' +
            '                                        <div class="opera">\n' +
            '                                            <a href="javascript:;" class="operass space_atten_sp" data-mid="657491">未关注</a>\n' +
            '                                            <div class="numbodysad"><span>'+user.followList.length+'</span>人关注</div>\n' +
            '                                        </div>\n' +
            '                                        <div class="clear"></div>\n' +
            '                                    </dd>\n' +
            '                                </dl>');
    }

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
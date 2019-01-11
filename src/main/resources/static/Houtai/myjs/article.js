var pageNo=1;
var pageSize;
$(function () {
    $($(".select")[1]).attr("onchange","tochange()");
    pageSize=$(".select")[1].value;
    toShow();
});

function tochange() {
    pageSize=$(".select")[1].value;
    toShow();
}
function toShow() {
    console.log(pageSize);
    $.get("../article/toSelectAllArticle",{"pageNo":pageNo,"pageSize":pageSize},function (data) {
        console.log(data);
        $("#num1").html(data.length);
        for (var i in data){
            var art=data[i];
            var status;
            var cls;
            var title;
            var ioc;
            var aa;
            if (art.artStatus==0){
                status="待审核";
                csl="default";
                title="审核";
                ioc="审核";
                aa="<a style=\"text-decoration:none\" class=\"ml-5\" href=\"article-edit.html?artId="+art.artId+"\" title=\"编辑\"><i class=\"Hui-iconfont\">&#xe6df;</i></a>";
            }else if (art.artStatus==1){
                status="已通过";
                csl="success";
                title="下架";
                ioc="<i class=\"Hui-iconfont\">&#xe6de;</i>";
                aa="<a></a>"
            }else if (art.artStatus==2){
                status="未通过";
                csl="danger";
                title="上架";
                ioc="<i class=\"Hui-iconfont\"></i>";
                aa="<a></a>"
            }
            var time=new Date(art.artCreatetime);
            $("#tb").append('<tr class="text-c">\n' +
                '\t\t\t\t\t<td><input type="checkbox" value="" name=""></td>\n' +
                '\t\t\t\t\t<td>'+art.artId+'</td>\n' +
                '\t\t\t\t\t<td class="text-l"><u style="cursor:pointer" class="text-primary" href="article-edit.html?artId='+art.artId+'" title="修改">'+art.artTitle+'</u></td>\n' +
                '\t\t\t\t\t<td>'+art.artType+'</td>\n' +
                '\t\t\t\t\t<td>'+art.user.userNickname+'</td>\n' +
                '\t\t\t\t\t<td>'+art.artMsource+'</td>\n' +
                '\t\t\t\t\t<td>'+formatDate(time)+'</td>\n' +
                '\t\t\t\t\t<td>'+art.artNum+'</td>\n' +
                '\t\t\t\t\t<td class="td-status"><span class="label label-'+csl+' radius">'+status+'</span></td>\n' +
                '\t\t\t\t\t<td class="f-14 td-manage"><a style="text-decoration:none" href="javascript:;" onclick="updateArt('+art.artId+','+art.artStatus+')"  title="'+title+'">'+ioc+'</a>'+aa+'<a style="text-decoration:none" class="ml-5" onClick="art_del('+art.artId+')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td> \n' +
                '\t\t\t\t</tr>');
        }
    },"json");
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

function updateArt(artId,artStatus) {
    if (artStatus==0){
        layer.confirm('审核文章？', {
                btn: ['通过','不通过','取消'],
                shade: false,
                closeBtn: 0
            },
            function(){
                $.get("../article/toUpdateArticle1",{"artId":artId,"artStatus":1},function (data) {
                    alert(data);
                    window.location.href="article-list.html";
                },"json");
                layer.msg('已发布', {icon:6,time:1000});
            },
            function(){
                $.get("../article/toUpdateArticle1",{"artId":artId,"artStatus":2},function (data) {
                    alert(data);
                    window.location.href="article-list.html";
                },"json");
                layer.msg('未通过', {icon:5,time:1000});
            });
    }else if (artStatus==1){
        layer.confirm('确认要下架吗？',function(){
            $.get("../article/toUpdateArticle1",{"artId":artId,"artStatus":2},function (data) {
                alert(data);
                window.location.href="article-list.html";
            },"json");
            layer.msg('已下架!',{icon: 5,time:1000});
        });
    }else if (artStatus==2){
        layer.confirm('确认要发布吗？',function(){
            $.get("../article/toUpdateArticle1",{"artId":artId,"artStatus":1},function (data) {
                alert(data);
                window.location.href="article-list.html";
            },"json");
            layer.msg('已下架!',{icon: 5,time:1000});
        });
    }
}

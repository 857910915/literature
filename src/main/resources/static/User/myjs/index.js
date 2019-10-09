$(function () {
    $.get("../article/toSelectArticleList2",{"pageNo":1,"pageSize":5},function (data) {
        console.log(data);
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#article").append('<li><a target="_blank" href="/Shige/article.html?artId='+art.artId+'" title="【'+art.artType+'】'+art.artTitle+'"><span class="fl">【'+art.artType+'】'+art.artTitle+'</span><span class="fr">'+time+'</span></a></li>\n');
        }
    },"json");

    $.get("../article/toSelectArticleList1",{"pageNo":1,"pageSize":5},function (data) {
        console.log(data);
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#article1").append('<li><a target="_blank" href="/Shige/article.html?artId='+art.artId+'" title="【'+art.artType+'】'+art.artTitle+'"><span class="fl">【'+art.artType+'】'+art.artTitle+'</span><span class="fr">'+time+'</span></a></li>\n');
        }
    },"json");

});

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"年"+month+"月"+date+"日";
}
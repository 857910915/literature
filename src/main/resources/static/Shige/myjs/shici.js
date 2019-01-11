$(function () {
    $.get("../article/toSelectArticleList1",{"pageNo":1,"pageSize":4,"artStatus":1,"artType":"现代诗歌"},function (data) {
        console.log(data);
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#xiandai").append('<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">\n' +
                '                       <li>' +
                '                            <span>'+art.artTitle+'</span>\n' +
                '                            <font>作者：'+art.user.userNickname+'</font>\n' +
                '                            <p>'+art.artText.replace(/\n/g,"<br/>")+'</p><p style="text-align: right;">　　　　　　　'+time+'</p>\n' +
                '                       </li>' +
                '                    </a>');
        }

    },"json");

    $.get("../article/toSelectArticleList1",{"pageNo":1,"pageSize":4,"artStatus":1,"artType":"古风词韵"},function (data) {
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#gufeng").append('<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">\n' +
                '                       <li>' +
                '                            <span>'+art.artTitle+'</span>\n' +
                '                            <font>作者：'+art.user.userNickname+'</font>\n' +
                '                            <p>'+art.artText.replace(/\n/g,"<br/>")+'</p><p style="text-align: right;">　　　　　　　'+time+'</p>\n' +
                '                       </li>' +
                '                    </a>');
        }

    },"json");

    $.get("../article/toSelectArticleList1",{"pageNo":1,"pageSize":4,"artStatus":1,"artType":"经典诗词"},function (data) {
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#jingdian").append('<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">\n' +
                '                       <li>' +
                '                            <span>'+art.artTitle+'</span>\n' +
                '                            <font>作者：'+art.user.userNickname+'</font>\n' +
                '                            <p>'+art.artText.replace(/\n/g,"<br/>")+'</p><p style="text-align: right;">　　　　　　　'+time+'</p>\n' +
                '                       </li>' +
                '                    </a>');
        }

    },"json");

    $.get("../article/toSelectArticleList1",{"pageNo":1,"pageSize":4,"artStatus":1,"artType":"英语诗歌"},function (data) {
        for (var i in data){
            var art=data[i];
            var date=new Date(art.artCreatetime);
            var time=formatDate(date);
            $("#yingyu").append('<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">\n' +
                '                       <li>' +
                '                            <span>'+art.artTitle+'</span>\n' +
                '                            <font>作者：'+art.user.userNickname+'</font>\n' +
                '                            <p>'+art.artText.replace(/\n/g,"<br/>")+'</p><p style="text-align: right;">'+time+'</p>\n' +
                '                       </li>' +
                '                    </a>');
        }

    },"json");




});

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"."+month+"."+date;
}

$(function () {
    //新诗推荐
    $.get("/article/toSelectAllArticle",{"pageNo":1,"pageSize":10},function (data) {
        console.log(data);
        for (var i in data){
            var art=data[i];
            var j=parseInt(i)+parseInt(1);
            $("#tuijian").append(
                '\t\t\t\t\t\t\t\t\t<a target="_blank" href="/Shige/article.html?artId='+art.artId+'">'+j+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;《'+art.artTitle+'》&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+art.user.userNickname+'</a>\n');
        }
    },"json");
    //诗人推荐
    $.get("/user/toSelectUserList",{"pageNo":1,"pageSize":4},function (data) {
        console.log(data);
        for (var i in data){
            var user=data[i];
            var text=user.userAutograph;
            if (text==undefined)
                text="暂无介绍"
            $("#shiren").append('<li>\n' +
                '<a target="_blank" href="/User/user.html?username='+user.username+'">' +
                '\t\t\t\t\t<img src="'+user.userImg+'">\n' +
                '\t\t\t\t\t<div class="shi_people1">\n' +
                '\t\t\t\t\t\t<p>'+user.userNickname+'</p>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="shi_people2">\n' +
                '\t\t\t\t\t\t<p>'+text+'</p>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</a>\n' +
                '\t\t\t\t</li>');
        }
    },"json");
});
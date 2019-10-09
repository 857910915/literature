$(function () {
    $.get("../round/toGet",function (data) {
        console.log(data);
        for(var i = 0;i<5;i++){
            var mode=data[i];
            if (i<data.length){
                $("#img"+(i+1)).attr("src",mode.rounImg);
                $("#img"+(i+1)).attr("alt",mode.rpunType);
                $("#zi"+(i+1)).html(mode.rpunType);
            }else {
                $("#img"+(i+1)).attr("src","/img/qd.jpg");
                $("#img"+(i+1)).attr("alt","敬请期待");
                $("#zi"+(i+1)).html("敬请期待");
            }
        }
    },"json");
});
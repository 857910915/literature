$(function () {
    //添加图片
    $("#save").click(function () {
        // console.log($("#type1").val());
        if ($("#type1").val()!="---图片分类---"&&$("#sort").val().length!=0&&$("#imgUpload").val().length!=0){
            var formData=new FormData();
            formData.append("rpunType",$("#type1").val());
            formData.append("rounSort",$("#sort").val());
            formData.append("myFile",$("#imgUpload")[0].files[0]);
            $.ajax({
                url : "../round/toAdd",
                type : 'POST',
                data : formData,
                dataType : "json",
                async :false,
                cache : false,
                processData : false,
                contentType : false,
                success : function (data) {
                    alert(data);
                    window.location.href="picture-list.html"
                }
            });
        }else {
            alert("请填写完整的信息！")
        }
    });
});
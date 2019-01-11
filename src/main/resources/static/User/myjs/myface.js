$(function () {
    $("#user-pic").change(function () {
        var file = $("#user-pic")[0].files[0];
        //通过FileReader读取选中图片
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //result中存放了选中的文件的二进制数据
            $('#crop-preview-100')[0].src = this.result;
            $('#crop-preview-60')[0].src = this.result;
        }
    });
    
    
    $("#save-pic").click(function () {
        if ($("#user-pic").val().length>0){
            var formData=new FormData();
            formData.append("myFile",$("#user-pic")[0].files[0]);
            $.ajax({
                url : "../user/updateUserImg",
                type : 'POST',
                data : formData,
                dataType : "json",
                async :false,
                cache : false,
                processData : false,
                contentType : false,
                success : function (data) {
                    alert(data);
                    window.location.href="myface.html"
                }
            });
        }else {
            alert("请填写完整的信息！")
        }
    });
});
$(function () {
  let editObj = {
    images: "上传的图片",
  };
  let result = syntaxHighlight(editObj);
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "扫描成功",
    result: "8986112115733660735",
    code: 200,
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    if (isUpload) {
      var uploadFile = document.querySelector(".fileUpload");
      var file = uploadFile.files[0]; //文件

      if (file) {
        var size = file.size / 1024 / 1024;
        if (size < 10) {
          document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
          var formData = new FormData();
          formData.append("images", file);
          $.ajax({
            method: "POST",
            url: baseAPI + "/barcode",
            headers: {
              "secret-id": secret_id,
              "secret-key": secret_key,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              if (res.code == 200) {
                $("#translate_result").val(res.results.text.text);
                let resJSON = JSON.stringify(res);
                resObj = JSON.parse(resJSON);
                let returnresult = syntaxHighlight(resObj);
                $("#returnresult").html(returnresult);
              }
            },
            error() {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              $(".message-error .message_content").html(res.msg);
              document
                .querySelector(".message-error")
                .classList.remove("message-hide");
              setTimeout(() => {
                document
                  .querySelector(".message-error")
                  .classList.add("message-hide");
              }, 2000);
            },
          });
        }
      }
    } else {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      setTimeout(() => {
        $("#translate_result").val("8986112115733660735");
        document.querySelector("#marklayer").classList.remove("mark-show");
      }, 1000);
    }
  });
});

$(function () {
  let editObj = {
    images: "上传的图片",
  };
  let result = syntaxHighlight(editObj);
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "二维码解析成功",
    result: abbreviation + "nlp引擎",
    code: 200,
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    if (isChange) {
      if (isUpload) {
        document.querySelector("#marklayer").classList.add("mark-show");
        var uploadFile = document.querySelector(".fileUpload");
        var file = uploadFile.files[0]; //文件
        if (file) {
          var size = file.size / 1024 / 1024;
          if (size < 10) {
            var formData = new FormData();
            formData.append("images", file);
            $.ajax({
              method: "POST",
              url: baseAPI + "/qr_code",
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
        document.querySelector("#marklayer").classList.remove("mark-show");
        $("#translate_result").val(abbreviation + "nlp引擎");
      }
    } else {
      var text = $("#translate_data").val().trim();
      if (text) {
        document.querySelector("#marklayer").classList.add("mark-show");
        $(".qrcode").attr("src", "");
        $.ajax({
          method: "POST",
          url: baseAPI + "/getQRCode",
          headers: {
            "secret-id": secret_id,
            "secret-key": secret_key,
          },
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({ text }),
          success: function (res) {
            document.querySelector("#marklayer").classList.remove("mark-show");
            if (res.code == 200) {
              $(".qrcode").attr("src", res.result);
              $(".function_right .tips").css("display", "none");
              let resJSON = JSON.stringify(res);
              resObj = JSON.parse(resJSON);
              let returnresult = syntaxHighlight(resObj);
              $("#returnresult").html(returnresult);
            }
          },
        });
      } else {
        $(".message-error .message_content").html("请输入文本内容");
        document
          .querySelector(".message-error")
          .classList.remove("message-hide");
        setTimeout(() => {
          document
            .querySelector(".message-error")
            .classList.add("message-hide");
        }, 2000);
      }
    }
  });
});

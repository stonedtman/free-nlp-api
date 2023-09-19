$(function () {
  // 初始化请求示例
  let requestObj = {
    multipartFile: "上传的doc文档",
  };
  $("#result").html(syntaxHighlight(requestObj));

  let returnObj = { msg: "文档解析成功!", result: textList[0], code: "200" };
  $("#returnresult").html(syntaxHighlight(returnObj));

  $(".analysis_name").click(function () {
    $(".loading").html("加 载 中 ···");
    $("#marklayer").addClass("mark-show"); //加载状态

    var uploadFiles = document.querySelectorAll(".fileUpload")[0];
    var file = uploadFiles.files[0]; //文件
    var formData = new FormData();
    formData.append("multipartFile", file);
    if (file) {
      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/doc2text",
        contentType: false,
        processData: false,
        data: formData,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $("#analysis_results").html(res.result);
            $(".download_result").removeClass("hide");
            $(".step_tip").addClass("hide");
            $("#returnresult").html(syntaxHighlight(res));
          }
        },
        error() {
          document.querySelector("#marklayer").classList.remove("mark-show");
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
    } else {
      setTimeout(() => {
        $("#marklayer").removeClass("mark-show");
        $("#analysis_results").html(textList[current]);
        $(".download_result").removeClass("hide");
        $(".step_tip").addClass("hide");
      }, 2000);
    }
  });
});
